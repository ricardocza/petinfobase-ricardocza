import { toast, checkToast } from "./toast.js"
import { loginError } from "../pages/login/index.js"

const checkbox = document.querySelector('#checkbox')
const baseURL = 'http://localhost:3333/'

export async function loginAPI(body) {
    
    try {
        const login = await fetch(`${baseURL}login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
        const response = await login.json()
        const token = JSON.stringify(response.token)
        if(!login.ok){
            loginError()            
        }
        else {
            if(checkbox.checked) {
                localStorage.setItem('user', token)
            } 
            else sessionStorage.setItem('user', token)

            return response.token
        }
    } catch (err) {
        console.log(err)
        toast('Algo deu errado!', 'Existe algum problema com o servidor')
        setTimeout(() => {
            checkToast()
        }, 3500)
    }
}

export async function registerAPI(body) {
    try {
        const register = await fetch(`${baseURL}users/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
        const response = await register.json()
        console.log(response)
        if(!register.ok) {
            toast('Oops! Algo deu errado!', `Erro: ${response.message}`)
            setTimeout(() => {
                checkToast()
            }, 3500)
        } else {
            toast('Sua conta foi criada com sucesso!', 'Agora você pode acessar os conteúdos utilizando seu usuário e senha na página de login:', 'Acessar página de login')
            setTimeout(() => {
                window.location.assign("../../index.html")
            }, 3500)
        }
    } catch (err) {
        console.log(err)
        toast('Algo deu errado!', 'Existe algum problema com o servidor')
        setTimeout(() => {
            checkToast()
        }, 3500)
    }    
}

