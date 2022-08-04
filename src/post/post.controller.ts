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
  Query,
  UseGuards,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { ObjectID } from 'typeorm';
import { query, Request } from 'express';
import { User } from 'src/auth/entities/user.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) { }

  @Post('/create')
  @UsePipes(ValidationPipe)
  create(@Body() createPostDto: CreatePostDto, @Req() req: Request) {
    //@ts-ignore
    return this.postService.create(createPostDto, req.user as User);
  }
  @UseGuards(AuthGuard('jwt'))
  @Get('/find-all')
  @UseInterceptors(ClassSerializerInterceptor)
  findAll(@Query() query: any) {
    return this.postService.findAll(query);
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
