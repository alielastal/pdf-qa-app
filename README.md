![Project Logo](./pdf-qa-app.png)
# PDF Q&A App

تطبيق ويب تفاعلي يتيح لك رفع ملفات PDF والتفاعل معها من خلال طرح الأسئلة باستخدام Google Gemini AI.

## المميزات

- رفع ملفات PDF (حتى 5 ميجابايت)
- استخراج النص من ملفات PDF تلقائياً
- محادثة تفاعلية مع الذكاء الاصطناعي حول محتوى المستند
- واجهة مستخدم عصرية وسهلة الاستخدام
- دعم اللغة العربية مع اكتشاف تلقائي لاتجاه النص (RTL/LTR)
- عرض وتحليل محتوى PDF المستخرج
- تصدير النص المستخرج بصيغ متعددة (TXT, JSON, Markdown)

## التقنيات المستخدمة

- **React** - مكتبة لبناء واجهة المستخدم
- **TypeScript** - للحصول على كود آمن ومنظم
- **Vite** - أداة بناء سريعة وحديثة
- **Tailwind CSS** - للتنسيق والتصميم
- **Google Gemini AI** - للذكاء الاصطناعي والمحادثة
- **PDF.js** - لاستخراج النص من ملفات PDF

## المتطلبات

- Node.js (v18 أو أحدث)
- npm أو yarn
- مفتاح API من Google Gemini

## التثبيت

1. استنساخ المشروع:
```bash
git clone <repository-url>
cd pdf-qa-app
```

2. تثبيت المكتبات:
```bash
npm install
```

3. إنشاء ملف `.env` وإضافة مفتاح API الخاص بك:
```bash
cp .env.example .env
```

4. افتح ملف `.env` وأضف مفتاح Gemini API الخاص بك:
```
VITE_API_KEY=your_gemini_api_key_here
```

## الحصول على مفتاح API

1. زيارة [Google AI Studio](https://makersuite.google.com/app/apikey)
2. تسجيل الدخول بحساب Google
3. إنشاء مفتاح API جديد
4. نسخ المفتاح ووضعه في ملف `.env`

## التشغيل

### وضع التطوير
```bash
npm run dev
```
ثم افتح المتصفح على `http://localhost:5173`

### بناء للإنتاج
```bash
npm run build
```

### معاينة البناء
```bash
npm run preview
```

## الاستخدام

1. قم بتشغيل التطبيق
2. اضغط على منطقة الرفع أو اسحب ملف PDF
3. انتظر حتى يتم معالجة الملف
4. ابدأ بطرح الأسئلة حول محتوى المستند
5. يمكنك عرض النص المستخرج أو تصديره بالضغط على "عرض التحليل"

## البنية

```
pdf-qa-app/
├── src/
│   ├── components/       # مكونات React
│   │   ├── icons/       # مكونات الأيقونات SVG
│   │   ├── AnalysisModal.tsx
│   │   ├── ChatInterface.tsx
│   │   ├── FileUpload.tsx
│   │   └── Loader.tsx
│   ├── services/        # خدمات API
│   │   └── geminiService.ts
│   ├── utils/           # وظائف مساعدة
│   │   └── pdfParser.ts
│   ├── App.tsx          # المكون الرئيسي
│   ├── index.tsx        # نقطة الدخول
│   ├── types.ts         # تعريفات TypeScript
│   └── vite-env.d.ts    # تعريفات بيئة Vite
├── .env.example         # مثال لملف البيئة
├── .gitignore
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── tailwind.config.js
```

## الأمان

- لا تشارك مفتاح API الخاص بك علناً
- ملف `.env` مستبعد من Git تلقائياً
- استخدم متغيرات البيئة للإنتاج في منصة الاستضافة

## الترخيص

MIT License

## المساهمة

المساهمات مرحب بها! يرجى فتح Issue أو Pull Request.

## الدعم

إذا واجهت أي مشاكل، يرجى فتح Issue في المستودع.

