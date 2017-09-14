export function shuffle(arr){
	let _arr = arr.slice();
	for(let i=0; i<_arr.length; i++){
		let j = getRandomInt(0,i);
		let t = _arr[i];
		_arr[i] = _arr[j];
		_arr[j] = t;
	}
	return _arr
}
function getRandomInt(min,max){
	return Math.floor(Math.random()*(max-min+1) + min);
}

//节流函数
export function debounce(func,delay){
	let timer
	return function (...args){
		if(timer){
			clearTimeout(timer)
		}
		timer = setTimeout(()=>{
			func.apply(this,args)
		},delay)
	}
}

//深拷贝
export function cloneObj(obj){
  var str, newobj = obj.constructor === Array ? [] : {};
  if(typeof obj !== 'object'){
    return;
  } else if(window.JSON){
    str = JSON.stringify(obj), //系列化对象
    newobj = JSON.parse(str); //还原
  } else {
    for(var i in obj){
      newobj[i] = typeof obj[i] === 'object' ?
      cloneObj(obj[i]) : obj[i];
    }
  }
  return newobj;
}

export function baseUrl(){
	return "http://app.kf989.com";
}


