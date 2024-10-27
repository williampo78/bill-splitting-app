import service from './api'


export const showGroupApi = async (data: { code: string }) => {
    return service({
        method: 'GET',
        url: `/group`,
        params: { code: data.code }
    })
}

export const updateGroupUsersApi = async (id: number, data: { _id: string, name: string }[]) => {
    return service({
        method: 'PATCH',
        url: `/group/${id}/users`,
        data
    })
}