import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Calendar, Phone, User, MessageSquare, CheckCircle } from 'lucide-react'
import api from '../services/api.js'
import SEO from '../components/common/SEO.jsx'
import Breadcrumb from '../components/common/Breadcrumb.jsx'

const Appointment = () => {
  const { t } = useTranslation()
  const [form, setForm] = useState({ fullName: '', phone: '', email: '', preferredDate: '', service: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await api.post('/appointments', form)
      setSubmitted(true)
    } catch (error) {
      alert(t('common.error'))
    }
    setLoading(false)
  }

  if (submitted) {
    return (
      <section className="section-padding text-center">
        <div className="max-w-md mx-auto card dark:bg-gray-800 dark:border dark:border-gray-700">
          <CheckCircle className="text-green-500 mx-auto mb-4" size={64} />
          <h2 className="text-2xl font-bold mb-4 dark:text-white">{t('appointment.successTitle')}</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">{t('appointment.successMsg')}</p>
          <button onClick={() => setSubmitted(false)} className="btn-primary">{t('appointment.newRequest')}</button>
        </div>
      </section>
    )
  }

  return (
    <>
      <SEO title={t('nav.appointment')} description={t('appointment.subtitle')} />
      <Breadcrumb items={[{ name: t('nav.appointment') }]} />

      <section className="section-padding">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold mb-4 dark:text-white">{t('appointment.title')}</h1>
            <p className="text-gray-600 dark:text-gray-400">{t('appointment.subtitle')}</p>
          </div>

          <form onSubmit={handleSubmit} className="card space-y-6 dark:bg-gray-800 dark:border dark:border-gray-700">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2 dark:text-gray-300">{t('appointment.name')} *</label>
                <div className="relative">
                  <User className="absolute right-3 top-3 text-gray-400" size={18} />
                  <input required value={form.fullName} onChange={e => setForm({...form, fullName: e.target.value})}
                    className="w-full pr-10 p-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 dark:text-gray-300">{t('appointment.phone')} *</label>
                <div className="relative">
                  <Phone className="absolute right-3 top-3 text-gray-400" size={18} />
                  <input required type="tel" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})}
                    className="w-full pr-10 p-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2 dark:text-gray-300">{t('appointment.email')}</label>
                <input type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 dark:text-gray-300">{t('appointment.date')}</label>
                <div className="relative">
                  <Calendar className="absolute right-3 top-3 text-gray-400" size={18} />
                  <input type="date" value={form.preferredDate} onChange={e => setForm({...form, preferredDate: e.target.value})}
                    className="w-full pr-10 p-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 dark:text-gray-300">{t('appointment.service')}</label>
              <select value={form.service} onChange={e => setForm({...form, service: e.target.value})}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                <option value="">{t('appointment.selectService')}</option>
                <option value="visit">{t('appointment.visit')}</option>
                <option value="angiography">آنژیوگرافی</option>
                <option value="echocardiography">اکوکاردیوگرافی</option>
                <option value="stress-test">تست ورزش</option>
                <option value="holter">هولتر</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 dark:text-gray-300">{t('appointment.message')}</label>
              <div className="relative">
                <MessageSquare className="absolute right-3 top-3 text-gray-400" size={18} />
                <textarea rows={4} value={form.message} onChange={e => setForm({...form, message: e.target.value})}
                  className="w-full pr-10 p-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none resize-none dark:bg-gray-700 dark:border-gray-600 dark:text-white"></textarea>
              </div>
            </div>

            <button type="submit" disabled={loading} className="btn-primary w-full flex justify-center items-center gap-2">
              {loading ? t('appointment.submitting') : t('appointment.submit')}
            </button>
          </form>
        </div>
      </section>
    </>
  )
}

export default Appointment
