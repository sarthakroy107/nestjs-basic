import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { FilterUserDto } from './dto/filter-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/dto/get-user.decorator';
import { UserEntity } from './entities/user.entity';

@Controller('user')
@UseGuards(AuthGuard())
export class UserController {
  constructor(private readonly userService: UserService) {}

  // @Post()
  // async create(@Body() createUserDto: CreateUserDto) {
  //   return await this.userService.createUser(createUserDto);
  // }

  @Get()
  async getAuthenticatedUser(@GetUser() user: UserEntity) {
    return await this.userService.findUserWithId(user.id);
  }

  @Get('all')
  async getAllUsers(@Query() filterUserDto: FilterUserDto) {
    return await this.userService.findAllUsers(filterUserDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.userService.findUserWithId(id);
  }

  @Patch()
  async update(
    @Body() updateUserDto: UpdateUserDto,
    @GetUser() user: UserEntity,
  ) {
    return await this.userService.updateUser(user.id, updateUserDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.userService.deleteUser(id);
  }
}
