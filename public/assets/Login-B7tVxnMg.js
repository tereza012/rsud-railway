import{O as N,r as p,b as ce,d as de,l as ue,j as n,P as Y,e as J,f as fe,g as pe,h as me,c as Q,C as be,q as he,u as xe,y as ve,Y as ge,B as ye,Q as we}from"./app-BmJ9-8ba.js";import{L as $,I as V,z as I}from"./input-CwNdd4mS.js";import{u as je,v as ke}from"./index-DNT3TRw4.js";import"./app-BWRYm4UO.js";var M={},_e=N&&N.__createBinding||(Object.create?function(e,t,r,a){a===void 0&&(a=r);var c=Object.getOwnPropertyDescriptor(t,r);(!c||("get"in c?!t.__esModule:c.writable||c.configurable))&&(c={enumerable:!0,get:function(){return t[r]}}),Object.defineProperty(e,a,c)}:function(e,t,r,a){a===void 0&&(a=r),e[a]=t[r]}),Ce=N&&N.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),Se=N&&N.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(e!=null)for(var r in e)r!=="default"&&Object.prototype.hasOwnProperty.call(e,r)&&_e(t,e,r);return Ce(t,e),t};Object.defineProperty(M,"__esModule",{value:!0});var W=M.useTurnstile=void 0;const _=Se(p),R=typeof globalThis<"u"?globalThis:window;let k=typeof R.turnstile<"u"?"ready":"unloaded",Z,X;const ee=new Promise((e,t)=>{X={resolve:e,reject:t},k==="ready"&&e(void 0)});{const e="cf__reactTurnstileOnLoad",t="https://challenges.cloudflare.com/turnstile/v0/api.js";Z=()=>{if(k==="unloaded"){k="loading",R[e]=()=>{X.resolve(),k="ready",delete R[e]};const r=`${t}?onload=${e}&render=explicit`,a=document.createElement("script");a.src=r,a.async=!0,a.addEventListener("error",()=>{X.reject("Failed to load Turnstile."),delete R[e]}),document.head.appendChild(a)}return ee}}function Ee({id:e,className:t,style:r,sitekey:a,action:c,cData:u,theme:m,language:b,tabIndex:x,responseField:v,responseFieldName:i,size:o,fixedSize:f,retry:S,retryInterval:g,refreshExpired:P,appearance:y,execution:E,userRef:O,onVerify:d,onLoad:w,onError:B,onExpire:D,onTimeout:F,onAfterInteractive:U,onBeforeInteractive:A,onUnsupported:q}){const le=(0,_.useRef)(null),s=(0,_.useState)({onVerify:d,onLoad:w,onError:B,onExpire:D,onTimeout:F,onAfterInteractive:U,onBeforeInteractive:A,onUnsupported:q})[0],L=O??le;return(0,_.useEffect)(()=>{if(!L.current)return;let G=!1,T="";return(async()=>{var H,K;if(k!=="ready")try{await Z()}catch(l){(H=s.onError)===null||H===void 0||H.call(s,l);return}if(G||!L.current)return;let j;const ie={sitekey:a,action:c,cData:u,theme:m,language:b,tabindex:x,"response-field":v,"response-field-name":i,size:o,retry:S,"retry-interval":g,"refresh-expired":P,appearance:y,execution:E,callback:l=>{var h;return(h=s.onVerify)===null||h===void 0?void 0:h.call(s,l,j)},"error-callback":l=>{var h;return(h=s.onError)===null||h===void 0?void 0:h.call(s,l,j)},"expired-callback":l=>{var h;return(h=s.onExpire)===null||h===void 0?void 0:h.call(s,l,j)},"timeout-callback":()=>{var l;return(l=s.onTimeout)===null||l===void 0?void 0:l.call(s,j)},"after-interactive-callback":()=>{var l;return(l=s.onAfterInteractive)===null||l===void 0?void 0:l.call(s,j)},"before-interactive-callback":()=>{var l;return(l=s.onBeforeInteractive)===null||l===void 0?void 0:l.call(s,j)},"unsupported-callback":()=>{var l;return(l=s.onUnsupported)===null||l===void 0?void 0:l.call(s,j)}};T=window.turnstile.render(L.current,ie),j=Pe(T),(K=s.onLoad)===null||K===void 0||K.call(s,T,j)})(),()=>{G=!0,T&&window.turnstile.remove(T)}},[a,c,u,m,b,x,v,i,o,S,g,P,y,E]),(0,_.useEffect)(()=>{s.onVerify=d,s.onLoad=w,s.onError=B,s.onExpire=D,s.onTimeout=F,s.onAfterInteractive=U,s.onBeforeInteractive=A,s.onUnsupported=q},[d,w,B,D,F,U,A,q]),_.default.createElement("div",{ref:L,id:e,className:t,style:f?{...r??{},width:o==="compact"?"130px":"300px",height:o==="compact"?"120px":"65px"}:r})}var Ne=M.default=Ee;function Pe(e){return{execute:t=>window.turnstile.execute(e,t),reset:()=>window.turnstile.reset(e),getResponse:()=>window.turnstile.getResponse(e),isExpired:()=>window.turnstile.isExpired(e)}}function Oe(){const[e,t]=(0,_.useState)(k);return(0,_.useEffect)(()=>{k!=="ready"&&ee.then(()=>t(k))},[]),R.turnstile}W=M.useTurnstile=Oe;var z="Checkbox",[Te,qe]=ce(z),[Re,Le]=Te(z),te=p.forwardRef((e,t)=>{const{__scopeCheckbox:r,name:a,checked:c,defaultChecked:u,required:m,disabled:b,value:x="on",onCheckedChange:v,...i}=e,[o,f]=p.useState(null),S=de(t,d=>f(d)),g=p.useRef(!1),P=o?!!o.closest("form"):!0,[y=!1,E]=ue({prop:c,defaultProp:u,onChange:v}),O=p.useRef(y);return p.useEffect(()=>{const d=o==null?void 0:o.form;if(d){const w=()=>E(O.current);return d.addEventListener("reset",w),()=>d.removeEventListener("reset",w)}},[o,E]),n.jsxs(Re,{scope:r,state:y,disabled:b,children:[n.jsx(Y.button,{type:"button",role:"checkbox","aria-checked":C(y)?"mixed":y,"aria-required":m,"data-state":se(y),"data-disabled":b?"":void 0,disabled:b,value:x,...i,ref:S,onKeyDown:J(e.onKeyDown,d=>{d.key==="Enter"&&d.preventDefault()}),onClick:J(e.onClick,d=>{E(w=>C(w)?!0:!w),P&&(g.current=d.isPropagationStopped(),g.current||d.stopPropagation())})}),P&&n.jsx(Ie,{control:o,bubbles:!g.current,name:a,value:x,checked:y,required:m,disabled:b,style:{transform:"translateX(-100%)"}})]})});te.displayName=z;var re="CheckboxIndicator",ne=p.forwardRef((e,t)=>{const{__scopeCheckbox:r,forceMount:a,...c}=e,u=Le(re,r);return n.jsx(fe,{present:a||C(u.state)||u.state===!0,children:n.jsx(Y.span,{"data-state":se(u.state),"data-disabled":u.disabled?"":void 0,...c,ref:t,style:{pointerEvents:"none",...e.style}})})});ne.displayName=re;var Ie=e=>{const{control:t,checked:r,bubbles:a=!0,...c}=e,u=p.useRef(null),m=pe(r),b=me(t);return p.useEffect(()=>{const x=u.current,v=window.HTMLInputElement.prototype,o=Object.getOwnPropertyDescriptor(v,"checked").set;if(m!==r&&o){const f=new Event("click",{bubbles:a});x.indeterminate=C(r),o.call(x,C(r)?!1:r),x.dispatchEvent(f)}},[m,r,a]),n.jsx("input",{type:"checkbox","aria-hidden":!0,defaultChecked:C(r)?!1:r,...c,tabIndex:-1,ref:u,style:{...e.style,...b,position:"absolute",pointerEvents:"none",opacity:0,margin:0}})};function C(e){return e==="indeterminate"}function se(e){return C(e)?"indeterminate":e?"checked":"unchecked"}var ae=te,Me=ne;const oe=p.forwardRef(({className:e,...t},r)=>n.jsx(ae,{ref:r,className:Q("peer h-4 w-4 shrink-0 rounded-sm border border-primary shadow focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",e),...t,children:n.jsx(Me,{className:Q("flex items-center justify-center text-current"),children:n.jsx(be,{className:"h-4 w-4"})})}));oe.displayName=ae.displayName;const Be=I.object({username:I.string().min(1,"Username tidak boleh kosong"),password:I.string().min(1,"Password tidak boleh kosong"),remember:I.boolean().optional()});function He(){const e=he().props,{toast:t}=xe(),r=W(),a=new String(e.turnstile_site_key).toString(),c=e.csrf_token,{form:u,errors:m,isSubmitting:b}=je({extend:ke({schema:Be}),onSubmit:async(i,o)=>{const f=new FormData;f.append("username",i.username),f.append("password",i.password),f.append("remember",i.remember),f.append("_token",c),ve.post("/login",f)},onSuccess:(i,o)=>{console.log("Success: ",i)},onError:(i,o)=>{console.log("Error: ",i)}});p.useEffect(()=>{var i,o;if(Object.keys(e.errors).length>0&&Object.keys(e.errors).map(S=>{var g;t({description:(g=e.errors[S])==null?void 0:g.toString(),variant:"destructive",duration:5e3})}),e.flash){if(!e.flash.message)return;t({description:(o=(i=e.flash)==null?void 0:i.message)==null?void 0:o.toString(),variant:"default",className:"bg-green-600 text-white fill-white",duration:5e3})}},[e.flash]);const[x,v]=p.useState(!1);return n.jsxs(n.Fragment,{children:[n.jsx(ge,{children:n.jsx("title",{children:"Masuk"})}),n.jsxs("div",{className:"flex h-[calc(100vh-8.2vh)] max-md:h-fit gap-3 max-md:px-5",children:[n.jsx("div",{className:"py-5 text-center w-1/3 max-md:hidden bg-[url('/storage/app/public/main_wp.png')] bg-no-repeat bg-cover bg-center rounded"}),n.jsxs("div",{className:"py-5 text-left w-2/3 max-md:w-full p-5 h-full flex flex-col justify-center items-stretch align-middle",children:[n.jsx("h1",{className:"text-3xl font-bold mb-7",children:"Masuk"}),n.jsxs("form",{method:"POST",ref:u,className:"flex flex-col gap-3 w-full h-full",children:[n.jsx($,{htmlFor:"username",children:"Username"}),n.jsx(V,{type:"text",name:"username",placeholder:"Username",className:"w-full rounded-lg border-2 border-slate-500 p-3 text-slate-800 focus:border-blue-500 px-3 py-2",id:"username"}),n.jsx("span",{className:"text-red-500",children:m().username}),n.jsx($,{htmlFor:"password",children:"Password"}),n.jsx(V,{type:"password",name:"password",placeholder:"Password",className:"w-full rounded-lg border-2 border-slate-500 p-3 text-slate-800 focus:border-blue-500 px-3 py-2",id:"password"}),n.jsx("span",{className:"text-red-500",children:m().password}),n.jsx(Ne,{sitekey:a,language:"id",size:"normal",onError:i=>console.error(i),onTimeout:()=>v(!1),onExpire:()=>v(!1),onVerify:i=>{fetch("/api/captcha",{method:"POST",body:JSON.stringify({token:i})}).then(async o=>{const f=await o.json();if(!o.ok&&!f.status){r.reset();return}v(!0)})}}),n.jsxs("div",{className:"flex items-center space-x-2",children:[n.jsx(oe,{id:"remember",name:"remember"}),n.jsx($,{htmlFor:"remember",children:"Ingat saya"})]}),n.jsx(ye,{type:"submit",className:"w-full rounded-lg bg-blue-500 p-3 text-white hover:bg-blue-400 transition-all duration-200 disabled:bg-slate-500",disabled:b(),children:"Masuk"})]}),n.jsxs("p",{className:"text-center text-slate-500 mt-2",children:["Belum punya akun?",n.jsx(we,{href:"/register",className:"text-center text-blue-500 hover:text-blue-400 transition-all duration-200 ml-1 font-bold",children:"Buat Sekarang"})]})]})]})]})}export{He as default};