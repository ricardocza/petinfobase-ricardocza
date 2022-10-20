function toast(title, message) {
    const body = document.querySelector('body')

    const toastDiv = document.createElement('div')
    const icon = document.createElement('img')

    toastDiv.classList = 'toast-container'
    icon.alt = `Mensagem de ${title}`

    if(title == 'Sucesso') {
        toastDiv.classList.add('succesToast')
        icon.src = '../../src/img/succesIcon.png'
    } else {
        toastDiv.classList.add('errorToast')
        icon.src = '../../src/img/errorIcon.png'
    }

    const textContainer = document.createElement('div')
    const h4 = document.createElement('h4')
    const span = document.createElement('span')

    h4.innerText = title
    span.innerText = message
    
    textContainer.append(h4, span)
    toastDiv.append(icon, textContainer)
    body.append(toastDiv)
}

export {toast}