import React from "react";

const TodoAdder = ({ onChange, taskName, onClick, enterPressed }) => (
  <div id="myDIV" className="header">
    <h2>My Todo List</h2>
    <input
      onChange={onChange}
      type="text"
      id="taskName"
      placeholder="Todo Name"
      value={taskName}
      onKeyPress={enterPressed}
    />
    <span onClick={onClick} className="addBtn">
      Add
    </span>
  </div>
);

export default TodoAdder;
