import { Body, Controller, Delete, Get, Param, Post, Put, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { Technology } from 'src/technologies/technologies.model';
import { CreateProjectsDto } from './dto/create-projects.dto';
import { UpdateProjectsDto } from './dto/update-project.dto';
import { Project } from './projects.model';
import { ProjectsService } from './projects.service';


@ApiTags('Проекты')
@Controller('projects')
export class ProjectsController {
    constructor(private projectsService: ProjectsService) { }

    @ApiOperation({ summary: 'Создание проекта' })
    @ApiResponse({ status: 200, type: Project })
    @Post()
    @UseInterceptors(FileInterceptor('image'))
    create(@Body() dto: CreateProjectsDto, @UploadedFile() image) {
        return this.projectsService.createProjects(dto, image)
    }

    @ApiOperation({ summary: 'Получение всех проектов' })
    @ApiResponse({ status: 200, type: [Project] })
    @Get()
    getAllProjects() {
        return this.projectsService.getAllProjects()
    }

    @ApiOperation({ summary: 'Получение одного проекта по ID' })
    @ApiResponse({ status: 200, type: Project })
    @Get('/:id')
    getById(@Param('id') id: number) {
        return this.projectsService.getProjectById(id)
    }

    @ApiOperation({ summary: 'Обновление проекта по ID' })
    @ApiResponse({ status: 200, type: Project })
    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Put('/:id')
    @UseInterceptors(FileInterceptor('image'))
    updateProject(@Param('id') id: number, @Body() dto: UpdateProjectsDto, @UploadedFile() image) {
        return this.projectsService.updateProjectById(dto, id, image)
    }

    @ApiOperation({ summary: 'Удаление проекта по ID' })
    @ApiResponse({ status: 200, type: Project })
    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Delete('/:id')
    deleteProjectById(@Param('id') id: number) {
        return this.projectsService.deleteProjectById(id)
    }

}
