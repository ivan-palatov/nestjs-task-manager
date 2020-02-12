import { IsString, Length, Matches } from 'class-validator';

export class AuthCredentialsDto {
  @IsString()
  @Length(2, 150)
  name: string;

  @IsString()
  @Length(6, 32)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Password is too weak',
  })
  password: string;
}
