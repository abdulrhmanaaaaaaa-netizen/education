'use strict';

const SUBJECTS = window.TA3LEEM_CONFIG?.subjects || [];
const STORAGE_KEY = 'ta3leem_drawer_final';

/* ================== SVG Icons ================== */
const SVGS = {
  logo: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><rect width="100" height="100" rx="24" fill="#3B82F6"/><path d="M30 62 Q30 56 36 54 L50 50 L64 54 Q70 56 70 62 L70 76 Q70 80 64 80 L50 78 L36 80 Q30 80 30 76 Z" fill="#fff" opacity=".95"/><path d="M50 50 L50 78" stroke="#2563EB" stroke-width="1.5" opacity=".4"/><path d="M50 28 L66 36 L50 44 L34 36 Z" fill="#fff"/><rect x="49" y="36" width="2" height="10" fill="#fff"/></svg>`,
  home: `<svg viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>`,
  chat: `<svg viewBox="0 0 24 24"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>`,
  friends: `<svg viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
  bell: `<svg viewBox="0 0 24 24"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>`,
  trophy: `<svg viewBox="0 0 24 24"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg>`,
  chart: `<svg viewBox="0 0 24 24"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>`,
  settings: `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>`,
  logout: `<svg viewBox="0 0 24 24"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>`
};

/* ================== Data ================== */
const LESSONS = {
  arabic: [
    { id:'ar_1', category:'الاستماع', title:'سيدة المقاومة المصرية', subtitle:'آمنة دهشان · قيم الانتماء', icon:'🎧' },
    { id:'ar_2', category:'القراءة',  title:'العبور إلى المستقبل',    subtitle:'حرب أكتوبر · العزيمة', icon:'📖' },
    { id:'ar_3', category:'القراءة',  title:'من صقور الوطنية',        subtitle:'محمد مبروك · التضحية', icon:'⭐' },
    { id:'ar_4', category:'الشعر',    title:'مصر التي في خاطري',      subtitle:'أحمد رامي · حب الوطن', icon:'✒️' }
  ],
  math: [
    { id:'ma_1', category:'الأعداد',   title:'الأعداد غير النسبية والحقيقية', subtitle:'ℚ̅ · ℝ', icon:'√' },
    { id:'ma_2', category:'الفترات',   title:'الفترات والعمليات عليها',       subtitle:'تقاطع · اتحاد', icon:'⟷' },
    { id:'ma_3', category:'العمليات',  title:'العمليات على الأعداد',         subtitle:'الحدود الجذرية', icon:'＋' },
    { id:'ma_4', category:'الجذور',    title:'قوانين الجذور',               subtitle:'التربيعية والتكعيبية', icon:'∛' },
    { id:'ma_5', category:'الأسس',     title:'قوانين الأسس',                 subtitle:'الضرب والقسمة', icon:'xⁿ' }
  ]
};

