import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectID, Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './entities/post.entity';
import * as mongoose from 'mongoose';
import { User } from 'src/auth/entities/user.entity';

@Injectable()
export class PostService {
  constructor(@InjectRepository(Post) private readonly repo: Repository<Post>) { }
  async create(createPostDto: CreatePostDto, user: User) {
    //const slug = await createPostDto.title.split(' ').join('_').toLowerCase();
    const post = new Post();
    post.userId = 1;
    Object.assign(post, createPostDto);
    //return await this.repo.insert({ ...createPostDto });
    this.repo.create(post);
    return await this.repo.save(post);
  }
  //http://localhost:5000/post?sort=asc&title=TomJerry
  async findAll(query?: string) {
    const myQuery = this.repo
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.category', 'category')
      .leftJoinAndSelect('post.user', 'user');
    if (!(Object.keys(query).length == 0) && query.constructor == Object) {
      const queryKeys = Object.keys(query);
      if (queryKeys.includes('title')) {
        myQuery.where('post.title LIKE :title', { title: `%${query['title']}%` });
      }
      if (queryKeys.includes('sort')) {
        myQuery.orderBy('post.title', query['sort'].toUpperCase());
      }
      if (queryKeys.includes('category')) {
        myQuery.andWhere('category.category = :cat', { cat: query['category'] });
      }
    } else {
      return myQuery.getMany();
    }
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
