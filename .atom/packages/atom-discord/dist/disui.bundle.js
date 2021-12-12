!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.DisUI=e():t.DisUI=e()}(window,function(){return function(t){var e={};function n(o){if(e[o])return e[o].exports;var i=e[o]={i:o,l:!1,exports:{}};return t[o].call(i.exports,i,i.exports,n),i.l=!0,i.exports}return n.m=t,n.c=e,n.d=function(t,e,o){n.o(t,e)||Object.defineProperty(t,e,{configurable:!1,enumerable:!0,get:o})},n.r=function(t){Object.defineProperty(t,"__esModule",{value:!0})},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="dist",n(n.s=3)}([function(t,e,n){"use strict";function o(t,e,n,o,i,r,s,a){var l=typeof(t=t||{}).default;"object"!==l&&"function"!==l||(t=t.default);var c,p="function"==typeof t?t.options:t;if(e&&(p.render=e,p.staticRenderFns=n,p._compiled=!0),o&&(p.functional=!0),r&&(p._scopeId=r),s?(c=function(t){(t=t||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext)||"undefined"==typeof __VUE_SSR_CONTEXT__||(t=__VUE_SSR_CONTEXT__),i&&i.call(this,t),t&&t._registeredComponents&&t._registeredComponents.add(s)},p._ssrRegister=c):i&&(c=a?function(){i.call(this,this.$root.$options.shadowRoot)}:i),c)if(p.functional){p._injectStyles=c;var u=p.render;p.render=function(t,e){return c.call(e),u(t,e)}}else{var d=p.beforeCreate;p.beforeCreate=d?[].concat(d,c):[c]}return{exports:t,options:p}}n.d(e,"a",function(){return o})},function(t,e,n){"use strict";n.r(e);var o={model:{prop:"content",event:"change"},props:{spellcheck:Boolean,autocomplete:Boolean,required:Boolean,novalidate:Boolean,content:String,inputName:String,type:{type:String,default:"text"},maxlen:{type:Number,default:100},color:{type:String,default:"#f1f2f3"},placeholder:{type:String,default:"Type here..."}},computed:{_content:{get(){return this.content},set(t){this.$emit("change",t)}},length(){return this.content.length},transformObject(){return{transform:`scaleX(${this.length/this.maxlen})`}}}},i=n(0);var r=function(t){n(10)},s=Object(i.a)(o,function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"DisInput"},[n("label",["checkbox"===t.type?n("input",{directives:[{name:"model",rawName:"v-model",value:t._content,expression:"_content"}],ref:"input",staticClass:"native-key-bindings",style:{color:t.color},attrs:{name:t.inputName,maxlength:t.maxlen,placeholder:t.placeholder,autocomplete:t.autocomplete,novalidate:t.novalidate,spellcheck:t.spellcheck,required:t.required,type:"checkbox"},domProps:{checked:Array.isArray(t._content)?t._i(t._content,null)>-1:t._content},on:{change:function(e){var n=t._content,o=e.target,i=!!o.checked;if(Array.isArray(n)){var r=t._i(n,null);o.checked?r<0&&(t._content=n.concat([null])):r>-1&&(t._content=n.slice(0,r).concat(n.slice(r+1)))}else t._content=i}}}):"radio"===t.type?n("input",{directives:[{name:"model",rawName:"v-model",value:t._content,expression:"_content"}],ref:"input",staticClass:"native-key-bindings",style:{color:t.color},attrs:{name:t.inputName,maxlength:t.maxlen,placeholder:t.placeholder,autocomplete:t.autocomplete,novalidate:t.novalidate,spellcheck:t.spellcheck,required:t.required,type:"radio"},domProps:{checked:t._q(t._content,null)},on:{change:function(e){t._content=null}}}):n("input",{directives:[{name:"model",rawName:"v-model",value:t._content,expression:"_content"}],ref:"input",staticClass:"native-key-bindings",style:{color:t.color},attrs:{name:t.inputName,maxlength:t.maxlen,placeholder:t.placeholder,autocomplete:t.autocomplete,novalidate:t.novalidate,spellcheck:t.spellcheck,required:t.required,type:t.type},domProps:{value:t._content},on:{input:function(e){e.target.composing||(t._content=e.target.value)}}}),t._v(" "),n("div",{staticClass:"DisIndicator"},[n("div",{staticClass:"DisIndicator__focus"}),t._v(" "),n("div",{staticClass:"DisIndicator__length",style:t.transformObject})])])])},[],!1,r,"data-v-f411ea50",null);e.default=s.exports},function(t,e,n){"use strict";n.r(e);var o=n(1),i={bind:function(t,e){var n={event:"mousedown",transition:600};!function(t,e){t.forEach(function(t){isNaN(Number(t))?e.event=t:e.transition=t})}(Object.keys(e.modifiers),n),t.addEventListener(n.event,function(i){!function(t,e){var i=e,s=parseInt(getComputedStyle(i).borderWidth.replace("px","")),a=i.getBoundingClientRect(),l=a.left,c=a.top,p=i.offsetWidth,u=i.offsetHeight,d=t.clientX-l,f=t.clientY-c,m=Math.max(d,p-d),v=Math.max(f,u-f),y=window.getComputedStyle(i),h=Math.sqrt(m*m+v*v),_=s>0?s:0,g=document.createElement("div"),x=document.createElement("div");x.className="ripple-container",g.className="ripple",g.style.marginTop="0px",g.style.marginLeft="0px",g.style.width="1px",g.style.height="1px",g.style.transition="all "+n.transition+"ms cubic-bezier(0.4, 0, 0.2, 1)",g.style.borderRadius="50%",g.style.pointerEvents="none",g.style.position="relative",g.style.zIndex=r,g.style.backgroundColor=o,x.style.position="absolute",x.style.left=0-_+"px",x.style.top=0-_+"px",x.style.height="0",x.style.width="0",x.style.pointerEvents="none",x.style.overflow="hidden";var b=i.style.position.length>0?i.style.position:getComputedStyle(i).position;"relative"!==b&&(i.style.position="relative");function C(){setTimeout(function(){g.style.backgroundColor="rgba(0, 0, 0, 0)"},250),setTimeout(function(){x.parentNode.removeChild(x)},850),e.removeEventListener("mouseup",C,!1),setTimeout(function(){for(var t=!0,e=0;e<i.childNodes.length;e++)"ripple-container"===i.childNodes[e].className&&(t=!1);t&&(i.style.position="static"!==b?b:"")},n.transition+250)}x.appendChild(g),i.appendChild(x),g.style.marginLeft=d+"px",g.style.marginTop=f+"px",x.style.width=p+"px",x.style.height=u+"px",x.style.borderTopLeftRadius=y.borderTopLeftRadius,x.style.borderTopRightRadius=y.borderTopRightRadius,x.style.borderBottomLeftRadius=y.borderBottomLeftRadius,x.style.borderBottomRightRadius=y.borderBottomRightRadius,x.style.direction="ltr",setTimeout(function(){g.style.width=2*h+"px",g.style.height=2*h+"px",g.style.marginLeft=d-h+"px",g.style.marginTop=f-h+"px"},0),"mousedown"===t.type?e.addEventListener("mouseup",C,!1):C()}(i,t,e.value)});var o=e.value||i.color||"rgba(0, 0, 0, 0.35)",r=i.zIndex||"9999"}};var r=i;r.color="rgba(255, 255, 255, .1)";var s={data:()=>({input:""}),components:{DisInput:o.default},directives:{ripple:r},props:{title:{type:String,required:!0},primary:{type:String,default:"OK"},secondary:{type:String,default:"CANCEL"}},methods:{action(t){this.$emit(t,this.input)}}},a=n(0);var l=function(t){n(5)},c=Object(a.a)(s,function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("section",{staticClass:"DisPrompt"},[n("div",{staticClass:"DisPrompt__container"},[n("h3",{staticClass:"DisPrompt__title"},[t._v("\n\t\t\t"+t._s(t.title)+"\n\t\t")]),t._v(" "),n("dis-input",{staticClass:"DisPrompt__input",attrs:{maxlen:50},model:{value:t.input,callback:function(e){t.input=e},expression:"input"}})],1),t._v(" "),n("footer",{staticClass:"DisPrompt__footer"},[n("button",{directives:[{name:"ripple",rawName:"v-ripple"}],staticClass:"DisPrompt__button DisButton DisButton--primary",on:{click:function(e){t.action("primary")}}},[t._v("\n\t\t\t"+t._s(t.primary)+"\n\t\t")]),t._v(" "),n("button",{directives:[{name:"ripple",rawName:"v-ripple"}],staticClass:"DisPrompt__button DisButton",on:{click:function(e){t.action("secondary")}}},[t._v("\n\t\t\t"+t._s(t.secondary)+"\n\t\t")])])])},[],!1,l,"data-v-df2b606e",null);e.default=c.exports},function(t,e,n){"use strict";var o=r(n(1)),i=r(n(2));function r(t){return t&&t.__esModule?t:{default:t}}t.exports={DisInput:o.default,DisPrompt:i.default}},,function(t,e){},,,,,function(t,e){}])});
//# sourceMappingURL=disui.bundle.js.map