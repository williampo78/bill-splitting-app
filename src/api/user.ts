import service from './api'

export const getGroupUsersApi = async (groupId: string) => {
    return service({
        method: 'GET',
        url: `/group/${groupId}/users`,
    })
}

export const updateGroupUsersApi = async (groupId: string, data: { users: { _id?: string, name: string }[] }) => {
    return service({
        method: 'PATCH',
        url: `/group/${groupId}/users`,
        data
    })
}