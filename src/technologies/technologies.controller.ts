import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { CreateTechnologiesDto } from './dto/create-technologies.dto';
import { TechnologiesService } from './technologies.service';

@Controller('technologies')
export class TechnologiesController {
    constructor(private technologiesService: TechnologiesService) { }

    @Post()
    create(@Body() dto: CreateTechnologiesDto) {
        return this.technologiesService.createTechnologies(dto)
    }

    @Get()
    getAllTechnologies() {
        return this.technologiesService.getAllTechnologies()
    }

    @Get('/:id')
    getById(@Param('id') id: number) {
        return this.technologiesService.getTechnologyById(id)
    }

}
