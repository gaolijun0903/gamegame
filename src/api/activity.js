import jsonp from 'common/js/jsonp'

export function getActivityList(cpsid){
  const url = 'http://app.kf989.com/api/ativity?cpsid='+cpsid;
  return jsonp(url, {}, {timeout:3000})
}

export function addMoreActivityList(page,cpsid){
  const url = 'http://app.kf989.com/api/ativitypaging?cpsid='+cpsid;
  return jsonp(url, {page:page}, {timeout:3000})
}

export function getActivityDetail(id,cpsid){
  const url = 'http://app.kf989.com/api/ativitydetail?cpsid='+cpsid;
  return jsonp(url, {id:id}, {timeout:3000})
}