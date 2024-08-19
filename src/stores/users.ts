import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { getGroupUsersApi, updateGroupUsersApi } from "@/api/user";


interface User {
    name: string;
    id?: number;
}

type State = {
    users: User[];
    getUsers: () => void;
}

export const useUserStore = create(
    persist<State>
        ((set) => ({
            users: [],
            getUsers: async () => {
                const { data } = await getGroupUsersApi("669d0457539ce90562ac344f");
                if (data?.length) {
                    set({ users: data })
                } else {
                    set({ users: [{ name: "" }] })
                }
                console.log(data);
            },
        }), { name: 'users' }
        )
)