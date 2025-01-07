import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly db: PrismaService) {}

  listUsers() {
    return this.db.trial.findMany();
  }
}
