export interface TestSession {
  tts_session_id: string;
  tts_child_id: string;
  tts_tester_id: string;
  tts_test_date: Date;
  tts_corrected_age: number;
  tts_general_notes: string | null;
  tts_status: string;
  tts_created_at: Date;
}