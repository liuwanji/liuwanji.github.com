"use strict";(self.webpackChunkveeka_web=self.webpackChunkveeka_web||[]).push([[241],{53389:function(e,n,r){r.d(n,{Z:function(){return a}});var t=r(6848);function a(e){if(!_.isString(e))return"";var n=e.split("-");if(2!==n.length)return e;var r=n[0];return t.is.mobile&&(r+="-m"),t.is.desktop&&(r+="-d"),r+="-"+n[1]}},78241:function(e,n,r){r.r(n),r.d(n,{default:function(){return T}});var t=r(59301),a=r(53389),o=r(64120),c=r(91192),u=r(25554),l=r.n(u),i=(r(51459),r(9595),r(56437),r(20731),r(39021),r(83211),r(65592),r(82783),r(34453)),s=r(12124),m=r.n(s),p=r(5894),f=r(89392),d=r(6897);function v(e){return w(g(N(e),8*e.length))}function g(e,n){e[n>>5]|=128<<24-n%32,e[15+(n+64>>9<<4)]=n;for(var r=Array(80),t=1732584193,a=-271733879,o=-1732584194,c=271733878,u=-1009589776,l=0;l<e.length;l+=16){for(var i=t,s=a,m=o,p=c,f=u,d=0;d<80;d++){r[d]=d<16?e[l+d]:Z(r[d-3]^r[d-8]^r[d-14]^r[d-16],1);var v=h(h(Z(t,5),k(d,a,o,c)),h(h(u,r[d]),b(d)));u=c,c=o,o=Z(a,30),a=t,t=v}t=h(t,i),a=h(a,s),o=h(o,m),c=h(c,p),u=h(u,f)}return Array(t,a,o,c,u)}function k(e,n,r,t){return e<20?n&r|~n&t:e<40?n^r^t:e<60?n&r|n&t|r&t:n^r^t}function b(e){return e<20?1518500249:e<40?1859775393:e<60?-1894007588:-899497514}function h(e,n){var r=(65535&e)+(65535&n);return(e>>16)+(n>>16)+(r>>16)<<16|65535&r}function Z(e,n){return e<<n|e>>>32-n}function N(e){for(var n=Array(),r=0;r<8*e.length;r+=8)n[r>>5]|=(255&e.charCodeAt(r/8))<<24-r%32;return n}function _(e){for(var n="",r=0;r<32*e.length;r+=8)n+=String.fromCharCode(e[r>>5]>>>24-r%32&255);return n}function w(e){for(var n="0123456789abcdef",r="",t=0;t<4*e.length;t++)r+=n.charAt(e[t>>2]>>8*(3-t%4)+4&15)+n.charAt(e[t>>2]>>8*(3-t%4)&15);return r}var x={hex_sha1:v,str_sha1:function(e){return _(g(N(e),8*e.length))}},y=r(23060),E=r(62663),F=r(54479),P=r(18808),C=r.n(P),S=r(79204),I=r.n(S),j=r(89038),A=r(6848),V=[{name:F.ZP.common.pwd_login,value:1},{name:F.ZP.common.vcode_login,value:2}];var R=(0,i.$j)((function(e){return{userInfo:e.app.userInfo}}),(function(e){return{actions:{getUserInfo:e.app.getUserInfo,getWebSession:e.app.getWebSession}}}))((function(e){var n=(0,E.k6)(),r=(0,t.useState)(1),u=(0,c.Z)(r,2),i=u[0],s=u[1],v=(0,t.useState)(""),g=(0,c.Z)(v,2),k=g[0],b=g[1],h=(0,t.useState)(""),Z=(0,c.Z)(h,2),N=Z[0],_=Z[1],w=(0,t.useState)(),P=(0,c.Z)(w,2),S=P[0],R=P[1],L=(0,t.useState)(),T=(0,c.Z)(L,2),O=T[0],U=T[1],q=(0,t.useState)(),D=(0,c.Z)(q,2),W=D[0],B=D[1],X=(0,t.useState)(),Y=(0,c.Z)(X,2),Q=Y[0],$=Y[1],z=(0,t.useState)(),G=(0,c.Z)(z,2),H=G[0],J=G[1],K=(0,t.useState)(F.ZP.common.get_vcode),M=(0,c.Z)(K,2),ee=M[0],ne=M[1],re=(0,t.useState)(!1),te=(0,c.Z)(re,2),ae=te[0],oe=te[1],ce=(0,t.useState)(),ue=(0,c.Z)(ce,2),le=ue[0],ie=ue[1],se=(0,p.XD)("/veeka/sendVerifyCodeImg",{responseType:"blob"}),me=(0,c.Z)(se,2),pe=me[0],fe=me[1],de=(0,p.XD)("/veeka/getAreaCode"),ve=(0,c.Z)(de,2),ge=(ve[0],ve[1]),ke=(0,p.uV)("/veeka/passwordLogin"),be=(0,c.Z)(ke,2),he=be[0],Ze=be[1],Ne=(0,p.uV)("/veeka/sendVerifyCode"),_e=(0,c.Z)(Ne,2),we=_e[0],xe=_e[1],ye=(0,p.uV)("/veeka/login"),Ee=(0,c.Z)(ye,2),Fe=Ee[0],Pe=Ee[1],Ce=(0,p.uV)("/account/fbLogin"),Se=(0,c.Z)(Ce,2),Ie=(Se[0],Se[1]),je=(0,p.uV)("/account/twitterLogin"),Ae=(0,c.Z)(je,2),Ve=(Ae[0],Ae[1],(0,p.uV)("/account/googleLogin")),Re=(0,c.Z)(Ve,2),Le=(Re[0],Re[1]);function Te(){return Oe.apply(this,arguments)}function Oe(){return(Oe=(0,o.Z)(l().mark((function e(){var n,r;return l().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!pe){e.next=2;break}return e.abrupt("return");case 2:return e.prev=2,e.next=5,fe();case 5:n=e.sent,e.next=11;break;case 8:e.prev=8,e.t0=e.catch(2),console.warn(e.t0);case 11:d.FN.clear(),(r=new FileReader).onload=function(e){return b(e.target.result)},r.readAsDataURL(n);case 15:case"end":return e.stop()}}),e,null,[[2,8]])})))).apply(this,arguments)}(0,t.useEffect)((0,o.Z)(l().mark((function r(){var t,a,o,c;return l().wrap((function(r){for(;;)switch(r.prev=r.next){case 0:if(null!=(t=I().parse(window.location.search,{ignoreQueryPrefix:!0}))&&t.redirect_url&&ie(t.redirect_url),C().init({facebook:"548018079705440",google:"323405409360-gq4jjk0abrum3mtnjj9qm3lqpaji6dtr.apps.googleusercontent.com"}),!f.isObject(e.userInfo)||f.isEmpty(e.userInfo)){r.next=7;break}A.is.mobile&&n.goBack(),r.next=21;break;case 7:return d.FN.loading(),r.prev=8,r.next=11,ge();case 11:c=r.sent,r.next=17;break;case 14:r.prev=14,r.t0=r.catch(8),console.warn(r.t0);case 17:return _((null===(a=c)||void 0===a||null===(o=a.data)||void 0===o?void 0:o.code)||"86"),r.next=20,e.actions.getWebSession();case 20:Te();case 21:case"end":return r.stop()}}),r,null,[[8,14]])}))),[]);var Ue=function(){var e=(0,o.Z)(l().mark((function e(){return l().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:d.FN.loading(),Te();case 2:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),qe=function(){var e=(0,o.Z)(l().mark((function e(){var n,r,t;return l().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!ae){e.next=2;break}return e.abrupt("return");case 2:if(!f.isNil(O)&&!f.isEmpty(O)){e.next=4;break}return e.abrupt("return",d.FN.warning(F.ZP.common.fill_phone_number));case 4:if(!f.isNil(W)&&!f.isEmpty(W)){e.next=6;break}return e.abrupt("return",d.FN.warning(F.ZP.common.graphic_code));case 6:if(!we){e.next=8;break}return e.abrupt("return");case 8:return d.FN.loading(),e.next=11,xe({mobile:O,vcode:W,area:N});case 11:if(null!=(n=e.sent)&&n.success){e.next=14;break}return e.abrupt("return",d.FN.error((null==n?void 0:n.msg)||F.ZP.common.occur_error,{afterClose:function(){return Te()}}));case 14:d.FN.success("Sent successfully"),$(null==n?void 0:n.data),oe(!0),r=30,t=setInterval((function(){r>0?ne("".concat(r--," s")):(ne(F.ZP.common.get_vcode),oe(!1),clearInterval(t))}),1e3);case 19:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),De=function(r){var t=function(){var r=(0,o.Z)(l().mark((function r(){return l().wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,e.actions.getUserInfo();case 2:n.goBack();case 3:case"end":return r.stop()}}),r)})));return function(){return r.apply(this,arguments)}}();r&&le?window.location.replace(le):t()},We=function(){var e=(0,o.Z)(l().mark((function e(){var n,r,t,a,o,c,u,s,m;return l().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!f.isNil(O)&&!f.isEmpty(O)){e.next=2;break}return e.abrupt("return",d.FN.warning(F.ZP.common.fill_phone_number));case 2:if(1!==i){e.next=15;break}if(!f.isNil(S)&&!f.isEmpty(S)){e.next=5;break}return e.abrupt("return",d.FN.warning(F.ZP.common.enter_pwd));case 5:if(!f.isNil(W)&&!f.isEmpty(W)){e.next=7;break}return e.abrupt("return",d.FN.warning(F.ZP.common.graphic_code));case 7:if(!he){e.next=9;break}return e.abrupt("return");case 9:return d.FN.loading(),e.next=12,Ze({mobile:O,vcode:W,password:x.hex_sha1(S),area:N});case 12:if(o=e.sent,null!==(c=o)&&void 0!==c&&c.success){e.next=15;break}return e.abrupt("return",d.FN.error((null===(u=o)||void 0===u?void 0:u.msg)||F.ZP.common.occur_error,{afterClose:function(){return Te()}}));case 15:if(2!==i){e.next=28;break}if(!f.isNil(Q)&&!f.isEmpty(Q)){e.next=18;break}return e.abrupt("return",d.FN.warning(F.ZP.common.get_mobile_vcode));case 18:if(!f.isNil(H)&&!f.isEmpty(H)){e.next=20;break}return e.abrupt("return",d.FN.warning(F.ZP.common.enter_vcode));case 20:if(!Fe){e.next=22;break}return e.abrupt("return");case 22:return d.FN.loading(),e.next=25,Pe({mobile:O,area:N,type:"login",token:Q,code:H});case 25:if(o=e.sent,null!==(s=o)&&void 0!==s&&s.success){e.next=28;break}return e.abrupt("return",d.FN.error((null===(m=o)||void 0===m?void 0:m.msg)||F.ZP.common.occur_error,{afterClose:function(){return Te()}}));case 28:(0,y.d8)("userToken",null===(n=o)||void 0===n||null===(r=n.data)||void 0===r?void 0:r.token,null),(0,y.d8)("fu",null===(t=o)||void 0===t||null===(a=t.data)||void 0===a?void 0:a.fu,null),De(!0),d.FN.clear();case 32:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return t.createElement("section",{className:"comp-login-form"},t.createElement("div",{className:(0,a.Z)("clf-tabs")},f.map(V,(function(e,n){return t.createElement("div",{key:n,className:m()("clf-tabs-item",{"clf-tabs-active":i===e.value}),onClick:function(){s(e.value)}},e.name)}))),t.createElement("div",{className:(0,a.Z)("clf-input")},t.createElement("input",{className:"clf-input-before",value:"+".concat(N),type:"tel",onInput:function(e){var n=e.target.value.replace("+","");_(n)}}),t.createElement("input",{className:"clf-input-tag",type:"tel",placeholder:F.ZP.common.fill_phone_number,maxLength:"11",onInput:function(e){return U(e.target.value)}})),1===i&&t.createElement(t.Fragment,null,t.createElement("div",{className:(0,a.Z)("clf-input")},t.createElement("input",{className:"clf-input-tag",type:"password",placeholder:F.ZP.common.password,onInput:function(e){return R(e.target.value)}})),t.createElement("div",{className:(0,a.Z)("clf-input")},t.createElement("input",{className:"clf-input-tag",type:"text",placeholder:F.ZP.common.graphic_code,onInput:function(e){return B(e.target.value)}}),t.createElement("img",{className:"clf-input-img-code",src:k,onClick:Ue}))),2===i&&t.createElement(t.Fragment,null,t.createElement("div",{className:(0,a.Z)("clf-input")},t.createElement("input",{className:"clf-input-tag",type:"text",placeholder:F.ZP.common.graphic_code,onInput:function(e){return B(e.target.value)}}),t.createElement("img",{className:"clf-input-img-code",src:k,onClick:Ue})),t.createElement("div",{className:(0,a.Z)("clf-input")},t.createElement("input",{className:"clf-input-tag",type:"text",placeholder:F.ZP.common.enter_vcode,onInput:function(e){return J(e.target.value)}}),t.createElement("span",{className:"clf-input-after",onClick:qe},ee))),t.createElement("button",{className:(0,a.Z)("clf-btn"),onClick:We},F.ZP.common.login),t.createElement("div",{className:(0,a.Z)("clf-agree")},t.createElement("span",null,F.ZP.common.sign_means_consent),t.createElement("a",{href:"https://help.partying.sg/help/starsagreement2?package=sg.partying.lcb.ios&lan=en"},F.ZP.common.user_services_agreement),t.createElement("a",{href:"https://help.partying.sg/help/starsagreement3?package=sg.partying.lcb.ios&lan=en"},F.ZP.common.privacy_policy)),t.createElement("div",{className:"clf-split"},t.createElement("b",null,"OR")),t.createElement("div",{className:(0,a.Z)("clf-account")},t.createElement(j.Y4,{className:"clf-account-img",onClick:function(){d.FN.loading(),C().login("google",{redirect_uri:"https://www.letsveeka.com/login/google",oauth_proxy:"https://auth-server.herokuapp.com/proxy",response_type:"token id_token",scope:"openid email"},(function(e){var n;if(!f.isObject(e.authResponse))return d.FN.error((null==e||null===(n=e.error)||void 0===n?void 0:n.message)||F.ZP.common.occur_error);var r=e.authResponse,t={type:"login",idToken:r.id_token,accessToken:r.access_token,platform:"web"};Le(t).then((function(e){var n,r,t;if(null==e||null===(n=e.data)||void 0===n||!n.token)return d.FN.error((null==e?void 0:e.msg)||F.ZP.common.occur_error);d.FN.clear(),(0,y.d8)("userToken",null==e||null===(r=e.data)||void 0===r?void 0:r.token,null),(0,y.d8)("fu",null==e||null===(t=e.data)||void 0===t?void 0:t.fu,null),De(!0)})).catch((function(e){var n;d.FN.error((null==e?void 0:e.error_message)||(null==e||null===(n=e.error)||void 0===n?void 0:n.message)||F.ZP.common.occur_error)}))}))}}),t.createElement(j.wY,{className:"clf-account-img",onClick:function(){d.FN.loading(),C().login("facebook",{redirect_uri:"https://www.letsveeka.com/login/facebook",oauth_proxy:"https://auth-server.herokuapp.com/proxy"},(function(e){var n;if(!f.isObject(e.authResponse))return d.FN.error((null==e||null===(n=e.error)||void 0===n?void 0:n.message)||F.ZP.common.occur_error);var r=e.authResponse;Ie({type:"login",platform:"web"},{params:{t:null==r?void 0:r.access_token}}).then((function(e){var n,r,t;if(null==e||null===(n=e.data)||void 0===n||!n.token)return d.FN.error((null==e?void 0:e.msg)||F.ZP.common.occur_error);d.FN.clear(),(0,y.d8)("userToken",null==e||null===(r=e.data)||void 0===r?void 0:r.token,null),(0,y.d8)("fu",null==e||null===(t=e.data)||void 0===t?void 0:t.fu,null),De(!0)})).catch((function(e){var n;d.FN.error((null==e?void 0:e.error_message)||(null==e||null===(n=e.error)||void 0===n?void 0:n.message)||F.ZP.common.occur_error)}))}))}})))})),L=r(6848);function T(e){return t.createElement("section",{className:(0,a.Z)("page-login")},L.is.mobile&&t.createElement(R,null),L.is.desktop&&t.createElement(t.Fragment,null,t.createElement("div",{className:"pl-form-wrap"},t.createElement(R,null))))}}}]);