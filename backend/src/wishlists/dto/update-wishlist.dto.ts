import { IsString, IsUrl, Length, IsOptional, IsArray } from 'class-validator';

export class UpdateWishlistDto {
  @IsOptional()
  @IsString()
  @Length(1, 250)
  name?: string;

  @IsOptional()
  @IsUrl(
    {},
    {
      message: 'Некорректный URL изображения обложки для подборки',
    },
  )
  image?: string;

  @IsArray()
  items?: number[];
}
