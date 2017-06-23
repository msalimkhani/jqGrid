/**
*
* @license Guriddo jqGrid JS - v5.2.1 
* Copyright(c) 2008, Tony Tomov, tony@trirand.com
* 
* License: http://guriddo.net/?page_id=103334
*/
!function(a){"use strict";"function"==typeof define&&define.amd?define(["jquery"],a):a()}(function(){"use strict";$.extend($.jgrid,{stringify:function(a){return JSON.stringify(a,function(a,b){return"function"==typeof b?b.toString():b})},parseFunc:function(str){return JSON.parse(str,function(key,value){if("string"==typeof value&&-1!==value.indexOf("function")){var sv=value.split(" ");return sv[0]=$.trim(sv[0]),"function"!==sv[0]&&"function("!==sv[0]&&"function()"!==sv[0]||"}"!==value.trim().slice(-1)?value:eval("("+value+")")}return value})},encode:function(a){return String(a).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")},jsonToXML:function(a,b){var c=$.extend({xmlDecl:'<?xml version="1.0" encoding="UTF-8" ?>\n',attr_prefix:"-",encode:!0},b||{}),d=this,e=function(a,b){return"#text"===a?c.encode?d.encode(b):b:"function"==typeof b?"<"+a+"><![CDATA["+b+"]]></"+a+">\n":""===b?"<"+a+">__EMPTY_STRING_</"+a+">\n":"<"+a+">"+(c.encode?d.encode(b):b)+"</"+a+">\n"},f=function(a,b){for(var c=[],d=0;d<b.length;d++){var h=b[d];void 0===h||null==h?c[c.length]="<"+a+" />":"object"==typeof h&&h.constructor==Array?c[c.length]=f(a,h):c[c.length]="object"==typeof h?g(a,h):e(a,h)}return c.length||(c[0]="<"+a+">__EMPTY_ARRAY_</"+a+">\n"),c.join("")},g=function(a,b){var h=[],i=[];for(var j in b)if(b.hasOwnProperty(j)){var k=b[j];j.charAt(0)!==c.attr_prefix?null==k?h[h.length]="<"+j+" />":"object"==typeof k&&k.constructor===Array?h[h.length]=f(j,k):h[h.length]="object"==typeof k?g(j,k):e(j,k):i[i.length]=" "+j.substring(1)+'="'+(c.encode?d.encode(k):k)+'"'}var l=i.join(""),m=h.join("");return null==a||(m=h.length>0?m.match(/\n/)?"<"+a+l+">\n"+m+"</"+a+">\n":"<"+a+l+">"+m+"</"+a+">\n":"<"+a+l+" />\n"),m},h=g(null,a);return c.xmlDecl+h},xmlToJSON:function(root,options){var o=$.extend({force_array:[],attr_prefix:"-"},options||{});if(root){var __force_array={};if(o.force_array)for(var i=0;i<o.force_array.length;i++)__force_array[o.force_array[i]]=1;"string"==typeof root&&(root=$.parseXML(root)),root.documentElement&&(root=root.documentElement);var addNode=function(hash,key,cnts,val){if("string"==typeof val)if(-1!==val.indexOf("function"))val=eval("("+val+")");else switch(val){case"__EMPTY_ARRAY_":val=[];break;case"__EMPTY_STRING_":val="";break;case"false":val=!1;break;case"true":val=!0}__force_array[key]?(1===cnts&&(hash[key]=[]),hash[key][hash[key].length]=val):1===cnts?hash[key]=val:2===cnts?hash[key]=[hash[key],val]:hash[key][hash[key].length]=val},parseElement=function(a){if(7!==a.nodeType){if(3===a.nodeType||4===a.nodeType){if(null==a.nodeValue.match(/[^\x00-\x20]/))return;return a.nodeValue}var b,c,d,e,f={};if(a.attributes&&a.attributes.length)for(b={},c=0;c<a.attributes.length;c++)"string"==typeof(d=a.attributes[c].nodeName)&&(e=a.attributes[c].nodeValue)&&(d=o.attr_prefix+d,void 0===f[d]&&(f[d]=0),f[d]++,addNode(b,d,f[d],e));if(a.childNodes&&a.childNodes.length){var g=!0;for(b&&(g=!1),c=0;c<a.childNodes.length&&g;c++){var h=a.childNodes[c].nodeType;3!==h&&4!==h&&(g=!1)}if(g)for(b||(b=""),c=0;c<a.childNodes.length;c++)b+=a.childNodes[c].nodeValue;else for(b||(b={}),c=0;c<a.childNodes.length;c++)"string"==typeof(d=a.childNodes[c].nodeName)&&(e=parseElement(a.childNodes[c]))&&(void 0===f[d]&&(f[d]=0),f[d]++,addNode(b,d,f[d],e))}return b}},json=parseElement(root);if(__force_array[root.nodeName]&&(json=[json]),11!==root.nodeType){var tmp={};tmp[root.nodeName]=json,json=tmp}return json}},saveAs:function(a,b,c){c=$.extend(!0,{type:"plain/text;charset=utf-8"},c||{});var d,e,f=[];b=null==b||""===b?"jqGridFile.txt":b,$.isArray(a)?f=a:f[0]=a;try{d=new File(f,b,c)}catch(a){d=new Blob(f,c)}if(window.navigator&&window.navigator.msSaveOrOpenBlob)window.navigator.msSaveOrOpenBlob(d,b);else{e=URL.createObjectURL(d);var g=document.createElement("a");g.href=e,g.download=b,document.body.appendChild(g),g.click(),setTimeout(function(){document.body.removeChild(g),window.URL.revokeObjectURL(e)},0)}}})});