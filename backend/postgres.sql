CREATE TYPE entry_type AS ENUM ('income', 'expense');

CREATE TABLE entries (
  id SERIAL PRIMARY KEY,
  description VARCHAR(255) NOT NULL,
  amount NUMERIC NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  type entry_type NOT NULL
);
