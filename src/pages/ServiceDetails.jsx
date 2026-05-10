import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { ArrowLeft, Clock, DollarSign, Info, Calendar } from "lucide-react";
import useBookingStore from '../store/bookingStore';

export default function ServiceDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const { setSelectedService } = useBookingStore();
  const isRTL = i18n.language === 'ar';

  // ✅ Complete Services List
  const services = [
    { 
      id: 1, 
      name: "General Checkup", 
      nameAr: "فحص عام", 
      category: "General",
      categoryAr: "عام",
      price: 150, 
      duration: "30",
      description: "Complete health checkup with consultation and basic tests",
      descriptionAr: "فحص صحي شامل مع استشارة واختبارات أساسية"
    },
    { 
      id: 2, 
      name: "Dental Cleaning", 
      nameAr: "تنظيف الأسنان", 
      category: "Dental",
      categoryAr: "أسنان",
      price: 200, 
      duration: "45",
      description: "Professional teeth cleaning, polishing and fluoride treatment",
      descriptionAr: "تنظيف وتلميع الأسنان احترافي مع علاج بالفلورايد"
    },
    { 
      id: 3, 
      name: "Skin Consultation", 
      nameAr: "استشارة جلدية", 
      category: "Dermatology",
      categoryAr: "جلدية",
      price: 300, 
      duration: "60",
      description: "Skin analysis, diagnosis and personalized treatment plan",
      descriptionAr: "تحليل البشرة والتشخيص وخطة علاج شخصية"
    },
    { 
      id: 4, 
      name: "Eye Examination", 
      nameAr: "فحص العيون", 
      category: "Ophthalmology",
      categoryAr: "عيون",
      price: 180, 
      duration: "40",
      description: "Complete eye checkup including vision test and pressure check",
      descriptionAr: "فحص كامل للعين يشمل اختبار النظر وضغط العين"
    },
    { 
      id: 5, 
      name: "Blood Test", 
      nameAr: "تحليل الدم", 
      category: "Laboratory",
      categoryAr: "مختبر",
      price: 120, 
      duration: "15",
      description: "Complete blood count and basic metabolic panel",
      descriptionAr: "تعداد الدم الكامل واللوحة الأيضية الأساسية"
    },
    { 
      id: 6, 
      name: "X-Ray", 
      nameAr: "أشعة سينية", 
      category: "Radiology",
      categoryAr: "أشعة",
      price: 250, 
      duration: "20",
      description: "Digital X-Ray imaging with instant report",
      descriptionAr: "تصوير رقمي بالأشعة السينية مع تقرير فوري"
    },
    { 
      id: 7, 
      name: "Physiotherapy Session", 
      nameAr: "جلسة علاج طبيعي", 
      category: "Physiotherapy",
      categoryAr: "علاج طبيعي",
      price: 220, 
      duration: "50",
      description: "Personalized physiotherapy and rehabilitation session",
      descriptionAr: "جلسة علاج طبيعي وإعادة تأهيل شخصية"
    },
    { 
      id: 8, 
      name: "Vaccination", 
      nameAr: "تطعيم", 
      category: "Immunization",
      categoryAr: "تطعيم",
      price: 100, 
      duration: "10",
      description: "Standard vaccination with medical consultation",
      descriptionAr: "تطعيم قياسي مع استشارة طبية"
    },
    { 
      id: 9, 
      name: "Cardiology Consultation", 
      nameAr: "استشارة قلب", 
      category: "Cardiology",
      categoryAr: "قلب",
      price: 350, 
      duration: "45",
      description: "Heart health assessment with ECG if needed",
      descriptionAr: "تقييم صحة القلب مع تخطيط القلب إذا لزم الأمر"
    },
    { 
      id: 10, 
      name: "Pediatric Checkup", 
      nameAr: "فحص أطفال", 
      category: "Pediatrics",
      categoryAr: "أطفال",
      price: 180, 
      duration: "30",
      description: "Complete child health checkup and vaccination review",
      descriptionAr: "فحص صحي كامل للأطفال ومراجعة التطعيمات"
    },
    { 
      id: 11, 
      name: "Ultrasound", 
      nameAr: "أشعة صوتية", 
      category: "Radiology",
      categoryAr: "أشعة",
      price: 280, 
      duration: "30",
      description: "Abdominal or pregnancy ultrasound with report",
      descriptionAr: "أشعة صوتية للبطن أو الحمل مع تقرير"
    },
    { 
      id: 12, 
      name: "Dental Filling", 
      nameAr: "حشو أسنان", 
      category: "Dental",
      categoryAr: "أسنان",
      price: 400, 
      duration: "60",
      description: "Composite or amalgam dental filling treatment",
      descriptionAr: "علاج حشو الأسنان المركب أو الملغم"
    },
  ];

  const service = services.find(s => s.id === parseInt(id));

  const handleBookNow = () => {
    if (!service) return;
    setSelectedService(service);
    navigate("/booking");
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
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-900" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="container mx-auto px-4 py-6 max-w-3xl">
        
        {/* Back Button */}
        <button
          onClick={() => navigate("/services")}
          className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-6 hover:text-blue-600 dark:hover:text-blue-400 transition"
        >
          <ArrowLeft size={18} className={isRTL ? 'rotate-180' : ''} />
          {t('backToServices')}
        </button>

        {/* Service Card */}
        <div className="bg-white dark:bg-zinc-800 rounded-2xl shadow-lg overflow-hidden">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 text-white">
            <h1 className="text-2xl md:text-3xl font-bold mb-2">
              {isRTL ? service.nameAr : service.name}
            </h1>
            <p className="text-blue-100">
              {isRTL ? service.categoryAr : service.category}
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
                {isRTL ? service.descriptionAr : service.description}
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

            {/* CTA Button */}
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