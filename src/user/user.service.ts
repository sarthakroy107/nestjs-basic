import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FilterUserDto } from './dto/filter-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './repositories/user.repository';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository) private userRepository: UserRepository,
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    const newUser = this.userRepository.create({
      ...createUserDto,
    });

    await this.userRepository.save(newUser);

    return {
      message: 'User created',
      data: newUser,
    };
  }

  async findAllUsers({ email, role }: FilterUserDto): Promise<UserEntity[]> {
    let users = await this.userRepository.find();

    if (email) {
      //console.log('In email' + email);
      users = users.filter((user) => user.email === email);
    }

    if (role) {
      //console.log('In role: ' + role);
      users = users.filter((user) => user.role === role);
    }

    return users;
  }

  async findUserWithId(id: string): Promise<UserEntity> {
    const user = await this.userRepository.findOneBy({
      id,
    });

    if (!user) throw new NotFoundException(`User with id ${id} not found`);

    return user;
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.findUserWithId(id);

    const updatedUser = { ...user, ...updateUserDto };

    await this.userRepository.save(updatedUser);
    return {
      message: 'User updated',
      data: updatedUser,
    };
  }

  async deleteUser(id: string) {
    const user = await this.findUserWithId(id);

    await this.userRepository.remove(user);

    return { message: `Removed user with id: ${id}` };
  }
}