const Q = (l, q, opts, a, why) => ({ type:'mcq', lesson:l, q, opts, a, why });
const BANK = [
  // العربي
  Q('ar_1','في أي عام وُلدت آمنة دهشان؟',['1948م','1952م','1967م','1973م'],1,'وُلدت عام 1952م.'),
  Q('ar_1','في أي محافظة وُلدت آمنة دهشان؟',['الدقهلية','الإسماعيلية','الفيوم','البحر الأحمر'],1,'وُلدت في الإسماعيلية.'),
  Q('ar_1','متى بدأ انخراط آمنة دهشان في العمل الفدائي؟',['1948م','1952م','1967م','1973م'],0,'بدأ عام 1948م.'),
  Q('ar_1','كيف كانت آمنة تُخفي هوية الفدائيين؟',['بإخفائهم في أنفاق','بتمويههم بملابس الفلاحين','بتسفيرهم','بإخفائهم في مخازن'],1,'بملابس الفلاحين.'),
  Q('ar_1','كيف كانت آمنة تُهرب الأسلحة؟',['عبر مراكب','داخل عربات','في أكياس بريدية','عبر أنفاق'],1,'داخل عربات.'),
  Q('ar_1','ماذا فعلت آمنة بعد نكسة 1967م؟',['سافرت','رفضت المغادرة','انتقلت للقاهرة','انضمت للجيش'],1,'رفضت المغادرة.'),
  Q('ar_1','في أي عام كانت آمنة في مقدمة مستقبلي الجنود؟',['1967م','1970م','1973م','1986م'],2,'عام 1973م.'),
  Q('ar_1','متى انضمت آمنة للمجالس المحلية؟',['1973م','1986م','1995م','2002م'],1,'عام 1986م.'),
  Q('ar_1','متى توفيت آمنة دهشان؟',['سبتمبر 2000م','سبتمبر 2002م','أكتوبر 2002م','يوليو 2003م'],1,'سبتمبر 2002م.'),
  Q('ar_1','ما معنى "تتوانى"؟',['تُسرع','تتباطأ وتتردد','تُقبل','تُصرّ'],1,'تتباطأ وتتردد.'),
  Q('ar_1','ما معنى "نكسة"؟',['هزيمة','انتصار','تقدم','ثبات'],0,'هزيمة.'),
  Q('ar_1','ما معنى "الإغارة"؟',['الهجوم المفاجئ','الانسحاب','التراجع','التحصن'],0,'الهجوم المفاجئ.'),
  Q('ar_1','ما معنى "أسلمت الروح"؟',['سافرت','توفيت','اعتزلت','تخلت'],1,'توفيت.'),
  Q('ar_1','ما معنى "قسيمة الرجل"؟',['منافسة','شريكة في المسؤولية','تابعة','لا علاقة'],1,'شريكة.'),
  Q('ar_1','ما الرسالة الضمنية في ختام النص؟',['المسؤولية على الرجال','واجب جماعي للجنسين','على الشباب فقط','لا رسالة'],1,'واجب جماعي.'),
  Q('ar_2','في أي تاريخ وقعت حرب أكتوبر؟',['6 أكتوبر 1967م','6 أكتوبر 1973م','6 أكتوبر 1948م','6 أكتوبر 1956م'],1,'1973م.'),
  Q('ar_2','ما اسم الخط الدفاعي للعدو؟',['ماجينو','بارليف','سيجفريد','هيندنبورج'],1,'بارليف.'),
  Q('ar_2','ما المادة الحارقة التي فخّخ بها العدو القناة؟',['مسيل للدموع','النابالم','مبردة','غاز الأعصاب'],1,'النابالم.'),
  Q('ar_2','دلالة "تسطّر بماء الذهب"؟',['كتابة','نُبل الحدث وقيمته','تعقيد','مبالغة'],1,'قيمة الحدث.'),
  Q('ar_2','المقصود بـ"جرح غائر"؟',['جسدي','أثر نفسي عميق','بسيط','لا معنى'],1,'أثر نفسي.'),
  Q('ar_2','دلالة "تكاثف الشعب مع القيادة"؟',['عاطفي','معادلة استراتيجية','شعار','مجاز'],1,'معادلة استراتيجية.'),
  Q('ar_2','دلالة استعارة "نسور مصر"؟',['شكلي','قوة الطيارين','تمويه','تهكم'],1,'قوة الطيارين.'),
  Q('ar_2','نوع الأسلوب في "فلتفخر يا بني"؟',['خبري','إنشائي أمر','استفهام','مؤكد'],1,'إنشائي أمر.'),
  Q('ar_2','دلالة "استعادة أرضنا الغالية"؟',['جغرافي','جزء من الهوية','مبالغة','شكل'],1,'جزء من الهوية.'),
  Q('ar_2','معنى "انتصاراته الخالدة"؟',['مؤقتة','دائمة','عابرة','قليلة'],1,'دائمة.'),
  Q('ar_3','في أي عام تخرج محمد مبروك من كلية الشرطة؟',['1993م','1995م','1997م','2013م'],1,'1995م.'),
  Q('ar_3','في أي عام التحق بجهاز أمن الدولة؟',['1995م','1997م','2011م','2013م'],1,'1997م.'),
  Q('ar_3','في أي عام استُشهد؟',['2011م','2013م','2015م','2017م'],1,'2013م.'),
  Q('ar_3','كم ساعة كان يعمل يومياً؟',['10','12','أكثر من 14','8'],2,'أكثر من 14.'),
  Q('ar_3','أيّ الصفات لم تُذكر؟',['التواضع','حسن الخلق','الشجاعة في القتال','التفاني'],2,'الشجاعة في القتال.'),
  Q('ar_3','لماذا سعى الإرهابيون لإسكات صوته؟',['شاهد عادي','شهادته كشفت حقائق','خلاف شخصي','شك'],1,'كشفت حقائق.'),
  Q('ar_3','العبارة الأكثر تعبيراً عن "الوطنية العملية"؟',['حبه','أفعال تسجل','استشهاده','عمله'],1,'أفعال تسجل.'),
  Q('ar_3','لماذا كان مؤهلاً للترقي؟',['وساطة','الكفاءة والصدق','شهادات','علاقات'],1,'الكفاءة.'),
  Q('ar_3','مضاد "المتربصين"؟',['المسالمين','المقيمين','المسافرين','العابرين'],0,'المسالمين.'),
  Q('ar_3','معنى "يذودون عنها"؟',['يبتعدون','يدافعون','يراقبون','يهاجمون'],1,'يدافعون.'),
  Q('ar_3','معنى "بار بوالديه"؟',['مطيع ومحسن','مهمل','خائف','منشغل'],0,'مطيع.'),
  Q('ar_3','معنى "يسطع"؟',['يختفي','يلمع','ينطفئ','ينتهي'],1,'يلمع.'),
  Q('ar_4','من الشاعر؟',['حافظ إبراهيم','أحمد شوقي','أحمد رامي','إيليا أبو ماضي'],2,'أحمد رامي.'),
  Q('ar_4','في أي عام توفي أحمد رامي؟',['1961م','1971م','1981م','1991م'],2,'1981م.'),
  Q('ar_4','دلالة "خاطري وفمي"؟',['تفخيم','اكتمال الحب','تأكيد','ترادف'],1,'اكتمال الحب.'),
  Q('ar_4','دلالة "من كل روحي ودمي"؟',['مبالغة','الاندماج الكامل','تكرار','عادي'],1,'الاندماج.'),
  Q('ar_4','دلالة "نفتديها بالعزيز الأكرم"؟',['لا معنى','الفداء بأغلى ما يملك','دعاء','مجاز'],1,'الفداء.'),
  Q('ar_4','دلالة "تحت ظل العلم"؟',['العلم الأكاديمي','الراية الجامعة','معرفة','تقدم'],1,'الراية الجامعة.'),
  Q('ar_4','لماذا وصفها بـ"مهد الرجاء"؟',['جمال','منبع الأمل','دعاء','تصوير'],1,'منبع الأمل.'),
  Q('ar_4','دلالة "منزل الروح الأمين"؟',['جغرافي','القدسية الدينية','مجاز','رمزي'],1,'القدسية.'),
  Q('ar_4','من هو "الروح الأمين"؟',['ميكائيل','جبريل','إسرافيل','عزرائيل'],1,'جبريل.'),
  Q('ar_4','دلالة "إنا على عهد الوفاء"؟',['تردد','تأكيد الثبات','شك','احتمال'],1,'تأكيد الثبات.'),
  Q('ar_4','نوع الأسلوب في "يا مصر يا مهد الرجاء"؟',['خبري','إنشائي نداء','استفهام','مؤكد'],1,'إنشائي نداء.'),
  Q('ar_4','معنى "المبين"؟',['الغامض','الواضح','الخفي','الصعب'],1,'الواضح.'),
  Q('ar_4','من هم "بني الحمى"؟',['الأعداء','أبناء مصر وحماتها','السياح','الجيران'],1,'أبناء مصر.'),
  Q('ar_4','نوع الأسلوب في "يا ليت كل مؤمن"؟',['خبري','إنشائي تمنٍّ','شرط','نهي'],1,'إنشائي تمنٍّ.'),
  // الرياضيات
  Q('ma_1','أيٌّ عدد غير نسبي؟',['√5','√25','0.75','−3/2'],0,'√5.'),
  Q('ma_1','√49 + √36 =',['13','√85','85','49'],0,'7+6=13.'),
  Q('ma_1','³√−125 + √81 =',['4','−4','14','−14'],0,'−5+9=4.'),
  Q('ma_1','أيٌّ عدد غير نسبي؟',['π/2','0.5','−7','22/7'],0,'π/2.'),
  Q('ma_1','رمز الأعداد غير النسبية؟',['ℚ','ℚ̅','ℤ','ℕ'],1,'ℚ̅.'),
  Q('ma_1','العلاقة الصحيحة؟',['ℕ ⊂ ℤ ⊂ ℚ ⊂ ℝ','ℝ ⊂ ℚ','ℚ ⊂ ℕ','ℤ ⊂ ℕ'],0,'ℕ ⊂ ℤ ⊂ ℚ ⊂ ℝ.'),
  Q('ma_1','ℚ ∩ ℚ̅ =',['∅','ℚ','ℝ','ℚ̅'],0,'∅.'),
  Q('ma_1','ℚ ∪ ℚ̅ =',['ℝ','ℕ','ℤ','ℚ'],0,'ℝ.'),
  Q('ma_1','بين أي عددين يقع ³√50؟',['3 و 4','2 و 3','4 و 5','5 و 6'],0,'3 و 4.'),
  Q('ma_1','بين أي عددين يقع √33؟',['5 و 6','6 و 7','4 و 5','3 و 4'],0,'5 و 6.'),
  Q('ma_1','بين أي عددين يقع −√33؟',['−6 و −5','−6 و −7','−4 و −5','5 و 6'],0,'−6 و −5.'),
  Q('ma_1','حل x² + 25 = 0؟',['لا حل','±5','5','25'],0,'لا حل.'),
  Q('ma_1','حل 5x² − 8 = 12 في ℚ؟',['±2','±√2','±4','لا حل'],0,'±2.'),
  Q('ma_1','حل 2(x² − 1) = −10؟',['لا حل','±2','±3','0'],0,'لا حل.'),
  Q('ma_1','√−9 ينتمي إلى؟',['ℝ','ℚ','لا ينتمي إلى ℝ','ℤ'],2,'لا ينتمي إلى ℝ.'),
  Q('ma_1','أيّ عدد لا يمثل نسبياً؟',['0','−7','√2','1/3'],2,'√2.'),
  Q('ma_1','ينتمي إلى ℤ ولا ينتمي إلى ℕ؟',['0','−7','5','√4'],1,'−7.'),
  Q('ma_1','غير السالبة =',['[0, ∞[',']0, ∞[',']−∞, 0[',']−∞, ∞['],0,'[0, ∞[.'),
  Q('ma_1','السالبة =',[']−∞, 0[','[−∞, 0]',']0, ∞[','[0, ∞['],0,']−∞, 0[.'),
  Q('ma_1','³√27 + ³√8 =',['5','6','³√35','35'],0,'3+2=5.'),
  Q('ma_1','√x = 7 → x =',['49','7','14','343'],0,'49.'),
  Q('ma_2','{x : −2 ≤ x < 3} =',['[−2, 3[',']−2, 3]','[−2, 3]',']−2, 3['],0,'[−2, 3[.'),
  Q('ma_2','{x : x > 3} =',[']3, ∞[','[3, ∞[',']−∞, 3[',']−∞, 3]'],0,']3, ∞[.'),
  Q('ma_2','{x : x ≤ 5} =',[']−∞, 5]',']−∞, 5[','[5, ∞[',']5, ∞['],0,']−∞, 5].'),
  Q('ma_2','[2, 5] ∩ ]3, 7[ =',[']3, 5]','[2, 7[','[3, 5]','[2, 3]'],0,']3, 5].'),
  Q('ma_2','[−1, 3] ∪ ]3, 5] =',['[−1, 5]','[−1, 3]','[3, 5]','∅'],0,'[−1, 5].'),
  Q('ma_2','[1, 4] − ]2, 3] =',['[1, 2] ∪ ]3, 4]','[1, 2]','[1, 4]','∅'],0,'[1, 2] ∪ ]3, 4].'),
  Q('ma_2','ℝ − [−3, 3] =',[']−∞, −3[ ∪ ]3, ∞[','[−3, 3]',']−3, 3[','∅'],0,']−∞, −3[ ∪ ]3, ∞[.'),
  Q('ma_2','[1, 5] ∩ [5, 7] =',['{5}','∅','[1, 7]','[5, 5]'],0,'{5}.'),
  Q('ma_2','[1, 5] ∩ ]5, 7[ =',['∅','{5}','[1, 7]','[5, 7['],0,'∅.'),
  Q('ma_2','X = [−2, 2] ∩ ℕ =',['{0, 1, 2}','{−1, 0, 1}','{1, 2}','{0}'],0,'{0, 1, 2}.'),
  Q('ma_2','−2 ∈ [−5, 7]؟',['نعم','لا','أحياناً','غير محدد'],0,'نعم.'),
  Q('ma_2','−7 ∈ [−5, 7]؟',['نعم','لا','أحياناً','غير محدد'],1,'لا.'),
  Q('ma_2','[3, 7] − ]3, 7[ =',['{3, 7}','∅','[3, 7]',']3, 7['],0,'{3, 7}.'),
  Q('ma_3','√12 + √27 =',['5√3','3√5','√39','9√3'],0,'5√3.'),
  Q('ma_3','√50 − √32 =',['√2','√18','3√2','−√2'],0,'√2.'),
  Q('ma_3','(√3 + √2)(√3 − √2) =',['1','5','2√6','√6'],0,'1.'),
  Q('ma_3','(√5 + 2)² =',['9 + 4√5','9','7 + 4√5','3 + 2√5'],0,'9 + 4√5.'),
  Q('ma_3','1/(√7 − √6) =',['√7 + √6','√7 − √6','1','√7 − 6'],0,'√7 + √6.'),
  Q('ma_3','المعكوس الضربي لـ (√3 + 2) =',['2 − √3','√3 − 2','1/(√3 + 2)','√3 + 2'],0,'2 − √3.'),
  Q('ma_3','3√2(2√2 + √3) =',['12 + 3√6','12 + 6√6','6 + 3√6','12'],0,'12 + 3√6.'),
  Q('ma_3','(√6 + √2)² =',['8 + 4√3','8 + 4','8 + 4√2','6 + 2'],0,'8 + 4√3.'),
  Q('ma_3','(2√3)⁴ =',['144','12','36','48'],0,'144.'),
  Q('ma_3','√18 × √8 =',['12','√26','6√2','144'],0,'12.'),
  Q('ma_3','√a + √b = √(a + b)؟',['صحيحة','خاطئة','أحياناً','عندما a=b'],1,'خاطئة.'),
  Q('ma_3','المحايد الجمعي =',['0','1','−1','∞'],0,'0.'),
  Q('ma_3','المحايد الضربي =',['1','0','−1','2'],0,'1.'),
  Q('ma_3','المعكوس الجمعي لـ 5√3 =',['−5√3','5√3','1/(5√3)','√3/5'],0,'−5√3.'),
  Q('ma_3','3√2 + 5√3 + 2√2 − 2√3 =',['5√2 + 3√3','8√5','3√2 + 5√3','5√6'],0,'5√2 + 3√3.'),
  Q('ma_3','√20 + √45 =',['5√5','√65','3√5','2√65'],0,'5√5.'),
  Q('ma_3','√27 − √12 =',['√3','3√3','5√3','√15'],0,'√3.'),
  Q('ma_3','2√50 + 3√32 =',['22√2','5√82','10√2','5√50'],0,'22√2.'),
  Q('ma_4','√a × √b =',['√(ab)','√(a+b)','√a+√b','ab'],0,'√(ab).'),
  Q('ma_4','³√a × ³√a × ³√a =',['a','3a','a³','³√(3a)'],0,'a.'),
  Q('ma_4','√a ÷ √b =',['√(a/b)','√(ab)','√(a−b)','a/b'],0,'√(a/b).'),
  Q('ma_4','³√2 × ³√−3 =',['³√−6','√−6','−6','³√6'],0,'³√−6.'),
  Q('ma_4','√3 × √12 =',['6','36','√15','4√3'],0,'6.'),
  Q('ma_4','³√81 ÷ ³√3 =',['3','9','27','81'],0,'3.'),
  Q('ma_4','√12 ÷ √6 =',['√2','2','√6','6'],0,'√2.'),
  Q('ma_4','5√48 =',['20√3','10√6','40√3','10√3'],0,'20√3.'),
  Q('ma_4','5 ³√48 =',['10 ³√6','20 ³√3','5 ³√48','40 ³√3'],0,'10 ³√6.'),
  Q('ma_4','√18 =',['3√2','2√3','9√2','6√2'],0,'3√2.'),
  Q('ma_4','√(1/16) =',['1/4','1/8','4','16'],0,'1/4.'),
  Q('ma_4','³√54 − ³√16 =',['³√2','2 ³√2','−³√2','3 ³√2'],0,'³√2.'),
  Q('ma_4','(√5 − 1)² =',['6 − 2√5','4','6 + 2√5','4 + 2√5'],0,'6 − 2√5.'),
  Q('ma_4','³√(8/27) =',['2/3','8/27','3/2','³√8/27'],0,'2/3.'),
  Q('ma_4','√(a²b) =',['a√b','a²√b','ab','a/b'],0,'a√b.'),
  Q('ma_4','√0.25 =',['0.5','0.05','2.5','0.025'],0,'0.5.'),
  Q('ma_4','³√(−8) =',['−2','2','−4','4'],0,'−2.'),
  Q('ma_4','3√2 + 2√2 =',['5√2','5√4','6√2','√20'],0,'5√2.'),
  Q('ma_5','a^m × a^n =',['a^(m+n)','a^(m·n)','a^(m−n)','(a·m)^n'],0,'a^(m+n).'),
  Q('ma_5','a^m ÷ a^n =',['a^(m−n)','a^(m+n)','a^(m/n)','a^(m·n)'],0,'a^(m−n).'),
  Q('ma_5','(ab)^n =',['a^n · b^n','a^n + b^n','ab^n','a^(n^b)'],0,'a^n · b^n.'),
  Q('ma_5','(a/b)^n =',['a^n / b^n','a/b^n','a^n/b','a·n/b·n'],0,'a^n / b^n.'),
  Q('ma_5','a^0 =',['1','0','a','غير معرّف'],0,'1.'),
  Q('ma_5','a^(−n) =',['1/a^n','−a^n','a^n','−a^(−n)'],0,'1/a^n.'),
  Q('ma_5','2³ × 2² =',['32','64','12','25'],0,'32.'),
  Q('ma_5','3⁶ ÷ 3² =',['81','27','9','243'],0,'81.'),
  Q('ma_5','(3 × 4)² =',['144','49','81','12'],0,'144.'),
  Q('ma_5','(2/5)³ =',['8/125','6/15','8/5','2/125'],0,'8/125.'),
  Q('ma_5','5^(−2) =',['1/25','−25','25','−1/25'],0,'1/25.'),
  Q('ma_5','(2/3)^(−2) =',['9/4','4/9','−9/4','−4/9'],0,'9/4.'),
  Q('ma_5','(√3)⁴ =',['9','3','12','6'],0,'9.'),
  Q('ma_5','(−√3)³ =',['−3√3','3√3','−9','9'],0,'−3√3.'),
  Q('ma_5','(−√3)⁴ =',['9','−9','3','−3'],0,'9.'),
  Q('ma_5','(√7)^(−2) =',['1/7','7','−7','√7'],0,'1/7.'),
  Q('ma_5','(0.1)^(−2) =',['100','0.01','−100','10'],0,'100.'),
  Q('ma_5','(a²)³ × a^(−3) =',['a³','a⁹','a^(−1)','a⁶'],0,'a³.'),
  Q('ma_5','2^x = 5 → 2^(x+2) =',['20','10','25','7'],0,'20.'),
  Q('ma_5','3^x = 4 → 3^(3−x) =',['27/4','27/3','3/4','12'],0,'27/4.'),
  Q('ma_5','5^x = 2 → 5^(2x) =',['4','10','25','5'],0,'4.'),
  Q('ma_5','27^(1/3) =',['3','9','81','1/3'],0,'3.'),
  Q('ma_5','16^(−1/2) =',['1/4','−4','4','1/16'],0,'1/4.'),
  Q('ma_5','2^(−3) × 2⁵ =',['4','−4','8','16'],0,'4.'),
  Q('ma_5','2⁵ =',['32','16','64','10'],0,'32.'),
  Q('ma_5','10³ =',['1000','30','100','10000'],0,'1000.'),
  Q('ma_5','(a²)³ =',['a⁶','a⁵','a⁸','a⁹'],0,'a⁶.'),
  Q('ma_5','5² + 5² =',['2 × 5² = 50','5⁴ = 625','10² = 100','25'],0,'50.'),
  Q('ma_5','(3^x)² =',['3^(2x) = 9^x','3^(x²)','9^(x²)','كلاهما أ و ج'],0,'3^(2x).')
];

