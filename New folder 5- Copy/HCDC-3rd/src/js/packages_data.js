// Master Test Library - Profiles for Health Packages
const testProfiles = {
    lipidProfile: {
        name: 'Lipid Profile (Heart Health)',
        testCount: 10,
        tests: [
            'Total Cholesterol',
            'HDL Cholesterol (Direct)',
            'LDL Cholesterol (Direct)',
            'Triglycerides',
            'VLDL Cholesterol',
            'Non-HDL Cholesterol',
            'TC/HDL Ratio',
            'LDL/HDL Ratio',
            'Trig/HDL Ratio',
            'HDL/LDL Ratio'
        ]
    },
    liverFunction: {
        name: 'Liver Function Tests (LFT)',
        testCount: 12,
        tests: [
            'Bilirubin (Total)',
            'Bilirubin (Direct)',
            'Bilirubin (Indirect)',
            'SGOT (AST)',
            'SGPT (ALT)',
            'Alkaline Phosphatase (ALP)',
            'Gamma Glutamyl Transferase (GGT)',
            'Serum Albumin',
            'Serum Globulin',
            'Total Protein',
            'Albumin/Globulin Ratio',
            'SGOT/SGPT Ratio'
        ]
    },
    kidneyFunction: {
        name: 'Kidney Function Tests (KFT)',
        testCount: 8,
        tests: [
            'Serum Creatinine',
            'Blood Urea Nitrogen (BUN)',
            'Uric Acid',
            'Calcium',
            'BUN/Creatinine Ratio',
            'Urea (Calculated)',
            'Urea/Creatinine Ratio',
            'Estimated Glomerular Filtration Rate (eGFR)'
        ]
    },
    thyroidProfile: {
        name: 'Thyroid Profile',
        testCount: 3,
        tests: [
            'Total Triiodothyronine (T3)',
            'Total Thyroxine (T4)',
            'Thyroid Stimulating Hormone (TSH - Ultrasensitive)'
        ]
    },
    ironDeficiency: {
        name: 'Iron Deficiency Profile',
        testCount: 4,
        tests: [
            'Total Iron Binding Capacity (TIBC)',
            'Serum Iron',
            'UIBC (Unsaturated Iron Binding Capacity)',
            '% Transferrin Saturation'
        ]
    },
    cardiacRisk: {
        name: 'Cardiac Risk Markers',
        testCount: 6,
        tests: [
            'Apolipoprotein A1 (Apo-A1)',
            'Apolipoprotein B (Apo-B)',
            'Apo B / Apo A1 Ratio',
            'Lipoprotein (a) [Lp(a)]',
            'High Sensitivity C-Reactive Protein (hs-CRP)',
            'LP-PLA2'
        ]
    },
    toxicElements: {
        name: 'Toxic Elements',
        testCount: 22,
        tests: [
            'Arsenic', 'Cadmium', 'Mercury', 'Lead', 'Chromium', 'Barium',
            'Cobalt', 'Caesium', 'Selenium', 'Thallium', 'Tin', 'Antimony',
            'Silver', 'Beryllium', 'Bismuth', 'Manganese', 'Molybdenum',
            'Nickel', 'Strontium', 'Uranium', 'Vanadium', 'Aluminium'
        ]
    },
    completeHemogram: {
        name: 'Complete Hemogram (CBC)',
        testCount: 28,
        tests: [
            'Hemoglobin', 'PCV (Hematocrit)', 'Total RBC Count', 'MCV', 'MCH', 'MCHC', 'RDW-CV', 'RDW-SD',
            'Total WBC Count', 'Neutrophils (Absolute)', 'Neutrophils (%)', 'Lymphocytes (Absolute)', 'Lymphocytes (%)',
            'Monocytes (Absolute)', 'Monocytes (%)', 'Eosinophils (Absolute)', 'Eosinophils (%)',
            'Basophils (Absolute)', 'Basophils (%)', 'Immature Granulocytes (Absolute)', 'Immature Granulocytes (%)',
            'Platelet Count', 'MPV', 'PCT', 'PDW', 'P-LCR', 'NRBC', 'NRBC%'
        ]
    },
    diabetesScreening: {
        name: 'Diabetes Screening',
        testCount: 2,
        tests: [
            'HbA1c (Glycosylated Hemoglobin)',
            'Average Blood Glucose'
        ]
    },
    vitamins: {
        name: 'Vitamins',
        testCount: 2,
        tests: [
            'Vitamin D (Total)',
            'Vitamin B12'
        ]
    },
    advancedMetabolic: {
        name: 'Advanced Metabolic',
        testCount: 4,
        tests: [
            'Amylase (Pancreatic)',
            'Lipase (Pancreatic)',
            'Sodium (Electrolyte)',
            'Chloride (Electrolyte)'
        ]
    },
    autoimmune: {
        name: 'Autoimmune',
        testCount: 2,
        tests: [
            'Anti-Nuclear Antibodies (ANA)',
            'Anti-CCP (Cyclic Citrullinated Peptide)'
        ]
    },
    anemiaPlus: {
        name: 'Anemia Plus',
        testCount: 2,
        tests: [
            'Ferritin',
            'Folic Acid'
        ]
    },
    homocysteine: {
        name: 'Homocysteine',
        testCount: 1,
        tests: [
            'Homocysteine'
        ]
    }
};

