import { loginAPI } from "../../scripts/api.js";
export {loginError, checkbox}

const checkbox = document.querySelector('#checkbox')

function loginError() {
    const message = document.querySelector('.login-error')
    if(message.classList.contains('error-animation-out')) {
        message.classList.remove('error-animation-out')
    }
    message.classList.add('error-animation-in')
}

function inputsListener() {
    const form = document.querySelector('form')
    const formElements = [...form]
    formElements.forEach(element => {
        if(element.tagName == 'INPUT') {
            element.addEventListener('keyup', (event) => {
                if(event.key) {
                    const message = document.querySelector('.login-error')
                    if(message.classList.contains('error-animation-in')) {
                        message.classList = 'login-error error-animation-out'
                    }
                }
            })
        }
    })
}

function eventForm() {
    const form = document.querySelector('#login')
    const elements = [...form.elements]
    form.addEventListener('submit', async (event) => {
        event.preventDefault()
        const body = {}

        elements.forEach(element => {
            if(element.tagName === 'INPUT' && element.value != '') {
                body[element.id] = element.value
            }
        })
        
        await loginAPI(body)
})
}

inputsListener()
eventForm()