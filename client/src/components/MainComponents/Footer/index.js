import React from 'react';

import { twitterLogo, githubLogo, linkedinLogo } from './images';

import './style.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footerDocs1">
        <a href="https://github.com/sam-lerner/task-sandwich/blob/main/README.md" target="_blank" rel="noreferrer">Read the README</a>        
        <a href="https://github.com/sam-lerner/task-sandwich/blob/main/CODE_OF_CONDUCT.md" target="_blank" rel="noreferrer">Code of Conduct</a>
      </div>
      <div className="footerDocs2">
        <a href="https://github.com/sam-lerner/task-sandwich/blob/main/SECURITY.md" target="_blank" rel="noreferrer">Security</a>
        <a href="https://github.com/sam-lerner/task-sandwich/blob/main/LICENSE" target="_blank" rel="noreferrer">License</a>
      </div>
      <div className="footerLinks">
        <a href="#" target="_blank" rel="noreferrer"><img src={twitterLogo} className="footerZoom rounded-image" alt="Twitter logo."/>Twitter</a>        
        <a href="https://github.com/sam-lerner/task-sandwich" target="_blank" rel="noreferrer"><img src={githubLogo} className="footerZoom rounded-image" alt="GitHub logo."/>GitHub</a>
        <a href="#" target="_blank" rel="noreferrer"><img src={linkedinLogo} className="footerZoom rounded-image" alt="Linkedin logo."/>LinkedIn</a>  
      </div>
    </footer>
  );
}
export default Footer;
