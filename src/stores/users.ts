import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

interface User {
    name: string;
    id?: number;
}

type State = {
    users: User[];
    getUsers: (users: User[]) => void;
}

export const useUserStore = create(
    persist<State>
        ((set) => ({
            users: [],
            getUsers: (users: User[]) => set({ users: users })

        }), { name: 'users' }
        )
)