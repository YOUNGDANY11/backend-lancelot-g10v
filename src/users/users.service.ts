import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { FilterUserDto } from './dto/filter-user.dto';
import { plainToInstance } from 'class-transformer';
import { ResponseUserDto } from './dto/response-user.dto';
import * as bcrypt from 'bcryptjs'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository:Repository<User> 
  ){}

  async findOneById(id_user:number){
    const user = await this.usersRepository.findOne({where:{id_user}, relations:{role:true}})
    return user
  }

  async findOneByEmail(email:string){
    const user = await this.usersRepository.findOne({where:{email}})
    return user
  }

  async findAll(filters:FilterUserDto){
    const {page = 1, limit = 10, name, lastname, email} = filters

    const skip = (page - 1) * limit

    const query = this.usersRepository
    .createQueryBuilder('user')
    .leftJoinAndSelect('user.role','role')
    .skip(skip)
    .take(limit)
    .orderBy('user.id_user','ASC')


    if(name){
      query.andWhere('user.name ILIKE :name', {name:`%${name}%`})
    }

    if(lastname){
      query.andWhere('user.lastname ILIKE :lastname',{lastname:`%${lastname}%`})
    }

    if(email){
      query.andWhere('user.email ILIKE :email',{email:`%${email}%`})
    }

    const [users, total] = await query.getManyAndCount()

    if(total === 0) throw new NotFoundException({status:'Error',mensaje:'No hay usuarios registrados'})
    
    return {
      status:'Success',
      mensaje:'Consulta de usuarios exitosa',
      users: plainToInstance(ResponseUserDto,users,{excludeExtraneousValues:true}),
      pagination:{
        total,
        page,
        limit,
        totalPages: Math.ceil(total/limit)
      }
    }
  }

  async findAllAthletes(filters:FilterUserDto){
    const {page = 1, limit = 10, name, lastname, email} = filters

    const skip = (page - 1) * limit

    const query = this.usersRepository
    .createQueryBuilder('user')
    .leftJoinAndSelect('user.role','role')
    .where('user.id_role = :idRole',{idRole:3})
    .skip(skip)
    .take(limit)
    .orderBy('user.id_user','ASC')


    if(name){
      query.andWhere('user.name ILIKE :name', {name:`%${name}%`})
    }

    if(lastname){
      query.andWhere('user.lastname ILIKE :lastname',{lastname:`%${lastname}%`})
    }

    if(email){
      query.andWhere('user.email ILIKE :email',{email:`%${email}%`})
    }

    const [users, total] = await query.getManyAndCount()

    if(total === 0) throw new NotFoundException({status:'Error',mensaje:'No hay jugadores registrados'})
    
    return {
      status:'Success',
      mensaje:'Consulta de usuarios exitosa',
      users: plainToInstance(ResponseUserDto,users,{excludeExtraneousValues:true}),
      pagination:{
        total,
        page,
        limit,
        totalPages: Math.ceil(total/limit)
      }
    }
  }


  async getById(id_user:number){
    const user = await this.findOneById(id_user)
    if(!user) throw new NotFoundException({status:'Error',mensaje:'No existe este usuario'})
    return {
      status:'Success',
      mensaje:'Consulta de usuario exitosa',
      user: plainToInstance(ResponseUserDto,user,{excludeExtraneousValues:true})
    }
  }


  async create(createUserDto:CreateUserDto){
    const existsEmail = await this.findOneByEmail(createUserDto.email)
    if(existsEmail) throw new BadRequestException({status:'Error',mensaje:'Este correo ya esta asociado a un usuario'})
    const hashedPassword = await bcrypt.hash(createUserDto.password,10)
    const id_role = 3
    const user = await this.usersRepository.save({...createUserDto, password:hashedPassword, id_role:id_role})
    return {
      status:'Success',
      mensaje:'Usuario registrado con exito',
      user: plainToInstance(ResponseUserDto,user,{excludeExtraneousValues:true})
    }
  }

  async update(id_user:number,updateUserDto:UpdateUserDto){
    const existsUser = await this.findOneById(id_user)
    if(!existsUser) throw new NotFoundException({status:'Error', mensaje:'No existe este usuario'})
    if(updateUserDto.email && updateUserDto.email !== existsUser.email){
      const existsEmail = await this.findOneByEmail(updateUserDto.email)
      if(existsEmail) throw new BadRequestException({status:'Error',mensaje:'Este correo ya esta en uso por otro usuario'})
    }

    const user = await this.usersRepository.merge(existsUser,updateUserDto)
    await this.usersRepository.save(user)
    return{
      status:'Success',
      mensaje:'Usuario actualizado con exito',
      user:plainToInstance(ResponseUserDto,user,{excludeExtraneousValues:true})
    }
  }


  async delete(id_user:number){
    const user = await this.findOneById(id_user)
    if(!user) throw new NotFoundException({status:'Error',mensaje:'No existe este usuario'})
    await this.usersRepository.remove(user)
    return{
      status:'Success',
      mensaje:'Usuario eliminado con exito',
      user:plainToInstance(ResponseUserDto,user,{excludeExtraneousValues:true})
    }
  }
}
