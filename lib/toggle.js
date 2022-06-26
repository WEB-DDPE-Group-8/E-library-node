const togglePassword = document.querySelector('#togglePassword');
const togglePassword2 = document.querySelector('#togglePassword2');
var password = document.querySelector('.pass');
var password2 = document.querySelector('.pass2');

togglePassword.addEventListener('click', function (e) {
    // toggle the type attribute
    let type = password.getAttribute('type') === 'password' ? 'text' : 'password';
    password.setAttribute('type', type);

    // toggle the eye slash icon
    this.classList.toggle('fa-eye-slash');
});

togglePassword2.addEventListener('click', function (e) {
    // toggle the type attribute
    let type2 = password2.getAttribute('type') === 'password' ? 'text' : 'password';
    password2.setAttribute('type', type2);

    // toggle the eye slash icon
    this.classList.toggle('fa-eye-slash');
});