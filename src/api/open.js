import jsonp from 'common/js/jsonp'

export function getOpenAreaList(){
  //const url = 'static/js/openarea.js'
  const url = 'http://app.kf989.com/api/areadata?cpsid=133'
  return jsonp(url, {}, {name: 'func' ,timeout: 3000})
}
