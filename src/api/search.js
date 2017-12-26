import jsonp from 'common/js/jsonp'

export function getRecommendList(cpsid){
  const url = 'http://app.kf989.com/api/search?cpsid='+cpsid;
  return jsonp(url, {}, {name: 'func' ,timeout: 3000})
}

export function getSearchList(name,cpsid){
  const url = 'http://app.kf989.com/api/returndata?cpsid='+cpsid;
  return jsonp(url, {name:name}, {name: 'func' ,timeout: 3000})
}

