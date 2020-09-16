(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-5f8c7576"],{"0e8f":function(e,t,a){"use strict";a("20f6");var r=a("e8f2");t["a"]=Object(r["a"])("flex")},"20f6":function(e,t,a){},"58df":function(e,t,a){"use strict";a.d(t,"a",(function(){return n}));var r=a("2b0e");function n(...e){return r["a"].extend({mixins:e})}},6544:function(e,t){e.exports=function(e,t){var a="function"===typeof e.exports?e.exports.extendOptions:e.options;for(var r in"function"===typeof e.exports&&(a.components=e.exports.options.components),a.components=a.components||{},t)a.components[r]=a.components[r]||t[r]}},7560:function(e,t,a){"use strict";a.d(t,"b",(function(){return n}));var r=a("2b0e");function n(e){const t={...e.props,...e.injections},a=s.options.computed.isDark.call(t);return s.options.computed.themeClasses.call({isDark:a})}const s=r["a"].extend().extend({name:"themeable",provide(){return{theme:this.themeableProvide}},inject:{theme:{default:{isDark:!1}}},props:{dark:{type:Boolean,default:null},light:{type:Boolean,default:null}},data(){return{themeableProvide:{isDark:!1}}},computed:{appIsDark(){return this.$vuetify.theme.dark||!1},isDark(){return!0===this.dark||!0!==this.light&&this.theme.isDark},themeClasses(){return{"theme--dark":this.isDark,"theme--light":!this.isDark}},rootIsDark(){return!0===this.dark||!0!==this.light&&this.appIsDark},rootThemeClasses(){return{"theme--dark":this.rootIsDark,"theme--light":!this.rootIsDark}}},watch:{isDark:{handler(e,t){e!==t&&(this.themeableProvide.isDark=this.isDark)},immediate:!0}}});t["a"]=s},"99d9":function(e,t,a){"use strict";a.d(t,"a",(function(){return s})),a.d(t,"b",(function(){return i})),a.d(t,"c",(function(){return c}));var r=a("b0af"),n=a("80d2");const s=Object(n["i"])("v-card__actions"),o=Object(n["i"])("v-card__subtitle"),i=Object(n["i"])("v-card__text"),c=Object(n["i"])("v-card__title");r["a"]},a722:function(e,t,a){"use strict";a("20f6");var r=a("e8f2");t["a"]=Object(r["a"])("layout")},e1bc:function(e,t,a){"use strict";a.r(t);var r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("v-card",{attrs:{outlined:"",loading:e.loading}},[a("v-card-title",{staticStyle:{"font-size":"17.5px"}},[e._v("Create Company")]),a("form",{on:{submit:function(t){return t.preventDefault(),e.create(t)},keydown:function(t){return e.error.clear(t.target.name)}}},[a("v-card-text",[a("v-layout",{attrs:{row:"",wrap:""}},[a("v-flex",{staticClass:"px-5",attrs:{xs12:"",md6:""}},[a("v-flex",{attrs:{xs12:""}},[a("v-text-field",{attrs:{"error-messages":e.error.get("code"),name:"code",label:"Company Code","prepend-icon":"mdi-tag",autofocus:"",required:""},model:{value:e.company.code,callback:function(t){e.$set(e.company,"code",t)},expression:"company.code"}})],1),a("v-flex",{attrs:{xs12:""}},[a("v-text-field",{attrs:{"error-messages":e.error.get("name"),name:"name",label:"Company Name","prepend-icon":"mdi-home-city",required:""},model:{value:e.company.name,callback:function(t){e.$set(e.company,"name",t)},expression:"company.name"}})],1),a("v-flex",{attrs:{xs12:""}},[a("v-text-field",{attrs:{"error-messages":e.error.get("address"),name:"address",label:"Address","prepend-icon":"mdi-map-marker",required:""},model:{value:e.company.address,callback:function(t){e.$set(e.company,"address",t)},expression:"company.address"}})],1),a("v-flex",{attrs:{xs12:""}},[a("v-text-field",{attrs:{"error-messages":e.error.get("tel"),name:"tel",label:"Telephone No.","prepend-icon":"mdi-deskphone",required:""},model:{value:e.company.tel,callback:function(t){e.$set(e.company,"tel",t)},expression:"company.tel"}})],1)],1),a("v-flex",{staticClass:"px-5",attrs:{xs12:"",md6:""}},[a("v-flex",{attrs:{xs12:""}},[a("v-text-field",{attrs:{"error-messages":e.error.get("tin"),name:"tin",label:"TIN No.","prepend-icon":"mdi-tag-text-outline"},model:{value:e.company.tin,callback:function(t){e.$set(e.company,"tin",t)},expression:"company.tin"}})],1),a("v-flex",{attrs:{xs12:""}},[a("v-text-field",{attrs:{"error-messages":e.error.get("sss"),name:"sss",label:"SSS No.","prepend-icon":"mdi-tag-text-outline"},model:{value:e.company.sss,callback:function(t){e.$set(e.company,"sss",t)},expression:"company.sss"}})],1),a("v-flex",{attrs:{xs12:""}},[a("v-text-field",{attrs:{"error-messages":e.error.get("hdmf"),name:"hdmf",label:"PagIBIG No.","prepend-icon":"mdi-tag-text-outline"},model:{value:e.company.hdmf,callback:function(t){e.$set(e.company,"hdmf",t)},expression:"company.hdmf"}})],1),a("v-flex",{attrs:{xs12:""}},[a("v-text-field",{attrs:{"error-messages":e.error.get("phic"),name:"phic",label:"Philhealth No.","prepend-icon":"mdi-tag-text-outline"},model:{value:e.company.phic,callback:function(t){e.$set(e.company,"phic",t)},expression:"company.phic"}})],1)],1)],1)],1),a("v-card-actions",[a("v-btn",{staticClass:"indigo white--text",attrs:{type:"submit",small:"",loading:e.loading}},[e._v("\n        Save\n      ")]),a("v-btn",{staticClass:"deep-orange white--text",attrs:{small:"",router:"",to:{name:"companies"},disabled:e.loading}},[e._v("\n        Return\n      ")])],1)],1)],1)},n=[],s={computed:{error:function(){return this.$store.getters.error},loading:function(){return this.$store.getters["company/loading"]}},data:function(){return{company:{}}},methods:{create:function(){this.$store.dispatch("company/create",this.company)}}},o=s,i=a("2877"),c=a("6544"),l=a.n(c),d=a("8336"),m=a("b0af"),p=a("99d9"),u=a("0e8f"),f=a("a722"),h=a("8654"),x=Object(i["a"])(o,r,n,!1,null,null,null);t["default"]=x.exports;l()(x,{VBtn:d["a"],VCard:m["a"],VCardActions:p["a"],VCardText:p["b"],VCardTitle:p["c"],VFlex:u["a"],VLayout:f["a"],VTextField:h["a"]})},e8f2:function(e,t,a){"use strict";a.d(t,"a",(function(){return n}));var r=a("2b0e");function n(e){return r["a"].extend({name:`v-${e}`,functional:!0,props:{id:String,tag:{type:String,default:"div"}},render(t,{props:a,data:r,children:n}){r.staticClass=`${e} ${r.staticClass||""}`.trim();const{attrs:s}=r;if(s){r.attrs={};const e=Object.keys(s).filter(e=>{if("slot"===e)return!1;const t=s[e];return e.startsWith("data-")?(r.attrs[e]=t,!1):t||"string"===typeof t});e.length&&(r.staticClass+=` ${e.join(" ")}`)}return a.id&&(r.domProps=r.domProps||{},r.domProps.id=a.id),t(a.tag,r,n)}})}}}]);
//# sourceMappingURL=chunk-5f8c7576.d3dc7523.js.map