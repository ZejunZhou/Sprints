import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Cookies from "js-cookie";
import "./taskboard.css";
import { SERVER_URL, DATABASE, HOSTNAME, USER, PASSWORD, PORTNUM,  } from "../../configdata";
import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa";

function dbstuff() {
  return fetch(SERVER_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "ngrok-skip-browser-warning": "anything",
    },
    body: JSON.stringify({
      hostname: "db2",
      portnum: "3306",
      query: "select * from Task;",
      user: "root",
      password: "mc",
      database: "AGDev43",
    }),
  })
    .then((response) => response.json())
    .catch((error) => console.error(error));
}

function sleep() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, 1000);
  });
}

function TaskForm({ onSubmit, setTasks, loadTasks }) {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("medium");
  const [users, setUsers] = useState("");
  const [hours, setHours] = useState("0");
  const [dueDate, setDueDate] = useState("");

  function dbstuffSend() {
    if (title === "" || dueDate === "" || hours == 0 || users === "") {
      alert("Please filled the form correctly !");
      return;
    }

    return fetch(SERVER_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "anything",
      },
      body: JSON.stringify({
        hostname: "db2",
        portnum: "3306",
        query:
        "INSERT INTO `Task` (`TaskNum`, `PNum`, `Title`, `Desc`, `DueDate`, `Hours`, `Priority`, `Status`)" +
        " VALUES (NULL, 8, '" +
        title +
        "', '" +
        users +
        "', '" +
        dueDate +
        "', '" +
        hours +
        "', '" +
        priority +
        "', NULL)",
    }),
        user: "root",
        password: "mc",
        database: "AGDev43"
    })
      .then((response) => response.json())
      .catch((error) => console.error(error));
  }

  function handleSubmit(event) {
    if (title === "" || dueDate === "" || hours == 0 || users === "") {
      event.preventDefault();
    } else {
      event.preventDefault();
      onSubmit({ title, priority, users: users.split(","), hours, dueDate });

      setTitle("");
      setPriority("medium");
      setHours("0");
      setUsers("");
      setDueDate("");
    }
  }

  return (
    <div className="container p-5">
      <form onSubmit={handleSubmit}>
        <div>
          {/* <p>Logged in: {Cookies.get("user_email")}</p> */}
          <h1 className="h1">Task Form</h1>
          <br></br>
          <label
            style={{
              marginTop: 20,
              display: "flex",
              flexDirection: "column",
              textAlign: "center",
            }}
            className="formstuff"
          >
            Title:
            <input
              type="text"
              className="form-control"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />
          </label>
        </div>
        <div className="formstuff">
          <label>
            Priority:
            <select
              className="form-control"
              value={priority}
              onChange={(event) => setPriority(event.target.value)}
            >
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </label>
          <label className="formstuff" style={{ marginLeft: 30 }}>
            Due Date:
            <input
              style={{ marginLeft: 0 }}
              title="Due Date"
              placeholder="Select date"
              type="date"
              id="example"
              value={dueDate}
              class="form-control"
              onChange={(event) => setDueDate(event.target.value)}
            />
          </label>
        </div>
        <div>
          <label className="formstuff">
            Hours To Complete:
            <select
              className="form-control"
              value={hours}
              onChange={(event) => setHours(event.target.value)}
            >
              <option value="0">0</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="5">5</option>
              <option value="8">8</option>
              <option value="13">13</option>
              <option value="21">21</option>
              <option value="34">34</option>
            </select>
          </label>
        </div>
        <div>
          <label className="formstuff">
            Users:
            <input
              type="text"
              className="form-control"
              value={users}
              onChange={(event) => setUsers(event.target.value)}
            />
            <small>Separate multiple users with commas</small>
          </label>
        </div>
        <div className="button-container">
          <button className="buttonStyle" type="submit" onClick={dbstuffSend}>
            Add Task
          </button>
          <button
            className="buttonStyle"
            style={{ margin: 10 }}
            onClick={loadTasks}
          >
            {" "}
            Reload{" "}
          </button>
        </div>
      </form>
    </div>
  );
}

function handleDeleteTask(task) {
  console.log(task.Title);
  dbDelete(task.Title);
}
function handleEditTask(task) {
  console.log(task.Title);
  dbEdit(task);
}

function dbEdit(task) {
  alert("modifying task!");
  // the value of the "Title" column in the row you want to update
  // let oldDesc = prompt("Enter the Old assigned users: "); // the value of the "Desc" column in the row you want to update
  let oldTitle = task.Title;
  let oldDesc = task.Desc;
  let newTitle = prompt("Enter the NEW Title (or blank to not change): "); // the new value for the "Title" column
  let newDesc = prompt(
    "Enter the NEW users (or blank to not change)[seperated by commas]: "
  ); // the new value for the "Desc" column
  if (newTitle === null || newTitle === "") {
    newTitle = oldTitle;
  }
  if (newDesc === null || newDesc === "") {
    newDesc = oldDesc;
  }
  let input_query = `UPDATE Task SET \`Desc\` = '${newDesc}', \`Title\` = '${newTitle}' WHERE \`Title\` = '${oldTitle}'`;

  // Execute the query using your database connection

  return fetch(SERVER_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "ngrok-skip-browser-warning": "anything",
    },
    body: JSON.stringify({
      hostname: "db2",
      portnum: "3306",
      query: input_query, //to_do
      user: "root",
      password: "mc",
      database: "AGDev43",
    }),
  })
    .then((response) => response.json())
    .catch((error) => console.error(error));
}

