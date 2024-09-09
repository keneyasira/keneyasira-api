import { IsNumber, IsNotEmpty } from 'class-validator';

export class CreatePracticianHasSpecialtyDto {
  @IsNumber()
  @IsNotEmpty()
  practicianId: string;

  @IsNumber()
  @IsNotEmpty()
  specialtyId: string;

}