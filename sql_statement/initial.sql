DELIMITER $$

CREATE DEFINER=`root`@`%` PROCEDURE `submit_answer` (IN `userEmail` VARCHAR(200), IN `answer` INT)   BEGIN
    DECLARE time_diff INT;
    DECLARE email_story_exists INT;
    DECLARE first_story_name VARCHAR(500);

    -- Get the first story name
    SELECT StoryName INTO first_story_name FROM SP ORDER BY T1 ASC LIMIT 1;

    -- Check if time difference between current timestamp and the timestamp of the first record is greater than 60 seconds
    SELECT TIMESTAMPDIFF(SECOND, MIN(T1), NOW()) INTO time_diff FROM SP;

    IF time_diff > 60 THEN
        -- Return NULL
        SELECT NULL;
    ELSE
        -- Check if the user_email and storyName exist
        SELECT COUNT(*) INTO email_story_exists FROM SP WHERE Email = userEmail AND StoryName = first_story_name;

        IF email_story_exists > 0 THEN
            -- If the user_email and storyName exist, update the record
            UPDATE SP
            SET Answer = answer
            WHERE Email = userEmail AND StoryName = first_story_name;
        ELSE
            -- If the user_email and storyName don't exist, create a new record
            INSERT INTO SP (Email, StoryName, Answer, T1)
            VALUES (userEmail, first_story_name, answer, NOW());
        END IF;
    END IF;
END$$

DELIMITER ;

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


create table `AGDev43`.`Project`(
  `PNum` int not null auto_increment,
  `Name` varchar(100) not null,
  primary key (`PNum`)
);

create table `AGDev43`.`User`(
  `Email` varchar(200) not null,
  `Username` varchar(100) not null,
  primary key (`Email`)
);

create table `AGDev43`.`Team`(
  `Email` varchar(200) not null,
  `PNum` int not null,
  primary key (`Email`, `PNum`)
);

create table `AGDev43`.`Assigned`(
  `Email` varchar(200) not null,
  `TaskNum` int not null,
  primary key (`Email`, `TaskNum`)
);

create table `AGDev43`.`SP`(
  `Email` varchar(200) not null,
  `StoryName` varchar(500) not null,
  `Answer` int,
  `T1` datetime not null,
  primary key (`Email`)
);

INSERT INTO `AGDev43`.`Task` (`TaskNum`, `PNum`, `Title`, `Desc`, `DueDate`, `Hours`, `Priority`, `Status`) VALUES
(0, 1, 'First Scrum at CS building', 'CS506 TEAM', '2023-02-01', 1, 'medium', NULL);
