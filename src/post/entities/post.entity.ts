import { User } from 'src/auth/entities/user.entity';
import { Category } from 'src/category/entities/category.entity';
import { Column, Entity, ManyToOne, ObjectID, ObjectIdColumn } from 'typeorm';

@Entity('posts')
export class Post {
  @ObjectIdColumn()
  id: ObjectID;
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
  @ManyToOne(() => User, (user) => user.post, {
    eager: true,
  })
  user: User[];
  @ManyToOne(() => Category, (category) => category.post, {
    eager: true,
  })
  category: Category[];
}
