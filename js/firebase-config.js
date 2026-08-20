/*
 * ============================================================
 * إعدادات Firebase
 * ============================================================
 *
 * ضع هنا بيانات مشروعك في Firebase (تحصل عليها من صفحة إعدادات
 * المشروع في Firebase Console بعد إنشاء تطبيق ويب جديد).
 * راجع خطوات الإعداد المرسلة لك للحصول عليها خطوة بخطوة.
 */

const firebaseConfig = {
  apiKey: "AIzaSyABG_HXtoLGSY48YqBv5AzdlEmfDWbSWfs",
  authDomain: "systemsahem.firebaseapp.com",
  projectId: "systemsahem",
  storageBucket: "systemsahem.firebasestorage.app",
  messagingSenderId: "136326409403",
  appId: "1:136326409403:web:5a59cda7bc6ee4b8534d9e",
  measurementId: "G-23MJP8K0RH",
};

/*
 * ============================================================
 * لا حاجة لتعديل ما بعد هذا السطر
 * ============================================================
 *
 * Firebase Authentication يتطلب "بريدًا إلكترونيًا" وليس مجرد
 * اسم مستخدم، فحتى لا يضطر أعضاء فريقك لاستخدام بريد حقيقي،
 * نحوّل اسم المستخدم تلقائيًا إلى بريد وهمي عبر إضافة نطاق
 * ثابت في نهايته (لا يحتاج أن يكون بريدًا حقيقيًا أو فعّالًا).
 *
 * مثال: اسم المستخدم "سعود" يصبح داخليًا "سعود@donor-system.app"
 *
 * هذا يعني أن اسم المستخدم الذي تنشئه في Firebase Console يجب
 * أن يكون بهذه الصيغة بالضبط: <اسم_المستخدم>@donor-system.app
 */

const USERNAME_DOMAIN = "@donor-system.app";

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();

auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL);

function usernameToEmail(username) {
  return (
    String(username || "")
      .trim()
      .toLowerCase()
      .replace(/\s+/g, "") + USERNAME_DOMAIN
  );
}

function emailToUsername(email) {
  return String(email || "").split("@")[0];
}
