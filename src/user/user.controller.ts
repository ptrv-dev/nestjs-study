import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(AuthGuard)
  @Get()
  async getAll() {
    const users = await this.userService.getAll();
    return { data: users, message: '' };
  }

  @Get(':id')
  async getOneById(@Param('id') id: string) {
    const user = await this.userService.getOneById(parseInt(id));
    return { data: user, message: '' };
  }

  @Patch(':id')
  async updateOneById(@Param('id') id: string, @Body() dto: UpdateUserDto) {
    const user = await this.userService.updateOneById(parseInt(id), dto);
    return { data: user, message: '' };
  }

  @Delete(':id')
  async removeOneById(@Param('id') id: string) {
    const user = await this.userService.removeOneById(parseInt(id));
    return { data: user, message: '' };
  }
}
