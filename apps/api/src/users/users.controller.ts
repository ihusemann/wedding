import { Controller, Get, UsePipes } from '@nestjs/common';
import { UsersService } from './users.service';
import { ZodValidationPipe } from '@anatine/zod-nestjs';

@Controller('users')
@UsePipes(ZodValidationPipe)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('')
  listUsers() {
    return this.usersService.listUsers();
  }
}
