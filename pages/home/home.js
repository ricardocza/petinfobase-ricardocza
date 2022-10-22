import { fetchPosts, renderCards } from "../../scripts/renderCards.js"
import { fetchUser, renderUser } from "../../scripts/renderUser.js"
import { newPost } from "../../scripts/newPost.js"
import { deletePost } from "../../scripts/deletePost.js"

async function checkToken() {
    const currentToken = localStorage.getItem('user') || sessionStorage.getItem('user') || ''
    if(!currentToken) window.location.replace('../../index.html')
    const parseCurrentToken = JSON.parse(currentToken)
    const userData = await fetchUser(parseCurrentToken)
    sessionStorage.setItem('userID', JSON.stringify(userData.id))
    updatePosts(parseCurrentToken)
}

function clearToken() {
    localStorage.setItem('user', '')
    sessionStorage.setItem('user', '')
    sessionStorage.setItem('userID', '')
}

const buttonLeave = document.querySelector('.button-leave')
buttonLeave.addEventListener('click', () => {
    clearToken()
    window.location.replace('../../index.html')
})

export async function updatePosts() {
    console.log('updating posts')
    const currentToken = localStorage.getItem('user') || sessionStorage.getItem('user') || ''
    const parseCurrentToken = JSON.parse(currentToken)
    const userData = await fetchUser(parseCurrentToken)
    const posts = await fetchPosts(parseCurrentToken)
    renderUser(userData)
    renderCards(posts)
    loadModals()
}

export function loadModals() {
    const modal = document.createElement('dialog')
    
    modal.insertAdjacentHTML('beforeend', `
     <div class="flex justify-space-between align-center">
        <h3>Criando novo post</h3>
        <button id="close-modal">X</button>
    </div>
    <section>
        <div class="flex">
            <label for="title"></label>
            <input type="text" name="title" placeholder="Digite o título aqui...">
        </div>
        <div>
            <label for="content"></label>
            <textarea name="content" id="" cols="30" rows="10"></textarea>
        </div>
    </section>
    <div>
        <button class="button-remove">Cancelar</button>
        <button class="button-brand">Publicar</button>
    </div>
    `)
    
    deletePost(modal)


}

newPost()
checkToken()