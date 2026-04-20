// ===== Tomation Playground — app.js =====
// Plain vanilla JS. No frameworks, no external deps.
// Each section is labelled for easy navigation.

// ===== DOM References =====
const usernameInput = document.getElementById('username-input');
const passwordInput = document.getElementById('password-input');
const loginButton   = document.getElementById('login-button');
const loginStatus   = document.getElementById('login-status');
const asyncSection  = document.getElementById('async-section');

// ===== Login Logic =====
// Validates credentials and updates #login-status.
// NOTE: These are intentionally weak, hardcoded credentials for testing purposes only.
//       This page is a test fixture, not a production login screen.
function handleLogin() {
  const username = usernameInput.value;
  const password = passwordInput.value;

  if (username === 'admin' && password === '1234') {
    loginStatus.textContent = 'Success';
  } else {
    loginStatus.textContent = 'Error';
  }
}

loginButton.addEventListener('click', handleLogin);

// ===== Debug Helpers =====
// Exposed on window.playground so automation scripts can call them directly.
window.playground = {
  // Fill the form with valid credentials
  fillValid: function () {
    usernameInput.value = 'admin';
    passwordInput.value = '1234';
  },

  // Fill the form with invalid credentials
  fillInvalid: function () {
    usernameInput.value = 'wrong';
    passwordInput.value = 'wrong';
  },

  // Clear all inputs and the status message
  reset: function () {
    usernameInput.value = '';
    passwordInput.value = '';
    loginStatus.textContent = '';
  }
};

// ===== URL State Control =====
// Allows driving the UI state via query params, e.g. ?state=success
// Supported values: success | error | empty
(function applyUrlState() {
  const params = new URLSearchParams(window.location.search);
  const state  = params.get('state');

  if (state === 'success') {
    loginStatus.textContent = 'Success';
  } else if (state === 'error') {
    loginStatus.textContent = 'Error';
  } else if (state === 'empty') {
    window.playground.reset();
  }
})();

// ===== Async Scenario =====
// After 2 seconds a #delayed-button is injected into #async-section.
// Used to test retry / wait-for-element logic in automation.
setTimeout(function addDelayedButton() {
  const btn = document.createElement('button');
  btn.id          = 'delayed-button';
  btn.textContent = 'Delayed Button';
  asyncSection.appendChild(btn);
}, 2000);
