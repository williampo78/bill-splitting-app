import service from './api'


export const showGroupApi = async (data: { code: string }) => {
    return service({
        method: 'GET',
        url: `/group`,
        params: { code: data.code }
    })
}

export const createGroupApi = async (data: { name: string }) => {
    return service({
        method: 'POST',
        url: `/group`,
        data
    })
}

export const updateGroupUsersApi = async (id: number, data: { users: { _id?: string, name: string }[] }) => {
    return service({
        method: 'PATCH',
        url: `/group/${id}/users`,
        data
    })
}

export const getGroupUsersApi = async (groupId: string) => {
    return service({
        method: 'GET',
        url: `/group/${groupId}/users`,
    })
}