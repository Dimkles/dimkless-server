export class UpdateProjectsDto {
    readonly name: string
    readonly description: string
    readonly link: string
    readonly technologies: [number] | string
}