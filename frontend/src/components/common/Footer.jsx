import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { MapPin, Phone, Clock, Mail } from 'lucide-react'

const Footer = () => {
  const { t } = useTranslation()

  const links = [
    { name: t('nav.home'), path: '/' },
    { name: t('nav.about'), path: '/about' },
    { name: t('nav.services'), path: '/services' },
    { name: t('nav.articles'), path: '/articles' },
    { name: t('nav.videos'), path: '/videos' },
    { name: t('nav.appointment'), path: '/appointment' },
  ]

  return (
    <footer className="bg-medical dark:bg-gray-950 text-white transition-colors duration-300">
      <div className="section-padding">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <h3 className="text-xl font-bold mb-4">{t('footer.title')}</h3>
            <p className="text-gray-300 leading-relaxed mb-4">
              {t('footer.description')}
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">{t('footer.quickLinks')}</h3>
            <ul className="space-y-2">
              {links.map((item) => (
                <li key={item.path}>
                  <Link to={item.path} className="text-gray-300 hover:text-secondary transition-colors">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">{t('footer.contactInfo')}</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="shrink-0 mt-1 text-secondary" size={18} />
                <span className="text-gray-300">{t('contact.address')}: تهران، خیابان ولیعصر، ساختمان پزشکان، طبقه ۳</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="shrink-0 text-secondary" size={18} />
                <span className="text-gray-300">۰۲۱-۸۸۷۷۶۶۵۵</span>
              </li>
              <li className="flex items-center gap-3">
                <Clock className="shrink-0 text-secondary" size={18} />
                <span className="text-gray-300">{t('contact.hours')}: شنبه تا چهارشنبه: ۱۶ تا ۲۰</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="shrink-0 text-secondary" size={18} />
                <span className="text-gray-300">info@heartdoctor.ir</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-12 pt-8 text-center text-gray-400 text-sm">
          <p>{t('footer.rights')} {new Date().getFullYear()}</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
