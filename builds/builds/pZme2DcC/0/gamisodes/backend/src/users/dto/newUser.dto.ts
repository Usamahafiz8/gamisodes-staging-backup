import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiExpose } from 'src/shared/utils';

export class NewUserDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiExpose('user@gmail.com', {
    required: true,
    description: 'Email of new user',
  })
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiExpose('0x123456', {
    required: true,
    description: 'Address of new user',
  })
  wallet: string;

  @IsString()
  @IsNotEmpty()
  @ApiExpose('google-oauth2|1234...', {
    required: true,
    description: 'The Id in auth0 system',
  })
  sub: string;

  // Rarible fields, for verify source of request. For feature.
  //
  // @IsString()
  // @IsNotEmpty()
  // @ApiExpose('eyJhbGciOiJSU...', {
  //   required: true,
  //   description: 'Signature for approval validity of the request',
  // })
  // signature: string;

  // @IsString()
  // @IsNotEmpty()
  // @ApiExpose('20d6ce2424dfb6b70...', {
  //   required: true,
  //   description: "The creator's public key",
  // })
  // publicKey: string;
}
