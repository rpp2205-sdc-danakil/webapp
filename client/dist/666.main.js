"use strict";(self.webpackChunkmy_webpack_project=self.webpackChunkmy_webpack_project||[]).push([[666],{8767:(e,t,a)=>{a.d(t,{Z:()=>i});var r=a(5466);class n extends r.Component{constructor(e){super(e),this.state={stars:[0,0,0,0,0]}}componentDidMount(){this.renderStarsByQuarters(this.props.rating)}componentDidUpdate(e){this.props.rating!==e.rating&&this.renderStarsByQuarters(this.props.rating)}renderStarsByQuarters(e){if(isNaN(e)||!e)this.setState({stars:[0,0,0,0,0]});else if(e>0){for(var[t,a]=[Number(String(e).split(".")[0]),Number("0."+String(e).split(".")[1])||0],r=0,n=[0,0,0,0,0];t>0;)n[r]=1,t--,5===++r&&r--;n[r]=a>0&&a<=.125?0:a>.125&&a<=.375?.35:a>.375&&a<=.625?.5:a>.625&&a<=.875?.7:0===a&&5!==e?0:1,this.setState({stars:n})}}render(){return r.createElement("div",{className:"five-stars"},this.state.stars.map(((e,t)=>r.createElement("div",{className:"single-star-container",id:t,key:t},r.createElement("span",{className:"single-star-outline"}),r.createElement("span",{className:"single-star-fill",style:{width:100*e+"%"}})))))}}const i=n},5873:(e,t,a)=>{a.d(t,{Z:()=>s});var r=a(5466),n=a(8767),i=a(6120);const c=(0,i.Z)((function(e){return e.actionButton?React.createElement("div",{id:"action"},React.createElement("i",{className:"fa-regular fa-star star",onClick:t=>{e.showModal(e.info),e.interaction(t.currentTarget)}})):React.createElement("div",{id:"action"},React.createElement("i",{id:e.info.id,className:"fa-regular fa-circle-xmark",onClick:t=>{e.removeProd(t),e.interaction(t.currentTarget)}}))}),"Related Items & Comparison");const s=(0,i.Z)((function(e){if(0===e.info.length)return"";if(null===e.info.defaultStyle.sale_price)var t=e.info.defaultStyle.original_price;else t=e.info.defaultStyle.sale_price;if(null===e.info.defaultStyle.photos[0].thumbnail_url)var a="./img/NoImageThumbnail.png";else a=e.info.defaultStyle.photos[0].thumbnail_url;return r.createElement("div",{className:"card"},r.createElement(c,{info:e.info.product,prodName:e.info.product.name,actionButton:e.action,showModal:e.show,removeProd:e.remove}),r.createElement("div",{id:e.info.product.id,onClick:t=>{e.redirect(e.info.product.id),console.log(t.target.nodeName),e.interaction(t.target)}},r.createElement("p",null,r.createElement("img",{className:"rpcThumbnails",alt:"rpc thumbnails",src:a})),r.createElement("p",null,e.info.product.category),r.createElement("p",null,e.info.product.name),r.createElement("p",null,t),r.createElement(n.Z,{rating:e.info.rating})))}),"Related Items & Comparison")},666:(e,t,a)=>{a.r(t),a.d(t,{default:()=>i});var r=a(5466),n=a(5873);const i=(0,a(6120).Z)((function(e){const t=React.createRef(),[a,i]=(0,r.useState)(0),[c,s]=(0,r.useState)(""),[o,l]=(0,r.useState)(""),m=e.list.map(((t,a)=>React.createElement(n.Z,{action:!1,key:a,remove:e.removeProd,info:JSON.parse(localStorage.getItem(t)),redirect:e.changeProduct})));return(0,r.useEffect)((()=>{a.toString()+"px"=="0px"&&(s(!0),console.log()),a.toString()+"px"!="0px"&&s(!1),t.current.clientWidth<t.current.scrollWidth&&l(!1),t.current.clientWidth<t.current.scrollWidth||l(!0)}),[a]),React.createElement("div",{className:"container"},React.createElement("p",{"data-testid":"outfit"},"Your Outfit"),React.createElement("div",{className:"main-container"},c?"":React.createElement("button",{className:"nav Prev",onClick:t=>{e.interaction(t.target),i(a+300)}},"Prev"),React.createElement("div",{id:"carousel-container",ref:t},React.createElement("div",{id:"carousel",style:{transform:`translateX(${a.toString()}px)`}},React.createElement("div",{className:"card",onClick:t=>{e.add(t),e.interaction(t.target)}},React.createElement("i",{className:"fa-solid fa-plus"}),React.createElement("p",null,"Add to Outfit")),m)),o?"":React.createElement("button",{className:"nav Next",onClick:t=>{e.interaction(t.target),i(a-300)}},"Next")))}),"Related Items & Comparison")},6120:(e,t,a)=>{a.d(t,{Z:()=>s});var r=a(5466),n=a(4559),i=a.n(n);function c(){return c=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var r in a)Object.prototype.hasOwnProperty.call(a,r)&&(e[r]=a[r])}return e},c.apply(this,arguments)}const s=(e,t)=>{class a extends r.Component{constructor(e){super(e)}interactionFunc(e){var a=e.id?e.nodeName+"#"+e.id:e.nodeName+"."+e.className,r=String(new Date);i().post("/interactions",{element:a,widget:t,time:r}).then((e=>{201===e.status&&console.log(e.data)})).catch((e=>{console.error(e)}))}render(){return r.createElement(e,c({},this.props,{interaction:this.interactionFunc.bind(this)}))}}return a}}}]);