/* Chartist.js 0.5.0
 * Copyright © 2014 Gion Kunz
 * Free to use under the WTFPL license.
 * http://www.wtfpl.net/
 */
// jshint ignore: start
!function(a,b){"function"==typeof define&&define.amd?define([],function(){return a.returnExportsGlobal=b()}):"object"==typeof exports?module.exports=b():a.Chartist=b()}(this,function(){var a={version:"0.5.0"};return function(a,b,c){"use strict";c.noop=function(a){return a},c.alphaNumerate=function(a){return String.fromCharCode(97+a%26)},c.extend=function(a){a=a||{};var b=Array.prototype.slice.call(arguments,1);return b.forEach(function(b){for(var d in b)a[d]="object"!=typeof b[d]||b[d]instanceof Array?b[d]:c.extend(a[d],b[d])}),a},c.stripUnit=function(a){return"string"==typeof a&&(a=a.replace(/[^0-9\+-\.]/g,"")),+a},c.ensureUnit=function(a,b){return"number"==typeof a&&(a+=b),a},c.querySelector=function(a){return a instanceof Node?a:b.querySelector(a)},c.times=function(a){return Array.apply(null,new Array(a))},c.sum=function(a,b){return a+b},c.serialMap=function(a,b){var d=[],e=Math.max.apply(null,a.map(function(a){return a.length}));return c.times(e).forEach(function(c,e){var f=a.map(function(a){return a[e]});d[e]=b.apply(null,f)}),d},c.createSvg=function(a,b,d,e){var f;return b=b||"100%",d=d||"100%",f=a.querySelector("svg"),f&&a.removeChild(f),f=new c.Svg("svg").attr({width:b,height:d}).addClass(e).attr({style:"width: "+b+"; height: "+d+";"}),a.appendChild(f._node),f},c.getDataArray=function(a){for(var b=[],c=0;c<a.series.length;c++){b[c]="object"==typeof a.series[c]&&void 0!==a.series[c].data?a.series[c].data:a.series[c];for(var d=0;d<b[c].length;d++)b[c][d]=+b[c][d]}return b},c.normalizeDataArray=function(a,b){for(var c=0;c<a.length;c++)if(a[c].length!==b)for(var d=a[c].length;b>d;d++)a[c][d]=0;return a},c.orderOfMagnitude=function(a){return Math.floor(Math.log(Math.abs(a))/Math.LN10)},c.projectLength=function(a,b,d,e){var f=c.getAvailableHeight(a,e);return b/d.range*f},c.getAvailableHeight=function(a,b){return Math.max((c.stripUnit(b.height)||a.height())-2*b.chartPadding-b.axisX.offset,0)},c.getHighLow=function(a){var b,c,d={high:-Number.MAX_VALUE,low:Number.MAX_VALUE};for(b=0;b<a.length;b++)for(c=0;c<a[b].length;c++)a[b][c]>d.high&&(d.high=a[b][c]),a[b][c]<d.low&&(d.low=a[b][c]);return d},c.getBounds=function(a,b,d,e){var f,g,h,i={high:b.high,low:b.low};i.high=+d.high||(0===d.high?0:i.high),i.low=+d.low||(0===d.low?0:i.low),i.high===i.low&&(0===i.low?i.high=1:i.low<0?i.high=0:i.low=0),(e||0===e)&&(i.high=Math.max(e,i.high),i.low=Math.min(e,i.low)),i.valueRange=i.high-i.low,i.oom=c.orderOfMagnitude(i.valueRange),i.min=Math.floor(i.low/Math.pow(10,i.oom))*Math.pow(10,i.oom),i.max=Math.ceil(i.high/Math.pow(10,i.oom))*Math.pow(10,i.oom),i.range=i.max-i.min,i.step=Math.pow(10,i.oom),i.numberOfSteps=Math.round(i.range/i.step);for(var j=c.projectLength(a,i.step,i,d),k=j<d.axisY.scaleMinSpace;;)if(k&&c.projectLength(a,i.step,i,d)<=d.axisY.scaleMinSpace)i.step*=2;else{if(k||!(c.projectLength(a,i.step/2,i,d)>=d.axisY.scaleMinSpace))break;i.step/=2}for(g=i.min,h=i.max,f=i.min;f<=i.max;f+=i.step)f+i.step<i.low&&(g+=i.step),f-i.step>=i.high&&(h-=i.step);for(i.min=g,i.max=h,i.range=i.max-i.min,i.values=[],f=i.min;f<=i.max;f+=i.step)i.values.push(f);return i},c.polarToCartesian=function(a,b,c,d){var e=(d-90)*Math.PI/180;return{x:a+c*Math.cos(e),y:b+c*Math.sin(e)}},c.createChartRect=function(a,b){var d=b.axisY?b.axisY.offset:0,e=b.axisX?b.axisX.offset:0;return{x1:b.chartPadding+d,y1:Math.max((c.stripUnit(b.height)||a.height())-b.chartPadding-e,b.chartPadding),x2:Math.max((c.stripUnit(b.width)||a.width())-b.chartPadding,b.chartPadding+d),y2:b.chartPadding,width:function(){return this.x2-this.x1},height:function(){return this.y1-this.y2}}},c.createLabel=function(a,b,c,d,e){if(e){var f='<span class="'+d+'">'+b+"</span>";return a.foreignObject(f,c)}return a.elem("text",c,d).text(b)},c.createXAxis=function(b,d,e,f,g,h,i){d.labels.forEach(function(j,k){var l=g.axisX.labelInterpolationFnc(j,k),m=b.width()/(d.labels.length-(g.fullWidth?1:0)),n=g.axisX.offset,o=b.x1+m*k;if(l||0===l){if(g.axisX.showGrid){var p=e.elem("line",{x1:o,y1:b.y1,x2:o,y2:b.y2},[g.classNames.grid,g.classNames.horizontal].join(" "));h.emit("draw",{type:"grid",axis:"x",index:k,group:e,element:p,x1:o,y1:b.y1,x2:o,y2:b.y2})}if(g.axisX.showLabel){var q={x:o+g.axisX.labelOffset.x,y:b.y1+g.axisX.labelOffset.y+(i?5:20)},r=c.createLabel(f,""+l,{x:q.x,y:q.y,width:m,height:n,style:"overflow: visible;"},[g.classNames.label,g.classNames.horizontal].join(" "),i);h.emit("draw",{type:"label",axis:"x",index:k,group:f,element:r,text:""+l,x:q.x,y:q.y,width:m,height:n,get space(){return a.console.warn("EventEmitter: space is deprecated, use width or height instead."),this.width}})}}})},c.createYAxis=function(b,d,e,f,g,h,i){d.values.forEach(function(j,k){var l=g.axisY.labelInterpolationFnc(j,k),m=g.axisY.offset,n=b.height()/d.values.length,o=b.y1-n*k;if(l||0===l){if(g.axisY.showGrid){var p=e.elem("line",{x1:b.x1,y1:o,x2:b.x2,y2:o},[g.classNames.grid,g.classNames.vertical].join(" "));h.emit("draw",{type:"grid",axis:"y",index:k,group:e,element:p,x1:b.x1,y1:o,x2:b.x2,y2:o})}if(g.axisY.showLabel){var q={x:g.chartPadding+g.axisY.labelOffset.x+(i?-10:0),y:o+g.axisY.labelOffset.y+(i?-15:0)},r=c.createLabel(f,""+l,{x:q.x,y:q.y,width:m,height:n,style:"overflow: visible;"},[g.classNames.label,g.classNames.vertical].join(" "),i);h.emit("draw",{type:"label",axis:"y",index:k,group:f,element:r,text:""+l,x:q.x,y:q.y,width:m,height:n,get space(){return a.console.warn("EventEmitter: space is deprecated, use width or height instead."),this.height}})}}})},c.projectPoint=function(a,b,c,d,e){return{x:a.x1+a.width()/(c.length-(c.length>1&&e.fullWidth?1:0))*d,y:a.y1-a.height()*(c[d]-b.min)/(b.range+b.step)}},c.optionsProvider=function(b,d,e){function f(){var b=h;if(h=c.extend({},j),d)for(i=0;i<d.length;i++){var f=a.matchMedia(d[i][0]);f.matches&&(h=c.extend(h,d[i][1]))}e&&e.emit("optionsChanged",{previousOptions:b,currentOptions:h})}function g(){k.forEach(function(a){a.removeListener(f)})}var h,i,j=c.extend({},b),k=[];if(!a.matchMedia)throw"window.matchMedia not found! Make sure you're using a polyfill.";if(d)for(i=0;i<d.length;i++){var l=a.matchMedia(d[i][0]);l.addListener(f),k.push(l)}return f(),{get currentOptions(){return c.extend({},h)},removeMediaQueryListeners:g}},c.catmullRom2bezier=function(a,b){for(var c=[],d=0,e=a.length;e-2*!b>d;d+=2){var f=[{x:+a[d-2],y:+a[d-1]},{x:+a[d],y:+a[d+1]},{x:+a[d+2],y:+a[d+3]},{x:+a[d+4],y:+a[d+5]}];b?d?e-4===d?f[3]={x:+a[0],y:+a[1]}:e-2===d&&(f[2]={x:+a[0],y:+a[1]},f[3]={x:+a[2],y:+a[3]}):f[0]={x:+a[e-2],y:+a[e-1]}:e-4===d?f[3]=f[2]:d||(f[0]={x:+a[d],y:+a[d+1]}),c.push([(-f[0].x+6*f[1].x+f[2].x)/6,(-f[0].y+6*f[1].y+f[2].y)/6,(f[1].x+6*f[2].x-f[3].x)/6,(f[1].y+6*f[2].y-f[3].y)/6,f[2].x,f[2].y])}return c}}(window,document,a),function(a,b,c){"use strict";c.EventEmitter=function(){function a(a,b){d[a]=d[a]||[],d[a].push(b)}function b(a,b){d[a]&&(b?(d[a].splice(d[a].indexOf(b),1),0===d[a].length&&delete d[a]):delete d[a])}function c(a,b){d[a]&&d[a].forEach(function(a){a(b)}),d["*"]&&d["*"].forEach(function(c){c(a,b)})}var d=[];return{addEventHandler:a,removeEventHandler:b,emit:c}}}(window,document,a),function(a,b,c){"use strict";function d(a){var b=[];if(a.length)for(var c=0;c<a.length;c++)b.push(a[c]);return b}function e(a,b){var d=b||this.prototype||c.Class,e=Object.create(d);c.Class.cloneDefinitions(e,a);var f=function(){var a,b=e.constructor||function(){};return a=this===c?Object.create(e):this,b.apply(a,Array.prototype.slice.call(arguments,0)),a};return f.prototype=e,f.super=d,f.extend=this.extend,f}function f(a,b){if(this!==c.Class)throw new Error("Chartist.Class.mix should only be called on the type and never on an instance!");var d=[{}].concat(a).map(function(a){return a instanceof Function?a.prototype:a}),e=c.Class.cloneDefinitions.apply(void 0,d);return delete e.constructor,this.extend(b,e)}function g(){var a=d(arguments),b=a[0];return a.splice(1,a.length-1).forEach(function(a){Object.getOwnPropertyNames(a).forEach(function(c){delete b[c],Object.defineProperty(b,c,Object.getOwnPropertyDescriptor(a,c))})}),b}c.Class={extend:e,mix:f,cloneDefinitions:g}}(window,document,a),function(a,b,c){"use strict";function d(a){return this.data=a||this.data,this.createChart(this.optionsProvider.currentOptions),this}function e(){return a.removeEventListener("resize",this.resizeListener),this.optionsProvider.removeMediaQueryListeners(),this}function f(a,b){return this.eventEmitter.addEventHandler(a,b),this}function g(a,b){return this.eventEmitter.removeEventHandler(a,b),this}function h(){a.addEventListener("resize",this.resizeListener),this.optionsProvider=c.optionsProvider(this.options,this.responsiveOptions,this.eventEmitter),this.options.plugins&&this.options.plugins.forEach(function(a){a instanceof Array?a[0](this,a[1]):a(this)}.bind(this)),this.createChart(this.optionsProvider.currentOptions),this.initializeTimeoutId=void 0}function i(b,d,e,f){this.container=c.querySelector(b),this.data=d,this.options=e,this.responsiveOptions=f,this.eventEmitter=c.EventEmitter(),this.supportsForeignObject=c.Svg.isSupported("Extensibility"),this.supportsAnimations=c.Svg.isSupported("AnimationEventsAttribute"),this.resizeListener=function(){this.update()}.bind(this),this.container&&(this.container.__chartist__&&(this.container.__chartist__.initializeTimeoutId?a.clearTimeout(this.container.__chartist__.initializeTimeoutId):this.container.__chartist__.detach()),this.container.__chartist__=this),this.initializeTimeoutId=setTimeout(h.bind(this),0)}c.Base=c.Class.extend({constructor:i,optionsProvider:void 0,container:void 0,svg:void 0,eventEmitter:void 0,createChart:function(){throw new Error("Base chart type can't be instantiated!")},update:d,detach:e,on:f,off:g,version:c.version,supportsForeignObject:!1})}(window,document,a),function(a,b,c){"use strict";function d(a,d,e,f,g){a instanceof SVGElement?this._node=a:(this._node=b.createElementNS(y,a),"svg"===a&&this._node.setAttributeNS(z,c.xmlNs.qualifiedName,c.xmlNs.uri),d&&this.attr(d),e&&this.addClass(e),f&&(g&&f._node.firstChild?f._node.insertBefore(this._node,f._node.firstChild):f._node.appendChild(this._node)))}function e(a,b){return"string"==typeof a?b?this._node.getAttributeNS(b,a):this._node.getAttribute(a):(Object.keys(a).forEach(function(d){void 0!==a[d]&&(b?this._node.setAttributeNS(b,[c.xmlNs.prefix,":",d].join(""),a[d]):this._node.setAttribute(d,a[d]))}.bind(this)),this)}function f(a,b,d,e){return new c.Svg(a,b,d,this,e)}function g(){return this._node.parentNode instanceof SVGElement?new c.Svg(this._node.parentNode):null}function h(){for(var a=this._node;"svg"!==a.nodeName;)a=a.parentNode;return new c.Svg(a)}function i(a){var b=this._node.querySelector(a);return b?new c.Svg(b):null}function j(a){var b=this._node.querySelectorAll(a);return b.length?new c.Svg.List(b):null}function k(a,c,d,e){if("string"==typeof a){var f=b.createElement("div");f.innerHTML=a,a=f.firstChild}a.setAttribute("xmlns",A);var g=this.elem("foreignObject",c,d,e);return g._node.appendChild(a),g}function l(a){return this._node.appendChild(b.createTextNode(a)),this}function m(){for(;this._node.firstChild;)this._node.removeChild(this._node.firstChild);return this}function n(){return this._node.parentNode.removeChild(this._node),this.parent()}function o(a){return this._node.parentNode.replaceChild(a._node,this._node),a}function p(a,b){return b&&this._node.firstChild?this._node.insertBefore(a._node,this._node.firstChild):this._node.appendChild(a._node),this}function q(){return this._node.getAttribute("class")?this._node.getAttribute("class").trim().split(/\s+/):[]}function r(a){return this._node.setAttribute("class",this.classes(this._node).concat(a.trim().split(/\s+/)).filter(function(a,b,c){return c.indexOf(a)===b}).join(" ")),this}function s(a){var b=a.trim().split(/\s+/);return this._node.setAttribute("class",this.classes(this._node).filter(function(a){return-1===b.indexOf(a)}).join(" ")),this}function t(){return this._node.setAttribute("class",""),this}function u(){return this._node.clientHeight||Math.round(this._node.getBBox().height)||this._node.parentNode.clientHeight}function v(){return this._node.clientWidth||Math.round(this._node.getBBox().width)||this._node.parentNode.clientWidth}function w(a,b,d){return void 0===b&&(b=!0),Object.keys(a).forEach(function(e){function f(a,b){var f,g,h,i={};a.easing&&(h=a.easing instanceof Array?a.easing:c.Svg.Easing[a.easing],delete a.easing),a.begin=c.ensureUnit(a.begin,"ms"),a.dur=c.ensureUnit(a.dur,"ms"),h&&(a.calcMode="spline",a.keySplines=h.join(" "),a.keyTimes="0;1"),b&&(a.fill="freeze",i[e]=a.from,this.attr(i),g=c.stripUnit(a.begin||0),a.begin="indefinite"),f=this.elem("animate",c.extend({attributeName:e},a)),b&&setTimeout(function(){try{f._node.beginElement()}catch(b){i[e]=a.to,this.attr(i),f.remove()}}.bind(this),g),d&&f._node.addEventListener("beginEvent",function(){d.emit("animationBegin",{element:this,animate:f._node,params:a})}.bind(this)),f._node.addEventListener("endEvent",function(){d&&d.emit("animationEnd",{element:this,animate:f._node,params:a}),b&&(i[e]=a.to,this.attr(i),f.remove())}.bind(this))}a[e]instanceof Array?a[e].forEach(function(a){f.bind(this)(a,!1)}.bind(this)):f.bind(this)(a[e],b)}.bind(this)),this}function x(a){var b=this;this.svgElements=[];for(var d=0;d<a.length;d++)this.svgElements.push(new c.Svg(a[d]));Object.keys(c.Svg.prototype).filter(function(a){return-1===["constructor","parent","querySelector","querySelectorAll","replace","append","classes","height","width"].indexOf(a)}).forEach(function(a){b[a]=function(){var d=Array.prototype.slice.call(arguments,0);return b.svgElements.forEach(function(b){c.Svg.prototype[a].apply(b,d)}),b}})}var y="http://www.w3.org/2000/svg",z="http://www.w3.org/2000/xmlns/",A="http://www.w3.org/1999/xhtml";c.xmlNs={qualifiedName:"xmlns:ct",prefix:"ct",uri:"http://gionkunz.github.com/chartist-js/ct"},c.Svg=c.Class.extend({constructor:d,attr:e,elem:f,parent:g,root:h,querySelector:i,querySelectorAll:j,foreignObject:k,text:l,empty:m,remove:n,replace:o,append:p,classes:q,addClass:r,removeClass:s,removeAllClasses:t,height:u,width:v,animate:w}),c.Svg.isSupported=function(a){return b.implementation.hasFeature("www.http://w3.org/TR/SVG11/feature#"+a,"1.1")};var B={easeInSine:[.47,0,.745,.715],easeOutSine:[.39,.575,.565,1],easeInOutSine:[.445,.05,.55,.95],easeInQuad:[.55,.085,.68,.53],easeOutQuad:[.25,.46,.45,.94],easeInOutQuad:[.455,.03,.515,.955],easeInCubic:[.55,.055,.675,.19],easeOutCubic:[.215,.61,.355,1],easeInOutCubic:[.645,.045,.355,1],easeInQuart:[.895,.03,.685,.22],easeOutQuart:[.165,.84,.44,1],easeInOutQuart:[.77,0,.175,1],easeInQuint:[.755,.05,.855,.06],easeOutQuint:[.23,1,.32,1],easeInOutQuint:[.86,0,.07,1],easeInExpo:[.95,.05,.795,.035],easeOutExpo:[.19,1,.22,1],easeInOutExpo:[1,0,0,1],easeInCirc:[.6,.04,.98,.335],easeOutCirc:[.075,.82,.165,1],easeInOutCirc:[.785,.135,.15,.86],easeInBack:[.6,-.28,.735,.045],easeOutBack:[.175,.885,.32,1.275],easeInOutBack:[.68,-.55,.265,1.55]};c.Svg.Easing=B,c.Svg.List=c.Class.extend({constructor:x})}(window,document,a),function(a,b,c){"use strict";function d(a){var b,d=[],e=c.normalizeDataArray(c.getDataArray(this.data),this.data.labels.length);this.svg=c.createSvg(this.container,a.width,a.height,a.classNames.chart),b=c.getBounds(this.svg,c.getHighLow(e),a);var f=c.createChartRect(this.svg,a),g=this.svg.elem("g").addClass(a.classNames.labelGroup),h=this.svg.elem("g").addClass(a.classNames.gridGroup);c.createXAxis(f,this.data,h,g,a,this.eventEmitter,this.supportsForeignObject),c.createYAxis(f,b,h,g,a,this.eventEmitter,this.supportsForeignObject);for(var i=0;i<this.data.series.length;i++){d[i]=this.svg.elem("g"),this.data.series[i].name&&d[i].attr({"series-name":this.data.series[i].name},c.xmlNs.uri),d[i].addClass([a.classNames.series,this.data.series[i].className||a.classNames.series+"-"+c.alphaNumerate(i)].join(" "));for(var j,k,l=[],m=0;m<e[i].length;m++)j=c.projectPoint(f,b,e[i],m,a),l.push(j.x,j.y),a.showPoint&&(k=d[i].elem("line",{x1:j.x,y1:j.y,x2:j.x+.01,y2:j.y},a.classNames.point).attr({value:e[i][m]},c.xmlNs.uri),this.eventEmitter.emit("draw",{type:"point",value:e[i][m],index:m,group:d[i],element:k,x:j.x,y:j.y}));if(a.showLine||a.showArea){var n=["M"+l[0]+","+l[1]];if(a.lineSmooth&&l.length>4)for(var o=c.catmullRom2bezier(l),p=0;p<o.length;p++)n.push("C"+o[p].join());else for(var q=3;q<l.length;q+=2)n.push("L"+l[q-1]+","+l[q]);if(a.showArea){var r=Math.max(Math.min(a.areaBase,b.max),b.min),s=n.slice(),t=c.projectPoint(f,b,[r],0,a);s.splice(0,0,"M"+t.x+","+t.y),s[1]="L"+l[0]+","+l[1],s.push("L"+l[l.length-2]+","+t.y);var u=d[i].elem("path",{d:s.join("")},a.classNames.area,!0).attr({values:e[i]},c.xmlNs.uri);this.eventEmitter.emit("draw",{type:"area",values:e[i],index:i,group:d[i],element:u})}if(a.showLine){var v=d[i].elem("path",{d:n.join("")},a.classNames.line,!0).attr({values:e[i]},c.xmlNs.uri);this.eventEmitter.emit("draw",{type:"line",values:e[i],index:i,group:d[i],element:v})}}}this.eventEmitter.emit("created",{bounds:b,chartRect:f,svg:this.svg,options:a})}function e(a,b,d,e){c.Line.super.constructor.call(this,a,b,c.extend({},f,d),e)}var f={axisX:{offset:30,labelOffset:{x:0,y:0},showLabel:!0,showGrid:!0,labelInterpolationFnc:c.noop},axisY:{offset:40,labelOffset:{x:0,y:0},showLabel:!0,showGrid:!0,labelInterpolationFnc:c.noop,scaleMinSpace:20},width:void 0,height:void 0,showLine:!0,showPoint:!0,showArea:!1,areaBase:0,lineSmooth:!0,low:void 0,high:void 0,chartPadding:5,fullWidth:!1,classNames:{chart:"ct-chart-line",label:"ct-label",labelGroup:"ct-labels",series:"ct-series",line:"ct-line",point:"ct-point",area:"ct-area",grid:"ct-grid",gridGroup:"ct-grids",vertical:"ct-vertical",horizontal:"ct-horizontal"}};c.Line=c.Base.extend({constructor:e,createChart:d})}(window,document,a),function(a,b,c){"use strict";function d(a){var b,d,e=[],f=c.normalizeDataArray(c.getDataArray(this.data),this.data.labels.length);if(this.svg=c.createSvg(this.container,a.width,a.height,a.classNames.chart),a.stackBars){var g=c.serialMap(f,function(){return Array.prototype.slice.call(arguments).reduce(c.sum,0)});d=c.getHighLow([g])}else d=c.getHighLow(f);b=c.getBounds(this.svg,d,a,0);var h=c.createChartRect(this.svg,a),i=this.svg.elem("g").addClass(a.classNames.labelGroup),j=this.svg.elem("g").addClass(a.classNames.gridGroup),k=c.projectPoint(h,b,[0],0,a),l=[];c.createXAxis(h,this.data,j,i,a,this.eventEmitter,this.supportsForeignObject),c.createYAxis(h,b,j,i,a,this.eventEmitter,this.supportsForeignObject);for(var m=0;m<this.data.series.length;m++){var n=m-(this.data.series.length-1)/2,o=h.width()/(f[m].length-(a.fullWidth?1:0))/2;e[m]=this.svg.elem("g"),this.data.series[m].name&&e[m].attr({"series-name":this.data.series[m].name},c.xmlNs.uri),e[m].addClass([a.classNames.series,this.data.series[m].className||a.classNames.series+"-"+c.alphaNumerate(m)].join(" "));for(var p=0;p<f[m].length;p++){var q,r,s,t,u=c.projectPoint(h,b,f[m],p,a);u.x+=a.centerBars?o:0,u.x+=a.stackBars?0:n*a.seriesBarDistance,r=l[p]||k.y,l[p]=r-(k.y-u.y),s=a.stackBars?r:k.y,t=a.stackBars?l[p]:u.y,q=e[m].elem("line",{x1:u.x,y1:s,x2:u.x,y2:t},a.classNames.bar).attr({value:f[m][p]},c.xmlNs.uri),this.eventEmitter.emit("draw",{type:"bar",value:f[m][p],index:p,group:e[m],element:q,x1:u.x,y1:s,x2:u.x,y2:t})}}this.eventEmitter.emit("created",{bounds:b,chartRect:h,svg:this.svg,options:a})}function e(a,b,d,e){c.Bar.super.constructor.call(this,a,b,c.extend({},f,d),e)}var f={axisX:{offset:30,labelOffset:{x:0,y:0},showLabel:!0,showGrid:!0,labelInterpolationFnc:c.noop},axisY:{offset:40,labelOffset:{x:0,y:0},showLabel:!0,showGrid:!0,labelInterpolationFnc:c.noop,scaleMinSpace:20},width:void 0,height:void 0,high:void 0,low:void 0,chartPadding:5,seriesBarDistance:15,fullWidth:!1,centerBars:!0,stackBars:!1,classNames:{chart:"ct-chart-bar",label:"ct-label",labelGroup:"ct-labels",series:"ct-series",bar:"ct-bar",grid:"ct-grid",gridGroup:"ct-grids",vertical:"ct-vertical",horizontal:"ct-horizontal"}};c.Bar=c.Base.extend({constructor:e,createChart:d})}(window,document,a),function(a,b,c){"use strict";function d(a,b,c){var d=b.x>a.x;return d&&"explode"===c||!d&&"implode"===c?"start":d&&"implode"===c||!d&&"explode"===c?"end":"middle"}function e(a){var b,e,f,g,h=[],i=a.startAngle,j=c.getDataArray(this.data);this.svg=c.createSvg(this.container,a.width,a.height,a.classNames.chart),b=c.createChartRect(this.svg,a,0,0),e=Math.min(b.width()/2,b.height()/2),g=a.total||j.reduce(function(a,b){return a+b},0),e-=a.donut?a.donutWidth/2:0,f=a.donut?e:e/2,f+=a.labelOffset;for(var k={x:b.x1+b.width()/2,y:b.y2+b.height()/2},l=1===this.data.series.filter(function(a){return 0!==a}).length,m=0;m<this.data.series.length;m++){h[m]=this.svg.elem("g",null,null,!0),this.data.series[m].name&&h[m].attr({"series-name":this.data.series[m].name},c.xmlNs.uri),h[m].addClass([a.classNames.series,this.data.series[m].className||a.classNames.series+"-"+c.alphaNumerate(m)].join(" "));var n=i+j[m]/g*360;n-i===360&&(n-=.01);var o=c.polarToCartesian(k.x,k.y,e,i-(0===m||l?0:.2)),p=c.polarToCartesian(k.x,k.y,e,n),q=180>=n-i?"0":"1",r=["M",p.x,p.y,"A",e,e,0,q,0,o.x,o.y];a.donut===!1&&r.push("L",k.x,k.y);var s=h[m].elem("path",{d:r.join(" ")},a.classNames.slice+(a.donut?" "+a.classNames.donut:""));if(s.attr({value:j[m]},c.xmlNs.uri),a.donut===!0&&s.attr({style:"stroke-width: "+ +a.donutWidth+"px"}),this.eventEmitter.emit("draw",{type:"slice",value:j[m],totalDataSum:g,index:m,group:h[m],element:s,center:k,radius:e,startAngle:i,endAngle:n}),a.showLabel){var t=c.polarToCartesian(k.x,k.y,f,i+(n-i)/2),u=a.labelInterpolationFnc(this.data.labels?this.data.labels[m]:j[m],m),v=h[m].elem("text",{dx:t.x,dy:t.y,"text-anchor":d(k,t,a.labelDirection)},a.classNames.label).text(""+u);this.eventEmitter.emit("draw",{type:"label",index:m,group:h[m],element:v,text:""+u,x:t.x,y:t.y})}i=n}this.eventEmitter.emit("created",{chartRect:b,svg:this.svg,options:a})}function f(a,b,d,e){c.Pie.super.constructor.call(this,a,b,c.extend({},g,d),e)}var g={width:void 0,height:void 0,chartPadding:5,classNames:{chart:"ct-chart-pie",series:"ct-series",slice:"ct-slice",donut:"ct-donut",label:"ct-label"},startAngle:0,total:void 0,donut:!1,donutWidth:60,showLabel:!0,labelOffset:0,labelInterpolationFnc:c.noop,labelDirection:"neutral"};c.Pie=c.Base.extend({constructor:f,createChart:e,determineAnchorPosition:d})}(window,document,a),a});
//# sourceMappingURL=chartist.min.js.map