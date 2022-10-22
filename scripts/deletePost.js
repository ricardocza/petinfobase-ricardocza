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
export function deletePost(htmlModal) {
    const token = localStorage.getItem('user') || sessionStorage.getItem('user')
    const buttonRemove = document.querySelectorAll('.button-remove')
    const body = document.querySelector('body')
    buttonRemove.forEach(button => {
        button.addEventListener('click', async (event) => {
            console.log(htmlModal.children)
            body.append(htmlModal)
            htmlModal.showModal()
            const closeModal = document.querySelector('#close-modal')
            closeModal.onclick = () => {
                htmlModal.close()
            }
            // const postID = event.target.closest('li').id            
            // const deleteResponse = await removePost(token, postID)
            // console.log(deleteResponse)
            // if(deleteResponse) updatePosts()
        })  
    })
}
