import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import { UsersService } from '../../services/users/users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  get() {
    return this.usersService.findAll();
  }

  @Post()
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        lastName: { type: 'string' },
      },
      required: ['name', 'lastName'],
    },
  })
  read(@Body() body: { name: string; lastName: string }) {
    return this.usersService.create(body);
  }

  @Patch(':id')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        lastName: { type: 'string' },
      },
    },
  })
  update(
    @Param('id') id: string,
    @Body() body: Partial<{ name: string; lastName: string }>,
  ) {
    return this.usersService.update(id, body);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.usersService.delete(id);
  }
}