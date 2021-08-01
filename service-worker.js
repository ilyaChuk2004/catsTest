!function(){"use strict";var e={913:function(){try{self["workbox:core:6.1.5"]&&_()}catch(e){}},977:function(){try{self["workbox:precaching:6.1.5"]&&_()}catch(e){}},80:function(){try{self["workbox:routing:6.1.5"]&&_()}catch(e){}},873:function(){try{self["workbox:strategies:6.1.5"]&&_()}catch(e){}}},t={};function s(a){var n=t[a];if(void 0!==n)return n.exports;var r=t[a]={exports:{}};return e[a](r,r.exports,s),r.exports}!function(){s(913);const e=(e,...t)=>{let s=e;return t.length>0&&(s+=` :: ${JSON.stringify(t)}`),s};class t extends Error{constructor(t,s){super(e(t,s)),this.name=t,this.details=s}}const a={googleAnalytics:"googleAnalytics",precache:"precache-v2",prefix:"workbox",runtime:"runtime",suffix:"undefined"!=typeof registration?registration.scope:""},n=e=>[a.prefix,e,a.suffix].filter((e=>e&&e.length>0)).join("-"),r=e=>e||n(a.precache),i=e=>e||n(a.runtime);function c(e,t){const s=t();return e.waitUntil(s),s}s(977);function o(e){if(!e)throw new t("add-to-cache-list-unexpected-type",{entry:e});if("string"==typeof e){const t=new URL(e,location.href);return{cacheKey:t.href,url:t.href}}const{revision:s,url:a}=e;if(!a)throw new t("add-to-cache-list-unexpected-type",{entry:e});if(!s){const e=new URL(a,location.href);return{cacheKey:e.href,url:e.href}}const n=new URL(a,location.href),r=new URL(a,location.href);return n.searchParams.set("__WB_REVISION__",s),{cacheKey:n.href,url:r.href}}class h{constructor(){this.updatedURLs=[],this.notUpdatedURLs=[],this.handlerWillStart=async({request:e,state:t})=>{t&&(t.originalRequest=e)},this.cachedResponseWillBeUsed=async({event:e,state:t,cachedResponse:s})=>{if("install"===e.type){const e=t.originalRequest.url;s?this.notUpdatedURLs.push(e):this.updatedURLs.push(e)}return s}}}class l{constructor({precacheController:e}){this.cacheKeyWillBeUsed=async({request:e,params:t})=>{const s=t&&t.cacheKey||this._precacheController.getCacheKeyForURL(e.url);return s?new Request(s):e},this._precacheController=e}}let u;async function d(e,s){let a=null;if(e.url){a=new URL(e.url).origin}if(a!==self.location.origin)throw new t("cross-origin-copy-response",{origin:a});const n=e.clone(),r={headers:new Headers(n.headers),status:n.status,statusText:n.statusText},i=s?s(r):r,c=function(){if(void 0===u){const e=new Response("");if("body"in e)try{new Response(e.body),u=!0}catch(e){u=!1}u=!1}return u}()?n.body:await n.blob();return new Response(c,i)}function f(e,t){const s=new URL(e);for(const e of t)s.searchParams.delete(e);return s.href}class p{constructor(){this.promise=new Promise(((e,t)=>{this.resolve=e,this.reject=t}))}}const y=new Set;s(873);function w(e){return"string"==typeof e?new Request(e):e}class g{constructor(e,t){this._cacheKeys={},Object.assign(this,t),this.event=t.event,this._strategy=e,this._handlerDeferred=new p,this._extendLifetimePromises=[],this._plugins=[...e.plugins],this._pluginStateMap=new Map;for(const e of this._plugins)this._pluginStateMap.set(e,{});this.event.waitUntil(this._handlerDeferred.promise)}async fetch(e){const{event:s}=this;let a=w(e);if("navigate"===a.mode&&s instanceof FetchEvent&&s.preloadResponse){const e=await s.preloadResponse;if(e)return e}const n=this.hasCallback("fetchDidFail")?a.clone():null;try{for(const e of this.iterateCallbacks("requestWillFetch"))a=await e({request:a.clone(),event:s})}catch(e){throw new t("plugin-error-request-will-fetch",{thrownError:e})}const r=a.clone();try{let e;e=await fetch(a,"navigate"===a.mode?void 0:this._strategy.fetchOptions);for(const t of this.iterateCallbacks("fetchDidSucceed"))e=await t({event:s,request:r,response:e});return e}catch(e){throw n&&await this.runCallbacks("fetchDidFail",{error:e,event:s,originalRequest:n.clone(),request:r.clone()}),e}}async fetchAndCachePut(e){const t=await this.fetch(e),s=t.clone();return this.waitUntil(this.cachePut(e,s)),t}async cacheMatch(e){const t=w(e);let s;const{cacheName:a,matchOptions:n}=this._strategy,r=await this.getCacheKey(t,"read"),i={...n,cacheName:a};s=await caches.match(r,i);for(const e of this.iterateCallbacks("cachedResponseWillBeUsed"))s=await e({cacheName:a,matchOptions:n,cachedResponse:s,request:r,event:this.event})||void 0;return s}async cachePut(e,s){const a=w(e);var n;await(n=0,new Promise((e=>setTimeout(e,n))));const r=await this.getCacheKey(a,"write");if(!s)throw new t("cache-put-with-no-response",{url:(i=r.url,new URL(String(i),location.href).href.replace(new RegExp(`^${location.origin}`),""))});var i;const c=await this._ensureResponseSafeToCache(s);if(!c)return!1;const{cacheName:o,matchOptions:h}=this._strategy,l=await self.caches.open(o),u=this.hasCallback("cacheDidUpdate"),d=u?await async function(e,t,s,a){const n=f(t.url,s);if(t.url===n)return e.match(t,a);const r={...a,ignoreSearch:!0},i=await e.keys(t,r);for(const t of i)if(n===f(t.url,s))return e.match(t,a)}(l,r.clone(),["__WB_REVISION__"],h):null;try{await l.put(r,u?c.clone():c)}catch(e){throw"QuotaExceededError"===e.name&&await async function(){for(const e of y)await e()}(),e}for(const e of this.iterateCallbacks("cacheDidUpdate"))await e({cacheName:o,oldResponse:d,newResponse:c.clone(),request:r,event:this.event});return!0}async getCacheKey(e,t){if(!this._cacheKeys[t]){let s=e;for(const e of this.iterateCallbacks("cacheKeyWillBeUsed"))s=w(await e({mode:t,request:s,event:this.event,params:this.params}));this._cacheKeys[t]=s}return this._cacheKeys[t]}hasCallback(e){for(const t of this._strategy.plugins)if(e in t)return!0;return!1}async runCallbacks(e,t){for(const s of this.iterateCallbacks(e))await s(t)}*iterateCallbacks(e){for(const t of this._strategy.plugins)if("function"==typeof t[e]){const s=this._pluginStateMap.get(t),a=a=>{const n={...a,state:s};return t[e](n)};yield a}}waitUntil(e){return this._extendLifetimePromises.push(e),e}async doneWaiting(){let e;for(;e=this._extendLifetimePromises.shift();)await e}destroy(){this._handlerDeferred.resolve()}async _ensureResponseSafeToCache(e){let t=e,s=!1;for(const e of this.iterateCallbacks("cacheWillUpdate"))if(t=await e({request:this.request,response:t,event:this.event})||void 0,s=!0,!t)break;return s||t&&200!==t.status&&(t=void 0),t}}class m extends class{constructor(e={}){this.cacheName=i(e.cacheName),this.plugins=e.plugins||[],this.fetchOptions=e.fetchOptions,this.matchOptions=e.matchOptions}handle(e){const[t]=this.handleAll(e);return t}handleAll(e){e instanceof FetchEvent&&(e={event:e,request:e.request});const t=e.event,s="string"==typeof e.request?new Request(e.request):e.request,a="params"in e?e.params:void 0,n=new g(this,{event:t,request:s,params:a}),r=this._getResponse(n,s,t);return[r,this._awaitComplete(r,n,s,t)]}async _getResponse(e,s,a){let n;await e.runCallbacks("handlerWillStart",{event:a,request:s});try{if(n=await this._handle(s,e),!n||"error"===n.type)throw new t("no-response",{url:s.url})}catch(t){for(const r of e.iterateCallbacks("handlerDidError"))if(n=await r({error:t,event:a,request:s}),n)break;if(!n)throw t}for(const t of e.iterateCallbacks("handlerWillRespond"))n=await t({event:a,request:s,response:n});return n}async _awaitComplete(e,t,s,a){let n,r;try{n=await e}catch(r){}try{await t.runCallbacks("handlerDidRespond",{event:a,request:s,response:n}),await t.doneWaiting()}catch(e){r=e}if(await t.runCallbacks("handlerDidComplete",{event:a,request:s,response:n,error:r}),t.destroy(),r)throw r}}{constructor(e={}){e.cacheName=r(e.cacheName),super(e),this._fallbackToNetwork=!1!==e.fallbackToNetwork,this.plugins.push(m.copyRedirectedCacheableResponsesPlugin)}async _handle(e,t){const s=await t.cacheMatch(e);return s||(t.event&&"install"===t.event.type?await this._handleInstall(e,t):await this._handleFetch(e,t))}async _handleFetch(e,s){let a;if(!this._fallbackToNetwork)throw new t("missing-precache-entry",{cacheName:this.cacheName,url:e.url});return a=await s.fetch(e),a}async _handleInstall(e,s){this._useDefaultCacheabilityPluginIfNeeded();const a=await s.fetch(e);if(!await s.cachePut(e,a.clone()))throw new t("bad-precaching-response",{url:e.url,status:a.status});return a}_useDefaultCacheabilityPluginIfNeeded(){let e=null,t=0;for(const[s,a]of this.plugins.entries())a!==m.copyRedirectedCacheableResponsesPlugin&&(a===m.defaultPrecacheCacheabilityPlugin&&(e=s),a.cacheWillUpdate&&t++);0===t?this.plugins.push(m.defaultPrecacheCacheabilityPlugin):t>1&&null!==e&&this.plugins.splice(e,1)}}m.defaultPrecacheCacheabilityPlugin={cacheWillUpdate:async({response:e})=>!e||e.status>=400?null:e},m.copyRedirectedCacheableResponsesPlugin={cacheWillUpdate:async({response:e})=>e.redirected?await d(e):e};class _{constructor({cacheName:e,plugins:t=[],fallbackToNetwork:s=!0}={}){this._urlsToCacheKeys=new Map,this._urlsToCacheModes=new Map,this._cacheKeysToIntegrities=new Map,this._strategy=new m({cacheName:r(e),plugins:[...t,new l({precacheController:this})],fallbackToNetwork:s}),this.install=this.install.bind(this),this.activate=this.activate.bind(this)}get strategy(){return this._strategy}precache(e){this.addToCacheList(e),this._installAndActiveListenersAdded||(self.addEventListener("install",this.install),self.addEventListener("activate",this.activate),this._installAndActiveListenersAdded=!0)}addToCacheList(e){const s=[];for(const a of e){"string"==typeof a?s.push(a):a&&void 0===a.revision&&s.push(a.url);const{cacheKey:e,url:n}=o(a),r="string"!=typeof a&&a.revision?"reload":"default";if(this._urlsToCacheKeys.has(n)&&this._urlsToCacheKeys.get(n)!==e)throw new t("add-to-cache-list-conflicting-entries",{firstEntry:this._urlsToCacheKeys.get(n),secondEntry:e});if("string"!=typeof a&&a.integrity){if(this._cacheKeysToIntegrities.has(e)&&this._cacheKeysToIntegrities.get(e)!==a.integrity)throw new t("add-to-cache-list-conflicting-integrities",{url:n});this._cacheKeysToIntegrities.set(e,a.integrity)}if(this._urlsToCacheKeys.set(n,e),this._urlsToCacheModes.set(n,r),s.length>0){const e=`Workbox is precaching URLs without revision info: ${s.join(", ")}\nThis is generally NOT safe. Learn more at https://bit.ly/wb-precache`;console.warn(e)}}}install(e){return c(e,(async()=>{const t=new h;this.strategy.plugins.push(t);for(const[t,s]of this._urlsToCacheKeys){const a=this._cacheKeysToIntegrities.get(s),n=this._urlsToCacheModes.get(t),r=new Request(t,{integrity:a,cache:n,credentials:"same-origin"});await Promise.all(this.strategy.handleAll({params:{cacheKey:s},request:r,event:e}))}const{updatedURLs:s,notUpdatedURLs:a}=t;return{updatedURLs:s,notUpdatedURLs:a}}))}activate(e){return c(e,(async()=>{const e=await self.caches.open(this.strategy.cacheName),t=await e.keys(),s=new Set(this._urlsToCacheKeys.values()),a=[];for(const n of t)s.has(n.url)||(await e.delete(n),a.push(n.url));return{deletedURLs:a}}))}getURLsToCacheKeys(){return this._urlsToCacheKeys}getCachedURLs(){return[...this._urlsToCacheKeys.keys()]}getCacheKeyForURL(e){const t=new URL(e,location.href);return this._urlsToCacheKeys.get(t.href)}async matchPrecache(e){const t=e instanceof Request?e.url:e,s=this.getCacheKeyForURL(t);if(s){return(await self.caches.open(this.strategy.cacheName)).match(s)}}createHandlerBoundToURL(e){const s=this.getCacheKeyForURL(e);if(!s)throw new t("non-precached-url",{url:e});return t=>(t.request=new Request(e),t.params={cacheKey:s,...t.params},this.strategy.handle(t))}}let R;const v=()=>(R||(R=new _),R);s(80);const C=e=>e&&"object"==typeof e?e:{handle:e};class b{constructor(e,t,s="GET"){this.handler=C(t),this.match=e,this.method=s}setCatchHandler(e){this.catchHandler=C(e)}}class U extends b{constructor(e,t,s){super((({url:t})=>{const s=e.exec(t.href);if(s&&(t.origin===location.origin||0===s.index))return s.slice(1)}),t,s)}}class L{constructor(){this._routes=new Map,this._defaultHandlerMap=new Map}get routes(){return this._routes}addFetchListener(){self.addEventListener("fetch",(e=>{const{request:t}=e,s=this.handleRequest({request:t,event:e});s&&e.respondWith(s)}))}addCacheListener(){self.addEventListener("message",(e=>{if(e.data&&"CACHE_URLS"===e.data.type){const{payload:t}=e.data;0;const s=Promise.all(t.urlsToCache.map((t=>{"string"==typeof t&&(t=[t]);const s=new Request(...t);return this.handleRequest({request:s,event:e})})));e.waitUntil(s),e.ports&&e.ports[0]&&s.then((()=>e.ports[0].postMessage(!0)))}}))}handleRequest({request:e,event:t}){const s=new URL(e.url,location.href);if(!s.protocol.startsWith("http"))return void 0;const a=s.origin===location.origin,{params:n,route:r}=this.findMatchingRoute({event:t,request:e,sameOrigin:a,url:s});let i=r&&r.handler;const c=e.method;if(!i&&this._defaultHandlerMap.has(c)&&(i=this._defaultHandlerMap.get(c)),!i)return void 0;let o;try{o=i.handle({url:s,request:e,event:t,params:n})}catch(e){o=Promise.reject(e)}const h=r&&r.catchHandler;return o instanceof Promise&&(this._catchHandler||h)&&(o=o.catch((async a=>{if(h){0;try{return await h.handle({url:s,request:e,event:t,params:n})}catch(e){a=e}}if(this._catchHandler)return this._catchHandler.handle({url:s,request:e,event:t});throw a}))),o}findMatchingRoute({url:e,sameOrigin:t,request:s,event:a}){const n=this._routes.get(s.method)||[];for(const r of n){let n;const i=r.match({url:e,sameOrigin:t,request:s,event:a});if(i)return n=i,(Array.isArray(i)&&0===i.length||i.constructor===Object&&0===Object.keys(i).length||"boolean"==typeof i)&&(n=void 0),{route:r,params:n}}return{}}setDefaultHandler(e,t="GET"){this._defaultHandlerMap.set(t,C(e))}setCatchHandler(e){this._catchHandler=C(e)}registerRoute(e){this._routes.has(e.method)||this._routes.set(e.method,[]),this._routes.get(e.method).push(e)}unregisterRoute(e){if(!this._routes.has(e.method))throw new t("unregister-route-but-not-found-with-method",{method:e.method});const s=this._routes.get(e.method).indexOf(e);if(!(s>-1))throw new t("unregister-route-route-not-registered");this._routes.get(e.method).splice(s,1)}}let q;class k extends b{constructor(e,t){super((({request:s})=>{const a=e.getURLsToCacheKeys();for(const e of function*(e,{ignoreURLParametersMatching:t=[/^utm_/,/^fbclid$/],directoryIndex:s="index.html",cleanURLs:a=!0,urlManipulation:n}={}){const r=new URL(e,location.href);r.hash="",yield r.href;const i=function(e,t=[]){for(const s of[...e.searchParams.keys()])t.some((e=>e.test(s)))&&e.searchParams.delete(s);return e}(r,t);if(yield i.href,s&&i.pathname.endsWith("/")){const e=new URL(i.href);e.pathname+=s,yield e.href}if(a){const e=new URL(i.href);e.pathname+=".html",yield e.href}if(n){const e=n({url:r});for(const t of e)yield t.href}}(s.url,t)){const t=a.get(e);if(t)return{cacheKey:t}}}),e.strategy)}}function T(e){const s=v();!function(e,s,a){let n;if("string"==typeof e){const t=new URL(e,location.href);n=new b((({url:e})=>e.href===t.href),s,a)}else if(e instanceof RegExp)n=new U(e,s,a);else if("function"==typeof e)n=new b(e,s,a);else{if(!(e instanceof b))throw new t("unsupported-route-type",{moduleName:"workbox-routing",funcName:"registerRoute",paramName:"capture"});n=e}(q||(q=new L,q.addFetchListener(),q.addCacheListener()),q).registerRoute(n)}(new k(s,e))}var K;(function(e){v().precache(e)})([{'revision':'6acb60cc5c9a861cc92fa12c19d7c437','url':'./index.html'},{'revision':'8fddad231f5711d1f8c91d34cb72225b','url':'css/app.css'},{'revision':'c6546ec15ed6a158b7700b68e9dda2b9','url':'fonts/Framework7Icons-Regular.eot'},{'revision':'f4d98d919f98fd1811780fce8dea5bd3','url':'fonts/Framework7Icons-Regular.ttf'},{'revision':'467df1a37101758702c98600d491705c','url':'fonts/Framework7Icons-Regular.woff'},{'revision':'9393ad14858229d680936a6206688704','url':'fonts/Framework7Icons-Regular.woff2'},{'revision':'e79bfd88537def476913f3ed52f4f4b3','url':'fonts/MaterialIcons-Regular.eot'},{'revision':'a37b0c01c0baf1888ca812cc0508f6e2','url':'fonts/MaterialIcons-Regular.ttf'},{'revision':'012cf6a10129e2275d79d6adac7f3b02','url':'fonts/MaterialIcons-Regular.woff'},{'revision':'570eb83859dc23dd0eec423a49e147fe','url':'fonts/MaterialIcons-Regular.woff2'},{'revision':'f8f60c64b4d335db3d58c218637d6807','url':'js/app.js'},{'revision':'b3e033b6752709fae644dfbb5c8a4bde','url':'manifest.json'},{'revision':'275152cbd210774c779040403548627a','url':'static/back.json'},{'revision':'e7880cc7caee673c2489356130620bf6','url':'static/bottle.svg'},{'revision':'3306e38e2b48315fe3979ed7f80540cd','url':'static/clouds.webm'},{'revision':'4e35a6dad5f1ab5b385f86dfe97579b8','url':'static/icons/128x128.png'},{'revision':'47efa07843a29aff095e50015e084e85','url':'static/icons/144x144.png'},{'revision':'ab189ff1c3604cbecd2ccc180b6f7c25','url':'static/icons/152x152.png'},{'revision':'9ad7d46019f56396237834ced5038973','url':'static/icons/192x192.png'},{'revision':'28969ffd71e59d0bb2ca642ac8bb0134','url':'static/icons/256x256.png'},{'revision':'aa0c2f038e42624eb7ee396b272ee852','url':'static/icons/512x512.png'},{'revision':'4e94b1d1edaea36f052ec015c03ff26b','url':'static/icons/apple-touch-icon.png'},{'revision':'4e35a6dad5f1ab5b385f86dfe97579b8','url':'static/icons/favicon.png'},{'revision':'834a9c423644ef6e836c90af1b71ee49','url':'static/img/avas/l1/ava.webp'},{'revision':'f98dafe3a20cf4c6c27378393cb1eace','url':'static/img/avas/l1/ava2.png'},{'revision':'efcecc39ec642f58eceafaf0475e27a7','url':'static/img/avas/l1/ava2.webp'},{'revision':'faaddaa8c9e3656b5f5cea969f445266','url':'static/img/avas/l1/ava3.webp'},{'revision':'a9b3ea9da80dd8aaf524a7fc447f11ea','url':'static/img/avas/l1/ava4.webp'},{'revision':'3f5f4bb613c44255cd07383993e5e54d','url':'static/img/avas/l3/ava1.webp'},{'revision':'d77c3e6a236926a9298693bc13c14697','url':'static/img/avas/l3/ava2.webp'},{'revision':'11914f658b20bd619b63bd5af369459e','url':'static/img/avas/l9/ava1.webp'},{'revision':'275152cbd210774c779040403548627a','url':'static/img/back.json'},{'revision':'e7880cc7caee673c2489356130620bf6','url':'static/img/bottle.svg'},{'revision':'e9f3ad694ee4e5b263b64a0f3884f916','url':'static/img/cups/cup100.webp'},{'revision':'aad2a995317ec855673ea235298e1dad','url':'static/img/cups/cup200.png'},{'revision':'d932d546f5a27a9280ad50990c8b86bf','url':'static/img/cups/cup200.webp'},{'revision':'a9cc39678319b53bb97a96377c6ff387','url':'static/img/cups/cup50.png'},{'revision':'1e05739e747a8414dd77ae27141b2f48','url':'static/img/cups/cup50.webp'},{'revision':'97b3662437a2d629bdb9ae1fd9b6ae5b','url':'static/img/cups/old/cupCat.png'},{'revision':'1d42eb09d24260a1a8eff922deda5802','url':'static/img/cups/old/cupCat.webp'},{'revision':'7a5e300a41498784225af999454a0857','url':'static/img/cups/old/cupCatN.png'},{'revision':'4d2b6f14c388a8305274ffa565232a65','url':'static/img/cups/old/cupCatN.webp'},{'revision':'33f71d2f5756460c663fbfe52c255e60','url':'static/img/cups/old/debug.log'},{'revision':'7e2546f6d3cc3773f933c9d79309ad6f','url':'static/img/cups/old/glass.png'},{'revision':'9e5a87cb0ba62088f72ba8ad59dae700','url':'static/img/cups/old/glass.webp'},{'revision':'176731741df8bdc973f121038d26c1ca','url':'static/img/cups/old/glassN.png'},{'revision':'139f945f138b89c46a5f5af66d13c86b','url':'static/img/cups/old/glassN.webp'},{'revision':'ac811a096ee7540c2bc6186c402b5d11','url':'static/img/data.json'},{'revision':'ebc04eedeaa4154f4612d5a52a9d9cff','url':'static/img/emoji/beaming-face-with-smiling-eyes_1f601.png'},{'revision':'3d5d4e1487a3095e3130c20bfffba2ac','url':'static/img/emoji/clouds.png'},{'revision':'d4bd1e4d61f4108331b9f32e1867b5b6','url':'static/img/emoji/clouds.webp'},{'revision':'f98dafe3a20cf4c6c27378393cb1eace','url':'static/img/emoji/confused-face_1f615.png'},{'revision':'c03afd5b95a51a48735d311aa9ba6e43','url':'static/img/emoji/crying-face_1f622.png'},{'revision':'8a9263c253c3e31ec1e3660dec90272b','url':'static/img/emoji/moon.png'},{'revision':'1aef870a7dd0e8d0204ae323d79d5436','url':'static/img/emoji/moon.webp'},{'revision':'a475cb382afe0eb54e1b14d697a21dd6','url':'static/img/emoji/rain.png'},{'revision':'4da0df106745ac11da3b74dc917ed4ed','url':'static/img/emoji/rain.webp'},{'revision':'f009158e0d032732c265e2fd52d0a753','url':'static/img/emoji/slightly-smiling-face_1f642.png'},{'revision':'c96067dc2d201a0566c1d4d7948baed1','url':'static/img/emoji/snow.png'},{'revision':'afe1870d61e4430ad3b1a761988a01d5','url':'static/img/emoji/snow.webp'},{'revision':'3c6e0352eec17828066d59bb558eced6','url':'static/img/emoji/sun.png'},{'revision':'ab38c01e2bd8143a2f6d18d7e67505b3','url':'static/img/emoji/sun.webp'},{'revision':'a2f27073aa2953cce9b74bca8771de4d','url':'static/img/water.json'},{'revision':'74283197958139b33e496b3e54c54034','url':'static/img/waterW.json'},{'revision':'3fa4084765570104b309c01bf7fd1a69','url':'static/rClick.json'},{'revision':'99d2da640578b839c875f6476a595445','url':'static/rain.webm'},{'revision':'c37186a55807405151d90188da0a56fb','url':'static/snow.webm'},{'revision':'6b3b05132b4d5163babfb5c466927fa9','url':'static/teachCircle.json'},{'revision':'a2f27073aa2953cce9b74bca8771de4d','url':'static/water.json'},{'revision':'460291848fb354ddd34d2d0df7ededba','url':'static/water2.json'},{'revision':'74283197958139b33e496b3e54c54034','url':'static/waterW.json'}]||[]),T(K)}()}();
//# sourceMappingURL=service-worker.js.map