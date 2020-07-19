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

    const googleId = await this.gsuiteService.createMember({
      googleGroupId: team.googleId,
      userEmail: user.primaryEmail,
      role,
    });

    return this.teamMemberRepository.save({ user: Promise.resolve(user), team: Promise.resolve(team), role, googleId });
  }

  async delete(teamMemberId: string): Promise<boolean> {
    const teamMember = await this.findByIdOrThrow(teamMemberId);
    const team = await this.teamsService.findByIdOrThrow(teamMember.teamId);

    await this.gsuiteService.deleteMember({ googleGroupId: team.googleId, googleMemberId: teamMember.googleId });
    await this.teamMemberRepository.delete(teamMemberId);

    return true;
  }
}
