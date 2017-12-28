import jsonp from 'common/js/jsonp'

export function getOpenAreaList(cpsid){
  const url = 'http://app.kf989.com/api/areadata?cpsid='+cpsid;
  return jsonp(url, {}, {name: 'func' ,timeout: 3000})
}
