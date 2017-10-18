create database ListeApp;

use ListeApp;

create table user_accounts(
    user_email varchar (25),
    fullName varchar (var),
    username varchar (10),
    password varchar (15),
    primary key (User_id)
);

create table list(
    id serial,
    list_name  varchar(15),
    prod_or_act_name varchar (20),
    quantity int,
    sidenote varchar(50),
    importance int,
    by_date datetime,
    User_id int,
    primary key (list_name)
    foreign key (User_id) references user_accounts(user_id)

);

