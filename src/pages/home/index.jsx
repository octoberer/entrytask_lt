import React from "react";
import {
  useNavigate,
} from "react-router-dom";
import List from "../list/index";
import { fetchData, userInfo } from "../../config";
import { useState, useEffect } from "react";
import Drawer from "../../ components/contentComponent/ drawer/ drawer";
import "./home.css";

export default function Home() {
  const navigate = useNavigate();
  useEffect(() => {
    if (userInfo().user_id === 0) {
      navigate("/login", { replace: true });
      return
    }
  })

  const [showDrawer, changeshowDrawer] = useState(null);
  const [SearchValue, changeSearchValue] = useState(null);
  const  [searchEvents,changesearchEvents]=useState(null)
  function showDrawerfunc(flag) {
    // 实现drawer值为true
    console.log('flag', flag)
    changeshowDrawer(flag)
  }
  function getSearchValue(value) {
    changeSearchValue(value)
  }
  function closeDrawer() {
    changeshowDrawer(false)
  }
  function getQuerypath(){
    if(!SearchValue){
      return null
    }
    let {after,before,chosenChannels}=SearchValue
    // 矫正before，after,channels
    after=new Date("2022/"+after).getTime()
    before=new Date("2022/"+before).getTime()
    const getchannelsStr=()=>{
      return chosenChannels.map((item)=>{
        return item.id
      }).join(',')
    }
    console.log('chosenChannels',chosenChannels)
    if (SearchValue.chosenActivityTime === "ANYTIME" &&(!Array.isArray(chosenChannels))) {
      return `/events?limit=1000`
    }
    else if(SearchValue.chosenActivityTime === "ANYTIME"){
      return `/events?channels=${getchannelsStr()}&limit=1000`
    }
    else if((!Array.isArray(chosenChannels))&&chosenChannels.value === "all"){
      return `/events?after=${after}&before=${before}&limit=1000`
    }
    else{
      return `/events?after=${after}&before=${before}&channels=${getchannelsStr()}&limit=1000`
    }
  }
  useEffect(() => {
    let path=getQuerypath()
    if(!path){
      return 
    }
    console.log('path',path)
    fetchData("get",path).then((response)=>{
      console.log("searchEvents",response)
      changesearchEvents(response.events)
    })
  }, [SearchValue])
  return (
    // style={{ overflow: 'hidden', height: '100vh', width: "100vw" }}
    <div className="homeBox">
      <Drawer drawerVisible={showDrawer} getSearchValue={getSearchValue}
        closeDrawer={closeDrawer}></Drawer>
      <List showDrawerfunc={showDrawerfunc}
        showDrawer={showDrawer}
        searchEvents={searchEvents}
        SearchValue={SearchValue}
      ></List>
    </div>
  );

}