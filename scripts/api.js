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

export {loginAPI}
