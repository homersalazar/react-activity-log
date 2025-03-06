CREATE TABLE activity_log (
    id BIGINT(20) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    subject_type VARCHAR(255) NOT NULL, -- table name that modified, added, or deleted
    event VARCHAR(255) NOT NULL, -- What action was performed
    subject_id BIGINT(20) UNSIGNED NOT NULL, -- id of the table that modified, added, or deleted
    causer_id BIGINT(20) UNSIGNED NOT NULL, -- user who performed the action 
    properties LONGTEXT NOT NULL, -- details of what was done
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL
);
