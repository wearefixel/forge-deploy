function _(s,t,e,i,a,l,c,h){var o=typeof s=="function"?s.options:s;t&&(o.render=t,o.staticRenderFns=e,o._compiled=!0),i&&(o.functional=!0),l&&(o._scopeId="data-v-"+l);var r;if(c?(r=function(n){n=n||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext,!n&&typeof __VUE_SSR_CONTEXT__<"u"&&(n=__VUE_SSR_CONTEXT__),a&&a.call(this,n),n&&n._registeredComponents&&n._registeredComponents.add(c)},o._ssrRegister=r):a&&(r=h?function(){a.call(this,(o.functional?this.parent:this).$root.$options.shadowRoot)}:a),r)if(o.functional){o._injectStyles=r;var u=o.render;o.render=function(p,d){return r.call(d),u(p,d)}}else{var m=o.beforeCreate;o.beforeCreate=m?[].concat(m,r):[r]}return{exports:s,options:o}}const f={props:{environments:{type:Array,required:!0},perPage:{type:Number,required:!0}},data(){return{last:{},loadingCommits:!0,commits:[],selectedCommit:null,total:0,page:0}},created(){this.getLast(),this.getCommits()},watch:{page(){this.getCommits()}},methods:{getLast(){this.$axios.get(cp_url("fixel/forge-deploy/last")).then(s=>{this.last=s.data})},getCommits(){this.loadingCommits=!0,this.$axios.get(cp_url("fixel/forge-deploy/commits?page="+this.page)).then(s=>{this.loadingCommits=!1,this.commits=s.data.commits,this.total=s.data.total})},selectCommit(s){if(this.selectedCommit&&this.selectedCommit.hash===s){this.selectedCommit=null;return}this.selectedCommit=null,this.$axios.get(cp_url("fixel/forge-deploy/commits/"+s)).then(t=>{this.selectedCommit={hash:s,changes:t.data}})},deploy(s,t){confirm(`Are you sure you want to deploy to ${s}?`)&&this.$axios.post(cp_url(`fixel/forge-deploy/deploy/${s}/${t}`)).catch(e=>{this.$toast.error(e.response.data.message)}).then(e=>{this.$toast.success(e.data.message),this.getLast()})},prev(){this.page=Math.max(0,this.page-1)},next(){this.page=Math.min(this.maxPages,this.page+1)}},computed:{maxPages(){return Math.floor(this.total/this.perPage)}}};var g=function(){var t=this,e=t._self._c;return e("div",{staticClass:"text-sm"},[e("div",{staticClass:"border-b pb-2 -mx-2 px-2"},[e("h2",[t._v("Last Deployment")]),e("ul",t._l(t.last,function(i,a){return e("li",{key:a,staticClass:"mt-1"},[e("strong",{staticClass:"titlecase"},[t._v(t._s(a)+":")]),e("code",[t._v(t._s(i?i.hash.slice(0,7):"n/a"))]),i?e("span",[t._v(t._s(new Date(i.time*1e3).toLocaleString()))]):t._e()])}),0)]),e("div",{staticClass:"-mx-2 px-2"},[t.loadingCommits?e("div",{staticClass:"text-center pt-4 pb-2"},[e("loading-graphic")],1):t._e(),t.commits.length&&!t.loadingCommits?e("ul",{staticClass:"divide-y"},t._l(t.commits,function(i){return e("li",{key:i.shortHash,staticClass:"py-2"},[e("button",{staticClass:"w-full hover:text-blue duration-100 text-left space-x-1",staticStyle:{outline:"none !important"},attrs:{type:"button"},on:{click:function(a){return t.selectCommit(i.hash)}}},[e("code",{attrs:{title:i.hash}},[t._v(t._s(i.shortHash))]),e("strong",[t._v(t._s(i.author))]),e("span",[t._v(t._s(i.message))])]),t.selectedCommit&&t.selectedCommit.hash===i.hash?e("div",{staticClass:"mt-2 space-y-2"},[e("ul",{staticClass:"p-2 rounded text-sm font-mono bg-grey-30 text-grey-70 overflow-auto",staticStyle:{"white-space":"nowrap"}},t._l(t.selectedCommit.changes,function(a){return e("li",{key:a.name},[e("code",[t._v(t._s(a.status.toUpperCase()))]),t._v(" "+t._s(a.name)+" ")])}),0),e("div",{staticClass:"flex gap-1"},t._l(t.environments,function(a){return e("button",{key:a,staticClass:"btn",attrs:{type:"submit"},on:{click:function(l){return t.deploy(a,i.hash)}}},[t._v(" Deploy to "+t._s(a)+" ")])}),0)]):t._e()])}),0):t._e(),t.loadingCommits?t._e():e("div",{staticClass:"flex justify-between items-center mt-2"},[e("button",{staticClass:"btn",attrs:{type:"button",disabled:t.page===0},on:{click:t.prev}},[t._v(" Prev ")]),e("span",[t._v("Page "+t._s(t.page+1)+" of "+t._s(t.maxPages+1))]),e("button",{staticClass:"btn",attrs:{type:"button",disabled:t.page>=t.maxPages},on:{click:t.next}},[t._v(" Next ")])])])])},C=[],v=_(f,g,C,!1,null,null,null,null);const y=v.exports;Statamic.booting(()=>{Statamic.$components.register("forge-deploy",y)});