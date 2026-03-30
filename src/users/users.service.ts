import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private userRepo: Repository<User> ) {}
 async create(createUserDto: CreateUserDto) {
  const user = await this.userRepo.create(createUserDto)
    return this.userRepo.save(user)
  }

  async findAll() {
    return this.userRepo.find()
  }

  async findOne(id: number) {
    const user = await this.userRepo.findOne({where: {id}})
    if(!user) throw new NotFoundException()
    return user
  }

 async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.userRepo.findOne({where: {id}})
    if(!user) throw new NotFoundException()
      Object.assign(user, updateUserDto)
    return this.userRepo.save(user)
  }

 async remove(id: number) {
  const user = await this.userRepo.findOne({where: {id}})
    if(!user) throw new NotFoundException()
      Object.assign(user)
    return this.userRepo.remove(user)
  }
}
