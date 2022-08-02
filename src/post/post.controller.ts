import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  ClassSerializerInterceptor,
  UsePipes,
  ValidationPipe,
  Req,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { ObjectID } from 'typeorm';
import { Request } from 'express';
import { User } from 'src/auth/entities/user.entity';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post('/create')
  @UsePipes(ValidationPipe)
  create(@Body() createPostDto: CreatePostDto, @Req() req: Request) {
    //@ts-ignore
    return this.postService.create(createPostDto, req.user as User);
  }

  @Get()
  @UseInterceptors(ClassSerializerInterceptor)
  findAll() {
    return this.postService.findAll();
  }

  @Post('/find-one')
  findOne(@Body() id: string) {
    return this.postService.findOne(id);
  }

  @Patch('/patch')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postService.update(+id, updatePostDto);
  }

  @Delete('/delete')
  remove(@Body() id: ObjectID) {
    return this.postService.remove(id);
  }
}
