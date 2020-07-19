export interface CreateMemberParams {
  googleGroupId: string;
  userEmail: string;
  role: 'MANAGER' | 'MEMBER' | 'OWNER';
}
