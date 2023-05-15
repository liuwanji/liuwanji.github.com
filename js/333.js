"use strict";(self.webpackChunkveeka_web=self.webpackChunkveeka_web||[]).push([[333],{6333:function(e,t,n){n.r(t),n.d(t,{default:function(){return Z}});var r=n(64120),a=n(91192),c=n(25554),u=n.n(c),s=(n(82783),n(39021),n(65592),n(20409),n(59301)),i=n(89392),o=n(54479),l=n(12124),m=n.n(l),p=n(5894),d=n(6897),v=n(95049),g=n(25626);function Z(e){var t=(0,s.useState)(),n=(0,a.Z)(t,2),c=n[0],l=n[1],Z=(0,s.useState)({}),b=(0,a.Z)(Z,2),x=b[0],f=b[1],j=(0,s.useState)(),k=(0,a.Z)(j,2),A=k[0],F=k[1],h=(0,s.useState)(!1),N=(0,a.Z)(h,2),E=N[0],P=N[1],w=(0,s.useState)(0),y=(0,a.Z)(w,2),O=(y[0],y[1],(0,s.useState)("")),T=(0,a.Z)(O,2),U=(T[0],T[1],(0,p.XD)("/veeka/agentrelatemoney")),X=(0,a.Z)(U,2),V=X[0],z=X[1],Y=(0,p.XD)("/veeka/agentrelateinfo"),B=(0,a.Z)(Y,2),K=B[0],H=B[1],G=(0,p.uV)("/veeka/agentrelatesend"),L=(0,a.Z)(G,2),I=L[0],W=L[1];function D(){return S.apply(this,arguments)}function S(){return(S=(0,r.Z)(u().mark((function e(){var t,n,r,a,c;return u().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!V){e.next=2;break}return e.abrupt("return");case 2:return d.FN.loading(),e.prev=3,e.next=6,z();case 6:c=e.sent,e.next=12;break;case 9:e.prev=9,e.t0=e.catch(3),c=e.t0;case 12:if(null!==(t=c)&&void 0!==t&&t.success&&i.isObject(null===(n=c)||void 0===n?void 0:n.data)){e.next=14;break}return e.abrupt("return",d.FN.error((null===(r=c)||void 0===r?void 0:r.msg)||o.ZP.common.occur_error));case 14:d.FN.clear(),l((null===(a=c.data)||void 0===a?void 0:a.money).toFixed(2));case 16:case"end":return e.stop()}}),e,null,[[3,9]])})))).apply(this,arguments)}function M(){return(M=(0,r.Z)(u().mark((function e(t){var n,r,a,c;return u().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t!=(null==x?void 0:x.uid)){e.next=2;break}return e.abrupt("return");case 2:if(f({}),/^\d{9,9}$/.test(t)){e.next=5;break}return e.abrupt("return");case 5:if(!K){e.next=7;break}return e.abrupt("return");case 7:return d.FN.loading(),e.prev=8,e.next=11,H({touid:t});case 11:c=e.sent,e.next=17;break;case 14:e.prev=14,e.t0=e.catch(8),c=e.t0;case 17:if(null!==(n=c)&&void 0!==n&&n.success&&i.isObject(null===(r=c)||void 0===r?void 0:r.data)){e.next=19;break}return e.abrupt("return",d.FN.error((null===(a=c)||void 0===a?void 0:a.msg)||o.ZP.common.occur_error));case 19:d.FN.clear(),f(c.data);case 21:case"end":return e.stop()}}),e,null,[[8,14]])})))).apply(this,arguments)}(0,s.useEffect)((function(){D()}),[]),(0,s.useEffect)((function(){P(!!A&&A>=100&&!(null==x||!x.uid))}),[A,x]);var C=i.debounce((function(e){return M.apply(this,arguments)}),500),R=function(){var e=(0,r.Z)(u().mark((function e(){var t,n,r,a;return u().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(E){e.next=2;break}return e.abrupt("return");case 2:if(!I){e.next=4;break}return e.abrupt("return");case 4:return e.next=6,d.Y8.confirm({title:o.ZP.common.warm_tips,content:s.createElement("section",null,s.createElement("p",{style:{lineHeight:"22px",color:"rgba(32, 32, 32, 0.6)",textAlign:"center"}},o.ZP.get("purse.charm_exchange.tips_02",{money:A,name:x.name}))),cancelText:o.ZP.common.cancel,okText:o.ZP.common.confirm});case 6:if(e.sent){e.next=9;break}return e.abrupt("return");case 9:return r=(0,v.Aq)(A),d.FN.loading(),e.prev=11,e.next=14,W({money:r,uid:x.uid});case 14:a=e.sent,e.next=20;break;case 17:e.prev=17,e.t0=e.catch(11),a=e.t0;case 20:if(null!==(t=a)&&void 0!==t&&t.success){e.next=22;break}return e.abrupt("return",d.FN.error((null===(n=a)||void 0===n?void 0:n.msg)||o.ZP.common.occur_error));case 22:d.FN.success(a.data||o.ZP.common.submitted_successfully,{afterClose:function(){return D()}});case 23:case"end":return e.stop()}}),e,null,[[11,17]])})));return function(){return e.apply(this,arguments)}}();return s.createElement("div",{className:"page-charm-exchange"},s.createElement("section",{className:"pce-account"},s.createElement("h4",null,o.ZP.purse.common_use.glamour_balance),s.createElement("div",{className:"pce-account-info"},s.createElement("img",{src:g.Z,alt:"glamour"}),s.createElement("span",null,c))),s.createElement("section",{className:"pce-receive"},s.createElement("div",{className:"pce-receive-item"},s.createElement("span",null,o.ZP.purse.common_use.receiver_uid),s.createElement("input",{type:"text",maxLength:"9",onChange:function(e){var t=e.target.value&&parseInt(e.target.value);C(t)},placeholder:o.ZP.purse.common_use.input_uid})),!i.isEmpty(x)&&s.createElement("div",{className:"pce-receive-item"},s.createElement("span",null,o.ZP.purse.common_use.account_nickname),s.createElement("span",{className:"pce-receive-right"},x.icon&&s.createElement("img",{className:"pce-receive-photo",src:x.icon}),s.createElement("i",{className:"pce-receive-name"},x.name))),s.createElement("div",{className:"pce-receive-item"},s.createElement("span",null,o.ZP.purse.common_use.glamour_money),s.createElement("input",{type:"text",value:A,onInput:function(e){var t;e.target.value=e.target.value.replace(/[^\d]/g,""),t=e.target.value,F(t)},placeholder:o.ZP.purse.common_use.input_glamour}))),s.createElement("p",{className:"pce-desc"},"".concat(o.ZP.purse.common_use.tips_01)),s.createElement("button",{className:m()("pce-btn",E?"pce-btn-yellow":"pce-btn-grey"),onClick:R},o.ZP.common.submit))}},25626:function(e,t){t.Z="data:image/png;base64,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"}}]);