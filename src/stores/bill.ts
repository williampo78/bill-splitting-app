import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

import type { Bill } from '@/type/bill'

type State = {
    bills: Bill[]
    setBills: (payload: Bill[]) => void;
}

export const useBillStore = create(
    persist<State>
        ((set) => ({
            bills: [],
            setBills: (payload: Bill[]) => set({ bills: payload }),
        }), { name: 'bills' }
        ))


