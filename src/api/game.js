import jsonp from 'common/js/jsonp'
export function getGamelist(){
  const url = 'http://app.kf989.com/api/data?callback=func'
  return jsonp(url, {}, {})
}
