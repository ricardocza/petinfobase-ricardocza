import { updatePosts } from "../pages/home/home.js"

async function fetchEditPost(token, body,postID) {
    try {
        const edit = await fetch(`http://localhost:3333/posts/${postID}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer: ${JSON.parse(token)}`
            },
            body: JSON.stringify(body)
        })
        return edit.ok
    }
    catch (err){
        console.log(err)
    }
}


export function editPost() {
    const edit = document.querySelectorAll('.edit-post') 
    const dialog = document.querySelector('dialog')
    edit.forEach(button => {
        button.addEventListener('click', (event) => {
            const currentPost = event.target.closest('li')
            const titleOriginal = currentPost.children[1].children[0].innerText
            const contentOriginal = currentPost.children[1].children[1].innerText
            dialog.insertAdjacentHTML('beforeend', `
            <section>
                <div class="flex justify-space-between align-center">
                    <h3>Editar post</h3>
                    <button class="close-modal">X</button>
                </div>
                <section id="inputs" class="flex flex-column gap20">
                    <div class="flex flex-column gap10">
                        <label for="title">Título do post</label>
                        <input id="title" type="text" name="title" placeholder="Digite o título aqui...">
                    </div>
                    <div class="flex flex-column gap10">
                        <label for="content">Conteúdo do post</label>
                        <textarea name="content" id="content" placeholder="Desenvolva o conteúdo do post aqui...">${contentOriginal}</textarea>
                    </div>
                </section>
                <div class="modal-buttons">
                    <button class="button-remove close-modal">Cancelar</button>
                    <button id="editPost" class="button-brand">Editar Publicação</button>
                </div>
            </section>`)
            document.querySelector('#title').value = titleOriginal
            dialog.showModal()

            const closeModal = document.querySelectorAll('.close-modal')
            closeModal.forEach(buttonClose => {
                buttonClose.addEventListener('click', () => {
                    dialog.close()
                })
            })

            const editButton = document.querySelector('#editPost')
            editButton.addEventListener('click', async () => {
                const currentTitle = document.querySelector('#title').value
                const currentContent = document.querySelector('#content').value
                
                if(currentTitle && currentContent && currentTitle != titleOriginal || currentContent != contentOriginal) {
                    const token = localStorage.getItem('user') || sessionStorage.getItem('user')
                    let body = {}
                    body.title = currentTitle
                    body.content = currentContent
                    const editResponse = await fetchEditPost(token, body, currentPost.id)
                    if(editResponse) {
                        updatePosts()
                        dialog.close()
                    }
                }
            })
        })
    })
    
}