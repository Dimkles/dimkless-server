import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Technologies } from 'src/technologies/technologies.model';
import { Project } from './projects.model';
import { TechnologiesProject } from 'src/technologies/technologies-project.model';
import { FilesModule } from 'src/files/files.module';

@Module({
  providers: [ProjectsService],
  controllers: [ProjectsController],
  imports: [
    SequelizeModule.forFeature([Technologies, Project, TechnologiesProject]),
    FilesModule
  ],
})
export class ProjectsModule { }
