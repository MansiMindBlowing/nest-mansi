import { Body, Controller, Get, Param, Post, Put } from "@nestjs/common";
import { TasksService } from "../tasks/tasks.service"
import type { Task } from "../tasks/tasks.service"
import { CreateTaskDto } from "../tasks/dto/create-task.dto";
import { UpdateTaskDto } from "../tasks/dto/update-task.dto";

@Controller('tasks')
export class TasksController {
    constructor(private readonly tasksService: TasksService){}

        @Get()
        findAll(){
            return this.tasksService.findAll();
        }

        @Get(':id')
        findOne(@Param('id') id:string): Task {
            return this.tasksService.findOne(Number(id));
        }

        @Post()
        CreateTask(@Body() createTaskDto : CreateTaskDto){
            return this.tasksService.createTask(createTaskDto);
        }

        @Put(':id')
        update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) : Task {
            return this.tasksService.update(Number(id), updateTaskDto)
        }
    }
