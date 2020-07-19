import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

import { ConfigService } from './config/config.service';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      url: this.configService.values.DATABASE_URL,
      ssl: this.configService.values.DATABASE_SSL,
      synchronize: this.configService.values.DATABASE_SYNC,
      autoLoadEntities: true,
    };
  }
}
