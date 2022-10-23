import { fetchPosts, renderCards } from "../../scripts/renderCards.js"
import { fetchUser, renderUser } from "../../scripts/renderUser.js"
import { newPost } from "../../scripts/newPost.js"
import { deletePost } from "../../scripts/deletePost.js"
import { editPost } from "../../scripts/editPost.js"

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
    deletePost()
    newPost()
    showPostListener()
    editPost()
}

const dialog = document.querySelector('dialog')
dialog.addEventListener('close', () => {    
    document.querySelector('dialog').innerHTML = ''  
})

function showPostListener() {
    const buttons = document.querySelectorAll('.button-modal')
    buttons.forEach(button => {
        button.addEventListener('click', (event) => {
            const dialog = document.querySelector('dialog')
            const currentPost = event.target.closest('li').innerHTML
            dialog.insertAdjacentHTML('beforeend', `
            <section class="flex flex-column gap32">
                ${currentPost}
            </section>
            `)
            dialog.children[0].children[0].classList.add('flex-row')
            const buttonCloseModal = document.createElement('button')
            buttonCloseModal.innerText = 'X'
            dialog.children[0].children[0].children[1].innerHTML=''
            dialog.children[0].children[0].children[1].append(buttonCloseModal)
            dialog.children[0].children[1].children[2].remove()
            dialog.children[0].children[1].classList.add('post-content-modal')
            dialog.children[0].children[1].children[0].classList.remove('title-clip')
            dialog.children[0].children[1].children[1].classList.remove('content-clip')
            dialog.showModal()

            buttonCloseModal.addEventListener('click', () => {
                dialog.close()
            })
        })
    })
}

checkToken()
