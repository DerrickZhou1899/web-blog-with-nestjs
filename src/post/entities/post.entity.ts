import { User } from 'src/auth/entities/user.entity';
import { Category } from 'src/category/entities/category.entity';
import "reflect-metadata";
import slugify from 'slugify';
import { BeforeInsert, Column, Entity, JoinColumn, ManyToOne, ObjectID, ObjectIdColumn, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity('posts')
export class Post {
  @ObjectIdColumn()
  key: ObjectID;
  @Column()
  title: string;
  @Column()
  content: string;
  @Column()
  slug: string;
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createOn: Date;
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  modifyOn: Date;
  @Column()
  mainImageUrl: string;
  @Column()
  @Exclude()
  userId: number;
  @Column({ default: 1 })
  categoryId: number;
  @ManyToOne(() => User, (user) => user.post, {
    eager: true,
  })
  @JoinColumn({
    name: 'userId',
    referencedColumnName: 'key'
  })
  user: User;
  @ManyToOne(() => Category, (category) => category.post, {
    eager: true,
  })
  @JoinColumn({
    name: 'categoryId',
    referencedColumnName: 'key'
  })
  category: Category;
  @BeforeInsert()
  slugifyPost(){
    this.slug = slugify(this.title.substring(0,20),{ //0 - 20 ký tự thì stop
      lower: true,
      replacement: '_',
    })
  }
}
