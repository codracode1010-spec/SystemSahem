// ============================================================
// نظام ساهم الخيري
// محول رسائل المتبرعين من واتساب إلى جدول منظم
// ============================================================


// ============================================================
// عناصر الصفحة
// ============================================================

const messagesInput = document.getElementById("messagesInput");
const analyzeBtn = document.getElementById("analyzeBtn");
const clearBtn = document.getElementById("clearBtn");

const resultsSection = document.getElementById("resultsSection");
const statistics = document.getElementById("statistics");
const resultsBody = document.getElementById("resultsBody");

const totalCount = document.getElementById("totalCount");
const completeCount = document.getElementById("completeCount");
const reviewCount = document.getElementById("reviewCount");

const addRowBtn = document.getElementById("addRowBtn");
const printBtn = document.getElementById("printBtn");
const exportExcelBtn = document.getElementById("exportExcelBtn");
const copyOutput = document.getElementById("copyOutput");
const copyDataBtn = document.getElementById("copyDataBtn");
const copyFeedback = document.getElementById("copyFeedback");


// ============================================================
// البيانات
// ============================================================

let donors = [];


// ============================================================
// كلمات الحقول
// ============================================================

const FIELD_KEYWORDS = {

    name: [
        "اسم المتبرع",
        "الاسم",
        "اسم"
    ],

    phone: [
        "رقم الجوال",
        "رقم الهاتف",
        "الجوال",
        "الهاتف",
        "رقمي",
        "رقم التواصل",
        "جوال",
        "واتساب"
    ],

    neighborhood: [
        "الحي",
        "حي",
        "المنطقة",
        "الموقع",
        "موقع",
        "مكان السكن",
        "السكن",
        "ساكن في",
        "ساكن بحي",
        "موجود في"
    ],

    donationType: [
        "نوع التبرع",
        "نوع التبرعات",
        "التبرع",
        "التبرعات",
        "الأغراض",
        "الاغراض",
        "المحتويات",
        "المواد",
        "تبرعي"
    ],

    day: [
        "حدد اليوم المناسب لكم",
        "حدد اليوم المناسب",
        "اليوم المناسب لكم",
        "اليوم المناسب",
        "حدد اليوم",
        "الموعد المناسب",
        "موعد الاستلام",
        "الموعد",
        "اليوم",
        "يوم"
    ]

};


// ============================================================
// أنواع التبرعات المحتملة
// ============================================================

const DONATION_TYPES = [

    "ملابس",
    "ملابس رجالية",
    "ملابس نسائية",
    "ملابس أطفال",
    "ملابس اطفال",

    "أحذية",
    "احذية",

    "شنط",
    "حقائب",

    "بطانيات",
    "بطانيه",
    "حافات",

    "ألعاب",
    "العاب",

    "كتب",

    "ورق",

    "أواني",
    "اواني",

    "أجهزة كهربائية",
    "اجهزة كهربائية",
    "أجهزة",
    "اجهزة",

    "سجاد",

    "اسفنج",
    "إسفنج",

    "مطابخ",

    "مكيفات",

    "أثاث",
    "اثاث",

    "أثاث منزلي",
    "اثاث منزلي"

];


// ============================================================
// أيام الأسبوع
// ============================================================

const DAYS = [

    "السبت",

    "الأحد",
    "الاحد",

    "الإثنين",
    "الاثنين",

    "الثلاثاء",

    "الأربعاء",
    "الاربعاء",

    "الخميس",

    "الجمعة"

];


// ============================================================
// أحياء مدينة الرياض
// تُستخدم للتعرف التلقائي على الحي حتى لو أُرسل اسمه
// بدون كلمة "حي" وبدون أي تسمية للحقل، مثل رسالة تحتوي
// على سطرين فقط: رقم الجوال، ثم اسم الحي.
// (يمكن إضافة أي حي غير موجود بسهولة في هذه القائمة)
// ============================================================

