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

import Carousel3d from "./CarouselCard/carousel3d";
import CarouselCard from "./CarouselCard/carouselCard";

import "./styleSandbox.css";
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
      <Container className="home-quote">
        <h3>"I had stewed on how to better ensure my team acheived its goals. <span>Task Sandwich</span> filled a roll we never even know we needed."</h3>
        <h6>-Michael Scott, owner, Michael Scott Paper Comany</h6>
      </Container>
      <Container className="carouselContainer">
        <Carousel3d
          cards={[
            {
              key: 1,
              content: (
                <CarouselCard
                  title={"To-Do's!"}
                  image={taskGif}
                  description={'Use To-Do\'s to manage small tasks within you project. To create a task, click on the "Create" button in the navbar and select the "Create a Task" tab. Then, set the task name, task description, and task due date for your new task. Finally, click "Create Task" and reload the page.'}
                  factOne={'Create an account'}
                  factTwo={'Build your team'}
                  factThree={'Start your first project'}
                  factFour={'Add your tasks'}
                  url={"/"}
                  className="projectImg" />
              ),
            },
            {
              key: 2,
              content: (
                <CarouselCard
                  title={"Teams!"}
                  image={teamGif}
                  description={'Use "Teams" to stay organized with those you are working with and manage shared projects. To create a team, click on the "Create" button in the navbar and select "Create a Team" tab. Then, set the team name for your new team. Finally, click "Create Team" and reload the page.'}
                  factOne={'Once you have created your free account, you can create your team'}
                  factTwo={'Any member of the website can be invited to join your team'}
                  factThree={'Once you have created a team, it\'s time to get started on your first project!'}
                  factFour={'...I bet you could really go for a sandwich right about now!'}
                  url={"/"}
                  className="projectImg" />
              ),
            },
            {
              key: 3,
              content: (
                <CarouselCard
                  title={"Sandwiches!"}
                  image={sandwichGif}
                  description={'Our unique "Sandwich" reward system can be used to give real life rewards to project members based on task completion. Use our task tracking on the projects page to deliver sandwiches to team memebers based on how well they are doing, or just keep knocking out tasks to earn sandwiches passively.'}
                  factOne={'As team leader, set your sandwich prizes'}
                  factTwo={'Every day, each team member gets five sandwiches they can give to other members'}
                  factThree={'Completing tasks will also generate sandwiches for your users'}
                  factFour={'Once a threshold is reached, your members can cash in their sandwiches for real world rewards!'}
                  url={"/"}
                  className="projectImg" />
              ),
            },
          ]}
          offset={2}
        />
      </Container>
      <Container className="home-quote">
        <h3>"Task Sandwich literally saved my life!"</h3>
        <h6>-Jimmy Hoffa, labor organizer</h6>
      </Container>

      </Container>
    </>
  );
};

export default Home;
