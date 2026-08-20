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

const FLEXIBLE_DAYS = [
    "غداً", "غدا", "بكرة", "بكره", "بعد بكرة", "بعد بكره",
    "أي يوم", "اي يوم", "أي وقت", "اي وقت"
];

const GENERIC_DONATION_WORDS = [
    "كنب", "كنبة", "طاولة", "طاولات", "كراسي", "كرسي", "دواليب", "دولاب",
    "مراتب", "مرتبة", "مفارش", "ستائر", "ثلاجة", "ثلاجات", "غسالة", "غسالات",
    "فرن", "أدوات منزلية", "ادوات منزلية", "أغراض منزلية", "اغراض منزلية"
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
    "الملقا", "الصحافة", "النخيل", "الياسمين", "الدرعية","النرجس",
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

            alert("يرجى لصق رسائل العملاء أولاً.");

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

            donor.phone ||
            donor.neighborhood ||
            donor.donationType ||
            donor.day ||
            extractNamedField(block, FIELD_KEYWORDS.name)

        ) {

            if (!donor.name) {

                donor.name = "فاعل خير";

            }

            results.push(donor);

        }

    });


    return mergeDuplicateDonors(results);

}


// ============================================================
// دمج الطلبات المكررة بحسب رقم الجوال
// ============================================================

function mergeDuplicateDonors(items) {

    const merged = [];
    const byPhone = new Map();

    items.forEach(function (donor) {

        if (!donor.phone || !byPhone.has(donor.phone)) {

            merged.push(donor);

            if (donor.phone) {
                byPhone.set(donor.phone, donor);
            }

            return;

        }

        const existing = byPhone.get(donor.phone);

        ["name", "neighborhood", "day"].forEach(function (field) {

            if ((!existing[field] || existing[field] === "فاعل خير") && donor[field]) {
                existing[field] = donor[field];
            }

        });

        existing.donationType = mergeListValues(
            existing.donationType,
            donor.donationType
        );

        refreshDonorStatus(existing);

    });

    return merged;

}


