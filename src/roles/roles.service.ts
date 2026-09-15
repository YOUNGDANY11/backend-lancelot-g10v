import {
  BadRequestException,
  Injectable,
  NotFoundException,
  OnApplicationBootstrap,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateRoleDto } from './dto/create-role.dto'
import { UpdateRoleDto } from './dto/update-role.dto'
import { Role } from './entities/role.entity'
import { RoleCode } from './role-codes'

@Injectable()
export class RolesService implements OnApplicationBootstrap {
  constructor(
    @InjectRepository(Role)
    private readonly rolesRepository: Repository<Role>,
  ) {}

  async onApplicationBootstrap() {
    await this.ensureFunctionalRoles()
  }

  private async ensureFunctionalRoles() {
    const functionalRoles = [
      RoleCode.DIRECTOR_TECNICO,
      RoleCode.ENCARGADO_SALUD,
    ]
    for (const code of functionalRoles) {
      const exists = await this.rolesRepository.findOne({
        where: [{ name: code }, { code }],
      })
      if (!exists) await this.rolesRepository.save({ name: code, code })
    }
  }

  async create(createRoleDto: CreateRoleDto) {
    const exists = await this.rolesRepository.findOne({
      where: [{ name: createRoleDto.name }, { code: createRoleDto.code }],
    })
    if (exists)
      throw new BadRequestException({
        status: 'Error',
        mensaje: 'Ya existe un rol con ese nombre o código',
      })
    return this.rolesRepository.save(createRoleDto)
  }

  async findAll() {
    return this.rolesRepository.find({ order: { id_role: 'ASC' } })
  }

  async findOne(id_role: number) {
    const role = await this.rolesRepository.findOne({ where: { id_role } })
    if (!role)
      throw new NotFoundException({
        status: 'Error',
        mensaje: 'No existe este rol',
      })
    return role
  }

  async update(id_role: number, updateRoleDto: UpdateRoleDto) {
    const role = await this.findOne(id_role)
    if (updateRoleDto.name || updateRoleDto.code) {
      const duplicate = await this.rolesRepository
        .createQueryBuilder('role')
        .where('(role.name = :name OR role.code = :code)', {
          name: updateRoleDto.name ?? role.name,
          code: updateRoleDto.code ?? role.code,
        })
        .andWhere('role.id_role != :id_role', { id_role })
        .getOne()
      if (duplicate)
        throw new BadRequestException({
          status: 'Error',
          mensaje: 'Ya existe un rol con ese nombre o código',
        })
    }
    return this.rolesRepository.save(
      this.rolesRepository.merge(role, updateRoleDto),
    )
  }

  async remove(id_role: number) {
    const role = await this.findOne(id_role)
    await this.rolesRepository.remove(role)
    return { status: 'Success', mensaje: 'Rol eliminado con éxito' }
  }
}
