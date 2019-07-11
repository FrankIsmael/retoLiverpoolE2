import React, { Component } from 'react'

class Navbar extends Component {

  state = {
    loggedInUser: null
  }

  render() {
    return (
      <>
        <nav className="navbar is-primary" role="navigation" aria-label="main navigaton">
          <div className="navbar-brand">
            <a className="navbar-item" to="/">
              <img src="https://is1-ssl.mzstatic.com/image/thumb/Purple113/v4/2c/b6/4f/2cb64f0f-8ad9-0642-06ca-8445e86dc4e6/AppIcon-0-1x_U007emarketing-0-0-85-220-0-4.png/246x0w.jpg" alt="liverpool" width="100" height="100" />
            </a>

            <a role="button" className="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBurger" href="#">
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
            </a>
          </div>
          <div id="navbarBurger" className="navbar-menu">
            <div className="navbar-start columns">
              <div className="field column is-3">
                <div className="control column is-half">
                  <input className="input is-primary" type="text" placeholder="Busqueda" />
                </div>
              </div>

            </div>
          </div>
        </nav>
      </>
    )
  }
}

export default Navbar