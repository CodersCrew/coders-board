import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';

import { AuthModule } from './auth/auth.module';
import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';
import { GsuiteModule } from './gsuite/gsuite.module';
import { GuildsModule } from './guilds/guilds.module';
import { PositionsModule } from './positions/positions.module';
import { SquadsModule } from './squads/squads.module';
import { TypeOrmConfigService } from './typeorm-config.service';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useClass: TypeOrmConfigService,
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      cors: false,
      context: ({ req }) => ({ user: req.user }),
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', 'client', 'build'),
    }),
    UsersModule,
    AuthModule,
    PositionsModule,
    GsuiteModule,
    GuildsModule,
    SquadsModule,
  ],
  controllers: [],
})
export class AppModule {}
