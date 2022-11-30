import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { CreateTechnologiesDto } from './dto/create-technologies.dto';
import { Technology } from './technologies.model';
import { TechnologiesService } from './technologies.service';

@ApiTags('Технологии')
@Controller('technologies')
export class TechnologiesController {
    constructor(private technologiesService: TechnologiesService) { }
    @ApiOperation({ summary: 'Создание технологии' })
    @ApiResponse({ status: 200, type: Technology })
    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Post()
    create(@Body() dto: CreateTechnologiesDto) {
        return this.technologiesService.createTechnologies(dto)
    }

    @ApiOperation({ summary: 'Получение всех технологий' })
    @ApiResponse({ status: 200, type: [Technology] })
    @Get()
    getAllTechnologies() {
        return this.technologiesService.getAllTechnologies()
    }

    @ApiOperation({ summary: 'Получение технологии по ID' })
    @ApiResponse({ status: 200, type: Technology })
    @Get('/:id')
    getById(@Param('id') id: number) {
        return this.technologiesService.getTechnologyById(id)
    }

    @ApiOperation({ summary: 'Удаление технологии по ID' })
    @ApiResponse({ status: 200, type: Technology })
    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Delete('/:id')
    deleteById(@Param('id') id: number) {
        return this.technologiesService.deleteTechnologyById(id)
    }

}
