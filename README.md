# blackboxai-1743954878163
Built by https://www.blackbox.ai

Here are the steps to install the furniture store application on cPanel:

Compress the Project Files:

Zip the entire al-mutamayiz-furniture directory including all subfolders
Upload to cPanel:

Log in to your cPanel account
Go to "File Manager"
Navigate to your public_html directory (or desired installation directory)
Click "Upload" and select the zip file
After upload, right-click the zip file and select "Extract"
Set Up Database:

In cPanel, go to "MySQL Databases"
Create a new database and user
Assign the user to the database with all privileges
Update the database credentials in .env file:
DB_HOST=localhost
DB_NAME=your_database_name
DB_USER=your_database_user
DB_PASS=your_database_password
Run Migrations:

SSH into your account (or use cPanel's Terminal)
Navigate to the project directory
Run: npx sequelize-cli db:migrate
Configure Node.js App (if using cPanel's Node.js selector):

In cPanel, go to "Setup Node.js App"
Create a new application
Set the application root to your project directory
Set the application URL
Set the entry point to server.js
Click "Setup" then "Run NPM Install"
Configure .htaccess (if needed):

RewriteEngine On
RewriteRule ^(.*)$ http://localhost:3000/$1 [P,L]
Start the Application:

In Node.js App manager, click "Run NPM Start"
Or via SSH: node server.js
The application should now be accessible at your domain. You may need to configure any additional settings specific to your hosting environment.

إليك خطوات تثبيت تطبيق متجر الأثاث على لوحة تحكم cPanel:

ضغط ملفات المشروع:

ضغط مجلد al-mutamayiz-furniture بالكامل، بما في ذلك جميع المجلدات الفرعية.

التحميل إلى لوحة تحكم cPanel:

تسجيل الدخول إلى حساب cPanel الخاص بك.

انتقل إلى "مدير الملفات".

انتقل إلى مجلد public_html (أو مجلد التثبيت المطلوب).

انقر على "تحميل" وحدد ملف zip.

بعد التحميل، انقر بزر الماوس الأيمن على ملف zip، ثم اختر "استخراج".

إعداد قاعدة البيانات:

في لوحة تحكم cPanel، انتقل إلى "قواعد بيانات MySQL".

أنشئ قاعدة بيانات ومستخدمًا جديدًا.

عيّن المستخدم لقاعدة البيانات مع جميع الصلاحيات.

حدّث بيانات اعتماد قاعدة البيانات في ملف .env:

DB_HOST=localhost

DB_NAME=your_database_name

DB_USER=your_database_user

DB_PASS=your_database_password

تشغيل عمليات الترحيل:

استخدم SSH للوصول إلى حسابك (أو استخدم (طرفية cPanel)
انتقل إلى مجلد المشروع
شغّل: npx sequelize-cli db:migrate
تهيئة تطبيق Node.js (في حال استخدام مُحدِّد Node.js في cPanel):

في cPanel، انتقل إلى "إعداد تطبيق Node.js".
أنشئ تطبيقًا جديدًا.
عيّن جذر التطبيق إلى مجلد مشروعك.
عيّن عنوان URL للتطبيق.
عيّن نقطة الدخول إلى server.js.
انقر على "إعداد" ثم "تشغيل تثبيت NPM".
هيئ ملف .htaccess (إذا لزم الأمر):

تشغيل RewriteEngine

Here's how to configure email settings for your furniture store application in cPanel:

SMTP Configuration in .env file:
Add these settings to your .env file:

EMAIL_HOST=mail.yourdomain.com
EMAIL_PORT=465
EMAIL_USER=your_email@yourdomain.com
EMAIL_PASS=your_email_password
EMAIL_FROM=no-reply@yourdomain.com
EMAIL_SECURE=true
cPanel Email Setup:

Log in to cPanel
Go to "Email Accounts"
Create a new email account (e.g., no-reply@yourdomain.com)
Note the credentials for your application
Configure Email Routing:

In cPanel, go to "Email Routing"
Select "Remote Mail Exchanger" if using third-party email service
Or keep as "Local Mail Exchanger" for cPanel email
SPF/DKIM Records (Recommended):

In cPanel, go to "Email Deliverability"
Fix any issues reported
Set up SPF and DKIM authentication
Node.js Email Configuration:
Update your email service configuration in config/email.js (create if doesn't exist):

module.exports = {
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: process.env.EMAIL_SECURE === 'true',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  },
  tls: {
    rejectUnauthorized: false
  }
};
Test Email Functionality:

Send a test email from your application
Check cPanel's "Email Deliverability" for issues
Review "Email Disk Usage" to monitor your email account
For transactional emails (order confirmations, etc.), consider using:

cPanel's "Email Marketing" features
Third-party services like Mailgun or SendGrid

إليك كيفية ضبط إعدادات البريد الإلكتروني لتطبيق متجر الأثاث الخاص بك في لوحة تحكم cPanel:

ضبط SMTP في ملف .env:
أضف هذه الإعدادات إلى ملف .env:

EMAIL_HOST=mail.yourdomain.com
EMAIL_PORT=465
EMAIL_USER=your_email@yourdomain.com
EMAIL_PASS=your_email_password
EMAIL_FROM=no-reply@yourdomain.com
EMAIL_SECURE=true
إعداد البريد الإلكتروني في لوحة تحكم cPanel:

تسجيل الدخول إلى لوحة تحكم cPanel
انتقل إلى "حسابات البريد الإلكتروني"
أنشئ حساب بريد إلكتروني جديد (مثل: no-reply@yourdomain.com)
دوّن بيانات اعتماد تطبيقك
ضبط توجيه البريد الإلكتروني:

في لوحة تحكم cPanel، انتقل إلى "توجيه البريد الإلكتروني"
اختر "مُبادِل البريد عن بُعد" إذا كنت تستخدم خدمة بريد إلكتروني خارجية
أو احتفظ به كـ "بريد محلي" "مُبادِل" لبريد cPanel الإلكتروني
سجلات SPF/DKIM (مُوصى به):

في cPanel، انتقل إلى "قابلية تسليم البريد الإلكتروني".

أصلح أي مشاكل تم الإبلاغ عنها.

إعداد مصادقة SPF وDKIM.

تكوين بريد Node.js الإلكتروني:

حدِّث تكوين خدمة البريد الإلكتروني في config/email.js (أنشئه إذا لم يكن موجودًا):

module.exports = {
host: process.env.EMAIL_HOST,
port: process.env.EMAIL_PORT,
secure: process.env.EMAIL_SECURE === 'true',
auth: {
user: process.env.EMAIL_USER,
pass: process.env.EMAIL_PASS
},
tls: {
rejectUnauthorized: false
}
};
اختبار وظيفة البريد الإلكتروني:

أرسل بريدًا إلكترونيًا تجريبيًا من تطبيقك

تحقق من "إمكانية تسليم البريد الإلكتروني" في لوحة تحكم cPanel بحثًا عن أي مشاكل

راجع "استخدام قرص البريد الإلكتروني" لمراقبة حساب بريدك الإلكتروني

للرسائل الإلكترونية المتعلقة بالمعاملات (تأكيدات الطلبات، إلخ)، استخدم:

ميزات "التسويق عبر البريد الإلكتروني" في لوحة تحكم cPanel

خدمات خارجية مثل Mailgun أو SendGrid




RewriteRule ^(.*)$ http://localhost:3000/$1 [P,L]
شغّل التطبيق:

في مدير تطبيقات Node.js، انقر على "تشغيل بدء تشغيل NPM".
أو عبر SSH: node server.js.
يجب أن يكون التطبيق الآن متاحًا على نطاقك. قد تحتاج إلى تهيئة أي إعدادات إضافية خاصة ببيئة الاستضافة الخاصة بك.
