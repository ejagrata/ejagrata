--create user 'ejagrata'@'localhost' identified by 'ejagrata123';
--grant all privileges on ejagrata.* to 'ejagrata'@'localhost' with grant option;

insert into user values (1,'admin','admin','admin@ejagrata.in.net','$2a$10$G5Hv6YeTOfV7SKU2s9rHEO3ZRGB6KjeeQIZi44xCL.flTQZeHFTm2', true);
 
insert into role(id, name, display_name) values (1,'ROLE_ADMIN', 'Admin');
insert into role(id, name, display_name) values (2,'ROLE_GUEST', 'Guest');

insert into user_role (user_id, role_id) values (1, 1);

insert into OAUTH_CLIENT_DETAILS values('ejagrataapp', 'restservice', 'ejagrata123456', 'read,write', 'password,refresh_token', null, 'USER', null,null, '{}', null);

insert into district values (1, 'Ernakulam');

insert into educational_district values (1, 'Aluva', 1);
insert into educational_district values (2, 'Ernakulam', 1);
insert into educational_district values (3, 'Kothamangalam', 1);
insert into educational_district values (4, 'Muvattupuzha', 1);