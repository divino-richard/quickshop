
export function getUserSession() {
    const userSession = localStorage.getItem('user');
    if (userSession) return JSON.parse(userSession??null);
    return null;
}

