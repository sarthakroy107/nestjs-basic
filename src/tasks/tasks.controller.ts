import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/dto/get-user.decorator';
import { UserEntity } from 'src/user/entities/user.entity';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  async create(
    @Body() createTaskDto: CreateTaskDto,
    @GetUser() user: UserEntity,
  ) {
    return await this.tasksService.create(createTaskDto, user);
  }

  @Get()
  async findAll(@GetUser() user: UserEntity) {
    return await this.tasksService.findAll(user);
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @GetUser() user: UserEntity) {
    return await this.tasksService.findOne(id, user);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
    @GetUser() user: UserEntity,
  ) {
    return await this.tasksService.update(id, updateTaskDto, user);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @GetUser() user: UserEntity) {
    return await this.tasksService.remove(id, user);
  }
}
