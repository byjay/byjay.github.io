"use strict";(self.webpackChunkgatsby_starter_default=self.webpackChunkgatsby_starter_default||[]).push([[480],{7560:function(t,e,n){n.r(e);var o=n(5540),a=n(6540),i=n(8154),r=n(1510),l=n(9788),m=n(9248);const c=r.default.div.withConfig({displayName:"post__Wrapper",componentId:"sc-q9naw2-0"})(["max-width:600px;padding:1rem 0;margin:auto;"]),s=r.default.div.withConfig({displayName:"post__Time",componentId:"sc-q9naw2-1"})(["font-weight:300;font-size:1rem;margin:0.5rem;font-weight:bold;text-align:center;color:var(--subtitle-color);"]),p=r.default.h1.withConfig({displayName:"post__Title",componentId:"sc-q9naw2-2"})(["font-weight:bold;font-size:1.4rem;margin:0.5rem;text-align:center;word-break:keep-all;color:var(--title-color);"]),d=r.default.div.withConfig({displayName:"post__Description",componentId:"sc-q9naw2-3"})(["color:var(--subtitle-color);word-break:keep-all;margin:0.5rem;text-align:center;"]),g=r.default.div.withConfig({displayName:"post__Content",componentId:"sc-q9naw2-4"})(["margin-top:2rem;& iframe{","}img{display:block;margin:0 auto;}h3{line-height:1.4;}"],l.$.mobile`
        width: 100%;
        height: 100%;
      `);let u=function(t){function e(){return t.apply(this,arguments)||this}(0,o.A)(e,t);var n=e.prototype;return n.componentDidMount=function(){},n.render=function(){const t=this.props.data.markdownRemark,{slug:e}=this.props.data.markdownRemark.fields,n=`https://jayonthegreen.github.io${e}`,{title:o,description:r,keywords:l=[],image:u=this.props.data.site.siteMetadata.image||"/img/og.jpeg",date:h}=t.frontmatter,f="https://jayonthegreen.github.io"+u,w=[{name:"title",content:o},{name:"description",content:r},{name:"keywords",content:[l||o].join(",")},{name:"image",content:f},{property:"og:description",content:r},{property:"og:title",content:o},{property:"og:image",content:f}];return a.createElement(m.A,null,a.createElement(c,null,a.createElement(i.A,{meta:w},a.createElement("title",null,o),a.createElement("link",{rel:"canonical",href:n})),a.createElement(s,null,h),a.createElement(p,null,t.frontmatter.title),a.createElement(d,null,t.frontmatter.description),a.createElement(g,{dangerouslySetInnerHTML:{__html:t.html}})))},e}(a.Component);e.default=u}}]);
//# sourceMappingURL=component---src-templates-post-js-b178f2152d47a8ce645f.js.map