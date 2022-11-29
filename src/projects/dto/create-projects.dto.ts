export class CreateProjectsDto {
    readonly name: string
    readonly description: string
    readonly link: string
    readonly image: string
    readonly technologies: [string]
}