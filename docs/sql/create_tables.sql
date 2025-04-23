-- -----------------------------------------------------
-- Schema denver
-- -----------------------------------------------------
DROP DATABASE IF EXISTS ists_denver;
CREATE DATABASE ists_denver;
-- -----------------------------------------------------
-- Table children
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS dnv_parents (
  prt_id UUID PRIMARY KEY NOT NULL,
  prt_identification VARCHAR(10) UNIQUE NOT NULL,
  prt_full_name VARCHAR(200) NOT NULL,
  prt_phone VARCHAR(13),
  prt_email VARCHAR(150),
  prt_created_at TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
  prt_updated_at TIMESTAMP WITHOUT TIME ZONE NULL
);

CREATE TYPE gender AS ENUM ('M', 'F', 'O');

CREATE TABLE IF NOT EXISTS dnv_children (
  chl_id UUID PRIMARY KEY NOT NULL,
  chl_first_name VARCHAR(100) NOT NULL,
  chl_last_name VARCHAR(100) NOT NULL,
  chl_birthdate DATE NOT NULL,
  chl_gender gender,
  chl_gestational_age DECIMAL(4,2) NOT NULL,
  chl_parent_id UUID NOT NULL,
  chl_created_at TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
  chl_updated_at TIMESTAMP WITHOUT TIME ZONE NULL,
  CONSTRAINT fk_children_parents FOREIGN KEY (chl_parent_id) REFERENCES dnv_parents (prt_id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE INDEX idx_children_birthdate ON dnv_children (chl_birthdate ASC);
COMMENT on column dnv_children.chl_gestational_age is 'Edad gestacional al nacer (en semanas)';

-- -----------------------------------------------------
-- Table testers
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS dnv_testers (
  tst_id UUID primary key NOT NULL,
  tst_full_name VARCHAR(200) NOT NULL,
  tst_professional_license VARCHAR(50) NOT NULL,
  tst_specialty VARCHAR(100) NOT NULL,
  tst_email VARCHAR(100) NOT NULL UNIQUE,
  tst_phone VARCHAR(13),
  tst_created_at TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
  tst_updated_at TIMESTAMP WITHOUT TIME ZONE NOT NULL
);

create UNIQUE INDEX email_UNIQUE ON dnv_testers (tst_email ASC);

-- -----------------------------------------------------
-- Table dnv_categories
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS dnv_categories (
  ctg_category_id SERIAL PRIMARY KEY,
  ctg_name VARCHAR(50) NOT NULL,
  ctg_description TEXT,
  ctg_age_min_days SMALLINT NOT NULL,  -- Edad mínima en meses
  ctg_age_max_days SMALLINT NOT NULL,    -- Edad máxima en meses
  CONSTRAINT valid_age_range CHECK (ctg_age_max_days >= ctg_age_min_days)
);

COMMENT ON COLUMN dnv_categories.ctg_name IS 'Personal-Social, Fine Motor, Language, Gross Motor';
COMMENT ON COLUMN dnv_categories.ctg_age_max_days IS 'Edad mínima en días';
COMMENT ON COLUMN dnv_categories.ctg_age_min_days IS 'Edad máxima en días';

-- -----------------------------------------------------
-- Table test_items
-- -----------------------------------------------------
CREATE TYPE dnv_test_item_type AS ENUM ('Observado', 'Reportado', 'Examinado');

CREATE TABLE IF NOT EXISTS dnv_test_items (
  tti_item_id SERIAL PRIMARY KEY,
  tti_category_id SMALLINT NOT NULL,
  tti_item_code VARCHAR(10) NOT NULL,
  tti_description TEXT NOT NULL, -- Cambiar a VARCHAR(50), titulo
  tti_percentile_25 SMALLINT NOT NULL,
  tti_percentile_50 SMALLINT NOT NULL,
  tti_percentile_75 SMALLINT NOT NULL,
  tti_percentile_90 SMALLINT NOT NULL,
  tti_item_type dnv_test_item_type NOT NULL default 'Observado',
  tti_order SMALLINT NOT NULL,  -- Evitar conflictos con la palabra clave "ORDER"
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
CREATE TYPE dnv_test_status AS ENUM ('Completado', 'Parcial', 'Pendiente');

CREATE TABLE IF NOT EXISTS dnv_test_sessions (
  tts_session_id UUID PRIMARY KEY,
  tts_child_id UUID NOT NULL,
  tts_tester_id UUID NOT NULL,
  tts_test_date DATE NOT NULL,
  tts_corrected_age DECIMAL(5,2) NOT NULL,  -- Edad corregida en meses
  tts_general_notes TEXT,
  tts_status dnv_test_status NOT NULL DEFAULT 'Pendiente',
  tts_created_at TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
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
CREATE TYPE dnv_result_status AS ENUM ('Logrado', 'No logrado', 'No aplicable', 'No observado');

CREATE TABLE IF NOT EXISTS dnv_test_results (
  trs_result_id UUID PRIMARY KEY,
  trs_session_id UUID NOT NULL,
  trs_item_id SMALLINT NOT NULL,
  trs_result dnv_result_status NOT NULL,
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

COMMENT ON COLUMN dnv_test_results.trs_test_time IS 'Tiempo que tomó realizar el ítem';
COMMENT ON COLUMN dnv_test_results.trs_attempts IS 'Cantidad de intentos que hizo el niño para realizar el ítem';

-- -----------------------------------------------------
-- Table developmental_alerts
-- -----------------------------------------------------
CREATE TYPE dnv_alert_type AS ENUM ('Retraso', 'Precaución');

-- Crear la tabla
CREATE TABLE IF NOT EXISTS dnv_developmental_alerts (
  dal_alert_id UUID PRIMARY KEY,
  dal_child_id UUID NOT NULL,
  dal_item_id SMALLINT NOT NULL,
  dal_alert_type dnv_alert_type NOT NULL,
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

COMMENT ON COLUMN dnv_developmental_alerts.dal_severity IS 'Nivel de severidad (1-5)';
COMMENT ON COLUMN dnv_developmental_alerts.dal_recommendations IS 'Recomendaciones específicas para este caso';

-- -----------------------------------------------------
-- Table dnv_users
-- -----------------------------------------------------
-- Crear ENUM para roles de usuario
CREATE TYPE user_role AS ENUM ('admin', 'tester', 'viewer');

CREATE TABLE IF NOT EXISTS dnv_users (
  user_id UUID PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash CHAR(60) NOT NULL,
  role user_role NOT NULL DEFAULT 'tester',
  is_verified BOOLEAN NOT NULL DEFAULT FALSE,
  last_login TIMESTAMP WITHOUT TIME ZONE,
  created_at TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITHOUT TIME ZONE,
  deactivated_at TIMESTAMP WITHOUT TIME ZONE
);

CREATE INDEX idx_users_role ON dnv_users (role);

COMMENT ON COLUMN dnv_users.password_hash IS 'BCrypt hash';

-- -----------------------------------------------------
-- Table dnv_email_verifications
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS dnv_email_verifications (
  verification_id UUID PRIMARY KEY,
  user_id UUID NOT NULL,
  token CHAR(64) NOT NULL UNIQUE,
  expires_at TIMESTAMP WITHOUT TIME ZONE NOT NULL,
  consumed_at TIMESTAMP WITHOUT TIME ZONE,
  created_at TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_email_verifications_users FOREIGN KEY (user_id) REFERENCES dnv_users (user_id)
    ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE INDEX fk_email_verifications_users_idx ON dnv_email_verifications (user_id);

COMMENT ON COLUMN dnv_email_verifications.token IS 'Token seguro SHA-256';

-- -----------------------------------------------------
-- Table dnv_password_resets
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS dnv_password_resets (
  reset_id UUID PRIMARY KEY,
  user_id UUID NOT NULL,
  token CHAR(64) NOT NULL UNIQUE,
  expires_at TIMESTAMP WITHOUT TIME ZONE NOT NULL,
  consumed_at TIMESTAMP WITHOUT TIME ZONE,
  created_at TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_password_resets_users FOREIGN KEY (user_id)
    REFERENCES dnv_users (user_id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE INDEX fk_password_resets_users_idx ON dnv_password_resets (user_id);

COMMENT ON COLUMN dnv_password_resets.token IS 'Token seguro SHA-256';

-- -----------------------------------------------------
-- Table dnv_audit_logs
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS dnv_audit_logs (
  log_id UUID PRIMARY KEY,
  user_id UUID,
  action_type VARCHAR(50) NOT NULL,
  target_id UUID,
  target_type VARCHAR(50),
  ip_address VARCHAR(45),
  user_agent VARCHAR(255),
  metadata JSONB,
  created_at TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_audit_logs_users FOREIGN KEY (user_id)
  REFERENCES dnv_users (user_id) ON DELETE SET NULL ON UPDATE CASCADE
);

CREATE INDEX idx_audit_logs_action_type ON dnv_audit_logs (action_type);
CREATE INDEX idx_audit_logs_user_id ON dnv_audit_logs (user_id);

COMMENT ON COLUMN dnv_audit_logs.user_id IS 'Usuario que realizó la acción';
COMMENT ON COLUMN dnv_audit_logs.action_type IS 'Ej: LOGIN, USER_CREATED, TEST_MODIFIED';
COMMENT ON COLUMN dnv_audit_logs.target_id IS 'ID del recurso afectado';
COMMENT ON COLUMN dnv_audit_logs.target_type IS 'Tipo de recurso afectado';
