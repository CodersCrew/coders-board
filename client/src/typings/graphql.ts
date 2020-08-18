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
  DateTime: any;
};

export type Guild = {
  __typename?: 'Guild';
  id: Scalars['ID'];
  name: Scalars['String'];
  description: Scalars['String'];
  email: Scalars['String'];
  googleId: Scalars['String'];
  color: Scalars['String'];
  image: Scalars['String'];
  clans: Array<Clan>;
  members: Array<GuildMember>;
};

export type Clan = {
  __typename?: 'Clan';
  id: Scalars['ID'];
  name: Scalars['String'];
  description: Scalars['String'];
  email: Scalars['String'];
  googleId: Scalars['String'];
  image: Scalars['String'];
  guild: Array<Guild>;
  guildId: Scalars['String'];
  positions: Array<GuildPosition>;
};

export type GuildPosition = {
  __typename?: 'GuildPosition';
  id: Scalars['ID'];
  from: Scalars['DateTime'];
  to?: Maybe<Scalars['DateTime']>;
  notes?: Maybe<Scalars['String']>;
  kind: GuildPositionKind;
  member: GuildMember;
  memberId: Scalars['String'];
  clan?: Maybe<Clan>;
  clanId: Scalars['String'];
};

export enum GuildPositionKind {
  Member = 'MEMBER',
  Leader = 'LEADER',
  Expert = 'EXPERT',
}

export type GuildMember = {
  __typename?: 'GuildMember';
  id: Scalars['ID'];
  role: TeamRole;
  user: User;
  userId: Scalars['String'];
  guild: Guild;
  guildId: Scalars['String'];
  positions: Array<GuildPosition>;
};

export type GuildMemberPositionsArgs = {
  active?: Maybe<Scalars['Boolean']>;
};

export enum TeamRole {
  Owner = 'OWNER',
  Manager = 'MANAGER',
  Member = 'MEMBER',
}

export type Position = {
  __typename?: 'Position';
  id: Scalars['ID'];
  name: Scalars['String'];
  description: Scalars['String'];
  image?: Maybe<Scalars['String']>;
  clan?: Maybe<Clan>;
  clanId: Scalars['String'];
  guild?: Maybe<Guild>;
  guildId: Scalars['String'];
};

export type Squad = {
  __typename?: 'Squad';
  id: Scalars['ID'];
  name: Scalars['String'];
  description: Scalars['String'];
  email: Scalars['String'];
  googleId: Scalars['String'];
  color: Scalars['String'];
  image: Scalars['String'];
  members: Array<SquadMember>;
  chapters: Array<Chapter>;
};

export type Chapter = {
  __typename?: 'Chapter';
  id: Scalars['ID'];
  name: Scalars['String'];
  description: Scalars['String'];
  email: Scalars['String'];
  googleId: Scalars['String'];
  squad: Array<Squad>;
  squadId: Scalars['String'];
  positions: Array<SquadPosition>;
};

export type ChapterPositionsArgs = {
  active?: Maybe<Scalars['Boolean']>;
};

export type SquadPosition = {
  __typename?: 'SquadPosition';
  id: Scalars['ID'];
  from: Scalars['DateTime'];
  to?: Maybe<Scalars['DateTime']>;
  notes?: Maybe<Scalars['String']>;
  member: SquadMember;
  memberId: Scalars['String'];
  chapter?: Maybe<Chapter>;
  chapterId: Scalars['String'];
  position: Position;
  positionId: Scalars['String'];
  clan?: Maybe<Chapter>;
};

export type SquadMember = {
  __typename?: 'SquadMember';
  id: Scalars['ID'];
  role: TeamRole;
  positions: Array<SquadPosition>;
  squad: Squad;
  squadId: Scalars['String'];
  user: User;
  userId: Scalars['String'];
};

export type SquadMemberPositionsArgs = {
  active?: Maybe<Scalars['Boolean']>;
};

export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  fullName: Scalars['String'];
  primaryEmail: Scalars['String'];
  recoveryEmail: Scalars['String'];
  phone?: Maybe<Scalars['String']>;
  image: Scalars['String'];
  thumbnail: Scalars['String'];
  googleId?: Maybe<Scalars['String']>;
  slackId?: Maybe<Scalars['String']>;
  status: UserStatus;
  role: UserRole;
  guilds: Array<GuildMember>;
  squads: Array<SquadMember>;
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

