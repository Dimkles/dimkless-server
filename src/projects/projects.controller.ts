import { Body, Controller, Delete, Get, Param, Post, Put, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateProjectsDto } from './dto/create-projects.dto';
import { UpdateProjectsDto } from './dto/update-project.dto';
import { ProjectsService } from './projects.service';

@Controller('projects')
export class ProjectsController {
    constructor(private projectsService: ProjectsService) { }

    @Post()
    @UseInterceptors(FileInterceptor('image'))
    create(@Body() dto: CreateProjectsDto, @UploadedFile() image) {
        return this.projectsService.createProjects(dto, image)
    }
    @Get()
    getAllProjects() {
        return this.projectsService.getAllProjects()
    }

    @Get('/:id')
    getById(@Param('id') id: number) {
        return this.projectsService.getProjectById(id)
    }

    @Put('/:id')
    @UseInterceptors(FileInterceptor('image'))
    updateProject(@Param('id') id: number, @Body() dto: UpdateProjectsDto, @UploadedFile() image) {
        return this.projectsService.updateProjectById(dto, id, image)
    }

    @Delete('/:id')
    deleteProjectById(@Param('id') id: number) {
        return this.projectsService.deleteProjectById(id)
    }

}
