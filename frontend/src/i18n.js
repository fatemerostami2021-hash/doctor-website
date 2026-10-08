import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LD from 'i18next-browser-languagedetector'
const T = {
en:{nav:['Home','About','Services','Contact'],book:'Book appointment',h1:'Your heart care',h2:'is our priority',
 desc:'Cardiologist and interventional cardiology fellow with over 15 years of experience diagnosing and treating cardiovascular disease.',
 svc:'Our services',svcSub:'Diagnosis and treatment with the most advanced equipment.',
 s:[['Angiography','Precise imaging of the coronary arteries.'],['Angioplasty','Opening blocked arteries without open surgery.'],['Echocardiography','Ultrasound view of heart structure and function.'],['Stress test','Heart response measured under exertion.']],
 about:'About the doctor',edu:['MD, Tehran University of Medical Sciences','Internal Medicine, Shahid Beheshti University','Cardiology fellowship, Tehran University','Interventional cardiology fellowship'],
 stats:[['15+','Years of experience'],['8,000+','Procedures'],['4','Languages spoken']],
 contact:'Book your visit',cSub:'Fill in the form and our team will call you back.',name:'Full name',phone:'Phone number',date:'Preferred date',svcSel:'Service',send:'Send request',ok:'Request received. We will contact you soon.',
 info:['Clinic address','Working hours'],addr:'Shiraz, Iran',hrs:'Sat–Wed, 9:00–19:00',rights:'All rights reserved.'},
fa:{nav:['خانه','درباره پزشک','خدمات','تماس'],book:'دریافت نوبت',h1:'مراقبت از قلب شما',h2:'اولویت ماست',
 desc:'فوق تخصص قلب و عروق و فلوشیپ اینترونشنال کاردیولوژی با بیش از ۱۵ سال تجربه در تشخیص و درمان بیماری‌های قلبی.',
 svc:'خدمات تخصصی',svcSub:'تشخیص و درمان با پیشرفته‌ترین تجهیزات.',
 s:[['آنژیوگرافی','تصویربرداری دقیق از رگ‌های قلب.'],['آنژیوپلاستی','بازکردن رگ‌های مسدود بدون جراحی باز.'],['اکوکاردیوگرافی','نمایش ساختار و عملکرد قلب با سونوگرافی.'],['تست ورزش','سنجش واکنش قلب هنگام فعالیت.']],
 about:'درباره پزشک',edu:['دکترای پزشکی عمومی، دانشگاه علوم پزشکی تهران','تخصص داخلی، دانشگاه شهید بهشتی','فوق تخصص قلب و عروق، دانشگاه تهران','فلوشیپ اینترونشنال کاردیولوژی'],
 stats:[['+۱۵','سال تجربه'],['+۸٬۰۰۰','پروسیجر'],['۴','زبان گفتگو']],
 contact:'دریافت نوبت',cSub:'فرم را تکمیل کنید؛ همکاران ما با شما تماس می‌گیرند.',name:'نام و نام خانوادگی',phone:'شماره تماس',date:'تاریخ دلخواه',svcSel:'خدمت',send:'ثبت درخواست',ok:'درخواست شما ثبت شد. به‌زودی تماس می‌گیریم.',
 info:['آدرس مطب','ساعات کاری'],addr:'شیراز، ایران',hrs:'شنبه تا چهارشنبه، ۹ تا ۱۹',rights:'تمامی حقوق محفوظ است.'},
ar:{nav:['الرئيسية','عن الطبيب','الخدمات','اتصل بنا'],book:'احجز موعدًا',h1:'رعاية قلبك',h2:'هي أولويتنا',
 desc:'أخصائي أمراض القلب وزميل القسطرة التداخلية بخبرة تزيد على 15 عامًا في تشخيص وعلاج أمراض القلب والأوعية الدموية.',
 svc:'خدماتنا',svcSub:'تشخيص وعلاج بأحدث المعدات.',
 s:[['تصوير الأوعية','تصوير دقيق للشرايين التاجية.'],['رأب الأوعية','فتح الشرايين المسدودة دون جراحة مفتوحة.'],['مخطط صدى القلب','عرض بنية القلب ووظيفته بالموجات فوق الصوتية.'],['اختبار الجهد','قياس استجابة القلب أثناء المجهود.']],
 about:'عن الطبيب',edu:['دكتوراه في الطب، جامعة طهران للعلوم الطبية','الطب الباطني، جامعة الشهيد بهشتي','زمالة أمراض القلب، جامعة طهران','زمالة القلب التداخلي'],
 stats:[['+15','سنة خبرة'],['+8,000','إجراء'],['4','لغات']],
 contact:'احجز زيارتك',cSub:'املأ النموذج وسيتصل بك فريقنا.',name:'الاسم الكامل',phone:'رقم الهاتف',date:'التاريخ المفضل',svcSel:'الخدمة',send:'إرسال الطلب',ok:'تم استلام طلبك. سنتواصل معك قريبًا.',
 info:['عنوان العيادة','ساعات العمل'],addr:'شيراز، إيران',hrs:'السبت–الأربعاء، 9–19',rights:'جميع الحقوق محفوظة.'},
tr:{nav:['Ana Sayfa','Doktor','Hizmetler','İletişim'],book:'Randevu al',h1:'Kalp sağlığınız',h2:'önceliğimizdir',
 desc:'Kardiyoloji uzmanı ve girişimsel kardiyoloji fellow’u; kalp-damar hastalıklarının tanı ve tedavisinde 15 yılı aşkın deneyim.',
 svc:'Hizmetlerimiz',svcSub:'En gelişmiş ekipmanlarla tanı ve tedavi.',
 s:[['Anjiyografi','Koroner damarların hassas görüntülenmesi.'],['Anjiyoplasti','Tıkalı damarları açık ameliyatsız açma.'],['Ekokardiyografi','Kalp yapısı ve işlevinin ultrason ile görüntülenmesi.'],['Efor testi','Eforda kalbin tepkisinin ölçülmesi.']],
 about:'Doktor hakkında',edu:['Tıp Doktorası, Tahran Tıp Üniversitesi','Dahiliye, Şehid Beheşti Üniversitesi','Kardiyoloji uzmanlığı, Tahran Üniversitesi','Girişimsel kardiyoloji fellow’luğu'],
 stats:[['15+','Yıllık deneyim'],['8.000+','İşlem'],['4','Dil']],
 contact:'Randevunuzu alın',cSub:'Formu doldurun, ekibimiz sizi arasın.',name:'Ad soyad',phone:'Telefon numarası',date:'Tercih edilen tarih',svcSel:'Hizmet',send:'Talebi gönder',ok:'Talebiniz alındı. Yakında sizinle iletişime geçeceğiz.',
 info:['Klinik adresi','Çalışma saatleri'],addr:'Şiraz, İran',hrs:'Cmt–Çar, 9:00–19:00',rights:'Tüm hakları saklıdır.'}}
i18n.use(LD).use(initReactI18next).init({
 resources:Object.fromEntries(Object.entries(T).map(([k,v])=>[k,{translation:v}])),
 fallbackLng:'en',supportedLngs:['en','fa','ar','tr'],returnObjects:true,interpolation:{escapeValue:false}})
export default i18n
