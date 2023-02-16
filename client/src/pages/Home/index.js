import React, { useState } from "react";
import { Figure } from "../../components";
import {
  Container,
  Tab,
  Modal,
  Nav
} from "react-bootstrap";
import {
  SignupForm,
  LoginForm
} from "../../components/MainComponents/..";
import { taskGif, teamGif, sandwichGif } from "./images";

import "./style.css";
// import { sandwichLogoTopEdited, sandwichLogoBottomEdited } from './images';

const Home = () => {
  const [showModal, setShowModal] = useState(false);

  const [showA, setShowA] = useState(true);
  const [showB, setShowB] = useState(true);

  const toggleShowA = () => setShowA(!showA);
  const toggleShowB = () => setShowB(!showB);
  return (
    <>
    <Container className="home-outer-container">
      <div className="pitch-card">
        <h1>Stay on task and become your team's <span className="hero-word">hero!</span></h1>
        <p className="plagueis">
          Do you have a project you are hoping to accomplish?
          <br></br>
          Does your team need help staying on task?
          <br></br>
          Task Sandwich is here to help accheiving your project's goals!
          <br></br>
          Simply create an account to get started!
          <br></br>
          Task Sandwich: Accept no Subs!
          <br></br>
        </p>
        <Nav.Link onClick={() => setShowModal(true)} className="home-login-signup-btn">
          Login/Sign Up
        </Nav.Link>
        <Modal
        size="lg"
        show={showModal}
        onHide={() => setShowModal(false)}
        aria-labelledby="signup-modal"
        >
          {/* tab container to do either signup or login component */}
          <Tab.Container defaultActiveKey="login">
            <Modal.Header closeButton>
              <Modal.Title id="signup-modal">
                <Nav variant="pills">
                  <Nav.Item>
                    <Nav.Link eventKey="login">Login</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="signup">Sign Up</Nav.Link>
                  </Nav.Item>
                </Nav>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Tab.Content>
                <Tab.Pane eventKey="login">
                  <LoginForm handleModalClose={() => setShowModal(false)} />
                </Tab.Pane>
                <Tab.Pane eventKey="signup">
                  <SignupForm handleModalClose={() => setShowModal(false)} />
                </Tab.Pane>
              </Tab.Content>
            </Modal.Body>
          </Tab.Container>
          </Modal>
      </div>
     
      <Figure />
      <h3>"I had stewed on how to better ensure my team acheived its goals. Task Sandwich filled a roll we never even know we needed."</h3>
      <h6>-Michael Scott, owner, Michael Scott Paper Comany</h6>
      <br></br>
      <br></br>
      <h3>To-Do's!</h3>
      <img src={taskGif} className="task-gif" alt="a gif showing how to create a task"/>
      <p> Use To-Do's to manage small tasks within you project. To create a task, click on the "Create" button in the navbar and select the "Create a Task" tab. Then, set the task name, task description, and task due date for your new task. Finally, click "Create Task" and reload the page.</p>
      <ul>
        <li>Create an account</li>
        <li>Build your team</li>
        <li>Start your first project</li>
        <li>Add your tasks</li>
      </ul>
      <br></br>
      <br></br>
      <h3>Teams!</h3>
      <img src={teamGif} className="team-gif" alt="a gif showing how to create a team"/>
      <p>Use "Teams" to stay organized with those you are working with and manage shared projects. To create a team, click on the "Create" button in the navbar and select "Create a Team" tab. Then, set the team name for your new team. Finally, click "Create Team" and reload the page.</p>
      <ul>
        <li>Once you have created your free account, you can create your team</li>
        <li>Any member of the website can be invited to join your team</li>
        <li>Once you have created a team, it's time to get started on your first project!</li>
      </ul>

      <br></br>
      <br></br>
      <h3>Sandwiches!</h3>
      <img src={sandwichGif} className="sandwich-gif" alt="a gif showing a user completing a task and recieving a sandwich"/>
      <p>Our unique "Sandwich" reward system can be used to give real life rewards to project members based on task completion. Use our task tracking on the projects page to deliver sandwiches to team memebers based on how well they are doing, or just keep knocking out tasks to earn sandwiches passively.</p>
      <ul>
        <li>As team leader, set your sandwich prizes</li>
        <li>Every day, each team member gets five sandwiches they can give to other members</li>
        <li>Completing tasks will also generate sandwiches for your users</li>
        <li>Once a threshold is reached, your members can cash in their sandwiches for real world rewards!</li>
      </ul>
      <br></br>
      <br></br>
      <h3>"Task Sandwich literally saved my life!"</h3>
      <h6>-Jimmy Hoffa, labor organizer</h6>
      <br></br>
      <br></br>
      </Container>
    </>
  );
};

export default Home;