export type GsuiteUser = {
  __typename?: 'GsuiteUser';
  id: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  primaryEmail: Scalars['String'];
  recoveryEmail?: Maybe<Scalars['String']>;
};

export type SlackMessage = {
  __typename?: 'SlackMessage';
  text: Scalars['String'];
  user: Scalars['String'];
  botId: Scalars['String'];
  type: Scalars['String'];
};

export type SlackUser = {
  __typename?: 'SlackUser';
  id: Scalars['String'];
  fullName: Scalars['String'];
  primaryEmail: Scalars['String'];
  image: Scalars['String'];
  thumbnail: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  gsuiteUsers: Array<GsuiteUser>;
  slackUsers: Array<SlackUser>;
  clans: Array<Clan>;
  clan: Clan;
  guildMembers: Array<GuildMember>;
  guildPositions: Array<GuildPosition>;
  guilds: Array<Guild>;
  guild: Guild;
  positions: Array<Position>;
  chapters: Array<Chapter>;
  chapter: Chapter;
  squadMembers: Array<SquadMember>;
  squadPositions: Array<SquadPosition>;
  squads: Array<Squad>;
  squad: Squad;
  user: User;
  me: User;
  users: Array<User>;
};

export type QueryClansArgs = {
  search?: Maybe<Scalars['String']>;
  guildId?: Maybe<Scalars['ID']>;
};

export type QueryClanArgs = {
  id: Scalars['ID'];
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
};

export type QueryChaptersArgs = {
  search?: Maybe<Scalars['String']>;
  squadId?: Maybe<Scalars['ID']>;
};

export type QueryChapterArgs = {
  id: Scalars['ID'];
};

