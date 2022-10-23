import { updatePosts } from "../pages/home/home.js"

async function removePost(token, postID) {
    try {
        const post = await fetch(`http://localhost:3333/posts/${postID}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer: ${JSON.parse(token)}`
            },
        })
        const response = await post.json()
        console.log(response)
        return 'post removido com sucesso'
    }
    catch (err) {
        console.log(err)
        console.log('caiu no catch')
    }
}
export function deletePost() {
    const token = localStorage.getItem('user') || sessionStorage.getItem('user')
    const buttonRemove = document.querySelectorAll('.button-remove')
    const dialog = document.querySelector('dialog')

    buttonRemove.forEach(button => {
        button.addEventListener('click', async (event) => {
            dialog.insertAdjacentHTML('beforeend', `
                <section>

                    <div class="flex justify-space-between align-center">
                        <h3>Confirmação de exclusão</h3>
                        <button class="close-modal x-modal">X</button>
                    </div>
                    <section class="flex flex-column gap16" >
                        <h2>Tem certeza que deseja excluir este post?</h2>
                        <p>Essa ação não poderá ser desfeita, então pedimos que tenha cautela antes de concluir</p>        
                    </section>
                    <div class="modal-buttons">
                        <button class="button-remove close-modal">Cancelar</button>
                        <button class="confirm-remove-button">Sim, excluir este post</button>
                    </div>
                </section>
            `)
            dialog.showModal()
            const closeModal = document.querySelectorAll('.close-modal')
            closeModal.forEach(button => {
                button.addEventListener('click', () => {
                    dialog.close()
                })
            })

            const removePostButton = document.querySelector('.confirm-remove-button')
            removePostButton.addEventListener('click', async () => {
                const postID = event.target.closest('li').id
                const deleteResponse = await removePost(token, postID)
                console.log(deleteResponse)
                if (deleteResponse) {
                    updatePosts()
                    dialog.close()
                }
            })
        })
    })
}
