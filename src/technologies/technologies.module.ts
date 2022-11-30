import { forwardRef, Module } from '@nestjs/common';
import { TechnologiesService } from './technologies.service';
import { TechnologiesController } from './technologies.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Technology } from './technologies.model';
import { Project } from 'src/projects/projects.model';
import { TechnologiesProject } from './technologies-project.model';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  providers: [TechnologiesService],
  controllers: [TechnologiesController],
  imports: [
    SequelizeModule.forFeature([Technology, Project, TechnologiesProject]),
    forwardRef(() => AuthModule)
  ],

})
export class TechnologiesModule { }
