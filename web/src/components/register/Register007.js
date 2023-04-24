import React from 'react'
import './register.css'

function register() {
  return (
    <div className="signup__container">
      <div className="container__child signup__thumbnail">
        <div className="thumbnail__content text-center">
          <h1 className="heading--primary">Welcome to MI6.</h1>
          <h2 className="heading--secondary">Are you ready to join the elite?</h2>
        </div>
        <div className="signup__overlay"></div>
      </div>
      <div className="container__child signup__form">
        <form action="#">
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input className="form-control" type="text" name="username" id="username" placeholder="james.bond" required />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input className="form-control" type="text" name="email" id="email" placeholder="james.bond@spectre.com" required />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input className="form-control" type="password" name="password" id="password" placeholder="********" required />
          </div>
          <div className="form-group">
            <label htmlFor="passwordRepeat">Repeat Password</label>
            <input className="form-control" type="password" name="passwordRepeat" id="passwordRepeat" placeholder="********" required />
          </div>
          <div className="m-t-lg">
            <ul className="list-inline">
              <li>
                <input className="btn btn--form" type="submit" value="Register" />
              </li>
              <li>
                <a className="signup__link" href="#">I am already a member</a>
              </li>
            </ul>
          </div>
        </form>  
      </div>
    </div>
  )
}

export default register