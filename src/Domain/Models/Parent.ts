export interface Parent {
  prt_id: string;
  prt_identification: string;
  prt_full_name: string;
  prt_phone?: string;
  prt_email?: string;
  prt_created_at: Date;
  prt_updated_at?: Date;
}