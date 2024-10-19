import { IsNotEmpty,IsString } from 'class-validator';

export class CreateEstablishmentHasSpecialtyDto {
  @IsString()
  @IsNotEmpty()
  establishmentId: string;

  @IsString()
  @IsNotEmpty()
  specialtyId: string;
}