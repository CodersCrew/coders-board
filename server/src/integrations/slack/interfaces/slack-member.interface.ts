export interface SlackMember {
  id: string;
  name: string;
  deleted: boolean;
  profile: {
    title: string;
    phone: string;
    real_name: string;
    real_name_normalized: string;
    display_name: string;
    display_name_normalized: string;
    status_text: string;
    email: string;
    image_original: string;
    image_24: string;
    image_32: string;
    image_48: string;
    image_72: string;
    image_192: string;
    image_512: string;
  };
  is_admin: boolean;
  is_owner: boolean;
  is_primary_owner: boolean;
  is_restricted: boolean;
  is_ultra_restricted: boolean;
  is_bot: boolean;
  is_stranger: boolean;
  is_app_user: boolean;
  is_invited_user: boolean;
  has_2fa: boolean;
}
