(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-7592ab5b"],{"0fd9":function(t,e,s){"use strict";s("4b85");var n=s("2b0e"),i=s("d9f7"),r=s("80d2");const a=["sm","md","lg","xl"],o=["start","end","center"];function c(t,e){return a.reduce((s,n)=>{return s[t+Object(r["D"])(n)]=e(),s},{})}const l=t=>[...o,"baseline","stretch"].includes(t),u=c("align",()=>({type:String,default:null,validator:l})),h=t=>[...o,"space-between","space-around"].includes(t),d=c("justify",()=>({type:String,default:null,validator:h})),p=t=>[...o,"space-between","space-around","stretch"].includes(t),f=c("alignContent",()=>({type:String,default:null,validator:p})),m={align:Object.keys(u),justify:Object.keys(d),alignContent:Object.keys(f)},g={align:"align",justify:"justify",alignContent:"align-content"};function b(t,e,s){let n=g[t];if(null!=s){if(e){const s=e.replace(t,"");n+=`-${s}`}return n+=`-${s}`,n.toLowerCase()}}const v=new Map;e["a"]=n["a"].extend({name:"v-row",functional:!0,props:{tag:{type:String,default:"div"},dense:Boolean,noGutters:Boolean,align:{type:String,default:null,validator:l},...u,justify:{type:String,default:null,validator:h},...d,alignContent:{type:String,default:null,validator:p},...f},render(t,{props:e,data:s,children:n}){let r="";for(const i in e)r+=String(e[i]);let a=v.get(r);if(!a){let t;for(t in a=[],m)m[t].forEach(s=>{const n=e[s],i=b(t,s,n);i&&a.push(i)});a.push({"no-gutters":e.noGutters,"row--dense":e.dense,[`align-${e.align}`]:e.align,[`justify-${e.justify}`]:e.justify,[`align-content-${e.alignContent}`]:e.alignContent}),v.set(r,a)}return t(e.tag,Object(i["a"])(s,{staticClass:"row",class:a}),n)}})},"132d":function(t,e,s){"use strict";s("4804");var n,i=s("7e2b"),r=s("a9ad"),a=s("af2b"),o=s("7560"),c=s("80d2"),l=s("2b0e"),u=s("58df");function h(t){return["fas","far","fal","fab"].some(e=>t.includes(e))}function d(t){return/^[mzlhvcsqta]\s*[-+.0-9][^mlhvzcsqta]+/i.test(t)&&/[\dz]$/i.test(t)&&t.length>4}(function(t){t["xSmall"]="12px",t["small"]="16px",t["default"]="24px",t["medium"]="28px",t["large"]="36px",t["xLarge"]="40px"})(n||(n={}));const p=Object(u["a"])(i["a"],r["a"],a["a"],o["a"]).extend({name:"v-icon",props:{dense:Boolean,disabled:Boolean,left:Boolean,right:Boolean,size:[Number,String],tag:{type:String,required:!1,default:"i"}},computed:{medium(){return!1}},methods:{getIcon(){let t="";return this.$slots.default&&(t=this.$slots.default[0].text.trim()),Object(c["A"])(this,t)},getSize(){const t={xSmall:this.xSmall,small:this.small,medium:this.medium,large:this.large,xLarge:this.xLarge},e=Object(c["y"])(t).find(e=>t[e]);return e&&n[e]||Object(c["f"])(this.size)},getDefaultData(){const t=Boolean(this.listeners$.click||this.listeners$["!click"]),e={staticClass:"v-icon notranslate",class:{"v-icon--disabled":this.disabled,"v-icon--left":this.left,"v-icon--link":t,"v-icon--right":this.right,"v-icon--dense":this.dense},attrs:{"aria-hidden":!t,role:t?"button":null,...this.attrs$},on:this.listeners$};return e},applyColors(t){t.class={...t.class,...this.themeClasses},this.setTextColor(this.color,t)},renderFontIcon(t,e){const s=[],n=this.getDefaultData();let i="material-icons";const r=t.indexOf("-"),a=r<=-1;a?s.push(t):(i=t.slice(0,r),h(i)&&(i="")),n.class[i]=!0,n.class[t]=!a;const o=this.getSize();return o&&(n.style={fontSize:o}),this.applyColors(n),e(this.tag,n,s)},renderSvgIcon(t,e){const s=this.getDefaultData();s.class["v-icon--svg"]=!0,s.attrs={xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",height:"24",width:"24",role:"img","aria-hidden":!this.attrs$["aria-label"],"aria-label":this.attrs$["aria-label"]};const n=this.getSize();return n&&(s.style={fontSize:n,height:n,width:n},s.attrs.height=n,s.attrs.width=n),this.applyColors(s),e("svg",s,[e("path",{attrs:{d:t}})])},renderSvgIconComponent(t,e){const s=this.getDefaultData();s.class["v-icon--is-component"]=!0;const n=this.getSize();n&&(s.style={fontSize:n,height:n}),this.applyColors(s);const i=t.component;return s.props=t.props,s.nativeOn=s.on,e(i,s)}},render(t){const e=this.getIcon();return"string"===typeof e?d(e)?this.renderSvgIcon(e,t):this.renderFontIcon(e,t):this.renderSvgIconComponent(e,t)}});e["a"]=l["a"].extend({name:"v-icon",$_wrapperFor:p,functional:!0,render(t,{data:e,children:s}){let n="";return e.domProps&&(n=e.domProps.textContent||e.domProps.innerHTML||n,delete e.domProps.textContent,delete e.domProps.innerHTML),t(p,e,n?[n]:s)}})},"3a66":function(t,e,s){"use strict";s.d(e,"a",(function(){return r}));var n=s("fe6c"),i=s("58df");function r(t,e=[]){return Object(i["a"])(Object(n["b"])(["absolute","fixed"])).extend({name:"applicationable",props:{app:Boolean},computed:{applicationProperty(){return t}},watch:{app(t,e){e?this.removeApplication(!0):this.callUpdate()},applicationProperty(t,e){this.$vuetify.application.unregister(this._uid,e)}},activated(){this.callUpdate()},created(){for(let t=0,s=e.length;t<s;t++)this.$watch(e[t],this.callUpdate);this.callUpdate()},mounted(){this.callUpdate()},deactivated(){this.removeApplication()},destroyed(){this.removeApplication()},methods:{callUpdate(){this.app&&this.$vuetify.application.register(this._uid,this.applicationProperty,this.updateApplication())},removeApplication(t=!1){(t||this.app)&&this.$vuetify.application.unregister(this._uid,this.applicationProperty)},updateApplication:()=>0}})}},4804:function(t,e,s){},"4b85":function(t,e,s){},"62ad":function(t,e,s){"use strict";s("4b85");var n=s("2b0e"),i=s("d9f7"),r=s("80d2");const a=["sm","md","lg","xl"],o=(()=>{return a.reduce((t,e)=>{return t[e]={type:[Boolean,String,Number],default:!1},t},{})})(),c=(()=>{return a.reduce((t,e)=>{return t["offset"+Object(r["D"])(e)]={type:[String,Number],default:null},t},{})})(),l=(()=>{return a.reduce((t,e)=>{return t["order"+Object(r["D"])(e)]={type:[String,Number],default:null},t},{})})(),u={col:Object.keys(o),offset:Object.keys(c),order:Object.keys(l)};function h(t,e,s){let n=t;if(null!=s&&!1!==s){if(e){const s=e.replace(t,"");n+=`-${s}`}return"col"!==t||""!==s&&!0!==s?(n+=`-${s}`,n.toLowerCase()):n.toLowerCase()}}const d=new Map;e["a"]=n["a"].extend({name:"v-col",functional:!0,props:{cols:{type:[Boolean,String,Number],default:!1},...o,offset:{type:[String,Number],default:null},...c,order:{type:[String,Number],default:null},...l,alignSelf:{type:String,default:null,validator:t=>["auto","start","end","center","baseline","stretch"].includes(t)},justifySelf:{type:String,default:null,validator:t=>["auto","start","end","center","baseline","stretch"].includes(t)},tag:{type:String,default:"div"}},render(t,{props:e,data:s,children:n,parent:r}){let a="";for(const i in e)a+=String(e[i]);let o=d.get(a);if(!o){let t;for(t in o=[],u)u[t].forEach(s=>{const n=e[s],i=h(t,s,n);i&&o.push(i)});const s=o.some(t=>t.startsWith("col-"));o.push({col:!s||!e.cols,[`col-${e.cols}`]:e.cols,[`offset-${e.offset}`]:e.offset,[`order-${e.order}`]:e.order,[`align-self-${e.alignSelf}`]:e.alignSelf,[`justify-self-${e.justifySelf}`]:e.justifySelf}),d.set(a,o)}return t(e.tag,Object(i["a"])(s,{class:o}),n)}})},a3de:function(t,e,s){"use strict";s.r(e);var n=function(){var t=this,e=t.$createElement,s=t._self._c||e;return t.show?s("v-footer",{attrs:{app:"",inset:"",dark:"",color:"grey darken-2"}},[s("v-row",t._l(t.controls,(function(e,n){return s("v-col",{key:n,staticClass:"px-2 my-n2"},[s("v-btn",{staticClass:"lighten-1",attrs:{small:"",block:"",color:e.color,disabled:e.access||t.loading},on:{click:e.action}},[t._v("\n        "+t._s(e.label)+"\n        "),s("v-icon",{attrs:{small:""}},[t._v(t._s(e.icon))])],1)],1)})),1)],1):t._e()},i=[],r=(s("96cf"),s("3b8d")),a=(s("6762"),s("2fdb"),{computed:{controls:function(){return[{label:"Select",color:"purple",icon:"mdi-hand-pointing-up",action:this.toogleSelection,access:!1},{label:"Create",color:"indigo",icon:"mdi-plus",action:this.showCreateForm,access:!this.creatable},{label:"Transmit",color:"blue",icon:"mdi-bank-transfer-out",action:this.showTransmitForm,access:!this.transmittable},{label:"Receive",color:"green",icon:"mdi-bank-transfer-in",action:this.showReceiveForm,access:!this.receivable},{label:"Claim",color:"purple",icon:"mdi-download",action:this.showClaimForm,access:!this.claimable},{label:"Return",color:"deep-orange",icon:"mdi-keyboard-return",action:this.showReturnForm,access:!this.returnable},{label:"Cancel",color:"red",icon:"mdi-cancel",action:this.showCancelForm,access:!this.cancelable},{label:"Clear",color:"teal",icon:"mdi-check-bold",action:this.showClearForm,access:!this.clearable},{label:"Preview",color:"primary",icon:"mdi-open-in-app",action:this.showCheck,access:!this.viewable},{label:"Refresh",color:"green",icon:"mdi-refresh",action:this.refresh,access:!1}]},cancelable:function(){return this.selectedChecks.length&&this.selectedChecks.every((function(t){return[1,4].includes(t.status_id)&&t.received}))&&this.actions.includes("cnl")},claimable:function(){var t=this;return this.selectedChecks.length>0&&this.selectedChecks.every((function(e){return[1,2,4].includes(e.status_id)&&e.received&&e.branch_id===t.user.branch_id}))&&this.actions.includes("clm")},clearable:function(){return 1===this.selectedChecks.length&&3===this.selectedChecks[0].status_id&&this.actions.includes("clr")||this.actions.includes("imt")},creatable:function(){return this.actions.includes("crt")},receivable:function(){return this.actions.includes("rcv")},returnable:function(){return this.actions.includes("rtn")},viewable:function(){return this.selectedChecks.length},transmittable:function(){return this.selectedChecks.length>0&&this.selectedChecks.every((function(t){return t.received&&[1,4].includes(t.status_id)}))&&this.actions.includes("trm")},show:function(){return this.$store.getters.footer},selectedChecks:function(){return this.$store.getters["check/selectedChecks"]},user:function(){return this.$store.getters["auth/user"]},actions:function(){return this.user.actionAccess},loading:{get:function(){return this.$store.getters["check/loading"]},set:function(t){this.$store.commit("check/loading",t)}}},methods:{toogleSelection:function(){this.$store.commit("check/selecting",!this.$store.getters["check/selecting"])},refresh:function(){this.$store.commit("check/selectedChecks",[]),this.$store.commit("check/pagination",{groupBy:[],groupDesc:[],itemsPerPage:10,multiSort:!1,mustSort:!1,page:1,sortBy:[],sortDesc:[]})},showCheck:function(){var t=Object(r["a"])(regeneratorRuntime.mark((function t(){var e=this;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(this.loading=!0,1!==this.selectedChecks.length){t.next=7;break}return t.next=4,this.$store.dispatch("tools/getStatus");case 4:this.$store.dispatch("check/showCheck",this.selectedChecks[0].id),t.next=8;break;case 7:this.selectedChecks.length>1&&setTimeout((function(){e.loading=!1,e.$store.commit("check/showSelected",!0)}),500);case 8:case"end":return t.stop()}}),t,this)})));function e(){return t.apply(this,arguments)}return e}(),showCancelForm:function(){var t=this;this.loading=!0,setTimeout((function(){t.loading=!1,t.$store.commit("check/showCancel",!0)}),500)},showClaimForm:function(){var t=this;this.loading=!0,setTimeout((function(){t.loading=!1,t.$store.commit("check/showClaim",!0)}),500)},showClearForm:function(){var t=Object(r["a"])(regeneratorRuntime.mark((function t(){var e=this;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return this.loading=!0,t.next=3,this.$store.dispatch("tools/getAccounts");case 3:if(1!==this.selectedChecks.length||3!==this.selectedChecks[0].status_id||!this.actions.includes("clr")){t.next=18;break}return t.prev=4,t.next=7,this.$store.dispatch("check/getCheck",this.selectedChecks[0].id);case 7:this.$store.commit("check/showClear",!0),t.next=13;break;case 10:return t.prev=10,t.t0=t["catch"](4),t.abrupt("return");case 13:return t.prev=13,this.loading=!1,t.finish(13);case 16:t.next=19;break;case 18:this.actions.includes("trm")&&setTimeout((function(){e.loading=!1,e.$store.commit("check/showImportClear",!0)}),500);case 19:case"end":return t.stop()}}),t,this,[[4,10,13,16]])})));function e(){return t.apply(this,arguments)}return e}(),showCreateForm:function(){var t=Object(r["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return this.loading=!0,t.prev=1,t.next=4,this.$store.dispatch("tools/getAccounts");case 4:this.$store.commit("check/showCreate",!0),t.next=10;break;case 7:return t.prev=7,t.t0=t["catch"](1),t.abrupt("return");case 10:return t.prev=10,this.loading=!1,t.finish(10);case 13:case"end":return t.stop()}}),t,this,[[1,7,10,13]])})));function e(){return t.apply(this,arguments)}return e}(),showReceiveForm:function(){var t=Object(r["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(this.loading=!0,t.prev=1,!(this.user.access.id<4)){t.next=7;break}return t.next=5,this.$store.dispatch("tools/getReturnedTransmittals");case 5:t.next=9;break;case 7:return t.next=9,this.$store.dispatch("tools/getSentTransmittals");case 9:this.$store.commit("check/showReceive",!0),t.next=15;break;case 12:return t.prev=12,t.t0=t["catch"](1),t.abrupt("return");case 15:return t.prev=15,this.loading=!1,t.finish(15);case 18:case"end":return t.stop()}}),t,this,[[1,12,15,18]])})));function e(){return t.apply(this,arguments)}return e}(),showReturnForm:function(){var t=Object(r["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return this.loading=!0,t.prev=1,t.next=4,this.$store.dispatch("tools/getReceivedTransmittals");case 4:this.$store.commit("check/showReturn",!0),t.next=10;break;case 7:return t.prev=7,t.t0=t["catch"](1),t.abrupt("return");case 10:return t.prev=10,this.loading=!1,t.finish(10);case 13:case"end":return t.stop()}}),t,this,[[1,7,10,13]])})));function e(){return t.apply(this,arguments)}return e}(),showTransmitForm:function(){var t=Object(r["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return this.loading=!0,t.prev=1,t.next=4,this.$store.dispatch("tools/getBranches");case 4:this.$store.commit("check/showTransmit",!0),t.next=10;break;case 7:return t.prev=7,t.t0=t["catch"](1),t.abrupt("return");case 10:return t.prev=10,this.loading=!1,t.finish(10);case 13:case"end":return t.stop()}}),t,this,[[1,7,10,13]])})));function e(){return t.apply(this,arguments)}return e}()}}),o=a,c=s("2877"),l=s("6544"),u=s.n(l),h=s("8336"),d=s("62ad"),p=(s("b5b6"),s("3a66")),f=s("8dd9"),m=s("d10f"),g=s("58df"),b=s("80d2"),v=Object(g["a"])(f["a"],Object(p["a"])("footer",["height","inset"]),m["a"]).extend({name:"v-footer",props:{height:{default:"auto",type:[Number,String]},inset:Boolean,padless:Boolean,tile:{type:Boolean,default:!0}},computed:{applicationProperty(){return this.inset?"insetFooter":"footer"},classes(){return{...f["a"].options.computed.classes.call(this),"v-footer--absolute":this.absolute,"v-footer--fixed":!this.absolute&&(this.app||this.fixed),"v-footer--padless":this.padless,"v-footer--inset":this.inset}},computedBottom(){if(this.isPositioned)return this.app?this.$vuetify.application.bottom:0},computedLeft(){if(this.isPositioned)return this.app&&this.inset?this.$vuetify.application.left:0},computedRight(){if(this.isPositioned)return this.app&&this.inset?this.$vuetify.application.right:0},isPositioned(){return Boolean(this.absolute||this.fixed||this.app)},styles(){const t=parseInt(this.height);return{...f["a"].options.computed.styles.call(this),height:isNaN(t)?t:Object(b["f"])(t),left:Object(b["f"])(this.computedLeft),right:Object(b["f"])(this.computedRight),bottom:Object(b["f"])(this.computedBottom)}}},methods:{updateApplication(){const t=parseInt(this.height);return isNaN(t)?this.$el?this.$el.clientHeight:0:t}},render(t){const e=this.setBackgroundColor(this.color,{staticClass:"v-footer",class:this.classes,style:this.styles});return t("footer",e,this.$slots.default)}}),y=s("132d"),k=s("0fd9"),w=Object(c["a"])(o,n,i,!1,null,null,null);e["default"]=w.exports;u()(w,{VBtn:h["a"],VCol:d["a"],VFooter:v,VIcon:y["a"],VRow:k["a"]})},a9ad:function(t,e,s){"use strict";var n=s("2b0e"),i=s("d9bd");function r(t){return!!t&&!!t.match(/^(#|(rgb|hsl)a?\()/)}e["a"]=n["a"].extend({name:"colorable",props:{color:String},methods:{setBackgroundColor(t,e={}){return"string"===typeof e.style?(Object(i["b"])("style must be an object",this),e):"string"===typeof e.class?(Object(i["b"])("class must be an object",this),e):(r(t)?e.style={...e.style,"background-color":`${t}`,"border-color":`${t}`}:t&&(e.class={...e.class,[t]:!0}),e)},setTextColor(t,e={}){if("string"===typeof e.style)return Object(i["b"])("style must be an object",this),e;if("string"===typeof e.class)return Object(i["b"])("class must be an object",this),e;if(r(t))e.style={...e.style,color:`${t}`,"caret-color":`${t}`};else if(t){const[s,n]=t.toString().trim().split(" ",2);e.class={...e.class,[s+"--text"]:!0},n&&(e.class["text--"+n]=!0)}return e}}})},b5b6:function(t,e,s){},d9f7:function(t,e,s){"use strict";
/**
 * @copyright 2017 Alex Regan
 * @license MIT
 * @see https://github.com/alexsasharegan/vue-functional-data-merge
 */
function n(){const t={};let e,s,n=arguments.length;while(n--)for(e of Object.keys(arguments[n]))switch(e){case"class":case"style":case"directives":Array.isArray(t[e])||(t[e]=[]),t[e]=t[e].concat(arguments[n][e]);break;case"staticClass":if(!arguments[n][e])break;void 0===t[e]&&(t[e]=""),t[e]&&(t[e]+=" "),t[e]+=arguments[n][e].trim();break;case"on":case"nativeOn":t[e]||(t[e]={});const i=t[e];for(s of Object.keys(arguments[n][e]||{}))i[s]?i[s]=Array().concat(i[s],arguments[n][e][s]):i[s]=arguments[n][e][s];break;case"attrs":case"props":case"domProps":case"scopedSlots":case"staticStyle":case"hook":case"transition":t[e]||(t[e]={}),t[e]={...arguments[n][e],...t[e]};break;case"slot":case"key":case"ref":case"tag":case"show":case"keepAlive":default:t[e]||(t[e]=arguments[n][e])}return t}s.d(e,"a",(function(){return n}))},f2e7:function(t,e,s){"use strict";s.d(e,"b",(function(){return i}));var n=s("2b0e");function i(t="value",e="input"){return n["a"].extend({name:"toggleable",model:{prop:t,event:e},props:{[t]:{required:!1}},data(){return{isActive:!!this[t]}},watch:{[t](t){this.isActive=!!t},isActive(s){!!s!==this[t]&&this.$emit(e,s)}}})}const r=i();e["a"]=r}}]);
//# sourceMappingURL=chunk-7592ab5b.a44f6f4d.js.map