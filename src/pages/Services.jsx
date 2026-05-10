import { useState, useEffect } from "react";
import { useTranslation } from 'react-i18next';
import { useNavigate, useSearchParams } from "react-router-dom";
import { ArrowLeft, Search, X, SlidersHorizontal } from "lucide-react";

export default function Services() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'all');
  const [showFilters, setShowFilters] = useState(false);
  const isRTL = i18n.language === 'ar';

  // ✅ Full 12 Services - ServiceDetails.jsx ke saath match
  const services = [
    {
      id: 1,
      name: "General Checkup",
      nameAr: "فحص عام",
      category: 1,
      categoryName: "General",
      categoryNameAr: "عام",
      price: 150,
      duration: "30 min",
      durationAr: "30 دقيقة",
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400"
    },
    {
      id: 2,
      name: "Dental Cleaning",
      nameAr: "تنظيف الأسنان",
      category: 2,
      categoryName: "Dental",
      categoryNameAr: "أسنان",
      price: 200,
      duration: "45 min",
      durationAr: "45 دقيقة",
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=400"
    },
    {
      id: 3,
      name: "Skin Consultation",
      nameAr: "استشارة جلدية",
      category: 3,
      categoryName: "Dermatology",
      categoryNameAr: "جلدية",
      price: 300,
      duration: "60 min",
      durationAr: "60 دقيقة",
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=400"
    },
    {
      id: 4,
      name: "Eye Examination",
      nameAr: "فحص العيون",
      category: 4,
      categoryName: "Ophthalmology",
      categoryNameAr: "عيون",
      price: 180,
      duration: "40 min",
      durationAr: "40 دقيقة",
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=400"
    },
    {
      id: 5,
      name: "Blood Test",
      nameAr: "تحليل الدم",
      category: 5,
      categoryName: "Laboratory",
      categoryNameAr: "مختبر",
      price: 120,
      duration: "15 min",
      durationAr: "15 دقيقة",
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1579154204601-01588f351e67?w=400"
    },
    {
      id: 6,
      name: "X-Ray",
      nameAr: "أشعة سينية",
      category: 6,
      categoryName: "Radiology",
      categoryNameAr: "أشعة",
      price: 250,
      duration: "20 min",
      durationAr: "20 دقيقة",
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1581595220892-b0739db3ba8c?w=400"
    },
    {
      id: 7,
      name: "Physiotherapy Session",
      nameAr: "جلسة علاج طبيعي",
      category: 7,
      categoryName: "Physiotherapy",
      categoryNameAr: "علاج طبيعي",
      price: 220,
      duration: "50 min",
      durationAr: "50 دقيقة",
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400"
    },
    {
      id: 8,
      name: "Vaccination",
      nameAr: "تطعيم",
      category: 8,
      categoryName: "Immunization",
      categoryNameAr: "تطعيم",
      price: 100,
      duration: "10 min",
      durationAr: "10 دقيقة",
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1584515933487-779824d29309?w=400"
    },
    {
      id: 9,
      name: "Cardiology Consultation",
      nameAr: "استشارة قلب",
      category: 9,
      categoryName: "Cardiology",
      categoryNameAr: "قلب",
      price: 350,
      duration: "45 min",
      durationAr: "45 دقيقة",
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400"
    },
    {
      id: 10,
      name: "Pediatric Checkup",
      nameAr: "فحص أطفال",
      category: 10,
      categoryName: "Pediatrics",
      categoryNameAr: "أطفال",
      price: 180,
      duration: "30 min",
      durationAr: "30 دقيقة",
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?w=400"
    },
    {
      id: 11,
      name: "Ultrasound",
      nameAr: "أشعة صوتية",
      category: 6,
      categoryName: "Radiology",
      categoryNameAr: "أشعة",
      price: 280,
      duration: "30 min",
      durationAr: "30 دقيقة",
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=400"
    },
    {
      id: 12,
      name: "Dental Filling",
      nameAr: "حشو أسنان",
      category: 2,
      categoryName: "Dental",
      categoryNameAr: "أسنان",
      price: 400,
      duration: "60 min",
      durationAr: "60 دقيقة",
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=400"
    },
  ];

  const categories = [
    { id: 'all', name: "All Services", nameAr: "جميع الخدمات" },
    { id: '1', name: "General", nameAr: "عام" },
    { id: '2', name: "Dental", nameAr: "أسنان" },
    { id: '3', name: "Dermatology", nameAr: "جلدية" },
    { id: '4', name: "Ophthalmology", nameAr: "عيون" },
    { id: '5', name: "Laboratory", nameAr: "مختبر" },
    { id: '6', name: "Radiology", nameAr: "أشعة" },
    { id: '7', name: "Physiotherapy", nameAr: "علاج طبيعي" },
    { id: '8', name: "Immunization", nameAr: "تطعيم" },
    { id: '9', name: "Cardiology", nameAr: "قلب" },
    { id: '10', name: "Pediatrics", nameAr: "أطفال" },
  ];

  const filteredServices = services.filter((service) => {
    const searchLower = searchQuery.toLowerCase();
    const name = isRTL? service.nameAr : service.name;
    const categoryName = isRTL? service.categoryNameAr : service.categoryName;

    const matchesSearch = name.toLowerCase().includes(searchLower) ||
                         categoryName.toLowerCase().includes(searchLower);

    const matchesCategory = selectedCategory === 'all' ||
                           service.category.toString() === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-900 p-4 md:p-6" dir={isRTL? 'rtl' : 'ltr'}>
      <div className="container mx-auto max-w-7xl">

        {/* Back Button */}
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-6 hover:text-blue-600 dark:hover:text-blue-400 transition"
        >
          <ArrowLeft size={18} className={isRTL? 'rotate-180' : ''} />
          {t('backToHome')}
        </button>

        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
          {t('ourServices')}
        </h1>

        {/* Search + Filter */}
        <div className="mb-6 space-y-4">
          <div className="flex gap-3">
            <div className="relative flex-1">
              <Search className={`absolute ${isRTL? 'right-4' : 'left-4'} top-1/2 -translate-y-1/2 text-gray-400`} size={20} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t('searchServices')}
                className={`w-full p-4 ${isRTL? 'pr-12 pl-12' : 'pl-12 pr-12'} rounded-xl border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none`}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className={`absolute ${isRTL? 'left-4' : 'right-4'} top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600`}
                >
                  <X size={20} />
                </button>
              )}
            </div>

            <button
              onClick={() => setShowFilters(!showFilters)}
              className="bg-white dark:bg-zinc-800 border border-gray-300 dark:border-zinc-700 p-4 rounded-xl hover:bg-gray-50 dark:hover:bg-zinc-700 transition"
            >
              <SlidersHorizontal size={20} className="text-gray-700 dark:text-gray-300" />
            </button>
          </div>

          {showFilters && (
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 rounded-lg font-medium transition ${
                    selectedCategory === cat.id
                    ? 'bg-blue-600 text-white'
                      : 'bg-white dark:bg-zinc-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-zinc-700 hover:bg-gray-50 dark:hover:bg-zinc-700'
                  }`}
                >
                  {isRTL? cat.nameAr : cat.name}
                </button>
              ))}
            </div>
          )}
        </div>

        <p className="text-gray-600 dark:text-gray-400 mb-4">
          {filteredServices.length} {t('servicesFound')}
        </p>

        {filteredServices.length > 0? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredServices.map((service) => (
              <div
                key={service.id}
                onClick={() => navigate(`/service/${service.id}`)}
                className="bg-white dark:bg-zinc-800 rounded-2xl shadow-lg overflow-hidden cursor-pointer hover:shadow-xl hover:scale-105 transition-all"
              >
                <img
                  src={service.image}
                  alt={service.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-5">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                      {isRTL? service.nameAr : service.name}
                    </h3>
                    <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs px-2 py-1 rounded-lg font-semibold">
                      {service.price} {t('sar')}
                    </span>
                  </div>

                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    {isRTL? service.categoryNameAr : service.categoryName}
                  </p>

                  <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                    <span>⭐ {service.rating}</span>
                    <span>{isRTL? service.durationAr : service.duration}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              {t('noServicesFound')}
            </p>
          </div>
        )}

      </div>
    </div>
  );
}