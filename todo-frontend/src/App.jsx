import { useEffect, useState } from "react";

const API = "https://todo-app-0z2k.onrender.com/api/v1";

function App() {
  const [page, setPage] = useState("login");
  const [todos, setTodos] = useState([]);

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [registerData, setRegisterData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [todoData, setTodoData] = useState({
    title: "",
    body: "",
  });

  const token = localStorage.getItem("token");

  // =========================
  // REGISTER
  // =========================

  const register = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${API}/user/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registerData),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message);
        return;
      }

      alert("Account created successfully");

      setRegisterData({
        username: "",
        email: "",
        password: "",
      });

      setPage("login");
    } catch (error) {
      console.log(error);
    }
  };

  // =========================
  // LOGIN
  // =========================

  const login = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${API}/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message);
        return;
      }

      // Save JWT
      localStorage.setItem("token", data.token);

      setLoginData({
        email: "",
        password: "",
      });

      setPage("todos");
    } catch (error) {
      console.log(error);
    }
  };

  // =========================
  // GET TODOS
  // =========================

  const getTodos = async () => {
    try {
      const response = await fetch(`${API}/todo`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message);
        return;
      }

      setTodos(data.todos);
    } catch (error) {
      console.log(error);
    }
  };

  // =========================
  // CREATE TODO
  // =========================

  const createTodo = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${API}/todo`, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },

        body: JSON.stringify(todoData),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message);
        return;
      }

      setTodoData({
        title: "",
        body: "",
      });

      getTodos();
    } catch (error) {
      console.log(error);
    }
  };

  // =========================
  // DELETE TODO
  // =========================

  const deleteTodo = async (id) => {
    try {
      const response = await fetch(`${API}/todo/${id}`, {
        method: "DELETE",

        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message);
        return;
      }

      getTodos();
    } catch (error) {
      console.log(error);
    }
  };

  // =========================
  // UPDATE TODO
  // =========================

  const updateTodo = async (todo) => {
    const newTitle = prompt("Enter new title:", todo.title);

    if (newTitle === null) return;

    const newBody = prompt("Enter new body:", todo.body);

    if (newBody === null) return;

    try {
      const response = await fetch(`${API}/todo/${todo._id}`, {
        method: "PUT",

        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },

        body: JSON.stringify({
          title: newTitle,
          body: newBody,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message);
        return;
      }

      getTodos();
    } catch (error) {
      console.log(error);
    }
  };

  // =========================
  // LOGOUT
  // =========================

  const logout = () => {
    localStorage.removeItem("token");
    setTodos([]);
    setPage("login");
  };

  // Get todos after opening dashboard
  useEffect(() => {
    if (page === "todos" && token) {
      getTodos();
    }
  }, [page]);

  // =========================
  // LOGIN PAGE
  // =========================

  if (page === "login") {
    return (
      <div style={styles.page}>
        <div style={styles.card}>
          <h1>Todo App</h1>

          <h2>Login</h2>

          <form onSubmit={login} style={styles.form}>
            <input
              type="email"
              placeholder="Email"
              value={loginData.email}
              onChange={(e) =>
                setLoginData({
                  ...loginData,
                  email: e.target.value,
                })
              }
              style={styles.input}
            />

            <input
              type="password"
              placeholder="Password"
              value={loginData.password}
              onChange={(e) =>
                setLoginData({
                  ...loginData,
                  password: e.target.value,
                })
              }
              style={styles.input}
            />

            <button style={styles.button}>
              Login
            </button>
          </form>

          <p>
            Don't have an account?{" "}
            <button
              onClick={() => setPage("register")}
              style={styles.link}
            >
              Register
            </button>
          </p>
        </div>
      </div>
    );
  }

  // =========================
  // REGISTER PAGE
  // =========================

  if (page === "register") {
    return (
      <div style={styles.page}>
        <div style={styles.card}>
          <h1>Todo App</h1>

          <h2>Create Account</h2>

          <form onSubmit={register} style={styles.form}>
            <input
              type="text"
              placeholder="Username"
              value={registerData.username}
              onChange={(e) =>
                setRegisterData({
                  ...registerData,
                  username: e.target.value,
                })
              }
              style={styles.input}
            />

            <input
              type="email"
              placeholder="Email"
              value={registerData.email}
              onChange={(e) =>
                setRegisterData({
                  ...registerData,
                  email: e.target.value,
                })
              }
              style={styles.input}
            />

            <input
              type="password"
              placeholder="Password"
              value={registerData.password}
              onChange={(e) =>
                setRegisterData({
                  ...registerData,
                  password: e.target.value,
                })
              }
              style={styles.input}
            />

            <button style={styles.button}>
              Register
            </button>
          </form>

          <p>
            Already have an account?{" "}
            <button
              onClick={() => setPage("login")}
              style={styles.link}
            >
              Login
            </button>
          </p>
        </div>
      </div>
    );
  }

  // =========================
  // TODO DASHBOARD
  // =========================

  return (
    <div style={styles.dashboard}>
      <div style={styles.navbar}>
        <h1>My Todos</h1>

        <button onClick={logout}>
          Logout
        </button>
      </div>

      <form onSubmit={createTodo} style={styles.todoForm}>
        <input
          type="text"
          placeholder="Todo title"
          value={todoData.title}
          onChange={(e) =>
            setTodoData({
              ...todoData,
              title: e.target.value,
            })
          }
          style={styles.input}
        />

        <textarea
          placeholder="Todo description"
          value={todoData.body}
          onChange={(e) =>
            setTodoData({
              ...todoData,
              body: e.target.value,
            })
          }
          style={styles.input}
        />

        <button style={styles.button}>
          + Add Todo
        </button>
      </form>

      <div>
        {todos.length === 0 ? (
          <p>No todos yet.</p>
        ) : (
          todos.map((todo) => (
            <div key={todo._id} style={styles.todo}>
              <h3>{todo.title}</h3>

              <p>{todo.body}</p>

              <button
                onClick={() => updateTodo(todo)}
              >
                Edit
              </button>

              <button
                onClick={() => deleteTodo(todo._id)}
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

// =========================
// STYLES
// =========================

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f4f4f4",
    fontFamily: "Arial",
  },

  card: {
    width: "350px",
    padding: "30px",
    background: "white",
    borderRadius: "10px",
    boxShadow: "0 5px 20px rgba(0,0,0,0.1)",
  },

  form: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },

  input: {
    padding: "12px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    fontSize: "15px",
  },

  button: {
    padding: "12px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    background: "#222",
    color: "white",
  },

  link: {
    border: "none",
    background: "none",
    cursor: "pointer",
    textDecoration: "underline",
  },

  dashboard: {
    width: "700px",
    maxWidth: "90%",
    margin: "40px auto",
    fontFamily: "Arial",
  },

  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "30px",
  },

  todoForm: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    marginBottom: "30px",
  },

  todo: {
    padding: "20px",
    marginBottom: "15px",
    background: "white",
    border: "1px solid #ddd",
    borderRadius: "8px",
  },
};

export default App;