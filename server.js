const oracledb = require('oracledb');
const express = require('express');
const { json } = require('body-parser');
const port = 3000;

oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
const app = express();

app.listen(port);

app.set('view engine', 'ejs');
app.use(express.static('public'));

const data = [
    {
        "link": "https://ds.rokomari.store/rokomari110/ProductNew20190903/260X372/Gonit_Bojhar_Hatekhori-Munir_Hasan-a12ee-284843.jpg",
        "genre": [
            " প্রাইমারি ",
            "  Go To Cart   "
        ],
        "data": {
            "Title": "গণিত বোঝার হাতেখড়ি",
            "Author": "মুনির হাসান  ,  আশরাফুল আল শাকুর  ,  মাহ্‌তাব হোসাইন  ,  আহমেদ শাহরিয়ার শুভ",
            "Publisher": "তাম্রলিপি",
            "Edition": "1st Published, 2023",
            "Number of Pages": "144",
            "Country": "বাংলাদেশ",
            "Language": "বাংলা"
        }
    },
    {
        "link": "https://ds.rokomari.store/rokomari110/ProductNew20190903/260X372/1c9406dc8_157878.jpg",
        "genre": [
            " গণিত ",
            "  Go To Cart   "
        ],
        "data": {
            "Title": "জ্যামিতির যত কৌশল",
            "Author": "দিপু সরকার  ,  অনুপম পাল",
            "Publisher": "ল্যাব বাংলা",
            "ISBN": "৯৮৭-৯৮৪-৩৪-৪০৬৩-১",
            "Edition": "1st Published, 2018",
            "Number of Pages": "255",
            "Country": "বাংলাদেশ",
            "Language": "বাংলা"
        }
    },
    {
        "link": "https://ds.rokomari.store/rokomari110/ProductNew20190903/260X372/4ff1cf5e1_8022.jpg",
        "genre": [
            " গণিত ",
            "  Go To Cart   "
        ],
        "data": {
            "Title": "গণিত এবং আরো গণিত",
            "Author": "মুহম্মদ জাফর ইকবাল  ,  জাকারিয়া স্বপন",
            "Publisher": "অনুপম প্রকাশনী",
            "ISBN": "9789844042278",
            "Edition": "14th Printed, 2017",
            "Number of Pages": "335",
            "Country": "বাংলাদেশ",
            "Language": "বাংলা"
        }
    },
    {
        "link": "https://ds.rokomari.store/rokomari110/ProductNew20190903/260X372/a8d6bc3e0_4551.jpg",
        "genre": [
            " রাজনৈতিক ষড়যন্ত্র ও হত্যাকাণ্ড ",
            "  Go To Cart   "
        ],
        "data": {
            "Title": "সত্য মামলা আগরতলা",
            "Author": "কর্ণেল শওকত আলী (অবঃ)",
            "Publisher": "প্রথমা প্রকাশন",
            "ISBN": "9789848765609",
            "Edition": "4th Printed, 2018",
            "Number of Pages": "208",
            "Country": "বাংলাদেশ",
            "Language": "বাংলা"
        }
    },
    {
        "link": "https://ds.rokomari.store/rokomari110/ProductNew20190903/260X372/6422c1b68fe4_47066.gif",
        "genre": [
            " ইসলামি আইন, ফতোয়া ও ফিকহ শাস্ত্র ",
            "  Go To Cart   "
        ],
        "data": {
            "Title": "ফারায়েজ আইন",
            "Author": "গাজী শামছুর রহমান",
            "Publisher": "খোশরোজ কিতাব মহল",
            "ISBN": "9844381142",
            "Edition": "New Edition, 2010",
            "Number of Pages": "223",
            "Country": "বাংলাদেশ",
            "Language": "বাংলা"
        }
    },
    {
        "link": "https://ds.rokomari.store/rokomari110/ProductNew20190903/260X372/5648b3c24dd4_123752.jpg",
        "genre": [
            " রাজনৈতিক গবেষণা ও প্রবন্ধ ",
            "  Go To Cart   "
        ],
        "data": {
            "Title": "ফ্রিডম অ্যাট মিডনাইট",
            "Author": "দোমিনিক লাপিয়েররী  ,  ল্যারি কলিন্স",
            "Translator": "রবিশেখর সেনগুপ্ত",
            "Publisher": "দি স্কাই পাবলিশার্স",
            "ISBN": "9847014502165",
            "Edition": "1st published, 2017",
            "Number of Pages": "616",
            "Country": "বাংলাদেশ"
        }
    },
    {
        "link": "https://ds.rokomari.store/rokomari110/ProductNew20190903/260X372/798a81418_93091.jpg",
        "genre": [
            " ভ্রমণ ও প্রবাস: ক্লাসিক ",
            "  Go To Cart   "
        ],
        "data": {
            "Title": "দ্য ট্রাভেলস অব মার্কো পলো",
            "Author": "ম্যানুয়েল কোমরুফ",
            "Translator": "সোহরাব সুমন",
            "Publisher": "দিব্য প্রকাশ",
            "ISBN": "9789849054542",
            "Edition": "1st Published, 2015",
            "Number of Pages": "282",
            "Country": "বাংলাদেশ"
        }
    },
    {
        "link": "https://ds.rokomari.store/rokomari110/ProductNew20190903/260X372/7ee759727_177786.jpg",
        "genre": [
            " মহাকাশ বিজ্ঞান ও জ্যোতির্বিদ্যা ",
            "  Go To Cart   "
        ],
        "data": {
            "Title": "দ্য থিওরি অব এভরিথিং",
            "Author": "স্টিফেন হকিং",
            "Translator": "সাকিব জামাল",
            "Publisher": "অন্বেষা প্রকাশন",
            "ISBN": "9789844350014",
            "Edition": "1st Published, 2019",
            "Number of Pages": "118",
            "Country": "বাংলাদেশ"
        }
    },
    {
        "link": "https://ds.rokomari.store/rokomari110/ProductNew20190903/260X372/7fcc71de9_195615.jpg",
        "genre": [
            " অনুবাদ: আত্ম-উন্নয়ন ও মেডিটেশন ",
            "  Go To Cart   "
        ],
        "data": {
            "Title": "দ্য মিরাকল মর্নিং",
            "Author": "হ্যাল এলরড",
            "Translator": "সাম্য শরিফ",
            "Publisher": "সূচীপত্র",
            "ISBN": "9789849332240",
            "Edition": "1st Published, 2020",
            "Number of Pages": "160",
            "Country": "বাংলাদেশ"
        }
    },
    {
        "link": "https://ds.rokomari.store/rokomari110/ProductNew20190903/260X372/Dopamine_Detox_-Thibaut_Meurisse-7b8bc-243389.jpg",
        "genre": [
            " অনুবাদ: আত্ম-উন্নয়ন ও মেডিটেশন ",
            "  Go To Cart   "
        ],
        "data": {
            "Title": "ডোপামিন ডিটক্স",
            "Author": "থিবো মেরিস",
            "Translator": "প্রিতম মুজতাহিদ",
            "Publisher": "রুশদা প্রকাশ",
            "ISBN": "9789849642688",
            "Edition": "4th Edition, February 2023",
            "Number of Pages": "80",
            "Country": "বাংলাদেশ"
        }
    },
    {
        "link": "https://ds.rokomari.store/rokomari110/ProductNew20190903/260X372/Muhammad_The_Ultimate_Leader-Siddique_Swopon-48484-271313.png",
        "genre": [
            " সীরাতে রাসুল ﷺ ",
            "  Go To Cart   "
        ],
        "data": {
            "Title": "মুহাম্মাদ সা. দ্যা আল্টিমেট লিডার",
            "Author": "ড. দাউদ বাচলার",
            "Translator": "সিদ্দিক স্বপন  ,  ওয়াহিদুল হাদী",
            "Publisher": "গার্ডিয়ান পাবলিকেশনস",
            "ISBN": "9789849658498",
            "Edition": "1st Published, 2022",
            "Number of Pages": "144",
            "Country": "বাংলাদেশ"
        }
    },
    {
        "link": "https://ds.rokomari.store/rokomari110/ProductNew20190903/260X372/Sufism_in_Selfrealization-Muhammad_Abdul_Hai-0cab7-278531.jpg",
        "genre": [
            " আধ্যাত্মিকতা ও সুফিবাদ ",
            "  Go To Cart   "
        ],
        "data": {
            "Title": "আত্মদর্শনে সুফিবাদ",
            "Author": "মোহাম্মদ আবদুল হাই",
            "Publisher": "সূচীপত্র",
            "ISBN": "978-984-96929-4-2",
            "Edition": "1st Edition, 2023",
            "Number of Pages": "339",
            "Country": "বাংলাদেশ",
            "Language": "বাংলা"
        }
    },
    {
        "link": "https://ds.rokomari.store/rokomari110/ProductNew20190903/260X372/9aa729284_212665.jpg",
        "genre": [
            " ইসলামি গল্প ",
            "  Go To Cart   "
        ],
        "data": {
            "Title": "জীবন যেখানে যেমন",
            "Author": "আরিফ আজাদ",
            "Publisher": "সমকালীন প্রকাশন",
            "ISBN": "9789849548997",
            "Edition": "1st Published, 2021",
            "Number of Pages": "152",
            "Country": "বাংলাদেশ",
            "Language": "বাংলা"
        }
    },
    {
        "link": "https://ds.rokomari.store/rokomari110/ProductNew20190903/260X372/b71a59819_193764.jpg",
        "genre": [
            " ইসলামি বই: আত্ম-উন্নয়ন ",
            "  Go To Cart   "
        ],
        "data": {
            "Title": "প্রোডাক্টিভ মুসলিম",
            "Author": "মোহাম্মদ ফারিস",
            "Translator": "মিরাজ রহমান  ,  হামিদ সিরাজী",
            "Publisher": "গার্ডিয়ান পাবলিকেশনস",
            "ISBN": "9789848254547",
            "Edition": "1st Published, 2020",
            "Number of Pages": "256",
            "Country": "বাংলাদেশ"
        }
    },
    {
        "link": "https://ds.rokomari.store/rokomari110/ProductNew20190903/260X372/Nilin-Mostaque_Ahamed-9e779-224188.jpg",
        "genre": [
            " সায়েন্স ফিকশন ",
            "  Go To Cart   "
        ],
        "data": {
            "Title": "নিলিন",
            "Author": "মোশতাক আহমেদ",
            "Publisher": "অনিন্দ্য প্রকাশ",
            "ISBN": "9789849620259",
            "Edition": "1st Published, 2022",
            "Number of Pages": "142",
            "Country": "বাংলাদেশ",
            "Language": "বাংলা"
        }
    },
    {
        "link": "https://ds.rokomari.store/rokomari110/ProductNew20190903/260X372/442c76b3d_14359.jpg",
        "genre": [
            " বয়স যখন ৮-১২: সায়েন্স ফিকশন ",
            "  Go To Cart   "
        ],
        "data": {
            "Title": "টাইম মেশিন",
            "Author": "এইচ. জি. ওয়েলস",
            "Publisher": "পাঞ্জেরী পাবলিকেশন্স",
            "Number of Pages": "157",
            "Country": "বাংলাদেশ",
            "Language": "বাংলা"
        }
    },
    {
        "link": "https://ds.rokomari.store/rokomari110/ProductNew20190903/260X372/0ceee7e08_206786.jpg",
        "genre": [
            " সায়েন্স ফিকশন ",
            "  Go To Cart   "
        ],
        "data": {
            "Title": "ডার্ক ম্যাটার",
            "Author": "ব্লেইক ক্রাউচ",
            "Translator": "সালমান হক",
            "Publisher": "আফসার ব্রাদার্স",
            "ISBN": "9789848018934",
            "Edition": "1st Published, 2021",
            "Number of Pages": "320",
            "Country": "বাংলাদেশ"
        }
    },
    {
        "link": "https://ds.rokomari.store/rokomari110/ProductNew20190903/260X372/Limbtronic_rupantor-Dr_Jubayer_Ahamed-f769d-278689.jpg",
        "genre": [
            " সায়েন্স ফিকশন ",
            "  Go To Cart   "
        ],
        "data": {
            "Title": "লিম্বিক্ট্রনিক রূপান্তর",
            "Author": "যুবায়ের আহমেদ",
            "Publisher": "বইবাজার প্রকাশনী",
            "Edition": "1st Edition 2023",
            "Number of Pages": "176",
            "Country": "বাংলাদেশ",
            "Language": "বাংলা"
        }
    },
    {
        "link": "https://ds.rokomari.store/rokomari110/ProductNew20190903/260X372/86726dac57a4_110425.gif",
        "genre": [
            " বঙ্গবন্ধু শেখ মুজিবুর রহমান ",
            "  Go To Cart   "
        ],
        "data": {
            "Title": "বঙ্গবন্ধু এবং বাংলাদেশ",
            "Author": "নিমাই চন্দ্র চক্রবর্তী",
            "Publisher": "বিভাস",
            "ISBN": "9847034306545",
            "Edition": "1st Published, 2016",
            "Number of Pages": "160",
            "Country": "বাংলাদেশ",
            "Language": "বাংলা"
        }
    },
    {
        "link": "https://ds.rokomari.store/rokomari110/ProductNew20190903/260X372/imgrok_47549.GIF",
        "genre": [
            " বঙ্গবন্ধু শেখ মুজিবুর রহমান ",
            "  Go To Cart   "
        ],
        "data": {
            "Title": "অসমাপ্ত আত্মজীবনী (স্ট্যান্ডার্ড)",
            "Author": "বঙ্গবন্ধু শেখ মুজিবুর রহমান",
            "Publisher": "দি ইউনিভার্সিটি প্রেস লিমিটেড(ইউ পি এল)",
            "Number of Pages": "329",
            "Country": "বাংলাদেশ",
            "Language": "বাংলা"
        }
    },
    {
        "link": "https://ds.rokomari.store/rokomari110/ProductNew20190903/260X372/The_Anatomy_of_World_Politics_Supplement-Mohammad_Miraj_Mia-c3e7e-252239.jpeg",
        "genre": [
            " রাজনৈতিক সমালোচনা ও কলাম সংকলন ",
            "  Go To Cart   "
        ],
        "data": {
            "Title": "দি এ্যানাটমি অব ওয়ার্ল্ড পলিটিক্স (সাপ্লিমেন্ট-১)",
            "Author": "মোহাম্মদ মিরাজ মিয়া",
            "Publisher": "সিম্পোজিয়াম পাবলিকেশন্স",
            "ISBN": "9789843520531",
            "Edition": "1st Published, 2022",
            "Number of Pages": "96",
            "Country": "বাংলাদেশ",
            "Language": "বাংলা"
        }
    },
    {
        "link": "https://ds.rokomari.store/rokomari110/ProductNew20190903/260X372/f1c67ebe4_5928.jpg",
        "genre": [
            " আন্তর্জাতিক রাজনীতি ",
            "  Go To Cart   "
        ],
        "data": {
            "Title": "কূটনীতিবিদ্যা",
            "Author": "আরশাদ আজিজ  ,  হ্যারল্ড নিকোলসন",
            "Translator": "আরশাদ আজিজ",
            "Publisher": "সূচীপত্র",
            "ISBN": "9789848557716",
            "Edition": "1st Printed, 2012",
            "Number of Pages": "136",
            "Country": "বাংলাদেশ"
        }
    },
    {
        "link": "https://ds.rokomari.store/rokomari110/ProductNew20190903/260X372/Rupali_Guitar-Joy_Shahriar-fa392-278416.jpg",
        "genre": [
            " সাহিত্যিক, শিল্প ও সংগীত ব্যক্তিত্ব ",
            "  Go To Cart   "
        ],
        "data": {
            "Title": "রুপালি গিটার",
            "Author": "জয় শাহরিয়ার",
            "Publisher": "আজব প্রকাশ",
            "ISBN": "9789849716884",
            "Edition": "1st Published, 2023",
            "Number of Pages": "184",
            "Country": "বাংলাদেশ",
            "Language": "বাংলা"
        }
    },
    {
        "link": "https://ds.rokomari.store/rokomari110/ProductNew20190903/260X372/bcf32949b_215699.jpg",
        "genre": [
            " বয়স যখন ১২-১৭: উপন্যাস ",
            "  Go To Cart   "
        ],
        "data": {
            "Title": "পিচ্চি রতন ও ফুটবল",
            "Author": "আমিরুল ইসলাম",
            "Publisher": "প্রজন্ম পাবলিকেশন",
            "ISBN": "9789849518747",
            "Edition": "1st Published, 2021",
            "Number of Pages": "48",
            "Country": "বাংলাদেশ",
            "Language": "বাংলা"
        }
    },
    {
        "link": "https://ds.rokomari.store/rokomari110/ProductNew20190903/260X372/Moner_Kotha-Bertrand_Russell-cd5f2-221680.jpg",
        "genre": [
            " আধুনিক দর্শন ",
            "  Go To Cart   "
        ],
        "data": {
            "Title": "মনের কথা",
            "Author": "বার্ট্রান্ড রাসেল",
            "Translator": "আমিনুল ইসলাম ভুইয়া",
            "Publisher": "সময় প্রকাশন",
            "ISBN": "9789844583757",
            "Edition": "1st Published, 2022",
            "Number of Pages": "156",
            "Country": "বাংলাদেশ"
        }
    },
    {
        "link": "img-link",
        "genre": [
            " চিরায়ত উপন্যাস ",
            "  Go To Cart   "
        ],
        "data": {
            "Title": "শ্রীকান্ত",
            "Author": "শরৎচন্দ্র চট্টোপাধ্যায়",
            "Publisher": "অনুভূতি প্রকাশনী",
            "ISBN": "9789848004175",
            "Edition": "1st published, 2022",
            "Number of Pages": "319",
            "Country": "বাংলাদেশ",
            "Language": "বাংলা"
        }
    },
    {
        "link": "https://ds.rokomari.store/rokomari110/ProductNew20190903/260X372/000696329834_68247.gif",
        "genre": [
            " চিরায়ত উপন্যাস ",
            "  Go To Cart   "
        ],
        "data": {
            "Title": "পথের দাবি",
            "Author": "শরৎচন্দ্র চট্টোপাধ্যায়",
            "Publisher": "জয় প্রকাশন",
            "ISBN": "9847015400766",
            "Edition": "Reprint, 2022",
            "Number of Pages": "182",
            "Country": "বাংলাদেশ",
            "Language": "বাংলা"
        }
    },
    {
        "link": "https://ds.rokomari.store/rokomari110/ProductNew20190903/260X372/rokimg_20140907_46938.gif",
        "genre": [
            " বয়স যখন ১২-১৭: রহস্য, গোয়েন্দা, থ্রিলার ও অ্যাডভেঞ্চার ",
            "  Go To Cart   "
        ],
        "data": {
            "Title": "তিন গোয়েন্দা ভলিউম ১/১ (নিউজ প্রিন্ট)",
            "Author": "রকিব হাসান",
            "Publisher": "সেবা প্রকাশনী",
            "Number of Pages": "320",
            "Country": "বাংলাদেশ",
            "Language": "বাংলা"
        }
    },
    {
        "link": "https://ds.rokomari.store/rokomari110/ProductNew20190903/260X372/e47e000c0_13779.jpg",
        "genre": [
            " শিশু-কিশোর: রহস্য, গোয়েন্দা, ভৌতিক, থ্রিলার ও অ্যাডভেঞ্চার ",
            "  Go To Cart   "
        ],
        "data": {
            "Title": "তিন গোয়েন্দা ভলিউম ১/২",
            "Author": "রকিব হাসান",
            "Publisher": "সেবা প্রকাশনী",
            "ISBN": "9841612461",
            "Edition": "Reprinted, 2018",
            "Number of Pages": "280",
            "Country": "বাংলাদেশ",
            "Language": "বাংলা"
        }
    },
    {
        "link": "https://ds.rokomari.store/rokomari110/ProductNew20190903/260X372/8c056e90e_160635.jpg",
        "genre": [
            " রহস্য ও গোয়েন্দা ",
            "  Go To Cart   "
        ],
        "data": {
            "Title": "ব্যোমকেশ সমগ্র",
            "Author": "শরদিন্দু বন্দ্যোপাধ্যায়",
            "Publisher": "সালমা বুক ডিপো",
            "ISBN": "9789849174523",
            "Edition": "1st Published, 2018",
            "Number of Pages": "904",
            "Country": "বাংলাদেশ",
            "Language": "বাংলা"
        }
    },
    {
        "link": "https://ds.rokomari.store/rokomari110/ProductNew20190903/260X372/8924f0ad8014_114733.gif",
        "genre": [
            " পশ্চিমবঙ্গের উপন্যাস ",
            "  Go To Cart   "
        ],
        "data": {
            "Title": "মিতিনমাসি সমগ্র ২",
            "Author": "সুচিত্রা ভট্টাচার্য",
            "Publisher": "আনন্দ পাবলিশার্স (ভারত)",
            "ISBN": "9789353406069",
            "Edition": "1st Edition, 2016",
            "Number of Pages": "611",
            "Country": "ভারত",
            "Language": "বাংলা"
        }
    },
    {
        "link": "https://ds.rokomari.store/rokomari110/ProductNew20190903/260X372/98bf57fb0_43045.jpg",
        "genre": [
            " শিশু-কিশোর: রহস্য, গোয়েন্দা, ভৌতিক, থ্রিলার ও অ্যাডভেঞ্চার ",
            "  Go To Cart   "
        ],
        "data": {
            "Title": "কাকাবাবু সমগ্র ১",
            "Author": "সুনীল গঙ্গোপাধ্যায় (নীললোহিত)",
            "Publisher": "আনন্দ পাবলিশার্স (ভারত)",
            "ISBN": "8172152046",
            "Edition": "1st Edition, 1993",
            "Number of Pages": "525",
            "Country": "ভারত",
            "Language": "বাংলা"
        }
    },
    {
        "link": "https://ds.rokomari.store/rokomari110/ProductNew20190903/260X372/4a6c5329d_176448.jpg",
        "genre": [
            " পশ্চিমবঙ্গের বই: রহস্য, গোয়েন্দা, ভৌতিক, থ্রিলার ও অ্যাডভেঞ্চার ",
            "  Go To Cart   "
        ],
        "data": {
            "Title": "রহস্যভেদী কিরীটী",
            "Author": "নীহাররঞ্জন গুপ্ত",
            "Publisher": "আদিত্য পুস্তকালয় (ভারত)",
            "Edition": "1st Published, 2016",
            "Number of Pages": "328",
            "Country": "ভারত",
            "Language": "বাংলা"
        }
    },
    {
        "link": "https://ds.rokomari.store/rokomari110/ProductNew20190903/260X372/5386d5424_155283.jpg",
        "genre": [
            " মুক্তিযুদ্ধের ডায়েরি, চিঠি ও স্মৃতিচারণ ",
            "  Go To Cart   "
        ],
        "data": {
            "Title": "একাত্তরের দিনগুলি",
            "Author": "জাহানারা ইমাম",
            "Publisher": "চারুলিপি প্রকাশন",
            "ISBN": "9789845982306",
            "Edition": "1st Published, 2018",
            "Number of Pages": "312",
            "Country": "বাংলাদেশ",
            "Language": "বাংলা"
        }
    },
    {
        "link": "https://ds.rokomari.store/rokomari110/ProductNew20190903/260X372/c7bca8f89_155575.jpg",
        "genre": [
            " নাটক ",
            "  Go To Cart   "
        ],
        "data": {
            "Title": "রক্তাক্ত প্রান্তর",
            "Author": "মুনীর চৌধুরী",
            "Publisher": "বিভাস",
            "ISBN": "9789848899202",
            "Edition": "1st Edition, 2018",
            "Number of Pages": "96",
            "Country": "বাংলাদেশ",
            "Language": "বাংলা"
        }
    },
    {
        "link": "https://ds.rokomari.store/rokomari110/ProductNew20190903/260X372/kopal_kundula-Bankimacandro_Chattopadhay_-e60ed-14823.jpg",
        "genre": [
            " চিরায়ত উপন্যাস ",
            "  Go To Cart   "
        ],
        "data": {
            "Title": "কপালকুণ্ডলা",
            "Author": "বঙ্কিমচন্দ্র চট্টোপাধ্যায়",
            "Editor": "ড. রহমান হাবিব",
            "Publisher": "বুকস্‌ ফেয়ার",
            "ISBN": "9847015800871",
            "Edition": "1st Published, 2011",
            "Number of Pages": "96",
            "Country": "বাংলাদেশ"
        }
    },
    {
        "link": "https://ds.rokomari.store/rokomari110/ProductNew20190903/260X372/03d2514843d4_6987.jpg",
        "genre": [
            " চিরায়ত উপন্যাস ",
            "  Go To Cart   "
        ],
        "data": {
            "Title": "ক্রীতদাসের হাসি(প্রথম সংস্করণ ১৯৬৩)",
            "Author": "শওকত ওসমান",
            "Publisher": "সময় প্রকাশন",
            "ISBN": "984458440X",
            "Edition": "8th Printed, 2015",
            "Number of Pages": "80",
            "Country": "বাংলাদেশ",
            "Language": "বাংলা"
        }
    },
    {
        "link": "https://ds.rokomari.store/rokomari110/ProductNew20190903/260X372/e222f54cab14_6986.jpg",
        "genre": [
            " চিরায়ত উপন্যাস ",
            "  Go To Cart   "
        ],
        "data": {
            "Title": "জননী",
            "Author": "শওকত ওসমান",
            "Publisher": "সময় প্রকাশন",
            "ISBN": "9844584078",
            "Edition": "11th Printed, 2022",
            "Number of Pages": "208",
            "Country": "বাংলাদেশ",
            "Language": "বাংলা"
        }
    },
    {
        "link": "https://ds.rokomari.store/rokomari110/ProductNew20190903/260X372/Nirbachonnama-Mahbub_Talukder-bab49-288112.jpg",
        "genre": [
            " পেশাগত স্মৃতিচারণ ও অভিজ্ঞতা ",
            "  Go To Cart   "
        ],
        "data": {
            "Title": "নির্বাচননামা",
            "Author": "মাহবুব তালুকদার",
            "Publisher": "প্রথমা প্রকাশন",
            "ISBN": "9789849755432",
            "Edition": "1st Edition, 2023",
            "Number of Pages": "344",
            "Country": "বাংলাদেশ",
            "Language": "বাংলা"
        }
    },
    {
        "link": "https://ds.rokomari.store/rokomari110/ProductNew20190903/260X372/The_Things_you_can_see_only_when_you_slo-Haemin_Sunim-8cac5-236774.jpg",
        "genre": [
            " অনুবাদ: আত্ম-উন্নয়ন ও মেডিটেশন ",
            "  Go To Cart   "
        ],
        "data": {
            "Title": "দি থিংস ইউ ক্যান সি অনলি হোয়েন ইউ স্লো ডাউন",
            "Author": "হেমিন সুনিম",
            "Translator": "শিহাব উদ্দিন",
            "Publisher": "রুশদা প্রকাশ",
            "ISBN": "9789849642664",
            "Edition": "জুন, ২০২২",
            "Number of Pages": "128",
            "Country": "বাংলাদেশ"
        }
    }
]

