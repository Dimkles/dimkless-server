import { Body, Controller, Get, Param, Post } from '@nestjs/common';
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
    getByValue(@Param('id') id: number) {
        return this.technologiesService.getTechnologyById(id)
    }
}
