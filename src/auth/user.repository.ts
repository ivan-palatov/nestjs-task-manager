import {
  BadRequestException,
  ConflictException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import bcrypt from 'bcrypt';
import { EntityRepository, Repository } from 'typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { User } from './user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async signUp(credentialsDto: AuthCredentialsDto) {
    try {
      const { name, password } = credentialsDto;
      const hash = await bcrypt.hash(password, 10);
      await User.create({ name, password: hash }).save();
      return true;
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('User with this name already exists');
      }
      throw new InternalServerErrorException();
    }
  }

  async signIn(credentialsDto: AuthCredentialsDto) {
    const { name, password } = credentialsDto;
    const user = await this.findOne({ name });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    if (!(await bcrypt.compare(password, user.password))) {
      throw new BadRequestException('Wrong password');
    }

    delete user.password;
    return user;
  }
}
