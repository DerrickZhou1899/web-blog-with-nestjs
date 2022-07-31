import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectID, Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './entities/post.entity';
import * as mongoose from 'mongoose';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post) private readonly repo: Repository<Post>,
  ) {}
  async create(createPostDto: CreatePostDto) {
    console.log(createPostDto);
    const slug = await createPostDto.title.split(' ').join('_').toLowerCase();
    return await this.repo.insert({ ...createPostDto, slug });
  }

  async findAll() {
    return await this.repo.find();
  }

  async findOne(id: string) {
    //const post = await this.repo.findByIds;
    const query: any = { _id: new mongoose.Types.ObjectId(id) };
    const post = await this.repo.find(query);
    if (!post) {
      throw new BadRequestException('Post not found');
    }
    return post;
  }

  async update(id: number, updatePostDto: UpdatePostDto) {
    return await this.repo.update(id, updatePostDto);
  }

  async remove(id: ObjectID) {
    return await this.repo.delete(id);
  }
}
