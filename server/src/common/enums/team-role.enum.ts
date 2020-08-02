import { registerEnumType } from '@nestjs/graphql';

export enum TeamRole {
  OWNER = 'OWNER',
  MANAGER = 'MANAGER',
  MEMBER = 'MEMBER',
}

registerEnumType(TeamRole, {
  name: 'TeamRole',
});
