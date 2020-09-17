export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: Date;
};

export type Guild = {
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  name: Scalars['String'];
  description: Scalars['String'];
  color: Scalars['String'];
  image: Scalars['String'];
  clans: Clan[];
  members: GuildMember[];
};

export type Clan = {
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  name: Scalars['String'];
  description: Scalars['String'];
  image: Scalars['String'];
  guild: Guild[];
  guildId: Scalars['String'];
  positions: GuildPosition[];
};

export type Position = {
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  name: Scalars['String'];
  description: Scalars['String'];
  image?: Maybe<Scalars['String']>;
  scopes: PositionScope[];
  clan?: Maybe<Clan>;
  clanId?: Maybe<Scalars['String']>;
  guild?: Maybe<Guild>;
  guildId?: Maybe<Scalars['String']>;
};

export enum PositionScope {
  Organization = 'ORGANIZATION',
  Guild = 'GUILD',
  Squad = 'SQUAD',
}

export type GuildPosition = {
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  from: Scalars['DateTime'];
  to?: Maybe<Scalars['DateTime']>;
  notes?: Maybe<Scalars['String']>;
  position: Position;
  positionId: Scalars['String'];
  member: GuildMember;
  memberId: Scalars['String'];
  clan?: Maybe<Clan>;
  clanId: Scalars['String'];
};

export type GuildMember = {
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  role: TeamRole;
  user: User;
  userId: Scalars['String'];
  guild: Guild;
  guildId: Scalars['String'];
  positions: GuildPosition[];
};

export type GuildMemberPositionsArgs = {
  active?: Maybe<Scalars['Boolean']>;
};

export enum TeamRole {
  Owner = 'OWNER',
  Manager = 'MANAGER',
  Member = 'MEMBER',
}

export type Squad = {
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  name: Scalars['String'];
  description: Scalars['String'];
  color: Scalars['String'];
  image: Scalars['String'];
  members: SquadMember[];
  chapters: Chapter[];
};

export type Chapter = {
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  name: Scalars['String'];
  description: Scalars['String'];
  squad: Squad[];
  squadId: Scalars['String'];
  positions: SquadPosition[];
};

export type ChapterPositionsArgs = {
  active?: Maybe<Scalars['Boolean']>;
};

export type SquadPosition = {
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  from: Scalars['DateTime'];
  to?: Maybe<Scalars['DateTime']>;
  notes?: Maybe<Scalars['String']>;
  member: SquadMember;
  memberId: Scalars['String'];
  chapter?: Maybe<Chapter>;
  chapterId: Scalars['String'];
  position: Position;
  positionId: Scalars['String'];
};

export type SquadMember = {
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  role: TeamRole;
  positions: SquadPosition[];
  squad: Squad;
  squadId: Scalars['String'];
  user: User;
  userId: Scalars['String'];
};

export type SquadMemberPositionsArgs = {
  active?: Maybe<Scalars['Boolean']>;
};

export type Success = {
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  name: Scalars['String'];
  description: Scalars['String'];
  date: Scalars['DateTime'];
  type: SuccessType;
  users: User[];
  creator: User;
  creatorId: Scalars['String'];
};

export enum SuccessType {
  Epic = 'EPIC',
  Small = 'SMALL',
  News = 'NEWS',
}

export type User = {
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  fullName: Scalars['String'];
  primaryEmail: Scalars['String'];
  recoveryEmail: Scalars['String'];
  password?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  image: Scalars['String'];
  thumbnail: Scalars['String'];
  googleId: Scalars['String'];
  slackId?: Maybe<Scalars['String']>;
  role: UserRole;
  guilds: GuildMember[];
  squads: SquadMember[];
  successes: Success[];
};

export enum UserRole {
  Admin = 'ADMIN',
  User = 'USER',
}

export type Query = {
  clans: Clan[];
  guildMembers: GuildMember[];
  guildPositions: GuildPosition[];
  guilds: Guild[];
  guild: Guild;
  positions: Position[];
  chapters: Chapter[];
  squadMembers: SquadMember[];
  squadPositions: SquadPosition[];
  squads: Squad[];
  squad: Squad;
  successes: Success[];
  user: User;
  me: User;
  users: User[];
};

export type QueryClansArgs = {
  search?: Maybe<Scalars['String']>;
  guildId?: Maybe<Scalars['ID']>;
};

