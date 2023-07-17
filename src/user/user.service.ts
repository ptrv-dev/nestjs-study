import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entity/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async getAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async getOneById(id: number): Promise<User> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user)
      throw new NotFoundException("User with specified ID doesn't exist!");
    return user;
  }

  async getOneByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOneBy({ email });
    return user;
  }

  async create(dto: CreateUserDto): Promise<User> {
    const user = this.userRepository.save(dto);
    return user;
  }

  async removeOneById(id: number): Promise<User> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user)
      throw new NotFoundException("User with specified ID doesn't exist!");
    await this.userRepository.remove(user);
    return user;
  }

  async updateOneById(id: number, dto: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user)
      throw new NotFoundException("User with specified ID doesn't exist!");

    const { email, password, username } = dto;

    if (email) {
      const exist = await this.userRepository.findOneBy({ email });
      if (exist && exist.id !== user.id)
        throw new ConflictException('Specified email address already taken!');
    }

    Object.assign(user, { email, password, username });

    const result = await this.userRepository.save(user);
    return result;
  }
}
