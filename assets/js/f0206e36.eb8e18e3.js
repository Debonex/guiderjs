"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[367],{8243:(e,t,a)=>{a.d(t,{Z:()=>o});var n=a(5918),r=a(9231);const o=e=>{const{guider:t,stepIdx:a}=(0,r.useContext)(n.Z);return r.createElement("div",{className:"bg-card outline-primary max-w-[320px] rounded-md shadow-sm outline outline-1"},r.createElement("div",{className:"flex justify-between px-4 py-2"},r.createElement("div",{className:"font-bold"},e.title),!e.hideButton&&r.createElement("div",{className:"cursor-pointer font-bold",onClick:()=>t.current.exit()},"\xd7")),r.createElement("div",{className:"px-4"},e.children),!e.hideButton&&r.createElement("div",{className:"border-primary flex border-t py-4 px-4"},0!==a&&r.createElement("button",{className:"button button--primary",onClick:()=>t.current.back()},"Back"),r.createElement("button",{className:"button button--primary ml-auto",onClick:()=>t.current.next()},"Next")))}},5918:(e,t,a)=>{a.d(t,{Z:()=>n});const n=(0,a(9231).createContext)(null)},5088:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>h,contentTitle:()=>f,default:()=>C,frontMatter:()=>g,metadata:()=>x,toc:()=>k});var n=a(7583),r=a(9231),o=a(4852),l=a(3990),s=a(5290),i=a(5910),c=a(7530),m=a(8243),u=a(5918),d=a(3858),p=a(1806),v=a(4092);const b=function(e){return r.createElement(r.Fragment,null,r.createElement(i.Z,null,e.label),r.createElement(v.Z,{row:!0,value:e.value,onChange:(t,a)=>e.onChange(a)},e.values.map((e=>r.createElement(d.Z,{key:e,value:e,control:r.createElement(p.Z,null),label:e})))))},E=()=>{const e=(0,r.useRef)();(0,r.useEffect)((()=>{e.current.start()}),[]);const t=[{key:"target",target:".target"}],[a,n]=(0,r.useState)(.5),[o,d]=(0,r.useState)(400),[p,v]=(0,r.useState)("flip-y"),[E,g]=(0,r.useState)("auto"),[f,x]=(0,r.useState)("middle");return r.createElement(u.Z.Provider,{value:{guider:e,stepIdx:0,steps:t}},r.createElement("div",{className:"p-2 md:p-4"},r.createElement(i.Z,null,"popoverAnimationDuration"),r.createElement(c.ZP,{value:o,onChange:(e,t)=>d(t),valueLabelDisplay:"auto",valueLabelFormat:e=>`${e}ms`,max:2e3}),r.createElement(b,{value:p,values:["flip-y","fade","scale"],label:"popoverAnimation",onChange:e=>v(e)}),r.createElement(b,{value:E,values:["auto","target-bottom","target-left","target-right","target-top"],label:"popoverPosition",onChange:e=>g(e)}),r.createElement(b,{value:f,values:["start","middle","end"],label:"popoverAnchor",onChange:e=>x(e)})),r.createElement(s.Z,{className:"!mb-2",variant:"contained",onClick:()=>e.current.start()},"rerun"),r.createElement("div",{className:"relative flex h-40 items-center justify-center p-4"},r.createElement("div",{className:"target p-4"},"target"),r.createElement(l.Z,{ref:e,steps:t,overlayOpacity:a,popoverAnimationDuration:`${o}ms`,popoverAnimation:p,popoverPosition:E,popoverAnchor:f,popover:r.createElement(m.Z,{title:"Popover",hideButton:!0},r.createElement("div",{className:"pb-4"},"This is popover"))})))},g={},f=void 0,x={unversionedId:"Demo",id:"Demo",title:"Demo",description:"Here is a online interactive demo.",source:"@site/docs/Demo.mdx",sourceDirName:".",slug:"/Demo",permalink:"/guiderjs/docs/Demo",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"Animations",permalink:"/guiderjs/docs/Animations"},next:{title:"Get started",permalink:"/guiderjs/docs/React/Get started"}},h={},k=[],y={toc:k};function C(e){let{components:t,...a}=e;return(0,o.kt)("wrapper",(0,n.Z)({},y,a,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("p",null,"Here is a online interactive demo."),(0,o.kt)(E,{mdxType:"Demo"}))}C.isMDXComponent=!0}}]);