(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[931],{2311:function(e,t,a){Promise.resolve().then(a.bind(a,3672))},3672:function(e,t,a){"use strict";a.r(t),a.d(t,{default:function(){return R}});var n=a(7437),l=a(2265),i=a(8447),s=a.n(i),r=a(6470),o=a.n(r);function d(e){let{children:t,variant:a,onClick:l}=e,i=o()[a];return(0,n.jsx)("button",{className:[o().button,i].join(" "),onClick:l,children:t})}var c=a(3426),u=a.n(c);let m=(0,l.forwardRef)((e,t)=>{let{value:a,placeholder:l,onChange:i,...s}=e;return(0,n.jsx)("input",{ref:t,...s,className:[u().input,u().textInput].join(" "),type:"text",value:a,placeholder:l,onChange:i})});m.displayName="TextInput";let h=(0,l.forwardRef)((e,t)=>{let{value:a,onChange:l,...i}=e;return(0,n.jsx)("input",{ref:t,...i,className:[u().input,u().dateInput].join(" "),type:"date",value:a,onChange:l})});h.displayName="DateInput";var _=a(5243),p=a.n(_);class b{static parse(e){if(!e)return;let[t,a,n]=e.split("-").map(e=>parseInt(e,10));return new b(new Date(t,a-1,n))}get cloneDate(){return new Date(this.date.getTime())}toString(){let e=(this.date.getMonth()+1).toString().padStart(2,"0"),t=this.date.getDate().toString().padStart(2,"0");return"".concat(this.date.getFullYear(),"-").concat(e,"-").concat(t)}getDateInXMonth(e){let t=(this.date.getMonth()+e)%12;return new b(new Date(this.cloneDate.setMonth(t)))}getTime(){return this.date.getTime()}isAfter(e){return this.date.getTime()>e.getTime()}constructor(e=new Date){this.date=e}}function x(e){var t;let{data:a,onChange:l,onSubmit:i}=e;return(0,n.jsxs)("form",{className:p().form,onSubmit:e=>{e.preventDefault(),i(a)},children:[(0,n.jsxs)("div",{className:p().formGroup,children:[(0,n.jsxs)("div",{className:[p().inputForm,p().inputFormName].join(" "),children:[(0,n.jsx)("label",{className:p().inputLabel,children:"タスク"}),(0,n.jsx)(m,{className:p().inputField,type:"text",value:a.name,placeholder:"タスク名を入力",onChange:e=>l({name:e.target.value})})]}),(0,n.jsxs)("div",{className:p().inputForm,children:[(0,n.jsx)("label",{className:p().inputLabel,children:"期限日"}),(0,n.jsx)(h,{className:p().inputField,type:"date",value:null===(t=a.deadline)||void 0===t?void 0:t.toString(),placeholder:"タスク名を入力",onChange:e=>l({deadline:b.parse(e.target.value)})})]})]}),(0,n.jsx)("div",{className:p().formFooter,children:(0,n.jsx)(d,{variant:"primary",children:"追加"})})]})}var f=a(7386),j=a.n(f),C=a(6920),v=a(5079);let N=e=>e.name?e.deadline?e.deadline.isAfter(new b)?"":"期限日は今日以降を指定してください":"期限日を入力してください":"タスク名を入力してください";var g=a(1342),k=a.n(g);function w(e){let{checked:t,onClick:a}=e,i=(0,l.useRef)(null);return(0,n.jsxs)("div",{ref:i,className:[k().checkbox,t?k().checked:""].join(" "),onClick:()=>{a(),t||i.current.classList.add(k().checked)},children:[(0,n.jsx)(C.G,{icon:v.LEp}),(0,n.jsx)("input",{className:k().checkboxInput,type:"checkbox"})]})}var D=a(8868),F=a.n(D);function S(e){let{children:t,type:a,defaultValue:i,className:s,onEdit:r}=e,o=(0,l.useRef)(null),[d,c]=(0,l.useState)(!1),[u,_]=(0,l.useState)(i),p=(0,l.useMemo)(()=>({text:(0,n.jsx)(m,{ref:o,className:s,placeholder:"タスク名を入力",value:u,onChange:e=>_(e.target.value),onBlur:()=>{c(!1),r(u)}}),date:(0,n.jsx)(h,{ref:o,className:s,value:u,onChange:e=>_(e.target.value),onBlur:()=>{c(!1),r(u)}})})[a],[a,u,s,r]);return(0,n.jsxs)("div",{className:[F().editableField,s].join(" "),onClick:()=>{c(!0),setTimeout(()=>{o.current.focus(),"date"===a&&o.current.showPicker()},300)},children:[(0,n.jsx)("div",{className:d?F().show:F().hide,children:p}),(0,n.jsx)("div",{className:d?F().hide:F().show,children:t})]})}function T(e){let{data:t,setting:a,onComplete:l,onChangeSetting:i,onEdit:s,onDelete:r}=e;return(0,n.jsxs)("div",{className:j().container,children:[(0,n.jsx)("div",{className:j().setting,children:(0,n.jsxs)("label",{children:[(0,n.jsx)("input",{type:"checkbox",onChange:e=>{i({showCompleted:e.target.checked})}}),"完了タスクを表示"]})}),(0,n.jsxs)("div",{className:j().tableHeader,children:[(0,n.jsx)("div",{className:j().tableHeaderCell}),(0,n.jsx)("div",{className:[j().tableHeaderCell,j().tableHeaderCellTask].join(" "),children:"タスク"}),(0,n.jsx)("div",{className:j().tableHeaderCell,children:"期限日"}),(0,n.jsx)("div",{className:j().tableHeaderCell})]}),(0,n.jsx)("div",{className:j().tableBody,children:t.map(e=>(0,n.jsx)(I,{data:e,setting:a,onComplete:l,onDelete:r,onEdit:s},e.id))})]})}function I(e){let{data:t,setting:a,onComplete:i,onEdit:s,onDelete:r}=e,o=(0,l.useRef)(null);return(0,n.jsxs)("div",{ref:o,className:j().tableRow,children:[(0,n.jsx)("div",{className:[j().tableCell,j().tableCellCenter].join(" "),children:(0,n.jsx)(w,{checked:t.completed,onClick:()=>{a.showCompleted?i(t):(setTimeout(()=>{i(t)},800),o.current.classList.add(j().completedRow))}})}),(0,n.jsx)("div",{className:[j().tableCell,j().tableCellTask].join(" "),children:(0,n.jsx)(S,{type:"text",defaultValue:t.name,onEdit:e=>{let a={...t,name:e},n=N(a);if(n){alert(n);return}s(a)},children:t.name})}),(0,n.jsx)("div",{className:j().tableCell,children:(0,n.jsx)(S,{type:"date",defaultValue:t.deadline.toString(),onEdit:e=>{let a={...t,deadline:b.parse(e)},n=N(a);if(n){alert(n);return}s(a)},children:t.deadline.toString()})}),(0,n.jsx)("div",{className:[j().tableCell,j().tableCellCenter].join(" "),children:(0,n.jsx)("div",{className:j().iconContainer,children:(0,n.jsx)(C.G,{className:j().icon,icon:v.$aW,onClick:()=>r(t)})})})]})}let y=[{id:1,name:"Task 1",deadline:new b().getDateInXMonth(1)},{id:2,name:"Task 2",deadline:new b().getDateInXMonth(2)},{id:3,name:"Task 3",deadline:new b().getDateInXMonth(3)}];function R(){let[e,t]=(0,l.useState)({name:"",deadline:new b().getDateInXMonth(1)}),[a,i]=(0,l.useState)({showCompleted:!1}),[r,o]=(0,l.useState)(y),d=Math.max(...r.map(e=>e.id)),c=r.filter(e=>!e.completed||a.showCompleted),u=e=>{let t=r.reduce((t,a)=>a.id===e.id?[...t,e]:[...t,a],[]);return o(t),t};return(0,n.jsxs)("main",{className:s().main,children:[(0,n.jsx)(x,{data:e,onChange:a=>{t({...e,...a})},onSubmit:e=>{let t=N(e);if(t)return alert(t),!1;o([...r,{id:d+1,...e}])}}),(0,n.jsx)(T,{data:c,setting:a,onComplete:e=>{u({...e,completed:!e.completed})},onEdit:u,onDelete:e=>{confirm("このタスクを削除しますか？")&&o(r.filter(t=>e.id!==t.id))},onChangeSetting:e=>{i({...a,...e})}})]})}},8447:function(e){e.exports={main:"page_main__UNZit"}},6470:function(e){e.exports={button:"button_button__j4gLT",primary:"button_primary__26g14"}},1342:function(e){e.exports={checkboxInput:"checkbox_checkboxInput__3CP0X",checkbox:"checkbox_checkbox__ZwZZJ",checked:"checkbox_checked__R8fDo"}},8868:function(e){e.exports={editableField:"editableField_editableField__X5G0u",show:"editableField_show__c_x7E",hide:"editableField_hide__xvn0n"}},5243:function(e){e.exports={form:"form_form__oq9Gw",formGroup:"form_formGroup__1tvDH",inputForm:"form_inputForm__rsdo_",inputFormName:"form_inputFormName__uea35",inputLabel:"form_inputLabel__DMnde",formFooter:"form_formFooter__jkcPo"}},3426:function(e){e.exports={input:"input_input__0B0VR"}},7386:function(e){e.exports={setting:"table_setting__AXI05",tableHeader:"table_tableHeader__OXZv_",tableHeaderCell:"table_tableHeaderCell__SVO2Q",tableHeaderCellTask:"table_tableHeaderCellTask__J1uqp",tableRow:"table_tableRow__j73Qb",completedRow:"table_completedRow__NcX6S",tableCell:"table_tableCell__w7GCE",tableCellCenter:"table_tableCellCenter__fQqfI",tableCellTask:"table_tableCellTask____KNU",icon:"table_icon__l1Pxt",iconContainer:"table_iconContainer__RIAb5"}}},function(e){e.O(0,[630,676,920,971,23,744],function(){return e(e.s=2311)}),_N_E=e.O()}]);