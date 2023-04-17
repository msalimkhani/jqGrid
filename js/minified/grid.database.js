!function(e){"use strict";"function"==typeof define&&define.amd?define(["jquery","./grid.base"],e):e(jQuery)}(function(l){"use strict";l.jgrid.extend({dbInit:function(e){return this.each(function(){"indexeddb"===e&&l(this).jqGrid("_initIndexedDB_")})},_initIndexedDB_:function(){this.each(function(){var s=this;indexedDB.databases().then(function(e){var n=indexedDB.open(s.p.dbconfig.dbname,s.p.dbconfig.dbversion);n.onupgradeneeded=e=>{console.info("Database created: "+s.p.dbconfig.dbname)},n.onsuccess=function(e){var e=e.target.result,n=parseInt(e.version),c=l.jgrid.getElemByAttrVal(s.p.colModel,"key",!0);async function o(i){"string"==typeof s.p.dbconfig.dataUrl?d=await(await fetch(s.p.dbconfig.dataUrl)).json():Array.isArray(s.p.dbconfig.dataUrl)&&(d=s.p.dbconfig.dataUrl),s.p.dbconfig.dbversion=n+1;var d,e=indexedDB.open(s.p.dbconfig.dbname,s.p.dbconfig.dbversion);e.onupgradeneeded=function(e){var n=e.target.result;if(!i){var o=n.createObjectStore(s.p.dbconfig.dbtable,{keyPath:c.name});for(let e=0;e<s.p.colModel.length;e++){var r=s.p.colModel[e];r.name===c.name?o.createIndex(r.name,r.name,{unique:!0}):o.createIndex(r.name,r.name,{unique:!1})}}var t,a=e.target.transaction.objectStore(s.p.dbconfig.dbtable);a.transaction.oncomplete=function(e){s.p.dbconfig.loadIfExists=!1},a.transaction.onerror=function(e){l.jgrid.info_dialog("Error",e.target.error.name+" : "+e.target.error.message,"Close")};for(t of d)s.p.dbconfig.isKeyInData||(t[c.name]=Math.random().toString(16).slice(2)),a.add(t);s.p.dbconfig.ready_req=!0,s.grid.populate()},e.onerror=e=>{l.jgrid.info_dialog("Error",e.target.error.name+" : "+e.target.error.message,"Close")}}l.isEmptyObject(c)?l.jgrid.info_dialog("Warning","Missed key: No uniquie key is set in colModel. Creating table fail","Close"):(e.close(),e.objectStoreNames.contains(s.p.dbconfig.dbtable)?s.p.dbconfig.loadIfExists?o(!0):(s.p.dbconfig.ready_req=!0,s.grid.populate()):o(!1))},n.onerror=e=>{l.jgrid.info_dialog("Error",e.target.error.name+" : "+e.target.error.message,"Close")}})})},updateStorageRecord:async function(d,c){let e=this[0],s=e.p.dbconfig,o=e.p.datatype;return new Promise(function(n,a){if(Array.isArray(d)||(d=[d]),c=c||e.p.keyName,"indexeddb"===o){const i=window.indexedDB.open(s.dbname,s.dbversion);i.onsuccess=e=>{var o=i.result.transaction(s.dbtable,"readwrite"),r=(o.oncomplete=e=>{n(e),console.log("Transaction completed succefully")},o.onerror=e=>{a(e),console.log(e.target.error)},o.objectStore(s.dbtable));for(let n=0;n<d.length;n++){if(!d[n].hasOwnProperty(c)||""===d[n][c]){o.abort();break}var t=r.openCursor();t.onsuccess=e=>{e=e.target.result;e&&(e.value[c]===d[n][c]?e.update(d[n]):e.continue())},t.onerror=e=>{console.log(e.target.error)}}}}})},addStorageRecord:async function(i,d){let e=this[0],c=e.p.dbconfig,n=e.p.datatype;return new Promise(function(r,t){if(Array.isArray(i)||(i=[i]),d=d||e.p.keyName,"indexeddb"===n){const a=window.indexedDB.open(c.dbname,c.dbversion);a.onsuccess=e=>{var n=a.result.transaction(c.dbtable,"readwrite"),o=(n.oncomplete=e=>{r(e),console.log("Transaction completed succefully")},n.onerror=e=>{t(e),console.log(e.target.error)},n.objectStore(c.dbtable));for(let e=0;e<i.length;e++)i[e].hasOwnProperty(d)&&""!==i[e][d]||(i[e][d]=Math.random().toString(16).slice(2)),o.add(i[e]).onsuccess=e=>{}}}})},deleteStorageRecord:async function(i,e){let n=this[0],d=n.p.dbconfig,o=n.p.datatype;return new Promise(function(r,t){if(Array.isArray(i)||(i=[i]),e=e||n.p.keyName,"indexeddb"===o){const a=window.indexedDB.open(d.dbname,d.dbversion);a.onsuccess=e=>{var n=a.result.transaction(d.dbtable,"readwrite"),o=(n.oncomplete=e=>{r(e),console.log("Transaction completed succefully")},n.onerror=e=>{t(e),console.log(e.target.error)},n.objectStore(d.dbtable));for(let e=0;e<i.length;e++)o.delete(i[e]).oncomplete=e=>{}}}})}})});