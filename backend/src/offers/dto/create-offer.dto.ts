import { IsNumber, IsString, IsBoolean, Min } from 'class-validator';

export class CreateOfferDto {
  @IsString()
  itemId: number;

  @IsNumber()
  @Min(1)
  amount: number;

  @IsBoolean()
  hidden: boolean;
}
