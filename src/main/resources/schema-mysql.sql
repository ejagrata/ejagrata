-- This is for MySql 5.1. For 5.7, change datetime fields to datetime(3).

create table oauth_client_details (
  client_id VARCHAR(256) PRIMARY KEY,
  resource_ids VARCHAR(256),
  client_secret VARCHAR(256),
  scope VARCHAR(256),
  authorized_grant_types VARCHAR(256),
  web_server_redirect_uri VARCHAR(256),
  authorities VARCHAR(256),
  access_token_validity INTEGER,
  refresh_token_validity INTEGER,
  additional_information VARCHAR(4096),
  autoapprove VARCHAR(256)
);

create table oauth_client_token (
  token_id VARCHAR(255),
  token BLOB,
  authentication_id VARCHAR(255),
  user_name VARCHAR(255),
  client_id VARCHAR(255)
);

create table oauth_access_token (
  token_id VARCHAR(255),
  token BLOB,
  authentication_id VARCHAR(255),
  user_name VARCHAR(255),
  client_id VARCHAR(255),
  authentication BLOB,
  refresh_token VARCHAR(255)
);

create table oauth_refresh_token (
  token_id VARCHAR(255),
  token BLOB,
  authentication BLOB
);

create table oauth_code (
  code VARCHAR(255), authentication BLOB
);

CREATE TABLE oauth_approvals (
  userId varchar(256) DEFAULT NULL,
  clientId varchar(256) DEFAULT NULL,
  scope varchar(256) DEFAULT NULL,
  status varchar(10) DEFAULT NULL,
  expiresAt timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  lastModifiedAt timestamp NOT NULL DEFAULT '1971-01-01 00:00:01'
);

create table ClientDetails (
    appId VARCHAR(255) PRIMARY KEY,
    resourceIds VARCHAR(255),
    appSecret VARCHAR(255),
    scope VARCHAR(255),
    grantTypes VARCHAR(255),
    redirectUrl VARCHAR(255),
    authorities VARCHAR(255),
    access_token_validity INTEGER,
    refresh_token_validity INTEGER,
    additionalInformation VARCHAR(4096),
    autoApproveScopes VARCHAR(255)
);


create table user (
	id int(10) primary key auto_increment,
	name varchar(100),
	login varchar(100),
	email varchar(100),
	password varchar(100),
	enabled boolean,
	unique (login)
);

create table role (
	id int(10) primary key auto_increment,
	name varchar(100),
	display_name varchar(100)
);

create table user_role (
  	user_id int(10),
  	role_id int(10),
  	unique (user_id, role_id)
);

 create table district (
 	id int(5) primary key auto_increment,
 	name varchar(100)
 );

  create table educational_district (
    id int(5) primary key auto_increment,
    name varchar(100),
    district_id int(5) references district(id) 
 );
 
 create table school (
 	id int(10) primary key auto_increment,
 	school_code varchar(100),
 	name varchar(200),
 	address varchar(300),
 	phone varchar(25),
 	school_type varchar(20),
	teacher_name varchar(100),
	teacher_phone varchar(20),
	student_rep_name varchar(100),
	session_date date,
	session_status varchar(20), 	
	comments varchar(2000),
 	district_id int(5) references district(id),
 	district_name varchar(100),
 	educational_district_id int(5) references educational_district(id), 
 	educational_district_name varchar(100),
 	enabled boolean
 );
 
  create table school_document (
	doc_id int(10) primary key auto_increment,
	doc_path varchar(250),
	school_id int(10) references school(id)
);