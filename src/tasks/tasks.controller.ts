import { Body, Controller, Get, Param, Post, Put } from "@nestjs/common";
import { TasksService } from "../tasks/tasks.service"
// import { Task } from "../tasks/tasks.service"
import { CreateTaskDto } from "../tasks/dto/create-task.dto";
import { UpdateTaskDto } from "../tasks/dto/update-task.dto";
// import { Task } from "./task.entity";
import {Task} from "../tasks/task.entity"

@Controller('tasks')
export class TasksController {
    constructor(private readonly tasksService: TasksService){}

        @Get()
        findAll(){
            return this.tasksService.findAll();
        }

        @Get(':id')
        findOne(@Param('id') id:string): Promise<Task> {
            return this.tasksService.findOne(Number(id));
        }

        @Post()
        CreateTask(@Body() createTaskDto : CreateTaskDto){
            return this.tasksService.createTask(createTaskDto);
        }

        @Put(':id')
        update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) : Promise<Task> {
            return this.tasksService.update(Number(id), updateTaskDto)
        }
    }
