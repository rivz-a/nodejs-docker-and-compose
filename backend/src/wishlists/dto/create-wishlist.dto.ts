import { IsArray, IsString, IsUrl, Length } from 'class-validator';

export class CreateWishlistDto {
  @IsString()
  @Length(1, 250)
  name: string;

  @IsUrl(
    {},
    {
      message: 'Некорректный URL изображения обложки для подборки',
    },
  )
  image: string;

  @IsArray()
  itemsId: number[];
}
