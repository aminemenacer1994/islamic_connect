<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Laravel + Vue.js Dark Mode</title>
  <link href="{{ asset('css/app.css') }}" rel="stylesheet">
  <style>
    /* Default light mode styles */
    body {
      background-color: #ffffff;
      color: #000000;
      transition: background-color 0.3s, color 0.3s;
    }

    /* Dark mode styles */
    .dark-mode {
      background-color: #121212;
      color: #ffffff;
    }
  </style>
</head>
<body :class="{ 'dark-mode': darkModeState.isDarkMode }">
  <div id="app">
    <dark-mode-toggle></dark-mode-toggle>
    <h1>Welcome to My App</h1>
    <p>This is a sample application with dark mode support.</p>
  </div>

  <script src="{{ asset('js/app.js') }}"></script>
</body>
</html>