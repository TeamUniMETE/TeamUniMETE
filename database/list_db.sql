create database ListeApp;

use ListeApp;

create table user_accounts(
    User_id serial,
    user_email varchar (25),
    user_name varchar (10),
    salt varchar (10),
    salted_hash varchar (20),
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

