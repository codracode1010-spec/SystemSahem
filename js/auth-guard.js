/*
 * ============================================================
 * حماية الصفحة الرئيسية
 * ============================================================
 *
 * يتحقق هذا الملف من وجود جلسة دخول صالحة قبل عرض النظام.
 * إن لم يكن هناك تسجيل دخول، يتم تحويل المستخدم فورًا إلى
 * صفحة الدخول. أثناء التحقق تظهر شاشة انتظار بسيطة حتى لا
 * تظهر بيانات النظام قبل التأكد من صلاحية الدخول.
 */

auth.onAuthStateChanged(function (user) {

    if (!user) {

        window.location.href = "login.html";

        return;

    }


    const gate =
        document.getElementById("authGate");

    if (gate) {

        gate.remove();

    }


    const chip =
        document.getElementById("currentUserChip");

    if (chip) {

        chip.textContent =
            "مرحبًا، " + emailToUsername(user.email);

    }

});


const logoutBtn =
    document.getElementById("logoutBtn");

if (logoutBtn) {

    logoutBtn.addEventListener("click", function () {

        auth.signOut().then(function () {

            window.location.href = "login.html";

        });

    });

}
