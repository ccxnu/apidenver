import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserPersistance } from 'src/Infra/persistance/user/user.persistance';
import { User } from 'src/Domain/Models/User';

@Controller('users')
export class UsersController {
  constructor(private readonly userPersistance: UserPersistance) {}

  @Post()
  async create(@Body() createUserDto: any): Promise<User> {
    const user = new User();
    user.user_id = createUserDto.user_id;
    user.email = createUserDto.email;
    user.password_hash = createUserDto.password_hash;
    user.role = createUserDto.role;
    user.is_verified = createUserDto.is_verified;
    user.last_login = createUserDto.last_login;
    user.created_at = createUserDto.created_at;
    user.updated_at = createUserDto.updated_at;
    user.deactivated_at = createUserDto.deactivated_at;
    return await this.userPersistance.create(user);
  }

  @Get()
  async findAll(): Promise<User[]> {
    const users = await this.userPersistance.findByEmail("")
    if(users){
        return [users];
    }else{
        return [];
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<User | null> {
    return await this.userPersistance.findById(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: any): Promise<User> {
    const user = new User();
    user.user_id = id;
    user.email = updateUserDto.email;
    user.password_hash = updateUserDto.password_hash;
    user.role = updateUserDto.role;
    user.is_verified = updateUserDto.is_verified;
    user.last_login = updateUserDto.last_login;
    user.updated_at = updateUserDto.updated_at;
    user.deactivated_at = updateUserDto.deactivated_at;
    return await this.userPersistance.update(user);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<boolean> {
    return await this.userPersistance.delete(id);
  }
}