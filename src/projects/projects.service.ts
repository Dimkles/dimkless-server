import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FilesService } from 'src/files/files.service';
import { CreateProjectsDto } from './dto/create-projects.dto';
import { UpdateProjectsDto } from './dto/update-project.dto';
import { Project } from './projects.model';

@Injectable()
export class ProjectsService {
    constructor(@InjectModel(Project) private projectsRepositiry: typeof Project, private fileService: FilesService) { }

    async getAllProjects() {
        const projects = await this.projectsRepositiry.findAll({ include: { all: true } })
        return projects
    }

    async getProjectById(id: number) {
        const project = await this.projectsRepositiry.findByPk(id, { include: { all: true } })
        return project
    }

    async createProjects(dto: CreateProjectsDto, image: File) {
        console.log(dto)
        console.log(image)
        const fileName = await this.fileService.createFile(image)
        const project = await this.projectsRepositiry.create({ ...dto, image: fileName })
        if (typeof dto.technologies === 'string') {
            const technologies = dto.technologies.split(',')
            technologies.map(async (technology) => {
                await project.$add('technologies', +technology)
            })
        } else {
            dto.technologies.map(async (technology) => {
                await project.$add('technologies', technology)
            })
        }
        return project
    }

    async updateProjectById(dto: UpdateProjectsDto, id: number, image: any) {
        console.log(id)
        const project = await this.projectsRepositiry.findByPk(id, { include: { all: true } })
        const fileName = await this.fileService.createFile(image)
        await this.fileService.deleteFile(project.image)
        project.image = fileName
        project.name = dto.name
        project.link = dto.link
        project.description = dto.description
        project.$remove('technologies', project.technologies.map((technology) => technology.id))
        if (typeof dto.technologies === 'string') {
            const technologies = dto.technologies.split(',')
            technologies.map(async (technology) => {
                await project.$add('technologies', +technology)
            })
        } else {
            dto.technologies.map(async (technology) => {
                await project.$add('technologies', technology)
            })
        }
        await project.save()
        const updateProject = await this.projectsRepositiry.findByPk(id, { include: { all: true } })
        return updateProject
    }

    async deleteProjectById(id: number) {
        const project = await this.projectsRepositiry.findByPk(id, { include: { all: true } })
        await this.fileService.deleteFile(project.image)
        project.destroy()
        return project
    }
}
