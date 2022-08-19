import React, { useEffect, useState } from "react";
import { ReactComponent as EmailLogo } from "../../assets/SVGs/email.svg";
import { fetchData } from "../../config";
import "./me.css";
import { Link, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { ReactComponent as Likelogo_outline } from "../../assets/SVGs/like-outline.svg";
import { ReactComponent as Checklogo_outline } from "../../assets/SVGs/check-outline.svg";
import { ReactComponent as Likelogo } from "../../assets/SVGs/like.svg";
import { ReactComponent as Checklogo } from "../../assets/SVGs/check.svg";
import { ReactComponent as Pastlogo } from "../../assets/SVGs/past.svg";
import { ReactComponent as Pastlogo_outline } from "../../assets/SVGs/past-outline.svg";
import ListComponent from '../../ components/contentComponent/listComponent/listComponent'
import NoDataTipComponents from "../../ components/commonComponents/noDataTipComponents/noDataTipComponents";
export default function Index() {
  const [me_userData, changeMe_userData] = useState({});

  let [events_likeData, changeEvents_likeData] = useState([]);
  let [events_goingData, changeEvents_goingData] = useState([]);
  let [events_pastData, changeEvents_pastData] = useState([]);

  let location = useLocation();
  useEffect(() => {
    if(location.pathname!=="/home/list"){
      let topBox=document.querySelector(".topBox")
      topBox.style=""
    }
    fetchData("get", "/user")
      .then((response) => {
        // console.log("meresponse", response);
        changeMe_userData(response);
      })
      .catch((error) => {
        console.log("err" + error);
      });
    fetchData("get", "/user/events?type=liked")
      .then((response) => {
        console.log("events_likeData", response);
        changeEvents_likeData(response.events);
      })
      .catch((error) => {
        console.log("err" + error);
      });
    fetchData("get", "/user/events?type=going")
      .then((response) => {
        console.log("events_goingData", response);
        changeEvents_goingData(response.events);
      })
      .catch((error) => {
        console.log("err" + error);
      });
      fetchData("get", "/user/events?type=past", {})
      .then((response) => {
        console.log("events_pastData", response);
        changeEvents_pastData(response.events);
      })
      .catch((error) => {
        console.log("err" + error);
      });
  }, []);
  return (
    <div id="mebox" className="contentBox">
      <div id="meheadstyle">
        <div id="meAvatar">
          <img src={me_userData.avatar} id="meAvatarimg"></img>
        </div>
        <div id="meUsername" className="Regular">
          {me_userData.username}
        </div>
        <div id="meEmail" className="Regular">
          <EmailLogo
            fill="#8560A9"
            style={{ width: "16px", verticalAlign: "middle" }}
          ></EmailLogo>
          <span style={{ verticalAlign: "middle" }}>{me_userData.email}</span>
        </div>
      </div>
      <div id="threeCategories">
        <div id="me_routerStyle">
          <div className="Trisection">
            <Link to={"/home/me/like"}>
              {location.pathname !== "/home/me/like" && (
                <Likelogo_outline
                  fill="#BABABA"
                  width="10%"
                  className="verticalmiddle"
                ></Likelogo_outline>
              )}
              {location.pathname === "/home/me/like" && (
                <Likelogo
                  fill="#AECB4F"
                  width="10%"
                  className="verticalmiddle"
                ></Likelogo>
              )}
              <span
                className={
                  location.pathname !== "/home/me/like"
                    ? "dropAstyle"
                    : "chosenAstyle"
                }
              >
                {me_userData.likes_count}Likes
              </span>
            </Link>
          </div>
          <div className="Trisection">
            <Link to={"/home/me/going"}>
              {location.pathname !== "/home/me/going" && (
                <Checklogo_outline
                  fill="#BABABA"
                  width="10%"
                  className="verticalmiddle"
                ></Checklogo_outline>
              )}
              {location.pathname === "/home/me/going" && (
                <Checklogo
                  fill="#AECB4F"
                  width="10%"
                  className="verticalmiddle"
                ></Checklogo>
              )}
              <span
                className={
                  location.pathname !== "/home/me/going"
                    ? "dropAstyle"
                    : "chosenAstyle"
                }
              >
                {me_userData.goings_count}Going
              </span>
            </Link>
          </div>
          <div className="Trisection" id="lastItem">
            <Link to={"/home/me/past"}>
              {location.pathname !== "/home/me/past" && (
                <Pastlogo_outline
                  fill="#BABABA"
                  width="10%"
                  className="verticalmiddle"
                ></Pastlogo_outline>
              )}
              {location.pathname === "/home/me/past" && (
                <Pastlogo
                  fill="#AECB4F"
                  width="10%"
                  className="verticalmiddle"
                ></Pastlogo>
              )}
              <span
                className={
                  location.pathname !== "/home/me/past"
                    ? "dropAstyle"
                    : "chosenAstyle"
                }
              >
                {me_userData.past_count}Past
              </span>
            </Link>
          </div>
        </div>
        <Routes>
          <Route
            path={"/like"}
            element={
              events_likeData.length === 0 ? <NoDataTipComponents /> : <ListComponent eventsData={events_likeData} />
            }
          ></Route>
          <Route
            path={"/going"}
            element={
              events_goingData.length === 0 ? <NoDataTipComponents /> : <ListComponent eventsData={events_goingData} />
            }
          ></Route>
          <Route
            path={"/past"}
            element={
              events_pastData.length === 0 ? <NoDataTipComponents /> : <ListComponent eventsData={events_pastData} />
            }
          ></Route>
          <Route
            path={""}
            element={
              <Navigate to={"/home/me/like"} />
            }
          ></Route>
        </Routes>
      </div>
    </div>
  );
}
