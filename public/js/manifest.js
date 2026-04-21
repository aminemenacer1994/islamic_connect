/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/create fake namespace object */
/******/ 	(() => {
/******/ 		var getProto = Object.getPrototypeOf ? (obj) => (Object.getPrototypeOf(obj)) : (obj) => (obj.__proto__);
/******/ 		var leafPrototypes;
/******/ 		// create a fake namespace object
/******/ 		// mode & 1: value is a module id, require it
/******/ 		// mode & 2: merge all properties of value into the ns
/******/ 		// mode & 4: return value when already ns object
/******/ 		// mode & 16: return value when it's Promise-like
/******/ 		// mode & 8|1: behave like require
/******/ 		__webpack_require__.t = function(value, mode) {
/******/ 			if(mode & 1) value = this(value);
/******/ 			if(mode & 8) return value;
/******/ 			if(typeof value === 'object' && value) {
/******/ 				if((mode & 4) && value.__esModule) return value;
/******/ 				if((mode & 16) && typeof value.then === 'function') return value;
/******/ 			}
/******/ 			var ns = Object.create(null);
/******/ 			__webpack_require__.r(ns);
/******/ 			var def = {};
/******/ 			leafPrototypes = leafPrototypes || [null, getProto({}), getProto([]), getProto(getProto)];
/******/ 			for(var current = mode & 2 && value; (typeof current == 'object' || typeof current == 'function') && !~leafPrototypes.indexOf(current); current = getProto(current)) {
/******/ 				Object.getOwnPropertyNames(current).forEach((key) => (def[key] = () => (value[key])));
/******/ 			}
/******/ 			def['default'] = () => (value);
/******/ 			__webpack_require__.d(ns, def);
/******/ 			return ns;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/ensure chunk */
/******/ 	(() => {
/******/ 		__webpack_require__.f = {};
/******/ 		// This file contains only the entry chunk.
/******/ 		// The chunk loading function for additional chunks
/******/ 		__webpack_require__.e = (chunkId) => {
/******/ 			return Promise.all(Object.keys(__webpack_require__.f).reduce((promises, key) => {
/******/ 				__webpack_require__.f[key](chunkId, promises);
/******/ 				return promises;
/******/ 			}, []));
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/get javascript chunk filename */
/******/ 	(() => {
/******/ 		// This function allow to reference async chunks
/******/ 		__webpack_require__.u = (chunkId) => {
/******/ 			// return url for filenames based on template
/******/ 			return "js/" + chunkId + "." + {"resources_js_components_SubscriptionComponent_vue":"de157c3ce7e26c41","resources_js_components_DarkModeToggle_vue":"0114b39deb888682","resources_js_components_admin_panels_UsersComponent_vue":"42fa5e61d12d6bb0","resources_js_components_admin_panels_MailingListComponent_vue":"e4fd8ae059051a73","resources_js_components_admin_panels_FeedbackComponent_vue":"20d55e6c1d2a3d39","resources_js_components_admin_panels_PaymentComponent_vue":"6fcbb9d08dafac78","resources_js_components_admin_panels_DonationComponent_vue":"bd6223256d7adf46","resources_js_components_admin_panels_ProfileComponent_vue":"cba75d066acd0ae6","resources_js_components_admin_panels_DashboardComponent_vue":"bf9d0c41e22bcdea","resources_js_components_admin_panels_AiReportsComponent_vue":"d6f21a3761ff310f","resources_js_components_HomepageComponent_vue":"ebef823cca41dbd2","resources_js_components_PricingComponent_vue":"97a4883e03785bd8","resources_js_components_ContactComponent_vue":"37a3334dc192db27","resources_js_components_CharityComponent_vue":"a4769071c7dc620c","resources_js_components_VolunteerComponent_vue":"90c0648d6cfbd5de","resources_js_components_DigitalLibraryComponent_vue":"aa767483d3a6de2e","resources_js_components_AhadithComponent_vue":"d9c9726a32984527","resources_js_components_admin_panels_CorrectionComponent_vue":"88db06c51c5e3c83","resources_js_components_QuranComponent_vue":"8da992eca1e5499c","resources_js_components_AboutComponent_vue":"22a8a764b019698e","resources_js_components_AboutUsComponent_vue":"21a1bedacfc7ddbc","resources_js_components_admin_panels_BookmarkComponent_vue":"71d4e02a7a10c01c","resources_js_components_admin_panels_PlaylistComponent_vue":"ecbb49552d3da0ca","resources_js_components_admin_panels_PinsComponent_vue":"8ec9ca4b6ebded26","resources_js_components_UpdatesComponent_vue":"d38849e4ecba08b9","resources_js_components_JoinUsComponent_vue":"4cd75c58b8ff84b0","resources_js_components_admin_panels_NotesComponent_vue":"e366ed93df72b1fb","resources_js_components_admin_panels_GroupNotesComponent_vue":"ac01a0a820f1d48f","resources_js_components_MissionComponent_vue":"8646e1e35a362a4c","resources_js_components_AccessComponent_vue":"aaaeea26766b807f","resources_js_components_ContentComponent_vue":"b221eb54eb475ecc","resources_js_components_SuratComponent_vue":"0d5444a56f33ce9c","resources_js_components_surah_selection_CustomSurahSelection_vue":"5f518bbb5834a3da","resources_js_components_search_SurahList_vue":"606737230528a014","resources_js_components_intro_Donation_vue":"527777c9d88e2dea","resources_js_components_admin_panels_CollectionComponent_vue":"e75021f1eceb9718","resources_js_components_tinymce_TinymceEditor_vue":"91e1b1c1adb1034c","resources_js_components_FaqComponent_vue":"85613c37107dd662","resources_js_components_SupportComponent_vue":"912611275a65053f","resources_js_components_DuaComponent_vue":"2e5c7c59ccb86083","resources_js_components_RadioComponent_vue":"a3c11f72c640ba98","resources_js_components_GuideComponent_vue":"2359712f6988b61b","resources_js_components_StreamingComponent_vue":"ab151d327b29061f","resources_js_components_ToolkitComponent_vue":"626d75d607524bbc","resources_js_components_VideoComponent_vue":"85cecabba8c85bb0","resources_js_components_ZakatComponent_vue":"ffd22ad4fb5a74f3","resources_js_components_QiblaComponent_vue":"e2441154a7860c12","resources_js_components_MosqueComponent_vue":"f46945a860163545","resources_js_components_CalendarComponent_vue":"5b4843a6aa41b31b","resources_js_components_DateComponent_vue":"3ac65e200889aaa4","resources_js_components_HadithComponent_vue":"2441275062f7ab01","resources_js_components_ShopComponent_vue":"8813a9f7adf7c147","resources_js_components_TasbeehComponent_vue":"91b6025149a6d35b","resources_js_components_AthkarComponenet_vue":"5656766f35534d65","resources_js_components_FinanceComponent_vue":"60a2408680bcbee6","resources_js_components_UmrahComponent_vue":"2a2c13ded9db7831","resources_js_components_NameComponent_vue":"48d9818cbd9262a7","resources_js_components_PrayerComponent_vue":"69825cd6de1e7881","resources_js_components_TravelComponent_vue":"10d1e9e1b6e5db80","resources_js_components_MediaComponent_vue":"b99f5ad594289734","resources_js_components_KnowledgeComponent_vue":"8f9acf222d516dc5","resources_js_components_ServicesComponent_vue":"c638ea3856d87621","resources_js_components_StoreComponent_vue":"b41d4291b4fecf56","resources_js_components_FoodComponent_vue":"d21cca3e08e97457","resources_js_components_SchoolComponent_vue":"d32e747e4d30180e","resources_js_components_WelfareComponent_vue":"cfa132f612596545","resources_js_components_BooksComponent_vue":"a9195a67800e19b2","resources_js_components_ConvertComponent_vue":"9f7e2c9cab924426","resources_js_components_HolyComponent_vue":"5842f63a2a703c66","resources_js_components_HistoryComponent_vue":"e830b6013198db0f","resources_js_components_PaymentMethodsComponent_vue":"3eddb120244e9b51","resources_js_components_ReadComponent_vue":"44e70dc01057189f","resources_js_components_IslamicBlogComponent_vue":"3ad4d56a915bffad","resources_js_components_RevertComponent_vue":"13d399fc6559f1e3","resources_js_components_MuslimComponent_vue":"13c2b7a7734c1421","resources_js_components_bookmarks_BookmarkManager_vue":"e6ac9e05e72e08ad","resources_js_components_bookmarks_SharedFolderView_vue":"79774e3c41490a0e","resources_js_components_ResourcesComponent_vue":"ae0a353dc38b8629","resources_js_components_Ramadan2026Component_vue":"17df85f938ef288e","resources_components_vue_HajjComponent_vue":"1c69c56b835986d4","resources_js_components_AiComponent_vue":"36f6173181478585","resources_js_components_IslamComponent_vue":"20a6732f4bb3b43e","resources_js_components_YouthComponent_vue":"6ef2a73641c00e84","resources_js_components_ParentingComponent_vue":"4bf4e69d10b90759","resources_components_vue_SuratComponent_vue":"d569e3f73d54665e","resources_components_vue_MissionComponent_vue":"ea127d92f82c4433","resources_components_vue_CalendarComponent_vue":"cfd25f14b6f4e0ad","resources_components_vue_DuaComponent_vue":"375ea4e46d291683","resources_components_vue_data_chapterVideos_json":"24347b1206ec3483","resources_components_vue_date_flexiblePlanTracks_json":"48dbf774ede93143","resources_components_vue_date_flexibleChapterNotes_json":"8b1d6a52ad657b88","resources_components_vue_date_dailyMicroChallenges_json":"13c0b42078daac55"}[chunkId] + ".js";
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/get mini-css chunk filename */
/******/ 	(() => {
/******/ 		// This function allow to reference all chunks
/******/ 		__webpack_require__.miniCssF = (chunkId) => {
/******/ 			// return url for filenames based on template
/******/ 			return "" + chunkId + ".css";
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/load script */
/******/ 	(() => {
/******/ 		var inProgress = {};
/******/ 		// data-webpack is not used as build has no uniqueName
/******/ 		// loadScript function to load a script via script tag
/******/ 		__webpack_require__.l = (url, done, key, chunkId) => {
/******/ 			if(inProgress[url]) { inProgress[url].push(done); return; }
/******/ 			var script, needAttach;
/******/ 			if(key !== undefined) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				for(var i = 0; i < scripts.length; i++) {
/******/ 					var s = scripts[i];
/******/ 					if(s.getAttribute("src") == url) { script = s; break; }
/******/ 				}
/******/ 			}
/******/ 			if(!script) {
/******/ 				needAttach = true;
/******/ 				script = document.createElement('script');
/******/ 		
/******/ 				script.charset = 'utf-8';
/******/ 				script.timeout = 120;
/******/ 				if (__webpack_require__.nc) {
/******/ 					script.setAttribute("nonce", __webpack_require__.nc);
/******/ 				}
/******/ 		
/******/ 		
/******/ 				script.src = url;
/******/ 			}
/******/ 			inProgress[url] = [done];
/******/ 			var onScriptComplete = (prev, event) => {
/******/ 				// avoid mem leaks in IE.
/******/ 				script.onerror = script.onload = null;
/******/ 				clearTimeout(timeout);
/******/ 				var doneFns = inProgress[url];
/******/ 				delete inProgress[url];
/******/ 				script.parentNode && script.parentNode.removeChild(script);
/******/ 				doneFns && doneFns.forEach((fn) => (fn(event)));
/******/ 				if(prev) return prev(event);
/******/ 			}
/******/ 			var timeout = setTimeout(onScriptComplete.bind(null, undefined, { type: 'timeout', target: script }), 120000);
/******/ 			script.onerror = onScriptComplete.bind(null, script.onerror);
/******/ 			script.onload = onScriptComplete.bind(null, script.onload);
/******/ 			needAttach && document.head.appendChild(script);
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/node module decorator */
/******/ 	(() => {
/******/ 		__webpack_require__.nmd = (module) => {
/******/ 			module.paths = [];
/******/ 			if (!module.children) module.children = [];
/******/ 			return module;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		__webpack_require__.p = "/";
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"/js/manifest": 0,
/******/ 			"css/app": 0,
/******/ 			"css/layout": 0,
/******/ 			"css/vue-runtime": 0
/******/ 		};
/******/ 		
/******/ 		__webpack_require__.f.j = (chunkId, promises) => {
/******/ 				// JSONP chunk loading for javascript
/******/ 				var installedChunkData = __webpack_require__.o(installedChunks, chunkId) ? installedChunks[chunkId] : undefined;
/******/ 				if(installedChunkData !== 0) { // 0 means "already installed".
/******/ 		
/******/ 					// a Promise means "currently loading".
/******/ 					if(installedChunkData) {
/******/ 						promises.push(installedChunkData[2]);
/******/ 					} else {
/******/ 						if(!/^(css\/(app|layout|vue\-runtime)|\/js\/manifest)$/.test(chunkId)) {
/******/ 							// setup Promise in chunk cache
/******/ 							var promise = new Promise((resolve, reject) => (installedChunkData = installedChunks[chunkId] = [resolve, reject]));
/******/ 							promises.push(installedChunkData[2] = promise);
/******/ 		
/******/ 							// start chunk loading
/******/ 							var url = __webpack_require__.p + __webpack_require__.u(chunkId);
/******/ 							// create error before stack unwound to get useful stacktrace later
/******/ 							var error = new Error();
/******/ 							var loadingEnded = (event) => {
/******/ 								if(__webpack_require__.o(installedChunks, chunkId)) {
/******/ 									installedChunkData = installedChunks[chunkId];
/******/ 									if(installedChunkData !== 0) installedChunks[chunkId] = undefined;
/******/ 									if(installedChunkData) {
/******/ 										var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 										var realSrc = event && event.target && event.target.src;
/******/ 										error.message = 'Loading chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')';
/******/ 										error.name = 'ChunkLoadError';
/******/ 										error.type = errorType;
/******/ 										error.request = realSrc;
/******/ 										installedChunkData[1](error);
/******/ 									}
/******/ 								}
/******/ 							};
/******/ 							__webpack_require__.l(url, loadingEnded, "chunk-" + chunkId, chunkId);
/******/ 						} else installedChunks[chunkId] = 0;
/******/ 					}
/******/ 				}
/******/ 		};
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunk"] = self["webpackChunk"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	
/******/ })()
;