async function runQuery(query) {
    const connection = await oracledb.getConnection({
        user: "rokomari",
        password: "12345",
        connectionString: "localhost/ORCLPDB"
    });

    const result = await connection.execute(query);

    await connection.close();

    return result;
}

// app.get('/', async (req, res) => {
//     const data = await runQuery(`Select Book.TITLE, Book.ID, Book.PUBLISHER, Writer.name As WRITER_NAME from Book, Writer where (Book.Writer_id = Writer.id)`);
//     const books = data.rows;
//     // books.forEach(book => {
//     //     console.log(book.TITLE);
//     //     console.log(book.AUTHOR);
//     // })
//     res.render('index', {books: books});
// })

// app.get('/all_writers', async(req, res) => {
//     const writer_data = await runQuery(`SELECT NAME, ID FROM WRITER ORDER BY NAME`);
//     const writers = writer_data.rows;

//     res.render('all_writers', {writers : writers});
// });

// app.get('/all_publishers', async(req, res) => {
//     const data = await runQuery(`SELECT NAME FROM PUBLISHER ORDER BY NAME`);
//     const publishers = data.rows;
//     res.render('all_publishers', {publishers});
// });

// app.get('/all_books/:id', async (req, res) => {
//     const id = req.params.id;

//     const data = await runQuery(`SELECT Book.title, Book.GENRE, BOOK.QUANTITY_IN_STOCK,Book.Publisher, BOOK.PRICE, BOOK.DATE_PUBLISHED, Book.PAGE, WRITER.NAME AS WRITER_NAME FROM BOOK , WRITER
//     WHERE (BOOK.id = ${id}) AND (BOOK.WRITER_ID = WRITER.id )`)

//     res.render('single_book', { books: data.rows});
// });

// app.get('/all_writers/:id', async(req, res) => {
//     console.log(req.params);
//     const id = req.params.id;
//     const writer_data = await runQuery(`SELECT * FROM WRITER WHERE id = ${id}`);
//     const book_data = await runQuery(`Select Book.TITLE, Book.ID, Book.PUBLISHER, Writer.name As WRITER_NAME from Book, Writer where (Book.Writer_id = Writer.id) AND (Book.Writer_id = ${id})`);

//     res.render('single_writer', {writers: writer_data.rows, books: book_data.rows});
// });

// app.get('/all_publishers/:id', async(req, res) => {
//     const id = req.params.id;
//     const publisher_data = await runQuery(`Select * from publisher where name = '${id}'`);
//     const book_data = await runQuery(`Select Book.TITLE, Book.ID, Book.PUBLISHER, Writer.name As WRITER_NAME from Book, Writer where (Book.Writer_id = Writer.id) AND (Book.PUBLISHER = '${id}')`);

//     res.render('single_publisher', {publishers: publisher_data.rows, books: book_data.rows});
// });

const size = data.length;
console.log(size);
console.log(data[0]);
console.log();