function mergeListValues(first, second) {

    const values = String(first || "")
        .split(/\s*[،,]\s*/)
        .concat(String(second || "").split(/\s*[،,]\s*/))
        .map(function (value) { return value.trim(); })
        .filter(Boolean);

    return Array.from(new Set(values)).join("، ");

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

        .replace(/[\u200B-\u200F\u202A-\u202E\u2066-\u2069]/g, "")

        .replace(/[٠-٩]/g, function (digit) {

            return "٠١٢٣٤٥٦٧٨٩".indexOf(digit);

        })

        .replace(/[ \t]+/g, " ")

        .replace(/^\s*[>*]+\s?/gm, "")

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

            result.push(line);

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

    const lines = text.split("\n");


    const blocks = [];

    let current = [];


    for (let i = 0; i < lines.length; i++) {

        let line = lines[i].trim();

        /* إزالة ترويسة تصدير واتساب مع إبقاء محتوى الرسالة. */
        const whatsappHeader = line.match(
            /^\[?\d{1,2}[\/.\-]\d{1,2}[\/.\-]\d{2,4}[،,]?\s+\d{1,2}:\d{2}(?::\d{2})?\s*(?:[ap]\.?m\.?|[صم])?\]?\s*[-–]?\s*[^:]{1,80}:\s*(.*)$/i
        );

        if (whatsappHeader) {
            line = whatsappHeader[1].trim();
        }


        /*
         * السطر الفارغ تنسيق داخل الرسالة غالبًا، وليس دليلاً
         * كافيًا وحده على بدء طلب جديد.
         */

        if (!line) {

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

        const hasDifferentPhone = linePhones.some(function (phone) {
            return !currentPhones.includes(phone);
        });

        if (

            linePhones.length > 0 &&

            current.length > 0 &&

            currentPhones.length > 0 &&

            hasDifferentPhone

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

            (
                startsWithAny(line, FIELD_KEYWORDS.name) ||
                /^(?:أنا|انا|اسمي|معك)\s+/i.test(line)
            ) &&

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

            const currentPhones =
                extractPhones(current.join("\n"));

            const hasDifferentPhone = linePhones.some(function (phone) {
                return !currentPhones.includes(phone);
            });

            if (

                linePhones.length > 0 &&

                currentPhones.length > 0 &&

                hasDifferentPhone

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

    if (!donor.name) {

        donor.name =
            extractNameFromBareLine(block);

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

    if (!donor.donationType) {

        donor.donationType =
            extractDonationFromSentence(block);

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


    donor.day =
        cleanDay(donor.day);



        /*
     * إذا لم نتمكن من تحديد نوع التبرع إطلاقًا،
     * نكتب "أغراض" كقيمة افتراضية بدل ترك الحقل فارغًا.
     */

    if (!donor.donationType) {

        donor.donationType = "أغراض";

    }


    // ========================================================
    // تحديد الحالة
    // ========================================================

    refreshDonorStatus(donor);


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


    /*
     * دعم النماذج المكتوبة في سطر واحد، مثل:
     * الاسم محمد الجوال 05... الحي الشفا التبرع ملابس
     */
    const allLabels = Object.keys(FIELD_KEYWORDS)
        .reduce(function (list, key) {
            return list.concat(FIELD_KEYWORDS[key]);
        }, [])
        .sort(function (a, b) { return b.length - a.length; })
        .map(escapeRegex)
        .join("|");

    const inlineText = text.replace(/\n+/g, " | ");

    for (const keyword of keywords.slice().sort(function (a, b) {
        return b.length - a.length;
    })) {

        const inlinePattern = new RegExp(
            "(?:^|[\\s|،؛])" + escapeRegex(keyword) +
            "\\s*[:：=\\-]?\\s*(.+?)(?=\\s*(?:" + allLabels +
            ")\\s*[:：=\\-]?|\\s*[|،؛]\\s*|$)",
            "i"
        );

        const inlineMatch = inlineText.match(inlinePattern);

        if (inlineMatch) {

            const value = inlineMatch[1].trim();

            if (value && !isFieldTitle(value)) {
                return value;
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

    DONATION_TYPES.concat(GENERIC_DONATION_WORDS).forEach(function (type) {

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


function extractDonationFromSentence(text) {

    const patterns = [
        /(?:عندي|لدي|يوجد عندي)\s+([^\n،؛]+)(?=\s+(?:ورقمي|رقمي|الجوال|في حي|الحي|والموعد|واليوم)|$)/i,
        /(?:حاب|حابة|أرغب|ارغب|أود|اود)\s+(?:أن\s+|ان\s+)?(?:أتبرع|اتبرع)\s*(?:بـ|ب)?\s*([^\n،؛]+)/i,
        /(?:تبرعي|التبرع)\s+(?:عبارة عن|هو)?\s*[:\-]?\s*([^\n،؛]+)/i
    ];

    for (const pattern of patterns) {

        const match = text.match(pattern);

        if (match) {
            return cleanDonation(match[1]);
        }

    }

    return "";

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

    const normalized = normalizeArabicForMatch(text);
    const flexible = FLEXIBLE_DAYS
        .slice()
        .sort(function (a, b) { return b.length - a.length; })
        .find(function (day) {
            return normalized.includes(normalizeArabicForMatch(day));
        });

    return flexible || "";

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


function extractNameFromBareLine(text) {

    const ignored = /^(?:السلام|مرحبا|هلا|شكرا|نعم|لا|تم|موافق|فاعل خير|صباح|مساء)/i;
    const lines = text.split("\n");

    for (const originalLine of lines) {

        const line = originalLine.replace(/^[-•*]+\s*/, "").trim();

        if (
            !line ||
            ignored.test(line) ||
            extractPhones(line).length > 0 ||
            detectDay(line) ||
            detectNeighborhoodFromList(line) ||
            detectDonationType(line) ||
            Object.keys(FIELD_KEYWORDS).some(function (key) {
                return startsWithAny(line, FIELD_KEYWORDS[key]);
            })
        ) {
            continue;
        }

        const words = line.split(/\s+/);

        if (
            words.length >= 1 &&
            words.length <= 5 &&
            /^[\u0600-\u06FF\s'-]+$/.test(line)
        ) {
            return line;
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
                    value="${escapeHTML(donor.neighborhood)}"
                    data-field="neighborhood"
                    data-index="${index}"
                    placeholder="الحي"
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
                    <span class="status complete" data-status-index="${index}" title="بيانات الطلب الأساسية مكتملة">
                        مكتمل
                    </span>
                    `

                    :

                    `
                    <span class="status review" data-status-index="${index}" title="${escapeHTML(donor.reviewReason || "تحقق من البيانات الناقصة")}">
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

    refreshDonorStatus(donor);


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

        statusElement.title =
            donor.status === "complete"
                ? "بيانات الطلب الأساسية مكتملة"
                : donor.reviewReason;

    }


    updateStatistics();

    updateCopyOutput();

}


function refreshDonorStatus(donor) {

    const missing = [];

    if (!donor.phone) {
        missing.push("رقم الجوال");
    }

    if (!donor.neighborhood) {
        missing.push("الحي");
    }

    if (!donor.donationType) {
        missing.push("نوع التبرع");
    }

    donor.status = missing.length === 0 ? "complete" : "review";
    donor.reviewReason = missing.length > 0
        ? "البيانات الناقصة: " + missing.join("، ")
        : "";

    return donor;

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
            ` ${donor.name || ""}`,
            ` ${donor.neighborhood || ""}`,
            ` ${donor.phone || ""}`,
            `  ${donor.donationType || ""}`,
        ].join("\n");

    }).join("\n");


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
