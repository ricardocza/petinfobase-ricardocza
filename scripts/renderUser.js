async function fetchUser(token) {
    try {
        const user = await fetch('http://localhost:3333/users/profile', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer: ${token}`
            }
        })
        const response = await user.json()
        return response
    } catch (err) {
        console.log(err)
    }
}

async function renderUser(arrUser) {
    const {avatar, email, id, username} = await arrUser
    const avatarImg = document.querySelector('#avatar-img')
    avatarImg.children[0].src = avatar

    const userName = document.querySelector('.logout')
    let tagName = email.split('@')[0]    
    userName.children[0].innerText = `@${tagName}`    
}

export {renderUser, fetchUser}