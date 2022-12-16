import React, { useEffect } from 'react';
import getToken from './services/token-handler';
import './App.css';
import "./styles/dashboard-page.css";
import "./styles/login-page.css";
import "./styles/navbar.css";
import "./styles/award-context.css";
import "./styles/user-profile-page.css";
import "./styles/vote-page.css";
import "./styles/loader.css";
import "./styles/user-profile-page.css";
import "./styles/admin-page.css";
import "./styles/choice-page.css";
import "./styles/about.css"
import "./styles/awards.css";
import "./styles/contact.css";
import "./styles/footer.css";
import "./styles/front.css";
import "./styles/header.css";
import "./styles/importance.css";
import "./styles/pagination.css";
import "./styles/post-award.css";
import "./styles/post-importance.css";
import Routing from './routers/routing';
function App() {
  useEffect(()=> {
  getToken();
  }, [])
  return (
 <Routing/>
  );
}

export default App;
