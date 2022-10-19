import { loginAPI } from "../../scripts/api.js";

let body = {
    email: 'rafael@mail.com',
    password: '123456'
}

await loginAPI(body)