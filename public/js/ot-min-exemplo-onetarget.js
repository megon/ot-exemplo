var OT=OT||{};OT.api=OT.api||{};(function(){function t(t){var n="icS="+e.icS;for(var r in t){if(encodeURIComponent(t[r])!=="")n+="&"+r+"="+encodeURIComponent(t[r])}return n}function n(t){var n=document.createElement("script");n.type="text/javascript";n.src=e.url+t;n.async=true;var r=document.getElementsByTagName("script")[0];r.parentNode.insertBefore(n,r)}function r(e,t){if(s(e))return;var n=new Date;var r=new Date(n.getTime()+999*24*60*60*1e3);var r=r.toGMTString();document.cookie=e+"="+t+";expires="+r}function i(e){var t=e+"=";var n=document.cookie.split(";");for(var r=0;r<n.length;r++){var i=n[r];while(i.charAt(0)==" ")i=i.substring(1,i.length);if(i.indexOf(t)==0)return i.substring(t.length,i.length)}return null}function s(e){if(document.cookie.length>0){c_start=document.cookie.indexOf(e+"=");if(c_start!=-1)return true;return false}}function u(e){var t=RegExp("[?&]"+e+"=([^&]*)").exec(window.location.search);return t&&decodeURIComponent(t[1].replace(/\+/g," "))}function a(){return f(document.body.className)}function f(e){var t=e.split(" ").filter(function(e){return String(e).match(/cl_/)});if(t.length!==0){return t[0].slice(3)}return null}function l(){var e=document.location.href;var t=e.indexOf("?")==-1?e.length:e.indexOf("?");return e.substring(e.lastIndexOf("/")+1,t)}var e={icS:"1.1.21",url:"http://api.exemplo.onetarget.com.br/v1/events?"};rules=undefined;OT.api.sendClick=function(e,r,i){var s={te:"link",nm:e,ac:r,ct:i};var o=t(s);o+="&timestamp="+(new Date).getTime();n(o)};OT.api.sendPageView=function(e,r){var i={te:"pageview",nm:e,ct:r};var s=t(i);n(s)};OT.api.initClient=function(e,t){r("otc_res",t);rules=e};OT.api.whenReady=function(e){var t=setInterval(function(){if(rules!==undefined){e.call();clearInterval(t)}},500)};OT.api.getRule=function(e){return rules[e]};OT.api.getAllRules=function(){return rules};var o=function(){clByQueryString=u("cl")||"";clByBodyClass=a()||"";if(clByQueryString!==""){OT.api.sendClick(l(),window.location,clByQueryString)}OT.api.sendPageView(l(),clByBodyClass)};if(!("filter"in Array.prototype)){Array.prototype.filter=function(e,t){var n=[],r;for(var i=0,s=this.length;i<s;i++)if(i in this&&e.call(t,r=this[i],i,this))n.push(r);return n}}o()})()