// Servicio de usuarios que maneja la lógica de negocio relacionada con los usuarios,
// incluyendo la obtención de todos los usuarios, la creación de un nuevo usuario, la actualización de un usuario existente
// y la eliminación de un usuario. Utiliza el repositorio de TypeORM para interactuar con la base de datos
// y realizar las operaciones necesarias.
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User, 'mysqlConnection')
    private readonly userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async create(data: { name: string; lastName: string }): Promise<User> {
    const user = this.userRepository.create(data);
    return this.userRepository.save(user);
  }

  async update(
    id: string,
    // PartialType de CreateUserDto se utiliza para permitir que los campos sean opcionales al actualizar un usuario,
    data: Partial<{ name: string; lastName: string }>,
  ): Promise<User> {
    // Encuentra el usuario existente por su ID
    const user = await this.userRepository.findOneByOrFail({ id });
    // Merge los datos actualizados con el usuario existente
    this.userRepository.merge(user, data);
    // Guarda el usuario actualizado en la base de datos
    return this.userRepository.save(user);
  }

  async delete(id: string): Promise<void> {
    // Elimina el usuario por su ID utilizando el repositorio de TypeORM
    await this.userRepository.delete(id);
  }
}
