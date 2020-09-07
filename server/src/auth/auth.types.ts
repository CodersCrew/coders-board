import { Request } from 'express';
import { Profile } from 'passport-google-oauth20';

export type OAuthUser = {
  profile: Profile;
  accessToken: string;
};

export type OAuthRequest = Request & {
  user: OAuthUser;
};
