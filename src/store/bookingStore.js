import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useBookingStore = create(
  persist(
    (set, get) => ({
      selectedService: null,
      selectedDate: null,
      selectedTime: null,
      userDetails: {
        name: '',
        phone: '',
        email: '',
        gender: '',
      },
      bookingReference: null,
      allBookings: [], // ✅ Naya - Sari bookings save hongi

      setSelectedService: (service) => set({ selectedService: service }),
      setSelectedDate: (date) => set({ selectedDate: date }),
      setSelectedTime: (time) => set({ selectedTime: time }),
      setUserDetails: (details) => set({
        userDetails: { ...get().userDetails, ...details }
      }),
      setBookingReference: (ref) => set({ bookingReference: ref }),

      // ✅ Naya function - Booking save karne ke liye
      addBooking: (booking) => set({
        allBookings: [...get().allBookings, {
          ...booking,
          id: Date.now(),
          createdAt: new Date().toISOString(),
          status: 'confirmed'
        }]
      }),

      // ✅ Booking cancel karne ke liye
      cancelBooking: (bookingId) => set({
        allBookings: get().allBookings.map(b => 
          b.id === bookingId ? { ...b, status: 'cancelled' } : b
        )
      }),

      resetBooking: () => set({
        selectedService: null,
        selectedDate: null,
        selectedTime: null,
        userDetails: { name: '', phone: '', email: '', gender: '' },
        bookingReference: null,
      }),
    }),
    {
      name: 'booking-storage',
    }
  )
);

export default useBookingStore;