const RIYADH_NEIGHBORHOODS = [

    // شمال الرياض
    "الملقا", "الصحافة", "النخيل", "الياسمين", "النرجس",
    "حطين", "العارض", "الغدير", "النفل", "الرحمانية",
    "الوادي", "القيروان", "الازدهار", "الفلاح", "العقيق",
    "النزهة", "المهدية", "الواحة", "القادسية", "أشبيلية",
    "المروج", "الرائد", "الملك عبدالله", "بنبان",
    "الفرسان", "الخير", "المونسية", "الأندلس",

    // شمال شرق
    "الرمال", "القدس", "المصيف", "الروابي", "الريان",
    "الجزيرة", "الفيصلية",

    // شرق الرياض
    "النسيم الشرقي", "النسيم الغربي", "النسيم", "اليرموك",
    "الروضة", "الخليج", "السلام", "الربوة", "غرناطة",
    "الشهداء", "الصفا", "الرفيعة", "النظيم", "معكال",
    "عريض", "قرطبة", "المرسلات", "الملك فهد", "الورود",

    // وسط الرياض
    "الملز", "المربع", "الديرة", "الفوطة", "الشميسي",
    "الوزارات", "البطحاء", "الناصرية", "سلطانة", "الصالحية",
    "منفوحة", "عتيقة", "الفاخرية", "اليمامة", "جبرة",
    "الشرفية", "عليشة", "العليا", "السليمانية", "الرابية",
    "أم الحمام", "حي السفارات", "الرحاب",

    // جنوب الرياض
    "الشفا", "بدر", "المروة", "الفواز", "الحزم",
    "العزيزية", "الدار البيضاء", "السلي", "السعادة", "النور",
    "الفاروق", "غبيراء", "السويدي", "السويدي الغربي", "الزهرة",
    "طويق", "ديراب", "عكاظ", "الحائر", "السعدان",
    "منفوحة الجديدة", "الفيحاء", "الخالدية",

    // غرب الرياض
    "البديعة", "ظهرة البديعة", "جامعة الملك سعود", "شبرا",
    "عرفة", "لبن", "ظهرة لبن", "العريجاء", "غبيرة",
    "نمار", "اسكان", "عرقة"

];


// ============================================================
// توحيد الإملاء العربي قبل المطابقة
// ============================================================
//
// الفكرة: بدلاً من كتابة كل احتمال إملائي يدويًا لكل حي
// (عرقة/عرقه/عرقة... إلخ لمئة وخمسين حي)، نقوم بـ"تطبيع"
// النص المُدخل واسم الحي معًا إلى شكل موحّد قبل المقارنة،
// بحيث تُغطّى تلقائيًا كل الأخطاء الإملائية الشائعة:
//
//   - الهمزات (أ إ آ) وألف الوصل  ← تتحول جميعًا إلى "ا"
//   - التاء المربوطة والهاء       ← "ة" تتحول إلى "ه"
//   - الألف المقصورة              ← "ى" تتحول إلى "ي"
//   - التشكيل والتطويل            ← تُحذف بالكامل
//
// مثال: "عرقة" و"عرقه" و"عرقـة" كلها تصبح بعد التطبيع
// نفس السلسلة النصية، فتُطابق بعضها تلقائيًا.
// ============================================================

function normalizeArabicForMatch(text) {

    return String(text)

        .replace(/[أإآا]/g, "ا")

        .replace(/ة/g, "ه")

        .replace(/ى/g, "ي")

        .replace(/[\u064B-\u0652]/g, "") // التشكيل

        .replace(/ـ+/g, "") // التطويل

        .replace(/\s+/g, " ")

        .trim();

}


/*
 * قائمة الأحياء مُطبَّعة إملائيًا ومرتبة من الأطول إلى الأقصر
 * (حتى تُطابق "النسيم الشرقي" قبل "النسيم" مثلاً)، تُبنى مرة
 * واحدة فقط بدل إعادة حسابها في كل رسالة.
 */

const NORMALIZED_NEIGHBORHOODS =
    RIYADH_NEIGHBORHOODS
        .map(function (name) {

            return {
                original: name,
                normalized: normalizeArabicForMatch(name)
            };

        })
        .sort(function (a, b) {

            return b.normalized.length - a.normalized.length;

        });


/*
 * نبني نمط مطابقة يجعل "ال" التعريف اختياريًا في بداية
 * اسم الحي، حتى نلتقط كتابته بدونها (مثل "نرجس" بدل
 * "النرجس") وهو خطأ إملائي شائع جدًا.
 */

function buildNeighborhoodPattern(normalizedName) {

    let core = normalizedName;

    if (core.startsWith("ال")) {

        core =
            "(?:ال)?" +
            escapeRegex(core.slice(2));

    } else {

        core = escapeRegex(core);

    }


    return new RegExp(
        "(^|[\\s،,.؛:])" +
        core +
        "(?=$|[\\s،,.؛:])"
    );

}


// ============================================================
// تحليل الطلبات
// ============================================================

if (analyzeBtn) {

    analyzeBtn.addEventListener("click", function () {

        const text = messagesInput.value.trim();


        if (!text) {

            alert("يرجى لصق رسائل المتبرعين أولاً.");

            return;

        }


        donors = parseMessages(text);


        if (donors.length === 0) {

            alert(
                "لم يتمكن النظام من استخراج أي طلب.\n\n" +
                "تأكد من لصق ردود المتبرعين."
            );

            return;

        }


        renderTable();

        updateStatistics();


        if (statistics) {
            statistics.classList.remove("hidden");
        }


        if (resultsSection) {
            resultsSection.classList.remove("hidden");
        }

    });

}


// ============================================================
// Parser الرئيسي
// ============================================================

