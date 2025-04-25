-- -----------------------------------------------------
-- Table children
-- -----------------------------------------------------
-- CREATE TYPE gender AS ENUM ('M', 'F', 'O');
CREATE TABLE IF NOT EXISTS dnv_parents (
  prt_id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
  prt_identification VARCHAR(10) UNIQUE NOT NULL,
  prt_full_name VARCHAR(200) NOT NULL,
  prt_phone VARCHAR(13),
  prt_email VARCHAR(150),
  prt_created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  prt_updated_at TIMESTAMP NULL
);

-- DROP TYPE IF EXISTS gender

CREATE TABLE IF NOT EXISTS dnv_children (
  chl_id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
  chl_first_name VARCHAR(100) NOT NULL,
  chl_last_name VARCHAR(100) NOT NULL,
  chl_birthdate DATE NOT NULL,
  chl_gender TEXT CHECK(chl_gender IN ('M', 'F', 'O')) NOT NULL,
  chl_gestational_age DECIMAL(4,2) NOT NULL,
  chl_parent_id UUID NOT NULL,
  chl_created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  chl_updated_at TIMESTAMP NULL,
  CONSTRAINT fk_children_parents FOREIGN KEY (chl_parent_id) REFERENCES dnv_parents (prt_id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE INDEX idx_children_birthdate ON dnv_children (chl_birthdate ASC);

-- -----------------------------------------------------
-- Table testers
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS dnv_testers (
  tst_id TEXT primary key DEFAULT (lower(hex(randomblob(16)))),
  tst_full_name VARCHAR(200) NOT NULL,
  tst_professional_license VARCHAR(50) NOT NULL,
  tst_specialty VARCHAR(100) NOT NULL,
  tst_email VARCHAR(100) NOT NULL UNIQUE,
  tst_phone VARCHAR(13),
  tst_created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  tst_updated_at TIMESTAMP NOT NULL
);

create UNIQUE INDEX email_UNIQUE ON dnv_testers (tst_email ASC);

-- -----------------------------------------------------
-- Table dnv_categories
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS dnv_categories (
  ctg_category_id INTEGER PRIMARY KEY AUTOINCREMENT,
  ctg_name VARCHAR(50) NOT NULL,
  ctg_description TEXT,
  ctg_age_min_days SMALLINT NOT NULL,
  ctg_age_max_days SMALLINT NOT NULL,
  CONSTRAINT valid_age_range CHECK (ctg_age_max_days >= ctg_age_min_days)
);

-- -----------------------------------------------------
-- Table test_items
-- -----------------------------------------------------
-- DROP TYPE IF EXISTS dnv_test_item_type
--CREATE TYPE dnv_test_item_type AS ENUM ('Observado', 'Reportado', 'Examinado');

CREATE TABLE IF NOT EXISTS dnv_test_items (
  tti_item_id INTEGER PRIMARY KEY AUTOINCREMENT,
  tti_category_id SMALLINT NOT NULL,
  tti_item_code VARCHAR(10) NOT NULL,
  tti_description TEXT NOT NULL,
  tti_percentile_25 SMALLINT NOT NULL,
  tti_percentile_50 SMALLINT NOT NULL,
  tti_percentile_75 SMALLINT NOT NULL,
  tti_percentile_90 SMALLINT NOT NULL,
  tti_item_type TEXT CHECK(tti_item_type IN ('Observado', 'Reportado', 'Examinado')) NOT NULL default 'Observado',
  tti_order SMALLINT NOT NULL,
  tti_question TEXT NOT null,
  CONSTRAINT fk_test_items_test_categories FOREIGN KEY (tti_category_id)
    REFERENCES dnv_categories (ctg_category_id) ON DELETE CASCADE ON UPDATE CASCADE
);

-- Índice para la columna category_id
CREATE INDEX fk_test_items_test_categories_idx ON dnv_test_items (tti_category_id);

-- Índice único para item_code
CREATE UNIQUE INDEX item_code_unique ON dnv_test_items (tti_item_code);


-- -----------------------------------------------------
-- Table test_sessions
-- -----------------------------------------------------
-- DROP TYPE IF EXISTS dnv_test_status

CREATE TABLE IF NOT EXISTS dnv_test_sessions (
  tts_session_id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
  tts_child_id UUID NOT NULL,
  tts_tester_id UUID NOT NULL,
  tts_test_date DATE NOT NULL,
  tts_corrected_age DECIMAL(5,2) NOT NULL,
  tts_general_notes TEXT,
  tts_status TEXT NOT NULL DEFAULT 'Pendiente',
  tts_created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_test_sessions_children FOREIGN KEY (tts_child_id)
  	REFERENCES dnv_children (chl_id) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT fk_test_sessions_testers FOREIGN KEY (tts_tester_id)
  	REFERENCES dnv_testers (tst_id) ON DELETE RESTRICT ON UPDATE CASCADE
);

-- Índices adicionales
CREATE INDEX fk_test_sessions_children_idx ON dnv_test_sessions (tts_child_id);
CREATE INDEX fk_test_sessions_testers_idx ON dnv_test_sessions (tts_tester_id);


-- -----------------------------------------------------
-- Table test_results
-- -----------------------------------------------------
-- DROP TYPE IF EXISTS dnv_result_status

-- CREATE TYPE dnv_result_status AS ENUM ('Logrado', 'No logrado', 'No aplicable', 'No observado');

CREATE TABLE IF NOT EXISTS dnv_test_results (
  trs_result_id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
  trs_session_id UUID NOT NULL,
  trs_item_id SMALLINT NOT NULL,
  trs_result TEXT CHECK(trs_result IN ('Logrado', 'No logrado', 'No aplicable', 'No observado')) NOT NULL,
  trs_observations TEXT,
  trs_test_time TIME,
  trs_attempts SMALLINT,
  CONSTRAINT fk_results_session FOREIGN KEY (trs_session_id)
    REFERENCES dnv_test_sessions (tts_session_id) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT fk_results_item FOREIGN KEY (trs_item_id)
    REFERENCES dnv_test_items (tti_item_id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_results_session ON dnv_test_results (trs_session_id);
CREATE INDEX IF NOT EXISTS idx_results_item ON dnv_test_results (trs_item_id);


-- -----------------------------------------------------
-- Table developmental_alerts
-- -----------------------------------------------------
-- DROP TYPE IF EXISTS dnv_alert_type

-- CREATE TYPE dnv_alert_type AS ENUM ('Retraso', 'Precaución');
CREATE TABLE IF NOT EXISTS dnv_developmental_alerts (
  dal_alert_id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
  dal_child_id UUID NOT NULL,
  dal_item_id SMALLINT NOT NULL,
  dal_alert_type TEXT CHECK(dal_alert_type IN ('Retraso', 'Precaución')) NOT NULL,
  dal_severity SMALLINT NOT NULL CHECK (dal_severity BETWEEN 1 AND 5),
  dal_recommendations TEXT NOT NULL,
  dal_created_at TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_alerts_children FOREIGN KEY (dal_child_id)
    REFERENCES dnv_children (chl_id) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT fk_alerts_items FOREIGN KEY (dal_item_id)
    REFERENCES dnv_test_items (tti_item_id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_alerts_child_id ON dnv_developmental_alerts (dal_child_id);
CREATE INDEX IF NOT EXISTS idx_alerts_item_id ON dnv_developmental_alerts (dal_item_id);


-- -----------------------------------------------------
-- Table dnv_users
-- -----------------------------------------------------
-- DROP TYPE IF EXISTS user_role
-- CREATE TYPE dnv_users AS ENUM ('ADMINISTRADOR', 'DOCTOR', 'REPRESENTANTE', 'PACIENTE');

CREATE TABLE IF NOT EXISTS dnv_users (
  user_id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash CHAR(60) NOT NULL,
  role TEXT CHECK(role IN ('ADMINISTRADOR', 'DOCTOR', 'REPRESENTANTE', 'PACIENTE')) NOT NULL,
  is_verified BOOLEAN NOT NULL DEFAULT FALSE,
  last_login TIMESTAMP,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP,
  deactivated_at TIMESTAMP
);

CREATE INDEX idx_users_role ON dnv_users (role);

-- -----------------------------------------------------
-- Table dnv_email_verifications
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS dnv_email_verifications (
  verification_id UUID PRIMARY KEY,
  user_id UUID NOT NULL,
  token CHAR(64) NOT NULL UNIQUE,
  expires_at TIMESTAMP WITHOUT TIME ZONE NOT NULL,
  consumed_at TIMESTAMP,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_email_verifications_users FOREIGN KEY (user_id) REFERENCES dnv_users (user_id)
    ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE INDEX fk_email_verifications_users_idx ON dnv_email_verifications (user_id);

-- -----------------------------------------------------
-- Table dnv_password_resets
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS dnv_password_resets (
  reset_id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
  user_id UUID NOT NULL,
  token CHAR(64) NOT NULL UNIQUE,
  expires_at TIMESTAMP NOT NULL,
  consumed_at TIMESTAMP,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_password_resets_users FOREIGN KEY (user_id)
    REFERENCES dnv_users (user_id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE INDEX fk_password_resets_users_idx ON dnv_password_resets (user_id);

-- -----------------------------------------------------
-- Table dnv_audit_logs
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS dnv_audit_logs (
  log_id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
  user_id UUID,
  action_type VARCHAR(50) NOT NULL,
  target_id UUID,
  target_type VARCHAR(50),
  ip_address VARCHAR(45),
  user_agent VARCHAR(255),
  metadata TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_audit_logs_users FOREIGN KEY (user_id)
  REFERENCES dnv_users (user_id) ON DELETE SET NULL ON UPDATE CASCADE
);

CREATE INDEX idx_audit_logs_action_type ON dnv_audit_logs (action_type);
CREATE INDEX idx_audit_logs_user_id ON dnv_audit_logs (user_id);
