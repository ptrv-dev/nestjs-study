import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/entity/user.entity';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { SignInDto } from './dto/sign-in.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signUp(dto: CreateUserDto): Promise<string> {
    const candidate = await this.userService.getOneByEmail(dto.email);
    if (candidate)
      throw new ConflictException('Specified email address already taken!');

    const hash = await bcrypt.hash(dto.password, 10);
    const user = await this.userService.create({ ...dto, password: hash });

    const token = this.generateToken(user);

    return token;
  }

  async signIn(dto: SignInDto): Promise<string> {
    const user = await this.userService.getOneByEmail(dto.email);
    if (!user) throw new UnauthorizedException();
    const valid = await bcrypt.compare(dto.password, user.password);
    if (!valid) throw new UnauthorizedException();
    const token = this.generateToken(user);
    return token;
  }

  private async generateToken(user: User): Promise<string> {
    const payload = { id: user.id, email: user.email, username: user.username };
    const token = await this.jwtService.signAsync(payload);
    return token;
  }
}
