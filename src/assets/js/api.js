const api = {
    checkAuthData() {

        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(true);
                
            }, 1000)
        })

    }
}

export default api;