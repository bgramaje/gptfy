import { create } from 'zustand';

const useStore = create((set) => ({
    accessToken: null,
    refreshToken: null,
    setAccessToken: (accessToken: string) => set({ accessToken }),
    setRefreshToken: (refreshToken: string) => set({ refreshToken }),
}));

export default useStore
