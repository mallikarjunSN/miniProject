create table users(
    firstName varchar(30) not null,
    lastName varchar(20),
    phone char(10) not null,
    usertype varchar(10) unique,
    password varchar(20) not null,
    email varchar(30) unique,
    address varchar(50),
    phone2 varchar(10),
    constraint users_pk1 primary key(phone)
);

create table property(
    houseno varchar(5) not null,
    ownerid char(10) not null,
    name varchar(30),
    bhk varchar(5),
    street varchar(20),
    city varchar(20),
    landmark varchar(30),
    state varchar(20),
    pin varchar(20),
    suitable varchar(10),
    more varchar(50),
    rent_amt decimal(6,2),
    max_capacity integer,
    vacancy integer default 0,
    constraint prop_pk1 primary key(houseno,ownerid),
    check(rent_amt>=0 and max_capacity>=0 and  vacancy>=0 and vacancy<=max_capacity),
    constraint prop_fk1 foreign key(ownerid) references users(phone) on delete cascade on update cascade
);

create table wishlist(
    renterid char(10),
    houseno varchar(5),
    name varchar(30),
    ownerid char(10),
    constraint wishlist_pk1 primary key(renterid,houseno,ownerid),
    constraint wishlist_fk1 foreign key(ownerid) references users(phone) on delete cascade on update cascade,
    constraint wishlist_fk2 foreign key(houseno) references property(houseno) on delete cascade on update cascade
);


create table reviews(
    renterid char(10),
    houseno varchar(5),
    name varchar(30),
    ownerid char(10),
    rating decimal(2,0),
    comment varchar(100),
    constraint wishlist_pk1 primary key(renterid,houseno,ownerid),
    constraint wishlist_fk1 foreign key(ownerid) references users(phone) on delete cascade on update cascade,
    constraint wishlist_fk2 foreign key(houseno) references property(houseno) on delete cascade on update cascade
);

create table rent_info(
    renterid char(10),
    houseno varchar(5),
    name varchar(30),
    ownerid char(10),
    owner_name varchar(40),
    renter_name varchar(40),
    rent_start_date date,
    rent_end_date date,
    status varchar(20),
    constraint rent_info_pk1 primary key(renterid,houseno,ownerid,status),
    constraint rent_info_fk1 foreign key(ownerid) references users(phone) on delete cascade on update cascade,
    constraint rent_info_fk2 foreign key(renterid) references users(phone) on delete cascade on update cascade,
    constraint rent_info_fk3 foreign key(houseno) references property(houseno) on delete cascade on update cascade
);

create table aadhar(
    aadhar_no char(16),
    firstName varchar(20),
    lastName varchar(20),
    address varchar(40),
    phone char(10),
    constraint aadhar_pk1 primary key(aadhar_no)
);

create table request(
    rentername varchar(20),
    renterid char(10),
    houseno varchar(5),
    name varchar(30),
    ownerid char(10),
    ownername varchar(30),
    status varchar(10),
    date timestamp,
    constraint notifcation_pk1 primary key(renterid,houseno,ownerid),
    constraint notifcation_fk1 foreign key(renterid) references users(phone) on delete cascade on update cascade,
    constraint notifcation_fk2 foreign key(ownerid) references users(phone) on delete cascade on update cascade,
    constraint notifcation_fk3 foreign key(houseno) references property(houseno) on delete cascade on update cascade
);