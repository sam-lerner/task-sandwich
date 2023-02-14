import React from 'react';

import "./style.css";

const Planner = () => {
  return (
    <div class="todo-container">
      <h2>To-Do List</h2>
      <div class="todo">
        <form action="/" method="POST" class="todo-header">
          <input type="text" name="content" />
          <button type="submit"><span class="fas fa-plus"></span></button>
        </form>
        <ul class="todo-list">
          <li class="todo-list-item">
            <div class="todo-list-item-name">Some Text</div>
            <a href="" class="edit">
              <span class="fas fa-edit"></span>
            </a>
            <a href="" class="remove">
              <span class="fas fa-times"></span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Planner;