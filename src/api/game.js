import jsonp from 'common/js/jsonp'
export function getGamelist(){
  const url = 'http://app.kf989.com/api/data?cpsid=130'
  return jsonp(url, {}, {})
}
