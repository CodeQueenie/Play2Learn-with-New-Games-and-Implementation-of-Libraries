//Login/Register

var loginContainer, registerContainer;

document.addEventListener('DOMContentLoaded', function () {

  loginContainer = document.getElementById('login-container')
  registerContainer = document.getElementById('register-container')

  console.log(registerContainer); 

  var registerLink = document.getElementById('register-link')
  var loginLink = document.getElementById('login-link')

  registerLink.addEventListener('click', function(e){
    e.preventDefault()
    loginContainer.classList.add('d-none');
    registerContainer.classList.remove('d-none');
})

loginLink.addEventListener('click', function(e){
    e.preventDefault()
    registerContainer.classList.add('d-none');
    loginContainer.classList.remove('d-none');
})
})

// Event listeners to forms
document.getElementById('registerForm').addEventListener('submit', function(e) {
  
  const agreementCheckbox = document.getElementById('agreement');
  
  if (!agreementCheckbox.checked) {
    e.preventDefault();
    alert('You must agree to the terms before continuing.');
    return;
  }
  
  e.preventDefault();

  let email = document.querySelector('#registerForm [name="email"]').value;
  let password = document.querySelector('#registerForm [name="password"]').value;

  alert('Register form submitted with Email: ' + email + " | Password: " + password);
  
  document.querySelector('#registerForm [name="email"]').value = '';
  document.querySelector('#registerForm [name="password"]').value = '';
  document.querySelector('#registerForm [name="repeat_password"]').value = '';
  
  registerContainer.style.display = 'none'; 
  loginContainer.style.display = 'block';
});

document.getElementById('loginForm').addEventListener('submit', function(e) {

  e.preventDefault();

  let email = document.querySelector('#loginForm [name="email"]').value;
  let password = document.querySelector('#loginForm [name="password"]').value;

  alert('Login form submitted with Email: ' + email + " | Password: " + password);

});