/*
 * ============================================================
 * منطق صفحة تسجيل الدخول
 * ============================================================
 */

// إن كان المستخدم مسجّلاً دخوله بالفعل، نحوّله مباشرة للنظام
// بدل إظهار شاشة الدخول من جديد.

auth.onAuthStateChanged(function (user) {

    if (user) {

        window.location.href = "index.html";

    }

});


const loginForm =
    document.getElementById("loginForm");

const usernameInput =
    document.getElementById("username");

const passwordInput =
    document.getElementById("password");

const loginError =
    document.getElementById("loginError");

const loginBtn =
    document.getElementById("loginBtn");


function loginErrorMessage(code) {

    switch (code) {

        case "auth/invalid-email":
        case "auth/user-not-found":
        case "auth/wrong-password":
        case "auth/invalid-credential":
            return "اسم المستخدم أو كلمة المرور غير صحيحة.";

        case "auth/user-disabled":
            return "تم إيقاف هذا الحساب. تواصل مع مسؤول النظام.";

        case "auth/too-many-requests":
            return "محاولات كثيرة متتالية، حاول مرة أخرى بعد قليل.";

        case "auth/network-request-failed":
            return "تعذّر الاتصال بالخادم، تحقق من اتصالك بالإنترنت.";

        default:
            return "حدث خطأ أثناء تسجيل الدخول، حاول مرة أخرى.";

    }

}


loginForm.addEventListener("submit", function (event) {

    event.preventDefault();

    loginError.textContent = "";

    const email =
        usernameToEmail(usernameInput.value);

    const password =
        passwordInput.value;

    loginBtn.disabled = true;
    loginBtn.textContent = "جارٍ الدخول...";

    auth.signInWithEmailAndPassword(email, password)
        .then(function () {

            window.location.href = "index.html";

        })
        .catch(function (error) {

            loginBtn.disabled = false;
            loginBtn.textContent = "دخول";

            loginError.textContent =
                loginErrorMessage(error.code);

        });

});
