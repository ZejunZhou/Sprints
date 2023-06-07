import json


session_json_str = """
    {
    "session": {
        "user_email": "bucky@wisc.edu",
        "username": "buckybadger",
        "project_info": [
          "name": "wisc project 1",
          "current_sprint": "2",
          "team members": "list of emails",
          "tasks": task_json_str
        ] 
    }
}
"""

task_json_str = """
{
    "tasks": [
    {
    "title": "task 1",
    "description": "the first task",
    "due date": "01/01/2024",
    "hours": "5",
    "priority": "medium",
    "status": "not started",
    "created by": "bucky@wisc.edu",
    "creation date": "01/01/2023"
    },
    {
    "title": "task 2",
    "description": "the second task",
    "due date": "01/01/2024",
    "hours": "5",
    "priority": "medium",
    "status": "not started",
    "created by": "bucky@wisc.edu",
    "creation date": "01/01/2023"
    },
    {
    "title": "task 3",
    "description": "the third task",
    "due date": "01/01/2024",
    "hours": "5",
    "priority": "medium",
    "status": "not started",
    "created by": "bucky@wisc.edu",
    "creation date": "01/01/2023"
    },
    {
    "title": "task 4",
    "description": "the fourth task",
    "due date": "01/01/2024",
    "hours": "5",
    "priority": "medium",
    "status": "not started",
    "created by": "bucky@wisc.edu",
    "creation date": "01/01/2023"
    },
    {
    "title": "task 5",
    "description": "the fifth task",
    "due date": "01/01/2024",
    "hours": "5",
    "priority": "medium",
    "status": "not started",
    "created by": "bucky@wisc.edu",
    "creation date": "01/01/2023"
    }
    ]
}
"""

simple_json = '{"reponse": "hello-world"}'

