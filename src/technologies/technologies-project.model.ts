import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Project } from "src/projects/projects.model";
import { Technologies } from "./technologies.model";


@Table({ tableName: 'user_roles', createdAt: false, updatedAt: false })
export class TechnologiesProject extends Model<TechnologiesProject> {
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number

    @ForeignKey(() => Project)
    @Column({ type: DataType.INTEGER })
    projectId: number

    @ForeignKey(() => Technologies)
    @Column({ type: DataType.INTEGER })
    technologiesId: number

}