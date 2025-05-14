import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { data as userData } from 'lake';
import { v4 as uuid } from 'uuid';
import { TUser } from './user.model';
import { FilterUserDto } from './dto/filter-user.dto';

@Injectable()
export class UserService {
  create(createUserDto: CreateUserDto) {
    const newUser = {
      id: uuid(),
      ...createUserDto,
    };

    userData.push(newUser);

    return {
      message: 'User created',
      data: newUser,
    };
  }

  findAllUsers({ email, role }: FilterUserDto) {
    let users = userData;

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

  findUserWithId(id: string): TUser {
    const user = userData.find((user) => user.id === id);

    if (!user) throw new NotFoundException();

    return user;
  }

  private findUserIndexWthId(id: string): number {
    const userIdx = userData.findIndex((user) => user.id === id);

    if (userIdx === -1) throw new NotFoundException();

    return userIdx;
  }

  updateUser(id: string, updateUserDto: UpdateUserDto) {
    const userIdx = this.findUserIndexWthId(id);

    userData[userIdx] = { ...userData[userIdx], ...updateUserDto };

    return {
      message: 'User updated',
      data: userData[userIdx],
    };
  }

  deleteUser(id: string) {
    const userIdx = this.findUserIndexWthId(id);

    userData.splice(userIdx, 1);

    return { message: `Removed user with id: ${id}` };
  }
}
