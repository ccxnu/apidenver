export interface DevelopmentalAlert {
  dal_alert_id: string;
  dal_child_id: string;
  dal_item_id: number;
  dal_alert_type: string;
  dal_severity: number;
  dal_recommendations: string;
  dal_created_at: Date;
}