/* ================== Storage & State ================== */
function loadStore() {
  try { const v = JSON.parse(localStorage.getItem(STORAGE_KEY)); if (v?.users) return v; } catch(_){}
  return { users:{}, session:null };
}
let store = loadStore();

const state = {
  page: 'home',
  activeSubject: 'arabic',
  activeLesson: null,
  authMode: 'login',
  quiz: null,
  subPage: null,
  resultData: null,
  drawerOpen: false
};

const app = document.getElementById('app');
const $ = s => document.querySelector(s);
const save = () => localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
const esc = v => String(v??'').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const initial = n => Array.from(String(n||'م'))[0] || 'م';

function getStats(user) {
  if (!user.stats) user.stats = { points:0, solved:0, correct:0 };
  return user.stats;
}
const currentUser = () => store.session && store.users[store.session] ? store.users[store.session] : null;
const getQuestions = (lessonId, subjectId) => {
  const pool = BANK.filter(q => q.lesson.startsWith(subjectId === 'arabic' ? 'ar_' : 'ma_'));
  if (lessonId === 'all') return pool;
  return pool.filter(q => q.lesson === lessonId);
};
const shuffle = a => { const o=[...a]; for (let i=o.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1));[o[i],o[j]]=[o[j],o[i]]; } return o; };
const toast = m => { const el=$('#toast'); if (!el) return; el.textContent=m; el.classList.remove('hidden'); setTimeout(()=>el.classList.add('hidden'), 2500); };

