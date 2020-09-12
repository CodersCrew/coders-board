import {
  applyDecorators,
  CanActivate,
  ExecutionContext,
  Injectable,
  InternalServerErrorException,
  SetMetadata,
  UseGuards,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { get } from 'lodash';
import { getRepository } from 'typeorm';

import { GuildMember } from '../../guilds/guild-members/guild-member.model';
import { SquadMember } from '../../squads/squad-members/squad-member.model';
import { User, UserRole } from '../../users/user.model';
import { TeamRole } from '../enums/team-role.enum';

const roleValues = {
  [TeamRole.MEMBER]: 0,
  [TeamRole.MANAGER]: 1,
  [TeamRole.OWNER]: 2,
};

@Injectable()
export class HasTeamRole implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context).getContext().req;

    const userId = ctx.user?.id;
    const userRecord = await getRepository(User).findOne(userId);

    if (userRecord.role === UserRole.ADMIN) {
      return true;
    }

    const role = this.reflector.get<TeamRole>('role', context.getHandler());

    if (!role) {
      throw new InternalServerErrorException('No role specified');
    }

    const teamIdVariableName = this.reflector.get<string>('teamIdVariableName', context.getHandler());

    if (!teamIdVariableName) {
      throw new InternalServerErrorException('No teamIdVariableName specified');
    }

    const teamId: string = get(ctx, `req.body.variables.${teamIdVariableName}`);

    if (!teamId) {
      throw new InternalServerErrorException(`No ID founded in the ${teamIdVariableName} property`);
    }

    const teamKind = this.reflector.getAllAndOverride<'squad' | 'guild'>('teamKind', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!teamKind) {
      throw new InternalServerErrorException('No teamKind specified');
    }

    if (teamKind === 'squad') {
      const squadRecord = await getRepository(SquadMember).findOne({ where: { userId, squadId: teamId } });

      return squadRecord?.role && roleValues[squadRecord?.role] >= roleValues[role];
    }

    if (teamKind === 'guild') {
      const guildRecord = await getRepository(GuildMember).findOne({ where: { userId, guildId: teamId } });

      return guildRecord?.role && roleValues[guildRecord?.role] >= roleValues[role];
    }

    return false;
  }
}

export function TeamRoleGuard(role: TeamRole, teamIdVariableName: string) {
  return applyDecorators(
    SetMetadata('role', role),
    SetMetadata('teamIdVariableName', teamIdVariableName),
    UseGuards(HasTeamRole),
  );
}
