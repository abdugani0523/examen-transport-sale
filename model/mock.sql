-- Colors
INSERT INTO colors (color_name) VALUES 
('white'),
('black'),
('green'),
('grey'),
('red'),
('blue'),
('purple'),
('brown'),
('yellow');


-- Genders
INSERT INTO genders (gender_name) VALUES 
('male'),
('female');


-- Cities
INSERT INTO cities (city_name) VALUES
('Toshkent'),
('Samarkand'),
('Andijan'),
('Nukus'),
('Fergana'),
('Bukhara');


-- Districts
INSERT INTO districts (city_id, district_name) VALUES
(1, 'Bektemir'),
(1, 'Chilanzar'),
(1, 'Olmazar'),
(1, 'Yakkasaray');


-- Branches
INSERT INTO branches (branch_name, branch_district) VALUES 
('Sebzar', 3),
('Chilanzar', 2),
('Yakkasaray', 4);


-- Staff
INSERT INTO staff (staff_username, staff_password, staff_branch, birth_date, gender) VALUES
('su', crypt('su', gen_salt('md5')), 1, '1999-09-19', 1);

-- Permissions
INSERT INTO permissions (permission_name) VALUES 
('create'),
('read'),
('delete'),
('update');

INSERT INTO permission_modules (module_name) VALUES 
('transports'),
('branches'),
('permissions');

-- Super user permissions
INSERT INTO permission_of_staff (staff_id, branch, permission_module, permission_type) VALUES
(1, 1, 1, 1),
(1, 1, 1, 3),
(1, 1, 1, 4),
(1, 1, 2, 1),
(1, 1, 2, 2),
(1, 1, 2, 3),
(1, 1, 2, 4),
(1, 1, 3, 1),
(1, 1, 3, 2),
(1, 1, 3, 3),
(1, 1, 3, 4),
(1, 2, 1, 1),
(1, 2, 1, 3),
(1, 2, 1, 4),
(1, 2, 2, 1),
(1, 2, 2, 2),
(1, 2, 2, 3),
(1, 2, 2, 4),
(1, 2, 3, 1),
(1, 2, 3, 2),
(1, 2, 3, 3),
(1, 2, 3, 4),
(1, 3, 1, 1),
(1, 3, 1, 3),
(1, 3, 1, 4),
(1, 3, 2, 1),
(1, 3, 2, 2),
(1, 3, 2, 3),
(1, 3, 2, 4),
(1, 3, 3, 1),
(1, 3, 3, 2),
(1, 3, 3, 3),
(1, 3, 3, 4);


-- Transports
INSERT INTO transports (transport_model, branch, transport_color, transport_image) VALUES 
('Model S', 3, 2, 'model_s.jpg'),
('Model Y', 1, 1, 'model_y.png'),
('Model X', 2, 5, 'model_x.webp'),
('Model 3', 1, 6, 'model_3.jpg');