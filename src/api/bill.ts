import service from './api'


export const getBillsAPi = async (data: { groupId: string }) => {
    return service({
        method: 'GET',
        url: `/bills`,
        params: data
    })
}