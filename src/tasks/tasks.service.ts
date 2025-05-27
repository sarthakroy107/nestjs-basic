import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { UserEntity } from 'src/user/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskRepository } from './repositories/task.repository';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository) private taskRepository: TaskRepository,
  ) {}

  async create(createTaskDto: CreateTaskDto, user: UserEntity) {
    const newTask = this.taskRepository.create({
      body: createTaskDto.body,
      user: user,
    });

    await this.taskRepository.save(newTask);

    return {
      message: 'Task created successfully',
      data: {
        taskId: newTask.id,
        body: newTask.body,
        userId: newTask.user.id,
      },
    };
  }

  async findAll(user: UserEntity) {
    const tasks = await this.taskRepository.find({
      where: {
        user,
      },
    });

    return { data: tasks };
  }

  async findOne(id: string, user: UserEntity) {
    const task = await this.taskRepository.findOne({
      where: {
        id,
        user,
      },
    });

    return {
      data: task,
    };
  }

  async update(id: string, updateTaskDto: UpdateTaskDto, user: UserEntity) {
    const task = await this.taskRepository.findOne({
      where: {
        user,
        id,
      },
    });

    if (!task) throw new NotFoundException('Task not found');
    const updatedTask = { ...task, ...updateTaskDto };

    await this.taskRepository.save(updatedTask);

    return {
      message: 'User updated successfully',
    };
  }

  async remove(id: string, user: UserEntity) {
    const task = await this.taskRepository.findOne({
      where: {
        id,
        user,
      },
    });

    if (!task) throw new NotFoundException('Task does not exist');
    const taskId = task.id;

    await this.taskRepository.remove(task);

    return {
      message: `Task with id ${taskId} has been removed`,
    };
  }
}
