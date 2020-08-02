import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { GsuiteService } from '../gsuite/gsuite.service';
import { TeamsService } from '../teams/teams.service';
import { UsersService } from '../users/users.service';
import { CreateTeamMemberInput } from './dto/create-team-member.input';
import { GetTeamMembersArgs } from './dto/get-team-members.args';
import { TeamMember } from './team-member.model';
import { TeamMemberRepository } from './team-member.repository';

@Injectable()
export class TeamMembersService {
  constructor(
    @InjectRepository(TeamMemberRepository)
    private readonly teamMemberRepository: TeamMemberRepository,
    private readonly gsuiteService: GsuiteService,
    private readonly teamsService: TeamsService,
    private readonly usersService: UsersService,
  ) {}

  async getUser(teamMemberId: string) {
    const teamMember = await this.findByIdOrThrow(teamMemberId);
    return teamMember.user;
  }

  async getTeam(teamMemberId: string) {
    const teamMember = await this.findByIdOrThrow(teamMemberId);
    return teamMember.team;
  }

  findByIdOrThrow(id: string): Promise<TeamMember> {
    if (!id) throw new BadRequestException();

    return this.teamMemberRepository.findOneOrFail(id);
  }

  findAll({ teamId, role }: GetTeamMembersArgs): Promise<TeamMember[]> {
    const query = this.teamMemberRepository.createQueryBuilder('teamMember');

    query.where('teamMember.teamId = :teamId', { teamId });

    if (role) {
      query.andWhere('teamMember.role = :role', { role });
    }

    return query.getMany();
  }

  async create({ userId, teamId, role }: CreateTeamMemberInput): Promise<TeamMember> {
    const [user, team] = await Promise.all([
      this.usersService.findByIdOrThrow(userId),
      this.teamsService.findByIdOrThrow(teamId),
    ]);

    if (team.parentId) {
      try {
        await this.teamMemberRepository.findOneOrFail({ where: { teamId: team.parentId, userId } });
      } catch {
        throw new BadRequestException('User must be a member of parent team before he can join its child team');
      }
    }

    await this.gsuiteService.createMember({
      googleGroupId: team.googleId,
      userEmail: user.primaryEmail,
      role,
    });

    return this.teamMemberRepository.save({ userId, teamId, role });
  }

  async delete(teamMemberId: string): Promise<boolean> {
    const teamMember = await this.findByIdOrThrow(teamMemberId);
    const team = await teamMember.team;
    const user = await teamMember.user;

    if (!team.parentId) {
      const children = await team.children;

      for (const childTeam of children) {
        const memberInChildTeam = await this.teamMemberRepository.findOne({
          where: { teamId: childTeam.id, userId: teamMember.userId },
        });

        if (memberInChildTeam) {
          throw new BadRequestException(
            'You cannot remove member of parent team if he is also a member of its child team',
          );
        }
      }
    }

    await this.gsuiteService.deleteMember({ googleGroupId: team.googleId, googleUserId: user.googleId });
    await this.teamMemberRepository.delete(teamMemberId);

    return true;
  }
}