/* ================== Layout (Drawer Only) ================== */
function renderShell(content) {
  const u = currentUser();
  app.innerHTML = `
    <!-- Side Drawer -->
    <div class="drawer-overlay ${state.drawerOpen ? 'open' : ''}" data-action="toggle-drawer"></div>
    <aside class="drawer ${state.drawerOpen ? 'open' : ''}">
      <div class="drawer-header">
        <div class="brand">${SVGS.logo} تعليم</div>
        <button class="drawer-close" data-action="toggle-drawer">×</button>
      </div>
      <div class="drawer-user">
        <div class="avatar">${initial(u.name)}</div>
        <h3>${esc(u.name)}</h3>
        <p>${esc(u.classroom)}</p>
      </div>
      <nav class="drawer-nav">
        <div class="drawer-item" data-page="home"><span>${SVGS.home}</span> الرئيسية</div>
        <div class="drawer-item" data-action="subpage" data-sub="progress"><span>${SVGS.chart}</span> تقدمي وإحصائياتي</div>
        <div class="drawer-item" data-action="subpage" data-sub="notifications"><span>${SVGS.bell}</span> الإشعارات</div>
        <div class="drawer-item" data-action="subpage" data-sub="chat"><span>${SVGS.chat}</span> الدردشة</div>
        <div class="drawer-item" data-action="subpage" data-sub="friends"><span>${SVGS.friends}</span> الأصدقاء</div>
        <div class="drawer-item" data-action="subpage" data-sub="leaderboard"><span>${SVGS.trophy}</span> المتصدرون</div>
        <div class="drawer-item" data-action="subpage" data-sub="settings"><span>${SVGS.settings}</span> الإعدادات</div>
        <div class="drawer-item" data-action="logout" style="margin-top:auto;color:var(--danger)"><span>${SVGS.logout}</span> تسجيل الخروج</div>
      </nav>
    </aside>

    <!-- Main Content -->
    <header class="topbar">
      <div class="brand">${SVGS.logo} تعليم</div>
      <div class="hamburger" data-action="toggle-drawer">
        <span></span><span></span><span></span>
      </div>
    </header>
    <main class="page-content">${content}</main>
  `;
}

