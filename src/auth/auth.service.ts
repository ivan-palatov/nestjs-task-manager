import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { JwtPayload } from './jwt-payload.interface';
import { UserRepository } from './user.repository';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository) private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  signUp(credentials: AuthCredentialsDto) {
    return this.userRepository.signUp(credentials);
  }

  async signIn(credentials: AuthCredentialsDto) {
    const user = await this.userRepository.signIn(credentials);

    const payload: JwtPayload = { name: user.name }; // Could also contain roles and stuff
    const accessToken = await this.jwtService.signAsync(payload);

    return { accessToken };
  }
}
