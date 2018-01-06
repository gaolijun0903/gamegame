import jsonp from 'common/js/jsonp'

export function getKufu(cpsid){
  const url = 'http://app.kf989.com/api/kefu?cpsid='+cpsid;
  return jsonp(url, {}, {timeout:3000})
}
