"use strict";(self.webpackChunkgatsby_starter_default=self.webpackChunkgatsby_starter_default||[]).push([[293],{5192:function(e,t,n){n.r(t),n.d(t,{default:function(){return g}});var r=n(5540),o=n(6540),i=n(9248),a=n(1510),l=n(1299);const s=a.default.article.withConfig({displayName:"PostListItem__Wrapper",componentId:"sc-17kkp8i-0"})(["margin-bottom:1rem;text-align:center;padding:1rem;",""],l.A),c=a.default.div.withConfig({displayName:"PostListItem__Meta",componentId:"sc-17kkp8i-1"})(["font-size:0.8rem;color:var(--subtitle-color);"]),m=a.default.h2.withConfig({displayName:"PostListItem__Title",componentId:"sc-17kkp8i-2"})(["font-size:1.2rem;line-height:1.1;margin:0;margin-bottom:5px;word-break:keep-all;color:var(--title-color);"]),p=a.default.div.withConfig({displayName:"PostListItem__Description",componentId:"sc-17kkp8i-3"})(["color:var(--subtitle-color);font-size:0.9rem;line-height:1.2rem;word-break:keep-all;"]);var d=e=>{let{title:t,date:n,description:r}=e;return o.createElement(s,null,o.createElement(c,null,n),o.createElement(m,null,t),r&&o.createElement(p,null,r.slice(0,100),r.length>100&&"..."))};const u=a.default.div.withConfig({displayName:"PostList__Wrapper",componentId:"sc-1fkxmk3-0"})(["margin:0 auto;text-align:center;max-width:480px;"]);let f=function(e){function t(){return e.apply(this,arguments)||this}return(0,r.A)(t,e),t.prototype.render=function(){return o.createElement(u,null,this.props.markdownNodes.map((e=>o.createElement("a",{key:e.id,href:e.fields.slug,style:{textDecoration:"none",color:"inherit"}},o.createElement(d,{title:e.frontmatter.title,date:e.frontmatter.date,description:e.frontmatter.description})))))},t}(o.Component);var h=f;let k=function(e){function t(){return e.apply(this,arguments)||this}return(0,r.A)(t,e),t.prototype.render=function(){return o.createElement(i.A,null,o.createElement(h,{markdownNodes:this.props.data.allMarkdownRemark.edges.map((e=>{let{node:t}=e;return t}))}))},t}(o.Component);var g=k}}]);
//# sourceMappingURL=component---src-pages-index-js-5287f7ff1851f3c6644c.js.map