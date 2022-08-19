import React from "react";
import { Link, Route, Routes, Navigate, useLocation } from "react-router-dom";
import Me from "../me";
import { useState, useEffect } from "react";
import { ReactComponent as Search } from "../../assets/SVGs/search.svg";
import { ReactComponent as LogoCat } from "../../assets/SVGs/logo-cat.svg";
import { ReactComponent as HomeLogo } from "../../assets/SVGs/home.svg";
import BetterScroll from 'better-scroll'
import { PullUpLoad } from "better-scroll";

import "./list.css";
import { baseUrl, fetchData, userInfo } from "../../config";
import Detail from "../details/detail";
import ListComponent from "../../ components/contentComponent/listComponent/listComponent";

BetterScroll.use(PullUpLoad)
function getchannelsStr(chosenChannels) {
  return chosenChannels.map((item) => {
    return item.value
  }).join(',')
}
const SearchResultComponents = (props) => {
  const { searchEvents, SearchValue, clearSearchEvents } = props
  if (searchEvents != null && SearchValue != null) {
    return < div id="searchBox" className="Semibold" >
      <div style={{ color: '#8560A9', fontSize: "16px" }}>{searchEvents.length}results</div>
      <button
        onClick={() => { clearSearchEvents() }}
        style={{ color: '#67616D', fontSize: "10px", border: '0px solid', borderRadius: '12px', backgroundColor: '#D5EF7F', padding: '5px 20px' }}>CLEAR SEARCH</button>
      <div style={{ color: '#67616D', fontSize: "12px", marginTop: '10px' }} className="Regular">Searched for {Array.isArray(SearchValue.chosenChannels) ? (getchannelsStr(SearchValue.chosenChannels)) : (SearchValue.chosenChannels.value)} Activities from {props.SearchValue.after} to {props.SearchValue.before}</div>
    </div >
  }
  return
}

export default function Index(props) {
  let location = useLocation();
  let canDoNext = true
  const [eventsData, changeEventsData] = useState([])
  const [emptySearchEvents, doEmptySearchEvents] = useState([])
  const [listMove, changeListMovedirection] = useState(null);
  const { showDrawerfunc, showDrawer, searchEvents, SearchValue } = props;

  const [refresh, changeRefreshstate] = useState(false);

  // 定义list移不移动，向哪移动
  if (showDrawer === false && listMove !== false) {
    changeListMovedirection(false);
  }
  function clksearchButton() {
    // console.log("点了搜索按钮");
    // 让list移动方向改变为向右
    changeListMovedirection(true);
    // 并将此变化传递给父组件，让父组件的showDrawer变为true
    showDrawerfunc(true);
  }
  function clkcloak() {
    // 关闭抽屉
    console.log('点击啦遮罩')
    showDrawerfunc(false)
    changeListMovedirection(false);
  }
  function fetcheventsData(limit, offset, bs) {
    fetchData("get", `/events?limit=${limit}&&offset=${offset}`)
      .then((response) => {
        canDoNext = true
        // console.log('eventsData', eventsData)
        if (!response.error) {
          if (!bs) {
            // console.log('first time', response.events)
            changeEventsData(response.events)
          }
          else {
            // console.log('eventsData', eventsData)
            changeEventsData((eventsData) => {
              return eventsData.concat(response.events)
            })
            bs.refresh();
            bs.finishPullUp()
          }
        }
      })
      .catch((error) => {
        console.log("err" + error);
      });
  }
  function clearSearchEvents_list() {
    // console.log('将数据置为null')
    doEmptySearchEvents(null)
  }
  useEffect(() => {
    doEmptySearchEvents(searchEvents)
  }, [searchEvents])

  useEffect(() => {
    if (location.pathname === "/home/list" || location.pathname === "/home") {
      let topBox = document.querySelector(".topBox")
      topBox.style = "position: fixed;"
    }
    let requestnum = 1
    let wrapper = document.querySelector('.wrapper')
    let bs = new BetterScroll(wrapper, {
      scrollY: true,
      probeType: 3,
      pullUpLoad: {
        threshold: -30
      },
      click:true
    })
    bs.on("pullingUp", () => {
      console.log('pullingUp')
      if (canDoNext) {
        fetcheventsData(10, 10 * (requestnum++), bs)
      }
      canDoNext = false
    })
    fetcheventsData(10, 0)
  }, [refresh])

  return (
    // 规定右移为true，左移为false
    <div className={"originListStyle " + (listMove === null ? "" : listMove ? "ToRightAnimation" : "ToLeftAnimation")}>
      {showDrawer &&
        <div id={listMove === null ? "" : listMove ? "cloakdiv" : ""}
          onClick={clkcloak}>
        </div>}
      <div className="topBox">
        {location.pathname === "/home/list" && (
          <Search
            fill="#453257"
            width="25px"
            height="25px"
            className="leftlogo"
            onClick={clksearchButton}
          ></Search>
        )}
        {location.pathname !== "/home/list" && (
          <Link to="/home/list">
            <HomeLogo
              fill="#453257"
              width="25px"
              height="25px"
              className="leftlogo"
              onClick={() => { changeRefreshstate(!refresh) }}
            ></HomeLogo>
          </Link>
        )}
        <LogoCat fill="#D5EF7F" width="21px" height="24px" />
        <Link to="/home/me">
          <img id="meButton" src={userInfo().user_avatar} alt="个人主页" />
        </Link>
      </div>
      <Routes>
        <Route path="/list" element={
          <div className="wrapper" >
            <div className="content">
              {emptySearchEvents !== null && <SearchResultComponents searchEvents={searchEvents} SearchValue={SearchValue}
                clearSearchEvents={clearSearchEvents_list}
              />}
              <ListComponent eventsData={emptySearchEvents !== null ? emptySearchEvents : eventsData} />
              {emptySearchEvents === null && <div style={{
                textAlign: 'center',
                padding: '10px 0',
                background: 'aliceblue',
              }}>上滑Loading More</div>}
            </div>
          </div>}></Route>
        {/* <Route path="/list/:id" element={<List/>}></Route> */}
        <Route path="/detail/*" element={<Detail />} />
        <Route path="/me/*" element={<Me />}></Route>
        <Route path="" element={<Navigate to="/home/list" />}></Route>
      </Routes>
    </div>
  );
}
