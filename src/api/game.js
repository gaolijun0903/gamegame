import jsonp from 'common/js/jsonp'

export function getGamelist(){
  const url = 'http://app.kf989.com/api/data?cpsid=130'
  return jsonp(url, {}, {timeout:5000})
}

export function addMoreGamelist(page){
  const url = 'http://app.kf989.com/api/paging?cpsid=133'
  return jsonp(url, {page:page}, {timeout:5000})
}
