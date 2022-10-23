import { updatePosts } from "../pages/home/home.js"

async function createPost(token, body) {
    try {

        const post = await fetch('http://localhost:3333/posts/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer: ${JSON.parse(token)}`
            },
            body: JSON.stringify(body)
        })
        const response = await post.json()
        console.log(response)
        return 'post enviado com sucesso'
    }
    catch (err) {
        console.log(err)
        console.log('caiu no catch')
    }
}
export function newPost() {
    const buttonPost = document.querySelector('#button-create-post')
    const token = localStorage.getItem('user') || sessionStorage.getItem('user')
    const dialog = document.querySelector('dialog')

    buttonPost.addEventListener('click', () => {
        dialog.showModal()

        dialog.insertAdjacentHTML('beforeend', `
            <section>
                <div class="flex justify-space-between align-center">
                    <h3>Criando novo post</h3>
                    <button class="close-modal x-modal">X</button>
                </div>
                <section id="inputs" class="flex flex-column gap20">
                    <div class="flex flex-column gap10">
                        <label for="title">Título do post</label>
                        <input id="title" type="text" name="title" placeholder="Digite o título aqui...">
                    </div>
                    <div class="flex flex-column gap10">
                        <label for="content">Conteúdo do post</label>
                        <textarea name="content" id="content" placeholder="Desenvolva o conteúdo do post aqui..."></textarea>
                    </div>
                </section>
                <div class="modal-buttons">
                    <button class="button-remove close-modal">Cancelar</button>
                    <button id="postIt" class="button-brand">Publicar</button>
                </div>
            </section>
        `)
        const closeModal = document.querySelectorAll('.close-modal')
        closeModal.forEach(button => {
            button.addEventListener('click', () => {
                dialog.close()
            })
        })
        const buttonSendPost = document.querySelector('#postIt')
        buttonSendPost.addEventListener('click', async () => {
            const title = document.querySelector('#title')         
            const content = document.querySelector('#content')
            const body = {}
    
            if(title.value && content.value) {
                body.title = title.value
                body.content = content.value
                const responsePost = await createPost(token, body)
                if(responsePost) {
                    dialog.close()
                    updatePosts()
                } 
            }    
        })
    })



}
