--create user 'ejagrata'@'localhost' identified by 'ejagrata123';
--grant all privileges on ejagrata.* to 'ejagrata'@'localhost' with grant option;

insert into user values (1,'admin','admin','admin@ejagrata.in.net','$2a$10$EwbKj3nYHzjYPjOpmbmSx.jZg6XfgjZH3G5Xa18MUPbuJ5cTt8Qn2', true);
 
insert into role(id, name, display_name) values (1,'ROLE_ADMIN', 'Admin');
insert into role(id, name, display_name) values (2,'ROLE_GUEST', 'Guest');

insert into user_role (user_id, role_id) values (1, 1);

insert into oauth_client_details values('ejagrataapp', 'restservice', 'ejagrata123456', 'read,write', 'password,refresh_token', null, 'USER', null,null, '{}', null);

insert into district values (1, 'Ernakulam');

insert into educational_district values (1, 'Aluva', 1);
insert into educational_district values (2, 'Ernakulam', 1);
insert into educational_district values (3, 'Kothamangalam', 1);
insert into educational_district values (4, 'Muvattupuzha', 1);

INSERT INTO `school` (`id`, `school_code`, `name`, `address`, `phone`, `school_type`, `teacher_name`, `teacher_phone`, `student_rep_name`, `session_date`, `session_status`, `comments`, `district_id`, `district_name`, `educational_district_id`, `educational_district_name`, `enabled`) VALUES
(1, '25106', 'GHS WEST SDFSDFDSF', ' ', ' ', 'Government', 'WEREWR K U', '023948234', 'SDJK DKJSDF', '2016-12-01', 'Completed', ' ', 1, 'Ernakulam', 1, 'Aluva', NULL),
(2, '28054', 'G H S SDFSD', ' ', ' ', 'Government', 'KFSDFF', '2383288', 'DSFKDFDSF SDF SD', '2016-12-01', 'Completed', ' ', 1, 'Ernakulam', 4, 'Muvattupuzha', NULL);

insert into phase values ('1'), ('2'), ('3'), ('4');

insert into phase_schools values ('1', 1);
insert into phase_schools values ('2', 2);
insert into phase_schools values ('1', 3);
insert into phase_schools values ('2', 4);
