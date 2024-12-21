import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { showGroupApi } from '@/api/group';


interface User {
    name: string;
    _id?: string;
}

type State = {
    headerTitle: string;
    groupInfo: any;
    users: User[];
    setHeaderTitle: (payload: string) => void;
    setGroupInfo: (payload: any) => void;
    setUsers: (users: User[]) => void;
    getGroupInfo: (payload: string) => Promise<void>
}

export const useStore = create(
    persist<State>((set) => ({
        headerTitle: '',
        setHeaderTitle: (name: string) => set({ headerTitle: name }),
        groupInfo: {},
        setGroupInfo: (data: any) => set({ groupInfo: data }),
        users: [],
        setUsers: (users: User[]) => set({ users: users }),
        getGroupInfo: async (code: string) => {
            try {
                const { data } = await showGroupApi({ code });  // API call
                set({ groupInfo: data });  // Update the store with group info
                set({ users: data.users });  // Update the store with group info
            } catch (error: any) {
                const message = error.response?.data?.error || 'An error occurred';
                throw new Error(message);  // Optionally rethrow for error handling in components
            }
        }

    }), { name: 'app-data' }
    )
)



