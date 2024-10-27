import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

interface User {
    name: string;
    id?: number;
}

type State = {
    headerTitle: string;
    groupInfo: any;
    users: User[];
    setHeaderTitle: (payload: string) => void;
    setGroupInfo: (payload: any) => void;
    setUsers: (users: User[]) => void;
}

export const useStore = create(
    persist<State>((set) => ({
        headerTitle: '',
        setHeaderTitle: (name: string) => set({ headerTitle: name }),
        groupInfo: {},
        setGroupInfo: (data: any) => set({ groupInfo: data }),
        users: [],
        setUsers: (users: User[]) => set({ users: users })

    }), { name: 'app-data' }
    )
)



