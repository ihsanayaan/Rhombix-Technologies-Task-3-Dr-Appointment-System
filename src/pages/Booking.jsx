import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, Calendar, Clock, User, CheckCircle } from 'lucide-react';
import useBookingStore from '../store/bookingStore';

export default function Booking() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const {
    selectedService,
    selectedDate,
    selectedTime,
    userDetails,
    setSelectedDate,
    setSelectedTime,
    setUserDetails,
    setBookingReference,
    addBooking,
    resetBooking
  } = useBookingStore();

  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!selectedService) {
      navigate('/services');
    }
  }, [selectedService, navigate]);

  const getDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 0; i < 14; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      const isFriday = date.getDay() === 5;
      dates.push({
        date: date,
        dayName: date.toLocaleDateString(i18n.language === 'ar'? 'ar-SA' : 'en-US', { weekday: 'short' }),
        dayNum: date.getDate(),
        month: date.toLocaleDateString(i18n.language === 'ar'? 'ar-SA' : 'en-US', { month: 'short' }),
        disabled: isFriday,
        fullDate: date.toISOString().split('T')[0]
      });
    }
    return dates;
  };

  const getTimes = () => {
    const times = [];
    for (let hour = 9; hour <= 21; hour++) {
      times.push(`${hour}:00`);
      if (hour < 21) times.push(`${hour}:30`);
    }
    return times;
  };

  const availableTimes = getTimes(); // ✅ Direct call karo, useEffect ki zarurat nahi
  const selectedDateObj = getDates().find(d => d.fullDate === selectedDate);
  const isDateDisabled = selectedDateObj?.disabled || false;

  const validateUserDetails = () => {
    const newErrors = {};
    if (!userDetails.name || userDetails.name.length < 3) {
      newErrors.name = t('nameMinLength');
    }
    if (!userDetails.phone ||!/^5[0-9]{8}$/.test(userDetails.phone)) {
      newErrors.phone = t('phoneInvalid');
    }
    if (!userDetails.email ||!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userDetails.email)) {
      newErrors.email = t('emailInvalid');
    }
    if (!userDetails.gender) {
      newErrors.gender = t('genderRequired');
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleConfirmBooking = () => {
    const ref = 'SB' + Date.now().toString().slice(-8);
    setBookingReference(ref);
    // ✅ Booking save kar store mein
  addBooking({
    reference: ref,
    service: selectedService,
    date: selectedDate,
    time: selectedTime,
    patient: userDetails,
    price: selectedService.price
  });
    setStep(4);
  };

  const handleNewBooking = () => {
    resetBooking();
    navigate('/');
  };

  if (!selectedService) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-zinc-900 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 dark:text-gray-400 text-lg mb-4">
            {t('noServiceSelected')}
          </p>
          <button
            onClick={() => navigate('/services')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold"
          >
            {t('browseServices')}
          </button>
        </div>
      </div>
    );
  }

  if (step === 4) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-zinc-900 p-4 md:p-6">
        <div className="container mx-auto max-w-2xl">
          <div className="bg-white dark:bg-zinc-800 rounded-2xl shadow-lg p-8 text-center">
            <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {t('bookingConfirmed')}
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {t('appointmentBooked')}
            </p>
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 mb-6 text-left space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">{t('bookingReference')}:</span>
                <span className="font-bold text-gray-900 dark:text-white">{useBookingStore.getState().bookingReference}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">{t('service')}:</span>
                <span className="font-semibold text-gray-900 dark:text-white">
                  {i18n.language === 'ar'? selectedService.nameAr : selectedService.name}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">{t('date')}:</span>
                <span className="font-semibold text-gray-900 dark:text-white">{selectedDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">{t('time')}:</span>
                <span className="font-semibold text-gray-900 dark:text-white">{selectedTime}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">{t('patient')}:</span>
                <span className="font-semibold text-gray-900 dark:text-white">{userDetails.name}</span>
              </div>
              <div className="flex justify-between border-t border-gray-300 dark:border-zinc-700 pt-3">
                <span className="text-gray-600 dark:text-gray-400">{t('totalPaid')}:</span>
                <span className="font-bold text-blue-600 dark:text-blue-400 text-xl">
                  {selectedService.price} {t('sar')}
                </span>
              </div>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
              {t('smsConfirmation')}
            </p>
            <button
              onClick={handleNewBooking}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-bold text-lg transition"
            >
              {t('goHome')}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-900 p-4 md:p-6">
      <div className="container mx-auto max-w-4xl">
        <button
          onClick={() => step === 1? navigate(`/service/${selectedService.id}`) : setStep(step - 1)}
          className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-6 hover:text-blue-600 dark:hover:text-blue-400 transition"
        >
          <ArrowLeft size={18} className={i18n.language === 'ar'? 'rotate-180' : ''} />
          {step === 1? t('backToDetails') : t('back')}
        </button>

        <div className="bg-white dark:bg-zinc-800 rounded-2xl shadow-lg p-6 mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            {i18n.language === 'ar'? selectedService.nameAr : selectedService.name}
          </h2>
          <div className="flex items-center gap-4 text-gray-600 dark:text-gray-400">
            <span className="font-semibold text-blue-600 dark:text-blue-400">
              {selectedService.price} {t('sar')}
            </span>
            <span>•</span>
            <span>{selectedService.duration} {t('min')}</span>
          </div>
        </div>

        <div className="flex items-center justify-center mb-6">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                step >= s? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-zinc-700 text-gray-400'
              }`}>
                {s}
              </div>
              {s < 3 && <div className={`w-12 h-1 ${step > s? 'bg-blue-600' : 'bg-gray-200 dark:bg-zinc-700'}`} />}
            </div>
          ))}
        </div>

        {step === 1 && (
          <div className="bg-white dark:bg-zinc-800 rounded-2xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <Calendar size={24} />
              {t('selectDateTime')}
            </h3>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                {t('selectDate')}
              </label>
              <div className="grid grid-cols-3 md:grid-cols-7 gap-3">
                {getDates().map((d) => (
                  <button
                    key={d.fullDate}
                    disabled={d.disabled}
                    onClick={() => {
                      setSelectedDate(d.fullDate);
                      setSelectedTime(null); // ✅ Date change pe time reset kar
                    }}
                    className={`p-3 rounded-xl border-2 transition text-center ${
                      d.disabled
                      ? 'bg-gray-100 dark:bg-zinc-900 border-gray-200 dark:border-zinc-700 text-gray-400 cursor-not-allowed'
                        : selectedDate === d.fullDate
                      ? 'bg-blue-600 border-blue-600 text-white'
                        : 'bg-white dark:bg-zinc-700 border-gray-300 dark:border-zinc-600 text-gray-900 dark:text-white hover:border-blue-400'
                    }`}
                  >
                    <div className="text-xs">{d.dayName}</div>
                    <div className="text-lg font-bold">{d.dayNum}</div>
                    <div className="text-xs">{d.month}</div>
                    {d.disabled && <div className="text-xs mt-1">✕</div>}
                  </button>
                ))}
              </div>
              {isDateDisabled && (
                <p className="text-red-500 text-sm mt-2">{t('fridayClosedNote')}</p>
              )}
            </div>

            {/* ✅ Time Picker - Fixed condition */}
            {selectedDate &&!isDateDisabled && (
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  {t('selectTime')}
                </label>
                <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
                  {availableTimes.map((time) => (
                    <button
                      key={time}
                      onClick={() => setSelectedTime(time)}
                      className={`p-3 rounded-xl border-2 transition font-medium ${
                        selectedTime === time
                        ? 'bg-blue-600 border-blue-600 text-white'
                          : 'bg-white dark:bg-zinc-700 border-gray-300 dark:border-zinc-600 text-gray-900 dark:text-white hover:border-blue-400'
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <button
              disabled={!selectedDate ||!selectedTime || isDateDisabled}
              onClick={() => setStep(2)}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white py-4 rounded-xl font-bold text-lg transition"
            >
              {t('continue')}
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="bg-white dark:bg-zinc-800 rounded-2xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <User size={24} />
              {t('enterDetails')}
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t('fullName')}
                </label>
                <input
                  type="text"
                  value={userDetails.name}
                  onChange={(e) => setUserDetails({ name: e.target.value })}
                  placeholder={t('namePlaceholder')}
                  className="w-full p-4 rounded-xl border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t('phoneNumber')}
                </label>
                <input
                  type="tel"
                  value={userDetails.phone}
                  onChange={(e) => setUserDetails({ phone: e.target.value })}
                  placeholder="5XXXXXXXX"
                  className="w-full p-4 rounded-xl border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                />
                {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{t('phoneHint')}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t('email')}
                </label>
                <input
                  type="email"
                  value={userDetails.email}
                  onChange={(e) => setUserDetails({ email: e.target.value })}
                  placeholder={t('emailPlaceholder')}
                  className="w-full p-4 rounded-xl border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t('gender')}
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setUserDetails({ gender: 'male' })}
                    className={`p-4 rounded-xl border-2 transition font-medium ${
                      userDetails.gender === 'male'
                      ? 'bg-blue-600 border-blue-600 text-white'
                        : 'bg-white dark:bg-zinc-700 border-gray-300 dark:border-zinc-600 text-gray-900 dark:text-white'
                    }`}
                  >
                    {t('male')}
                  </button>
                  <button
                    onClick={() => setUserDetails({ gender: 'female' })}
                    className={`p-4 rounded-xl border-2 transition font-medium ${
                      userDetails.gender === 'female'
                      ? 'bg-blue-600 border-blue-600 text-white'
                        : 'bg-white dark:bg-zinc-700 border-gray-300 dark:border-zinc-600 text-gray-900 dark:text-white'
                    }`}
                  >
                    {t('female')}
                  </button>
                </div>
                {errors.gender && <p className="text-red-500 text-sm mt-1">{errors.gender}</p>}
              </div>
            </div>
            <button
              onClick={() => {
                if (validateUserDetails()) setStep(3);
              }}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-bold text-lg transition mt-6"
            >
              {t('continueToSummary')}
            </button>
          </div>
        )}

        {step === 3 && (
          <div className="bg-white dark:bg-zinc-800 rounded-2xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              {t('bookingSummary')}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {t('reviewConfirm')}
            </p>
            <div className="space-y-4 mb-6">
              <div className="flex justify-between py-3 border-b border-gray-200 dark:border-zinc-700">
                <span className="text-gray-600 dark:text-gray-400">{t('service')}</span>
                <span className="font-semibold text-gray-900 dark:text-white">
                  {i18n.language === 'ar'? selectedService.nameAr : selectedService.name}
                </span>
              </div>
              <div className="flex justify-between py-3 border-b border-gray-200 dark:border-zinc-700">
                <span className="text-gray-600 dark:text-gray-400">{t('date')}</span>
                <span className="font-semibold text-gray-900 dark:text-white">{selectedDate}</span>
              </div>
              <div className="flex justify-between py-3 border-b border-gray-200 dark:border-zinc-700">
                <span className="text-gray-600 dark:text-gray-400">{t('time')}</span>
                <span className="font-semibold text-gray-900 dark:text-white">{selectedTime}</span>
              </div>
              <div className="flex justify-between py-3 border-b border-gray-200 dark:border-zinc-700">
                <span className="text-gray-600 dark:text-gray-400">{t('patient')}</span>
                <span className="font-semibold text-gray-900 dark:text-white">{userDetails.name}</span>
              </div>
              <div className="flex justify-between py-3 border-b border-gray-200 dark:border-zinc-700">
                <span className="text-gray-600 dark:text-gray-400">{t('phoneNumber')}</span>
                <span className="font-semibold text-gray-900 dark:text-white">{userDetails.phone}</span>
              </div>
              <div className="flex justify-between py-4 bg-blue-50 dark:bg-blue-900/20 px-4 rounded-xl">
                <span className="text-lg font-semibold text-gray-900 dark:text-white">{t('total')}</span>
                <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  {selectedService.price} {t('sar')}
                </span>
              </div>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-6 text-center">
              {t('cancellationNote')}
            </p>
            <button
              onClick={handleConfirmBooking}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-xl font-bold text-lg transition"
            >
              {t('confirmBooking')}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}