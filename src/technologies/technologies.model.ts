import { BelongsToMany, Column, DataType, Model, Table } from "sequelize-typescript";
import { Project } from "src/projects/projects.model";
import { TechnologiesProject } from "./technologies-project.model";

interface TechnologiesCreationAttrs {
    name: string
}

@Table({ tableName: 'technologies' })
export class Technologies extends Model<Technologies, TechnologiesCreationAttrs> {
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number

    @Column({ type: DataType.STRING, allowNull: false })
    name: string

    @BelongsToMany(() => Project, () => TechnologiesProject)
    projects: Project[]
}