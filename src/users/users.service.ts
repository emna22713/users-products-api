import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createUser(dto: CreateUserDto) {
    const exists = await this.userRepository.findOne({
      where: { email: dto.email },
    });
    if (exists) {
      throw new ConflictException('Cet email est déjà utilisé');
    }

    const hashed = await bcrypt.hash(dto.password, 10);
    const user = this.userRepository.create({ ...dto, password: hashed });
    const saved = await this.userRepository.save(user);

    const { password, ...result } = saved;
    return result;
  }

  async getAllUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  async getUserById(id: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`Utilisateur avec l'id ${id} introuvable`);
    }
    return user;
  }

  async updateUser(id: number, dto: UpdateUserDto) {
    const user = await this.getUserById(id);

    if (dto.email && dto.email !== user.email) {
      const emailTaken = await this.userRepository.findOne({
        where: { email: dto.email },
      });
      if (emailTaken) {
        throw new ConflictException('Cet email est déjà utilisé');
      }
    }

    if (dto.password) {
      dto.password = await bcrypt.hash(dto.password, 10);
    }

    Object.assign(user, dto);
    const updated = await this.userRepository.save(user);

    const { password, ...result } = updated;
    return result;
  }

  async deleteUser(id: number): Promise<{ message: string }> {
    const user = await this.getUserById(id);
    await this.userRepository.remove(user);
    return { message: `Utilisateur ${id} supprimé avec succès` };
  }
}