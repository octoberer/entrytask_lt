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

  console.log("_________??????????????????")
  // ??????list???????????????????????????
  if (showDrawer === false && listMove !== false) {
    changeListMovedirection(false);
  }
  function clksearchButton() {
    // console.log("??????????????????");
    // ???list???????????????????????????
    changeListMovedirection(true);
    // ???????????????????????????????????????????????????showDrawer??????true
    showDrawerfunc(true);
  }
  function clkcloak() {
    // ????????????
    console.log('???????????????')
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
          }
          bs.finishPullUp()
          bs.refresh()
        }
      })
      .catch((error) => {
        console.log("err" + error);
      });
  }
  function clearSearchEvents_list() {
    // console.log('???????????????null')
    doEmptySearchEvents(null)
  }
  useEffect(() => {
    console.log('???????????????????????????searchEvents???useEffect??????')
    doEmptySearchEvents(searchEvents)
  }, [searchEvents])
  let bs
  useEffect(() => {
    console.log("_________?????????useEffect", refresh)
    let requestnum = 1
    let wrapper = document.querySelector('.wrapper')
    if (!bs) {
      bs = new BetterScroll(wrapper, {
        scrollY: true,
        probeType: 3,
        pullUpLoad: true,
        click: true
      })
      // console.log('bs',bs)
      bs.on("pullingUp", () => {
        console.log('pullingUp')
        if (canDoNext) {
          fetcheventsData(10, 10 * (requestnum++), bs)
        }
        canDoNext = false
      })
    }
    else {
      // console.log('else_bs',bs)
    }
    fetcheventsData(10, 0)
  }, [refresh])
  return (
    // ???????????????true????????????false
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
          <img id="meButton" src={userInfo().user_avatar} alt="????????????" />
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
                }}>??????Loading More</div>}
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
