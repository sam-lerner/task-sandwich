import React from "react";
import { Figure } from "../../components";
// import { LoginForm, SignupForm } from '../../components';

const Home = () => {
  return (
    <>
      <h1>Stay on task and become your team's hero!</h1>
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
        <button>Sign up now!
        </button>
      </p>
      <Figure />
      <h3>"I had stewed on how to better ensure my team acheived its goals. Task Sandwich filled a roll we never even know we needed."</h3>
      <h6>-Michael Scott, owner, Michael Scott Paper Comany</h6>
      <br></br>
      <br></br>
      <h3>Here will be a screenshot gif</h3>
      <p>This area will talk about the todo list</p>
      <ul>
        <li>Create an account</li>
        <li>Build your team</li>
        <li>Start your first project</li>
        <li>Add your tasks</li>
      </ul>
      <br></br>
      <br></br>
      <h3>Here will be a screenshot gif</h3>
      <p>This area will talk about creating a team</p>
      <ul>
        <li>Once you have created your free account, you can create your team</li>
        <li>Any member of the website can be invited to join your team</li>
        <li>Once you have created a team, it's time to get started on your first project!</li>
      </ul>

      <br></br>
      <br></br>
      <h3>Here will be a screenshot gif</h3>
      <p>This area will talk about the sandiwch mechanic</p>
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
    </>
  );
};

export default Home;
