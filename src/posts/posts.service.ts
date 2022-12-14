import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FilesService } from 'src/files/files.service';
import { CreatePostDto } from './dto/create-post.dto';
import { Post } from './posts.model';

@Injectable()
export class PostsService {

    constructor(@InjectModel(Post) private postsRepository: typeof Post,
        private fileService: FilesService) { }

    async create(dto: CreatePostDto, image: any) {
        const { imagejpg, imagewebp } = await this.fileService.createFile(image)
        const post = await this.postsRepository.create({ ...dto, image: imagejpg })
        return post
    }
}
