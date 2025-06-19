import { 
  ArrayNotEmpty, 
  IsArray, 
  IsNotEmpty, 
  IsNumber, 
  IsString, 
  IsUrl, 
  Length, 
  Min 
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateCoffeeDto {
  @IsString()
  @IsNotEmpty()
  @Length(3, 50)
  name: string;

  @IsString()
  @Length(10, 200)
  description: string;

  @Type(() => Number)
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0.01)
  price: number;

  @IsUrl()
  imageUrl: string;

  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  tags: string[];
}
