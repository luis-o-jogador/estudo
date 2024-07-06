const input = document.querySelector('.login_input');
const button = document.querySelector('.login_button');

const validateInput = () => {
    if (input.value.length > 0) {
        button.removeAttribute('disabled');
    } else {
        button.setAttribute('disabled','');
    }
}

input.addEventListener('input',validateInput);
