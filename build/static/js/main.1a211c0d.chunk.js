(this.webpackJsonpphonebook2=this.webpackJsonpphonebook2||[]).push([[0],{14:function(e,n,t){e.exports=t(37)},36:function(e,n,t){},37:function(e,n,t){"use strict";t.r(n);var a=t(0),o=t.n(a),c=t(13),r=t.n(c),u=t(3),l=function(e){var n=e.person,t=e.remove;return o.a.createElement("li",{className:"person",key:n.id},n.name," ",n.number,o.a.createElement("button",{onClick:t}," delete "))},i=t(2),s=t.n(i),m="http://localhost:3001/api/persons",f=function(){return s.a.get(m).then((function(e){return e.data}))},d=function(e){return s.a.post(m,e).then((function(e){return e.data}))},p=function(e){return s.a.delete("".concat(m,"/").concat(e)).then((function(e){return e.data}))},b=function(){var e=Object(a.useState)([]),n=Object(u.a)(e,2),t=n[0],c=n[1],r=Object(a.useState)(""),i=Object(u.a)(r,2),s=i[0],m=i[1],b=Object(a.useState)(""),h=Object(u.a)(b,2),E=h[0],v=h[1],g=Object(a.useState)(null),j=Object(u.a)(g,2),k=j[0],O=j[1];Object(a.useEffect)((function(){f().then((function(e){c(e)})).catch((function(e){O("Error occurred"),setTimeout((function(){O(null)}),5e3)}))}),[]);var y=function(e){var n=e.message;return null===n?null:o.a.createElement("div",{className:"error"},n)};return o.a.createElement("div",null,o.a.createElement("h2",null,"Phonebook"),o.a.createElement(y,{message:k}),o.a.createElement("form",{onSubmit:function(e){e.preventDefault();var n={name:s,number:E};console.log("Addind a person: ",n),t.some((function(e){return e.name===s}))?window.alert("".concat(s," is already in phonebook")):d(n).then((function(e){c(t.concat(e)),m(""),v(""),O("Added '".concat(s)),setTimeout((function(){O(null)}),5e3)})).catch((function(e){console.log("fail",e)}))}},o.a.createElement("div",null," name: ",o.a.createElement("input",{value:s,onChange:function(e){m(e.target.value)}})," "),o.a.createElement("div",null," number: ",o.a.createElement("input",{value:E,onChange:function(e){v(e.target.value)}})," "),o.a.createElement("div",null,o.a.createElement("button",{type:"submit"},"add"))),o.a.createElement("h2",null,"Numbers"),o.a.createElement("ul",null,t.map((function(e){return o.a.createElement(l,{key:e.id,person:e,remove:function(){return function(e){var n=t.find((function(n){return n.id===e}));p(e).then((function(a){c(t.filter((function(n){return n.id!==e}))),console.log("Deleting a person: ",n)})).catch((function(e){e.response&&console.log(e.response.data)}))}(e.id)}})}))))};t(36);r.a.render(o.a.createElement(b,null),document.getElementById("root"))}},[[14,1,2]]]);
//# sourceMappingURL=main.1a211c0d.chunk.js.map