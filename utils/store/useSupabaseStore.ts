import { create } from 'zustand'

interface ChatsState {
    supabase: any
    setSupabaseClient: (supabase: any) => void
    isSupabaseReady: boolean
    setIsSupabaseReady: (isSupabaseReady: boolean) => void
}

const useSupabaseStore  = create<ChatsState>()(
      (set) => ({
        supabase: null,
        setSupabaseClient: (supabase) => set({supabase: supabase}),
        isSupabaseReady: false,
        setIsSupabaseReady: (isSupabaseReady) => set({isSupabaseReady: isSupabaseReady})
      })
)

export default useSupabaseStore ;