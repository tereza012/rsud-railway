import{b as D,r as f,d as G,j as e,P as F,e as R,f as oe,g as ie,h as de,i as K,k as le,l as ce,R as pe,I as me,c as B,C as ue,Y as xe,q as E,B as T,y as z}from"./app-BmJ9-8ba.js";import{z as d,L as t,I as l}from"./input-CwNdd4mS.js";import{u as L,v as $}from"./index-DNT3TRw4.js";import{P as V,I as P,a as he}from"./ProvinceRegencySelect-CH5Ynvej.js";import"./app-BWRYm4UO.js";import"./select-mkzc42j4.js";import"./useQuery-pHrLegI5.js";var A="Radio",[be,q]=D(A),[ge,fe]=be(A),O=f.forwardRef((s,n)=>{const{__scopeRadio:o,name:c,checked:p=!1,required:m,disabled:r,value:a="on",onCheck:j,...w}=s,[_,N]=f.useState(null),y=G(n,v=>N(v)),k=f.useRef(!1),i=_?!!_.closest("form"):!0;return e.jsxs(ge,{scope:o,checked:p,disabled:r,children:[e.jsx(F.button,{type:"button",role:"radio","aria-checked":p,"data-state":W(p),"data-disabled":r?"":void 0,disabled:r,value:a,...w,ref:y,onClick:R(s.onClick,v=>{p||j==null||j(),i&&(k.current=v.isPropagationStopped(),k.current||v.stopPropagation())})}),i&&e.jsx(ke,{control:_,bubbles:!k.current,name:c,value:a,checked:p,required:m,disabled:r,style:{transform:"translateX(-100%)"}})]})});O.displayName=A;var H="RadioIndicator",U=f.forwardRef((s,n)=>{const{__scopeRadio:o,forceMount:c,...p}=s,m=fe(H,o);return e.jsx(oe,{present:c||m.checked,children:e.jsx(F.span,{"data-state":W(m.checked),"data-disabled":m.disabled?"":void 0,...p,ref:n})})});U.displayName=H;var ke=s=>{const{control:n,checked:o,bubbles:c=!0,...p}=s,m=f.useRef(null),r=ie(o),a=de(n);return f.useEffect(()=>{const j=m.current,w=window.HTMLInputElement.prototype,N=Object.getOwnPropertyDescriptor(w,"checked").set;if(r!==o&&N){const y=new Event("click",{bubbles:c});N.call(j,o),j.dispatchEvent(y)}},[r,o,c]),e.jsx("input",{type:"radio","aria-hidden":!0,defaultChecked:o,...p,tabIndex:-1,ref:m,style:{...s.style,...a,position:"absolute",pointerEvents:"none",opacity:0,margin:0}})};function W(s){return s?"checked":"unchecked"}var je=["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"],C="RadioGroup",[Ne,Te]=D(C,[K,q]),Y=K(),X=q(),[we,_e]=Ne(C),Z=f.forwardRef((s,n)=>{const{__scopeRadioGroup:o,name:c,defaultValue:p,value:m,required:r=!1,disabled:a=!1,orientation:j,dir:w,loop:_=!0,onValueChange:N,...y}=s,k=Y(o),i=le(w),[v,u]=ce({prop:m,defaultProp:p,onChange:N});return e.jsx(we,{scope:o,name:c,required:r,disabled:a,value:v,onValueChange:u,children:e.jsx(pe,{asChild:!0,...k,orientation:j,dir:i,loop:_,children:e.jsx(F.div,{role:"radiogroup","aria-required":r,"aria-orientation":j,"data-disabled":a?"":void 0,dir:i,...y,ref:n})})})});Z.displayName=C;var J="RadioGroupItem",Q=f.forwardRef((s,n)=>{const{__scopeRadioGroup:o,disabled:c,...p}=s,m=_e(J,o),r=m.disabled||c,a=Y(o),j=X(o),w=f.useRef(null),_=G(n,w),N=m.value===p.value,y=f.useRef(!1);return f.useEffect(()=>{const k=v=>{je.includes(v.key)&&(y.current=!0)},i=()=>y.current=!1;return document.addEventListener("keydown",k),document.addEventListener("keyup",i),()=>{document.removeEventListener("keydown",k),document.removeEventListener("keyup",i)}},[]),e.jsx(me,{asChild:!0,...a,focusable:!r,active:N,children:e.jsx(O,{disabled:r,required:m.required,checked:N,...j,...p,name:m.name,ref:_,onCheck:()=>m.onValueChange(p.value),onKeyDown:R(k=>{k.key==="Enter"&&k.preventDefault()}),onFocus:R(p.onFocus,()=>{var k;y.current&&((k=w.current)==null||k.click())})})})});Q.displayName=J;var ye="RadioGroupIndicator",ee=f.forwardRef((s,n)=>{const{__scopeRadioGroup:o,...c}=s,p=X(o);return e.jsx(U,{...p,...c,ref:n})});ee.displayName=ye;var ae=Z,se=Q,ve=ee;const M=f.forwardRef(({className:s,...n},o)=>e.jsx(ae,{className:B("grid gap-2",s),...n,ref:o}));M.displayName=ae.displayName;const re=f.forwardRef(({className:s,...n},o)=>e.jsx(se,{ref:o,className:B("aspect-square h-4 w-4 rounded-full border border-primary text-primary shadow focus:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",s),...n,children:e.jsx(ve,{className:"flex items-center justify-center",children:e.jsx(ue,{className:"h-3.5 w-3.5 fill-primary"})})}));re.displayName=se.displayName;const I=[{id:1,label:"Peserta",value:"user",svg:e.jsx("path",{d:"M12 2C6.579 2 2 6.579 2 12s4.579 10 10 10 10-4.579 10-10S17.421 2 12 2zm0 5c1.727 0 3 1.272 3 3s-1.273 3-3 3c-1.726 0-3-1.272-3-3s1.274-3 3-3zm-5.106 9.772c.897-1.32 2.393-2.2 4.106-2.2h2c1.714 0 3.209.88 4.106 2.2C15.828 18.14 14.015 19 12 19s-3.828-.86-5.106-2.228z"})},{id:2,label:"Penyelenggara",value:"organizer",svg:e.jsx("path",{d:"M15 11h7v2h-7zm1 4h6v2h-6zm-2-8h8v2h-8zM4 19h10v-1c0-2.757-2.243-5-5-5H7c-2.757 0-5 2.243-5 5v1h2zm4-7c1.995 0 3.5-1.505 3.5-3.5S9.995 5 8 5 4.5 6.505 4.5 8.5 6.005 12 8 12z"})},{id:3,label:"Fasilitator",value:"facilitator",svg:e.jsxs(e.Fragment,{children:[e.jsx("g",{id:"SVGRepo_bgCarrier",strokeWidth:"0"}),e.jsx("g",{id:"SVGRepo_tracerCarrier",strokeLinecap:"round",strokeLinejoin:"round"}),e.jsx("g",{id:"SVGRepo_iconCarrier",children:e.jsx("path",{d:"M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"})})]})},{id:4,label:"Pengendali",value:"controller",svg:e.jsx("path",{d:"M7.5 6.5C7.5 8.981 9.519 11 12 11s4.5-2.019 4.5-4.5S14.481 2 12 2 7.5 4.019 7.5 6.5zM20 21h1v-1c0-3.859-3.141-7-7-7h-4c-3.86 0-7 3.141-7 7v1h17z"})}],Pe=2*1024*1024,te=d.object({name:d.string().min(1,"Nama tidak boleh kosong"),username:d.string().min(1,"Nama Pengguna tidak boleh kosong").transform(s=>s.toLowerCase().replaceAll(" ","").replaceAll("/","/")),email:d.string().email("Email tidak boleh kosong"),password:d.string().min(8,"Kata Sandi tidak boleh kosong").superRefine((s,n)=>{s.length<8&&n.addIssue({code:"custom",message:"Kata Sandi harus minimal 8 karakter",path:["password"]})}),password_confirmation:d.string().min(1,"Konfirmasi Kata Sandi tidak boleh kosong"),role:d.string().min(1,"Peran tidak boleh kosong"),phone:d.coerce.string().min(1,"Nomor Telepon tidak boleh kosong").max(20,"Nomor Telepon tidak boleh lebih dari 20 karakter"),gender:d.enum(["Laki-laki","Perempuan"],{required_error:"Gender harus dipilih",invalid_type_error:"Gender tidak valid"}),nip:d.string().length(18,"Nomor Induk Pegawai harus terdiri dari tepat 18 digit").regex(/^\d+$/,"Nomor Induk Pegawai harus terdiri dari digit saja"),employee_position:d.string().min(1,"Posisi Pegawai tidak boleh kosong"),institution:d.string().min(1,"Institusi tidak boleh kosong"),employee_status:d.string().min(1,"Status Pegawai tidak boleh kosong"),last_education:d.enum(["D1","D2","D3","D4","S1","S2","S3"],{required_error:"Pendidikan terakhir harus dipilih",invalid_type_error:"Pendidikan terakhir tidak valid"}),profile_picture:d.instanceof(File).superRefine((s,n)=>{s.size>Pe&&n.addIssue({code:d.ZodIssueCode.custom,message:"Ukuran file tidak boleh lebih dari 2MB"})})}),Se=te.extend({npwp:d.string().length(16,"NPWP harus terdiri dari tepat 16 digit").regex(/^\d+$/,"NPWP harus terdiri dari digit saja"),bank_number:d.coerce.number().min(1,"Nomor Bank tidak boleh kosong").transform(String),bank_name:d.string().min(1,"Nama Bank tidak boleh kosong"),owner_name:d.string().min(1,"Nama Pemilik tidak boleh kosong")}),Re=te.extend({golongan:d.enum(["1A","2A","3A","4A","5A","6A","7A","8A","9A","1B","2B","3B","4B","5B","6B","7B","8B","9B","1C","2C","3C","4C","5C","6C","7C","8C","9C","1D","2D","3D","4D","5D","6D","7D","8D","9D"],{invalid_type_error:"Golongan tidak valid"}),nakes_type:d.enum(["Tenaga Medis","Tenaga Psikologi Klinis","Tenaga Keperawatan","Tenaga Kebidanan","Tenaga Kefarmasian","Tenaga Kesehatan Masyarakat","Tenaga Kesehatan Lingkungan","Tenaga Gizi","Tenaga Keterapian Fisik","Tenaga Keteknisian Medis","Tenaga Teknologi Biomedika","Tenaga Kesehatan Tradisional"],{invalid_type_error:"Nakes tidak valid",required_error:"Nakes harus dipilih"}),residence_address:d.string().min(1,"Alamat tidak boleh kosong"),province:d.string().min(1,"Provinsi tidak boleh kosong"),regency:d.string().min(1,"Kabupaten/Kota tidak boleh kosong")}),Fe=I[0];let S=Fe;const ne=({roles:s,emitRoleChange:n,currentSelected:o})=>{let[c,p]=f.useState(o);const m=r=>{const{id:a,label:j,value:w,svg:_}=r,N=()=>{S=r,p(r),n(r)};return e.jsxs(t,{className:`w-full col-span-1 rounded-md border-2 pb-2 transition ease-in-out duration-300 ${c===r?"border-blue-500":"border-slate-200"}`,children:[e.jsxs("div",{className:"flex w-full gap-2 justify-center relative",children:[e.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",className:`w-10 h-10 rounded-full p-2 transition ease-in-out duration-300' ${c===r?"fill-blue-500":"fill-slate-400"}`,viewBox:"0 0 24 24",children:_}),e.jsx(re,{value:w,className:`absolute top-1 right-2 transition ease-in-out duration-300 ${c===r?"border-blue-500":""}`,id:`role${a}`,onClick:N})]}),e.jsx("p",{className:`text-center w-full transition ease-in-out duration-300 ${c===r?"text-blue-500":"text-slate-400"}`,children:j})]},a)};return e.jsx(e.Fragment,{children:s.map(m)})},Ae=({emitRoleChange:s,currentSelected:n})=>{const[o,c]=f.useState(!1),[p,m]=f.useState(""),r=E().props,a=r.errors,j=r.gender,w=r.last_education,_=r.golongan,N=r.nakes_type,y=r.csrf_token,k=g=>{const b=new FormData;b.append("email",g.email),b.append("password",g.password),b.append("role",S.value),b.append("name",g.name),b.append("username",g.username),b.append("phone",g.phone),b.append("password_confirmation",g.password_confirmation),b.append("gender",g.gender),b.append("nip",g.nip),b.append("employee_position",g.employee_position),b.append("employee_status",g.employee_status),b.append("institution",g.institution),b.append("profile_picture",g.profile_picture),b.append("last_education",g.last_education),b.append("_token",y),b.append("golongan",g.golongan),b.append("nakes_type",g.nakes_type),b.append("residence_address",g.residence_address),b.append("province",g.province),b.append("regency",g.regency),z.post("/register",b)},i=g=>{console.log(g)};let{form:v,errors:u,isSubmitting:x,setFields:h}=L({extend:$({schema:Re}),onSubmit:k,onError:i});return e.jsxs("form",{method:"POST",ref:v,children:[e.jsxs("div",{className:`flex flex-col gap-3 fade-in ${o?"hidden":""}`,children:[e.jsx("h1",{className:"text-2xl font-semibold",children:"Daftar"}),e.jsx("h3",{className:"text-lg",children:"Daftar sebagai"}),e.jsx(M,{name:"role",defaultValue:n.value,className:"grid grid-cols-4 max-md:grid-cols-2 gap-3 p-2",children:e.jsx(ne,{roles:I,emitRoleChange:s,currentSelected:n})}),e.jsx(t,{htmlFor:"name",children:"Nama"}),e.jsx(l,{type:"text",name:"name",id:"name",placeholder:"Masukkan Nama Anda",className:"w-full rounded-lg border-2 border-slate-500 p-3 text-slate-800 focus:border-blue-500"}),e.jsx("span",{className:"text-red-500 text-sm",children:u().name||a.name}),e.jsx(t,{htmlFor:"email",children:"Email"}),e.jsx(l,{type:"email",name:"email",id:"email",placeholder:"Masukkan Email Anda",className:"w-full rounded-lg border-2 border-slate-500 p-3 text-slate-800 focus:border-blue-500"}),e.jsx("span",{className:"text-red-500 text-sm",children:u().email||a.email}),e.jsx(t,{htmlFor:"username",children:"Nama Pengguna"}),e.jsx(l,{type:"text",name:"username",id:"username",placeholder:"Masukkan Nama Pengguna Anda",className:"w-full rounded-lg border-2 border-slate-500 p-3 text-slate-800 focus:border-blue-500"}),e.jsx("span",{className:"text-red-500 text-sm",children:u().username||a.username}),e.jsx(t,{htmlFor:"phone",children:"Nomor Telepon"}),e.jsx(l,{type:"number",name:"phone",id:"phone",placeholder:"Masukkan Nomor Telepon Anda",className:"w-full rounded-lg border-2 border-slate-500 p-3 text-slate-800 focus:border-blue-500"}),e.jsx("span",{className:"text-red-500 text-sm",children:u().phone||a.phone}),e.jsx(t,{htmlFor:"password",children:"Kata Sandi"}),e.jsx(l,{type:"password",name:"password",id:"password",placeholder:"Masukkan Kata Sandi Anda",className:"w-full rounded-lg border-2 border-slate-500 p-3 text-slate-800 focus:border-blue-500"}),e.jsx("span",{className:"text-red-500 text-sm",children:u().password||a.password}),e.jsx(t,{htmlFor:"password_confirmation",children:"Konfirmasi Kata Sandi"}),e.jsx(l,{type:"password",name:"password_confirmation",id:"password_confirmation",placeholder:"Konfirmasi Kata Sandi Anda",className:"w-full rounded-lg border-2 border-slate-500 p-3 text-slate-800 focus:border-blue-500"}),e.jsx("span",{className:"text-red-500 text-sm",children:u().password_confirmation||a.password_confirmation}),e.jsx("span",{className:"self-end rounded-xl px-5 cursor-pointer py-2 bg-blue-500 text-white hover:bg-blue-400 transition-all duration-200",onClick:()=>c(!0),children:"Next"})]}),e.jsxs("div",{className:`flex flex-col gap-3 transition ease-in-out duration-300 ${o?"fade-in":"fade-out hidden"}`,children:[e.jsx("h1",{className:"text-2xl font-semibold",children:"Data Pribadi"}),e.jsx(V,{onFileChange:m}),e.jsx("span",{className:"text-red-500 text-sm",children:u().profile_picture||a.profile_picture}),e.jsx(t,{htmlFor:"gender",children:"Gender"}),e.jsx(P,{items:j,name:"gender",placeholder:"Gender"}),e.jsx("span",{className:"text-red-500 text-sm",children:u().gender||a.gender}),e.jsx(t,{htmlFor:"nip",children:"Nomor Induk Pegawai"}),e.jsx(l,{type:"text",name:"nip",id:"nip",placeholder:"Masukkan Nomor Induk Pegawai Anda",className:"w-full rounded-lg border-2 border-slate-500 p-3 text-slate-800 focus:border-blue-500"}),e.jsx("span",{className:"text-red-500 text-sm",children:u().nip||a.nip}),e.jsx(t,{htmlFor:"employee_position",children:"Posisi Pegawai"}),e.jsx(l,{type:"text",name:"employee_position",id:"employee_position",placeholder:"Masukkan Posisi Pegawai Anda",className:"w-full rounded-lg border-2 border-slate-500 p-3 text-slate-800 focus:border-blue-500"}),e.jsx("span",{className:"text-red-500 text-sm",children:u().employee_position||a.employee_position}),e.jsx(t,{htmlFor:"institution",children:"Institusi"}),e.jsx(l,{type:"text",name:"institution",id:"institution",placeholder:"Masukkan Institusi Anda",className:"w-full rounded-lg border-2 border-slate-500 p-3 text-slate-800 focus:border-blue-500"}),e.jsx("span",{className:"text-red-500 text-sm",children:u().institution||a.institution}),e.jsx(t,{htmlFor:"employee_status",children:"Status Pegawai"}),e.jsx(l,{type:"text",name:"employee_status",id:"employee_status",placeholder:"Masukkan Status Pegawai Anda",className:"w-full rounded-lg border-2 border-slate-500 p-3 text-slate-800 focus:border-blue-500"}),e.jsx("span",{className:"text-red-500 text-sm",children:u().employee_status||a.employee_status}),e.jsx(t,{htmlFor:"last_education",children:"Pendidikan Terakhir"}),e.jsx(P,{items:w,name:"last_education",placeholder:"Pendidikan Terakhir"}),e.jsx("span",{className:"text-red-500 text-sm",children:u().last_education||a.last_education}),e.jsx(t,{htmlFor:"golongan",children:"Golongan"}),e.jsx(P,{items:_,name:"golongan",placeholder:"Golongan"}),e.jsx("span",{className:"text-red-500 text-sm",children:u().golongan||a.golongan}),e.jsx(t,{htmlFor:"nakes_type",children:"Nakes"}),e.jsx(P,{items:N,name:"nakes_type",placeholder:"Nakes"}),e.jsx("span",{className:"text-red-500 text-sm",children:u().nakes_type||a.nakes_type}),e.jsx(t,{htmlFor:"residence_address",children:"Alamat"}),e.jsx(l,{type:"text",name:"residence_address",id:"residence_address",placeholder:"Masukkan Alamat Anda",className:"w-full rounded-lg border-2 border-slate-500 p-3 text-slate-800 focus:border-blue-500"}),e.jsx("span",{className:"text-red-500 text-sm",children:u().residence_address||a.residence_address}),e.jsx(he,{errorsProv:u().province,errorsRegen:u().regency}),e.jsxs("div",{className:"flex gap-2 w-full justify-end",children:[e.jsx("span",{className:"rounded-xl px-5 cursor-pointer py-1 text-sm flex items-center bg-blue-500 text-white hover:bg-blue-400 transition-all duration-200",onClick:()=>c(!1),children:"Back"}),e.jsx(T,{type:"submit",className:"rounded-xl px-5 cursor-pointer py-2 bg-blue-500 text-white hover:bg-blue-400 transition-all duration-200",disabled:x(),children:"Daftar"})]})]})]})},Ce=({emitRoleChange:s,currentSelected:n})=>{const[o,c]=f.useState(!1),[p,m]=f.useState(""),r=E().props,a=r.errors,j=r.gender,w=r.last_education,_=r.csrf_token,N=x=>{const h=new FormData;h.append("email",x.email),h.append("password",x.password),h.append("role",S.value),h.append("name",x.name),h.append("username",x.username),h.append("phone",x.phone),h.append("password_confirmation",x.password_confirmation),h.append("gender",x.gender),h.append("nip",x.nip),h.append("employee_position",x.employee_position),h.append("employee_status",x.employee_status),h.append("institution",x.institution),h.append("profile_picture",x.profile_picture),h.append("last_education",x.last_education),h.append("_token",_),h.append("npwp",x.npwp),h.append("bank_number",x.bank_number),h.append("bank_name",x.bank_name),h.append("owner_name",x.owner_name),z.post("/register",h)},y=x=>{console.log(x)},{form:k,errors:i,isSubmitting:v,setFields:u}=L({extend:$({schema:Se}),onSubmit:N,onError:y});return e.jsxs("form",{method:"POST",ref:k,children:[e.jsxs("div",{className:`flex flex-col gap-3 fade-in ${o?"hidden":""}`,children:[e.jsx("h1",{className:"text-2xl font-semibold",children:"Daftar"}),e.jsx("h3",{className:"text-lg",children:"Daftar sebagai"}),e.jsx(M,{name:"role",defaultValue:n.value,className:"grid grid-cols-4 max-md:grid-cols-2 gap-3 p-2",children:e.jsx(ne,{roles:I,emitRoleChange:s,currentSelected:n})}),e.jsx(t,{htmlFor:"name",children:"Nama"}),e.jsx(l,{type:"text",name:"name",id:"name",placeholder:"Masukkan Nama Anda",className:"w-full rounded-lg border-2 border-slate-500 p-3 text-slate-800 focus:border-blue-500"}),e.jsx("span",{className:"text-red-500 text-sm",children:i().name||a.name}),e.jsx(t,{htmlFor:"email",children:"Email"}),e.jsx(l,{type:"email",name:"email",id:"email",placeholder:"Masukkan Email Anda",className:"w-full rounded-lg border-2 border-slate-500 p-3 text-slate-800 focus:border-blue-500"}),e.jsx("span",{className:"text-red-500 text-sm",children:i().email||a.email}),e.jsx(t,{htmlFor:"username",children:"Nama Pengguna"}),e.jsx(l,{type:"text",name:"username",id:"username",placeholder:"Masukkan Nama Pengguna Anda",className:"w-full rounded-lg border-2 border-slate-500 p-3 text-slate-800 focus:border-blue-500"}),e.jsx("span",{className:"text-red-500 text-sm",children:i().username||a.username}),e.jsx(t,{htmlFor:"phone",children:"Nomor Telepon"}),e.jsx(l,{type:"number",name:"phone",id:"phone",placeholder:"Masukkan Nomor Telepon Anda",className:"w-full rounded-lg border-2 border-slate-500 p-3 text-slate-800 focus:border-blue-500"}),e.jsx("span",{className:"text-red-500 text-sm",children:i().phone||a.phone}),e.jsx(t,{htmlFor:"password",children:"Kata Sandi"}),e.jsx(l,{type:"password",name:"password",id:"password",placeholder:"Masukkan Kata Sandi Anda",className:"w-full rounded-lg border-2 border-slate-500 p-3 text-slate-800 focus:border-blue-500"}),e.jsx("span",{className:"text-red-500 text-sm",children:i().password||a.password}),e.jsx(t,{htmlFor:"password_confirmation",children:"Konfirmasi Kata Sandi"}),e.jsx(l,{type:"password",name:"password_confirmation",id:"password_confirmation",placeholder:"Konfirmasi Kata Sandi Anda",className:"w-full rounded-lg border-2 border-slate-500 p-3 text-slate-800 focus:border-blue-500"}),e.jsx("span",{className:"text-red-500 text-sm",children:i().password_confirmation||a.password_confirmation}),e.jsx("span",{className:"self-end rounded-xl px-5 cursor-pointer py-2 bg-blue-500 text-white hover:bg-blue-400 transition-all duration-200",onClick:()=>c(!0),children:"Next"})]}),e.jsxs("div",{className:`flex flex-col gap-3 transition ease-in-out duration-300 ${o?"fade-in":"fade-out hidden"}`,children:[e.jsx("h1",{className:"text-2xl font-semibold",children:"Data Pribadi"}),e.jsx(V,{onFileChange:m}),e.jsx("span",{className:"text-red-500 text-sm",children:i().profile_picture||a.profile_picture}),e.jsx(t,{htmlFor:"gender",children:"Gender"}),e.jsx(P,{items:j,name:"gender",placeholder:"Gender"}),e.jsx("span",{className:"text-red-500 text-sm",children:i().gender||a.gender}),e.jsx(t,{htmlFor:"nip",children:"Nomor Induk Pegawai"}),e.jsx(l,{type:"text",name:"nip",id:"nip",placeholder:"Masukkan Nomor Induk Pegawai Anda",className:"w-full rounded-lg border-2 border-slate-500 p-3 text-slate-800 focus:border-blue-500"}),e.jsx("span",{className:"text-red-500 text-sm",children:i().nip||a.nip}),e.jsx(t,{htmlFor:"employee_position",children:"Posisi Pegawai"}),e.jsx(l,{type:"text",name:"employee_position",id:"employee_position",placeholder:"Masukkan Posisi Pegawai Anda",className:"w-full rounded-lg border-2 border-slate-500 p-3 text-slate-800 focus:border-blue-500"}),e.jsx("span",{className:"text-red-500 text-sm",children:i().employee_position||a.employee_position}),e.jsx(t,{htmlFor:"institution",children:"Institusi"}),e.jsx(l,{type:"text",name:"institution",id:"institution",placeholder:"Masukkan Institusi Anda",className:"w-full rounded-lg border-2 border-slate-500 p-3 text-slate-800 focus:border-blue-500"}),e.jsx("span",{className:"text-red-500 text-sm",children:i().institution||a.institution}),e.jsx(t,{htmlFor:"employee_status",children:"Status Pegawai"}),e.jsx(l,{type:"text",name:"employee_status",id:"employee_status",placeholder:"Masukkan Status Pegawai Anda",className:"w-full rounded-lg border-2 border-slate-500 p-3 text-slate-800 focus:border-blue-500"}),e.jsx("span",{className:"text-red-500 text-sm",children:i().employee_status||a.employee_status}),e.jsx(t,{htmlFor:"last_education",children:"Pendidikan Terakhir"}),e.jsx(P,{items:w,name:"last_education",placeholder:"Pendidikan Terakhir"}),e.jsx("span",{className:"text-red-500 text-sm",children:i().last_education||a.last_education}),e.jsx(t,{htmlFor:"npwp",children:"NPWP"}),e.jsx(l,{type:"text",name:"npwp",id:"npwp",placeholder:"Masukkan NPWP Anda",className:"w-full rounded-lg border-2 border-slate-500 p-3 text-slate-800 focus:border-blue-500"}),e.jsx("span",{className:"text-red-500 text-sm",children:i().npwp||a.npwp}),e.jsx(t,{htmlFor:"bank_number",children:"Nomor Bank"}),e.jsx(l,{type:"number",name:"bank_number",id:"bank_number",placeholder:"Masukkan Nomor Bank Anda",className:"w-full rounded-lg border-2 border-slate-500 p-3 text-slate-800 focus:border-blue-500"}),e.jsx("span",{className:"text-red-500 text-sm",children:i().bank_number||a.bank_number}),e.jsx(t,{htmlFor:"bank_name",children:"Nama Bank"}),e.jsx(l,{type:"text",name:"bank_name",id:"bank_name",placeholder:"Masukkan Nama Bank Anda",className:"w-full rounded-lg border-2 border-slate-500 p-3 text-slate-800 focus:border-blue-500"}),e.jsx("span",{className:"text-red-500 text-sm",children:i().bank_name||a.bank_name}),e.jsx(t,{htmlFor:"owner_name",children:"Nama Pemilik"}),e.jsx(l,{type:"text",name:"owner_name",id:"owner_name",placeholder:"Masukkan Nama Pemilik Anda",className:"w-full rounded-lg border-2 border-slate-500 p-3 text-slate-800 focus:border-blue-500"}),e.jsx("span",{className:"text-red-500 text-sm",children:i().owner_name||a.owner_name}),e.jsxs("div",{className:"flex gap-2 w-full justify-end",children:[e.jsx("span",{className:"rounded-xl px-5 cursor-pointer py-1 text-sm flex items-center bg-blue-500 text-white hover:bg-blue-400 transition-all duration-200",onClick:()=>c(!1),children:"Back"}),e.jsx(T,{type:"submit",className:"rounded-xl px-5 cursor-pointer py-2 bg-blue-500 text-white hover:bg-blue-400 transition-all duration-200",disabled:v(),children:"Daftar"})]})]})]})};function ze(){const[s,n]=f.useState(S);return e.jsxs(e.Fragment,{children:[e.jsx(xe,{title:"Daftar"}),e.jsxs("div",{className:"flex h-[calc(100vh-6.7vh)] max-md:h-fit gap-3 max-md:px-5 overflow-hidden",children:[e.jsx("div",{className:"py-5 text-center w-2/3 max-md:hidden bg-[url('/public/storage/wallpaper1.jpeg')] bg-no-repeat bg-cover bg-center rounded-tr"}),e.jsx("div",{className:"p-5 text-left w-2/3 max-md:w-full overflow-y-auto",children:(s==null?void 0:s.value)==="facilitator"?e.jsx(Ce,{emitRoleChange:n,currentSelected:s}):e.jsx(Ae,{emitRoleChange:n,currentSelected:s})})]})]})}export{ze as default};