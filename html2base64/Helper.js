function renderElement(page, selector) {
	 
	var dd = page.evaluate(function(selector) {
		return document.querySelector(selector).getBoundingClientRect();
	}, selector || 'body');
  
    page.viewportSize = {width: dd.width, height: dd.height};
     
	var pic = 'data:image/png;base64,' + page.renderBase64('png');
	 
	return pic;
}
;

function parseArgs(url){ 
  // adapted from http://stackoverflow.com/a/8486188
  if(!url){
    return null;
  }
  var query = url.substr(url.indexOf("?")+1);
  var result = {};

  query.split("&").forEach(function(part) { 
    var e = part.indexOf("=")
    var key = part.substr(0, e);
    var value = part.substr(e+1); 
    result[key] = decodeURIComponent(value); 
  }); 
  return result;
  
};
 
function evaluate(page){
    page.evaluate(function(){
        var divs = document.getElementsByTagName("div");
        for(var i=0;i<divs.length;i++){
            if(divs[i].style.overflow == "auto" ){
                divs[i].style.overflow ="hidden";
            }
        }
    });
}
;

function cloneObj(oldObj) { //复制对象方法
    if (typeof(oldObj) != 'object') return oldObj;
    if (oldObj == null) return oldObj;
    var newObj = new Object();
    for (var i in oldObj)
        newObj[i] = cloneObj(oldObj[i]);
    return newObj;
};


function extendObj() { //扩展对象

    var args = arguments;
    if (args.length < 2) return;
    var temp = cloneObj(args[0]); //调用复制对象方法
     
      
    for (var n = 1; n < args.length; n++) {
        for (var i in args[n]) {
            temp[i] = args[n][i];
        }
    }
    return temp;
  
}
;


if (module && module.exports) module.exports.renderElement = renderElement;

if (module && module.exports) module.exports.parseArgs = parseArgs;

if (module && module.exports) module.exports.evaluate = evaluate;

if (module && module.exports) module.exports.extendObj = extendObj;