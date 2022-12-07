import { Body, Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreatePostDto } from './dto/create-post.dto';
import { PostsService } from './posts.service';
@ApiTags('Посты (в разработке)')
@Controller('posts')
export class PostsController {

    constructor(private postService: PostsService) { }

    @Post()
    @UseInterceptors(FileInterceptor('image'))
    createPost(@Body() dto: CreatePostDto,
        @UploadedFile() image) {
        return this.postService.create(dto, image)
    }
}
