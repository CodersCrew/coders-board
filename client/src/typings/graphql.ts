export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: any }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: any;
};

export type TeamMember = {
  __typename?: 'TeamMember';
  id: Scalars['ID'];
  user: User;
  team: Team;
  role: TeamRole;
  positions: Array<MemberPosition>;
};

export enum TeamRole {
  Owner = 'OWNER',
  Manager = 'MANAGER',
  Member = 'MEMBER',
}

export type Team = {
  __typename?: 'Team';
  id: Scalars['ID'];
  googleId: Scalars['String'];
  name: Scalars['String'];
  image: Scalars['String'];
  description: Scalars['String'];
  email: Scalars['String'];
  color: Scalars['String'];
  kind: TeamKind;
  parent?: Maybe<Team>;
  children: Array<Team>;
  positions: Array<Team>;
  members: Array<Team>;
};

export enum TeamKind {
  Taskforce = 'TASKFORCE',
  Guild = 'GUILD',
  Clan = 'CLAN',
  Squad = 'SQUAD',
  Chapter = 'CHAPTER',
  Management = 'MANAGEMENT',
}

export type Position = {
  __typename?: 'Position';
  id: Scalars['ID'];
  name: Scalars['String'];
  description: Scalars['String'];
  image?: Maybe<Scalars['String']>;
  team?: Maybe<Position>;
  users: Array<MemberPosition>;
};

export type MemberPosition = {
  __typename?: 'MemberPosition';
  id: Scalars['ID'];
  from: Scalars['DateTime'];
  to?: Maybe<Scalars['DateTime']>;
  notes?: Maybe<Scalars['String']>;
  position: Position;
  teamMember: TeamMember;
};

export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  primaryEmail: Scalars['String'];
  recoveryEmail: Scalars['String'];
  phone: Scalars['String'];
  image: Scalars['String'];
  googleId: Scalars['String'];
  status: UserStatus;
  role: UserRole;
  teams: Array<TeamMember>;
  positions: Array<MemberPosition>;
};

export enum UserStatus {
  Pending = 'PENDING',
  Active = 'ACTIVE',
  Inactive = 'INACTIVE',
}

export enum UserRole {
  Admin = 'ADMIN',
  User = 'USER',
}

export type Query = {
  __typename?: 'Query';
  user: User;
  me: User;
  users: Array<User>;
  memberPositions: Array<MemberPosition>;
  positions: Array<Position>;
  teams: Array<Team>;
  team: Team;
  teamMembers: Array<TeamMember>;
};

export type QueryUserArgs = {
  id: Scalars['String'];
};

export type QueryUsersArgs = {
  search?: Maybe<Scalars['String']>;
  role?: Maybe<UserRole>;
  ids?: Maybe<Array<Scalars['ID']>>;
};

export type QueryMemberPositionsArgs = {
  teamMemberId?: Maybe<Scalars['String']>;
};

export type QueryPositionsArgs = {
  search?: Maybe<Scalars['String']>;
  teamId?: Maybe<Scalars['ID']>;
  global?: Maybe<Scalars['Boolean']>;
};

export type QueryTeamsArgs = {
  search?: Maybe<Scalars['String']>;
  parentId?: Maybe<Scalars['ID']>;
  kind?: Maybe<TeamKind>;
};

export type QueryTeamArgs = {
  id: Scalars['ID'];
};

export type QueryTeamMembersArgs = {
  nested?: Maybe<Scalars['Boolean']>;
  teamId: Scalars['ID'];
  role?: Maybe<TeamRole>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createUser: User;
  deleteUser: Scalars['Boolean'];
  migrateGoogleUsers: Array<User>;
  createMemberPosition: MemberPosition;
  updateMemberPosition: MemberPosition;
  deleteMemberPosition: Scalars['Boolean'];
  createPosition: Position;
  updatePosition: Position;
  deletePosition: Scalars['Boolean'];
  createTeam: Team;
  deleteTeam: Scalars['Boolean'];
  createTeamMember: TeamMember;
  deleteTeamMember: Scalars['Boolean'];
};

export type MutationCreateUserArgs = {
  data: CreateUserInput;
};

export type MutationDeleteUserArgs = {
  id: Scalars['ID'];
};

export type MutationCreateMemberPositionArgs = {
  data: CreateMemberPositionInput;
};

export type MutationUpdateMemberPositionArgs = {
  data: UpdateMemberPositionInput;
};

export type MutationDeleteMemberPositionArgs = {
  id: Scalars['ID'];
};

export type MutationCreatePositionArgs = {
  data: CreatePositionInput;
};

export type MutationUpdatePositionArgs = {
  data: UpdatePositionInput;
};

export type MutationDeletePositionArgs = {
  id: Scalars['ID'];
};

export type MutationCreateTeamArgs = {
  data: CreateTeamInput;
};

export type MutationDeleteTeamArgs = {
  id: Scalars['ID'];
};

export type MutationCreateTeamMemberArgs = {
  data: CreateTeamMemberInput;
};

export type MutationDeleteTeamMemberArgs = {
  id: Scalars['ID'];
};

export type CreateUserInput = {
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  password: Scalars['String'];
  primaryEmail: Scalars['String'];
  recoveryEmail: Scalars['String'];
};

export type CreateMemberPositionInput = {
  teamMemberId: Scalars['ID'];
  positionId: Scalars['ID'];
  from: Scalars['DateTime'];
  to?: Maybe<Scalars['DateTime']>;
  notes?: Maybe<Scalars['String']>;
};

export type UpdateMemberPositionInput = {
  id: Scalars['ID'];
  teamMemberId?: Maybe<Scalars['ID']>;
  positionId?: Maybe<Scalars['ID']>;
  from?: Maybe<Scalars['DateTime']>;
  to?: Maybe<Scalars['DateTime']>;
  notes?: Maybe<Scalars['String']>;
};

export type CreatePositionInput = {
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['String']>;
  teamId?: Maybe<Scalars['ID']>;
};

export type UpdatePositionInput = {
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['String']>;
  teamId?: Maybe<Scalars['ID']>;
};

export type CreateTeamInput = {
  name: Scalars['String'];
  email: Scalars['String'];
  kind: TeamKind;
  image?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  color?: Maybe<Scalars['String']>;
  parentId?: Maybe<Scalars['ID']>;
};

export type CreateTeamMemberInput = {
  userId: Scalars['ID'];
  teamId: Scalars['ID'];
  role?: Maybe<TeamRole>;
};

export const GraphQLOperations = {
  Query: {
    positionSelectPositions: 'positionSelectPositions',
    teamSelectTeams: 'teamSelectTeams',
    userSelectUsers: 'userSelectUsers',
    authMe: 'authMe',
    members: 'members',
    positions: 'positions',
    teams: 'teams',
    teamChildren: 'teamChildren',
    team: 'team',
    teamMembers: 'teamMembers',
    teamPositions: 'teamPositions',
  },
  Mutation: {
    createMember: 'createMember',
    deletePosition: 'deletePosition',
    createPosition: 'createPosition',
    updatePosition: 'updatePosition',
    createTeamMember: 'createTeamMember',
    deleteTeamPosition: 'deleteTeamPosition',
    createTeamPosition: 'createTeamPosition',
    updateTeamPosition: 'updateTeamPosition',
  },
  Fragment: {
    teamsListFields: 'teamsListFields',
  },
};
