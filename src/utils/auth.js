
export function getToken() {
    return sessionStorage.getItem('cookie')
}

export function setToken(token) {
    sessionStorage.setItem('cookie', token)
}

export function removeToken() {
    sessionStorage.removeItem('cookie')
}
