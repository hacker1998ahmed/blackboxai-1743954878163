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
RewriteRule ^(.*)$ http://localhost:3000/$1 [P,L]
شغّل التطبيق:

في مدير تطبيقات Node.js، انقر على "تشغيل بدء تشغيل NPM".
أو عبر SSH: node server.js.
يجب أن يكون التطبيق الآن متاحًا على نطاقك. قد تحتاج إلى تهيئة أي إعدادات إضافية خاصة ببيئة الاستضافة الخاصة بك.
