import React from "react";
import { Link } from "react-router-dom";

function Signin() {
  return (
    <div className="container-fluid">
      <div
        className="row h-100 align-items-center justify-content-center"
        style={{ minHeight: "100vh" }}
      >
        <div className="col-12 col-sm-8 col-md-6 col-lg-5 col-xl-4">
          <div className="bg-light rounded p-4 p-sm-5 my-4 mx-3">
            <div className="mb-3">
              <h3>Sign In</h3>
            </div>
            <form>
              <div className="form-floating mb-3">
                <input
                  type="email"
                  className="form-control"
                  id="floatingInput"
                  placeholder="name@example.com"
                  required
                />
                <label for="floatingInput">Email address</label>
              </div>
              <div className="form-floating mb-4">
                <input
                  type="password"
                  className="form-control"
                  id="floatingPassword"
                  placeholder="Password"
                  required
                />
                <label for="floatingPassword">Password</label>
              </div>
              <div className="mb-4" style={{ float: "right" }}>
                <Link to="/forgot">Forgot Password</Link>
              </div>
              <button type="submit" className="btn btn-primary py-3 w-100 mb-4">
                Sign In
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signin;
