export const makeRequest = async (path, options) => {
    const response = await fetch(params, {
        ...options
    })
    return response.json()
}