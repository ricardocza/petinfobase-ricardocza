import { fetchPosts } from "../../scripts/renderCards.js"
function checkToken() {
    const currentToken = localStorage.getItem('user') || sessionStorage.getItem('user') || ''
    if(!currentToken) window.location.replace('../../index.html')
    return fetchPosts(JSON.parse(currentToken))
}

function clearToken() {
    localStorage.setItem('user', '')
    sessionStorage.setItem('user', '')
}

const buttonLeave = document.querySelector('.button-leave')
buttonLeave.addEventListener('click', () => {
    clearToken()
    window.location.replace('../../index.html')
})

checkToken()