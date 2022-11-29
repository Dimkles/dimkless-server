import { Module } from '@nestjs/common';
import { TechnologiesService } from './technologies.service';
import { TechnologiesController } from './technologies.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Technologies } from './technologies.model';
import { Project } from 'src/projects/projects.model';
import { TechnologiesProject } from './technologies-project.model';

@Module({
  providers: [TechnologiesService],
  controllers: [TechnologiesController],
  imports: [
    SequelizeModule.forFeature([Technologies, Project, TechnologiesProject])
  ],
})
export class TechnologiesModule { }
