!function(r){"use strict";"function"==typeof define&&define.amd?define(["jquery","./grid.base"],r):r(jQuery)}(function(N){"use strict";N.jgrid.extend({groupingInit:function(){return this.each(function(){N.extend(this.p.groupingView,{groupField:[],groupOrder:[],groupText:[],groupColumnShow:[],groupSummary:[],showSummaryOnHide:!1,sortitems:[],sortnames:[],summary:[],summaryval:[],plusicon:"",minusicon:"",displayField:[],groupSummaryPos:[],formatDisplayField:[],_locgr:!1},!0)})},groupingSetup:function(){return this.each(function(){var r,e,i,t=this,o=t.p.colModel,n=t.p.groupingView,s=N.jgrid.styleUI[t.p.styleUI||"jQueryUI"].grouping;if(null===n||"object"!=typeof n&&!N.jgrid.isFunction(n))t.p.grouping=!1;else if(n.plusicon||(n.plusicon=s.icon_plus),n.minusicon||(n.minusicon=s.icon_minus),n.groupField.length){for(void 0===n.visibiltyOnNextGrouping&&(n.visibiltyOnNextGrouping=[]),n.lastvalues=[],n._locgr||(n.groups=[]),n.counters=[],r=0;r<n.groupField.length;r++)n.groupOrder[r]||(n.groupOrder[r]="asc"),n.groupText[r]||(n.groupText[r]="{0}"),"boolean"!=typeof n.groupColumnShow[r]&&(n.groupColumnShow[r]=!0),"boolean"!=typeof n.groupSummary[r]&&(n.groupSummary[r]=!1),n.groupSummaryPos[r]||(n.groupSummaryPos[r]="footer"),!0===n.groupColumnShow[r]?(n.visibiltyOnNextGrouping[r]=!0,N(t).jqGrid("showCol",n.groupField[r])):(n.visibiltyOnNextGrouping[r]=N("#"+N.jgrid.jqID(t.p.id+"_"+n.groupField[r])).is(":visible"),N(t).jqGrid("hideCol",n.groupField[r]));for(n.summary=[],n.hideFirstGroupCol&&Array.isArray(n.formatDisplayField)&&!N.jgrid.isFunction(n.formatDisplayField[0])&&(n.formatDisplayField[0]=function(r){return r}),e=0,i=o.length;e<i;e++)n.hideFirstGroupCol&&!o[e].hidden&&n.groupField[0]===o[e].name&&(o[e].formatter=function(){return""}),o[e].summaryType&&(o[e].summaryDivider?n.summary.push({nm:o[e].name,st:o[e].summaryType,v:"",sd:o[e].summaryDivider,vd:"",sr:o[e].summaryRound,srt:o[e].summaryRoundType||"round"}):n.summary.push({nm:o[e].name,st:o[e].summaryType,v:"",sr:o[e].summaryRound,srt:o[e].summaryRoundType||"round"}))}else t.p.grouping=!1})},groupingPrepare:function(l,u){return this.each(function(){for(var r,e,i,t=this.p.groupingView,o=this,n=function(){N.jgrid.isFunction(this.st)?this.v=this.st.call(o,this.v,this.nm,l):(this.v=N(o).jqGrid("groupingCalculations.handler",this.st,this.v,this.nm,this.sr,this.srt,l),"avg"===this.st.toLowerCase()&&this.sd&&(this.vd=N(o).jqGrid("groupingCalculations.handler",this.st,this.vd,this.sd,this.sr,this.srt,l)))},s=t.groupField.length,a=0,d=0;d<s;d++)r=t.groupField[d],i=t.displayField[d],e=l[r],null==(i=null==i?null:l[i])&&(i=e),void 0!==e&&(0===u?(t.groups.push({idx:d,dataIndex:r,value:e,displayValue:i,startRow:u,cnt:1,summary:[]}),t.lastvalues[d]=e,t.counters[d]={cnt:1,pos:t.groups.length-1,summary:N.extend(!0,[],t.summary)}):"object"==typeof e||(Array.isArray(t.isInTheSameGroup)&&N.jgrid.isFunction(t.isInTheSameGroup[d])?t.isInTheSameGroup[d].call(o,t.lastvalues[d],e,d,t):t.lastvalues[d]===e)?1===a?(t.groups.push({idx:d,dataIndex:r,value:e,displayValue:i,startRow:u,cnt:1,summary:[]}),t.lastvalues[d]=e,t.counters[d]={cnt:1,pos:t.groups.length-1,summary:N.extend(!0,[],t.summary)}):(t.counters[d].cnt+=1,t.groups[t.counters[d].pos].cnt=t.counters[d].cnt):(t.groups.push({idx:d,dataIndex:r,value:e,displayValue:i,startRow:u,cnt:1,summary:[]}),t.lastvalues[d]=e,t.counters[d]={cnt:a=1,pos:t.groups.length-1,summary:N.extend(!0,[],t.summary)}),N.each(t.counters[d].summary,n),t.groups[t.counters[d].pos].summary=t.counters[d].summary)}),this},groupingToggle:function(y){return this.each(function(){function r(r){return 0<(r=N.map(r.split(" "),function(r){if(r.substring(0,d.length+1)===d+"_")return parseInt(r.substring(d.length+1),10)})).length?r[0]:void 0}var e,i,t,o=this,n=o.p.groupingView,s=y.split("_"),a=parseInt(s[s.length-2],10),d=(s.splice(s.length-2,2),s.join("_")),l=n.minusicon,u=n.plusicon,s=N("#"+N.jgrid.jqID(y)),p=s.length?s[0].nextSibling:null,s=N("#"+N.jgrid.jqID(y)+" span.tree-wrap-"+o.p.direction),g=!1,h=!1,c=!!o.p.frozenColumns&&o.p.id+"_frozen",m=!!c&&N("#"+N.jgrid.jqID(y),"#"+N.jgrid.jqID(c)),f=m&&m.length?m[0].nextSibling:null;if(s.hasClass(l)){if(p)for(;p&&!(void 0!==(e=r(p.className))&&e<=a);)t=parseInt(N(p).attr("jqfootlevel"),10),(h=!isNaN(t)&&n.showSummaryOnHide&&t<=a)||N(p).hide(),p=p.nextSibling,c&&(h||N(f).hide(),f=f.nextSibling);s.removeClass(l).addClass(u),g=!0}else{if(p)for(i=void 0;p;){if(e=r(p.className),t=parseInt(N(p).attr("jqfootlevel"),10),void 0===i&&(i=void 0===e),h=N(p).hasClass("ui-subgrid")&&N(p).hasClass("ui-sg-collapsed"),void 0!==e){if(e<=a)break;e!==a+1||h||(N(p).show().find(">td>span.tree-wrap-"+o.p.direction).removeClass(l).addClass(u),c&&N(f).show().find(">td>span.tree-wrap-"+o.p.direction).removeClass(l).addClass(u))}else i?h||(N(p).show(),c&&N(f).show()):!isNaN(t)&&0<=t&&t===a&&(N(p).show(),c)&&N(f).show();p=p.nextSibling,c&&(f=f.nextSibling)}s.removeClass(u).addClass(l)}c&&"auto"===o.p.height&&(o.grid.fbDiv.height(N(o).height()),o.grid.fsDiv)&&(m=N(o.grid.bDiv)[0].scrollWidth>N(o.grid.bDiv)[0].clientWidth?N.jgrid.scrollbarHeight():0,o.grid.fsDiv.css("top",o.grid.fbDiv.position().top+N(o).height()+m+"px")),N(o).triggerHandler("jqGridGroupingClickGroup",[y,g]),N.jgrid.isFunction(o.p.onClickGroup)&&o.p.onClickGroup.call(o,y,g)}),!1},groupingRender:function(H,F,I,D){return this.each(function(){var g,h,c,m,f=this,y=f.p.groupingView,v="",j=y.groupCollapse?y.plusicon:y.minusicon,w=[],x=y.groupField.length,q=N.jgrid.styleUI[f.p.styleUI||"jQueryUI"].common,j=j+" tree-wrap-"+f.p.direction,C=(N.each(f.p.colModel,function(r,e){for(var i=0;i<x;i++)if(y.groupField[i]===e.name){w[i]=r;break}}),0);function b(r,e,i,t,o){for(var n,s,a,d=function(r,e,i){var t,o=!1;if(0===e)o=i[r];else{var n=i[r].idx;if(0===n)o=i[r];else for(t=r;0<=t;t--)if(i[t].idx===n-e){o=i[t];break}}return o}(r,e,i),l=f.p.colModel,u=(d.cnt,""),p=!1,g=t;g<F;g++)!l[g].hidden&&!p&&o?(s=o,p=!0):s='<td role="gridcell" '+f.formatCol(g,1,"")+">&#160;</td>",N.each(d.summary,function(){if(this.nm===l[g].name){a=l[g].summaryTpl||"{0}",n=this.v;try{this.groupCount=d.cnt,this.groupIndex=d.dataIndex,this.groupValue=d.value}catch(r){}return s='<td role="gridcell" '+f.formatCol(g,1,"")+">"+N.jgrid.template(a,n,d.cnt,d.dataIndex,d.displayValue,d.summary)+"</td>",!1}}),u+=s;return u}var G,S=N.makeArray(y.groupSummary);S.reverse(),G=f.p.multiselect?' colspan="2"':"",N.each(y.groups,function(r,e){if(y._locgr&&!(e.startRow+e.cnt>(I-1)*D&&e.startRow<I*D))return!0;C++,c=f.p.id+"ghead_"+e.idx,h=c+"_"+r,g="<span style='cursor:pointer;margin-right:8px;margin-left:5px;' class='"+q.icon_base+" "+j+"' onclick=\"jQuery('#"+N.jgrid.jqID(f.p.id)+"').jqGrid('groupingToggle','"+h+"');return false;\"></span>";try{m=Array.isArray(y.formatDisplayField)&&N.jgrid.isFunction(y.formatDisplayField[e.idx])?y.formatDisplayField[e.idx].call(f,e.displayValue,e.value,f.p.colModel[w[e.idx]],e.idx,y):f.formatter(h,e.displayValue,w[e.idx],e.value)}catch(r){m=e.displayValue}for(var i="",t=0;t<e.summary.length;t++){var o=e.summary[t],n=N.jgrid.getElemByAttrVal(f.p.colModel,"name",o.nm,!0);if(0<=n){"string"==typeof o.st&&"avg"===o.st.toLowerCase()&&(o.sd&&o.vd?o.v=o.v/o.vd:o.v&&0<e.cnt&&(o.v=o.v/e.cnt)),o.uv=o.v;try{o.v=f.formatter("",o.v,n,this)}catch(r){}}}if("string"!=typeof(i=N.jgrid.isFunction(y.groupText[e.idx])?y.groupText[e.idx].call(f,m,e.cnt,e.summary):N.jgrid.template.call(f,y.groupText[e.idx],m,e.cnt,e.summary))&&"number"!=typeof i&&(i=m),"header"===y.groupSummaryPos[e.idx]?v=(v+='<tr id="'+h+'"'+(y.groupCollapse&&0<e.idx?' style="display:none;" ':" ")+'role="row" class= "'+q.content+" jqgroup ui-row-"+f.p.direction+" "+c+'">')+b(r,0,y.groups,G?1:0,'<td role="gridcell" style="padding-left:'+12*e.idx+'px;"'+G+">"+g+i+"</td>")+"</tr>":v+='<tr id="'+h+'"'+(y.groupCollapse&&0<e.idx?' style="display:none;" ':" ")+'role="row" class= "'+q.content+" jqgroup ui-row-"+f.p.direction+" "+c+'"><td style="padding-left:'+12*e.idx+'px;" colspan="'+(!1===y.groupColumnShow[e.idx]?F-1:F)+'">'+g+i+"</td></tr>",x-1===e.idx){var s,a,d,l=y.groups[r+1],u=0,i=e.startRow,p=void 0!==l?l.startRow:y.groups[r].startRow+y.groups[r].cnt;for(t=i=y._locgr&&(u=(I-1)*D)>e.startRow?u:i;t<p&&H[t-u];t++)v+=H[t-u].join("");if("header"!==y.groupSummaryPos[e.idx]){if(void 0!==l){for(a=0;a<y.groupField.length&&l.dataIndex!==y.groupField[a];a++);C=y.groupField.length-a}for(s=0;s<C;s++)S[s]&&(d="",y.groupCollapse&&!y.showSummaryOnHide&&(d=' style="display:none;"'),v=(v+="<tr"+d+' jqfootlevel="'+(e.idx-s)+'" role="row" class="'+q.content+" jqfoot ui-row-"+f.p.direction+'">')+b(r,s,y.groups,0,!1)+"</tr>");C=a}}}),N("#"+N.jgrid.jqID(f.p.id)+" tbody").first().append(v),v=null})},groupingGroupBy:function(t,o){return this.each(function(){var r,e=this,i=("string"==typeof t&&(t=[t]),e.p.groupingView);for(e.p.grouping=!0,i._locgr=!1,void 0===i.visibiltyOnNextGrouping&&(i.visibiltyOnNextGrouping=[]),r=0;r<i.groupField.length;r++)!i.groupColumnShow[r]&&i.visibiltyOnNextGrouping[r]&&N(e).jqGrid("showCol",i.groupField[r]);for(r=0;r<t.length;r++)i.visibiltyOnNextGrouping[r]=N("#"+N.jgrid.jqID(e.p.id)+"_"+N.jgrid.jqID(t[r])).is(":visible");e.p.groupingView=N.extend(e.p.groupingView,o||{}),i.groupField=t,N(e).trigger("reloadGrid")})},groupingRemove:function(t,o){return this.each(function(){var r=this;if(void 0===t&&(t=!0),void 0===o&&(o=!1),!(r.p.grouping=!1)===t){for(var e=r.p.groupingView,i=0;i<e.groupField.length;i++)!e.groupColumnShow[i]&&e.visibiltyOnNextGrouping[i]&&N(r).jqGrid("showCol",e.groupField);N("#"+N.jgrid.jqID(r.p.id)+" tbody").first().find("tr.jqgroup, tr.jqfoot").remove(),N("#"+N.jgrid.jqID(r.p.id)+" tbody").first().find("tr.jqgrow:hidden").show()}else N(r).trigger("reloadGrid");o&&N(r).jqGrid("groupingInit")})},groupingCalculations:{handler:function(r,e,i,t,o,n){var s,a={sum:function(){return N.jgrid.floatNum(e)+N.jgrid.floatNum(n[i])},min:function(){return""===e?N.jgrid.floatNum(n[i]):Math.min(N.jgrid.floatNum(e),N.jgrid.floatNum(n[i]))},max:function(){return""===e?N.jgrid.floatNum(n[i]):Math.max(N.jgrid.floatNum(e),N.jgrid.floatNum(n[i]))},count:function(){return""===e&&(e=0),n.hasOwnProperty(i)?e+1:0},avg:function(){return a.sum()}};if(a[r])return s=a[r](),null!=t?"fixed"===o?s.toFixed(t):(o=Math.pow(10,t),Math.round(s*o)/o):s;throw"jqGrid Grouping No such method: "+r}},groupingResetCalcs:function(){return this.each(function(){this.p.groupingView._locgr=!1})},setColSpanHeader:function(C){return this.each(function(){var r,e,i,t,o,n,s,a,d,l,u,p,g,h,c=this,m=0,f=c.p.colModel,y=f.length,v=c.grid.headers,j=N("table.ui-jqgrid-htable",c.grid.hDiv),w=j.children("thead"),x=j.find(".jqg-first-row-header"),j=!1,q=w.children("tr").length;for(Array.isArray(C)&&(c.p.colSpanHeader=C),void 0===x[0]?x=N("<tr>",{role:"row","aria-hidden":"true"}).addClass("jqg-first-row-header").css("height","auto"):x.empty(),c.p.frozenColumns&&(N(c).jqGrid("destroyFrozenColumns"),j=!0),r=0;r<y;r++)i=v[r].el,t=N(i),e=f[r],o={height:"0px",width:v[r].width+"px",display:e.hidden?"none":""},N("<th>",{role:"gridcell"}).css(o).addClass("ui-first-th-"+c.p.direction+" "+(e.labelClasses||"")).appendTo(x);for(w.prepend(x),N(c).on("jqGridResizeStop.setGroupHeaders",function(r,e,i){x.find("th").eq(i)[0].style.width=e+"px"}),r=0;r<y;r++)if(i=v[r].el,t=N(i),e=f[r],0<=(s=N.jgrid.inColumnHeader(e.name,c.p.colSpanHeader))){for(d=(a=c.p.colSpanHeader[s]).numberOfColumns,l=a.titleText||"",g=a.className||"",u=a.toolTip||"",s=p=0;s<d&&r+s<y;s++)f[r+s].hidden||p++;if(0<p&&(t.attr("colspan",String(p)),1<q))for(n=1;n<q;n++)N("tr",w).eq(n+1).find("th").eq(r).attr("colspan",String(p));for(l&&(h=t.find("div.ui-th-div")[0],a.savedLabel=h.innerHTML,h.innerHTML=l,"string"==typeof u&&""!==u?t.attr("title",u):c.p.headertitles&&t.attr("title",l)),t.addClass(g),m=0;m<d-1;m++)if(N(v[m+r+1].el).hide(),c.p.colModel[m+r+1].hidedlg=!0,c.p.colModel[m+r+1]._colspancell=!0,1<q)for(n=1;n<q;n++)N("tr",w).eq(n+1).find("th").eq(r+m+1).hide()}j&&N(c).jqGrid("setFrozenColumns")})},destroyColSpanHeader:function(a){return void 0===a&&(a=!0),this.each(function(){var i,t,r,o,n,e=this,s=N("table.ui-jqgrid-htable",e.grid.hDiv).children("thead");if(N("tr.jqg-first-row-header",s).remove(),e.p.colSpanHeader.length)for(r=0;r<e.p.colSpanHeader.length;r++)if(i=e.p.colSpanHeader[r],!((n=N.jgrid.getElemByAttrVal(e.p.colModel,"name",i.startColumnName,!0))<0)){for(t=n+1;t<n+i.numberOfColumns;t++)e.p.colModel[t].hidedlg=!1,e.p.colModel[t]._colspancell=!1;N(">tr",s).each(function(r,e){for((o=N("th",e).eq(n)).className||(o.className=""),N(o).attr("colspan","").removeClass(o.className),N(e).hasClass("ui-jqgrid-labels")&&(o.find("div.ui-th-div")[0].innerHTML=i.savedLabel),t=1;t<i.numberOfColumns;t++)N("th",e).eq(n+t).show()})}a&&(e.p.colSpanHeader=[])})},setGroupHeaders:function(b){return b=N.extend({useColSpanStyle:!1,groupHeaders:[]},b||{}),this.each(function(){var r,e,i,t,o,n,s,a,d,l,u,p,g=this,h=0,c=g.p.colModel,m=c.length,f=g.grid.headers,y=N("table.ui-jqgrid-htable",g.grid.hDiv),v=y.children("thead").children("tr.ui-jqgrid-labels").last().addClass("jqg-second-row-header"),j=y.children("thead"),w=y.find(".jqg-first-row-header"),x=!1,q=!1,C=N.jgrid.styleUI[g.p.styleUI||"jQueryUI"].base;for(g.p.groupHeader||(g.p.groupHeader=[]),g.p.groupHeader.push(b),g.p.groupHeaderOn=!0,void 0===w[0]?w=N("<tr>",{role:"row","aria-hidden":"true"}).addClass("jqg-first-row-header").css("height","auto"):w.empty(),g.p.frozenColumns&&(N(g).jqGrid("destroyFrozenColumns"),q=!0),(N(document.activeElement).is("input")||N(document.activeElement).is("textarea"))&&(x=document.activeElement),N(g).prepend(j),i=N("<tr>",{role:"row"}).addClass("ui-jqgrid-labels jqg-third-row-header"),r=0;r<m;r++)if(t=f[r].el,o=N(t),e=c[r],l={height:"0px",width:f[r].width+"px",display:e.hidden?"none":""},N("<th>",{role:"gridcell"}).css(l).addClass("ui-first-th-"+g.p.direction+" "+(e.labelClasses||"")).appendTo(w),t.style.width="",0<=(n=N.jgrid.inColumnHeader(e.name,b.groupHeaders))){for(s=(l=b.groupHeaders[n]).numberOfColumns,p=l.titleText,a=l.toolTip||"",l=l.className||"",n=d=0;n<s&&r+n<m;n++)c[r+n].hidden||d++;l=N("<th>").attr({role:"columnheader"}).addClass(C.headerBox+" ui-th-column-header ui-th-"+g.p.direction+" "+l+" "+(e.labelClasses||"")).html(p),0<d&&l.attr("colspan",String(d)),"string"==typeof a&&""!==a?l.attr("title",a):g.p.headertitles&&l.attr("title",l.text()),0===d&&l.hide(),o.before(l),i.append(t),h=s-1}else 0===h?b.useColSpanStyle?(p=o.attr("rowspan")?parseInt(o.attr("rowspan"),10)+1:2,o.attr("rowspan",p)):(N("<th>",{role:"columnheader"}).addClass(C.headerBox+" ui-th-column-header ui-th-"+g.p.direction).css({display:e.hidden?"none":""}).insertBefore(o),i.append(t)):(i.append(t),h--);if((j=N(g).children("thead")).prepend(w),i.insertAfter(v),y.append(j),b.useColSpanStyle&&(y.find("span.ui-jqgrid-resize").each(function(){var r=N(this).parent();r.is(":visible")&&(this.style.cssText="height: "+r.height()+"px !important; cursor: col-resize;")}),y.find("div.ui-jqgrid-sortable").each(function(){var r=N(this),e=r.parent();e.is(":visible")&&e.is(":has(span.ui-jqgrid-resize)")&&r.css("top",(e.height()-r.outerHeight())/2-4+"px")})),u=j.find("tr.jqg-first-row-header"),N(g).on("jqGridResizeStop.setGroupHeaders",function(r,e,i){u.find("th").eq(i)[0].style.width=e+"px"}),x)try{N(x).focus()}catch(r){}v=N("tr.jqg-second-row-header th").eq(0);"object"===N.jgrid.type(v)&&v.length&&""===N.jgrid.trim(v[0].outerText)&&N("tr.jqg-second-row-header th").eq(0).prepend("&nbsp;"),q&&N(g).jqGrid("setFrozenColumns"),N(g).triggerHandler("afterSetGroupHandler",[b])})},destroyGroupHeader:function(p){return void 0===p&&(p=!0),this.each(function(){var r,e,i,t,o,n,s=this,a=s.grid,d=N("table.ui-jqgrid-htable thead",a.hDiv),l=s.p.colModel,u=!1;if(a){for(s.p.frozenColumns&&(N(s).jqGrid("destroyFrozenColumns"),u=!0),N(this).off(".setGroupHeaders"),s.p.groupHeaderOn=!1,r=N("<tr>",{role:"row"}).addClass("ui-jqgrid-labels"),e=0,i=(t=a.headers).length;e<i;e++){n=l[e].hidden?"none":"",n=N(t[e].el).width(N("tr.jqg-first-row-header th",d).eq(e).width()).css("display",n);try{n.removeAttr("rowSpan")}catch(r){n.attr("rowSpan",1)}r.append(n),0<(o=n.children("span.ui-jqgrid-resize")).length&&(o[0].style.height=""),n.children("div")[0].style.top=""}N(d).children("tr.ui-jqgrid-labels").remove(),N(d).children("tr.jqg-first-row-header").remove(),N(d).prepend(r),!0===p&&N(s).jqGrid("setGridParam",{groupHeader:null}),u&&N(s).jqGrid("setFrozenColumns"),N(s).off("afterSetGroupHandler")}})},isGroupHeaderOn:function(){var r=this[0];return!0===r.p.groupHeaderOn&&r.p.groupHeader&&(Array.isArray(r.p.groupHeader)||N.jgrid.isFunction(r.p.groupHeader))},refreshGroupHeaders:function(){return this.each(function(){var r,e=this,i=N(e).jqGrid("isGroupHeaderOn");if(i&&(N(e).jqGrid("destroyGroupHeader",!1),r=N.extend([],e.p.groupHeader),e.p.groupHeader=null),i&&r)for(var t=0;t<r.length;t++)N(e).jqGrid("setGroupHeaders",r[t])})}})});