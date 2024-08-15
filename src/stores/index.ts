import { create } from 'zustand'

type State = {
    headerTitle: string;
    setHeaderTitle: (payload: string) => void;
}

export const useStore = create<State>((set) => ({
    headerTitle: '',
    setHeaderTitle: (name: string) => set({ headerTitle: name }),
}))