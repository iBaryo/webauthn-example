import {LoginResponse, RegisterResponse} from "../../common/interfaces";

document.getElementById('register').onclick = async function register() {
    const {ok} = await post<RegisterResponse>('register', getUser());

    if (!ok) alert('user exists!');
    else alert('registered!');
};

document.getElementById('login').onclick = async function login() {
    const {ok} = await post<LoginResponse>('login', getUser());

    if (!ok) alert('wrong credentials!');
    else alert('logged in!');
};

function getUser() {
    return {
        id: (document.getElementById('userId') as HTMLInputElement).value,
        password: (document.getElementById('password') as HTMLInputElement).value
    };
}

function post<T>(endpoint: string, payload: object) {
    return fetch(`/${endpoint}`, {
        method: 'POST',
        headers: {
            'content-type': 'Application/Json'
        },
        body: JSON.stringify(payload)
    }).then(r => r.json() as Promise<T>);
}