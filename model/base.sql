DROP DATABASE IF EXISTS transport_sale;
CREATE DATABASE transport_sale;


-- Extetensions
CREATE EXTENSION pgcrypto;


-- Genders
DROP TABLE IF EXISTS genders CASCADE;
CREATE TABLE genders (
    gender_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    gender_name VARCHAR(32) UNIQUE NOT NULL
);


-- Cities and districts
DROP TABLE IF EXISTS cities CASCADE;
CREATE TABLE cities (
    city_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    city_name VARCHAR(32) NOT NULL
);


DROP TABLE IF EXISTS districts CASCADE;
CREATE TABLE districts (
    district_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    city_id INT REFERENCES cities(city_id) ON DELETE CASCADE,
    district_name VARCHAR(32) NOT NULL
);


-- Branches
DROP TABLE IF EXISTS branches CASCADE;
CREATE TABLE branches (
    branch_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    branch_name VARCHAR(32) NOT NULL,
    branch_district INT REFERENCES districts(district_id) ON DELETE CASCADE,
    created_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);


-- Staff
DROP TABLE IF EXISTS staff CASCADE;
CREATE TABLE staff (
    staff_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    staff_username VARCHAR(64) UNIQUE NOT NULL,
    staff_password VARCHAR(34) NOT NULL,
    staff_branch INT REFERENCES branches(branch_id) ON DELETE CASCADE,
    birth_date DATE CHECK (birth_date > '1900-01-01' AND birth_date < '2000-01-01') NOT NULL,
    gender INT REFERENCES genders(gender_id) ON DELETE CASCADE
);


-- Permissions
DROP TABLE IF EXISTS permissions CASCADE;
CREATE TABLE permissions (
    permission_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    permission_name VARCHAR(32) NOT NULL
);

DROP TABLE IF EXISTS permission_modules CASCADE;
CREATE TABLE permission_modules (
    module_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    module_name VARCHAR(32) NOT NULL
);

DROP TABLE IF EXISTS permission_of_staff CASCADE;
CREATE TABLE permission_of_staff (
    staff_id INT REFERENCES staff(staff_id) ON DELETE CASCADE,
    permission_module INT REFERENCES permission_modules(module_id) ON DELETE CASCADE NOT NULL,
    permission_type INT REFERENCES permissions(permission_id) ON DELETE CASCADE NOT NULL,
    branch INT REFERENCES branches(branch_id) ON DELETE CASCADE,
    created_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    PRIMARY KEY (staff_id, branch, permission_module, permission_type)
);


-- Colors
DROP TABLE IF EXISTS colors CASCADE;
CREATE TABLE colors (
    color_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    color_name VARCHAR(32) NOT NULL
);


-- Transports 
DROP TABLE IF EXISTS transports CASCADE;
CREATE TABLE transports (
    transport_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    transport_model VARCHAR(32) NOT NULL,
    transport_color INT REFERENCES colors(color_id) ON DELETE CASCADE NOT NULL,
    branch INT REFERENCES branches(branch_id) ON DELETE CASCADE NOT NULL,
    transport_image TEXT NOT NULL,
    created_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);