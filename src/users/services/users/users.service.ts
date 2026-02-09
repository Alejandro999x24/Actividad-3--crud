import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { User } from '../../entities/user.entity';

@Injectable()
export class UsersService {
  constructor(private dataSource: DataSource) {}

  async findAll(): Promise<User[]> {
    const repo = this.dataSource.getRepository(User);
    return repo.find();
  }

  async create(data: { name: string; lastName: string }): Promise<User> {
    const repo = this.dataSource.getRepository(User);
    const user = repo.create(data);
    return repo.save(user);
  }

  async update(
    id: string,
    data: Partial<{ name: string; lastName: string }>,
  ): Promise<User> {
    const repo = this.dataSource.getRepository(User);
    const user = await repo.findOneByOrFail({ id });
    repo.merge(user, data);
    return repo.save(user);
  }

  async delete(id: string): Promise<void> {
    const repo = this.dataSource.getRepository(User);
    await repo.delete(id);
  }
}