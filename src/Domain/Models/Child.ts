export interface Child {
  chl_id: string;
  chl_first_name: string;
  chl_last_name: string;
  chl_birthdate: Date;
  chl_gender: string;
  chl_gestational_age: number;
  chl_parent_id: string;
  chl_created_at: Date;
  chl_updated_at: Date | null;
}