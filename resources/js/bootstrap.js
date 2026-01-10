
import axios from 'axios';

// Ensure jQuery is available globally before AdminLTE
import $ from 'jquery';
window.$ = window.jQuery = $;

// Import Bootstrap and AdminLTE JavaScript
import 'bootstrap';
import 'admin-lte';

window.axios = axios;

window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
window.axios.defaults.headers.common['Accept'] = 'application/json';
window.axios.defaults.headers.common['Content-Type'] = 'application/json';

const csrfMeta = document.head.querySelector('meta[name="csrf-token"]');
if (csrfMeta?.content) {
  window.axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfMeta.content;
}

/**
* Configure axios for Laravel Sanctum
*/
axios.defaults.withCredentials = true;
axios.defaults.baseURL = window.location.origin;

const BOOKMARK_SESSION_KEY = 'ic_bookmark_session_id';

function ensureBookmarkSessionId() {
    if (typeof window === 'undefined') return null;
    let sessionId = window.localStorage.getItem(BOOKMARK_SESSION_KEY);
    if (!sessionId) {
        sessionId = `bm_${Math.random().toString(36).slice(2, 12)}_${Date.now()}`;
        window.localStorage.setItem(BOOKMARK_SESSION_KEY, sessionId);
    }
    return sessionId;
}

const bookmarkSessionId = ensureBookmarkSessionId();
if (bookmarkSessionId) {
    window.axios.defaults.headers.common['X-Bookmark-Session'] = bookmarkSessionId;
}

/**
* Add request interceptor to log requests for debugging
*/
axios.interceptors.request.use(
   config => {
       console.log(`Making ${config.method.toUpperCase()} request to: ${config.url}`);
       return config;
   },
   error => Promise.reject(error)
);

/**
* Add response interceptor to handle 401 errors globally
*/
axios.interceptors.response.use(
   response => {
       console.log(`Response from ${response.config.url}:`, response.status);
       return response;
   },
   error => {
       console.error(`Error response from ${error.config?.url}:`, error.response?.status, error.response?.data);
       
       if (error.response?.status === 401 && !window.location.pathname.includes('/login')) {
           console.log('Authentication required');
       }
       
       if (error.response?.status === 405) {
           console.error('Method not allowed:', error.config?.method, error.config?.url);
       }
       
       return Promise.reject(error);
   }
);
