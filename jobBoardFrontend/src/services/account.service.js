let saveToken = (token, type) => {
    localStorage.setItem('token', token);
    localStorage.setItem('type', type);
}

let logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('type');
}

let isLogged = () => {
    let token = localStorage.getItem('token');
    return !!token
}

let getToken = () => {
    let token = localStorage.getItem('token');
    return token
}

export const accountService = {
    saveToken,
    logout,
    isLogged,
    getToken
}