function parseMessages(text) {

    text = normalizeText(text);


    // إزالة نموذج الجمعية والنصوص الثابتة
    text = removeOrganizationTemplate(text);


    // تقسيم الرسائل
    const blocks = splitMessages(text);


    const results = [];


    blocks.forEach(function (block) {

        const donor = extractDonor(block);


        /*
         * نضيف الطلب إذا وجدنا أي معلومة مفيدة.
         */

        if (

            donor.name ||
            donor.phone ||
            donor.neighborhood ||
            donor.donationType ||
            donor.day

        ) {

            if (!donor.name) {

                donor.name = "فاعل خير";

            }

            results.push(donor);

        }

    });


    return results;

}


// ============================================================
// تنظيف النص
// ============================================================

function normalizeText(text) {

    return text

        .replace(/\r\n/g, "\n")

        .replace(/\r/g, "\n")

        .replace(/：/g, ":")

        .replace(/\u00A0/g, " ")

        .replace(/[٠-٩]/g, function (digit) {

            return "٠١٢٣٤٥٦٧٨٩".indexOf(digit);

        })

        .replace(/[ \t]+/g, " ")

        .replace(/\n{4,}/g, "\n\n")

        .trim();

}


// ============================================================
// إزالة نموذج الجمعية
// ============================================================

function removeOrganizationTemplate(text) {

    const lines = text.split("\n");

    const result = [];


    const ignoredPhrases = [

        "مشروع ساهم الخيري",

        "نستقبل من المستعمل",

        "لحجز موعدك",

        "نامل تعبئة",

        "نأمل تعبئة",

        "يبداً الدوام",

        "يبدأ الدوام",

        "الدوام من",

        "جمعية حله الاهليه",

        "جمعية حلة الاهلية",

        "جمعية حلة الأهلية",

        "ترخيص رقم",

        "للاستفسار",

        "شكراً لكم",

        "شكرا لكم",

        "تبرع بأمان"

    ];


    let skipAnnouncement = false;


    lines.forEach(function (originalLine) {

        const line = originalLine.trim();


        if (!line) {

            result.push("");

            return;

        }


        const isAnnouncement =
            ignoredPhrases.some(function (phrase) {

                return line.includes(phrase);

            });


        if (isAnnouncement) {

            skipAnnouncement = true;

            return;

        }


        /*
         * إذا كان السطر يحتوي على حقل بيانات
         * فلا نحذفه حتى لو كان بعد الإعلان.
         */

        if (

            startsWithAny(line, FIELD_KEYWORDS.name) ||

            startsWithAny(line, FIELD_KEYWORDS.phone) ||

            startsWithAny(line, FIELD_KEYWORDS.neighborhood) ||

            startsWithAny(line, FIELD_KEYWORDS.donationType) ||

            startsWithAny(line, FIELD_KEYWORDS.day)

        ) {

            skipAnnouncement = false;

            result.push(line);

            return;

        }


        /*
         * تجاهل النصوص الطويلة الخاصة بالإعلان.
         */

        if (skipAnnouncement) {

            return;

        }


        result.push(line);

    });


    return result.join("\n");

}


// ============================================================
// تقسيم الرسائل
// ============================================================

function splitMessages(text) {

    const lines = text
        .split("\n")
        .map(function (line) {

            return line.trim();

        });


    const blocks = [];

    let current = [];


    for (let i = 0; i < lines.length; i++) {

        const line = lines[i];


        /*
         * سطر فارغ = غالبًا بداية رسالة جديدة.
         */

        if (!line) {

            if (current.length > 0) {

                blocks.push(
                    current.join("\n")
                );

                current = [];

            }

            continue;

        }


        /*
         * إذا ظهر رقم جديد ولدينا رقم سابق،
         * فهذا مؤشر قوي على طلب جديد.
         */

        const linePhones =
            extractPhones(line);


        const currentPhones =
            extractPhones(
                current.join("\n")
            );


        if (

            linePhones.length > 0 &&

            current.length > 0 &&

            currentPhones.length > 0

        ) {

            blocks.push(
                current.join("\n")
            );

            current = [];

        }


        /*
         * إذا بدأ السطر بحقل "الاسم" ولدينا رقم جوال
         * تم استخراجه بالفعل في الطلب الحالي، فهذا يعني
         * أن رسالة جديدة بدأت حتى لو لم يوجد سطر فارغ
         * يفصل بينهما.
         */

        if (

            startsWithAny(line, FIELD_KEYWORDS.name) &&

            current.length > 0 &&

            currentPhones.length > 0

        ) {

            blocks.push(
                current.join("\n")
            );

            current = [];

        }


        current.push(line);

    }


    if (current.length > 0) {

        blocks.push(
            current.join("\n")
        );

    }


    return improveBlocks(blocks);

}


// ============================================================
// تحسين تقسيم الطلبات
// ============================================================

