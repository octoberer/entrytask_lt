import React, { useEffect, useLayoutEffect, useState } from 'react'
import { DatePicker } from 'antd';
import moment from 'moment';
import './drawer.css'
// import 'antd/dist/antd.css'
import '../../../commonStyle/font.css'
import { fetchData } from "../../../config";
// import { ReactComponent as SearchLogo } from "../../../assets/SVGs/search.svg";
// import { ReactComponent as Date_from } from "../../../assets/SVGs/date-from.svg";
// import { ReactComponent as Date_to } from "../../../assets/SVGs/date-to.svg";
import { getMonthDay } from '../../../config'

const TODAYSTART = moment().format("MM/DD");
const TODAYEND = moment().add(1, 'd').format("MM/DD");
const TOMORROWSTART = moment().add(1, 'd').format("MM/DD");
const TOMORROWEND = moment().add(2, 'd').format("MM/DD");
const WEEKSTART = moment().startOf('week').format("MM/DD");
const WEEKEND = moment().endOf('week').add(1, 'd').format("MM/DD");
const MONTHSTART = moment().startOf('month').format("MM/DD");
const MONTHEND = moment().endOf('month').add(1, 'd').format("MM/DD");
const dateMap = new Map([['TODAY', { after: TODAYSTART, before: TODAYEND }]
  , ['TOMORROW', { after: TOMORROWSTART, before: TOMORROWEND }]
  , ["THIS WEEK", { after: WEEKSTART, before: WEEKEND }]
  , ["THIS MONTH", { after: MONTHSTART, before: MONTHEND }]
  , ['LATER', { after: '09/01', before: '09/01' }]
  , ["ANYTIME", { after: "01/01", before: "12/30" }]
])
export default function Drawer(props) {
  // 接收父组件传来的drawer是否显示的值
  const { drawerVisible, getSearchValue, closeDrawer } = props
  const dateFormat = 'YYYY/MM/DD';

  let [channelArr, changeChannelArr] = useState([]);
  let [showDrawer, changeshowDrawer] = useState(null);
  let [chosenChannels, changeChannelstate] = useState(null);
  let [chosenActivityTime, changeActivityTime] = useState("ANYTIME");
  // let [chosenActivityTimeslot, changeActivityTimeslot] = useState(['09/01','09/01']);
  if (drawerVisible === true && showDrawer !== true) {
    // 打开抽屉
    // console.log('drawerVisible', drawerVisible)
    changeshowDrawer(true)
  }
  if (drawerVisible === false && showDrawer === true) {
    changeshowDrawer(false)
  }
  function submitResult() {
    if (chosenChannels == null) {
      return
    }
    let before, after
    console.log('submitResult', chosenActivityTime)
    if (changeActivityTime === 'ANYTIME') {
      after = ""
      before = ""
    }
    else {
      after = dateMap.get(chosenActivityTime).after
      before = dateMap.get(chosenActivityTime).before
      console.log(after)
    }
    getSearchValue({
      chosenActivityTime,
      after,
      before,
      chosenChannels
    })
    closeDrawer()
    changeshowDrawer(false)
  }
  // console.log('抽屉组件执行了一次')
  function changeDate(e) {

    changeActivityTime(e.target.value)
  }
  function DatePickerchange(e, order) {
    if (order === 1) {
      dateMap.set('LATER', { after: getMonthDay(e) })
    }
    if (order === 2) {
      dateMap.set('LATER', { before: getMonthDay(e), after: dateMap.get('LATER').after })
    }
  }
  function changeChannel(e) {
  }
  return (
    <div></div>
  )
}
