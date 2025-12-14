import { create } from "zustand";

export const useBooking = create((set) => ({
  service: null,
  date: null,
  time: null,
  user: {},

  setService: (service) => set({ service }),
  setDate: (date) => set({ date }),
  setTime: (time) => set({ time }),
  setUser: (user) => set({ user }),
  reset: () => set({ service: null, date: null, time: null, user: {} })
}));
