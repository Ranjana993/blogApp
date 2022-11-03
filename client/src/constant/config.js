export const API_NOTIFICATION_MESSAGE = {
    loading: {
        title: "loading...",
        message: "data is being loading , please wait ."
    },
    success: {
        title: 'Success',
        message: 'data successfully loaded '
    },
    responseFailure: {
        title: 'Error',
        message: 'an error occured while fetching response  from server , try again later.'
    },
    requestFailure: {
        title: 'eror',
        message: 'error occured while parsing request data '
    },
    networkError: {
        title: 'error',
        message: "Unable to connect the server, plz check internet connectivity ."
    }
}



export const SERVICE_URL = {
    userSignup: { url: '/signup', method: 'POST' }
}