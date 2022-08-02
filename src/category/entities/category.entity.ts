import { Post } from 'src/post/entities/post.entity';
import { Column, Entity, ObjectID, ObjectIdColumn, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('categories')
export class Category {
  @ObjectIdColumn()
  key: ObjectID;
  @Column()
  title: string;
  @Column()
  description: string;
  @OneToMany(() => Post, (post) => post.category)
  post: Post;
}
