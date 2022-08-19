import React from "react";
import "./login.css";
import { ReactComponent as LogoCat } from "../../assets/SVGs/logo-cat.svg";
import { ReactComponent as User } from "../../assets/SVGs/user.svg";
import { ReactComponent as Password } from "../../assets/SVGs/password.svg";
import { useNavigate } from "react-router-dom";

import { baseUrl } from "../../config.jsx";

interface obj {
  preventDefault: Function;
  target: object;
}

export default function Login(props: object) {
  let navigate = useNavigate();
  async function handleSubmit(event: obj) {
    event.preventDefault();
    console.log("跳转前");
    await submitForm(event.target);
    console.log("跳转前");
    navigate("/home", { replace: true });
    return;
  }
  console.log(props);
  return (
    <div>
      <div className="backgroundstyle"></div>
      <div className="slogan ">FIND THE MOST LOVED ACTIVITIES</div>
      <div className="appName">BLACK CAT</div>
      <div id="loginLogo">
        <LogoCat fill="#D5EF7F" width="80%" height="80%" />
      </div>
      <div className="pinkcloak"></div>
      <form onSubmit={(event) => handleSubmit(event)}>
        <div className="inputOutterBox" id="loginUsernameInput">
          <div className="inputInnerBox">
            <User
              fill="#D3C1E5"
              width="15px"
              height="15px"
              className="logoMargin"
            />
            <input
              className="loginInformationInput"
              type="text"
              placeholder="Username"
            ></input>
          </div>
        </div>
        <div className="inputOutterBox">
          <div className="inputInnerBox">
            <Password
              fill="#D3C1E5"
              width="15px"
              height="15px"
              className="logoMargin"
            />
            <input
              className="loginInformationInput"
              type="password"
              placeholder="Password"
            ></input>
          </div>
        </div>
        <input id="SigninButton" type="submit" value="SIGN&nbsp;IN" />
      </form>
    </div>
  );
}
async function submitForm(e: Object) {
  let inputValueArr: any = e;
  let username = inputValueArr[0].value;
  let password = inputValueArr[1].value;
  console.log(username, password);
  await fetch(baseUrl + "/auth/token", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    mode: "cors",
    body: JSON.stringify({
      username: username,
      password: password,
    }),
  })
    .then((res) => res.json())
    .then((response) => {
      console.log("response", response);
      let data = response.user;
      sessionStorage.setItem("uid", data.id);
      sessionStorage.setItem("uname", data.username);
      sessionStorage.setItem("uemail", data.email);
      sessionStorage.setItem("uavatar", data.avatar);
      sessionStorage.setItem("token", response.token);
      return data.token;
    })
    .catch((error) => {
      console.log("err" + error);
    });
}