/* ================== Pages ================== */
function renderHome() {
  const u = currentUser(), s = getStats(u);
  renderShell(`
    <div style="margin-bottom:24px">
      <h1 style="font-size:26px;font-weight:900;color:var(--text-main)">أهلاً، ${esc(u.name)} 👋</h1>
      <p style="color:var(--text-sub);font-size:14px;margin-top:4px">جاهز لتحقيق تقدم جديد اليوم؟</p>
    </div>

    <div class="grid-2">
      <div class="stat-box large">
        <div class="stat-label">إجمالي النقاط</div>
        <div class="stat-value primary">${s.points}</div>
        <div style="font-size:12px;color:var(--success);margin-top:4px">↑ استمر في التقدم</div>
      </div>
      <div class="stat-box">
        <div class="stat-label">الدقة</div>
        <div class="stat-value">${s.solved ? Math.round((s.correct/s.solved)*100) : 0}%</div>
      </div>
      <div class="stat-box">
        <div class="stat-label">إجابات</div>
        <div class="stat-value">${s.solved}</div>
      </div>
    </div>

    <div class="card">
      <div class="card-header"><div class="card-title">التصنيفات (المواد)</div></div>
      ${SUBJECTS.map(subj => `
        <div class="list-item" data-action="pick-subject" data-subject="${subj.id}">
          <div class="item-icon" style="color:${subj.color}">${subj.icon}</div>
          <div class="item-info">
            <div class="item-title">${subj.name}</div>
            <div class="item-desc">${LESSONS[subj.id].length} دروس متاحة</div>
          </div>
          <div class="item-arrow">←</div>
        </div>
      `).join('')}
    </div>
  `);
}

