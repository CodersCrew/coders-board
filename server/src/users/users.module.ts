import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { IntegrationsModule } from '../integrations/integrations.module';
import { UserRepository } from './user.repository';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository]), IntegrationsModule],
  providers: [UsersResolver, UsersService],
})
export class UsersModule {}
