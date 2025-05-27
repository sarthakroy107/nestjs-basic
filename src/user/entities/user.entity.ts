import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UserRoleEnum } from '../user.model';
import { TaskEntity } from 'src/tasks/entities/task.entity';
import { Exclude } from 'class-transformer';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 50 })
  name: string;

  @Column({ unique: true })
  email: string;

  @Column('int')
  age: number;

  @Column()
  role: UserRoleEnum;

  @Column()
  password: string;

  @OneToMany(() => TaskEntity, (task) => task.user, {
    eager: true,
  })
  tasks: TaskEntity[];
}
