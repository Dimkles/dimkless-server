import { BelongsTo, BelongsToMany, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { TechnologiesProject } from "src/technologies/technologies-project.model";
import { Technologies } from "src/technologies/technologies.model";
import { User } from "src/users/users.model";

interface ProjectCreationAttrs {
    name: string
    description: string
    link: string
    image: string
}

@Table({ tableName: 'projects' })
export class Project extends Model<Project, ProjectCreationAttrs> {
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number

    @Column({ type: DataType.STRING, allowNull: false })
    name: string

    @Column({ type: DataType.STRING, allowNull: false })
    description: string
    @Column({ type: DataType.STRING, allowNull: false })
    link: string

    @Column({ type: DataType.STRING, allowNull: false })
    image: string

    @BelongsToMany(() => Technologies, () => TechnologiesProject)
    technologies: Technologies[]

}