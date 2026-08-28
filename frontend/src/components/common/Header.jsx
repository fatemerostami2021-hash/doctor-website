import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Menu, X, Phone, Calendar } from 'lucide-react'
import LanguageSwitcher from './LanguageSwitcher.jsx'
import ThemeToggle from './ThemeToggle.jsx'

const Header = () => {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()
  const { t, i18n } = useTranslation()

  const navItems = [
    { name: t('nav.home'), path: '/' },
    { name: t('nav.about'), path: '/about' },
    { name: t('nav.services'), path: '/services' },
    { name: t('nav.articles'), path: '/articles' },
    { name: t('nav.videos'), path: '/videos' },
    { name: t('nav.contact'), path: '/contact' },
  ]

  const isActive = (path) => location.pathname === path

  return (
    <header className="bg-white dark:bg-gray-900 shadow-md sticky top-0 z-50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold text-xl">
              {i18n.language === 'en' || i18n.language === 'tr' ? 'Heart' : 'قلب'}
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg font-bold text-gray-900 dark:text-white leading-tight">{t('footer.title')}</h1>
              <p className="text-xs text-gray-500 dark:text-gray-400">{t('footer.subtitle')}</p>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-sm font-medium transition-colors ${
                  isActive(item.path) ? 'text-primary border-b-2 border-primary pb-1' : 'text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-secondary'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <LanguageSwitcher />
            <ThemeToggle />
            <a href="tel:+989123456789" className="flex items-center gap-2 text-primary hover:text-medical dark:text-secondary dark:hover:text-primary">
              <Phone size={18} />
              <span className="text-sm font-medium">۰۹۱۲۳۴۵۶۷۸۹</span>
            </a>
            <Link to="/appointment" className="btn-primary flex items-center gap-2">
              <Calendar size={18} />
              <span>{t('nav.appointment')}</span>
            </Link>
          </div>

          <div className="flex lg:hidden items-center gap-2">
            <LanguageSwitcher />
            <ThemeToggle />
            <button className="p-2" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X size={24} className="text-gray-800 dark:text-white" /> : <Menu size={24} className="text-gray-800 dark:text-white" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="lg:hidden bg-white dark:bg-gray-900 border-t dark:border-gray-700">
          <div className="px-4 py-4 space-y-3">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`block py-2 text-sm font-medium ${isActive(item.path) ? 'text-primary' : 'text-gray-700 dark:text-gray-300'}`}
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="pt-4 border-t dark:border-gray-700 space-y-3">
              <a href="tel:+989123456789" className="flex items-center gap-2 text-primary dark:text-secondary">
                <Phone size={18} />
                <span>۰۹۱۲۳۴۵۶۷۸۹</span>
              </a>
              <Link to="/appointment" className="btn-primary block text-center">
                {t('nav.appointment')}
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

export default Header
