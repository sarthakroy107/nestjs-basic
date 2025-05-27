/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FilterUserDto } from './dto/filter-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './repositories/user.repository';

@Injectable()
export class UserService {
  private logger = new Logger('UserService');
  constructor(
    @InjectRepository(UserRepository) private userRepository: UserRepository,
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    const newUser = this.userRepository.create({
      ...createUserDto,
    });

    await this.userRepository.save(newUser);
    const { password, ...safeNewUser } = newUser;
    return {
      message: 'User created',
      data: safeNewUser,
    };
  }

  async findAllUsers({ email, role }: FilterUserDto) {
    let users = await this.userRepository.find();

    if (email) {
      //console.log('In email' + email);
      users = users.filter((user) => user.email === email);
    }

    if (role) {
      //console.log('In role: ' + role);
      users = users.filter((user) => user.role === role);
    }

    return users.map(({ password, ...safeUser }) => safeUser);
  }

  async findUserWithId(id: string) {
    const user = await this.userRepository.findOneBy({
      id,
    });

    if (!user) throw new NotFoundException(`User with id ${id} not found`);
    const { password, ...safeUser } = user;
    return safeUser;
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.findUserWithId(id);

    const updatedUser = { ...user, ...updateUserDto };

    await this.userRepository.save(updatedUser);
    const { password, ...safeUpdatedUser } = updatedUser;
    return {
      message: 'User updated',
      data: safeUpdatedUser,
    };
  }

  async deleteUser(id: string) {
    const user = await this.userRepository.findOne({
      where: { id },
    });

    if (!user) {
      this.logger.error(`User with id ${id} not found`);
      throw new NotFoundException(`User with id ${id} not found`);
    }

    await this.userRepository.remove(user);

    return { message: `Removed user with id: ${id}` };
  }
}
