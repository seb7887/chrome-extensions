import React from "react";

const TodoText = ({ onChange, taskName }) => (
  <div>
    <input
      onChange={onChange}
      type="text"
      id="myInput"
      placeholder="Todo Name"
      value={taskName}
    />
  </div>
);

export default TodoText;
