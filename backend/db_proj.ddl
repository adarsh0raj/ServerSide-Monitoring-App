DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS nodes;
DROP TABLE IF EXISTS user_node_access;
DROP TABLE IF EXISTS application;
DROP TABLE IF EXISTS node_application;


CREATE TABLE users(
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    PRIMARY KEY (username)
);

CREATE TABLE nodes(
    node_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    ip VARCHAR(255) NOT NULL
);

CREATE TABLE user_node_access(
    username VARCHAR(255) NOT NULL,
    node_id int NOT NULL,
    PRIMARY KEY(username, node_id),
    FOREIGN KEY(username) REFERENCES users(username) ON DELETE SET NULL,
    FOREIGN KEY(node_id) REFERENCES nodes(node_id) ON DELETE SET NULL,
);

CREATE TABLE application(
    name VARCHAR(255) NOT NULL,
    PRIMARY KEY(name)
);

CREATE TABLE node_application(
    node_id int NOT NULL,
    application_name VARCHAR(255) NOT NULL,
    PRIMARY KEY(node_id, application_name),
    FOREIGN KEY(node_id) REFERENCES nodes(node_id) ON DELETE SET NULL,
    FOREIGN KEY(application_name) REFERENCES application(name) ON DELETE SET NULL
);