function renderSubPage() {
  const sub = state.subPage;
  let title = "رجوع", content = "";

  if (sub === 'chat') { title = "الدردشة"; content = `<div class="card text-center" style="padding:40px"><p style="color:var(--text-muted)">لا توجد رسائل حالياً</p></div>`; }
  else if (sub === 'friends') { title = "الأصدقاء"; content = `<div class="card text-center" style="padding:40px"><p style="color:var(--text-muted)">لم تقم بإضافة أصدقاء بعد</p></div>`; }
  else if (sub === 'notifications') { title = "الإشعارات"; content = `<div class="card text-center" style="padding:40px"><p style="color:var(--text-muted)">لا توجد إشعارات جديدة</p></div>`; }
  else if (sub === 'leaderboard') { title = "المتصدرون"; content = `<div class="card text-center" style="padding:40px"><p style="color:var(--text-muted)">أنت في المركز الأول! استمر</p></div>`; }
  else if (sub === 'progress') { 
    title = "تقدمي"; 
    const s = getStats(currentUser()); 
    content = `<div class="card"><div class="stat-box"><div class="stat-label">إجمالي الإجابات</div><div class="stat-value">${s.solved}</div></div><div class="stat-box" style="margin-top:12px"><div class="stat-label">الإجابات الصحيحة</div><div class="stat-value">${s.correct}</div></div></div>`; 
  }
  else if (sub === 'settings') { title = "الإعدادات"; content = `<div class="card text-center" style="padding:40px"><p style="color:var(--text-muted)">الإعدادات مطبقة افتراضياً</p></div>`; }

  renderShell(`
    <div style="display:flex;align-items:center;gap:12px;margin-bottom:20px">
      <button class="btn btn-outline" style="width:auto;padding:8px 12px;border-radius:50%" data-action="close-subpage">${SVGS.back}</button>
      <h1 style="font-size:20px;font-weight:900">${title}</h1>
    </div>
    ${content}
  `);
}

function renderSubject() {
  const subj = SUBJECTS.find(s => s.id === state.activeSubject);
  renderShell(`
    <div style="display:flex;align-items:center;gap:12px;margin-bottom:20px">
      <button class="btn btn-outline" style="width:auto;padding:8px 12px;border-radius:50%" data-page="home">${SVGS.back}</button>
      <h1 style="font-size:20px;font-weight:900">${subj.name}</h1>
    </div>
    <div class="card">
      ${LESSONS[subj.id].map(l => `
        <div class="list-item" data-action="open-lesson" data-lesson="${l.id}">
          <div class="item-icon">${l.icon}</div>
          <div class="item-info">
            <div class="item-title">${l.title}</div>
            <div class="item-desc">${l.subtitle}</div>
          </div>
          <div class="item-arrow">←</div>
        </div>
      `).join('')}
    </div>
  `);
}