// Aarogyam Packages with Category-Grouped Tests
const aarogyamPackages = [
    {
        id: 'aarogyam_1_1',
        name: 'Aarogyam 1.1',
        testCount: 65,
        desc: 'Essential serum-only base package with cardiac risk markers, toxic element screening, and comprehensive organ function assessment.',
        desc_hi: 'कार्डियक रिस्क मार्कर, विषाक्त तत्व स्क्रीनिंग और व्यापक अंग कार्य मूल्यांकन के साथ आवश्यक सीरम-आधारित बेस पैकेज।',
        highlights: [
            'Cardiac Risk Markers including Apo B, Apo A1, Lp(a), hs-CRP',
            'Toxic Elements Panel (22 heavy metals)',
            'Complete Lipid, Liver & Kidney Profiles',
            'Iron Deficiency Assessment',
            'Thyroid Function Panel'
        ],
        highlights_hi: [
            'कार्डियक रिस्क मार्कर - Apo B, Apo A1, Lp(a), hs-CRP सहित',
            'विषाक्त तत्व पैनल (22 भारी धातुएं)',
            'संपूर्ण लिपिड, लिवर और किडनी प्रोफाइल',
            'आयरन डेफिशिएंसी मूल्यांकन',
            'थायराइड फंक्शन पैनल'
        ],
        image: 'assets/packages/aarogyam_1_1.png',
        categories: [
            { profile: 'lipidProfile', tests: testProfiles.lipidProfile.tests },
            { profile: 'liverFunction', tests: testProfiles.liverFunction.tests },
            { profile: 'kidneyFunction', tests: testProfiles.kidneyFunction.tests },
            { profile: 'thyroidProfile', tests: testProfiles.thyroidProfile.tests },
            { profile: 'ironDeficiency', tests: testProfiles.ironDeficiency.tests },
            { profile: 'cardiacRisk', tests: testProfiles.cardiacRisk.tests },
            { profile: 'toxicElements', tests: testProfiles.toxicElements.tests }
        ]
    },
    {
        id: 'aarogyam_1_2',
        name: 'Aarogyam 1.2',
        testCount: 95,
        desc: 'Advanced health checkup adding Complete Hemogram and Diabetes Screening to the base 1.1 package.',
        desc_hi: 'बेस 1.1 पैकेज में कम्पलीट हीमोग्राम और मधुमेह स्क्रीनिंग जोड़कर उन्नत स्वास्थ्य जांच।',
        highlights: [
            'Everything in Aarogyam 1.1 PLUS:',
            'Complete Hemogram (28 parameters)',
            'HbA1c with Average Blood Glucose',
            'Comprehensive diabetes monitoring'
        ],
        highlights_hi: [
            'आरोग्यम 1.1 में सब कुछ प्लस:',
            'कम्पलीट हीमोग्राम (28 पैरामीटर)',
            'HbA1c औसत रक्त शर्करा के साथ',
            'व्यापक मधुमेह निगरानी'
        ],
        image: 'assets/packages/aarogyam_1_2.png',
        categories: [
            { profile: 'lipidProfile', tests: testProfiles.lipidProfile.tests },
            { profile: 'liverFunction', tests: testProfiles.liverFunction.tests },
            { profile: 'kidneyFunction', tests: testProfiles.kidneyFunction.tests },
            { profile: 'thyroidProfile', tests: testProfiles.thyroidProfile.tests },
            { profile: 'ironDeficiency', tests: testProfiles.ironDeficiency.tests },
            { profile: 'cardiacRisk', tests: testProfiles.cardiacRisk.tests },
            { profile: 'toxicElements', tests: testProfiles.toxicElements.tests },
            { profile: 'completeHemogram', tests: testProfiles.completeHemogram.tests },
            { profile: 'diabetesScreening', tests: testProfiles.diabetesScreening.tests }
        ]
    },
    {
        id: 'aarogyam_1_3',
        name: 'Aarogyam 1.3',
        testCount: 100,
        desc: 'Comprehensive checkup with Vitamins D & B12, Homocysteine cardiac marker, and Testosterone hormone assessment.',
        desc_hi: 'विटामिन D और B12, होमोसिस्टीन कार्डियक मार्कर और टेस्टोस्टेरोन हार्मोन मूल्यांकन के साथ व्यापक जांच।',
        highlights: [
            'Everything in Aarogyam 1.2 PLUS:',
            'Vitamins D & B12 Assessment',
            'Homocysteine - Key Cardiac Risk Marker',
            'Testosterone Hormone'
        ],
        highlights_hi: [
            'आरोग्यम 1.2 में सब कुछ प्लस:',
            'विटामिन D और B12 मूल्यांकन',
            'होमोसिस्टीन - प्रमुख कार्डियक रिस्क मार्कर',
            'टेस्टोस्टेरोन हार्मोन'
        ],
        image: 'assets/packages/aarogyam_1_3.png',
        categories: [
            { profile: 'lipidProfile', tests: testProfiles.lipidProfile.tests },
            { profile: 'liverFunction', tests: testProfiles.liverFunction.tests },
            { profile: 'kidneyFunction', tests: testProfiles.kidneyFunction.tests },
            { profile: 'thyroidProfile', tests: testProfiles.thyroidProfile.tests },
            { profile: 'ironDeficiency', tests: testProfiles.ironDeficiency.tests },
            { profile: 'cardiacRisk', tests: testProfiles.cardiacRisk.tests },
            { profile: 'toxicElements', tests: testProfiles.toxicElements.tests },
            { profile: 'completeHemogram', tests: testProfiles.completeHemogram.tests },
            { profile: 'diabetesScreening', tests: testProfiles.diabetesScreening.tests },
            { profile: 'vitamins', tests: testProfiles.vitamins.tests },
            { profile: 'homocysteine', tests: testProfiles.homocysteine.tests },
            { name: 'Hormone', testCount: 1, tests: ['Testosterone'] }
        ]
    },
    {
        id: 'aarogyam_1_4',
        name: 'Aarogyam 1.4',
        testCount: 104,
        desc: 'Advanced assessment with Pancreatic Enzymes and Electrolytes for complete metabolic evaluation.',
        desc_hi: 'संपूर्ण मेटाबोलिक मूल्यांकन के लिए पैंक्रियाटिक एंजाइम और इलेक्ट्रोलाइट्स के साथ उन्नत मूल्यांकन।',
        highlights: [
            'Everything in Aarogyam 1.3 PLUS:',
            'Pancreatic: Amylase & Lipase',
            'Electrolytes: Sodium & Chloride',
            'Complete metabolic profile'
        ],
        highlights_hi: [
            'आरोग्यम 1.3 में सब कुछ प्लस:',
            'पैंक्रियाटिक: एमाइलेज और लाइपेज',
            'इलेक्ट्रोलाइट्स: सोडियम और क्लोराइड',
            'संपूर्ण मेटाबोलिक प्रोफाइल'
        ],
        image: 'assets/packages/aarogyam_1_4.png',
        categories: [
            { profile: 'lipidProfile', tests: testProfiles.lipidProfile.tests },
            { profile: 'liverFunction', tests: testProfiles.liverFunction.tests },
            { profile: 'kidneyFunction', tests: testProfiles.kidneyFunction.tests },
            { profile: 'thyroidProfile', tests: testProfiles.thyroidProfile.tests },
            { profile: 'ironDeficiency', tests: testProfiles.ironDeficiency.tests },
            { profile: 'cardiacRisk', tests: testProfiles.cardiacRisk.tests },
            { profile: 'toxicElements', tests: testProfiles.toxicElements.tests },
            { profile: 'completeHemogram', tests: testProfiles.completeHemogram.tests },
            { profile: 'diabetesScreening', tests: testProfiles.diabetesScreening.tests },
            { profile: 'vitamins', tests: testProfiles.vitamins.tests },
            { profile: 'homocysteine', tests: testProfiles.homocysteine.tests },
            { name: 'Hormone', testCount: 1, tests: ['Testosterone'] },
            { profile: 'advancedMetabolic', tests: testProfiles.advancedMetabolic.tests }
        ]
    },
    {
        id: 'aarogyam_1_5',
        name: 'Aarogyam 1.5',
        testCount: 106,
        desc: 'Most comprehensive standard package with Ferritin for complete iron status and Folic Acid for anemia assessment.',
        desc_hi: 'फेरिटिन (संपूर्ण आयरन स्थिति) और फोलिक एसिड (एनीमिया मूल्यांकन) के साथ सबसे व्यापक मानक पैकेज।',
        highlights: [
            'Everything in Aarogyam 1.4 PLUS:',
            'Ferritin - Complete Iron Status',
            'Folic Acid - Anemia Assessment',
            'Full nutritional markers'
        ],
        highlights_hi: [
            'आरोग्यम 1.4 में सब कुछ प्लस:',
            'फेरिटिन - संपूर्ण आयरन स्थिति',
            'फोलिक एसिड - एनीमिया मूल्यांकन',
            'पूर्ण पोषण मार्कर'
        ],
        image: 'assets/packages/aarogyam_1_5.png',
        categories: [
            { profile: 'lipidProfile', tests: testProfiles.lipidProfile.tests },
            { profile: 'liverFunction', tests: testProfiles.liverFunction.tests },
            { profile: 'kidneyFunction', tests: testProfiles.kidneyFunction.tests },
            { profile: 'thyroidProfile', tests: testProfiles.thyroidProfile.tests },
            { profile: 'ironDeficiency', tests: testProfiles.ironDeficiency.tests },
            { profile: 'cardiacRisk', tests: testProfiles.cardiacRisk.tests },
            { profile: 'toxicElements', tests: testProfiles.toxicElements.tests },
            { profile: 'completeHemogram', tests: testProfiles.completeHemogram.tests },
            { profile: 'diabetesScreening', tests: testProfiles.diabetesScreening.tests },
            { profile: 'vitamins', tests: testProfiles.vitamins.tests },
            { profile: 'homocysteine', tests: testProfiles.homocysteine.tests },
            { name: 'Hormone', testCount: 1, tests: ['Testosterone'] },
            { profile: 'advancedMetabolic', tests: testProfiles.advancedMetabolic.tests },
            { profile: 'anemiaPlus', tests: testProfiles.anemiaPlus.tests }
        ]
    },
    {
        id: 'aarogyam_1_6',
        name: 'Aarogyam 1.6',
        testCount: 102,
        desc: 'Specialized package with Autoimmune markers (ANA & Anti-CCP) for rheumatoid arthritis and autoimmune disease screening. Based on 1.3 without metabolic panel.',
        desc_hi: 'रूमेटोइड आर्थराइटिस और ऑटोइम्यून रोग स्क्रीनिंग के लिए ऑटोइम्यून मार्कर (ANA और Anti-CCP) के साथ विशेष पैकेज।',
        highlights: [
            'Everything in Aarogyam 1.3 PLUS:',
            'Anti-CCP - Rheumatoid Arthritis Marker',
            'ANA - Autoimmune Disease Screening',
            'Complete arthritis profile'
        ],
        highlights_hi: [
            'आरोग्यम 1.3 में सब कुछ प्लस:',
            'Anti-CCP - रूमेटोइड आर्थराइटिस मार्कर',
            'ANA - ऑटोइम्यून रोग स्क्रीनिंग',
            'संपूर्ण आर्थराइटिस प्रोफाइल'
        ],
        image: 'assets/packages/aarogyam_1_6.png',
        categories: [
            { profile: 'lipidProfile', tests: testProfiles.lipidProfile.tests },
            { profile: 'liverFunction', tests: testProfiles.liverFunction.tests },
            { profile: 'kidneyFunction', tests: testProfiles.kidneyFunction.tests },
            { profile: 'thyroidProfile', tests: testProfiles.thyroidProfile.tests },
            { profile: 'ironDeficiency', tests: testProfiles.ironDeficiency.tests },
            { profile: 'cardiacRisk', tests: testProfiles.cardiacRisk.tests },
            { profile: 'toxicElements', tests: testProfiles.toxicElements.tests },
            { profile: 'completeHemogram', tests: testProfiles.completeHemogram.tests },
            { profile: 'diabetesScreening', tests: testProfiles.diabetesScreening.tests },
            { profile: 'vitamins', tests: testProfiles.vitamins.tests },
            { profile: 'homocysteine', tests: testProfiles.homocysteine.tests },
            { name: 'Hormone', testCount: 1, tests: ['Testosterone'] },
            { profile: 'autoimmune', tests: testProfiles.autoimmune.tests }
        ]
    },
    {
        id: 'aarogyam_1_7',
        name: 'Aarogyam 1.7',
        testCount: 106,
        desc: 'Advanced package combining Autoimmune markers with full metabolic panel including Pancreatic enzymes and Electrolytes.',
        desc_hi: 'पैंक्रियाटिक एंजाइम और इलेक्ट्रोलाइट्स सहित पूर्ण मेटाबोलिक पैनल के साथ ऑटोइम्यून मार्कर को जोड़ने वाला उन्नत पैकेज।',
        highlights: [
            'Everything in Aarogyam 1.4 PLUS:',
            'Anti-CCP & ANA - Autoimmune Screening',
            'Complete metabolic + autoimmune profile',
            'Comprehensive health evaluation'
        ],
        highlights_hi: [
            'आरोग्यम 1.4 में सब कुछ प्लस:',
            'Anti-CCP और ANA - ऑटोइम्यून स्क्रीनिंग',
            'संपूर्ण मेटाबोलिक + ऑटोइम्यून प्रोफाइल',
            'व्यापक स्वास्थ्य मूल्यांकन'
        ],
        image: 'assets/packages/aarogyam_1_7.png',
        categories: [
            { profile: 'lipidProfile', tests: testProfiles.lipidProfile.tests },
            { profile: 'liverFunction', tests: testProfiles.liverFunction.tests },
            { profile: 'kidneyFunction', tests: testProfiles.kidneyFunction.tests },
            { profile: 'thyroidProfile', tests: testProfiles.thyroidProfile.tests },
            { profile: 'ironDeficiency', tests: testProfiles.ironDeficiency.tests },
            { profile: 'cardiacRisk', tests: testProfiles.cardiacRisk.tests },
            { profile: 'toxicElements', tests: testProfiles.toxicElements.tests },
            { profile: 'completeHemogram', tests: testProfiles.completeHemogram.tests },
            { profile: 'diabetesScreening', tests: testProfiles.diabetesScreening.tests },
            { profile: 'vitamins', tests: testProfiles.vitamins.tests },
            { profile: 'homocysteine', tests: testProfiles.homocysteine.tests },
            { name: 'Hormone', testCount: 1, tests: ['Testosterone'] },
            { profile: 'advancedMetabolic', tests: testProfiles.advancedMetabolic.tests },
            { profile: 'autoimmune', tests: testProfiles.autoimmune.tests }
        ]
    },
    {
        id: 'aarogyam_1_8',
        name: 'Aarogyam 1.8',
        testCount: 108,
        desc: 'The comprehensive "Superset" package with everything - Autoimmune markers, Ferritin, Folic Acid, and all metabolic tests.',
        desc_hi: 'सब कुछ शामिल व्यापक "सुपरसेट" पैकेज - ऑटोइम्यून मार्कर, फेरिटिन, फोलिक एसिड, और सभी मेटाबोलिक टेस्ट।',
        highlights: [
            'MOST COMPREHENSIVE PACKAGE',
            'Everything in Aarogyam 1.5 PLUS Autoimmune:',
            'ANA & Anti-CCP for autoimmune screening',
            'Complete health assessment superset'
        ],
        highlights_hi: [
            'सबसे व्यापक पैकेज',
            'आरोग्यम 1.5 में सब कुछ प्लस ऑटोइम्यून:',
            'ऑटोइम्यून स्क्रीनिंग के लिए ANA और Anti-CCP',
            'संपूर्ण स्वास्थ्य मूल्यांकन सुपरसेट'
        ],
        image: 'assets/packages/aarogyam_1_8.png',
        categories: [
            { profile: 'lipidProfile', tests: testProfiles.lipidProfile.tests },
            { profile: 'liverFunction', tests: testProfiles.liverFunction.tests },
            { profile: 'kidneyFunction', tests: testProfiles.kidneyFunction.tests },
            { profile: 'thyroidProfile', tests: testProfiles.thyroidProfile.tests },
            { profile: 'ironDeficiency', tests: testProfiles.ironDeficiency.tests },
            { profile: 'cardiacRisk', tests: testProfiles.cardiacRisk.tests },
            { profile: 'toxicElements', tests: testProfiles.toxicElements.tests },
            { profile: 'completeHemogram', tests: testProfiles.completeHemogram.tests },
            { profile: 'diabetesScreening', tests: testProfiles.diabetesScreening.tests },
            { profile: 'vitamins', tests: testProfiles.vitamins.tests },
            { profile: 'homocysteine', tests: testProfiles.homocysteine.tests },
            { name: 'Hormone', testCount: 1, tests: ['Testosterone'] },
            { profile: 'advancedMetabolic', tests: testProfiles.advancedMetabolic.tests },
            { profile: 'anemiaPlus', tests: testProfiles.anemiaPlus.tests },
            { profile: 'autoimmune', tests: testProfiles.autoimmune.tests }
        ]
    }
];

// Helper function to get profile info
function getProfileInfo(profileKey) {
    return testProfiles[profileKey] || null;
}

// Helper function to get formatted category name
function getCategoryName(category) {
    if (category.name) return category.name;
    if (category.profile && testProfiles[category.profile]) {
        return testProfiles[category.profile].name;
    }
    return 'Other Tests';
}

// Helper function to get category test count
function getCategoryTestCount(category) {
    if (category.testCount) return category.testCount;
    if (category.profile && testProfiles[category.profile]) {
        return testProfiles[category.profile].testCount;
    }
    return category.tests ? category.tests.length : 0;
}
