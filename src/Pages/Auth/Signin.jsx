import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { login } from "../../API/Authentication";
import { useDataLayerValue } from "../../DataLayer";
import { action } from "../../Reducer/action";
function Signin() {
  const [, dispatch] = useDataLayerValue();
  const navigate = useNavigate();
  const loginUser = async (e) => {
    e.preventDefault();
    let formdata = new FormData(e.target);
    let data = {};

    for (let [key, value] of formdata) {
      data[key] = value;
    }
    let response = await login(data);
    if (response.status === 200) {
      let result = await response.json();

      dispatch({
        type: action.SETTOKEN,
        token: result?.token,
      });
      dispatch({
        type: action.LOGINUSER,
        user: result?.userDetails,
      });
      navigate("/");
    } else if (response.status === 401) {
      let result = await response.json();
      console.log(result?.message);
      toast.error(result?.message);
    } else {
      toast.error("Something is wrong");
    }
  };
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
            <form onSubmit={loginUser}>
              <div className="form-floating mb-3">
                <input
                  type="email"
                  name="mailId"
                  className="form-control"
                  id="floatingInput"
                  placeholder="name@example.com"
                  autoComplete="username"
                  required
                />
                <label htmlFor="floatingInput">Email address</label>
              </div>
              <div className="form-floating mb-4">
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  id="floatingPassword"
                  placeholder="Password"
                  autoComplete="new-password"
                  required
                />
                <label htmlFor="floatingPassword">Password</label>
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
