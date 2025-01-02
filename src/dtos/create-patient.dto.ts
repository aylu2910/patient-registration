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
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  address: string;

  @IsNotEmpty()
  @IsPhoneNumber()
  phoneNumber: string;

  @IsNotEmpty()
  @IsUrl()
  imageDocument: string;
}
