import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostModule } from './post/post.module';
import { CategoryModule } from './category/category.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    PostModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 5000,
      database: 'MyDatabase',
      username: 'root',
      password: '123456',
      //url: 'jdbc:mysql://localhost:5000/MyDatabase'y
      //useUnifiedTopology: true,
      //family:4,
      autoLoadEntities: true,
      synchronize: true,
    }),
    CategoryModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
