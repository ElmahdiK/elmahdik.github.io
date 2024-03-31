import{r as l}from"./index.NEDEFKed.js";var c={exports:{}},i={};/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var f=l,p=Symbol.for("react.element"),u=Symbol.for("react.fragment"),g=Object.prototype.hasOwnProperty,h=f.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,b={key:!0,ref:!0,__self:!0,__source:!0};function x(r,e,o){var t,a={},s=null,d=null;o!==void 0&&(s=""+o),e.key!==void 0&&(s=""+e.key),e.ref!==void 0&&(d=e.ref);for(t in e)g.call(e,t)&&!b.hasOwnProperty(t)&&(a[t]=e[t]);if(r&&r.defaultProps)for(t in e=r.defaultProps,e)a[t]===void 0&&(a[t]=e[t]);return{$$typeof:p,type:r,key:s,ref:d,props:a,_owner:h.current}}i.Fragment=u;i.jsx=x;i.jsxs=x;c.exports=i;var n=c.exports;function m(r){const{title:e,text:o,handleClick:t}=r;return n.jsxs(n.Fragment,{children:[n.jsx("style",{children:` 
        div {
            box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
            background: #fff;
            margin: 0 auto;
            display: flex;
            flex-direction: column;
            width: 40%;
        }
        p { 
            padding: 20px;
        } 
        .title {    
          background: #000;
            color: #fff;
            font-size: 22px;
            font-weight: bold;
        }
        .text {
          color: #000;
          border-bottom: 1px dashed #ccc;
          text-align: justify;
        }
        button:hover {
            background-color: #fff;
            color: #000;
        }
        button {
            background-color: #000;
            color: #fff;
            border:1px solid #111;
            align-self: flex-end;
            padding:14px;
            cursor:pointer;
            text-transform: uppercase;
            margin: 20px 0px;
            margin-right: 20px;
        }

        @media screen and (max-width: 700px) {
            div {
                width: 90%;
            }
        }
      `}),n.jsx("p",{className:"title",children:e}),o&&n.jsx("p",{className:"text",children:o}),n.jsx("button",{onClick:t,children:"blague suivante"})]})}function y(){const[r,e]=l.useState({text_head:"",text:"",text_hidden:""}),o=async()=>{const s=await(await fetch("https://api.blablagues.net/?rub=blagues")).json();e(s.data.content)};l.useEffect(()=>{o()},[]);async function t(){o()}return n.jsx("div",{children:n.jsx(m,{title:r?.text_head,text:r?.text+r?.text_hidden,handleClick:t})})}export{y as default};
