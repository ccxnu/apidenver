export interface TestResult {
  trs_result_id: string;
  trs_session_id: string;
  trs_item_id: number;
  trs_result: string;
  trs_observations: string | null;
  trs_test_time: string | null;
  trs_attempts: number | null;
}