export type QueryGuildMembersArgs = {
  guildId: Scalars['ID'];
};

export type QueryGuildPositionsArgs = {
  guildId: Scalars['ID'];
  memberId?: Maybe<Scalars['String']>;
};

export type QueryGuildsArgs = {
  search?: Maybe<Scalars['String']>;
};

export type QueryGuildArgs = {
  id: Scalars['ID'];
};

export type QueryPositionsArgs = {
  search?: Maybe<Scalars['String']>;
  guildId?: Maybe<Scalars['ID']>;
  clanId?: Maybe<Scalars['ID']>;
  scopes?: Maybe<PositionScope[]>;
};

export type QueryChaptersArgs = {
  search?: Maybe<Scalars['String']>;
  squadId?: Maybe<Scalars['ID']>;
};

export type QuerySquadMembersArgs = {
  squadId: Scalars['ID'];
  archived?: Maybe<Scalars['Boolean']>;
};

export type QuerySquadPositionsArgs = {
  squadId: Scalars['ID'];
  memberId?: Maybe<Scalars['String']>;
};

export type QuerySquadsArgs = {
  search?: Maybe<Scalars['String']>;
};

export type QuerySquadArgs = {
  id: Scalars['ID'];
};

export type QuerySuccessesArgs = {
  search?: Maybe<Scalars['String']>;
  type?: Maybe<SuccessType>;
};

export type QueryUserArgs = {
  id: Scalars['ID'];
};

export type QueryUsersArgs = {
  search?: Maybe<Scalars['String']>;
  role?: Maybe<UserRole>;
  ids?: Maybe<Scalars['ID'][]>;
};

export type Mutation = {
  signIn: Scalars['Boolean'];
  signOut: Scalars['Boolean'];
  createClan: Clan;
  updateClan: Clan;
  deleteClan: Scalars['Boolean'];
  createGuildMember: GuildMember;
  updateGuildMember: GuildMember;
  createGuildPosition: GuildPosition;
  updateGuildPosition: GuildPosition;
  deleteGuildPosition: Scalars['Boolean'];
  createGuild: Guild;
  updateGuild: Guild;
  deleteGuild: Scalars['Boolean'];
  initialSyncSlackUser: User;
  createPosition: Position;
  updatePosition: Position;
  deletePosition: Scalars['Boolean'];
  createChapter: Chapter;
  updateChapter: Chapter;
  deleteChapter: Scalars['Boolean'];
  createSquadMember: SquadMember;
  updateSquadMember: SquadMember;
  archiveSquadMember: Scalars['Boolean'];
  deleteSquadMember: Scalars['Boolean'];
  createSquadPosition: SquadPosition;
  updateSquadPosition: SquadPosition;
  deleteSquadPosition: Scalars['Boolean'];
  createSquad: Squad;
  updateSquad: Squad;
  deleteSquad: Scalars['Boolean'];
  createSuccess: Success;
  updateSuccess: Success;
  deleteSuccess: Scalars['Boolean'];
  createUser: User;
  updateUser: User;
  deleteUser: Scalars['Boolean'];
};

export type MutationSignInArgs = {
  data: SignInInput;
};

export type MutationCreateClanArgs = {
  data: CreateClanInput;
};

export type MutationUpdateClanArgs = {
  data: UpdateClanInput;
};

export type MutationDeleteClanArgs = {
  id: Scalars['ID'];
  guildId: Scalars['ID'];
};

export type MutationCreateGuildMemberArgs = {
  data: CreateGuildMemberInput;
};

export type MutationUpdateGuildMemberArgs = {
  data: UpdateGuildMemberInput;
};

export type MutationCreateGuildPositionArgs = {
  data: CreateGuildPositionInput;
};

export type MutationUpdateGuildPositionArgs = {
  data: UpdateGuildPositionInput;
};

export type MutationDeleteGuildPositionArgs = {
  id: Scalars['ID'];
  guildId: Scalars['ID'];
};

export type MutationCreateGuildArgs = {
  data: CreateGuildInput;
};

export type MutationUpdateGuildArgs = {
  data: UpdateGuildInput;
};

export type MutationDeleteGuildArgs = {
  id: Scalars['ID'];
};

