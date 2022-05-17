export const makeRequest = async (path, options) => {
    const response = await fetch(path, {
        ...options
    })
    return response.json()
}