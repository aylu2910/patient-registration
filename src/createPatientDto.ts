import {
  IsNotEmpty,
  IsString,
  IsUrl,
  IsEmail,
  IsPhoneNumber,
} from 'class-validator';

export class CreatePatientDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  readonly address: string;

  @IsNotEmpty()
  @IsPhoneNumber()
  readonly phoneNumber: string;

  @IsNotEmpty()
  @IsUrl()
  readonly imageDocument: string;
}
