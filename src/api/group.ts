import service from './api'


export const showGroupApi = async (data: { code: string }) => {
    return service({
        method: 'GET',
        url: `/group`,
        params: { code: data.code }
    })
}