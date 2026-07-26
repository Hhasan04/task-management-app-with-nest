import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { TaskStatus } from './task-status.enum';
import { TaskPriority } from './task-priority.enum';


@Entity()
export class Task {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    title!: string;

    @Column({ nullable: true })
    description!: string;

    @Column({
        type: 'enum',
        enum: TaskStatus,
        default: TaskStatus.TODO,
    })
    status!: TaskStatus;

    @Column({
        type: 'enum',
        enum: TaskPriority,
        default: TaskPriority.MEDIUM,
    })
    priority!: TaskPriority;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;

    @Column({ type: 'datetime', nullable: true })
    dueDate!: Date;
}