export type MutationInitialSyncSlackUserArgs = {
  data: InitialSyncSlackUserInput;
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

export type MutationCreateChapterArgs = {
  data: CreateChapterInput;
};

export type MutationUpdateChapterArgs = {
  data: UpdateChapterInput;
};

export type MutationDeleteChapterArgs = {
  id: Scalars['ID'];
  squadId: Scalars['ID'];
};

export type MutationCreateSquadMemberArgs = {
  data: CreateSquadMemberInput;
};

export type MutationUpdateSquadMemberArgs = {
  data: UpdateSquadMemberInput;
};

export type MutationArchiveSquadMemberArgs = {
  id: Scalars['ID'];
  squadId: Scalars['ID'];
};

export type MutationDeleteSquadMemberArgs = {
  id: Scalars['ID'];
  squadId: Scalars['ID'];
};

export type MutationCreateSquadPositionArgs = {
  data: CreateSquadPositionInput;
};

export type MutationUpdateSquadPositionArgs = {
  data: UpdateSquadPositionInput;
};

export type MutationDeleteSquadPositionArgs = {
  id: Scalars['ID'];
  squadId: Scalars['ID'];
};

export type MutationCreateSquadArgs = {
  data: CreateSquadInput;
};

export type MutationUpdateSquadArgs = {
  data: UpdateSquadInput;
};

export type MutationDeleteSquadArgs = {
  id: Scalars['ID'];
};

export type MutationCreateSuccessArgs = {
  data: CreateSuccessInput;
};

export type MutationUpdateSuccessArgs = {
  data: UpdateSuccessInput;
};

export type MutationDeleteSuccessArgs = {
  id: Scalars['ID'];
};

export type MutationCreateUserArgs = {
  data: CreateUserInput;
};

export type MutationUpdateUserArgs = {
  data: UpdateUserInput;
};

export type MutationDeleteUserArgs = {
  id: Scalars['ID'];
};

export type SignInInput = {
  primaryEmail: Scalars['String'];
  password: Scalars['String'];
};

export type CreateClanInput = {
  name: Scalars['String'];
  image: Scalars['String'];
  guildId: Scalars['ID'];
  description?: Maybe<Scalars['String']>;
};

export type UpdateClanInput = {
  name: Scalars['String'];
  image: Scalars['String'];
  guildId: Scalars['ID'];
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
};

export type CreateGuildMemberInput = {
  role: TeamRole;
  userId: Scalars['ID'];
  guildId: Scalars['ID'];
  positionId: Scalars['ID'];
};

export type UpdateGuildMemberInput = {
  id: Scalars['ID'];
  role: TeamRole;
  guildId: Scalars['ID'];
};

export type CreateGuildPositionInput = {
  from: Scalars['DateTime'];
  positionId: Scalars['ID'];
  memberId: Scalars['ID'];
  guildId: Scalars['ID'];
  to?: Maybe<Scalars['DateTime']>;
  notes?: Maybe<Scalars['String']>;
  clanId?: Maybe<Scalars['ID']>;
};

export type UpdateGuildPositionInput = {
  from: Scalars['DateTime'];
  positionId: Scalars['ID'];
  memberId: Scalars['ID'];
  guildId: Scalars['ID'];
  to?: Maybe<Scalars['DateTime']>;
  notes?: Maybe<Scalars['String']>;
  clanId?: Maybe<Scalars['ID']>;
  id: Scalars['ID'];
};

export type CreateGuildInput = {
  name: Scalars['String'];
  image: Scalars['String'];
  color: Scalars['String'];
  description?: Maybe<Scalars['String']>;
};

export type UpdateGuildInput = {
  name: Scalars['String'];
  image: Scalars['String'];
  color: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
};

export type InitialSyncSlackUserInput = {
  userId: Scalars['String'];
  slackId: Scalars['String'];
};

export type CreatePositionInput = {
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  scopes: PositionScope[];
  image?: Maybe<Scalars['String']>;
  clanId?: Maybe<Scalars['ID']>;
  guildId?: Maybe<Scalars['ID']>;
};

export type UpdatePositionInput = {
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  scopes: PositionScope[];
  image?: Maybe<Scalars['String']>;
  clanId?: Maybe<Scalars['ID']>;
  guildId?: Maybe<Scalars['ID']>;
  id: Scalars['ID'];
};

export type CreateChapterInput = {
  name: Scalars['String'];
  squadId: Scalars['ID'];
  description?: Maybe<Scalars['String']>;
};

export type UpdateChapterInput = {
  name: Scalars['String'];
  squadId: Scalars['ID'];
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
};

export type CreateSquadMemberInput = {
  role: TeamRole;
  userId: Scalars['ID'];
  squadId: Scalars['ID'];
  positionId: Scalars['ID'];
};

export type UpdateSquadMemberInput = {
  id: Scalars['ID'];
  role: TeamRole;
  squadId: Scalars['ID'];
};

export type CreateSquadPositionInput = {
  from: Scalars['DateTime'];
  memberId: Scalars['ID'];
  positionId: Scalars['ID'];
  to?: Maybe<Scalars['DateTime']>;
  notes?: Maybe<Scalars['String']>;
  chapterId?: Maybe<Scalars['ID']>;
  squadId: Scalars['ID'];
};

export type UpdateSquadPositionInput = {
  id: Scalars['ID'];
  from: Scalars['DateTime'];
  to?: Maybe<Scalars['DateTime']>;
  notes?: Maybe<Scalars['String']>;
  squadId: Scalars['ID'];
};

export type CreateSquadInput = {
  name: Scalars['String'];
  image: Scalars['String'];
  color: Scalars['String'];
  description?: Maybe<Scalars['String']>;
};

export type UpdateSquadInput = {
  name: Scalars['String'];
  image: Scalars['String'];
  color: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
};

export type CreateSuccessInput = {
  name: Scalars['String'];
  description: Scalars['String'];
  date: Scalars['DateTime'];
  type: SuccessType;
  usersIds: Scalars['ID'][];
};

export type UpdateSuccessInput = {
  name: Scalars['String'];
  description: Scalars['String'];
  date: Scalars['DateTime'];
  type: SuccessType;
  usersIds: Scalars['ID'][];
  id: Scalars['ID'];
};

export type CreateUserInput = {
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  primaryEmail: Scalars['String'];
  recoveryEmail: Scalars['String'];
  password?: Maybe<Scalars['String']>;
};

export type UpdateUserInput = {
  id: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  primaryEmail: Scalars['String'];
  recoveryEmail: Scalars['String'];
};

export const GraphQLOperations = {
  Query: {
    clans: 'clans',
    simpleClans: 'simpleClans',
    guild: 'guild',
    simpleGuilds: 'simpleGuilds',
    guilds: 'guilds',
    guildMembers: 'guildMembers',
    guildMembersIds: 'guildMembersIds',
    guildPositions: 'guildPositions',
    positions: 'positions',
    simplePositions: 'simplePositions',
    chapters: 'chapters',
    simpleChapters: 'simpleChapters',
    squad: 'squad',
    squads: 'squads',
    squadMembers: 'squadMembers',
    squadMembersIds: 'squadMembersIds',
    squadPositions: 'squadPositions',
    successes: 'successes',
    me: 'me',
    users: 'users',
    baseUserInfo: 'baseUserInfo',
    userActivity: 'userActivity',
    simpleUsers: 'simpleUsers',
  },
  Mutation: {
    createGuildMember: 'createGuildMember',
    updateGuildMember: 'updateGuildMember',
    createGuildPosition: 'createGuildPosition',
    updateGuildPosition: 'updateGuildPosition',
    deleteGuildPosition: 'deleteGuildPosition',
    initialSyncSlackUser: 'initialSyncSlackUser',
    createPosition: 'createPosition',
    updatePosition: 'updatePosition',
    deletePosition: 'deletePosition',
    createChapter: 'createChapter',
    updateChapter: 'updateChapter',
    deleteChapter: 'deleteChapter',
    createSquadMember: 'createSquadMember',
    updateSquadMember: 'updateSquadMember',
    archiveSquadMember: 'archiveSquadMember',
    deleteSquadMember: 'deleteSquadMember',
    createSquadPosition: 'createSquadPosition',
    updateSquadPosition: 'updateSquadPosition',
    deleteSquadPosition: 'deleteSquadPosition',
    createSuccess: 'createSuccess',
    updateSuccess: 'updateSuccess',
    deleteSuccess: 'deleteSuccess',
    signOut: 'signOut',
    signIn: 'signIn',
    createUser: 'createUser',
    updateUser: 'updateUser',
    deleteUser: 'deleteUser',
  },
  Fragment: {
    SuccessUser: 'SuccessUser',
  },
};
