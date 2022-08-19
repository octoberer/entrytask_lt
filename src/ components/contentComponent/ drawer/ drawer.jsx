import React, { useEffect, useLayoutEffect, useState } from 'react'
import { DatePicker } from 'antd';
import moment from 'moment';
import './drawer.css'

import '../../../commonStyle/font.css'
import { fetchData } from "../../../config";
import { ReactComponent as SearchLogo } from "../../../assets/SVGs/search.svg";
import { ReactComponent as Date_from } from "../../../assets/SVGs/date-from.svg";
import { ReactComponent as Date_to } from "../../../assets/SVGs/date-to.svg";
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
    let channelsInputArr = document.querySelectorAll('.channelformstyle>span>input')
    if (e.target.value === "all") {
      // 将其他check状态改为false
      channelsInputArr.forEach((item) => {
        if (item.value !== "all") {
          item.checked = false
        }
      })
      changeChannelstate({ value: e.target.value, id: e.target.id })
    }
    else {
      channelsInputArr.forEach((item) => {
        if (item.value === "all") {
          item.checked = false
        }
      })
      if (!Array.isArray(chosenChannels)) {
        changeChannelstate([{ value: e.target.value, id: e.target.id }])
      }
      else {
        if (e.target.checked) {
          changeChannelstate([...chosenChannels, { value: e.target.value, id: e.target.id }])
        }
        else {
          let temp = []
          chosenChannels.forEach((item) => {
            if (item.value !== e.target.value) {
              temp.push(item)
            }
          })
          changeChannelstate(temp)
        }
      }
    }
  }
  useEffect(() => {
    fetchData('get', "/channels")
      .then((response) => {
        console.log("channelsresponse", response);
        changeChannelArr([{ name: 'all', id: 0 }, ...response.channels])
      })
      .catch((error) => {
        console.log("err" + error);
      });
  }, [])
  useLayoutEffect(() => {
    const homeBox = document.querySelector(".homeBox")
    if (showDrawer) {
      homeBox.style = 'overflow: hidden'
    } else {
      homeBox.style = ''
    }
    // const docEl = document.documentElement;
    // docEl.style = showDrawer ? 'overflow:hidden; height: 100%' : ''
  }, [showDrawer])
  function getSearchChannelsString() {
    // {},[]
    if (chosenChannels === null) {
      return ""
    }
    else if (!Array.isArray(chosenChannels)) {
      return chosenChannels.value
    }
    else {
      return chosenChannels.map((item) => {
        return item.value
      }).join(',')
    }
  }
  const dateArr = ["ANYTIME", "TODAY", "TOMORROW", "THIS WEEK", "THIS MONTH", "LATER"]
  console.log('chosenActivityTime', chosenActivityTime)
  return (
    <div className='drawerBox' id={showDrawer === null ? "" : showDrawer ? 'drawerShowAnimation' : 'drawerHiddenAnimation'}>
      <div className='marginsetting'>
        <div id="dateBox">
          <div className='title'>DATE</div>
          <div id="DateOptionBox" className='Semibold' >
            <form onChange={changeDate}>
              {dateArr.map((item) => {
                return <span key={item} className='dateSize'>
                  <input type='radio' id={item} value={item} name='date'></input><label htmlFor={item}>{item}</label>
                  {chosenActivityTime === "LATER" && item === "LATER" &&
                    <div className='datechoosebox'>
                      <span>
                        <Date_from fill='#AECB4F' width='15px' className='verticalmiddle' />
                        <DatePicker defaultValue={moment('2022/09/01', dateFormat)} format={dateFormat} size="small" suffixIcon=""
                          dropdownClassName="dropdownClassName"
                          onChange={(e) => { DatePickerchange(e, 1) }}
                        />
                      </span>
                      <span style={{ color: 'rgba(0, 0, 0, 0.09)', margin: '0 5px' }}>-</span>
                      <span >
                        <Date_to fill='#AECB4F' width='15px' className='verticalmiddle' />
                        <DatePicker defaultValue={moment('2022/09/01', dateFormat)} format={dateFormat} size="small" suffixIcon=""
                          onChange={(e) => { DatePickerchange(e, 2) }} />
                      </span>
                    </div>}
                </span>
              })}
            </form>
          </div>
        </div>
        <div id="channelBox">
          <div className='title' id="channeltitle">
            <div>CHANNEL</div>
            <div id="underline"></div>
          </div>

          <form onChange={changeChannel} className="channelformstyle">
            {
              channelArr.map((item) => {
                return <span key={item.id} className="channelspanstyle" >
                  <input type="checkbox" value={item.name} id={item.id}  ></input><label htmlFor={item.id}>{item.name}</label></span>
              })
            }
          </form>
        </div>
      </div>

      <div className={chosenChannels ? "greenbottomBox" : "graybottomBox"} id="bottomBox" onClick={submitResult}>
        <div id="bottomInnerBox">
          <div id="searchIcon">
            <SearchLogo
              fill="#453257"
              width="16px"
              height="16px"
              id="drawersearchsvg"></SearchLogo>
            <span id="searchFont">Search</span>
          </div>
          <div id='chosenChannel'>
            {getSearchChannelsString() + ' ' + (
              chosenActivityTime === "ANYTIME" ? 'ANYTIME' :
                'from' + dateMap.get(chosenActivityTime).after + "to" + dateMap.get(chosenActivityTime).before
            )}
          </div>
        </div>

      </div>
    </div>
  )
}
