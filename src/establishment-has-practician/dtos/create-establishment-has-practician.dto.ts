import { IsString, IsNotEmpty } from 'class-validator';

export class CreateEstablishmentHasPracticianDto {
  @IsString()
  @IsNotEmpty()
  establishmentId: string;

  @IsString()
  @IsNotEmpty()
  practicianId: string;
}