function renderLesson() {
  const subj = SUBJECTS.find(s => s.id === state.activeSubject);
  const lesson = LESSONS[subj.id].find(l => l.id === state.activeLesson);
  renderShell(`
    <div style="display:flex;align-items:center;gap:12px;margin-bottom:20px">
      <button class="btn btn-outline" style="width:auto;padding:8px 12px;border-radius:50%" data-action="go-back-subject">${SVGS.back}</button>
      <h1 style="font-size:20px;font-weight:900">${lesson.title}</h1>
    </div>
    <div class="card" style="margin-bottom:16px">
      <p style="color:var(--text-muted);font-size:14px;line-height:1.8">${lesson.subtitle}</p>
    </div>
    <div class="card" data-action="start-quiz" data-mode="practice" style="cursor:pointer;border-color:var(--primary);margin-bottom:12px">
      <div class="list-item" style="border:none;padding:0">
        <div class="item-icon" style="background:var(--primary-soft);color:var(--primary)">✍️</div>
        <div class="item-info"><div class="item-title">تدريب سريع</div><div class="item-desc">10 أسئلة عشوائية</div></div>
        <div class="item-arrow" style="color:var(--primary)">←</div>
      </div>
    </div>
    <div class="card" data-action="start-quiz" data-mode="exam" style="cursor:pointer">
      <div class="list-item" style="border:none;padding:0">
        <div class="item-icon">◇</div>
        <div class="item-info"><div class="item-title">امتحان شامل</div><div class="item-desc">20 سؤالاً متكاملاً</div></div>
        <div class="item-arrow">←</div>
      </div>
    </div>
  `);
}

/* ================== Quiz System ================== */
function startQuiz(mode) {
  const qs = getQuestions(state.activeLesson, state.activeSubject);
  if (!qs.length) return toast('لا توجد أسئلة');
  const count = mode === 'exam' ? Math.min(20, qs.length) : Math.min(10, qs.length);
  state.quiz = { qs: shuffle(qs).slice(0, count), idx: 0, answers: [], selected: null, checked: false, mode };
  state.page = 'quiz'; render();
}

function renderQuiz() {
  const qz = state.quiz;
  if (!qz) return;
  const q = qz.qs[qz.idx];
  const checked = qz.checked, selected = qz.selected;
  const progress = Math.round(((qz.idx + 1) / qz.qs.length) * 100);
  const letters = ['أ','ب','ج','د'];

  let feedback = '';
  if (checked) {
    const isCorrect = selected === q.a;
    feedback = `
      <div class="feedback-box ${isCorrect ? 'success' : 'danger'}">
        <strong>${isCorrect ? '✅ إجابة صحيحة' : '❌ إجابة خاطئة'}</strong><br>
        الإجابة الصحيحة: ${q.opts[q.a]}<br>
        <span style="opacity:0.8">الشرح: ${q.why}</span>
      </div>`;
  }

  app.innerHTML = `
    <header class="topbar">
      <button class="btn btn-outline" style="width:auto;padding:8px 12px;border-radius:50%" data-action="quit-quiz">${SVGS.back}</button>
      <span style="font-size:14px;font-weight:800">${qz.idx+1} / ${qz.qs.length}</span>
    </header>
    <main class="page-content">
      <div class="progress-bar"><div class="progress-fill" style="width:${progress}%"></div></div>
      <h2 class="question-text">${esc(q.q)}</h2>
      <div class="options-list">
        ${q.opts.map((o, i) => {
          let cls = 'option-btn';
          if (selected === i) cls += ' selected';
          if (checked && i === q.a) cls += ' correct';
          else if (checked && selected === i) cls += ' wrong';
          return `<button class="${cls}" data-ans="${i}" ${checked?'disabled':''}>
            <div class="option-letter">${letters[i]}</div>
            <div class="option-text">${esc(o)}</div>
          </button>`;
        }).join('')}
      </div>
      ${feedback}
      <div style="margin-top:24px">
        ${checked 
          ? `<button class="btn btn-primary" data-action="next-q">${qz.idx === qz.qs.length - 1 ? 'عرض النتيجة' : 'السؤال التالي ←'}</button>`
          : `<button class="btn btn-primary" data-action="check-q">تأكيد الإجابة</button>`}
      </div>
    </main>
  `;
}

function finishQuiz() {
  const qz = state.quiz;
  let correctCount = 0;
  const details = qz.qs.map((q, i) => {
    const isCorrect = qz.answers[i] === q.a;
    if (isCorrect) correctCount++;
    return { q: q.q, correctAns: q.opts[q.a], selectedAns: q.opts[qz.answers[i]] || 'لم تجب', isCorrect };
  });
  
  const u = currentUser();
  const s = getStats(u);
  const pts = (correctCount * 10) - ((qz.qs.length - correctCount) * 3);
  s.points = Math.max(0, s.points + pts);
  s.solved += qz.qs.length;
  s.correct += correctCount;
  save();

  const pct = Math.round((correctCount / qz.qs.length) * 100);
  state.page = 'result'; state.resultData = { details, pct, pts };
  render();
}

function renderResult() {
  const { details, pct, pts } = state.resultData;
  renderShell(`
    <div class="card" style="text-align:center;padding:40px 20px;margin-bottom:24px">
      <div style="font-size:64px;font-weight:900;color:var(--primary);line-height:1">${pct}%</div>
      <h2 style="font-size:20px;font-weight:800;margin-top:12px">${pct >= 50 ? 'أحسنت!' : 'تحتاج لمزيد من التدريب'}</h2>
      <p style="color:var(--text-muted);margin-top:8px">لقد أحرزت ${pts > 0 ? '+' : ''}${pts} نقطة</p>
    </div>
    
    <div class="card">
      <div class="card-header"><div class="card-title">مراجعة الإجابات</div></div>
      ${details.map((d, i) => `
        <div class="list-item" style="cursor:default">
          <div class="item-icon" style="color:${d.isCorrect ? 'var(--success)' : 'var(--danger)'}">${d.isCorrect ? '✓' : '✗'}</div>
          <div class="item-info">
            <div class="item-title" style="font-size:13px;line-height:1.6">${i+1}. ${esc(d.q)}</div>
            <div class="item-desc" style="color:${d.isCorrect ? 'var(--success)' : 'var(--danger)'}">الصحيحة: ${d.correctAns}</div>
          </div>
        </div>
      `).join('')}
    </div>
    <button class="btn btn-primary" data-page="home">العودة للرئيسية</button>
  `);
}

