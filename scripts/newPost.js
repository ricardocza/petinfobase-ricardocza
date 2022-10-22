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
    buttonPost.addEventListener('click', async () => {
        dia

        // const body = {}
        // body.title = 'Titulo de teste'
        // body.content = 'Content template para testar o POST ao clicar no button'
        // const responsePost = await createPost(token, body)
        // console.log(responsePost)
        // if(responsePost) updatePosts()

    })

}