function improveBlocks(blocks) {

    const finalBlocks = [];


    blocks.forEach(function (block) {

        const phones =
            extractPhones(block);


        /*
         * طلب يحتوي على رقم واحد فقط.
         */

        if (phones.length <= 1) {

            finalBlocks.push(block);

            return;

        }


        /*
         * إذا احتوت الكتلة على أكثر من رقم،
         * نحاول تقسيمها.
         */

        const lines =
            block.split("\n");


        let current = [];


        lines.forEach(function (line) {

            const linePhones =
                extractPhones(line);


            if (

                linePhones.length > 0 &&

                current.length > 0

            ) {

                finalBlocks.push(
                    current.join("\n")
                );

                current = [];

            }


            current.push(line);

        });


        if (current.length > 0) {

            finalBlocks.push(
                current.join("\n")
            );

        }

    });


    return finalBlocks;

}


// ============================================================
// استخراج بيانات المتبرع
// ============================================================

function extractDonor(block) {

    const donor = {

        name: "",

        phone: "",

        neighborhood: "",

        donationType: "",

        day: "",

        status: "review"

    };


    // ========================================================
    // الاسم
    // ========================================================

    donor.name = extractNamedField(
        block,
        [
            "اسم المتبرع",
            "الاسم",
            "اسم"
        ]
    );


    /*
     * إذا لم يوجد اسم في حقل واضح،
     * نبحث في الجمل مثل:
     *
     * اسمي محمد أحمد
     * أنا محمد أحمد
     */

    if (!donor.name) {

        donor.name =
            extractNameFromSentence(block);

    }


    // ========================================================
    // رقم الجوال
    // ========================================================

    donor.phone =
        extractPhoneFromText(block);


    // ========================================================
    // الحي
    // ========================================================

    donor.neighborhood =
        extractNamedField(
            block,
            FIELD_KEYWORDS.neighborhood
        );


    /*
     * إذا لم نجد الحي بالحقل،
     * نبحث داخل الجمل.
     */

    if (!donor.neighborhood) {

        donor.neighborhood =
            extractNeighborhoodFromSentence(block);

    }


    /*
     * إذا لم نجد الحي في الحقل ولا في الجملة،
     * نبحث عن أي اسم حي معروف من قائمة أحياء الرياض
     * حتى لو ورد بدون كلمة "حي" وبدون أي تسمية.
     */

    if (!donor.neighborhood) {

        donor.neighborhood =
            detectNeighborhoodFromList(block);

    }


    // ========================================================
    // نوع التبرع
    // ========================================================

    donor.donationType =
        extractNamedField(
            block,
            FIELD_KEYWORDS.donationType
        );


    /*
     * إذا لم نجد حقلًا واضحًا،
     * نبحث عن أنواع التبرعات المعروفة.
     */

    if (!donor.donationType) {

        donor.donationType =
            detectDonationType(block);

    }


    // ========================================================
    // اليوم
    // ========================================================

    donor.day =
        extractNamedField(
            block,
            FIELD_KEYWORDS.day
        );


    /*
     * إذا لم نجد اليوم في حقل،
     * نبحث عن اسم اليوم داخل النص.
     */

    if (!donor.day) {

        donor.day =
            detectDay(block);

    }


    // ========================================================
    // تنظيف
    // ========================================================

    donor.name =
        cleanName(donor.name);


    donor.phone =
        normalizePhone(donor.phone);


    donor.neighborhood =
        cleanNeighborhood(
            donor.neighborhood
        );


    donor.donationType =
        cleanDonation(
            donor.donationType
        );


    /*
     * إذا لم نتمكن من تحديد نوع التبرع إطلاقًا،
     * نكتب "أغراض" كقيمة افتراضية بدل ترك الحقل فارغًا.
     */

    if (!donor.donationType) {

        donor.donationType = "أغراض";

    }


    donor.day =
        cleanDay(donor.day);


    // ========================================================
    // تحديد الحالة
    // ========================================================

    if (

        donor.phone &&

        donor.neighborhood &&

        donor.donationType

    ) {

        donor.status = "complete";

    } else {

        donor.status = "review";

    }


    return donor;

}


// ============================================================
// استخراج الحقول
// ============================================================

function extractNamedField(text, keywords) {

    const lines =
        text.split("\n");


    for (const line of lines) {

        const cleanLine =
            line.trim();


        if (!cleanLine) {
            continue;
        }


        for (const keyword of keywords) {


            // ==================================================
            // حالة:
            // الاسم: محمد
            // الحي: الشفا
            // ==================================================

            const regex =
                new RegExp(
                    "^" +
                    escapeRegex(keyword) +
                    "\\s*[:：-]\\s*(.*)$",
                    "i"
                );


            const match =
                cleanLine.match(regex);


            if (match) {

                const value =
                    match[1].trim();


                /*
                 * الحقل فارغ
                 */

                if (!value) {
                    continue;
                }


                /*
                 * منع قراءة عناوين الحقول كبيانات.
                 */

                if (
                    isFieldTitle(value)
                ) {

                    continue;

                }


                return value;

            }


            // ==================================================
            // حالة:
            // الحي الشفا
            // الجوال 0501234567
            // ==================================================

            const regexWithoutColon =
                new RegExp(
                    "^" +
                    escapeRegex(keyword) +
                    "\\s+(.+)$",
                    "i"
                );


            const matchWithoutColon =
                cleanLine.match(
                    regexWithoutColon
                );


            if (matchWithoutColon) {

                const value =
                    matchWithoutColon[1].trim();


                if (
                    value &&
                    !isFieldTitle(value)
                ) {

                    return value;

                }

            }

        }

    }


    return "";

}


