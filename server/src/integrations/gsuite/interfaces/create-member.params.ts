export interface CreateMemberParams {
  groupId: string;
  userId: string;
  role: 'MANAGER' | 'MEMBER' | 'OWNER';
}
