import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Heart, Activity, Stethoscope, Video, FileText, Calendar, ChevronLeft, Phone } from 'lucide-react'
import SEO from '../components/common/SEO.jsx'
import SchemaMarkup from '../components/common/SchemaMarkup.jsx'

const Home = () => {
  const { t, i18n } = useTranslation()

  const services = [
    { icon: Activity, title: 'آنژیوگرافی', desc: 'تشخیص دقیق انسداد عروق قلبی', slug: 'angiography' },
    { icon: Heart, title: 'آنژیوپلاستی', desc: 'باز کردن عروق با بالون و استنت', slug: 'angioplasty' },
    { icon: Stethoscope, title: 'اکوکاردیوگرافی', desc: 'سونوگرافی قلبی تخصصی', slug: 'echocardiography' },
    { icon: Activity, title: 'تست ورزش', desc: 'ارزیابی عملکرد قلب در فعالیت', slug: 'stress-test' },
  ]

  return (
    <>
      <SEO title={t('footer.title')} description={t('hero.description')} />
      <SchemaMarkup type="physician" data={{ name: t('footer.title'), description: t('footer.subtitle'), url: window.location.origin, phone: "+982188776655" }} />

      <section className="bg-gradient-to-br from-primary to-medical text-white">
        <div className="section-padding">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                {t('hero.title')} <br />
                <span className="text-secondary">{t('hero.subtitle')}</span>
              </h1>
              <p className="text-lg text-gray-100 mb-8 leading-relaxed">{t('hero.description')}</p>
              <div className="flex flex-wrap gap-4">
                <Link to="/appointment" className="bg-white text-primary px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors">{t('hero.cta1')}</Link>
                <Link to="/services" className="border-2 border-white text-white px-8 py-3 rounded-lg font-bold hover:bg-white hover:text-primary transition-colors">{t('hero.cta2')}</Link>
              </div>
            </div>
            <div className="hidden lg:flex justify-center">
              <div className="w-80 h-80 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm">
                <Heart size={120} className="text-secondary" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
        <div className="section-padding">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">{t('services.title')}</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">{t('services.subtitle')}</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service) => (
              <Link key={service.slug} to={`/services/${service.slug}`} className="card group dark:bg-gray-800 dark:border dark:border-gray-700">
                <div className="w-14 h-14 bg-accent rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary transition-colors">
                  <service.icon className="text-primary group-hover:text-white transition-colors" size={28} />
                </div>
                <h3 className="text-xl font-bold mb-2 dark:text-white">{service.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">{service.desc}</p>
                <span className="text-primary text-sm font-medium flex items-center gap-1">{t('services.moreInfo')} <ChevronLeft size={16} /></span>
              </Link>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link to="/services" className="btn-secondary inline-flex items-center gap-2">{t('services.viewAll')} <ChevronLeft size={18} /></Link>
          </div>
        </div>
      </section>

      <section className="bg-accent dark:bg-gray-800 py-16 transition-colors duration-300">
        <div className="section-padding text-center">
          <h2 className="text-3xl font-bold mb-4 dark:text-white">{t('contact.title')}</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">{t('contact.subtitle')}</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/appointment" className="btn-primary flex items-center gap-2"><Calendar size={18} /> {t('nav.appointment')}</Link>
            <a href="tel:+982188776655" className="btn-secondary flex items-center gap-2"><Phone size={18} /> {t('contact.phone')}</a>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <div className="section-padding">
          <div className="grid md:grid-cols-2 gap-8">
            <Link to="/articles" className="card flex items-center gap-6 hover:border-primary transition-colors dark:bg-gray-800 dark:border dark:border-gray-700">
              <div className="w-16 h-16 bg-accent rounded-xl flex items-center justify-center shrink-0">
                <FileText className="text-primary" size={32} />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 dark:text-white">{t('nav.articles')}</h3>
                <p className="text-gray-600 dark:text-gray-400">جدیدترین مقالات تخصصی در حوزه قلب و عروق</p>
              </div>
            </Link>
            <Link to="/videos" className="card flex items-center gap-6 hover:border-primary transition-colors dark:bg-gray-800 dark:border dark:border-gray-700">
              <div className="w-16 h-16 bg-accent rounded-xl flex items-center justify-center shrink-0">
                <Video className="text-primary" size={32} />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 dark:text-white">{t('nav.videos')}</h3>
                <p className="text-gray-600 dark:text-gray-400">ویدئوهای توضیحی درباره بیماری‌ها و روش‌های درمان</p>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}

export default Home
