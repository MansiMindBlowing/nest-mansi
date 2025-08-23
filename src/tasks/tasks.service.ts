// import { Injectable, NotFoundException } from "@nestjs/common";
// import { CreateTaskDto } from "../tasks/dto/create-task.dto";
// import { UpdateTaskDto } from "../tasks/dto/update-task.dto";

// export interface Task {
//     id: number;
//     title: string;
//     description: string;
// }

// @Injectable()
// export class TasksService {
//     private tasks: Task[] = [];
//     private nextId = 1;

//     findAll(): Task[]{
//         return this.tasks;
//     }

//     findOne(id: number): Task {
//         const task = this.tasks.find(task=>task.id === id);
//         if(!task){
//             throw new NotFoundException(`Task with id ${id} not found`)
//         }
//         return task;
//     }

//     createTask(createTaskDto: CreateTaskDto): Task{
//         const newTask = {
//             id: this.nextId++,
//             ...createTaskDto,
//         };
//         this.tasks.push(newTask);
//         return newTask;
//     }

//     update(id: number, updateTaskDto: UpdateTaskDto): Task {
//         const taskIndex = this.tasks.findIndex(task=>task.id===id);

//         if(taskIndex===-1){
//             throw new NotFoundException(`task with id ${id} not found`)
//         }

//         this.tasks[taskIndex] = {
//             ...this.tasks[taskIndex],
//             ...updateTaskDto
//         };

//         return this.tasks[taskIndex];
//     }
// }

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from '../tasks/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(Task)
        private tasksRepository: Repository<Task>,
    ) { }

    findAll(): Promise<Task[]> {
        return this.tasksRepository.find();
    }

    async findOne(id: number): Promise<Task> {
        const task = await this.tasksRepository.findOne({ where: { id } });
        if (!task) {
            throw new NotFoundException(`Task with id ${id} not found`);
        }
        return task;
    }

    createTask(createTaskDto: CreateTaskDto): Promise<Task> {
        const newTask = this.tasksRepository.create(createTaskDto);
        return this.tasksRepository.save(newTask);
    }

    async update(id: number, updateTaskDto: UpdateTaskDto): Promise<Task> {
        const task = await this.findOne(id);
        if (!task) {
            throw new NotFoundException(`Task with id ${id} not found`);
        }

        // Update the task properties
        Object.assign(task, updateTaskDto);

        // Save the updated task to the database
        return this.tasksRepository.save(task);
    }
}
