import { ApiProperty } from "@nestjs/swagger";
import { BelongsToMany, Column, DataType, Model, Table } from "sequelize-typescript";
import { Project } from "src/projects/projects.model";
import { TechnologiesProject } from "./technologies-project.model";

interface TechnologiesCreationAttrs {
    name: string
}

@Table({ tableName: 'technologies' })
export class Technology extends Model<Technology, TechnologiesCreationAttrs> {
    @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number

    @ApiProperty({ example: 'JavaScript', description: 'Название технологии' })
    @Column({ type: DataType.STRING, allowNull: false })
    name: string

    @BelongsToMany(() => Project, () => TechnologiesProject)
    projects: Project[]
}