import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { ArrowLeft, Clock, DollarSign, Info, Calendar } from "lucide-react";
import useBookingStore from '../store/bookingStore'; // ✅ Default import

export default function ServiceDetails() {
  const { id } = useParams(); // ✅ URL se id le
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const { setSelectedService } = useBookingStore(); // ✅ Store se setter le

  // ✅ Services list yahan honi chahiye
  const services = [
    { 
      id: 1, 
      name: "General Checkup", 
      nameAr: "فحص عام", 
      category: "General",
      categoryAr: "عام",
      price: 150, 
      duration: "30",
      description: "Complete health checkup with consultation",
      descriptionAr: "فحص صحي شامل مع استشارة"
    },
    { 
      id: 2, 
      name: "Dental Cleaning", 
      nameAr: "تنظيف الأسنان", 
      category: "Dental",
      categoryAr: "أسنان",
      price: 200, 
      duration: "45",
      description: "Professional teeth cleaning and polishing",
      descriptionAr: "تنظيف وتلميع الأسنان احترافي"
    },
    { 
      id: 3, 
      name: "Skin Consultation", 
      nameAr: "استشارة جلدية", 
      category: "Dermatology",
      categoryAr: "جلدية",
      price: 300, 
      duration: "60",
      description: "Skin analysis and treatment plan",
      descriptionAr: "تحليل البشرة وخطة العلاج"
    },
  ];

  // ✅ URL se service find kar
  const service = services.find(s => s.id === parseInt(id));

  // ✅ Book Now handler
  const handleBookNow = () => {
    if (!service) return;
    setSelectedService(service); // Store mein save kar
    navigate("/booking"); // Booking pe le ja
  };

  if (!service) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-zinc-900 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 dark:text-gray-400 mb-4">{t('noServiceSelected')}</p>
          <button
            onClick={() => navigate("/services")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
          >
            {t('browseServices')}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-900">
      <div className="container mx-auto px-4 py-6 max-w-3xl">
        
        {/* Back Button */}
        <button
          onClick={() => navigate("/services")}
          className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-6 hover:text-blue-600 dark:hover:text-blue-400 transition"
        >
          <ArrowLeft size={18} className={i18n.language === 'ar' ? 'rotate-180' : ''} />
          {t('backToServices')}
        </button>

        {/* Service Card */}
        <div className="bg-white dark:bg-zinc-800 rounded-2xl shadow-lg overflow-hidden">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 text-white">
            <h1 className="text-2xl md:text-3xl font-bold mb-2">
              {i18n.language === 'ar' ? service.nameAr : service.name}
            </h1>
            <p className="text-blue-100">
              {i18n.language === 'ar' ? service.categoryAr : service.category}
            </p>
          </div>

          {/* Details */}
          <div className="p-6 space-y-6">
            
            {/* Price & Duration */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-50 dark:bg-zinc-700 p-4 rounded-xl">
                <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 mb-1">
                  <DollarSign size={20} />
                  <span className="text-sm font-medium">{t('price')}</span>
                </div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {service.price} {t('sar')}
                </p>
              </div>

              <div className="bg-green-50 dark:bg-zinc-700 p-4 rounded-xl">
                <div className="flex items-center gap-2 text-green-600 dark:text-green-400 mb-1">
                  <Clock size={20} />
                  <span className="text-sm font-medium">{t('duration')}</span>
                </div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {service.duration} {t('min')}
                </p>
              </div>
            </div>

            {/* Description */}
            <div>
              <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300 mb-3">
                <Info size={20} />
                <h3 className="font-semibold">{t('aboutService')}</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {i18n.language === 'ar' ? service.descriptionAr : service.description}
              </p>
            </div>

            {/* What's Included */}
            <div>
              <h3 className="font-semibold text-gray-700 dark:text-gray-300 mb-3">
                {t('whatsIncluded')}
              </h3>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                  <span className="text-green-500">✓</span>
                  {t('consultationWithDoctor')}
                </li>
                <li className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                  <span className="text-green-500">✓</span>
                  {t('medicalReport')}
                </li>
                <li className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                  <span className="text-green-500">✓</span>
                  {t('followUpAdvice')}
                </li>
              </ul>
            </div>

            {/* CTA Button - ✅ Fixed */}
            <button
              onClick={handleBookNow}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-xl font-semibold text-lg transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
            >
              <Calendar size={20} />
              {t('bookNow')}
            </button>

          </div>
        </div>
      </div>
    </div>
  );
}