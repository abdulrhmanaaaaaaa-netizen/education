/* إعدادات منصة تعليم
 * اترك بيانات Supabase فارغة إذا كنت تستخدم النسخة المحلية التجريبية.
 * لا تضع أي مفتاح service_role أو كلمة سر سرية في هذا الملف.
 */
window.TA3LEEM_CONFIG = {
  supabaseUrl: '',
  supabaseAnonKey: '',
  teacherEmails: ['arab@gmail.com'],
  appName: 'تعليم',
  dailyGoal: 10,
  subjects: [
    { id: 'arabic', name: 'اللغة العربية', icon: '📘', color: '#287C6B', soft: '#E6F4EE', label: 'عربي' },
    { id: 'math', name: 'الرياضيات', icon: '🧮', color: '#D98256', soft: '#FFF0E5', label: 'رياضيات' }
  ]
};
