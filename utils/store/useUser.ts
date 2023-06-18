import { create } from 'zustand'

interface UserState {
    user: any
    setUser: (user: any) => void
    isUserReady: boolean
    setIsUserReady: (isUserReady: boolean) => void
}

const useUser  = create<UserState>()(
      (set) => ({
        user: null,
        setUser: (user) => set({user: user}),
        isUserReady: false,
        setIsUserReady: (isUserReady) => set({isUserReady: isUserReady})
      })
)

export default useUser;