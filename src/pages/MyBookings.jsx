import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Calendar, Clock, User, X, CheckCircle, XCircle, ArrowLeft } from 'lucide-react';
import useBookingStore from '../store/bookingStore';

export default function MyBookings() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { allBookings, cancelBooking } = useBookingStore();

  const handleCancel = (bookingId) => {
    if (confirm(t('cancelConfirm'))) {
      cancelBooking(bookingId);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-900 p-4 md:p-6">
      <div className="container mx-auto max-w-4xl">
        
        {/* Back Button */}
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-6 hover:text-blue-600 dark:hover:text-blue-400 transition"
        >
          <ArrowLeft size={18} className={i18n.language === 'ar'? 'rotate-180' : ''} />
          {t('back')}
        </button>

        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
          {t('myBookings')}
        </h1>

        {allBookings.length === 0 ? (
          <div className="bg-white dark:bg-zinc-800 rounded-2xl shadow-lg p-8 text-center">
            <p className="text-gray-500 dark:text-gray-400 text-lg mb-4">
              {t('noBookingsYet')}
            </p>
            <button
              onClick={() => navigate('/services')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold"
            >
              {t('bookNow')}
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {allBookings.map((booking) => (
              <div
                key={booking.id}
                className={`bg-white dark:bg-zinc-800 rounded-2xl shadow-lg p-6 ${
                  booking.status === 'cancelled' ? 'opacity-60' : ''
                }`}
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                      {i18n.language === 'ar' ? booking.service.nameAr : booking.service.name}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {t('bookingReference')}: {booking.reference}
                    </p>
                  </div>
                  <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${
                    booking.status === 'confirmed'
                      ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                      : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
                  }`}>
                    {booking.status === 'confirmed' ? (
                      <>
                        <CheckCircle size={16} />
                        {t('confirmed')}
                      </>
                    ) : (
                      <>
                        <XCircle size={16} />
                        {t('cancelled')}
                      </>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                    <Calendar size={18} />
                    <span>{booking.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                    <Clock size={18} />
                    <span>{booking.time}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                    <User size={18} />
                    <span>{booking.patient.name}</span>
                  </div>
                  <div className="font-bold text-blue-600 dark:text-blue-400">
                    {booking.price} {t('sar')}
                  </div>
                </div>

                {booking.status === 'confirmed' && (
                  <button
                    onClick={() => handleCancel(booking.id)}
                    className="w-full bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/30 text-red-600 dark:text-red-400 py-3 rounded-xl font-semibold transition flex items-center justify-center gap-2"
                  >
                    <X size={18} />
                    {t('cancelBooking')}
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}