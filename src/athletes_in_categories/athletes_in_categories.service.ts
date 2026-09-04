import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateAthletesInCategoryDto } from './dto/create-athletes_in_category.dto';
import { UpdateAthletesInCategoryDto } from './dto/update-athletes_in_category.dto';
import { AthletesInCategory } from './entities/athletes_in_category.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { FilterAthInCat } from './dto/filters-ath_in_cat.dto';
import { plainToInstance } from 'class-transformer';
import { ResponseAthInCat } from './dto/response-ath_cat.dto';
import { UsersService } from 'src/users/users.service';
import { RolesService } from 'src/roles/roles.service';

@Injectable()
export class AthletesInCategoriesService {
  constructor(
    @InjectRepository(AthletesInCategory) private athInCatRepository:Repository<AthletesInCategory>,
    private readonly usersService:UsersService,
    private readonly rolesService:RolesService
  ){}


  async findOneById(id_ath_cat:number){
    const athInCat = await this.athInCatRepository.findOne({where:{id_ath_cat}, relations:{user:true}})
    return athInCat
  }

  async findOneByIdUser(id_user:number){
    const athInCat = await this.athInCatRepository.findOne({where:{id_user}, relations:{user:true}})
    return athInCat
  }

  async findAll(filters: FilterAthInCat) {
    const { page = 1, limit = 10, name, lastname, id_category, category_name } = filters

    const skip = (page - 1) * limit

    const query = this.athInCatRepository
      .createQueryBuilder('athlete_in_category')
      .leftJoin('athlete_in_category.user', 'user')
      .addSelect(['user.id_user', 'user.name', 'user.lastname'])
      .leftJoin('athlete_in_category.category', 'category')
      .addSelect(['category.id_category', 'category.name']) 
      .skip(skip)
      .take(limit)
      .orderBy('user.id_user', 'ASC')

    if (name) {
      query.andWhere('user.name ILIKE :name', { name: `%${name}%` })
    }

    if (lastname) {
      query.andWhere('user.lastname ILIKE :lastname', { lastname: `%${lastname}%` })
    }

    if (id_category) {
      query.andWhere('athlete_in_category.id_category = :id_category', { id_category })
    }

    if (category_name) {
      query.andWhere('category.name ILIKE :category_name', { category_name: `%${category_name}%` })
    }

    const [athInCat, total] = await query.getManyAndCount()

    if (total === 0)
      throw new NotFoundException({
        status: 'Error',
        mensaje: 'No hay atletas en competencia registrados',
      })

    return {
      status: 'Success',
      mensaje: 'Consulta de deportistas en competencia exitosa',
      athInCat: plainToInstance(ResponseAthInCat, athInCat, {excludeExtraneousValues:true}),
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    }
  }

  async getById(id_ath_cat:number){
    const athInCat = await this.findOneById(id_ath_cat)
    if(!athInCat) throw new NotFoundException({status:'Error',mensaje:'No existe este deportista en categoria'})
    return {
      status:'Success',
      mensaje:'Consulta de deportista en competencia exitosa',
      athInCat: plainToInstance(ResponseAthInCat,athInCat,{excludeExtraneousValues:true})
    }
  }

  async getByIdUser(id_user:number){
    const athInCat = await this.findOneByIdUser(id_user)
    if(!athInCat) throw new NotFoundException({status:'Error',mensaje:'No existe este deportista en categoria'})
    return {
      status:'Success',
      mensaje:'Consulta de deportista en competencia exitosa',
      athInCat: plainToInstance(ResponseAthInCat,athInCat,{excludeExtraneousValues:true})
    }
  }

  async create(createAthletesInCategoryDto:CreateAthletesInCategoryDto){
    const existUser= await this.usersService.findOneById(createAthletesInCategoryDto.id_user)
    if(!existUser) throw new BadRequestException({status:'Error',mensaje:'No existe este usuario'})
    if(existUser && existUser.id_role !== 3) throw new BadRequestException({status:'Error',mensaje:'Este usuario no es un deportista'})
    const existAthInCat = await this.athInCatRepository.findOne({ where: { id_user: createAthletesInCategoryDto.id_user, id_category: createAthletesInCategoryDto.id_category, },})
    if(existAthInCat) throw new BadRequestException({status:'Error',mensaje:'Este deportista ya esta en esta categoria'})
    const athInCat = await this.athInCatRepository.save(createAthletesInCategoryDto)
    return{
      status:'Success',
      mensaje:'Deportista asignado a la categoria de forma exitosa',
      athInCat: plainToInstance(ResponseAthInCat,athInCat,{excludeExtraneousValues:true})
    }
  }

  async update(id_ath_cat:number,updateAthletesInCategoryDto:UpdateAthletesInCategoryDto){
    const existsAthInCat = await this.findOneById(id_ath_cat)
    if(!existsAthInCat) throw new NotFoundException({status:'Error',mensaje:'No existe este deportista en categoria'})
    const existAthInCat = await this.athInCatRepository.findOne({ where: { id_user: updateAthletesInCategoryDto.id_user, id_category: updateAthletesInCategoryDto.id_category, },})
    if(existAthInCat) throw new BadRequestException({status:'Error',mensaje:'Este deportista ya esta en esta categoria'})
    const athInCat = await this.athInCatRepository.merge(existsAthInCat,updateAthletesInCategoryDto)
    await this.athInCatRepository.save(athInCat)
    return{
      status:'Success',
      mensaje:'Deportista en categoria actualizado de forma exitosa',
      athInCat: plainToInstance(ResponseAthInCat,athInCat,{excludeExtraneousValues:true})
    }
  }

  async delete(id_ath_cat:number){
    const athInCat = await this.findOneById(id_ath_cat)
    if(!athInCat) throw new NotFoundException({status:'Error',mensaje:'No existe este deportista en categoria'})
    await this.athInCatRepository.remove(athInCat)
    return{
      status:'Success',
      mensaje:'Deportista eliminado de la categoria'
    }
  }
}
