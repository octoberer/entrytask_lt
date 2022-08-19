import React from "react";
import {
  useNavigate,
} from "react-router-dom";
import List from "../list/index";
import { userInfo } from "../../config";
import { useEffect } from "react";
import Drawer from "../../ components/contentComponent/ drawer/ drawer";

export default function Home() {
  const navigate = useNavigate();
  useEffect(() => {
    if (userInfo().user_id === 0) {
      navigate("/login", { replace: true });
      return
    }
  })

  
  return (
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