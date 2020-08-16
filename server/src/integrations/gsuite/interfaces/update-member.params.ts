export interface UpdateMemberParams {
  groupId: string;
  userId: string;
  role: 'MANAGER' | 'MEMBER' | 'OWNER';
}
