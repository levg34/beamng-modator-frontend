export const getUrl = async (url: string): Promise<any> => {
    const data = await (await fetch(url)).json()
    return data
}
