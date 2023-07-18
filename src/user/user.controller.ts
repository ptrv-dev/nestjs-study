import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthService } from 'src/auth/auth.service';

@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  @UseGuards(RolesGuard)
  @UseGuards(AuthGuard)
  @Roles('ADMIN')
  @Get()
  async getAll() {
    const users = await this.userService.getAll();
    return { data: users, message: '' };
  }

  @UseGuards(RolesGuard)
  @UseGuards(AuthGuard)
  @Roles('ADMIN')
  @Get(':id')
  async getOneById(@Param('id') id: string) {
    const user = await this.userService.getOneById(parseInt(id));
    return { data: user, message: '' };
  }

  @UseGuards(RolesGuard)
  @UseGuards(AuthGuard)
  @Roles('ADMIN')
  @Post()
  async create(@Body() dto: CreateUserDto) {
    const token = await this.authService.signUp(dto);
    return {
      accessToken: token,
    };
  }

  @UseGuards(RolesGuard)
  @UseGuards(AuthGuard)
  @Roles('ADMIN')
  @Patch(':id')
  async updateOneById(@Param('id') id: string, @Body() dto: UpdateUserDto) {
    const user = await this.userService.updateOneById(parseInt(id), dto);
    return { data: user, message: '' };
  }

  @UseGuards(RolesGuard)
  @UseGuards(AuthGuard)
  @Roles('ADMIN')
  @Delete(':id')
  async removeOneById(@Param('id') id: string) {
    const user = await this.userService.removeOneById(parseInt(id));
    return { data: user, message: '' };
  }
}
