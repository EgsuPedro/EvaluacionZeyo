-- Database: evaluacion

-- DROP DATABASE IF EXISTS evaluacion;

CREATE DATABASE evaluacion
    WITH
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'Spanish_Ecuador.1252'
    LC_CTYPE = 'Spanish_Ecuador.1252'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1
    IS_TEMPLATE = False;


	-- Tabla principal de pasos
CREATE TABLE steps (
id SERIAL PRIMARY KEY,
code VARCHAR(50) UNIQUE NOT NULL,
title VARCHAR(255) NOT NULL,
description TEXT,
position INTEGER NOT NULL,
is_active BOOLEAN DEFAULT TRUE,
created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);


-- Historial con hash encadenado (simulación blockchain)
CREATE TABLE step_histories (
id SERIAL PRIMARY KEY,
step_id INTEGER REFERENCES steps(id) ON DELETE CASCADE,
title VARCHAR(255) NOT NULL,
description TEXT,
position INTEGER,
action VARCHAR(20) NOT NULL, -- CREATE, UPDATE, DELETE
prev_hash VARCHAR(128),
hash VARCHAR(128) NOT NULL,
created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);


-- Indices
CREATE INDEX idx_steps_position ON steps(position);
CREATE INDEX idx_hist_step ON step_histories(step_id);

SELECT * FROM steps
SELECT * FROM step_histories