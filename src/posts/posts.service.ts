import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './entities/post.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
  ) {}

  async create(createPostDto: CreatePostDto): Promise<Post> {
    const newPost = await this.postRepository.create(createPostDto);
    await this.postRepository.save(newPost);
    return newPost;
  }

  async remove(id: string) {
    const deletePost = await this.postRepository.delete(id);
    if (!deletePost.affected) {
      throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
    }
  }

  findById(id: string): Promise<Post> {
    return this.findOne({ id: id });
  }

  findOne(param: any): Promise<Post> {
    return this.postRepository.findOne(param);
  }

  async update(id: string, updatePostDto: UpdatePostDto) {
    const updatePost = await this.findOne({ id: id });

    if (!updatePost) {
      throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
    }

    return await this.postRepository.update(id, updatePostDto);
  }

  findAll() {
    return this.postRepository.find();
  }

  search(key: string) {
    return this.postRepository
      .createQueryBuilder('post')
      .where('post.title LIKE :title', { title: `%${key}%` })
      .orWhere('post.category IN :category', { category: key })
      .orWhere('JSON_CONTAINS(post.tags, :tags)', { tags: `"${key}"` });
  }
}
