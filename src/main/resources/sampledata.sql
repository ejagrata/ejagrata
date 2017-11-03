insert into district values (1, 'Ernakulam');

insert into educational_district values (1, 'Aluva', 1);
insert into educational_district values (2, 'Ernakulam', 1);
insert into educational_district values (3, 'Kothamangalam', 1);
insert into educational_district values (4, 'Muvattupuzha', 1);

insert into phase values ('1');
insert into phase values ('2');
insert into phase values ('3');
insert into phase values ('4');

insert into school values (1, 'Aghs', 'Aluva Govt. HSS for Girls', 'Aluva', '90102939', 'Government', 'Mani', '291828381', 'Treesa', 1, '', 1, '', true);
insert into school values (2, 'Akgs', 'Arakkunnam St. George''s HS', 'Arakkunnam', '490102939', 'Aided', 'Eliyamma', '32348381', 'Dhanya', 1, '', 1, '', true);
insert into school values (3, 'gvhs', 'Greenvalley Public School', 'Kothamangalam', '473274757', 'Unaided', 'Manju', '837475734', 'Sharath', 1, '', 1, '', true);
insert into school values (4, 'Athhs', 'Athanickal Govt. HSS', 'Mannathur', '90102939', 'Government', 'Mani', '291828381', 'Treesa', 1, '', 1, '', true);

insert into phase_schools values (1, 1, '2016-01-01', 'Completed', 'ok');
insert into phase_schools values (1, 2, null, 'To be planned', 'ok');
insert into phase_schools values (1, 3, '2016-01-01', 'Completed', 'ok');
insert into phase_schools values (2, 4, null, 'To be planned', null);
insert into phase_schools values (3, 1, null, 'To be planned', null);
insert into phase_schools values (3, 2, null, 'To be planned', null);
insert into phase_schools values (4, 4, null, 'To be planned', null);

