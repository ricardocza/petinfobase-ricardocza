export {fetchPosts}

async function fetchPosts(token) {
    try {
        const cards = await fetch('http://localhost:3333/posts', {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer: ${token}`
            }
        })
        const response = await cards.json()
        if(!cards.ok) throw new Error('token inválido')
        else {
            renderCards(response)
        }
    }
    catch (err) {
        console.log(err)
        // window.location.replace('../../index.html')
    }
}

function renderCards(arrCards) {
    const cardList = document.querySelector('ul')
    arrCards.forEach(card => {
        const cardUser = card.user
        const {avatar, email, username} = cardUser
        const userId = cardUser.id
        const {content, createdAt, title} = card
        const postId = card.id
        console.log(userId, postId)
    });   
}