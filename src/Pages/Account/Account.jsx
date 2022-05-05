import React from "react";
import { useDataLayerValue } from "../../DataLayer";
import { changeUserName, validUser } from "../../API/Account";
import { resetUserPassword } from "../../API/Authentication";
import { toast } from "react-toastify";
function Account() {
  const [{ user }] = useDataLayerValue();
  const changeName = async (e) => {
    e.preventDefault();
    let formdata = new FormData(e.target);
    let data = {};
    data["id"] = user?.id;
    for (let [key, value] of formdata) {
      data[key] = value;
    }
    //console.log(data);
    let response = await changeUserName(data);
    if (response.status === 200) {
      let result = await response.json();
      toast.success(result?.message);
    } else {
      toast.error("Something is Wrong");
    }
    e.target.reset();
  };
  const changePassword = async (e) => {
    e.preventDefault();
    let formdata = new FormData(e.target);
    let data = {};
    data["mailId"] = user?.mailId;
    for (let [key, value] of formdata) {
      data[key] = value;
    }

    //console.log(data);
    if (String(data["newPassword"]) !== String(data["ConfirmPassword"])) {
      document.getElementById("accountError").innerText =
        "Confirm Password not matched";
      setTimeout(() => {
        document.getElementById("accountError").innerText = "";
      }, 4000);
      return;
    }
    let response = await validUser({
      mailId: data["mailId"],
      password: data["password"],
    });

    if (response.status === 401) {
      let result = await response.json();
      toast.error(result?.message);
    } else if (response.status === 200) {
      data["password"] = data["newPassword"];
      let result = await resetUserPassword(data);

      if (result.status === 200) {
        let res = await result.json();
        toast.success(res?.message);
      } else {
        toast.error("Something is Wrong");
      }
    } else {
      toast.error("Something is wrong");
    }
    e.target.reset();
  };
  return (
    <div className="container d-flex flex-column justify-content-center  mt-3">
      <div className="form-floating mb-3">
        <input
          type="email"
          className="form-control"
          placeholder="name@example.com"
          defaultValue={user?.mailId}
          autoComplete="username"
          required
          readOnly
        />
        <label htmlFor="floatingInput">Email address</label>
      </div>

      <form onSubmit={changeName}>
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="User Name"
            name="name"
            autoComplete="username"
            required
            defaultValue={user?.name}
          />
          <label htmlFor="floatingInput">Username</label>
        </div>
        <button className="btn btn-info">Change Username</button>
      </form>

      <form className="mt-3" onSubmit={changePassword}>
        <div className="form-floating mb-3">
          <input
            type="password"
            className="form-control"
            id="floatingPassword"
            placeholder="password"
            name="password"
            autoComplete="current-password"
            required
          />
          <label htmlFor="floatingInput">Old Password</label>
        </div>
        <div className="form-floating mb-3">
          <input
            type="password"
            className="form-control"
            placeholder="password"
            name="newPassword"
            autoComplete="new-password"
            minLength={6}
            required
          />
          <label htmlFor="floatingInput">New Password</label>
        </div>
        <div className="form-floating mb-3">
          <input
            type="password"
            className="form-control"
            placeholder="Confirm password"
            name="ConfirmPassword"
            autoComplete="new-password"
            minLength={6}
            required
          />
          <label htmlFor="floatingInput">Confirm Password</label>
        </div>
        <small
          style={{ color: "red" }}
          className="m-1"
          id="accountError"
        ></small>
        <br />
        <button className="btn btn-info">Change Password</button>
      </form>
    </div>
  );
}

export default Account;
