import React, { useEffect } from "react";
import "./login.css";
import { ReactComponent as LogoCat } from "../../assets/SVGs/logo-cat.svg";
import { ReactComponent as User } from "../../assets/SVGs/user.svg";
import { ReactComponent as Password } from "../../assets/SVGs/password.svg";
import { useNavigate } from "react-router-dom";

import { baseUrl } from "../../config.jsx";


export default function Login(props) {
  let navigate = useNavigate();
  async function handleSubmit() {
    await submitForm();
    console.log('跳转前')
    navigate("/home", { replace: true });
    return
  }
  useEffect(() => {
    handleSubmit()
  },[])

  return (
    <div className="backgroundstyle">
      <div className="slogan ">FIND THE MOST LOVED ACTIVITIES</div>
      <div className="appName">BLACK CAT</div>
      <div id="loginLogo">
        <LogoCat fill="#D5EF7F" width="80%" height="80%" />
      </div>
      <form onSubmit={(event) => handleSubmit(event)}>
        <div className="inputOutterBox" id="loginUsernameInput">
          <div className="inputInnerBox">
            <User
              fill="#D3C1E5"
              width="15px"
              height="15px"
              className="logoMargin"
            />
            <input className="loginInformationInput" type="text" placeholder="Username"></input>
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
            <input className="loginInformationInput" type="password" placeholder="Password"></input>
          </div>
        </div>
        <input id="SigninButton" type="submit" value="SIGN&nbsp;IN" />
      </form>
    </div>
  );
}
async function submitForm() {
  // let inputValueArr= e;
  // let username = inputValueArr[0].value;
  // let password = inputValueArr[1].value;
  // console.log(username, password);
  await fetch(baseUrl + "/auth/token", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    mode: "cors",
    body: JSON.stringify({
      username: "aaaa",
      password: "123456",
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