/* ================== Auth ================== */
function renderAuth() {
  const isReg = state.authMode === 'register';
  app.innerHTML = `
    <div class="auth-screen">
      <div class="auth-card">
        <div class="auth-header">
          <div style="display:flex;justify-content:center;margin-bottom:12px">${SVGS.logo}</div>
          <h1>${isReg ? 'إنشاء حساب' : 'تسجيل الدخول'}</h1>
          <p>${isReg ? 'انضم إلينا وابدأ رحلة التعلم' : 'مرحباً بعودتك مجدداً'}</p>
        </div>
        <div class="auth-tabs">
          <div class="auth-tab ${!isReg?'active':''}" id="tabLogin">دخول</div>
          <div class="auth-tab ${isReg?'active':''}" id="tabReg">حساب جديد</div>
        </div>
        <form id="authForm">
          <div class="input-group"><label>الاسم</label><input id="fName" required placeholder="اسمك الكريم"></div>
          <div class="input-group"><label>الفصل</label><input id="fClass" required placeholder="مثال: 2/1"></div>
          <div class="input-group"><label>كلمة المرور</label><input id="fPass" type="password" required placeholder="••••••••"></div>
          <button type="submit" class="btn btn-primary" style="margin-top:8px">${isReg ? 'إنشاء الحساب' : 'دخول'}</button>
        </form>
      </div>
    </div>`;
  $('#tabLogin').onclick = () => { state.authMode='login'; renderAuth(); };
  $('#tabReg').onclick = () => { state.authMode='register'; renderAuth(); };
  $('#authForm').onsubmit = (e) => {
    e.preventDefault();
    const name = $('#fName').value.trim(), cls = $('#fClass').value.trim(), pass = $('#fPass').value.trim();
    const nrm = v => v.toLowerCase();
    if (isReg) {
      if (Object.values(store.users).find(u => nrm(u.name)===nrm(name) && nrm(u.classroom)===nrm(cls))) return toast('الحساب موجود مسبقاً');
      const key = 'u_' + Date.now();
      store.users[key] = { name, classroom: cls, pass, role: 'student', stats: { points:0, solved:0, correct:0 } };
      store.session = key; save(); state.page='home'; render(); toast('مرحباً بك!');
    } else {
      const match = Object.entries(store.users).find(([,u]) => nrm(u.name)===nrm(name) && nrm(u.classroom)===nrm(cls) && u.pass===pass);
      if (match) { store.session = match[0]; save(); state.page='home'; render(); toast('تم الدخول بنجاح'); }
      else toast('البيانات غير صحيحة');
    }
  };
}

/* ================== Router & Events ================== */
function render() {
  if (!currentUser()) return renderAuth();
  switch (state.page) {
    case 'home': renderHome(); break;
    case 'subjects': renderSubject(); break;
    case 'lesson': renderLesson(); break;
    case 'subpage': renderSubPage(); break;
    case 'quiz': renderQuiz(); break;
    case 'result': renderResult(); break;
    default: renderHome();
  }
}

app.addEventListener('click', (e) => {
  // Handle Drawer Toggle
  const drawerBtn = e.target.closest('[data-action="toggle-drawer"]');
  if (drawerBtn) {
    state.drawerOpen = !state.drawerOpen;
    render(); return;
  }

  const ansBtn = e.target.closest('[data-ans]');
  if (ansBtn) {
    if (state.quiz.checked) return;
    state.quiz.selected = Number(ansBtn.dataset.ans);
    renderQuiz(); return;
  }

  const btn = e.target.closest('[data-action], [data-page]');
  if (!btn) return;

  if (btn.dataset.page) {
    state.page = btn.dataset.page;
    state.drawerOpen = false;
    render(); return;
  }

  const action = btn.dataset.action;
  if (action === 'pick-subject') { state.activeSubject = btn.dataset.subject; state.page = 'subjects'; state.drawerOpen = false; render(); }
  if (action === 'open-lesson') { state.activeLesson = btn.dataset.lesson; state.page = 'lesson'; render(); }
  if (action === 'go-back-subject') { state.page = 'subjects'; render(); }
  if (action === 'start-quiz') { startQuiz(btn.dataset.mode); }
  if (action === 'quit-quiz') { state.quiz = null; state.page = 'lesson'; render(); }
  if (action === 'check-q') {
    if (state.quiz.selected === null) return toast('اختر إجابة أولاً');
    state.quiz.checked = true;
    state.quiz.answers[state.quiz.idx] = state.quiz.selected;
    renderQuiz();
  }
  if (action === 'next-q') {
    if (state.quiz.idx < state.quiz.qs.length - 1) {
      state.quiz.idx++; state.quiz.selected = null; state.quiz.checked = false;
      renderQuiz();
    } else {
      finishQuiz();
    }
  }
  if (action === 'subpage') { state.subPage = btn.dataset.sub; state.page = 'subpage'; state.drawerOpen = false; render(); }
  if (action === 'close-subpage') { state.page = 'home'; render(); }
  if (action === 'logout') { store.session = null; save(); state.page = 'home'; state.drawerOpen = false; render(); }
});

/* ================== Init ================== */
render();
