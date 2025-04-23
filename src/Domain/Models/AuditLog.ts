export interface AuditLog {
  log_id: string;
  user_id: string | null;
  action_type: string;
  target_id: string | null;
  target_type: string | null;
  ip_address: string | null;
  user_agent: string | null;
  metadata: string | null;
  created_at: Date;
}