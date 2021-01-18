-- TABLE
CREATE TABLE statement (
	id INTEGER NOT NULL, 
	text VARCHAR(255), 
	search_text VARCHAR(255) DEFAULT '' NOT NULL, 
	conversation VARCHAR(32) DEFAULT '' NOT NULL, 
	created_at DATETIME DEFAULT (CURRENT_TIMESTAMP), 
	in_response_to VARCHAR(255), 
	search_in_response_to VARCHAR(255) DEFAULT '' NOT NULL, 
	persona VARCHAR(50) DEFAULT '' NOT NULL, 
	PRIMARY KEY (id)
);
CREATE TABLE tag (
	id INTEGER NOT NULL, 
	name VARCHAR(50), 
	PRIMARY KEY (id), 
	UNIQUE (name)
);
CREATE TABLE tag_association (
	tag_id INTEGER, 
	statement_id INTEGER, 
	FOREIGN KEY(tag_id) REFERENCES tag (id), 
	FOREIGN KEY(statement_id) REFERENCES statement (id)
);
 
-- INDEX
 
-- TRIGGER
 
-- VIEW
 
