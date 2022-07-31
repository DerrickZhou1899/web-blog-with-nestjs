import { Post } from 'src/post/entities/post.entity';
import { Column, Entity, ObjectID, ObjectIdColumn, OneToMany } from 'typeorm';

@Entity('users')
export class User {
  @ObjectIdColumn()
  id: ObjectID;
  @Column()
  email: string;
  @Column()
  password: string;
  @Column()
  lastName: string;
  @Column()
  firstName: string;
  @OneToMany(() => Post, (post) => post.user)
  post: Post[];
}
