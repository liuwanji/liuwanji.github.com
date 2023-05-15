"use strict";(self.webpackChunkveeka_web=self.webpackChunkveeka_web||[]).push([[42],{34042:function(e,t,n){n.r(t),n.d(t,{default:function(){return O}});var r=n(16027),o=n(17706),a=n(64120),s=n(91192),l=n(25554),i=n.n(l),c=(n(52641),n(62605),n(43975),n(20731),n(82783),n(9595),n(56437),n(93085),n(16408),n(12256),n(53589),n(32473),n(23612),n(59301)),u=n(34453),p=n(62663),h=n(89392),m=n(12124),d=n.n(m),f=n(5894),v=n(54479),g=function(e,t){return g=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n])},g(e,t)};var E=function(){return E=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var o in t=arguments[n])Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o]);return e},E.apply(this,arguments)};var b="Pixel",y="Percent",w={unit:y,value:.8};function _(e){return"number"==typeof e?{unit:y,value:100*e}:"string"==typeof e?e.match(/^(\d*(\.\d+)?)px$/)?{unit:b,value:parseFloat(e)}:e.match(/^(\d*(\.\d+)?)%$/)?{unit:y,value:parseFloat(e)}:(console.warn('scrollThreshold format is invalid. Valid formats: "120px", "50%"...'),w):(console.warn("scrollThreshold should be string or number"),w)}var S=function(e){function t(t){var n=e.call(this,t)||this;return n.lastScrollTop=0,n.actionTriggered=!1,n.startY=0,n.currentY=0,n.dragging=!1,n.maxPullDownDistance=0,n.getScrollableTarget=function(){return n.props.scrollableTarget instanceof HTMLElement?n.props.scrollableTarget:"string"==typeof n.props.scrollableTarget?document.getElementById(n.props.scrollableTarget):(null===n.props.scrollableTarget&&console.warn("You are trying to pass scrollableTarget but it is null. This might\n        happen because the element may not have been added to DOM yet.\n        See https://github.com/ankeetmaini/react-infinite-scroll-component/issues/59 for more info.\n      "),null)},n.onStart=function(e){n.lastScrollTop||(n.dragging=!0,e instanceof MouseEvent?n.startY=e.pageY:e instanceof TouchEvent&&(n.startY=e.touches[0].pageY),n.currentY=n.startY,n._infScroll&&(n._infScroll.style.willChange="transform",n._infScroll.style.transition="transform 0.2s cubic-bezier(0,0,0.31,1)"))},n.onMove=function(e){n.dragging&&(e instanceof MouseEvent?n.currentY=e.pageY:e instanceof TouchEvent&&(n.currentY=e.touches[0].pageY),n.currentY<n.startY||(n.currentY-n.startY>=Number(n.props.pullDownToRefreshThreshold)&&n.setState({pullToRefreshThresholdBreached:!0}),n.currentY-n.startY>1.5*n.maxPullDownDistance||n._infScroll&&(n._infScroll.style.overflow="visible",n._infScroll.style.transform="translate3d(0px, "+(n.currentY-n.startY)+"px, 0px)")))},n.onEnd=function(){n.startY=0,n.currentY=0,n.dragging=!1,n.state.pullToRefreshThresholdBreached&&(n.props.refreshFunction&&n.props.refreshFunction(),n.setState({pullToRefreshThresholdBreached:!1})),requestAnimationFrame((function(){n._infScroll&&(n._infScroll.style.overflow="auto",n._infScroll.style.transform="none",n._infScroll.style.willChange="unset")}))},n.onScrollListener=function(e){"function"==typeof n.props.onScroll&&setTimeout((function(){return n.props.onScroll&&n.props.onScroll(e)}),0);var t=n.props.height||n._scrollableNode?e.target:document.documentElement.scrollTop?document.documentElement:document.body;n.actionTriggered||((n.props.inverse?n.isElementAtTop(t,n.props.scrollThreshold):n.isElementAtBottom(t,n.props.scrollThreshold))&&n.props.hasMore&&(n.actionTriggered=!0,n.setState({showLoader:!0}),n.props.next&&n.props.next()),n.lastScrollTop=t.scrollTop)},n.state={showLoader:!1,pullToRefreshThresholdBreached:!1,prevDataLength:t.dataLength},n.throttledOnScrollListener=function(e,t,n,r){var o,a=!1,s=0;function l(){o&&clearTimeout(o)}function i(){var i=this,c=Date.now()-s,u=arguments;function p(){s=Date.now(),n.apply(i,u)}function h(){o=void 0}a||(r&&!o&&p(),l(),void 0===r&&c>e?p():!0!==t&&(o=setTimeout(r?h:p,void 0===r?e-c:e)))}return"boolean"!=typeof t&&(r=n,n=t,t=void 0),i.cancel=function(){l(),a=!0},i}(150,n.onScrollListener).bind(n),n.onStart=n.onStart.bind(n),n.onMove=n.onMove.bind(n),n.onEnd=n.onEnd.bind(n),n}return function(e,t){function n(){this.constructor=e}g(e,t),e.prototype=null===t?Object.create(t):(n.prototype=t.prototype,new n)}(t,e),t.prototype.componentDidMount=function(){if(void 0===this.props.dataLength)throw new Error('mandatory prop "dataLength" is missing. The prop is needed when loading more content. Check README.md for usage');if(this._scrollableNode=this.getScrollableTarget(),this.el=this.props.height?this._infScroll:this._scrollableNode||window,this.el&&this.el.addEventListener("scroll",this.throttledOnScrollListener),"number"==typeof this.props.initialScrollY&&this.el&&this.el instanceof HTMLElement&&this.el.scrollHeight>this.props.initialScrollY&&this.el.scrollTo(0,this.props.initialScrollY),this.props.pullDownToRefresh&&this.el&&(this.el.addEventListener("touchstart",this.onStart),this.el.addEventListener("touchmove",this.onMove),this.el.addEventListener("touchend",this.onEnd),this.el.addEventListener("mousedown",this.onStart),this.el.addEventListener("mousemove",this.onMove),this.el.addEventListener("mouseup",this.onEnd),this.maxPullDownDistance=this._pullDown&&this._pullDown.firstChild&&this._pullDown.firstChild.getBoundingClientRect().height||0,this.forceUpdate(),"function"!=typeof this.props.refreshFunction))throw new Error('Mandatory prop "refreshFunction" missing.\n          Pull Down To Refresh functionality will not work\n          as expected. Check README.md for usage\'')},t.prototype.componentWillUnmount=function(){this.el&&(this.el.removeEventListener("scroll",this.throttledOnScrollListener),this.props.pullDownToRefresh&&(this.el.removeEventListener("touchstart",this.onStart),this.el.removeEventListener("touchmove",this.onMove),this.el.removeEventListener("touchend",this.onEnd),this.el.removeEventListener("mousedown",this.onStart),this.el.removeEventListener("mousemove",this.onMove),this.el.removeEventListener("mouseup",this.onEnd)))},t.prototype.componentDidUpdate=function(e){this.props.dataLength!==e.dataLength&&(this.actionTriggered=!1,this.setState({showLoader:!1}))},t.getDerivedStateFromProps=function(e,t){return e.dataLength!==t.prevDataLength?E(E({},t),{prevDataLength:e.dataLength}):null},t.prototype.isElementAtTop=function(e,t){void 0===t&&(t=.8);var n=e===document.body||e===document.documentElement?window.screen.availHeight:e.clientHeight,r=_(t);return r.unit===b?e.scrollTop<=r.value+n-e.scrollHeight+1:e.scrollTop<=r.value/100+n-e.scrollHeight+1},t.prototype.isElementAtBottom=function(e,t){void 0===t&&(t=.8);var n=e===document.body||e===document.documentElement?window.screen.availHeight:e.clientHeight,r=_(t);return r.unit===b?e.scrollTop+n>=e.scrollHeight-r.value:e.scrollTop+n>=r.value/100*e.scrollHeight},t.prototype.render=function(){var e=this,t=E({height:this.props.height||"auto",overflow:"auto",WebkitOverflowScrolling:"touch"},this.props.style),n=this.props.hasChildren||!!(this.props.children&&this.props.children instanceof Array&&this.props.children.length),r=this.props.pullDownToRefresh&&this.props.height?{overflow:"auto"}:{};return c.createElement("div",{style:r,className:"infinite-scroll-component__outerdiv"},c.createElement("div",{className:"infinite-scroll-component "+(this.props.className||""),ref:function(t){return e._infScroll=t},style:t},this.props.pullDownToRefresh&&c.createElement("div",{style:{position:"relative"},ref:function(t){return e._pullDown=t}},c.createElement("div",{style:{position:"absolute",left:0,right:0,top:-1*this.maxPullDownDistance}},this.state.pullToRefreshThresholdBreached?this.props.releaseToRefreshContent:this.props.pullDownToRefreshContent)),this.props.children,!this.state.showLoader&&!n&&this.props.hasMore&&this.props.loader,this.state.showLoader&&this.props.hasMore&&this.props.loader,!this.props.hasMore&&this.props.endMessage))},t}(c.Component),T=S,k=n(95049),x=n(6897),Z=n(89038),N=n(89392);function P(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function D(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?P(Object(n),!0).forEach((function(t){(0,r.Z)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):P(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var L=[{id:1,name:v.ZP.purse.common_use.trade,value:"all"},{id:2,name:v.ZP.purse.index.ti,value:"withdraw"},{id:3,name:v.ZP.purse.index.lock,value:"gold_locked"}],Y=function(e){var t=Number(e.money),n=t>0?"+":"",r=function(){switch(!0){case N.includes(["gold_normal","gold_sales","gold_game","gold_reward","gold_abnormal","gold_locked","gold_arrears"],e.account_type):return c.createElement(c.Fragment,null,c.createElement("i",null,n,t),c.createElement(Z.ne,{width:12}));case"charm_normal"===e.account_type:return c.createElement(c.Fragment,null,c.createElement("i",null,n,t),c.createElement(Z.lS,{width:13}));case"family_diamond"===e.account_type:return c.createElement(c.Fragment,null,c.createElement("i",null,n,t),c.createElement(Z.I2,{width:15}));case"family_charm"===e.account_type:return c.createElement(c.Fragment,null,c.createElement("i",null,n,t),c.createElement(Z.Iq,{width:13}));default:return null}};return c.createElement("div",{className:"pp-list-item",key:null==e?void 0:e.key},c.createElement("span",{className:"pp-list-item-left"},c.createElement("div",{className:"pp-list-item-title"},e.subject),c.createElement("div",{className:"pp-list-item-desc"},e.op_translation)),c.createElement("span",{className:"pp-list-item-right"},c.createElement("div",{className:d()("pp-list-item-money",{"pp-list-item-green":t>0})},c.createElement(r,null)),c.createElement("div",{className:"pp-list-item-time"},e.dateline?(0,k.vc)("YYYY.mm.dd HH:MM",1e3*e.dateline):"")))},O=(0,u.$j)((function(e){var t=e.app;return h.pick(t,["userInfo","initState"])}),(function(e){var t=e.app;return{actions:h.pick(t,["jumpRechargePage"])}}))((function(e){var t=(0,p.k6)(),n=(0,c.useState)(L[0]),r=(0,s.Z)(n,2),l=r[0],u=r[1],m=(0,c.useState)("--"),g=(0,s.Z)(m,2),E=g[0],b=g[1],y=(0,c.useState)("--"),w=(0,s.Z)(y,2),_=w[0],S=w[1],k=(0,c.useState)("--"),P=(0,s.Z)(k,2),O=P[0],M=P[1],F=(0,c.useState)("--"),C=(0,s.Z)(F,2),j=C[0],R=C[1],H=(0,c.useState)([]),A=(0,s.Z)(H,2),B=A[0],I=A[1],q=(0,c.useState)(!0),V=(0,s.Z)(q,2),z=V[0],U=V[1],W=(0,c.useState)({page:1,size:5}),$=(0,s.Z)(W,2),X=$[0],G=$[1],J=(0,c.useState)(!1),K=(0,s.Z)(J,2),Q=K[0],ee=K[1],te=(0,c.useState)(!1),ne=(0,s.Z)(te,2),re=ne[0],oe=ne[1],ae=(0,c.useState)(),se=(0,s.Z)(ae,2),le=se[0],ie=(se[1],(0,c.useState)([{label:v.ZP.purse.index.cash_index_label30,value:"cash"}])),ce=(0,s.Z)(ie,2),ue=ce[0],pe=(ce[1],(0,f.uV)("/veeka/money")),he=(0,s.Z)(pe,2),me=he[0],de=he[1],fe=(0,f.XD)("/veeka/history"),ve=(0,s.Z)(fe,2),ge=ve[0],Ee=ve[1],be=(0,f.XD)("/veeka/bankcashvalid"),ye=(0,s.Z)(be,2),we=ye[0],_e=ye[1],Se=(0,f.uV)("/veeka/pooling"),Te=(0,s.Z)(Se,2),ke=Te[0],xe=Te[1];function Ze(){return(Ze=(0,a.Z)(i().mark((function e(){var t,n,r;return i().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!me){e.next=2;break}return e.abrupt("return");case 2:return e.prev=2,e.next=5,de({type:l.value});case 5:r=e.sent,e.next=11;break;case 8:e.prev=8,e.t0=e.catch(2),r=e.t0;case 11:if(null!==(t=r)&&void 0!==t&&t.success){e.next=13;break}return e.abrupt("return",x.FN.error((null===(n=r)||void 0===n?void 0:n.msg)||v.ZP.common.occur_error));case 13:b(r.data.gold_normal),S(r.data.charm_normal),M(r.data.family_diamond),R(r.data.family_charm),oe(!r.data.hide_cash);case 18:case"end":return e.stop()}}),e,null,[[2,8]])})))).apply(this,arguments)}function Ne(){return Pe.apply(this,arguments)}function Pe(){return(Pe=(0,a.Z)(i().mark((function e(){var t,n,r,o,a,s,c;return i().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!ge){e.next=2;break}return e.abrupt("return");case 2:return x.FN.loading(),e.prev=3,e.next=6,Ee(D({type:l.value},X));case 6:a=e.sent,e.next=12;break;case 9:e.prev=9,e.t0=e.catch(3),a=e.t0;case 12:if(null!==(t=a)&&void 0!==t&&t.success){e.next=14;break}return e.abrupt("return",x.FN.error((null===(n=a)||void 0===n?void 0:n.msg)||v.ZP.common.occur_error));case 14:x.FN.clear(),s=N.cloneDeep(B),s=N.concat(s,(null===(r=a.data)||void 0===r?void 0:r.list)||[]),I(s),U(null===(o=a.data)||void 0===o?void 0:o.more),(c=N.cloneDeep(X)).page=c.page+1,G(c);case 22:case"end":return e.stop()}}),e,null,[[3,9]])})))).apply(this,arguments)}(0,c.useEffect)((function(){!function(){Ze.apply(this,arguments)}()}),[]),(0,c.useEffect)((function(){Ne()}),[l]);var De=function(){var e=(0,a.Z)(i().mark((function e(n){var r,o,a,s,l,c;return i().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!we){e.next=2;break}return e.abrupt("return");case 2:return x.FN.loading(),e.prev=3,e.next=6,_e();case 6:a=e.sent,e.next=12;break;case 9:e.prev=9,e.t0=e.catch(3),a=e.t0;case 12:if(null!==(r=a)&&void 0!==r&&r.success){e.next=14;break}return e.abrupt("return",x.FN.error((null===(o=a)||void 0===o?void 0:o.msg)||v.ZP.common.occur_error));case 14:x.FN.clear(),s=a.data||{},l=s.idcard,c=s.bankcard,e.t1=!0,e.next=e.t1===(0==l||2==l)?19:e.t1===(0==c||2==c)?21:23;break;case 19:return t.push("/certify/identity-verify"),e.abrupt("break",24);case 21:return t.push("/purse/withdraw-set"),e.abrupt("break",24);case 23:t.push("/purse/withdraw-apply?type=".concat(n));case 24:case"end":return e.stop()}}),e,null,[[3,9]])})));return function(t){return e.apply(this,arguments)}}(),Le=function(){var e=(0,a.Z)(i().mark((function e(){var t,n,r,o;return i().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!ke){e.next=2;break}return e.abrupt("return");case 2:return e.next=4,x.Y8.confirm({title:v.ZP.common.warm_tips,content:c.createElement("section",null,c.createElement("p",{style:{lineHeight:"22px",color:"rgba(32, 32, 32, 0.6)",textAlign:"center"}},"".concat(v.ZP.purse.index.tip_1," ").concat(le.name," ?"))),cancelText:v.ZP.common.cancel,okText:v.ZP.common.confirm});case 4:if(e.sent){e.next=7;break}return e.abrupt("return");case 7:return x.FN.loading(),e.prev=8,e.next=11,xe({cash_from:"cash_b"});case 11:if(r=e.sent,null!==(o=r)&&void 0!==o&&o.success){e.next=14;break}throw r;case 14:return e.next=16,xe({cash_from:"cash"});case 16:r=e.sent,e.next=22;break;case 19:e.prev=19,e.t0=e.catch(8),r=e.t0;case 22:if(null!==(t=r)&&void 0!==t&&t.success){e.next=24;break}return e.abrupt("return",x.FN.error((null===(n=r)||void 0===n?void 0:n.msg)||v.ZP.common.occur_error));case 24:x.FN.success(v.ZP.common.successful_operation,{afterClose:function(){return queryPageInfo()}});case 25:case"end":return e.stop()}}),e,null,[[8,19]])})));return function(){return e.apply(this,arguments)}}(),Ye=function(e){h.isNil(le)||h.isEmpty(le)?De(e):ee(!0)};return c.createElement("div",{className:"page-purse"},c.createElement("section",{className:"pp-card"},c.createElement(Z.ne,{width:"21"}),c.createElement("span",{className:"pp-card-mid"},c.createElement("h4",null,E),c.createElement("h5",null,v.ZP.common.balance)),c.createElement("button",{className:"pp-card-btn",onClick:e.actions.jumpRechargePage},v.ZP.common.recharge)),c.createElement("section",{className:"pp-card",onClick:function(){return re?Ye(1):{}}},c.createElement(Z.lS,null),c.createElement("span",{className:"pp-card-mid"},c.createElement("h4",null,_),c.createElement("h5",null,v.ZP.purse.common_use.glamour)),re&&c.createElement(Z.Z5,{className:"rightArrow",color:"rgba(49, 49, 49, 0.3)"})),c.createElement("section",{className:"pp-card"},c.createElement(Z.I2,null),c.createElement("span",{className:"pp-card-mid"},c.createElement("h4",null,O),c.createElement("h5",null,v.ZP.purse.text2))),c.createElement("section",{className:"pp-card",onClick:function(){return re?Ye(2):{}}},c.createElement(Z.Iq,null),c.createElement("span",{className:"pp-card-mid"},c.createElement("h4",null,j),c.createElement("h5",null,v.ZP.purse.text3)),re&&c.createElement(Z.Z5,{className:"rightArrow",color:"rgba(49, 49, 49, 0.3)"})),c.createElement("section",{className:"pp-tabs"},h.map(L,(function(e){return c.createElement("div",{key:e.id,className:d()("pp-tabs-item",l.id===e.id&&"pp-tabs-active"),onClick:function(){return t=e,I([]),G({page:1,size:5}),void u(t);var t}},e.name)}))),c.createElement("section",{className:"pp-list"},c.createElement(T,{dataLength:B.length,next:Ne,hasMore:z,scrollableTarget:"layoutMobileBody",loader:c.createElement("h4",{style:{textAlign:"center"}},"Loading...")},N.map(B,(function(e,t){return c.createElement(Y,(0,o.Z)({key:t},e))})))),c.createElement(x.cW,{columns:[ue],visible:Q,defaultValue:[ue[0].value],onClose:function(){return ee(!1)},onConfirm:function(e){var t=e[0];"cash"===t&&De(1),"collection"===t&&Le()}}))}))}}]);