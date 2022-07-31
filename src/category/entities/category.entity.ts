import { Post } from 'src/post/entities/post.entity';
import { Column, Entity, ObjectID, ObjectIdColumn, OneToMany } from 'typeorm';

@Entity('categories')
export class Category {
  @ObjectIdColumn()
  id: ObjectID;
  @Column()
  title: string;
  @Column()
  description: string;
  @OneToMany(() => Post, (post) => post.category)
  post: Post;
}
