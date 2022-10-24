import { loginAPI } from "../../scripts/api.js"


export function loginError() {
    const message = document.querySelector('.login-error')
    const inputPassword = document.querySelector('#password')
    if(message.classList.contains('error-animation-out')) {
        message.classList.remove('error-animation-out')
    }
    inputPassword.classList.add('input-error')
    message.classList.add('error-animation-in')
}

    const form = document.querySelector('form')
    const formElements = [...form]
    formElements.forEach(element => {
        if(element.tagName == 'INPUT') {
            element.addEventListener('keyup', (event) => {
                checkForm(formElements)
                if(event.key) {
                    // const message = document.querySelector('.login-error')
                    if(message.classList.contains('error-animation-in')) {
                        message.classList = 'login-error error-animation-out'
                    }
                }
            })
        }
    })

    form.addEventListener('submit', async (event) => {
        event.preventDefault()
        const body = {}

        formElements.forEach(element => {
            if(element.tagName === 'INPUT' && element.value != '') {
                body[element.id] = element.value
            }
        })
        if(body.email && body.password) {
            loadingLogin()
            const response = await loginAPI(body)
            
            if(response) {
               setTimeout(() => window.location.assign('./pages/home/home.html'), 1000) 
            } 
            else setTimeout(() =>{loadingLogin()}, 2000)
        }
})

export function loadingLogin() {
    const button = document.querySelector('#button-login')
    const spinner = document.createElement('img')
    spinner.classList = 'animate-spinner'
    if(button.innerText === 'Acessar' || button.innerText === 'Cadastrar') {
        button.innerText = ''
        spinner.src = '../../src/img/spinner.png'
        button.append(spinner)
    } 
    else {
        button.innerText = 'Acessar'
        spinner.classList.remove('animate-spinner')
    }
}

function checkForm(arrElements) {
    let inputs = []
    const lastElement = arrElements.length-1
    arrElements.forEach(element => {
        if(element.tagName == 'INPUT' && element.id != 'checkbox') {
            inputs.push(element)
        } 
        
    })
    
    if(inputs.every(input => input.value)) {
        arrElements[lastElement].classList = 'button-brand'
    } else arrElements[lastElement].classList = 'button-disabled'
    

}