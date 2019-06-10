import React from "react";
import "./style.css";

import close from "../../images/close.png";

const Todo = ({ task, onDelete, checked, onClick }) => (
  <>
    <img src={close} className="icon-close" onClick={onDelete} alt="delete" />
    <li className={checked} onClick={onClick}>
      <p>{task}</p>
    </li>
  </>
);

export default Todo;
