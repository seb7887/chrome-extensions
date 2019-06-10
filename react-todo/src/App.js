import React from "react";
import { withCookies } from "react-cookie";

import "./App.css";

import Todo from "./components/Todo";
import TodoAdder from "./components/TodoAdder";

class App extends React.Component {
  state = {
    todos: [],
    taskName: ""
  };

  componentDidMount() {
    const { cookies } = this.props;
    const todos = cookies.get("tasks") ? cookies.get("tasks") : [];
    this.setState({ todos });
  }

  completeTask = (e, index) => {
    const { cookies } = this.props;
    const todos = [...this.state.todos];
    todos[index].checked = "checked";
    const taskList = JSON.stringify(todos);
    cookies.set("tasks", taskList);
    this.setState({ todos });
  };

  addTodo = taskName => {
    const { cookies } = this.props;
    const todos = [...this.state.todos];
    if (this.state.taskName) {
      todos.unshift({ task: taskName, checked: "" });
      const taskList = JSON.stringify(todos);
      cookies.set("tasks", taskList);
      this.setState({
        todos,
        taskName: ""
      });
    }
  };

  changeTaskName = e => {
    e.preventDefault();
    console.log("heeey");
    this.setState({ [e.target.name]: e.target.value });
  };

  keyPressed = e => {
    e.preventDefault();
    if (e.key === "Enter") {
      this.addTodo(this.state.taskName);
    }
  };

  deleteTask = (e, index) => {
    const { cookies } = this.props;
    const todos = [...this.state.todos];
    todos.splice(index, 1);
    const taskList = JSON.stringify(todos);
    cookies.set("tasks", taskList);
    this.setState({ todos });
  };

  render() {
    const { taskName } = this.state;
    const myTodos = this.state.todos.map((t, index) => {
      return (
        <Todo
          task={t.task}
          onClick={e => this.completeTask(e, index)}
          checked={t.checked}
          onDelete={e => this.deleteTask(e, index)}
        />
      );
    });
    return (
      <div className="App">
        <TodoAdder
          onChange={e => {
            this.changeTaskName(e);
          }}
          taskName={taskName}
          onClick={e => this.addTodo(taskName)}
          enterPressed={e => this.keyPressed(e)}
        />
        <ul>{myTodos}</ul>
      </div>
    );
  }
}

export default withCookies(App);