function dbDelete(taskTitle) {
  let input_query = `DELETE FROM Task WHERE \`Task\`.\`Title\` = '${taskTitle}'`;
  alert(`Deleting task titled: ${taskTitle}`);
  return fetch(SERVER_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "ngrok-skip-browser-warning": "anything",
    },
    body: JSON.stringify({
      hostname: "db2",
      portnum: "3306",
      query: input_query,
      user: "root",
      password: "mc",
      database: "AGDev43",
    }),
  })
    .then((response) => response.json())
    .catch((error) => console.error(error));
}

function TaskTable({ tasks, onEditTask, onDeleteTask }) {
  const [sortField, setSortField] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");

  const sortTasks = (field) => {
    if (field === sortField) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const getSortIcon = (field) => {
    if (field === sortField) {
      return sortDirection === "asc" ? <FaSortUp /> : <FaSortDown />;
    } else {
      return <FaSort />;
    }
  };

  const sortedTasks = tasks.sort((a, b) => {
    if (sortField) {
      const fieldValueA = a[sortField];
      const fieldValueB = b[sortField];
      if (fieldValueA < fieldValueB) {
        return sortDirection === "asc" ? -1 : 1;
      } else if (fieldValueA > fieldValueB) {
        return sortDirection === "asc" ? 1 : -1;
      } else {
        return 0;
      }
    } else {
      return 0;
    }
  });

  return (
    <div className="container-fluid">
      <div>
        <h1 className="h1" style={{ marginTop: 150, marginBottom: 100 }}>
          Tasks Table
        </h1>
      </div>
      <table margin="30px" className="table table-bordered">
        <thead>
          <tr>
            <th className="formstuff" onClick={() => sortTasks("Title")}>
              Title {getSortIcon("Title")}
            </th>
            <th className="formstuff" onClick={() => sortTasks("Priority")}>
              Priority {getSortIcon("Priority")}
            </th>
            <th className="formstuff" onClick={() => sortTasks("Hours")}>
              Hours {getSortIcon("Hours")}
            </th>
            <th className="formstuff" onClick={() => sortTasks("Desc")}>
              Users {getSortIcon("Desc")}
            </th>
            <th className="formstuff" onClick={() => sortTasks("DueDate")}>
              Due Date {getSortIcon("DueDate")}
            </th>
            <th className="formstuff">Edit</th>
            <th className="formstuff">Delete</th>{" "}
          </tr>
        </thead>
        <tbody>
          {sortedTasks.map((task, index) => (
            <tr key={index}>
              <td className="formstuff">{task.Title}</td>
              <td className="formstuff">{task.Priority}</td>
              <td className="formstuff">{task.Hours}</td>
              <td className="formstuff">{task.Desc}</td>
              <td className="formstuff">{task.DueDate}</td>
              <td>
                <button
                  className="btn"
                  style={{ width: 30 }}
                  onClick={() => handleEditTask(task)}
                >
                  ✍️
                </button>
              </td>
              <td>
                <button
                  className="btnDanger"
                  onClick={() => handleDeleteTask(task)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function App() {
  const [tasks, setTasks] = useState([]);

  function loadTasks() {
    let iterator = dbstuff();
    const promise = Promise.resolve(iterator);
    promise.then((response) => {
      var tasks = response;
      setTasks(tasks); // update state with fetched data
    });
    sleep();
  }

  useEffect(() => {
    const interval = setInterval(() => {
      loadTasks();
    }, 1000); // Change this value to adjust the auto-reload interval (in milliseconds)

    return () => {
      clearInterval(interval); // Clean up the interval when the component unmounts
    };
  }, [loadTasks]);

  function handleTaskSubmit(task) {
    setTasks([
      ...tasks,
      {
        Title: task.title,
        Priority: task.priority,
        Hours: task.hours,
        Desc: task.users,
        DueDate: task.dueDate,
      },
    ]);
  }

  const [showTaskForm, setShowTaskForm] = useState(false);
  const toggleTaskForm = () => {
    setShowTaskForm(!showTaskForm);
  };

  if (Cookies.get("authenticated") === "true") {
    return (
      <div
        className="display-container"
        style={{ backgroundColor: " #f9deff", minHeight: "100vh" }}
      >
        <button className="sideBar" onClick={toggleTaskForm}>
          {" "}
          Task Form{" "}
        </button>
        {showTaskForm && (
          <div className="Form">
            <TaskForm
              setTasks={setTasks}
              onSubmit={handleTaskSubmit}
              loadTasks={loadTasks}
            />
          </div>
        )}
        <div className="Table">
          <TaskTable
            tasks={tasks}
            onEditTask={handleEditTask}
            onDeleteTask={handleDeleteTask}
          />
        </div>
      </div>
    );
  } else {
    console.log(Cookies.get("authenticated"));
    return (
      <div>
        <h1 style={{ color: "red" }}>
          Please sign into sprints to access TaskBoard!
        </h1>
      </div>
    );
  }
}

export default App;