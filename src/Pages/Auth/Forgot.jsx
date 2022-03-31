import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  forgotPassword,
  resetUserPassword,
  validateOpt,
} from "../../API/Authentication";
function Forgot() {
  const [hideOtp, setHideOtp] = useState(true);
  const [hidechangePassword, sethideChangePassword] = useState(true);
  const [hideMail, sethideMail] = useState(false);
  const [mail, setMailId] = useState("");

  const navigation = useNavigate();
  const verifyEmail = async (e) => {
    e.preventDefault();
    const formdata = new FormData(e.target);
    let data = {};
    for (let [key, value] of formdata) {
      data[key] = value;
    }
    setMailId(data["mailId"]);
    let response = await forgotPassword(data["mailId"]);
    if (response.status === 200) {
      let result = await response.json();
      toast.success(result?.message);
      sethideMail(true);
      setHideOtp(false);
    } else if (response.status === 401) {
      let result = await response.json();
      toast.error(result?.message);
    } else {
      toast.error("Something is wrong");
    }
  };

  const verifyOTP = async (e) => {
    e.preventDefault();
    const formdata = new FormData(e.target);
    let data = {};
    for (let [key, value] of formdata) {
      data[key] = value;
    }
    let response = await validateOpt(mail, data["otp"]);
    if (response.status === 200) {
      setHideOtp(true);
      sethideChangePassword(false);
    } else {
      toast.error("Invalid Credentials");
    }
  };

  const resetPassword = async (e) => {
    e.preventDefault();
    const formdata = new FormData(e.target);
    let data = {};
    for (let [key, value] of formdata) {
      data[key] = value;
    }
    data["mailId"] = mail;
    if (String(data["confirmPassword"]) !== String(data["password"])) {
      document.getElementById("errorMessage").innerText =
        "Confirm Password Not Matched";
      return;
    }
    delete data["confirmPassword"];
    let response = resetUserPassword(data);
    if ((await response).status === 200) {
      toast.success("Passowrd Changed");
    } else {
      toast.error("Something is Wrong");
    }
    navigation("/signin");
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
              <h3>Forgot Password</h3>
            </div>
            {!hideMail && (
              <form onSubmit={verifyEmail}>
                <div className="form-floating mb-3">
                  <input
                    type="email"
                    className="form-control"
                    name="mailId"
                    id="floatingInput"
                    placeholder="name@example.com"
                    autoComplete="username"
                    required
                  />
                  <label htmlFor="floatingInput">Email address</label>
                </div>
                <button
                  type="submit"
                  className="btn btn-primary py-3 w-100 mb-4"
                >
                  Verify Email
                </button>
              </form>
            )}
            {!hideOtp && (
              <>
                <form onSubmit={verifyOTP}>
                  <div className="form-floating mb-4">
                    <input
                      type="text"
                      className="form-control"
                      name="otp"
                      id="floatingText"
                      placeholder="OTP VERIFICATION"
                      required
                    />
                    <label htmlFor="floatingPassword">OTP</label>
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Verify otp
                  </button>
                </form>
              </>
            )}
            {!hidechangePassword && (
              <form onSubmit={resetPassword}>
                <div className="form-floating mb-4">
                  <input
                    type="password"
                    className="form-control"
                    id="floatingPassword"
                    name="password"
                    placeholder="Password"
                    autoComplete="new-password"
                    minLength={6}
                    required
                  />
                  <label htmlFor="floatingPassword">Password</label>
                </div>
                <div className="form-floating mb-4">
                  <input
                    type="password"
                    className="form-control"
                    id="floatingPassword"
                    placeholder="Password"
                    name="confirmPassword"
                    autoComplete="new-password"
                    minLength={6}
                    required
                  />
                  <label htmlFor="floatingPassword">Confirm Password</label>
                </div>
                <small
                  style={{ color: "red", margin: "10px" }}
                  id="errorMessage"
                ></small>
                <button
                  type="submit"
                  className="btn btn-primary py-3 w-100 mb-4"
                >
                  Change Password
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Forgot;
