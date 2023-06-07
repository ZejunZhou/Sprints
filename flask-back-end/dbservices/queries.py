# Table Queries


show_tables = """
show tables;
"""

Task_init = """
create table `AGDev43`.`Task`(
  `TaskNum` int not null auto_increment,
  `PNum` int not null,
  `Title` varchar(200) null,
  `Desc` varchar(3000) null,
  `DueDate` date null,
  `Hours` int null,
  `Priority` enum('low', 'medium', 'high'),
  `Status` enum('unassigned', 'todo', 'inprogress', 'complete'),
  primary key (`TaskNum`)
);
"""

Project_init = """
create table `AGDev43`.`Project`(
  `PNum` int not null auto_increment,
  `Name` varchar(100) not null,
  primary key (`PNum`)
);
"""

User_init = """
create table `AGDev43`.`User`(
  `Email` varchar(200) not null,
  `Username` varchar(100) not null,
  primary key (`Email`)
);
"""

Team_init = """
create table `AGDev43`.`Team`(
  `Email` varchar(200) not null,
  `PNum` int not null,
  primary key (`Email`, `PNum`)
);
"""

Assigned_init = """
create table `AGDev43`.`Assigned`(
  `Email` varchar(200) not null,
  `TaskNum` int not null,
  primary key (`Email`, `TaskNum`)
);
"""
q_all_cards_by_proj = """
select Title, DueDate, Hours, Priority, Status
  from Task
  where PNum = _x;
"""
q_all_tasks_by_proj = """
select *
  from Task
  where PNum = _x;
"""
q_all_users_by_task = """
select U.Email, U.Username
  from User U, Assigned A
  where U.Email = A.Email and A.TaskNum = _x;
"""
q_all_users_by_proj = """
select U.Email, U.Username
  from User U, Team T
  where U.Email = T.Email and T.PNum = _x;
"""
q_all_tasks_by_proj_status = """
select *
  from Task
  where PNum = _x and Status = _y;
"""
q_new_task = """
insert into Task (PNum, Title, Desc, DueDate, Hours, Priority, Status)
  values (_a, _b, _c, ...);
"""
q_new_user = """
insert into User (Email, Username)
  values (_x, _y);
"""
q_assign_task = """
insert into Assign (Email, TaskNum)
  values (_x, _y);
"""
q_new_proj = """
insert into Project (PNum, Name)
  values (_x, _y);
"""
q_assign_proj = """
insert into Team (Email, PNum)
  values (_x, _y);
"""

q_all_info_about_tasks = """
select * 
from Task T inner join Assigned A 
on T.TaskNum=A.TaskNum;
"""


# Story poker queries

# q_delete_SP = """
# delete
# from SP
# where Email=_x;
# """

drop_table = """DROP TABLE `SP`"""

SP_init = """
create table `AGDev43`.`SP`(
  `Email` varchar(200) not null,
  `StoryName` varchar(500) not null,
  `Answer` int,
  `T1` datetime not null,
  primary key (`Email`)
);
"""
#sp init
SPINIT_combined = drop_table+SP_init

q_get_t1 = """
select t1
from SP
where StoryName = _x
limit 1;
"""

q_get_full_SP = """
select Email, Answer
from SP
where StoryName = _x;
"""

q_insert_new_SP_row = """
insert into SP (Email, StoryName, Answer, T1)
values (_x, _y, null, _z);
"""

q_update_sp = """
update SP
set 
  Answer= _x
where Email = _y;
"""
