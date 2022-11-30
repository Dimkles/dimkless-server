import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Project } from "src/projects/projects.model";
import { Technology } from "./technologies.model";


@Table({ tableName: 'technologies-project', createdAt: false, updatedAt: false })
export class TechnologiesProject extends Model<TechnologiesProject> {
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number

    @ForeignKey(() => Project)
    @Column({ type: DataType.INTEGER })
    projectId: number

    @ForeignKey(() => Technology)
    @Column({ type: DataType.INTEGER })
    technologiesId: number
}