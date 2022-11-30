import { forwardRef, Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Technology } from 'src/technologies/technologies.model';
import { Project } from './projects.model';
import { TechnologiesProject } from 'src/technologies/technologies-project.model';
import { FilesModule } from 'src/files/files.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  providers: [ProjectsService],
  controllers: [ProjectsController],
  imports: [
    SequelizeModule.forFeature([Technology, Project, TechnologiesProject]),
    FilesModule,
    forwardRef(() => AuthModule)
  ],
})
export class ProjectsModule { }
