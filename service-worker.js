!function(){"use strict";var e={913:function(){try{self["workbox:core:6.1.5"]&&_()}catch(e){}},977:function(){try{self["workbox:precaching:6.1.5"]&&_()}catch(e){}},80:function(){try{self["workbox:routing:6.1.5"]&&_()}catch(e){}},873:function(){try{self["workbox:strategies:6.1.5"]&&_()}catch(e){}}},t={};function s(a){var n=t[a];if(void 0!==n)return n.exports;var r=t[a]={exports:{}};return e[a](r,r.exports,s),r.exports}!function(){s(913);const e=(e,...t)=>{let s=e;return t.length>0&&(s+=` :: ${JSON.stringify(t)}`),s};class t extends Error{constructor(t,s){super(e(t,s)),this.name=t,this.details=s}}const a={googleAnalytics:"googleAnalytics",precache:"precache-v2",prefix:"workbox",runtime:"runtime",suffix:"undefined"!=typeof registration?registration.scope:""},n=e=>[a.prefix,e,a.suffix].filter((e=>e&&e.length>0)).join("-"),r=e=>e||n(a.precache),i=e=>e||n(a.runtime);function c(e,t){const s=t();return e.waitUntil(s),s}s(977);function o(e){if(!e)throw new t("add-to-cache-list-unexpected-type",{entry:e});if("string"==typeof e){const t=new URL(e,location.href);return{cacheKey:t.href,url:t.href}}const{revision:s,url:a}=e;if(!a)throw new t("add-to-cache-list-unexpected-type",{entry:e});if(!s){const e=new URL(a,location.href);return{cacheKey:e.href,url:e.href}}const n=new URL(a,location.href),r=new URL(a,location.href);return n.searchParams.set("__WB_REVISION__",s),{cacheKey:n.href,url:r.href}}class h{constructor(){this.updatedURLs=[],this.notUpdatedURLs=[],this.handlerWillStart=async({request:e,state:t})=>{t&&(t.originalRequest=e)},this.cachedResponseWillBeUsed=async({event:e,state:t,cachedResponse:s})=>{if("install"===e.type){const e=t.originalRequest.url;s?this.notUpdatedURLs.push(e):this.updatedURLs.push(e)}return s}}}class l{constructor({precacheController:e}){this.cacheKeyWillBeUsed=async({request:e,params:t})=>{const s=t&&t.cacheKey||this._precacheController.getCacheKeyForURL(e.url);return s?new Request(s):e},this._precacheController=e}}let u;async function d(e,s){let a=null;if(e.url){a=new URL(e.url).origin}if(a!==self.location.origin)throw new t("cross-origin-copy-response",{origin:a});const n=e.clone(),r={headers:new Headers(n.headers),status:n.status,statusText:n.statusText},i=s?s(r):r,c=function(){if(void 0===u){const e=new Response("");if("body"in e)try{new Response(e.body),u=!0}catch(e){u=!1}u=!1}return u}()?n.body:await n.blob();return new Response(c,i)}function f(e,t){const s=new URL(e);for(const e of t)s.searchParams.delete(e);return s.href}class p{constructor(){this.promise=new Promise(((e,t)=>{this.resolve=e,this.reject=t}))}}const y=new Set;s(873);function w(e){return"string"==typeof e?new Request(e):e}class g{constructor(e,t){this._cacheKeys={},Object.assign(this,t),this.event=t.event,this._strategy=e,this._handlerDeferred=new p,this._extendLifetimePromises=[],this._plugins=[...e.plugins],this._pluginStateMap=new Map;for(const e of this._plugins)this._pluginStateMap.set(e,{});this.event.waitUntil(this._handlerDeferred.promise)}async fetch(e){const{event:s}=this;let a=w(e);if("navigate"===a.mode&&s instanceof FetchEvent&&s.preloadResponse){const e=await s.preloadResponse;if(e)return e}const n=this.hasCallback("fetchDidFail")?a.clone():null;try{for(const e of this.iterateCallbacks("requestWillFetch"))a=await e({request:a.clone(),event:s})}catch(e){throw new t("plugin-error-request-will-fetch",{thrownError:e})}const r=a.clone();try{let e;e=await fetch(a,"navigate"===a.mode?void 0:this._strategy.fetchOptions);for(const t of this.iterateCallbacks("fetchDidSucceed"))e=await t({event:s,request:r,response:e});return e}catch(e){throw n&&await this.runCallbacks("fetchDidFail",{error:e,event:s,originalRequest:n.clone(),request:r.clone()}),e}}async fetchAndCachePut(e){const t=await this.fetch(e),s=t.clone();return this.waitUntil(this.cachePut(e,s)),t}async cacheMatch(e){const t=w(e);let s;const{cacheName:a,matchOptions:n}=this._strategy,r=await this.getCacheKey(t,"read"),i={...n,cacheName:a};s=await caches.match(r,i);for(const e of this.iterateCallbacks("cachedResponseWillBeUsed"))s=await e({cacheName:a,matchOptions:n,cachedResponse:s,request:r,event:this.event})||void 0;return s}async cachePut(e,s){const a=w(e);var n;await(n=0,new Promise((e=>setTimeout(e,n))));const r=await this.getCacheKey(a,"write");if(!s)throw new t("cache-put-with-no-response",{url:(i=r.url,new URL(String(i),location.href).href.replace(new RegExp(`^${location.origin}`),""))});var i;const c=await this._ensureResponseSafeToCache(s);if(!c)return!1;const{cacheName:o,matchOptions:h}=this._strategy,l=await self.caches.open(o),u=this.hasCallback("cacheDidUpdate"),d=u?await async function(e,t,s,a){const n=f(t.url,s);if(t.url===n)return e.match(t,a);const r={...a,ignoreSearch:!0},i=await e.keys(t,r);for(const t of i)if(n===f(t.url,s))return e.match(t,a)}(l,r.clone(),["__WB_REVISION__"],h):null;try{await l.put(r,u?c.clone():c)}catch(e){throw"QuotaExceededError"===e.name&&await async function(){for(const e of y)await e()}(),e}for(const e of this.iterateCallbacks("cacheDidUpdate"))await e({cacheName:o,oldResponse:d,newResponse:c.clone(),request:r,event:this.event});return!0}async getCacheKey(e,t){if(!this._cacheKeys[t]){let s=e;for(const e of this.iterateCallbacks("cacheKeyWillBeUsed"))s=w(await e({mode:t,request:s,event:this.event,params:this.params}));this._cacheKeys[t]=s}return this._cacheKeys[t]}hasCallback(e){for(const t of this._strategy.plugins)if(e in t)return!0;return!1}async runCallbacks(e,t){for(const s of this.iterateCallbacks(e))await s(t)}*iterateCallbacks(e){for(const t of this._strategy.plugins)if("function"==typeof t[e]){const s=this._pluginStateMap.get(t),a=a=>{const n={...a,state:s};return t[e](n)};yield a}}waitUntil(e){return this._extendLifetimePromises.push(e),e}async doneWaiting(){let e;for(;e=this._extendLifetimePromises.shift();)await e}destroy(){this._handlerDeferred.resolve()}async _ensureResponseSafeToCache(e){let t=e,s=!1;for(const e of this.iterateCallbacks("cacheWillUpdate"))if(t=await e({request:this.request,response:t,event:this.event})||void 0,s=!0,!t)break;return s||t&&200!==t.status&&(t=void 0),t}}class m extends class{constructor(e={}){this.cacheName=i(e.cacheName),this.plugins=e.plugins||[],this.fetchOptions=e.fetchOptions,this.matchOptions=e.matchOptions}handle(e){const[t]=this.handleAll(e);return t}handleAll(e){e instanceof FetchEvent&&(e={event:e,request:e.request});const t=e.event,s="string"==typeof e.request?new Request(e.request):e.request,a="params"in e?e.params:void 0,n=new g(this,{event:t,request:s,params:a}),r=this._getResponse(n,s,t);return[r,this._awaitComplete(r,n,s,t)]}async _getResponse(e,s,a){let n;await e.runCallbacks("handlerWillStart",{event:a,request:s});try{if(n=await this._handle(s,e),!n||"error"===n.type)throw new t("no-response",{url:s.url})}catch(t){for(const r of e.iterateCallbacks("handlerDidError"))if(n=await r({error:t,event:a,request:s}),n)break;if(!n)throw t}for(const t of e.iterateCallbacks("handlerWillRespond"))n=await t({event:a,request:s,response:n});return n}async _awaitComplete(e,t,s,a){let n,r;try{n=await e}catch(r){}try{await t.runCallbacks("handlerDidRespond",{event:a,request:s,response:n}),await t.doneWaiting()}catch(e){r=e}if(await t.runCallbacks("handlerDidComplete",{event:a,request:s,response:n,error:r}),t.destroy(),r)throw r}}{constructor(e={}){e.cacheName=r(e.cacheName),super(e),this._fallbackToNetwork=!1!==e.fallbackToNetwork,this.plugins.push(m.copyRedirectedCacheableResponsesPlugin)}async _handle(e,t){const s=await t.cacheMatch(e);return s||(t.event&&"install"===t.event.type?await this._handleInstall(e,t):await this._handleFetch(e,t))}async _handleFetch(e,s){let a;if(!this._fallbackToNetwork)throw new t("missing-precache-entry",{cacheName:this.cacheName,url:e.url});return a=await s.fetch(e),a}async _handleInstall(e,s){this._useDefaultCacheabilityPluginIfNeeded();const a=await s.fetch(e);if(!await s.cachePut(e,a.clone()))throw new t("bad-precaching-response",{url:e.url,status:a.status});return a}_useDefaultCacheabilityPluginIfNeeded(){let e=null,t=0;for(const[s,a]of this.plugins.entries())a!==m.copyRedirectedCacheableResponsesPlugin&&(a===m.defaultPrecacheCacheabilityPlugin&&(e=s),a.cacheWillUpdate&&t++);0===t?this.plugins.push(m.defaultPrecacheCacheabilityPlugin):t>1&&null!==e&&this.plugins.splice(e,1)}}m.defaultPrecacheCacheabilityPlugin={cacheWillUpdate:async({response:e})=>!e||e.status>=400?null:e},m.copyRedirectedCacheableResponsesPlugin={cacheWillUpdate:async({response:e})=>e.redirected?await d(e):e};class _{constructor({cacheName:e,plugins:t=[],fallbackToNetwork:s=!0}={}){this._urlsToCacheKeys=new Map,this._urlsToCacheModes=new Map,this._cacheKeysToIntegrities=new Map,this._strategy=new m({cacheName:r(e),plugins:[...t,new l({precacheController:this})],fallbackToNetwork:s}),this.install=this.install.bind(this),this.activate=this.activate.bind(this)}get strategy(){return this._strategy}precache(e){this.addToCacheList(e),this._installAndActiveListenersAdded||(self.addEventListener("install",this.install),self.addEventListener("activate",this.activate),this._installAndActiveListenersAdded=!0)}addToCacheList(e){const s=[];for(const a of e){"string"==typeof a?s.push(a):a&&void 0===a.revision&&s.push(a.url);const{cacheKey:e,url:n}=o(a),r="string"!=typeof a&&a.revision?"reload":"default";if(this._urlsToCacheKeys.has(n)&&this._urlsToCacheKeys.get(n)!==e)throw new t("add-to-cache-list-conflicting-entries",{firstEntry:this._urlsToCacheKeys.get(n),secondEntry:e});if("string"!=typeof a&&a.integrity){if(this._cacheKeysToIntegrities.has(e)&&this._cacheKeysToIntegrities.get(e)!==a.integrity)throw new t("add-to-cache-list-conflicting-integrities",{url:n});this._cacheKeysToIntegrities.set(e,a.integrity)}if(this._urlsToCacheKeys.set(n,e),this._urlsToCacheModes.set(n,r),s.length>0){const e=`Workbox is precaching URLs without revision info: ${s.join(", ")}\nThis is generally NOT safe. Learn more at https://bit.ly/wb-precache`;console.warn(e)}}}install(e){return c(e,(async()=>{const t=new h;this.strategy.plugins.push(t);for(const[t,s]of this._urlsToCacheKeys){const a=this._cacheKeysToIntegrities.get(s),n=this._urlsToCacheModes.get(t),r=new Request(t,{integrity:a,cache:n,credentials:"same-origin"});await Promise.all(this.strategy.handleAll({params:{cacheKey:s},request:r,event:e}))}const{updatedURLs:s,notUpdatedURLs:a}=t;return{updatedURLs:s,notUpdatedURLs:a}}))}activate(e){return c(e,(async()=>{const e=await self.caches.open(this.strategy.cacheName),t=await e.keys(),s=new Set(this._urlsToCacheKeys.values()),a=[];for(const n of t)s.has(n.url)||(await e.delete(n),a.push(n.url));return{deletedURLs:a}}))}getURLsToCacheKeys(){return this._urlsToCacheKeys}getCachedURLs(){return[...this._urlsToCacheKeys.keys()]}getCacheKeyForURL(e){const t=new URL(e,location.href);return this._urlsToCacheKeys.get(t.href)}async matchPrecache(e){const t=e instanceof Request?e.url:e,s=this.getCacheKeyForURL(t);if(s){return(await self.caches.open(this.strategy.cacheName)).match(s)}}createHandlerBoundToURL(e){const s=this.getCacheKeyForURL(e);if(!s)throw new t("non-precached-url",{url:e});return t=>(t.request=new Request(e),t.params={cacheKey:s,...t.params},this.strategy.handle(t))}}let R;const v=()=>(R||(R=new _),R);s(80);const C=e=>e&&"object"==typeof e?e:{handle:e};class b{constructor(e,t,s="GET"){this.handler=C(t),this.match=e,this.method=s}setCatchHandler(e){this.catchHandler=C(e)}}class U extends b{constructor(e,t,s){super((({url:t})=>{const s=e.exec(t.href);if(s&&(t.origin===location.origin||0===s.index))return s.slice(1)}),t,s)}}class L{constructor(){this._routes=new Map,this._defaultHandlerMap=new Map}get routes(){return this._routes}addFetchListener(){self.addEventListener("fetch",(e=>{const{request:t}=e,s=this.handleRequest({request:t,event:e});s&&e.respondWith(s)}))}addCacheListener(){self.addEventListener("message",(e=>{if(e.data&&"CACHE_URLS"===e.data.type){const{payload:t}=e.data;0;const s=Promise.all(t.urlsToCache.map((t=>{"string"==typeof t&&(t=[t]);const s=new Request(...t);return this.handleRequest({request:s,event:e})})));e.waitUntil(s),e.ports&&e.ports[0]&&s.then((()=>e.ports[0].postMessage(!0)))}}))}handleRequest({request:e,event:t}){const s=new URL(e.url,location.href);if(!s.protocol.startsWith("http"))return void 0;const a=s.origin===location.origin,{params:n,route:r}=this.findMatchingRoute({event:t,request:e,sameOrigin:a,url:s});let i=r&&r.handler;const c=e.method;if(!i&&this._defaultHandlerMap.has(c)&&(i=this._defaultHandlerMap.get(c)),!i)return void 0;let o;try{o=i.handle({url:s,request:e,event:t,params:n})}catch(e){o=Promise.reject(e)}const h=r&&r.catchHandler;return o instanceof Promise&&(this._catchHandler||h)&&(o=o.catch((async a=>{if(h){0;try{return await h.handle({url:s,request:e,event:t,params:n})}catch(e){a=e}}if(this._catchHandler)return this._catchHandler.handle({url:s,request:e,event:t});throw a}))),o}findMatchingRoute({url:e,sameOrigin:t,request:s,event:a}){const n=this._routes.get(s.method)||[];for(const r of n){let n;const i=r.match({url:e,sameOrigin:t,request:s,event:a});if(i)return n=i,(Array.isArray(i)&&0===i.length||i.constructor===Object&&0===Object.keys(i).length||"boolean"==typeof i)&&(n=void 0),{route:r,params:n}}return{}}setDefaultHandler(e,t="GET"){this._defaultHandlerMap.set(t,C(e))}setCatchHandler(e){this._catchHandler=C(e)}registerRoute(e){this._routes.has(e.method)||this._routes.set(e.method,[]),this._routes.get(e.method).push(e)}unregisterRoute(e){if(!this._routes.has(e.method))throw new t("unregister-route-but-not-found-with-method",{method:e.method});const s=this._routes.get(e.method).indexOf(e);if(!(s>-1))throw new t("unregister-route-route-not-registered");this._routes.get(e.method).splice(s,1)}}let q;class k extends b{constructor(e,t){super((({request:s})=>{const a=e.getURLsToCacheKeys();for(const e of function*(e,{ignoreURLParametersMatching:t=[/^utm_/,/^fbclid$/],directoryIndex:s="index.html",cleanURLs:a=!0,urlManipulation:n}={}){const r=new URL(e,location.href);r.hash="",yield r.href;const i=function(e,t=[]){for(const s of[...e.searchParams.keys()])t.some((e=>e.test(s)))&&e.searchParams.delete(s);return e}(r,t);if(yield i.href,s&&i.pathname.endsWith("/")){const e=new URL(i.href);e.pathname+=s,yield e.href}if(a){const e=new URL(i.href);e.pathname+=".html",yield e.href}if(n){const e=n({url:r});for(const t of e)yield t.href}}(s.url,t)){const t=a.get(e);if(t)return{cacheKey:t}}}),e.strategy)}}function T(e){const s=v();!function(e,s,a){let n;if("string"==typeof e){const t=new URL(e,location.href);n=new b((({url:e})=>e.href===t.href),s,a)}else if(e instanceof RegExp)n=new U(e,s,a);else if("function"==typeof e)n=new b(e,s,a);else{if(!(e instanceof b))throw new t("unsupported-route-type",{moduleName:"workbox-routing",funcName:"registerRoute",paramName:"capture"});n=e}(q||(q=new L,q.addFetchListener(),q.addCacheListener()),q).registerRoute(n)}(new k(s,e))}var K;(function(e){v().precache(e)})([{'revision':'e0de2306d4d08fd9bf51c5ac9dcc2f04','url':'./index.html'},{'revision':'00c3ecedb0b89324618cd0c97ec3886b','url':'css/app.css'},{'revision':'c6546ec15ed6a158b7700b68e9dda2b9','url':'fonts/Framework7Icons-Regular.eot'},{'revision':'f4d98d919f98fd1811780fce8dea5bd3','url':'fonts/Framework7Icons-Regular.ttf'},{'revision':'467df1a37101758702c98600d491705c','url':'fonts/Framework7Icons-Regular.woff'},{'revision':'9393ad14858229d680936a6206688704','url':'fonts/Framework7Icons-Regular.woff2'},{'revision':'e79bfd88537def476913f3ed52f4f4b3','url':'fonts/MaterialIcons-Regular.eot'},{'revision':'a37b0c01c0baf1888ca812cc0508f6e2','url':'fonts/MaterialIcons-Regular.ttf'},{'revision':'012cf6a10129e2275d79d6adac7f3b02','url':'fonts/MaterialIcons-Regular.woff'},{'revision':'570eb83859dc23dd0eec423a49e147fe','url':'fonts/MaterialIcons-Regular.woff2'},{'revision':'20e6c9cbf1f94298fffa555e3d6cefc4','url':'js/app.js'},{'revision':'ea6046877fb06e0b2bcd56c1610bc926','url':'js/app.js.LICENSE.txt'},{'revision':'bda9305fd3de96455dc6887373fe1586','url':'manifest.json'},{'revision':'900a9918fa641904b3449fb286b68056','url':'static/animations/boomsphere.json'},{'revision':'f06b04456461cef84ae2ba880e3dd12e','url':'static/animations/boomstick.json'},{'revision':'7c1f5fc10ccff0e1296a6838a773cccd','url':'static/animations/clap.json'},{'revision':'bab86c777ec26fd7aefaa6a5c1f1860a','url':'static/animations/fire.json'},{'revision':'e470070850e29992bf5ab58176570f69','url':'static/animations/headBoom.json'},{'revision':'38d73803b39f4ba8df96567f2b417142','url':'static/animations/sparks.json'},{'revision':'999d98ec0af8f9e9bc2ad08c8a7de1d5','url':'static/animations/thumb.json'},{'revision':'bde59fd3b51862cab0a7da183af15d85','url':'static/animations/twoFingers.json'},{'revision':'177095818e08541decb3417fcf54cef2','url':'static/animations/wow.json'},{'revision':'275152cbd210774c779040403548627a','url':'static/back.json'},{'revision':'e7880cc7caee673c2489356130620bf6','url':'static/bottle.svg'},{'revision':'3306e38e2b48315fe3979ed7f80540cd','url':'static/clouds.webm'},{'revision':'046053d709b96ed31d347b05cd5f288d','url':'static/clouds.webp'},{'revision':'19eeb649ea20af8e56427cddad610aeb','url':'static/compass.png'},{'revision':'fd095affc55fc85671ac7f3420cb9121','url':'static/compass.webm'},{'revision':'8182553ada5f9a4f6019cf8e15728ab8','url':'static/icons/128x128.png'},{'revision':'832f4b3536b776dcc839cb6597c7ebc3','url':'static/icons/144x144.png'},{'revision':'edbeae7b8ae33b07905ff28df310413d','url':'static/icons/152x152.png'},{'revision':'f3707225bb9b6a1bc3c6a37cd3d3e689','url':'static/icons/192x192.png'},{'revision':'406ad616cf1d258b857c986f9f5e2926','url':'static/icons/256x256.png'},{'revision':'3027eb3c211e91069275bf249b804c64','url':'static/icons/512x512.png'},{'revision':'406ad616cf1d258b857c986f9f5e2926','url':'static/icons/apple-touch-icon.png'},{'revision':'8182553ada5f9a4f6019cf8e15728ab8','url':'static/icons/favicon.png'},{'revision':'aa31adbc6ce0ef2564a97e1cc73e5aa1','url':'static/icons/maskable_icon_x192.png'},{'revision':'edf88d43089d9641dafdcf79a57cbbb6','url':'static/icons/maskable_icon_x512.png'},{'revision':'870e21520a80ed890b18f1fa859342a9','url':'static/img/avas/l1/ava.jpg'},{'revision':'4b27fc91df57651db64e808141dc4d24','url':'static/img/avas/l1/ava.webp'},{'revision':'39a7740f5c0bb1a7967e6625391cb145','url':'static/img/avas/l1/ava2.jpg'},{'revision':'f98dafe3a20cf4c6c27378393cb1eace','url':'static/img/avas/l1/ava2.png'},{'revision':'762c11c6c24b4d409ea65a244138c9f2','url':'static/img/avas/l1/ava2.webp'},{'revision':'249917f3164e73bdff2b1ad32c35322a','url':'static/img/avas/l1/ava3.jpg'},{'revision':'3fac3a07de8b415fffda5acdd5e8ff24','url':'static/img/avas/l1/ava3.webp'},{'revision':'a9b3ea9da80dd8aaf524a7fc447f11ea','url':'static/img/avas/l1/ava4.webp'},{'revision':'d9003f8dd904e1bac7d347b9eb832df8','url':'static/img/avas/l4/ava1.jpg'},{'revision':'6f120a839f09f8a226eb1a252e6d8980','url':'static/img/avas/l4/ava1.webp'},{'revision':'0f9751d51f412ccd5105768cbe27eaac','url':'static/img/avas/l4/ava2.jpg'},{'revision':'7656a3225f165648897a873b30609041','url':'static/img/avas/l4/ava2.webp'},{'revision':'ffc63a44a43828e387c631aa039ee3cd','url':'static/img/avas/l4/ava3.jpg'},{'revision':'854421be93295239c1e49bc011977fa0','url':'static/img/avas/l4/ava3.webp'},{'revision':'46710099a01476a885a44cfd728d3a28','url':'static/img/avas/l7/ava1.jpg'},{'revision':'d14949b29a7a389afac24e29acf3fd25','url':'static/img/avas/l7/ava1.webp'},{'revision':'7de3bb8194f9f868e54a8fae450dee02','url':'static/img/avas/l7/ava2.jpg'},{'revision':'eeb0d26036497854e6c8173950dba56c','url':'static/img/avas/l7/ava2.webp'},{'revision':'aed13c1052a31ff35e234876a1335810','url':'static/img/avas/l7/ava3.jpg'},{'revision':'bda0d4c291b03639394fbabc266db6fa','url':'static/img/avas/l7/ava3.webp'},{'revision':'24045fdfd7ffcbd522652b0f1236daa4','url':'static/img/avas/l9/ava1.jpg'},{'revision':'398a26762697f67ec059aab33105fee1','url':'static/img/avas/l9/ava1.webp'},{'revision':'70537257f60425e87969bb1bfa9ef913','url':'static/img/avas/l9/ava2.jpg'},{'revision':'11914f658b20bd619b63bd5af369459e','url':'static/img/avas/l9/ava2.webp'},{'revision':'dbd930574db480fe9e93a904158120b0','url':'static/img/avas/l9/ava3.jpg'},{'revision':'9280bd25a0f207c15dc95228d0912a19','url':'static/img/avas/l9/ava3.webp'},{'revision':'275152cbd210774c779040403548627a','url':'static/img/back.json'},{'revision':'e7880cc7caee673c2489356130620bf6','url':'static/img/bottle.svg'},{'revision':'4078ab7f2bbb8b5b6fed02e5c0789f0e','url':'static/img/clock.svg'},{'revision':'3306e38e2b48315fe3979ed7f80540cd','url':'static/img/clouds.webm'},{'revision':'f9d3611805dd361906536d95f4aedc70','url':'static/img/cups/cup100.png'},{'revision':'e9f3ad694ee4e5b263b64a0f3884f916','url':'static/img/cups/cup100.webp'},{'revision':'aad2a995317ec855673ea235298e1dad','url':'static/img/cups/cup200.png'},{'revision':'d932d546f5a27a9280ad50990c8b86bf','url':'static/img/cups/cup200.webp'},{'revision':'a9cc39678319b53bb97a96377c6ff387','url':'static/img/cups/cup50.png'},{'revision':'1e05739e747a8414dd77ae27141b2f48','url':'static/img/cups/cup50.webp'},{'revision':'97b3662437a2d629bdb9ae1fd9b6ae5b','url':'static/img/cups/old/cupCat.png'},{'revision':'1d42eb09d24260a1a8eff922deda5802','url':'static/img/cups/old/cupCat.webp'},{'revision':'7a5e300a41498784225af999454a0857','url':'static/img/cups/old/cupCatN.png'},{'revision':'4d2b6f14c388a8305274ffa565232a65','url':'static/img/cups/old/cupCatN.webp'},{'revision':'33f71d2f5756460c663fbfe52c255e60','url':'static/img/cups/old/debug.log'},{'revision':'7e2546f6d3cc3773f933c9d79309ad6f','url':'static/img/cups/old/glass.png'},{'revision':'9e5a87cb0ba62088f72ba8ad59dae700','url':'static/img/cups/old/glass.webp'},{'revision':'176731741df8bdc973f121038d26c1ca','url':'static/img/cups/old/glassN.png'},{'revision':'139f945f138b89c46a5f5af66d13c86b','url':'static/img/cups/old/glassN.webp'},{'revision':'ac811a096ee7540c2bc6186c402b5d11','url':'static/img/data.json'},{'revision':'c03afd5b95a51a48735d311aa9ba6e43','url':'static/img/emoji/-1.png'},{'revision':'f98dafe3a20cf4c6c27378393cb1eace','url':'static/img/emoji/0.png'},{'revision':'f009158e0d032732c265e2fd52d0a753','url':'static/img/emoji/1.png'},{'revision':'ebc04eedeaa4154f4612d5a52a9d9cff','url':'static/img/emoji/2.png'},{'revision':'3d5d4e1487a3095e3130c20bfffba2ac','url':'static/img/emoji/clouds.png'},{'revision':'d4bd1e4d61f4108331b9f32e1867b5b6','url':'static/img/emoji/clouds.webp'},{'revision':'8a9263c253c3e31ec1e3660dec90272b','url':'static/img/emoji/moon.png'},{'revision':'1aef870a7dd0e8d0204ae323d79d5436','url':'static/img/emoji/moon.webp'},{'revision':'a475cb382afe0eb54e1b14d697a21dd6','url':'static/img/emoji/rain.png'},{'revision':'4da0df106745ac11da3b74dc917ed4ed','url':'static/img/emoji/rain.webp'},{'revision':'c96067dc2d201a0566c1d4d7948baed1','url':'static/img/emoji/snow.png'},{'revision':'afe1870d61e4430ad3b1a761988a01d5','url':'static/img/emoji/snow.webp'},{'revision':'3c6e0352eec17828066d59bb558eced6','url':'static/img/emoji/sun.png'},{'revision':'ab38c01e2bd8143a2f6d18d7e67505b3','url':'static/img/emoji/sun.webp'},{'revision':'abe947571a1c861d3f7aaa5621e35b0a','url':'static/img/hard1.svg'},{'revision':'7d181dc6fb75075feba4065ca18654e0','url':'static/img/hard2.svg'},{'revision':'8770dcc00211608f5e76e2642a3deafa','url':'static/img/hard3.svg'},{'revision':'ac441c9127f57bf5c07c1815ed7a382e','url':'static/img/plus.svg'},{'revision':'0a290a4e81a4219bba0fdd11eeb14c2e','url':'static/img/speed1.svg'},{'revision':'3b91aaf6d1569d59e1bbd6ac316592f4','url':'static/img/speed2.svg'},{'revision':'f4ed2f010f6129138da3ba39cb63ffc1','url':'static/img/speed3.svg'},{'revision':'5f91d7158f7cbf5a178420ed36a5e262','url':'static/img/teach/lvl/5.ai'},{'revision':'542939abb5ba0be4e900d07d01cfe79c','url':'static/img/teach/lvl/gauge.ai'},{'revision':'70bdbee799ac46a68b9a6ea2b47516b0','url':'static/img/teach/lvl/gauge.svg'},{'revision':'9a8f0f99b698e90896f2ac64422cc4f8','url':'static/img/teach/lvl/lvl1.ai'},{'revision':'552a6a648ef44fa1dcb78932258d415f','url':'static/img/teach/lvl/lvl1.svg'},{'revision':'e396741339d23e7c9b961b7eb1ac4160','url':'static/img/teach/lvl/lvl2.ai'},{'revision':'a35f8bdce63fbdf15a8b5a7dca4bf710','url':'static/img/teach/lvl/lvl2.svg'},{'revision':'092d35a995a3caae4ba8193ac387cfee','url':'static/img/teach/lvl/lvl3.svg'},{'revision':'a306a7211e24d62785961b3db96306bc','url':'static/img/teach/lvl/lvl4.svg'},{'revision':'00eeb78be0b49ff3c32d585634aaafdd','url':'static/img/teach/lvl/lvl5.svg'},{'revision':'2803bda87748f79920d9ede082744a14','url':'static/img/teach/lvl/lvl7.svg'},{'revision':'838db0cce70160dcc3f34fbc355af0fb','url':'static/img/teach/lvl/lvl9.svg'},{'revision':'a02db969a6aebce0dd806047bd63b478','url':'static/img/teach/lvl/universalAva.ai'},{'revision':'a92c4eea805d92468a8e933f77d18ce9','url':'static/img/teach/lvl/Безымянный-4.ai'},{'revision':'e089616c45afa26c34b7487fc595cf3b','url':'static/img/val1.svg'},{'revision':'013045a2b66c785eb19facd0430040c8','url':'static/img/val2.svg'},{'revision':'91255364449397fb22bdf886f9353b4b','url':'static/img/val3.svg'},{'revision':'a2f27073aa2953cce9b74bca8771de4d','url':'static/img/water.json'},{'revision':'74283197958139b33e496b3e54c54034','url':'static/img/waterW.json'},{'revision':'b37b98bbb30a7f665de6309bac2be596','url':'static/libs/chart.js'},{'revision':'b2cf8f20ec80af3af460d9f2250fcf11','url':'static/libs/chart.js.LICENSE.txt'},{'revision':'3fa4084765570104b309c01bf7fd1a69','url':'static/rClick.json'},{'revision':'99d2da640578b839c875f6476a595445','url':'static/rain.webm'},{'revision':'e06ebe1bedc97d8643e42784c9956550','url':'static/rain.webp'},{'revision':'400bd9f855cefe6a13b02eb55a31d511','url':'static/sf.ttf'},{'revision':'c37186a55807405151d90188da0a56fb','url':'static/snow.webm'},{'revision':'faaa0832e7ad1fe7039874796118f4b4','url':'static/snow.webp'},{'revision':'6b3b05132b4d5163babfb5c466927fa9','url':'static/teachCircle.json'},{'revision':'a2f27073aa2953cce9b74bca8771de4d','url':'static/water.json'},{'revision':'460291848fb354ddd34d2d0df7ededba','url':'static/water2.json'},{'revision':'74283197958139b33e496b3e54c54034','url':'static/waterW.json'}]||[]),T(K)}()}();
//# sourceMappingURL=service-worker.js.map