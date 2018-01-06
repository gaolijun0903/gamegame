import jsonp from 'common/js/jsonp'

export function getGamelist(uid,cpsid){
  const url = 'http://app.kf989.com/api/data?cpsid='+cpsid;
  return jsonp(url, {uid:uid}, {timeout:3000})
}

export function addMoreGamelist(page,cpsid){
  const url = 'http://app.kf989.com/api/paging?cpsid='+cpsid;
  return jsonp(url, {page:page}, {timeout:3000})
}

export function getDetail(id,cpsid){
  const url = 'http://app.kf989.com/api/gameinfo?cpsid='+cpsid;
  return jsonp(url,{gameid:id},{timeout:3000})
}


export function setUID(uid,cpsid){
  const url = 'http://app.kf989.com/api/adduid?cpsid='+cpsid;
  return jsonp(url,{gameid:uid},{timeout:3000})
}