// ============================================================
// التحقق من عنوان حقل
// ============================================================

function isFieldTitle(value) {

    const titles = [

        "اسم",

        "الاسم",

        "اسم المتبرع",

        "رقم",

        "رقم الجوال",

        "الجوال",

        "رقم الهاتف",

        "الهاتف",

        "الحي",

        "نوع التبرع",

        "التبرع",

        "اليوم",

        "اليوم المناسب"

    ];


    return titles.includes(
        value.trim()
    );

}


// ============================================================
// استخراج رقم الجوال من النص
// ============================================================

function extractPhoneFromText(text) {

    const phones =
        extractPhones(text);


    if (phones.length === 0) {

        return "";

    }


    return phones[0];

}


// ============================================================
// استخراج جميع أرقام الجوال
// ============================================================

function extractPhones(text) {

    if (!text) {

        return [];

    }


    /*
     * يدعم:
     *
     * 0501234567
     * 0551234567
     *
     * 050-123-4567
     * 050 123 4567
     *
     * +966501234567
     * 966501234567
     * +966 50 123 4567
     */


    const matches =
        text.match(
            /(?:\+?966[\s-]?)?5(?:[\s-]?\d){8}/g
        );


    if (!matches) {

        return [];

    }


    const numbers = [];


    matches.forEach(function (value) {

        const normalized =
            normalizePhone(value);


        if (

            normalized &&

            !numbers.includes(normalized)

        ) {

            numbers.push(normalized);

        }

    });


    return numbers;

}


// ============================================================
// توحيد رقم الجوال السعودي
// ============================================================

function normalizePhone(phone) {

    if (!phone) {

        return "";

    }


    let number =
        String(phone)
            .replace(/[٠-٩]/g, function (digit) {

                return "٠١٢٣٤٥٦٧٨٩".indexOf(digit);

            })
            .replace(/\D/g, "");


    /*
     * 966501234567
     * ↓
     * 501234567
     */

    if (
        number.startsWith("966")
    ) {

        number =
            number.substring(3);

    }


    /*
     * 501234567
     * ↓
     * 0501234567
     */

    if (

        number.startsWith("5") &&

        number.length === 9

    ) {

        number =
            "0" + number;

    }


    /*
     * التحقق من الرقم السعودي.
     */

    if (

        number.startsWith("05") &&

        number.length === 10

    ) {

        return number;

    }


    return "";

}


// ============================================================
// استخراج الحي من الجمل
// ============================================================

function extractNeighborhoodFromSentence(text) {

    const patterns = [

        /(?:الحي|حي)\s*[:\-]?\s*([^\n،,.]+)/i,

        /في\s+(?:حي\s+)?([^\n،,.]+)/i,

        /ساكن\s+(?:في|بـ|ب)\s+(?:حي\s+)?([^\n،,.]+)/i,

        /موجود\s+(?:في|بـ|ب)\s+(?:حي\s+)?([^\n،,.]+)/i,

        /منطقة\s*[:\-]?\s*([^\n،,.]+)/i

    ];


    for (const pattern of patterns) {

        const match =
            text.match(pattern);


        if (!match) {
            continue;
        }


        let neighborhood =
            match[1].trim();


        neighborhood =
            neighborhood.replace(
                /\s+و?(?:ورقمي|رقمي|رقم الجوال|الجوال|نوع التبرع|التبرع|عندي|مناسب|اليوم).*$/i,
                ""
            );


        neighborhood =
            neighborhood.trim();


        if (neighborhood) {

            return neighborhood;

        }

    }


    return "";

}


// ============================================================
// اكتشاف نوع التبرع
// ============================================================

function detectDonationType(text) {

    const found = [];


    DONATION_TYPES.forEach(function (type) {

        const pattern = new RegExp(
            "(^|[\\s،,.؛:]|و)" +
            escapeRegex(type) +
            "(?=$|[\\s،,.؛:])"
        );


        if (pattern.test(text)) {

            if (!found.includes(type)) {

                found.push(type);

            }

        }

    });


    return found.join("، ");

}


