import { idText } from "typescript";

export var baseUrl = 'http://localhost:3000/api/v1'

export function userInfo() {
    var user_id = sessionStorage.getItem('uid') ? sessionStorage.getItem('uid') : 0;
    var user_email = sessionStorage.getItem('uemail') ? sessionStorage.getItem('uemail') : 1;
    var user_name = sessionStorage.getItem('uname') ? sessionStorage.getItem('uname') : null;
    var user_avatar = sessionStorage.getItem('uavatar') ? sessionStorage.getItem('uavatar') : null;
    var token = sessionStorage.getItem('token') ? sessionStorage.getItem('token') : null;
    var user_info = {
        user_id: parseInt(user_id),
        user_name: user_name,
        user_email: user_email,
        user_avatar: user_avatar,
        token: token
    }
    return user_info;
}
export function fetchData(method,path, body={}) {
    const reqHeaders = new Headers({
        "X-BLACKCAT-TOKEN": userInfo().token,
        "Content-Type": "application/json",
    });
    if(method==="get"){
        return fetch(baseUrl + path, {
            method: method,
            headers: reqHeaders,
            mode: "cors",
        }).then((res) => res.json())
    }
    else if(method==="post"||method==='delete'){
        if(body){
            console.log("进入了有body的")
            return fetch(baseUrl + path, {
                method: method,
                headers: reqHeaders,
                mode: "cors",
                body:JSON.stringify(body)
            })
        }
        else{
            console.log("进入了无body的")
            return fetch(baseUrl + path, {
                method: method,
                headers: reqHeaders,
                mode: "cors",
                // data:JSON.stringify(body)
            })
        }
        
    }  
}
export const getDate = (time) => {
    const date = new Date(time);
    const year = date.getFullYear();
    // const year = date.getYear() + 1 > 9 ? date.getYear() + 1 : '0' + (date.getYear() + 1);
    const month = date.getMonth();
    const day = date.getDate();
    return `${addZero(day)} ${transformEnglish(month)} ${year}`
}
export const getMonthDay = (time) => {
    const date = new Date(time);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${addZero(month)}/${addZero(day)}`
}
export const getTime = (time) => {
    const date = new Date(time);
    const hour = date.getHours();
    const minute = date.getMinutes();
    return `${addZero(hour)}:${addZero(minute)}`;
}
function transformEnglish(num){
    const month=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sept','Oct','Nov','Dec']
    return month[num]
}
function addZero(num) {
    if (num < 10) {
        num = '0' + num;
    }
    return num;
}



