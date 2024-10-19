import { IsNotEmpty,IsString } from 'class-validator';

export class CreateEstablishmentHasPracticianDto {
  @IsString()
  @IsNotEmpty()
  establishmentId: string;

  @IsString()
  @IsNotEmpty()
  practicianId: string;
}