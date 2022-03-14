export const apis = {
    authentification: {
        register: '/users',
        login: '/users/login',
        forget: '/users/forgetpassword',
        resetpassword: '/users/resetpassword/',
        activate: '/users/activate/',
        logout: '/users/logout',
        update: '/users/',
        uploadavatar: '/users/uploadavatar',
        getall: '/users',
        deleteuser: '/users/',
    },
    categories: {
        create: '/categories',
        getall: '/categories',
        deletecategory: '/categories/',
    },
    products: {
        create: '/products',
        get: '/products',
        deleteprod: '/products/',
        search: '/products/search',
    }
}