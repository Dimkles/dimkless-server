import { ApiProperty } from "@nestjs/swagger";
import { BelongsTo, BelongsToMany, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { TechnologiesProject } from "src/technologies/technologies-project.model";
import { Technology } from "src/technologies/technologies.model";
import { User } from "src/users/users.model";

interface ProjectCreationAttrs {
    name: string
    description: string
    link: string
    image: string
}

@Table({ tableName: 'projects' })
export class Project extends Model<Project, ProjectCreationAttrs> {
    @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number

    @ApiProperty({ example: 'Лендинг', description: 'Название проекты' })
    @Column({ type: DataType.STRING, allowNull: false })
    name: string

    @ApiProperty({ example: 'Какое-то описание', description: 'Описание проекты' })
    @Column({ type: DataType.TEXT, allowNull: false })
    description: string

    @ApiProperty({ example: 'https://dimkless.ru/band-digital/', description: 'Ссылка на проект' })
    @Column({ type: DataType.STRING, allowNull: false })
    link: string

    @ApiProperty({ example: 'imageName.jpg', description: 'Название изображения на сервере' })
    @Column({ type: DataType.STRING, allowNull: false })
    image: string

    @BelongsToMany(() => Technology, () => TechnologiesProject)
    technologies: Technology[]

}