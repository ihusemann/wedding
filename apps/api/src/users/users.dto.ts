import { createZodDto } from '@anatine/zod-nestjs';
import { listUsersSchema } from '@repo/schemas';

export class ListUsersDto extends createZodDto(listUsersSchema) {}
