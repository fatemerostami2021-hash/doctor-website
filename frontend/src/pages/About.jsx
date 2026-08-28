import { useTranslation } from 'react-i18next'
import { Award, GraduationCap } from 'lucide-react'
import SEO from '../components/common/SEO.jsx'
import Breadcrumb from '../components/common/Breadcrumb.jsx'

const About = () => {
  const { t } = useTranslation()

  return (
    <>
      <SEO title={t('nav.about')} description={t('hero.description')} />
      <Breadcrumb items={[{ name: t('nav.about') }]} />
      
      <section className="section-padding">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="w-32 h-32 bg-primary rounded-full flex items-center justify-center text-white text-4xl font-bold mx-auto mb-6">
              {t('nav.about').charAt(0)}
            </div>
            <h1 className="text-3xl font-bold mb-2 dark:text-white">{t('footer.title')}</h1>
            <p className="text-primary font-medium">{t('footer.subtitle')}</p>
          </div>

          <div className="prose prose-lg max-w-none text-gray-700 dark:text-gray-300 leading-relaxed space-y-6">
            <p>{t('hero.description')}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mt-12">
            <div className="card dark:bg-gray-800 dark:border dark:border-gray-700">
              <div className="flex items-center gap-3 mb-4">
                <GraduationCap className="text-primary" size={24} />
                <h3 className="text-xl font-bold dark:text-white">{t('about.education')}</h3>
              </div>
              <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                <li>• {t('about.degree1')}</li>
                <li>• {t('about.degree2')}</li>
                <li>• {t('about.degree3')}</li>
                <li>• {t('about.degree4')}</li>
              </ul>
            </div>

            <div className="card dark:bg-gray-800 dark:border dark:border-gray-700">
              <div className="flex items-center gap-3 mb-4">
                <Award className="text-primary" size={24} />
                <h3 className="text-xl font-bold dark:text-white">{t('about.experience')}</h3>
              </div>
              <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                <li>• {t('about.exp1')}</li>
                <li>• {t('about.exp2')}</li>
                <li>• {t('about.exp3')}</li>
                <li>• {t('about.exp4')}</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default About
