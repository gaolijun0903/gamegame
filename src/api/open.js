import jsonp from 'common/js/jsonp'

export function getOpenAreaList(){
  const url = 'static/js/openarea.js'
  return jsonp(url, {}, {name: 'func' ,timeout:5000})
}
