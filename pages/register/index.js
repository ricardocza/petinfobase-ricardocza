import { registerAPI } from "../../scripts/api.js";
import {toast} from "../../scripts/toast.js";

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
        
        await registerAPI(body)
})
}
// toast('Post deletado com sucesso', 'Olar')
eventForm()