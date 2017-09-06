import {cloneObj} from "./util";

export function normalizeImage(list){
  let _list = cloneObj(list);
  _list.forEach((item)=>{
    if(item.imgpath){
      item.imgpath = 'http://app.kf989.com'+item.imgpath;
    }else if(item.ioc_path){
      item.ioc_path = 'http://app.kf989.com' + item.ioc_path;
    }
  })
  return _list;
}


export function normalizeImage2(list){
  let _list = cloneObj(list);
  _list.forEach((time)=>{
    time.openingtime = formatTime(time.openingtime)
    time.openlist.forEach((item)=>{
      if(item.ioc_path){
        item.ioc_path = 'http://app.kf989.com' + item.ioc_path;
      }
    })
  })
  return _list;
}

function formatTime(time){
  let t = new Date(Number(time * 1000));
  let Y = padLeftZero(t.getYear());
  let M = padLeftZero(t.getMonth()+1);
  let d = padLeftZero(t.getDate());
  let h = padLeftZero(t.getHours());
  let m = padLeftZero(t.getMinutes());
  let str = M+"/"+d+" "+ h+":"+m
  return str
}

function padLeftZero(num){
  return num<10 ? '0'+num : num
}
