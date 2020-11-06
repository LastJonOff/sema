import React, {useEffect} from 'react'
import {BrowserRouter as Router} from "react-router-dom";
import 'materialize-css'
import {useRoutes} from "./routes";
import {useAuth} from "./hooks/auth.hook";
import {AuthContext} from "./context/auth.context";
import {MyNavbar} from "./components/Navbar";
import M from  'materialize-css/dist/js/materialize.min.js';
import Container from "react-bootstrap/Container";

function App() {
    const {token, login, logout, userId, status} = useAuth()
    const isAuthenticated = !!token
    const routes = useRoutes(isAuthenticated)

    useEffect(() => {
        let sidenav = document.querySelector('#slide-out');
        //let elems = document.querySelectorAll('.dropdown-trigger');
        M.Sidenav.init(sidenav, {});
        //M.Dropdown.init(elems, {inDuration: 300, outDuration: 225});
    })
  return (
      <AuthContext.Provider value = {{
          token, login, logout, userId, isAuthenticated, status
      }}>
          <Router>
              {isAuthenticated && <MyNavbar />}
              <Container>
                  {routes}
              </Container>
          </Router>
      </AuthContext.Provider>
  )
}

export default App
