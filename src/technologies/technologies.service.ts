import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateTechnologiesDto } from './dto/create-technologies.dto';
import { Technology } from './technologies.model';

@Injectable()
export class TechnologiesService {
    constructor(@InjectModel(Technology) private technologiesRepository: typeof Technology) { }

    async createTechnologies(dto: CreateTechnologiesDto) {
        const technology = await this.technologiesRepository.create(dto)
        return technology
    }
    async getTechnologyById(id: number) {
        const technology = await this.technologiesRepository.findByPk(id)
        return technology
    }
    async getAllTechnologies() {
        const technologies = await this.technologiesRepository.findAll()
        return technologies
    }
    async deleteTechnologyById(id: number) {
        const technology = await this.technologiesRepository.findByPk(id)
        technology.destroy()
        return technology
    }
}
