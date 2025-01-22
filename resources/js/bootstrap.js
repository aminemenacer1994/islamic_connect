// Import Axios library
import axios from 'axios';

// Import Bootstrap styles and JavaScript
import 'bootstrap';

// Import AdminLTE styles and JavaScript
import 'admin-lte';

// // Import Popper.js for Bootstrap
// window.Popper = require('@popperjs/core');

// // Import jQuery
// window.$ = window.jQuery = require('jquery');

// Set Axios as a global variable
window.axios = axios;

// Set default headers for Axios requests
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
