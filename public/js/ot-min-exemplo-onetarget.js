var OT = OT || {};
OT.api = OT.api || {};
(function(){
  var otg = {
    icS: '1.1.21',
    urlEvent: 'http://api.exemplo.onetarget.com.br/v1/events?',
    urlRanking: 'http://api.exemplo.onetarget.com.br/v1/rules/:id/ranking'
  };
  ranking = undefined;

  OT.api.sendClick = function(name, action, categories) { //eventName, eventAction, categories_separeted_by_underscore
    var p = {"te":"link","nm":name, "ac":action, "ct": categories};
    var qStr = buildQueryString(p);
    qStr += "&timestamp=" + new Date().getTime(); // por conta do IE
    includeResource(qStr, otg.urlEvent);
  };

  OT.api.sendPageView = function(name, categories) { //eventName, categories_separeted_by_underscore
    var p = {"te":"pageview","nm":name,"ct": categories};
    var qStr = buildQueryString(p);
    includeResource(qStr, otg.urlEvent);
  };

  OT.api.getRanking = function(rId) { //rule_id
    var p = {"rId":rId};
    urlRanking = otg.urlRanking.replace(":id", rId);
    includeResource('', urlRanking);
  };


  OT.api.initClient = function(attrs) { //init cookie values on the client side
    createCookie("otc_res",attrs);
  };

  OT.api.setRanking = function(rk) { //create ranking
    ranking = rk;
  };


  OT.api.whenReady = function(func) {
    var interval = setInterval(function(){
      if(ranking !== undefined) {
        func.call();
        clearInterval(interval);
      }
    }, 500);
  };

    OT.api.ranking = function() {
      return(ranking);
    };


  function buildQueryString(param){
    var q = "icS=" + otg.icS;
    for(var e in param){
      if(encodeURIComponent(param[e]) !== '') q += "&"+e+"="+ encodeURIComponent(param[e]);
    };
    return q;
  };

  function includeResource(param, url){
    var elem = document.createElement("script");
    elem.type = "text/javascript";
    elem.src = url + param;
    elem.async = true;
    var p = document.getElementsByTagName('script')[0];
    p.parentNode.insertBefore(elem, p);
  }

  function createCookie(name,value) {
    if(checkCookie(name)) return;
    var td = new Date();
    var expires = new Date(td.getTime()+999*24*60*60*1000);
    var expires = expires.toGMTString();
    document.cookie = name+ "="+ value + ";expires="+expires;
  }

  function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
      var c = ca[i];
      while (c.charAt(0)==' ') c = c.substring(1,c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
  };

  function checkCookie(name){
    if(document.cookie.length > 0){
      c_start = document.cookie.indexOf(name + "=");
      if(c_start != -1) return true;
      return false;
    }
  };

  var onloadEvents = function() {
    clByQueryString = getParameterByName("cl") || "";
    clByBodyClass = getBodyCl() || "";

    if (clByQueryString !== ""){
      OT.api.sendClick(getDocumentName(), window.location, clByQueryString);
    }

    OT.api.sendPageView(getDocumentName(), clByBodyClass);
  };

  function getParameterByName(name) {
    var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
    return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
  }

  function getBodyCl(){
    return getCt(document.body.className);
  }

  function getCt(classes){
    var cat = classes.split(" ").filter(function(elem){ return String(elem).match(/cl_/); });
    if(cat.length !== 0){
      return cat[0].slice(3);
    }
    return null;
  };

  function getDocumentName() {
    var href = document.location.href;
    var end = (href.indexOf("?") == -1) ? href.length : href.indexOf("?");
    return href.substring(href.lastIndexOf("/")+1, end);
  }

  //IE não tem Array.filter - Substituir no futuro
  if (!('filter' in Array.prototype)) {
    Array.prototype.filter= function(filter, that /*opt*/) {
        var other= [], v;
        for (var i=0, n= this.length; i<n; i++)
            if (i in this && filter.call(that, v= this[i], i, this))
                other.push(v);
        return other;
    };
  };
  onloadEvents();
})();
