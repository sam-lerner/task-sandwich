import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import "./style.css";

const todoForm = document.getElementById("todo-form");
const todoInput = document.getElementById("todo-input");
const todoList = document.getElementById("todo-list");
const inProgressList = document.getElementById("in-progress-list");
const completedList = document.getElementById("completed-list");

todoForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const todoItem = createTodoItem(todoInput.value);
  todoList.appendChild(todoItem);
  todoInput.value = "";
});

function createTodoItem(text) {
  const liItem = document.createElement("li");
  liItem.innerText = text;
  liItem.addEventListener("click", () => {
    moveItem(liItem, inProgressList);
  });
  return liItem;
}

function moveItem(item, list) {
  item.removeEventListener("click", () => {
    moveItem(item, inProgressList);
  });
  item.addEventListener("click", () => {
    moveItem(item, completedList);
  });
  list.appendChild(item);
}


const Planner = () => {
  return (
    <>
      <Container className="todo-list">
        {/* <Row> */}
          <Col className="column">
            <h2>Need to Do</h2>
            <ul id="todo-list">
              {/* List items will be added dynamically here */}
            </ul>
            <form id="todo-form">
              <input type="text" placeholder="Add item..." id="todo-input" />
              <button type="submit">Add</button>
            </form>
          </Col>
          <Col className="column">
            <h2>In progress</h2>
            <ul id="in-progress-list">
              {/* In progress items will be added dynamically here */}
            </ul>
          </Col>
          <Col class="column">
            <h2>Completed</h2>
            <ul id="completed-list">
              {/* Completed items will be added dynamically here */}
            </ul>
          </Col>
        {/* </Row> */}
      </Container>
    </>
  )
}

export default Planner;