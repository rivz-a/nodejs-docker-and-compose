import { IsInt, IsUrl, Length, IsNotEmpty } from 'class-validator';

export class CreateWishDto {
  @Length(1, 250)
  @IsNotEmpty()
  name: string;

  @IsUrl()
  @IsNotEmpty()
  link: string;

  @IsUrl(
    {},
    {
      message: 'Некорректный URL изображения',
    },
  )
  @IsNotEmpty()
  image: string;

  @IsInt()
  @IsNotEmpty()
  price: number;

  @Length(1, 1000)
  @IsNotEmpty()
  description: string;
}