export type QuerySquadMembersArgs = {
  squadId: Scalars['ID'];
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

export type QueryUserArgs = {
  id: Scalars['String'];
};

export type QueryUsersArgs = {
  search?: Maybe<Scalars['String']>;
  role?: Maybe<UserRole>;
  ids?: Maybe<Array<Scalars['ID']>>;
};

export type Mutation = {
  __typename?: 'Mutation';
  signOut: Scalars['Boolean'];
  deleteGsuiteUser: Scalars['Boolean'];
  syncSlackUser: User;
  sendSlackMessage: SlackMessage;
  createClan: Clan;
  updateClan: Clan;
  deleteClan: Scalars['Boolean'];
  createGuildMember: GuildMember;
  updateGuildMember: GuildMember;
  deleteGuildMember: Scalars['Boolean'];
  createGuildPosition: GuildPosition;
  updateGuildPosition: GuildPosition;
  deleteGuildPosition: Scalars['Boolean'];
  createGuild: Guild;
  updateGuild: Guild;
  deleteGuild: Scalars['Boolean'];
  createPosition: Position;
  updatePosition: Position;
  deletePosition: Scalars['Boolean'];
  createChapter: Chapter;
  updateChapter: Chapter;
  deleteChapter: Scalars['Boolean'];
  createSquadMember: SquadMember;
  updateSquadMember: SquadMember;
  deleteSquadMember: Scalars['Boolean'];
  createSquadPosition: SquadPosition;
  updateSquadPosition: SquadPosition;
  deleteSquadPosition: Scalars['Boolean'];
  createSquad: Squad;
  updateSquad: Squad;
  deleteSquad: Scalars['Boolean'];
  createUser: User;
  deleteUser: Scalars['Boolean'];
};

export type MutationDeleteGsuiteUserArgs = {
  id: Scalars['String'];
};

export type MutationSyncSlackUserArgs = {
  data: SyncSlackUserInput;
};

export type MutationSendSlackMessageArgs = {
  data: SendSlackMessageInput;
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

export type MutationDeleteGuildMemberArgs = {
  id: Scalars['ID'];
  guildId: Scalars['ID'];
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

export type MutationCreateUserArgs = {
  data: CreateUserInput;
};

export type MutationDeleteUserArgs = {
  id: Scalars['ID'];
};

export type SyncSlackUserInput = {
  userId: Scalars['String'];
  slackId: Scalars['String'];
};

export type SendSlackMessageInput = {
  channelId: Scalars['String'];
  text: Scalars['String'];
};

export type CreateClanInput = {
  name: Scalars['String'];
  email: Scalars['String'];
  image: Scalars['String'];
  guildId: Scalars['ID'];
  description?: Maybe<Scalars['String']>;
};

export type UpdateClanInput = {
  name: Scalars['String'];
  email: Scalars['String'];
  image: Scalars['String'];
  guildId: Scalars['ID'];
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
};

export type CreateGuildMemberInput = {
  role: TeamRole;
  userId: Scalars['ID'];
  guildId: Scalars['ID'];
};

export type UpdateGuildMemberInput = {
  id: Scalars['ID'];
  role: TeamRole;
  guildId: Scalars['ID'];
};

export type CreateGuildPositionInput = {
  from: Scalars['DateTime'];
  kind: GuildPositionKind;
  memberId: Scalars['ID'];
  guildId: Scalars['ID'];
  to?: Maybe<Scalars['DateTime']>;
  notes?: Maybe<Scalars['String']>;
  clanId?: Maybe<Scalars['ID']>;
};

export type UpdateGuildPositionInput = {
  id: Scalars['ID'];
  from: Scalars['DateTime'];
  guildId: Scalars['ID'];
  to?: Maybe<Scalars['DateTime']>;
  notes?: Maybe<Scalars['String']>;
};

export type CreateGuildInput = {
  name: Scalars['String'];
  email: Scalars['String'];
  image: Scalars['String'];
  color: Scalars['String'];
  description?: Maybe<Scalars['String']>;
};

export type UpdateGuildInput = {
  name: Scalars['String'];
  email: Scalars['String'];
  image: Scalars['String'];
  color: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
};

export type CreatePositionInput = {
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['String']>;
  clanId?: Maybe<Scalars['ID']>;
  guildId?: Maybe<Scalars['ID']>;
};

export type UpdatePositionInput = {
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['String']>;
  clanId?: Maybe<Scalars['ID']>;
  guildId?: Maybe<Scalars['ID']>;
  id: Scalars['ID'];
};

export type CreateChapterInput = {
  name: Scalars['String'];
  email: Scalars['String'];
  squadId: Scalars['ID'];
  description?: Maybe<Scalars['String']>;
};

export type UpdateChapterInput = {
  name: Scalars['String'];
  email: Scalars['String'];
  squadId: Scalars['ID'];
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
};

export type CreateSquadMemberInput = {
  role: TeamRole;
  userId: Scalars['ID'];
  squadId: Scalars['ID'];
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
  email: Scalars['String'];
  image: Scalars['String'];
  color: Scalars['String'];
  description?: Maybe<Scalars['String']>;
};

export type UpdateSquadInput = {
  name: Scalars['String'];
  email: Scalars['String'];
  image: Scalars['String'];
  color: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
};

export type CreateUserInput = {
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  password: Scalars['String'];
  primaryEmail: Scalars['String'];
  recoveryEmail: Scalars['String'];
};

export const GraphQLOperations = {
  Query: {
    chapterSelectChapters: 'chapterSelectChapters',
    clanSelectClans: 'clanSelectClans',
    guildSelectGuilds: 'guildSelectGuilds',
    positionSelectPositions: 'positionSelectPositions',
    userSelectUsers: 'userSelectUsers',
    clans: 'clans',
    guild: 'guild',
    guildMembers: 'guildMembers',
    guildMembersIds: 'guildMembersIds',
    guildPositions: 'guildPositions',
    gsuiteUsers: 'gsuiteUsers',
    slackUsers: 'slackUsers',
    positions: 'positions',
    chapters: 'chapters',
    squad: 'squad',
    squadMembers: 'squadMembers',
    squadMembersIds: 'squadMembersIds',
    squadPositions: 'squadPositions',
    me: 'me',
    users: 'users',
    teams: 'teams',
  },
  Mutation: {
    createGuildMember: 'createGuildMember',
    updateGuildMember: 'updateGuildMember',
    deleteGuildMember: 'deleteGuildMember',
    createGuildPosition: 'createGuildPosition',
    updateGuildPosition: 'updateGuildPosition',
    deleteGuildPosition: 'deleteGuildPosition',
    syncSlackUser: 'syncSlackUser',
    createPosition: 'createPosition',
    updatePosition: 'updatePosition',
    deletePosition: 'deletePosition',
    createChapter: 'createChapter',
    updateChapter: 'updateChapter',
    deleteChapter: 'deleteChapter',
    createSquadMember: 'createSquadMember',
    updateSquadMember: 'updateSquadMember',
    deleteSquadMember: 'deleteSquadMember',
    createSquadPosition: 'createSquadPosition',
    updateSquadPosition: 'updateSquadPosition',
    deleteSquadPosition: 'deleteSquadPosition',
    signOut: 'signOut',
    createUser: 'createUser',
  },
};
