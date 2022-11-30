import { ApiProperty } from "@nestjs/swagger";

export class CreateTechnologiesDto {
    @ApiProperty({ example: 'ReactJS', description: 'Название технологии' })
    readonly name: string
}