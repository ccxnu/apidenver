export interface PasswordReset {
  reset_id: string;
  user_id: string;
  token: string;
  expires_at: Date;
  consumed_at?: Date;
  created_at: Date;
}