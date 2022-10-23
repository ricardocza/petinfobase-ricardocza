async function fetchPosts(token) {
    try {
        const cards = await fetch('http://localhost:3333/posts', {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer: ${token}`
            }
        })
        const responsePosts = await cards.json()
        if(!cards.ok) throw new Error('token inválido')
        else {

            return responsePosts
        }
    }
    catch (err) {
        console.log(err)
        // window.location.replace('../../index.html')
    }
}

function renderCards(arrCards) {
    const loggedId = JSON.parse(sessionStorage.getItem('userID'))
    const cardList = document.querySelector('ul')
    cardList.innerHTML = ''
    arrCards.forEach(card => {
        const cardUser = card.user
        const {avatar, email, username} = cardUser
        const postUserId = cardUser.id
        const {content, createdAt, title} = card
        const postId = card.id
        
        const li = document.createElement('li')
        const sectionHeader = document.createElement('section')
        const divHeaderLeft = document.createElement('div')
        const divHeaderRight = document.createElement('div')
        const figure = document.createElement('figure')
        const img = document.createElement('img')
        const name = document.createElement('h3')
        const date = document.createElement('h3')
        const buttonEdit = document.createElement('button')
        const buttonRemove = document.createElement('button')

        const sectionPost = document.createElement('section')
        const postTitle = document.createElement('h2')
        const postDescription = document.createElement('p')
        const buttonModal = document.createElement('button')

        li.classList = 'flex flex-column gap20'
        li.id = postId
        sectionHeader.classList = 'flex align-center justify-space-between'
        divHeaderLeft.classList = 'flex align-center gap10'
        divHeaderRight.classList = 'flex gap10'
        figure.classList = 'user-figure'
        img.classList = 'li-img'
        name.classList = 'font-semi5'
        date.classList = 'font-semi5'
        date.style.color = '#868E96'
        buttonEdit.classList = 'button-default edit-post'
        buttonRemove.classList = 'button-remove'
        
        sectionPost.classList = 'flex flex-column gap20'
        postTitle.classList = 'title-clip'
        postDescription.classList = 'content-clip'
        buttonModal.classList = 'button-modal'

        img.src = avatar
        name.innerText = username
        date.innerText = `| ${createdAt}`
        if(loggedId === postUserId) {
            buttonEdit.innerText = 'Editar'
            buttonRemove.innerText = 'Excluir'
            divHeaderRight.append( buttonEdit, buttonRemove)
        }

        postTitle.innerText = title
        postDescription.innerText = content
        buttonModal.innerText = 'Acessar publicação'
        
        figure.append(img)
        divHeaderLeft.append(figure, name, date)
        sectionHeader.append(divHeaderLeft, divHeaderRight)
        sectionPost.append(postTitle, postDescription, buttonModal)
        li.append(sectionHeader, sectionPost)
        cardList.append(li)
    });  
}

export {fetchPosts, renderCards}
