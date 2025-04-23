export class User {
  user_id: string;
  email: string;
  password_hash: string;
  role: string;
  is_verified: boolean;
  last_login: Date | null;
  created_at: Date;
  updated_at: Date | null;
  deactivated_at: Date | null;
}