// ============================================================
// اكتشاف الحي من قائمة أحياء الرياض
// (يُستخدم عندما لا توجد أي كلمة "حي" أو تسمية للحقل،
// مثل رسالة تحتوي على اسم الحي مباشرة في سطر مستقل)
// ============================================================

function detectNeighborhoodFromList(text) {

    /*
     * نطبّع نص الرسالة إملائيًا بنفس طريقة تطبيع أسماء
     * الأحياء، حتى تُطابق الأخطاء الإملائية الشائعة تلقائيًا
     * (مثل "عرقه" بدل "عرقة"، أو "نرجس" بدل "النرجس").
     */

    const normalizedText =
        normalizeArabicForMatch(text);


    for (const item of NORMALIZED_NEIGHBORHOODS) {

        const pattern =
            buildNeighborhoodPattern(item.normalized);


        if (pattern.test(normalizedText)) {

            // نُعيد الاسم الرسمي الموحّد من القائمة، بغض
            // النظر عن الطريقة التي كتبه بها المستخدم.
            return item.original;

        }

    }


    return "";

}


// ============================================================
// استخراج اليوم
// ============================================================

function detectDay(text) {

    for (const day of DAYS) {

        if (text.includes(day)) {

            return day;

        }

    }


    return "";

}


// ============================================================
// استخراج الاسم من الجملة
// ============================================================

function extractNameFromSentence(text) {

    const patterns = [

        /*
         * اسمي محمد أحمد ورقمي 050...
         */

        /(?:اسمي)\s+([^,\n.،؛:]+?)(?=\s+(?:ورقمي|رقمي|رقم الجوال|الجوال|هاتف|من|في|حي|عندي)|$)/i,


        /*
         * أنا محمد أحمد ورقمي...
         */

        /(?:أنا|انا)\s+([^,\n.،؛:]+?)(?=\s+(?:ورقمي|رقمي|رقم الجوال|الجوال|هاتف|من|في|حي|ساكن|عندي)|$)/i,


        /*
         * معك محمد أحمد...
         */

        /(?:معك)\s+([^,\n.،؛:]+?)(?=\s+(?:ورقمي|رقمي|رقم الجوال|الجوال|هاتف|من|في|حي|ساكن|عندي)|$)/i

    ];


    for (const pattern of patterns) {

        const match =
            text.match(pattern);


        if (!match) {
            continue;
        }


        let name =
            match[1].trim();


        /*
         * إزالة أي شيء بعد كلمات لا تنتمي للاسم.
         */

        name =
            name.replace(
                /\s+و?(ورقمي|رقمي|رقم الجوال|الجوال|في حي|حي|عندي|من).*$/i,
                ""
            );


        name =
            name.trim();


        if (

            name &&

            !/^\d+$/.test(name)

        ) {

            return name;

        }

    }


    return "";

}


// ============================================================
// تنظيف الاسم
// ============================================================

function cleanName(name) {

    if (!name) {

        return "";

    }


    name =
        String(name).trim();


    /*
     * إذا دخل رقم داخل الاسم،
     * نزيل الجزء الرقمي.
     */

    name =
        name.replace(
            /\s*(?:ورقمي|رقمي|رقم الجوال|الجوال)\s*[:\-]?\s*\+?966?\s*[\d\s-]+.*$/i,
            ""
        );


    /*
     * إزالة الأرقام من نهاية الاسم.
     */

    name =
        name.replace(
            /\s+\d[\d\s-]*$/,
            ""
        );


    return name.trim();

}


// ============================================================
// تنظيف الحي
// ============================================================

function cleanNeighborhood(value) {

    if (!value) {

        return "";

    }


    value =
        String(value).trim();


    value =
        value.replace(
            /\s+و?(?:ورقمي|رقمي|رقم الجوال|الجوال|نوع التبرع|التبرع|عندي|مناسب|اليوم).*$/i,
            ""
        );


    value = value.replace(
        /^(?:الحي|حي)\s+/i,
        ""
    );


    return value.trim();

}


// ============================================================
// تنظيف نوع التبرع
// ============================================================

function cleanDonation(value) {

    if (!value) {

        return "";

    }


    return String(value)

        .replace(
            /^(?:عندي|تبرعي|التبرع)\s*[:\-]?\s*/i,
            ""
        )

        .trim();

}


// ============================================================
// تنظيف اليوم
// ============================================================

function cleanDay(value) {

    if (!value) {

        return "";

    }


    const found =
        DAYS.find(function (day) {

            return value.includes(day);

        });


    return found || value.trim();

}


// ============================================================
// التحقق من بداية النص
// ============================================================

function startsWithAny(text, words) {

    return words.some(function (word) {

        return text.startsWith(word);

    });

}


// ============================================================
// التحقق من وجود بيانات
// ============================================================

function hasUsefulData(text) {

    return (

        extractPhones(text).length > 0 ||

        FIELD_KEYWORDS.neighborhood.some(
            function (keyword) {

                return text.includes(keyword);

            }
        ) ||

        FIELD_KEYWORDS.donationType.some(
            function (keyword) {

                return text.includes(keyword);

            }
        )

    );

}


