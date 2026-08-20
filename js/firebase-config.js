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
    appId: "1:136326409403:web:5a59cda7bc6ee4b8534d9e"
};


/*
 * ============================================================
 * لا حاجة لتعديل ما بعد هذا السطر
 * ============================================================
 *
 * Firebase Authentication يتطلب "بريدًا إلكترونيًا"، فحتى لا
 * يضطر أعضاء فريقك لاستخدام بريد حقيقي، نقبل هنا حالتين:
 *
 *  1) إذا كتب الشخص بريدًا إلكترونيًا حقيقيًا (فيه علامة @)
 *     نستخدمه كما هو مباشرة.
 *
 *  2) إذا كتب اسم مستخدم بسيط بدون @ (مثل "سعود")، نحوّله
 *     تلقائيًا إلى بريد وهمي بإضافة نطاق ثابت في نهايته:
 *     "سعود" تصبح داخليًا "سعود@donor-system.app"
 *
 * يعني: عند إنشاء مستخدم في Firebase Console، تقدر تستخدم
 * بريده الحقيقي مباشرة، أو تختار اسمًا وتضيف له بنفسك
 * "@donor-system.app" — كلا الطريقتين تعمل عند تسجيل الدخول.
 */

const USERNAME_DOMAIN = "@donor-system.app";


firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();

auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL);


function usernameToEmail(username) {

    const value =
        String(username || "")
            .trim()
            .toLowerCase()
            .replace(/\s+/g, "");


    if (value.includes("@")) {

        return value;

    }


    return value + USERNAME_DOMAIN;

}


function emailToUsername(email) {

    return String(email || "").split("@")[0];

}
