function toast(title, message, link = '') {
    checkToast()
    
    const body = document.querySelector('body')

    const toastDiv = document.createElement('div')
    const icon = document.createElement('img')

    toastDiv.classList = 'toast-container'
    icon.alt = `Mensagem de ${title}`

    const arrTitle = title.split(' ')
    const successText = arrTitle.find(text => text.toLowerCase() == 'sucesso!')
    if(successText == 'sucesso!') {
        toastDiv.classList.add('success-toast')
        icon.src = '../../src/img/succesIcon.png'
    } else {
        toastDiv.classList.add('error-toast')
        icon.src = '../../src/img/errorIcon.png'
    }

    const titleContainer = document.createElement('div')
    const h4 = document.createElement('h4')
    const p = document.createElement('p')
    
    titleContainer.classList = 'title-container'
    h4.innerText = title
    p.innerText = message
    
    if(link != '') {
        const homeLink = document.createElement('a')
        homeLink.href = '../../index.html'
        homeLink.innerText = ` ${link}`
        p.append(homeLink)
    }
    titleContainer.append(icon, h4)
    toastDiv.append(titleContainer, p)
    body.append(toastDiv)
}

function checkToast() {
    const oldToast = document.querySelector('.toast-container')
    if(oldToast) oldToast.remove()
}

export {toast, checkToast}