// ============================================================
// هل السطر يخص الحي؟
// ============================================================

function isNeighborhoodLine(line) {

    return startsWithAny(
        line,
        FIELD_KEYWORDS.neighborhood
    );

}


// ============================================================
// عرض النتائج
// ============================================================

function renderTable() {

    resultsBody.innerHTML = "";


    donors.forEach(function (donor, index) {

        const row =
            document.createElement("tr");


        row.innerHTML = `

            <td>
                ${index + 1}
            </td>


            <td>

                <input
                    type="text"
                    value="${escapeHTML(donor.name)}"
                    data-field="name"
                    data-index="${index}"
                    placeholder="اسم المتبرع"
                >

            </td>


            <td>

                <input
                    type="text"
                    value="${escapeHTML(donor.phone)}"
                    data-field="phone"
                    data-index="${index}"
                    placeholder="05xxxxxxxx"
                >

            </td>


            <td>

                <input
                    type="text"
                    value="${escapeHTML(donor.neighborhood)}"
                    data-field="neighborhood"
                    data-index="${index}"
                    placeholder="الحي"
                >

            </td>


            <td>

                <input
                    type="text"
                    value="${escapeHTML(donor.donationType)}"
                    data-field="donationType"
                    data-index="${index}"
                    placeholder="نوع التبرع"
                >

            </td>


            <td>

                <input
                    type="text"
                    value="${escapeHTML(donor.day)}"
                    data-field="day"
                    data-index="${index}"
                    placeholder="اليوم"
                >

            </td>


            <td>

                ${
                    donor.status === "complete"

                    ?

                    `
                    <span class="status complete" data-status-index="${index}">
                        مكتمل
                    </span>
                    `

                    :

                    `
                    <span class="status review" data-status-index="${index}">
                        يحتاج مراجعة
                    </span>
                    `
                }

            </td>


            <td>

                <button
                    class="delete-btn"
                    onclick="deleteRow(${index})"
                >
                    حذف
                </button>

            </td>

        `;


        resultsBody.appendChild(row);

    });


    attachInputEvents();

    updateCopyOutput();

}


// ============================================================
// أحداث تعديل الجدول
// ============================================================

function attachInputEvents() {

    const inputs =
        resultsBody.querySelectorAll("input");


    inputs.forEach(function (input) {

        input.addEventListener(
            "input",
            function () {

                const index =
                    Number(this.dataset.index);


                const field =
                    this.dataset.field;


                donors[index][field] =
                    this.value.trim();


                if (field === "phone") {

                    donors[index].phone =
                        normalizePhone(
                            this.value
                        );

                }


                updateDonorStatus(index);

            }
        );

    });

}


// ============================================================
// تحديث حالة الطلب
// ============================================================

function updateDonorStatus(index) {

    const donor =
        donors[index];


    if (

        donor.phone &&

        donor.neighborhood &&

        donor.donationType

    ) {

        donor.status = "complete";

    } else {

        donor.status = "review";

    }


    const statusElement = resultsBody.querySelector(
        `[data-status-index="${index}"]`
    );


    if (statusElement) {

        statusElement.className =
            "status " + donor.status;

        statusElement.textContent =
            donor.status === "complete"
                ? "مكتمل"
                : "يحتاج مراجعة";

    }


    updateStatistics();

    updateCopyOutput();

}


// ============================================================
// إضافة طلب يدوي
// ============================================================

if (addRowBtn) {

    addRowBtn.addEventListener(
        "click",
        function () {

            donors.push({

                name: "",

                phone: "",

                neighborhood: "",

                donationType: "",

                day: "",

                status: "review"

            });


            renderTable();

            updateStatistics();

        }
    );

}


// ============================================================
// حذف طلب
// ============================================================

function deleteRow(index) {

    donors.splice(index, 1);


    renderTable();

    updateStatistics();

}


// ============================================================
// الإحصائيات
// ============================================================

function updateStatistics() {

    const total =
        donors.length;


    const complete =
        donors.filter(function (donor) {

            return donor.status === "complete";

        }).length;


    const review =
        donors.filter(function (donor) {

            return donor.status === "review";

        }).length;


    if (totalCount) {

        totalCount.textContent =
            total;

    }


    if (completeCount) {

        completeCount.textContent =
            complete;

    }


    if (reviewCount) {

        reviewCount.textContent =
            review;

    }

}


// ============================================================
// مسح البيانات
// ============================================================

if (clearBtn) {

    clearBtn.addEventListener(
        "click",
        function () {

            messagesInput.value = "";

            donors = [];

            resultsBody.innerHTML = "";

            updateCopyOutput();


            if (statistics) {

                statistics.classList.add(
                    "hidden"
                );

            }


            if (resultsSection) {

                resultsSection.classList.add(
                    "hidden"
                );

            }

        }
    );

}


