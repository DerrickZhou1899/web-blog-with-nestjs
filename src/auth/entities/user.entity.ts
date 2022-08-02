import { Post } from 'src/post/entities/post.entity';
import { BeforeInsert, Column, Entity, ObjectID, ObjectIdColumn, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import bcrypt from 'bcryptjs';
import { Exclude } from 'class-transformer';

@Entity('users')
export class User {
  @ObjectIdColumn()
  key: number;
  
  @Column()
  email: string;
  @Column()
  @Exclude()
  password: string;
  @Column()
  lastName: string;
  @Column()
  firstName: string;
  @OneToMany(() => Post, (post) => post.user)
  post: Post[];
  @BeforeInsert()
  hashPassword(){
    this.password = bcrypt.hashPassword(this.password,32);
  }
}
