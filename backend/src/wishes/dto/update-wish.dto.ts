import { IsInt, IsUrl, Length, IsOptional } from 'class-validator';

export class UpdateWishDto {
  @Length(1, 250)
  @IsOptional()
  name?: string;

  @IsUrl()
  @IsOptional()
  link?: string;

  @IsUrl(
    {},
    {
      message: 'Некорректный URL изображения',
    },
  )
  @IsOptional()
  image?: string;

  @IsInt()
  @IsOptional()
  price?: number;

  @Length(1, 1000)
  @IsOptional()
  description?: string;
}
