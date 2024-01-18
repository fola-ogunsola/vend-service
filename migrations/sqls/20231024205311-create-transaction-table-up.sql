/* Replace with your SQL commands */
CREATE TABLE IF NOT EXISTS merchant (
    id SERIAL PRIMARY KEY,
    name VARCHAR,
    phone_number VARCHAR,
    access_key VARCHAR,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS transaction (
    id SERIAL PRIMARY KEY,
    merchant_id INT REFERENCES merchant(id), 
    status VARCHAR,
    phone_number VARCHAR,
    amount VARCHAR,
    reference VARCHAR,
    awake_reference VARCHAR,
    telco_reference VARCHAR,
    network VARCHAR,
    created_at TIMESTAMPTZ DEFAULT NOW()
);