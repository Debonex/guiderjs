"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[367],{8243:(e,t,r)=>{r.d(t,{Z:()=>o});var a=r(5918),n=r(9231);const o=e=>{const{guider:t,stepIdx:r}=(0,n.useContext)(a.Z);return n.createElement("div",{className:"bg-card outline-primary max-w-[320px] rounded-md shadow-sm outline outline-1"},n.createElement("div",{className:"flex justify-between px-4 py-2"},n.createElement("div",{className:"font-bold"},e.title),!e.hideButton&&n.createElement("div",{className:"cursor-pointer font-bold",onClick:()=>t.current.exit()},"\xd7")),n.createElement("div",{className:"px-4"},e.children),!e.hideButton&&n.createElement("div",{className:"border-primary flex border-t py-4 px-4"},0!==r&&n.createElement("button",{className:"button button--primary",onClick:()=>t.current.back()},"Back"),n.createElement("button",{className:"button button--primary ml-auto",onClick:()=>t.current.next()},"Next")))}},5918:(e,t,r)=>{r.d(t,{Z:()=>a});const a=(0,r(9231).createContext)(null)},5993:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>b,contentTitle:()=>p,default:()=>E,frontMatter:()=>u,metadata:()=>v,toc:()=>x});var a=r(7583),n=r(9231),o=r(4852),s=r(3990),i=r(1889),c=r(9764),l=r(8243),m=r(5918);const d=()=>{const e=(0,n.useRef)();(0,n.useEffect)((()=>{e.current.start()}),[]);const t=[{key:"target",target:".target"}],[r,a]=(0,n.useState)(400);return n.createElement(m.Z.Provider,{value:{guider:e,stepIdx:0,steps:t}},n.createElement("div",{className:"p-2"},"Animation duration",n.createElement(c.ZP,{value:r,onChange:(e,t)=>a(t),valueLabelDisplay:"auto",valueLabelFormat:e=>`${e}ms`,max:2e3}),n.createElement(i.Z,{variant:"contained",onClick:()=>e.current.start()},"rerun")),n.createElement("div",{className:"relative flex h-40 items-center justify-center p-4"},n.createElement("div",{className:"target"},"target"),n.createElement(s.Z,{ref:e,steps:t,popoverAnimationDuration:`${r}ms`,popover:n.createElement(l.Z,{title:"Popover",hideButton:!0},n.createElement("div",{className:"pb-4"},"This is popover"))})))},u={},p=void 0,v={unversionedId:"Demo",id:"Demo",title:"Demo",description:"",source:"@site/docs/Demo.mdx",sourceDirName:".",slug:"/Demo",permalink:"/guiderjs/docs/Demo",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"Animations",permalink:"/guiderjs/docs/Animations"},next:{title:"Get started",permalink:"/guiderjs/docs/React/Get started"}},b={},x=[],f={toc:x};function E(e){let{components:t,...r}=e;return(0,o.kt)("wrapper",(0,a.Z)({},f,r,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("p",null,"Here is a online interactive demo."),(0,o.kt)(d,{mdxType:"Demo"}))}E.isMDXComponent=!0}}]);