INSERT INTO users (id, username, email, password, created_at, updated_at) VALUES 
(1, 'admin', 'admin@equipepay.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO refresh_tokens (id, token, expiry_date, created_at, user_id) VALUES 
(1, 'default-refresh-token', DATEADD('DAY', 7, CURRENT_TIMESTAMP), CURRENT_TIMESTAMP, 1);
