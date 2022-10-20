const baseURL = 'http://localhost:3333/'

async function loginAPI(body) {
    try {
        const login = await fetch(`${baseURL}login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
        const response = await login.json()
        console.log(await response)
    } catch (err) {
        console.log(err)

    }
}

async function registerAPI(body) {
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
    } catch (err) {
        console.log(err)
    }    
}

export {loginAPI, registerAPI}