// ============================================================
// الطباعة
// ============================================================

if (printBtn) {

    printBtn.addEventListener(
        "click",
        function () {

            window.print();

        }
    );

}


// ============================================================
// حماية HTML
// ============================================================

function escapeHTML(value) {

    if (!value) {

        return "";

    }


    return String(value)

        .replace(
            /&/g,
            "&amp;"
        )

        .replace(
            /</g,
            "&lt;"
        )

        .replace(
            />/g,
            "&gt;"
        )

        .replace(
            /"/g,
            "&quot;"
        )

        .replace(
            /'/g,
            "&#039;"
        );

}


// ============================================================
// إعداد النص المنظم للنسخ
// ============================================================

function updateCopyOutput() {

    if (!copyOutput) {

        return;

    }


    copyOutput.value = donors.map(function (donor, index) {

        return [
            `طلب رقم ${index + 1}`,
            `اسم المتبرع: ${donor.name || "—"}`,
            `رقم الجوال: ${donor.phone || "—"}`,
            `الحي: ${donor.neighborhood || "—"}`,
            `نوع التبرع: ${donor.donationType || "—"}`,
            `اليوم: ${donor.day || "—"}`,
            `الحالة: ${donor.status === "complete" ? "مكتمل" : "يحتاج مراجعة"}`
        ].join("\n");

    }).join("\n\n--------------------\n\n");


    if (copyFeedback) {

        copyFeedback.textContent = "";

    }

}


// ============================================================
// نسخ النص المنظم
// ============================================================

if (copyDataBtn) {

    copyDataBtn.addEventListener(
        "click",
        async function () {

            const text = copyOutput ? copyOutput.value : "";


            if (!text) {

                alert("لا توجد بيانات لنسخها.");

                return;

            }


            try {

                if (navigator.clipboard && window.isSecureContext) {

                    await navigator.clipboard.writeText(text);

                } else {

                    copyOutput.focus();
                    copyOutput.select();
                    document.execCommand("copy");

                }


                if (copyFeedback) {

                    copyFeedback.textContent =
                        "تم نسخ البيانات المرتبة بنجاح.";

                }

            } catch (error) {

                if (copyFeedback) {

                    copyFeedback.textContent =
                        "تعذّر النسخ تلقائيًا؛ حدّد النص وانسخه يدويًا.";

                }

            }

        }
    );

}


// ============================================================
// تصدير التقرير بصيغة CSV المتوافقة مع Excel
// ============================================================

if (exportExcelBtn) {

    exportExcelBtn.addEventListener(
        "click",
        function () {

            if (donors.length === 0) {

                alert("لا توجد طلبات لتصديرها.");

                return;

            }


            const headers = [
                "#",
                "اسم المتبرع",
                "رقم الجوال",
                "الحي",
                "نوع التبرع",
                "اليوم",
                "الحالة"
            ];


            const rows = donors.map(function (donor, index) {

                return [
                    index + 1,
                    donor.name,
                    donor.phone,
                    donor.neighborhood,
                    donor.donationType,
                    donor.day,
                    donor.status === "complete" ? "مكتمل" : "يحتاج مراجعة"
                ];

            });


            /*
             * نحدد الفاصل صراحةً حتى لا يعتمد Excel على إعدادات
             * الفاصل الإقليمي في جهاز المستخدم.
             */
            const csv = "sep=;\r\n" + [headers].concat(rows)
                .map(function (row) {

                    return row.map(function (value) {

                        return '"' + String(value ?? "")
                            .replace(/"/g, '""') + '"';

                    }).join(";");

                })
                .join("\r\n");


            /*
             * Excel على Windows يقرأ العربية بشكل ثابت عند استخدام
             * UTF-16LE مع BOM، خلافًا لملفات UTF-8 في بعض الإعدادات.
             */
            const buffer = new ArrayBuffer((csv.length + 1) * 2);
            const view = new DataView(buffer);

            view.setUint16(0, 0xFEFF, true);

            for (let index = 0; index < csv.length; index++) {

                view.setUint16(
                    (index + 1) * 2,
                    csv.charCodeAt(index),
                    true
                );

            }

            const blob = new Blob(
                [buffer],
                { type: "text/csv;charset=utf-16le;" }
            );

            const link = document.createElement("a");

            link.href = URL.createObjectURL(blob);
            link.download = "تقرير-المتبرعين.csv";
            link.style.display = "none";

            document.body.appendChild(link);
            link.click();
            link.remove();

            URL.revokeObjectURL(link.href);

        }
    );

}


// ============================================================
// حماية الكلمات المستخدمة داخل التعبيرات النمطية
// ============================================================

function escapeRegex(value) {

    return String(value).replace(
        /[.*+?^${}()|[\]\\]/g,
        "\\$&"
    );

}
