import { IsString, IsNotEmpty } from 'class-validator';

export class CreateEstablishmentHasSpecialtyDto {
  @IsString()
  @IsNotEmpty()
  establishmentId: string;

  @IsString()
  @IsNotEmpty()
  specialtyId: string;
}