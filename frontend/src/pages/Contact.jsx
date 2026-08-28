import { useTranslation } from 'react-i18next'
import { MapPin, Phone, Clock, Mail, MessageCircle } from 'lucide-react'
import SEO from '../components/common/SEO.jsx'
import Breadcrumb from '../components/common/Breadcrumb.jsx'

const Contact = () => {
  const { t } = useTranslation()

  return (
    <>
      <SEO title={t('nav.contact')} description={t('contact.subtitle')} />
      <Breadcrumb items={[{ name: t('nav.contact') }]} />

      <section className="section-padding">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold mb-4 dark:text-white">{t('contact.title')}</h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">{t('contact.subtitle')}</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <div className="space-y-6">
            {[
              { icon: MapPin, title: t('contact.address'), text: 'تهران، خیابان ولیعصر، ساختمان پزشکان، طبقه ۳' },
              { icon: Phone, title: t('contact.phone'), text: '۰۲۱-۸۸۷۷۶۶۵۵\n۰۹۱۲۳۴۵۶۷۸۹' },
              { icon: Clock, title: t('contact.hours'), text: 'شنبه تا چهارشنبه: ۱۶ تا ۲۰\nپنجشنبه: ۱۰ تا ۱۴' },
              { icon: Mail, title: t('contact.email'), text: 'info@heartdoctor.ir' }
            ].map((item, i) => (
              <div key={i} className="card flex items-start gap-4 dark:bg-gray-800 dark:border dark:border-gray-700">
                <item.icon className="text-primary shrink-0" size={24} />
                <div>
                  <h3 className="font-bold mb-1 dark:text-white">{item.title}</h3>
                  {item.text.split('\n').map((line, j) => (
                    <p key={j} className="text-gray-600 dark:text-gray-400">{line}</p>
                  ))}
                </div>
              </div>
            ))}

            <a href="https://wa.me/989123456789" target="_blank" rel="noopener noreferrer" 
               className="card flex items-center gap-4 bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors">
              <MessageCircle className="text-green-600 shrink-0" size={24} />
              <div>
                <h3 className="font-bold text-green-800 dark:text-green-400 mb-1">{t('contact.whatsapp')}</h3>
                <p className="text-green-700 dark:text-green-500">{t('contact.whatsappDesc')}</p>
              </div>
            </a>
          </div>

          <div className="card h-fit dark:bg-gray-800 dark:border dark:border-gray-700">
            <h3 className="text-xl font-bold mb-6 dark:text-white">{t('contact.location')}</h3>
            <div className="aspect-video bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
              <p className="text-gray-500 dark:text-gray-400">Google Maps Embed</p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Contact
