import{d as m,u as p,a as h,t as b,r as _,o as g,c as f,b as o,e as a,f as v,g as n,w as c,F as k,h as F,i as x,j as C}from"./index.8726c92d.js";import{C as s}from"./js.cookie.dabc28e0.js";const E={class:"mb-2"},B={class:"mb-4"},w=o("button",{class:"transition-colors px-4 py-1 mr-2 border-black border rounded-lg hover:bg-black hover:text-white"},"\u4FEE\u6539\u6635\u79F0",-1),D=o("button",{class:"transition-colors px-4 py-1 mr-2 border-black border rounded-lg hover:bg-black hover:text-white"},"\u4FEE\u6539\u5BC6\u7801",-1),A=m({__name:"Home",setup(y){const t=p(),l=h(),{userName:i}=b(t),r=_("\u83B7\u53D6\u4E2D");g(()=>{fetch("https://api.amarea.cn/getip/").then(e=>e.text()).then(e=>{r.value=e}).catch(e=>{r.value="\u83B7\u53D6\u5931\u8D25",console.log(e)})});function d(){t.login=!1,t.userId="",t.userName="",s.remove("login"),s.remove("userid"),s.remove("username"),s.remove("token"),l.success("\u6CE8\u9500\u6210\u529F"),C.push("/login")}return(e,N)=>{const u=F("RouterLink");return x(),f(k,null,[o("p",E,"\u6B22\u8FCE\uFF1A"+a(v(i)),1),o("p",B,"IP\u5730\u5740\uFF1A"+a(r.value),1),o("button",{class:"transition-colors px-4 py-1 mr-2 border-black border rounded-lg hover:bg-black hover:text-white",onClick:d},"\u6CE8\u9500"),n(u,{to:"/edit/name"},{default:c(()=>[w]),_:1}),n(u,{to:"/edit/password"},{default:c(()=>[D]),_:1})],64)}}});export{A as default};