import { ApiProperty } from "@nestjs/swagger"

export class CreateProjectsDto {
    @ApiProperty({ example: 'Лендинг', description: 'Название проекта' })
    readonly name: string
    @ApiProperty({ example: 'Какое-то описание', description: 'Описание проекты' })
    readonly description: string
    @ApiProperty({ example: 'https://dimkless.ru/band-digital/', description: 'Ссылка на проект' })
    readonly link: string
    @ApiProperty({ example: " [1,2,3,4] or '1, 2, 3, 4' ", description: 'ID технологий, в троку через запятую, либо массив цифр' })
    readonly technologies: number[] | string
}