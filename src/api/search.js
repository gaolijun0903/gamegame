import jsonp from 'common/js/jsonp'

export function getRecommendList(){
  const url = 'http://app.kf989.com/api/search?cpsid=133'
  return jsonp(url, {}, {name: 'func' ,timeout: 3000})
}

export function getSearchList(name){
  const url = 'http://app.kf989.com/api/returndata?cpsid=133'
  return jsonp(url, {name:name}, {name: 'func' ,timeout: 3000})
}
// http://app.kf989.com/api/returndata?cpsid=133&name=
