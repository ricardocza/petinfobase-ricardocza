import { loginAPI } from "../../scripts/api.js";

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

eventForm()