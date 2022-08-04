import { Post } from 'src/post/entities/post.entity';
import { BeforeInsert, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Exclude } from 'class-transformer';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  email: string;
  @Column()
  lastName: string;
  @Column()
  firstName: string;
  @OneToMany(() => Post, (post) => post.user)
  post: Post[];
  @BeforeInsert()
  hashPassword() {
    this.password = bcrypt.hashSync(this.password, 10);
  }
  @Column()
  @Exclude()
  password: string;
}
