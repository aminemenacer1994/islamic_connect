
import axios from 'axios';

// Ensure jQuery is available globally before AdminLTE
import $ from 'jquery';
window.$ = window.jQuery = $;

// Import Bootstrap once and expose it globally for tooltips/modals.
import * as bootstrap from 'bootstrap';
window.bootstrap = bootstrap;

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

const loadAdminLteIfNeeded = async () => {
    if (typeof document === 'undefined') return;
    const requiresAdminLte = !!document.querySelector('.admin-page, .main-sidebar, .content-wrapper, body.admin-page');
    if (!requiresAdminLte) return;
    try {
        await import('admin-lte');
    } catch (_) {
        // Keep public pages resilient if the admin-only enhancement fails to load.
    }
};

if (typeof document !== 'undefined') {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', loadAdminLteIfNeeded, { once: true });
    } else {
        loadAdminLteIfNeeded();
    }
}
