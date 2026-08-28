import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe, Put, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FilterUserDto } from './dto/filter-user.dto';
import { JwtAuthGuard } from 'src/auth/guard/jwt-guard';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { GetUser } from 'src/auth/decorators/get-user.decorator';


@UseGuards(JwtAuthGuard,RolesGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Roles('ADMIN')
  @Get()
  findAll(@Query() filters:FilterUserDto){
    return this.usersService.findAll(filters)
  }

  @Roles('ADMIN')
  @Get('id/:id')
  findById(@Param('id',ParseIntPipe) id_user:number){
    return this.usersService.getById(id_user)
  }

  @Roles('ADMIN', 'ENTRENADOR')
  @Get('me')
  me(@GetUser('id_user') id_user:number){
    return this.usersService.getById(id_user)
  }

  @Get('athletes')
  athletes(@Query() filters:FilterUserDto){
    return this.usersService.findAllAthletes(filters)
  }

  @Roles('ADMIN')
  @Put('id/:id')
  update(@Param('id',ParseIntPipe) id_user:number,@Body() updateUserDto:UpdateUserDto){
    return this.usersService.update(id_user,updateUserDto)
  }


  @Roles('ADMIN','ENTRENADOR')
  @Put('me/:id')
  updateMe(@GetUser('id_user') id_user:number, @Body() updateUserDto:UpdateUserDto){
    return this.usersService.update(id_user,UpdateUserDto)
  }

  @Roles('ADMIN')
  @Delete('id/:id')
  delete(@Param('id',ParseIntPipe) id_user:number){
    return this.usersService.delete(id_user)
  }
}
