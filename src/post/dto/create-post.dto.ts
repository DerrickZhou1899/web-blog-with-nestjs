import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Category } from "src/category/entities/category.entity";

export class CreatePostDto {
  @IsNotEmpty({message:"Post title empty"})
  @IsString()
  title: string;
  @IsNotEmpty({message:"Post content empty"})
  @IsString()
  content: string;
  @IsOptional()
  @IsString()
  mainImageUrl: string;
  @IsOptional()
  category: Category
}
