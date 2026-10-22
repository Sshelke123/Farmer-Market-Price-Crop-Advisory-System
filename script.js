"use strict";
/* Farmer Sathi – vanilla JS prototype. No frameworks. */
const $ = id => document.getElementById(id);
const store = {
  get(k, d) { try { return localStorage.getItem(k) || d; } catch (e) { return d; } },
  set(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
};

/* ---- Config for the future official price API (data.gov.in / Agmarknet) ---- */
const CONFIG = {
  API_KEY: "",   // paste your free data.gov.in API key here to enable live prices
  RESOURCE: "9ef84268-d588-465a-a308-a864a43d0070"
};

/* ---- Text in both languages ---- */
const T = {
  en: {
    tagline: "Know the Price • Know Your Crop • Calculate Your Profit",
    nav_home: "Home", nav_select: "My Crop", nav_prices: "Mandi Prices", nav_calc: "Profit Calculator",
    nav_crops: "Crop Info", nav_weather: "Weather", nav_season: "Season-wise Crop Advice", nav_team: "Our Team",
    nav_season: "Season-wise Crop Advice",
    season_intro: "Choose the growing season, state and water availability to see crops commonly considered for that situation.",
    season_label: "Growing season", season_water: "Water availability",
    season_suggest: "Suggest crops",
    season_note: "These are general suggestions, not a guarantee of yield. Crop suitability depends on district, soil, sowing dates, rainfall, irrigation and local market. Confirm with your local agriculture officer or KVK before sowing.",
    season_title_kharif: "Kharif (monsoon)", season_title_rabi: "Rabi (winter)", season_title_summer: "Summer",
    season_rain: "Rain-fed", season_irrigated: "Irrigation available",
    season_reason: "Why it may fit", season_caution: "Check before sowing",
    season_kharif_soy: "Soybean", season_kharif_cotton: "Cotton", season_kharif_maize: "Maize", season_kharif_millet: "Pearl millet (bajra)",
    season_rabi_wheat: "Wheat", season_rabi_gram: "Chickpea (gram)", season_rabi_jowar: "Rabi sorghum (jowar)", season_rabi_onion: "Onion",
    season_summer_moong: "Summer mung bean (moong)", season_summer_maize: "Summer maize", season_summer_watermelon: "Watermelon", season_summer_cucumber: "Cucumber",
    season_reason_kharif_soy: "A common monsoon crop in parts of Maharashtra; avoid waterlogged fields.",
    season_reason_kharif_cotton: "Grown in suitable warm regions; needs a long season and careful pest monitoring.",
    season_reason_kharif_maize: "Can suit monsoon sowing where drainage is good.",
    season_reason_kharif_millet: "Often considered in drier areas; check local rainfall and soil.",
    season_reason_rabi_wheat: "Consider where cool weather and timely irrigation are available.",
    season_reason_rabi_gram: "Often suitable for rabi conditions and can use residual soil moisture.",
    season_reason_rabi_jowar: "A traditional option in suitable dryland rabi areas.",
    season_reason_rabi_onion: "Common in parts of Maharashtra; needs suitable seedlings, drainage and market planning.",
    season_reason_summer_moong: "Short-duration option where irrigation is available.",
    season_reason_summer_maize: "Needs reliable irrigation and careful water management.",
    season_reason_summer_watermelon: "Needs warm weather, suitable soil and reliable irrigation.",
    season_reason_summer_cucumber: "Can be considered for warm weather with irrigation and a planned market.",
    season_caution_rain: "Confirm expected rainfall, soil type, seed availability and local sowing window.",
    season_caution_irrigated: "Check water availability for the full crop duration, input cost and expected market demand.",
    offline: "You are offline. The calculator and crop information still work. Market prices and weather need internet.",
    c_prices: "Check mandi rates for your crop.", c_calc: "Find your profit, loss and break-even price.",
    c_crops: "Soil, water, care and harvest tips.", c_weather: "Temperature, rain chance and wind.",
    l_place: "Village / City", ph_place: "e.g. Baramati", l_state: "State", l_crop: "Crop",
    save: "Save", saved: "Saved on this phone.", need_place: "Please type your village or city.",
    sum_none: "Choose your crop and place below to get started.", sum_has: "Your crop",
    demo: "DEMO DATA — NOT LIVE PRICES", live: "Get live prices",
    t_market: "Market", t_min: "Min (₹/qtl)", t_max: "Max (₹/qtl)", t_modal: "Modal (₹/qtl)", t_date: "Arrival date",
    all_states: "All states", no_rows: "No sample data for this crop and state.",
    source: "Data source:", src_demo: "Built-in sample data for demonstration. Not from any market. No last-updated time.",
    src_live: "Agmarknet via data.gov.in. Fetched", agmark: "Open the official Agmarknet portal",
    live_nokey: "Live prices are not set up. Add an API key in script.js (see README). Showing demo data.",
    live_offline: "No internet. Live prices need internet. Showing demo data.",
    live_fail: "Could not get live prices. Showing demo data.", live_empty: "No live records found for this crop and state.",
    i_qty: "Quantity harvested (quintals)", i_price: "Expected selling price (₹ per quintal)", i_seed: "Seed cost (₹)",
    i_fert: "Fertilizer and pesticide cost (₹)", i_labour: "Labour cost (₹)", i_irr: "Irrigation, electricity and fuel (₹)",
    i_trans: "Transport and market fees (₹)", i_other: "Other expenses (₹)", i_margin: "Wanted profit (% over cost)",
    calculate: "Calculate", reset: "Reset",
    e_qty: "Enter a quantity greater than 0.", e_price: "Enter the expected selling price (0 or more).",
    e_neg: "Costs cannot be negative or invalid.", e_margin: "Profit % must be 0 or more.",
    r_profit: "PROFIT", r_loss: "LOSS", r_even: "NO PROFIT, NO LOSS",
    r_rev: "Total sales revenue", r_exp: "Total expenses", r_net_p: "Net profit", r_net_l: "Net loss",
    r_be: "Break-even price (₹/quintal)", r_target: "Target price for wanted profit (₹/quintal)",
    r_hint: "Your selling price is below the break-even price. You lose money on every quintal.",
    k_soil: "Suitable soil", k_water: "Irrigation", k_care: "Care tips", k_harvest: "Harvesting",
    kvk: "This is general advice. For your area, please ask your local agriculture officer or Krishi Vigyan Kendra (KVK).",
    w_get: "Get weather", w_note: "Weather is fetched live from Open-Meteo and needs internet.",
    w_need: "Please type a village or city.", w_notfound: "Place not found. Check the spelling or try a nearby city.",
    w_offline: "No internet. Weather needs internet.", w_fail: "Weather service is not reachable now. Try again later.",
    w_temp: "Temperature", w_rain: "Rain chance today", w_wind: "Wind speed", w_loading: "Loading…",
    f_links: "Useful agricultural links",
    f_note: "Farmer Sathi is a college prototype. Check official sources before making business decisions."
  },
  mr: {
    tagline: "भाव जाणा • पीक जाणा • नफा मोजा",
    nav_home: "मुख्यपृष्ठ", nav_select: "माझे पीक", nav_prices: "बाजारभाव", nav_calc: "नफा-तोटा",
    nav_crops: "पीक माहिती", nav_weather: "हवामान", nav_season: "हंगामानुसार पीक सल्ला", nav_team: "आमची टीम",
    nav_season: "हंगामानुसार पीक सल्ला",
    season_intro: "हंगाम, राज्य आणि पाण्याची उपलब्धता निवडा. त्या परिस्थितीत विचारात घेता येणारी पिके येथे दिसतील.",
    season_label: "पेरणीचा हंगाम", season_water: "पाण्याची उपलब्धता",
    season_suggest: "पिके सुचवा",
    season_note: "ही सर्वसाधारण सूचना आहे; उत्पादनाची हमी नाही. योग्य पीक जिल्हा, माती, पेरणीची वेळ, पाऊस, सिंचन आणि बाजारावर अवलंबून असते. पेरणीपूर्वी स्थानिक कृषी अधिकारी किंवा KVK यांचा सल्ला घ्या.",
    season_title_kharif: "खरीप (पावसाळा)", season_title_rabi: "रब्बी (हिवाळा)", season_title_summer: "उन्हाळी",
    season_rain: "पावसावर", season_irrigated: "सिंचन उपलब्ध",
    season_reason: "का विचार करू शकता", season_caution: "पेरणीपूर्वी तपासा",
    season_kharif_soy: "सोयाबीन", season_kharif_cotton: "कापूस", season_kharif_maize: "मका", season_kharif_millet: "बाजरी",
    season_rabi_wheat: "गहू", season_rabi_gram: "हरभरा", season_rabi_jowar: "रब्बी ज्वारी", season_rabi_onion: "कांदा",
    season_summer_moong: "उन्हाळी मूग", season_summer_maize: "उन्हाळी मका", season_summer_watermelon: "कलिंगड", season_summer_cucumber: "काकडी",
    season_reason_kharif_soy: "महाराष्ट्रातील काही भागांत पावसाळी पीक; शेतात पाणी साचू देऊ नका.",
    season_reason_kharif_cotton: "योग्य उष्ण भागांत घेतले जाते; दीर्घ हंगाम आणि किडींची नियमित पाहणी आवश्यक.",
    season_reason_kharif_maize: "चांगला निचरा असलेल्या जमिनीत खरीप पेरणीसाठी विचार करता येतो.",
    season_reason_kharif_millet: "कमी पावसाच्या भागांत पर्याय; स्थानिक पाऊस व माती तपासा.",
    season_reason_rabi_wheat: "थंड हवामान आणि वेळेवर सिंचन उपलब्ध असेल तर विचार करा.",
    season_reason_rabi_gram: "रब्बी हंगामासाठी योग्य पर्याय; जमिनीतील उरलेल्या ओलाव्याचा उपयोग होऊ शकतो.",
    season_reason_rabi_jowar: "योग्य कोरडवाहू रब्बी भागांत पारंपरिक पीक.",
    season_reason_rabi_onion: "महाराष्ट्रातील काही भागांत घेतले जाते; रोपे, निचरा आणि बाजाराचे नियोजन महत्त्वाचे.",
    season_reason_summer_moong: "सिंचन उपलब्ध असल्यास कमी कालावधीचा पर्याय.",
    season_reason_summer_maize: "नियमित सिंचन आणि पाण्याचे नियोजन आवश्यक.",
    season_reason_summer_watermelon: "उष्ण हवामान, योग्य माती आणि नियमित सिंचन आवश्यक.",
    season_reason_summer_cucumber: "उष्ण हवामानात सिंचन आणि बाजाराचे नियोजन असल्यास विचार करता येतो.",
    season_caution_rain: "अपेक्षित पाऊस, माती, बियाणे उपलब्धता आणि स्थानिक पेरणीची वेळ तपासा.",
    season_caution_irrigated: "पूर्ण पीक कालावधीसाठी पाणी, खर्च आणि बाजारातील मागणी तपासा.",
    offline: "तुम्ही ऑफलाइन आहात. कॅल्क्युलेटर आणि पीक माहिती चालतील. बाजारभाव व हवामानासाठी इंटरनेट लागते.",
    c_prices: "तुमच्या पिकाचे बाजारभाव पहा.", c_calc: "नफा, तोटा आणि समतोल भाव काढा.",
    c_crops: "माती, पाणी, काळजी व काढणीची माहिती.", c_weather: "तापमान, पावसाची शक्यता आणि वारा.",
    l_place: "गाव / शहर", ph_place: "उदा. बारामती", l_state: "राज्य", l_crop: "पीक",
    save: "जतन करा", saved: "या फोनवर जतन केले.", need_place: "कृपया गाव किंवा शहर लिहा.",
    sum_none: "सुरू करण्यासाठी खाली पीक आणि ठिकाण निवडा.", sum_has: "तुमचे पीक",
    demo: "डेमो डेटा — प्रत्यक्ष (लाइव्ह) भाव नाहीत", live: "लाइव्ह भाव मिळवा",
    t_market: "बाजार", t_min: "किमान (₹/क्विं.)", t_max: "कमाल (₹/क्विं.)", t_modal: "सर्वसाधारण (₹/क्विं.)", t_date: "आवक तारीख",
    all_states: "सर्व राज्ये", no_rows: "या पिकासाठी आणि राज्यासाठी नमुना डेटा नाही.",
    source: "डेटा स्रोत:", src_demo: "प्रात्यक्षिकासाठी अंगभूत नमुना डेटा. कोणत्याही बाजारातील नाही. अद्ययावत वेळ नाही.",
    src_live: "Agmarknet (data.gov.in द्वारे). मिळवले", agmark: "अधिकृत Agmarknet पोर्टल उघडा",
    live_nokey: "लाइव्ह भाव सुरू केलेले नाहीत. script.js मध्ये API की टाका (README पहा). डेमो डेटा दाखवत आहे.",
    live_offline: "इंटरनेट नाही. लाइव्ह भावांसाठी इंटरनेट लागते. डेमो डेटा दाखवत आहे.",
    live_fail: "लाइव्ह भाव मिळाले नाहीत. डेमो डेटा दाखवत आहे.", live_empty: "या पिकासाठी आणि राज्यासाठी लाइव्ह नोंदी सापडल्या नाहीत.",
    i_qty: "उत्पादन (क्विंटल)", i_price: "अपेक्षित विक्री भाव (₹ प्रति क्विंटल)", i_seed: "बियाणे खर्च (₹)",
    i_fert: "खते व कीटकनाशक खर्च (₹)", i_labour: "मजुरी खर्च (₹)", i_irr: "सिंचन, वीज व इंधन (₹)",
    i_trans: "वाहतूक व बाजार शुल्क (₹)", i_other: "इतर खर्च (₹)", i_margin: "हवा असलेला नफा (खर्चावर %)",
    calculate: "हिशोब करा", reset: "पुन्हा सुरू करा",
    e_qty: "० पेक्षा जास्त उत्पादन लिहा.", e_price: "अपेक्षित विक्री भाव लिहा (० किंवा जास्त).",
    e_neg: "खर्च उणे किंवा चुकीचा असू शकत नाही.", e_margin: "नफा % हा ० किंवा जास्त असावा.",
    r_profit: "नफा", r_loss: "तोटा", r_even: "ना नफा, ना तोटा",
    r_rev: "एकूण विक्री उत्पन्न", r_exp: "एकूण खर्च", r_net_p: "निव्वळ नफा", r_net_l: "निव्वळ तोटा",
    r_be: "समतोल भाव (₹/क्विंटल)", r_target: "हव्या नफ्यासाठी लक्ष्य भाव (₹/क्विंटल)",
    r_hint: "तुमचा विक्री भाव समतोल भावापेक्षा कमी आहे. प्रत्येक क्विंटलवर तोटा होतो.",
    k_soil: "योग्य माती", k_water: "सिंचन", k_care: "काळजी", k_harvest: "काढणी",
    kvk: "ही सर्वसाधारण माहिती आहे. तुमच्या भागासाठी स्थानिक कृषी अधिकारी किंवा कृषी विज्ञान केंद्राचा (KVK) सल्ला घ्या.",
    w_get: "हवामान पहा", w_note: "हवामान Open-Meteo कडून थेट मिळते आणि त्यासाठी इंटरनेट लागते.",
    w_need: "कृपया गाव किंवा शहर लिहा.", w_notfound: "ठिकाण सापडले नाही. स्पेलिंग तपासा किंवा जवळचे शहर लिहा.",
    w_offline: "इंटरनेट नाही. हवामानासाठी इंटरनेट लागते.", w_fail: "हवामान सेवा सध्या उपलब्ध नाही. नंतर पुन्हा प्रयत्न करा.",
    w_temp: "तापमान", w_rain: "आजची पावसाची शक्यता", w_wind: "वाऱ्याचा वेग", w_loading: "लोड होत आहे…",
    f_links: "उपयुक्त कृषी दुवे",
    f_note: "फार्मर साथी हा महाविद्यालयीन प्रोटोटाइप आहे. व्यवसायाचे निर्णय घेण्यापूर्वी अधिकृत स्रोत तपासा."
  }
  ,
  hi: {
    tagline:"भाव जानें • फसल जानें • मुनाफ़ा गिनें",
    nav_home:"होम", nav_select:"मेरी फसल", nav_prices:"मंडी भाव", nav_calc:"लाभ कैलकुलेटर",
    nav_crops:"फसल जानकारी", nav_weather:"मौसम", nav_season:"मौसम के अनुसार फसल", nav_team:"हमारी टीम",
    offline:"आप ऑफ़लाइन हैं। कैलकुलेटर और फसल की जानकारी काम करती है; मंडी भाव और मौसम के लिए इंटरनेट चाहिए।",
    c_prices:"अपनी फसल के मंडी भाव देखें।", c_calc:"लाभ, नुकसान और लागत-बराबर भाव निकालें।",
    c_crops:"मिट्टी, पानी, देखभाल और कटाई की जानकारी।", c_weather:"तापमान, बारिश की संभावना और हवा।",
    l_place:"गाँव / शहर", ph_place:"जैसे बारामती", l_state:"राज्य", l_crop:"फसल",
    save:"सेव करें", saved:"इस डिवाइस पर सेव किया गया।", need_place:"कृपया गाँव या शहर लिखें।",
    sum_none:"शुरू करने के लिए नीचे अपनी फसल और स्थान चुनें।", sum_has:"आपकी फसल",
    demo:"डेमो डेटा — लाइव मंडी भाव नहीं", live:"लाइव भाव प्राप्त करें",
    t_market:"मंडी", t_min:"न्यूनतम (₹/क्विंटल)", t_max:"अधिकतम (₹/क्विंटल)", t_modal:"मॉडल (₹/क्विंटल)", t_date:"आवक तारीख",
    all_states:"सभी राज्य", no_rows:"इस फसल और राज्य के लिए नमूना डेटा उपलब्ध नहीं है।",
    source:"डेटा स्रोत:", src_demo:"केवल प्रदर्शन के लिए नमूना डेटा; किसी वास्तविक मंडी से नहीं।",
    src_live:"Agmarknet / data.gov.in से प्राप्त", agmark:"आधिकारिक Agmarknet पोर्टल खोलें",
    live_nokey:"लाइव भाव सेट नहीं हैं। script.js में API key जोड़ें। अभी डेमो डेटा दिख रहा है।",
    live_offline:"इंटरनेट नहीं है। लाइव भाव के लिए इंटरनेट चाहिए। डेमो डेटा दिख रहा है।",
    live_fail:"लाइव भाव नहीं मिल सके। डेमो डेटा दिखाया जा रहा है।", live_empty:"इस फसल और राज्य के लिए लाइव रिकॉर्ड नहीं मिले।",
    i_qty:"उत्पादन (क्विंटल)", i_price:"अपेक्षित बिक्री भाव (₹ प्रति क्विंटल)", i_seed:"बीज की लागत (₹)",
    i_fert:"खाद और कीटनाशक लागत (₹)", i_labour:"मजदूरी लागत (₹)", i_irr:"सिंचाई, बिजली और ईंधन (₹)",
    i_trans:"परिवहन और मंडी शुल्क (₹)", i_other:"अन्य खर्च (₹)", i_margin:"वांछित लाभ (% लागत पर)",
    calculate:"गणना करें", reset:"रीसेट करें", e_qty:"0 से अधिक मात्रा दर्ज करें।",
    e_price:"बिक्री भाव 0 या उससे अधिक दर्ज करें।", e_neg:"खर्च नकारात्मक या अमान्य नहीं हो सकते।",
    e_margin:"लाभ प्रतिशत 0 या उससे अधिक होना चाहिए।", r_profit:"लाभ", r_loss:"नुकसान",
    r_even:"न लाभ, न नुकसान", r_rev:"कुल बिक्री आय", r_exp:"कुल खर्च", r_net_p:"शुद्ध लाभ",
    r_net_l:"शुद्ध नुकसान", r_be:"लागत-बराबर भाव (₹/क्विंटल)", r_target:"वांछित लाभ के लिए भाव (₹/क्विंटल)",
    r_hint:"आपका बिक्री भाव लागत-बराबर भाव से कम है। हर क्विंटल पर नुकसान हो रहा है।",
    k_soil:"उपयुक्त मिट्टी", k_water:"सिंचाई", k_care:"देखभाल के सुझाव", k_harvest:"कटाई",
    kvk:"यह सामान्य जानकारी है। अपने क्षेत्र के लिए स्थानीय कृषि अधिकारी या कृषि विज्ञान केंद्र (KVK) से सलाह लें।",
    w_get:"मौसम देखें", w_note:"मौसम Open-Meteo से लाइव मिलता है और इंटरनेट चाहिए।",
    w_need:"कृपया गाँव या शहर लिखें।", w_notfound:"स्थान नहीं मिला। वर्तनी जाँचें या नज़दीकी शहर आज़माएँ।",
    w_offline:"इंटरनेट नहीं है। मौसम के लिए इंटरनेट चाहिए।", w_fail:"मौसम सेवा अभी उपलब्ध नहीं है। बाद में प्रयास करें।",
    w_temp:"तापमान", w_rain:"आज बारिश की संभावना", w_wind:"हवा की गति", w_loading:"लोड हो रहा है…",
    f_links:"उपयोगी कृषि लिंक", f_note:"Farmer Sathi एक कॉलेज प्रोटोटाइप है। खेती से जुड़े निर्णयों से पहले आधिकारिक स्रोत जाँचें।",
    season_intro:"मौसम, मिट्टी और पानी चुनें और संभावित फसलों के सुझाव देखें।",
    season_label:"खेती का मौसम", soil_label:"मिट्टी का प्रकार", water_label:"पानी की उपलब्धता",
    recommend:"फसल सुझाएँ", season_disclaimer:"ये सामान्य सुझाव हैं। बुवाई की तारीख और किस्म के लिए स्थानीय KVK या कृषि अधिकारी से सलाह लें।",
    team_intro:"Farmer Sathi परियोजना टीम", team_member:"परियोजना टीम सदस्य",
    season_kharif:"खरीफ / मानसून", season_rabi:"रबी / सर्दी", season_zaid:"जायद / गर्मी",
    soil_any:"कोई भी / पता नहीं", soil_black:"काली मिट्टी", soil_loamy:"दोमट मिट्टी", soil_sandy:"रेतीली / हल्की मिट्टी",
    water_rain:"मुख्यतः बारिश", water_limited:"सीमित सिंचाई", water_good:"अच्छी सिंचाई",
    rec_title:"सुझाई गई फसलें", rec_reason:"क्यों विचार करें", rec_tip:"ध्यान दें", no_crop_match:"चुने गए विकल्पों के लिए कोई सुझाव नहीं। विकल्प बदलकर देखें।"
  }

};

const STATES = [["Maharashtra","महाराष्ट्र"],["Madhya Pradesh","मध्य प्रदेश"],["Gujarat","गुजरात"],
  ["Karnataka","कर्नाटक"],["Rajasthan","राजस्थान"],["Telangana","तेलंगणा"],["Andhra Pradesh","आंध्र प्रदेश"],
  ["Uttar Pradesh","उत्तर प्रदेश"],["Punjab","पंजाब"],["Haryana","हरियाणा"]];
const CROP_NAMES = { onion:["Onion","कांदा"], tomato:["Tomato","टोमॅटो"], soybean:["Soybean","सोयाबीन"],
  cotton:["Cotton","कापूस"], wheat:["Wheat","गहू"], maize:["Maize","मका"] };
const API_COMMODITY = { onion:"Onion", tomato:"Tomato", soybean:"Soyabean", cotton:"Cotton", wheat:"Wheat", maize:"Maize" };

/* ---- Crop advisory: [English, Marathi] ---- */
const CROPS = {
  onion: { soil:["Well-drained loam or sandy loam, pH 6–7.","चांगला निचरा होणारी पोयटा किंवा वाळूमिश्रित जमीन, pH ६–७."],
    water:["Light, frequent watering. Stop watering 10–15 days before harvest.","हलके आणि वारंवार पाणी द्या. काढणीच्या १०–१५ दिवस आधी पाणी बंद करा."],
    care:["Use healthy seedlings, keep the field weed-free, watch for thrips and purple blotch.","निरोगी रोपे वापरा, शेत तणमुक्त ठेवा, फुलकिडे व करपा रोगावर लक्ष ठेवा."],
    harvest:["Ready in about 3–5 months when tops fall over. Dry in shade for a few days before storage.","साधारण ३–५ महिन्यांत पात पडल्यावर तयार. साठवणीपूर्वी काही दिवस सावलीत सुकवा."] },
  tomato: { soil:["Well-drained loam rich in organic matter, pH 6–7.","सेंद्रिय पदार्थ असलेली निचऱ्याची पोयटा जमीन, pH ६–७."],
    water:["Regular, even watering. Avoid water standing around plants.","नियमित व समप्रमाणात पाणी द्या. झाडांजवळ पाणी साचू देऊ नका."],
    care:["Stake the plants, remove weeds, rotate crops, watch for wilt and leaf curl.","झाडांना काठीचा आधार द्या, तण काढा, पिकांची फेरपालट करा, मर व पर्णगुच्छ रोगावर लक्ष ठेवा."],
    harvest:["First picking in about 2–3 months. Pick at colour-turning stage for distant markets.","पहिली तोडणी साधारण २–३ महिन्यांत. दूरच्या बाजारासाठी रंग बदलू लागल्यावर तोडा."] },
  soybean: { soil:["Well-drained medium to heavy soil, pH 6–7. Avoid waterlogged fields.","चांगला निचरा होणारी मध्यम ते भारी जमीन, pH ६–७. पाणी साचणारे शेत टाळा."],
    water:["Mostly rain-fed in kharif. Give protective water at flowering and pod filling if rain fails.","खरिपात मुख्यतः पावसावर. पाऊस न पडल्यास फुलोरा व शेंगा भरताना संरक्षित पाणी द्या."],
    care:["Treat seed before sowing, keep weeds down in first 30–40 days, watch for stem fly and pod borer.","पेरणीपूर्वी बीजप्रक्रिया करा, पहिले ३०–४० दिवस तण नियंत्रण ठेवा, खोडमाशी व शेंगा पोखरणारी अळी पाहा."],
    harvest:["Ready in about 90–110 days when leaves turn yellow and pods dry. Harvest before pods shatter.","साधारण ९०–११० दिवसांत पाने पिवळी होऊन शेंगा सुकल्यावर तयार. शेंगा फुटण्यापूर्वी काढणी करा."] },
  cotton: { soil:["Deep black (regur) soil with good drainage, pH 6–8.","खोल काळी (रेगूर) जमीन, चांगला निचरा, pH ६–८."],
    water:["Needs water at flowering and boll formation. Drip irrigation saves water.","फुलोरा व बोंडे लागताना पाणी लागते. ठिबक सिंचनाने पाणी वाचते."],
    care:["Keep correct plant spacing, remove weeds, scout often for pink bollworm and sucking pests.","योग्य अंतर ठेवा, तण काढा, गुलाबी बोंडअळी व रसशोषक किडींसाठी नियमित पाहणी करा."],
    harvest:["Pick fully opened, dry bolls in 2–3 rounds over several weeks. Keep cotton clean of leaves and soil.","पूर्ण उमललेली कोरडी बोंडे काही आठवड्यांत २–३ वेचणीत काढा. कापूस पाला व मातीपासून स्वच्छ ठेवा."] },
  wheat: { soil:["Well-drained loam or clay loam, pH 6–7.5.","चांगला निचरा होणारी पोयटा किंवा चिकणमिश्रित जमीन, pH ६–७.५."],
    water:["Water at crown root stage (about 20–25 days), tillering, flowering and grain filling.","मुकुटमुळे अवस्था (सुमारे २०–२५ दिवस), फुटवे, फुलोरा व दाणे भरताना पाणी द्या."],
    care:["Sow in rabi on time, use certified seed, remove weeds early, watch for rust.","रब्बीत वेळेवर पेरणी करा, प्रमाणित बियाणे वापरा, तण लवकर काढा, तांबेरा रोगावर लक्ष ठेवा."],
    harvest:["Ready in about 4–5 months when grains are hard and straw is golden. Thresh after drying.","साधारण ४–५ महिन्यांत दाणे कडक होऊन काड सोनेरी झाल्यावर तयार. सुकल्यावर मळणी करा."] },
  maize: { soil:["Well-drained fertile loam, pH 5.5–7.5. Does not tolerate waterlogging.","चांगला निचरा होणारी सुपीक पोयटा जमीन, pH ५.५–७.५. पाणी साचलेले सहन होत नाही."],
    water:["Water at knee-high stage, tasselling and silking. These stages are most sensitive to dry spells.","गुडघ्याएवढ्या उंचीवर, तुरा व रेशीम येताना पाणी द्या. या अवस्था कोरड्या काळाला सर्वाधिक संवेदनशील."],
    care:["Keep weeds down in first 30–45 days, earth up plants, watch for fall armyworm.","पहिले ३०–४५ दिवस तण नियंत्रण ठेवा, झाडांना मातीची भर द्या, लष्करी अळीवर लक्ष ठेवा."],
    harvest:["Ready in about 3.5–5 months when cobs dry and husks turn brown. Dry grain to safe moisture before storage.","साधारण ३.५–५ महिन्यांत कणसे सुकून आवरण तपकिरी झाल्यावर तयार. साठवणीपूर्वी दाणे योग्य ओलाव्यापर्यंत सुकवा."] }
};

/* ---- Season-wise crop suggestions (general guidance; verify locally) ---- */
const SEASON_CROPS = {
  kharif: [
    {name:"Soybean", mr:"सोयाबीन", hi:"सोयाबीन", soils:["black","loamy"], water:["rain","limited","good"], reason:"A common monsoon crop; suitable varieties and sowing dates depend on your district.", tip:"Avoid waterlogging and use locally recommended seed."},
    {name:"Maize", mr:"मका", hi:"मक्का", soils:["loamy","sandy"], water:["rain","limited","good"], reason:"Can be considered in suitable monsoon areas with drainage.", tip:"Drain excess rainwater and follow local spacing advice."},
    {name:"Cotton", mr:"कापूस", hi:"कपास", soils:["black","loamy"], water:["rain","limited","good"], reason:"Often grown in suitable black-soil regions.", tip:"Check local pest advisories and avoid unnecessary pesticide use."},
    {name:"Paddy (Rice)", mr:"भात", hi:"धान", soils:["loamy","sandy"], water:["rain","good"], reason:"Best considered where rainfall and water availability are adequate.", tip:"Choose varieties recommended for your district."}
  ],
  rabi: [
    {name:"Wheat", mr:"गहू", hi:"गेहूँ", soils:["black","loamy"], water:["limited","good"], reason:"A winter crop where the climate and irrigation suit it.", tip:"Sow at the locally recommended time and irrigate at critical stages."},
    {name:"Chickpea (Gram)", mr:"हरभरा", hi:"चना", soils:["black","loamy"], water:["rain","limited","good"], reason:"Often suitable for post-monsoon conditions and residual soil moisture.", tip:"Avoid waterlogging and use certified seed."},
    {name:"Mustard", mr:"मोहरी", hi:"सरसों", soils:["loamy","sandy"], water:["limited","good"], reason:"Can suit cooler, relatively dry winter conditions.", tip:"Confirm local suitability and recommended variety."},
    {name:"Onion", mr:"कांदा", hi:"प्याज़", soils:["black","loamy","sandy"], water:["limited","good"], reason:"Can be grown in suitable regions with well-drained soil.", tip:"Avoid standing water and plan storage before harvest."}
  ],
  zaid: [
    {name:"Moong (Green gram)", mr:"मूग", hi:"मूँग", soils:["loamy","sandy"], water:["limited","good"], reason:"A short-duration option in suitable summer areas.", tip:"Summer crops need careful water planning."},
    {name:"Watermelon", mr:"कलिंगड", hi:"तरबूज़", soils:["sandy","loamy"], water:["good"], reason:"May suit warm weather and well-drained soil with irrigation.", tip:"Check market access and water availability before planting."},
    {name:"Cucumber", mr:"काकडी", hi:"खीरा", soils:["loamy","sandy"], water:["good"], reason:"A warm-season crop that needs consistent moisture.", tip:"Use trellising or spacing advice suitable for the variety."},
    {name:"Fodder Maize", mr:"चारा मका", hi:"चारा मक्का", soils:["black","loamy","sandy"], water:["limited","good"], reason:"Can be considered where fodder is needed and water is available.", tip:"Plan harvest around livestock feed needs."}
  ]
};
function renderSeasonAdvice() {
  const seasonEl = $("seasonSelect"), soilEl = $("soilSelect"), waterEl = $("waterSelect"), out = $("seasonResults");
  if (!seasonEl || !soilEl || !waterEl || !out) return;
  const season = seasonEl.value || "kharif", soil = soilEl.value || "any", water = waterEl.value || "rain";
  const languageKey = lang === "mr" ? "mr" : lang === "hi" ? "hi" : "name";
  const filtered = (SEASON_CROPS[season] || []).filter(c =>
    (soil === "any" || c.soils.includes(soil)) && c.water.includes(water));
  const heading = lang === "hi" ? "सुझाई गई फसलें" : lang === "mr" ? "सुचवलेली पिके" : "Suggested crops";
  const reasonLabel = lang === "hi" ? "क्यों विचार करें" : lang === "mr" ? "का विचार करावा" : "Why consider it";
  const tipLabel = lang === "hi" ? "ध्यान दें" : lang === "mr" ? "लक्षात ठेवा" : "Keep in mind";
  const disclaimer = lang === "hi" ? "ये सामान्य सुझाव हैं। स्थानीय कृषि अधिकारी से पुष्टि करें।" :
    lang === "mr" ? "हे सर्वसाधारण सल्ले आहेत. स्थानिक कृषी अधिकाऱ्यांकडून खात्री करा." :
    "These are general suggestions. Confirm with your local agriculture officer.";
  if (!filtered.length) {
    out.innerHTML = `<p class="msg">${lang === "hi" ? "इन विकल्पों के लिए सुझाव नहीं मिले। विकल्प बदलकर देखें।" : lang === "mr" ? "या पर्यायांसाठी पीक सुचवता आले नाही. पर्याय बदलून पाहा." : "No suggestions for these options. Try changing the filters."}</p>`;
    return;
  }
  out.innerHTML = `<p class="note" style="grid-column:1/-1">${esc(disclaimer)}</p>` + filtered.map(c => {
    const name = c[languageKey];
    const why = lang === "hi" ? "यह फसल इस मौसम में कुछ क्षेत्रों के लिए उपयुक्त हो सकती है; अपने जिले की सलाह जाँचें।" :
      lang === "mr" ? "हे पीक काही भागांत या हंगामासाठी योग्य ठरू शकते; आपल्या जिल्ह्याचा सल्ला तपासा." : c.reason;
    const care = lang === "hi" ? "स्थानीय बुवाई समय, किस्म और पानी की उपलब्धता की पुष्टि करें।" :
      lang === "mr" ? "स्थानिक पेरणीची वेळ, वाण आणि पाण्याची उपलब्धता तपासा." : c.tip;
    return `<article class="season-card"><span class="crop-tag">${heading}</span><h3>🌱 ${esc(name)}</h3><p><strong>${reasonLabel}:</strong> ${esc(why)}</p><p><strong>${tipLabel}:</strong> ${esc(care)}</p></article>`;
  }).join("");
}

/* ---- DEMO sample prices (NOT real). Columns: crop, state, market, min, max, modal ---- */
const SAMPLE_DATE = "2026-10-20 (sample)";
const SAMPLE = [
  ["onion","Maharashtra","Lasalgaon",1100,2100,1650], ["onion","Maharashtra","Pune",1200,2300,1800],
  ["onion","Madhya Pradesh","Indore",1000,1900,1500],
  ["tomato","Maharashtra","Narayangaon",800,2200,1500], ["tomato","Maharashtra","Nashik",700,1900,1300],
  ["tomato","Karnataka","Bengaluru",900,2400,1700],
  ["soybean","Maharashtra","Latur",4200,4900,4650], ["soybean","Maharashtra","Akola",4100,4850,4600],
  ["soybean","Madhya Pradesh","Indore",4250,4950,4700],
  ["cotton","Maharashtra","Yavatmal",6800,7500,7200], ["cotton","Maharashtra","Wardha",6700,7450,7150],
  ["cotton","Gujarat","Rajkot",6900,7600,7300],
  ["wheat","Maharashtra","Nagpur",2400,2800,2600], ["wheat","Madhya Pradesh","Indore",2450,2900,2700],
  ["wheat","Gujarat","Rajkot",2500,2950,2750],
  ["maize","Maharashtra","Jalgaon",1900,2250,2100], ["maize","Karnataka","Davangere",1950,2300,2150],
  ["maize","Maharashtra","Sangli",1850,2200,2050]
].map(r => ({ crop:r[0], state:r[1], market:r[2], min:r[3], max:r[4], modal:r[5], date:SAMPLE_DATE }));

/* ---- State ---- */
let lang = ["en", "mr", "hi"].includes(store.get("fs_lang", "mr")) ? store.get("fs_lang", "mr") : "mr";
let priceMode = "demo", liveRows = [], liveTime = "", priceNote = "";
let lastCalc = null, activeCrop = store.get("fs_crop", "onion");
if (!CROPS[activeCrop]) activeCrop = "onion";

const t = k => (T[lang] && T[lang][k]) || T.en[k] || k;
const L = () => (lang === "en" ? 0 : 1);
const inr = n => "₹ " + n.toLocaleString("en-IN", { maximumFractionDigits: 2 });

/* ---- Language ---- */
function fillSelect(el, items, withAll) {
  const prev = el.value;
  el.innerHTML = "";
  if (withAll) el.add(new Option(t("all_states"), "all"));
  items.forEach(([v, label]) => el.add(new Option(label, v)));
  if (prev && [...el.options].some(o => o.value === prev)) el.value = prev;
}
function applyLang() {
  document.documentElement.lang = lang;
  document.querySelectorAll("[data-i18n]").forEach(e => e.textContent = t(e.dataset.i18n));
  document.querySelectorAll("[data-i18n-ph]").forEach(e => e.placeholder = t(e.dataset.i18nPh));
  $("langBtn").textContent = lang === "en" ? "मराठी / हिन्दी" : lang === "mr" ? "हिन्दी / English" : "English / मराठी";
  const stateItems = STATES.map(s => [s[0], s[L()]]);
  const cropItems = Object.keys(CROP_NAMES).map(k => [k, CROP_NAMES[k][L()]]);
  fillSelect($("state"), stateItems); fillSelect($("fState"), stateItems, true);
  fillSelect($("seasonState"), stateItems);
  fillSelect($("crop"), cropItems); fillSelect($("fCrop"), cropItems);
  const seasonSelect = $("seasonSelect");
  if (seasonSelect) {
    seasonSelect.options[0].text = lang === "hi" ? t("season_kharif") : lang === "mr" ? "खरीप / पावसाळा" : "Kharif / Monsoon";
    seasonSelect.options[1].text = lang === "hi" ? t("season_rabi") : lang === "mr" ? "रब्बी / हिवाळा" : "Rabi / Winter";
    seasonSelect.options[2].text = lang === "hi" ? t("season_zaid") : lang === "mr" ? "उन्हाळी / झायद" : "Zaid / Summer";
    const soil = $("soilSelect"), water = $("waterSelect");
    if (soil && water) {
      [...soil.options].forEach((o,i) => o.text = lang === "hi" ? [t("soil_any"),t("soil_black"),t("soil_loamy"),t("soil_sandy")][i] : lang === "mr" ? ["कोणतीही / माहित नाही","काळी माती","पोयटा माती","वाळूमिश्रित / हलकी माती"][i] : ["Any / Not sure","Black soil","Loamy soil","Sandy / light soil"][i]);
      [...water.options].forEach((o,i) => o.text = lang === "hi" ? [t("water_rain"),t("water_limited"),t("water_good")][i] : lang === "mr" ? ["मुख्यतः पाऊस","मर्यादित सिंचन","चांगले सिंचन"][i] : ["Mostly rainfall","Limited irrigation","Good irrigation"][i]);
    }
  }
  renderSummary(); renderPrices(); renderCropTabs(); renderCropInfo(); renderSeasonAdvice();
  if (lastCalc) showResult(lastCalc);
  if (!$("calcErr").dataset.key) $("calcErr").textContent = "";
  else $("calcErr").textContent = t($("calcErr").dataset.key);
}
$("langBtn").addEventListener("click", () => {
  lang = lang === "mr" ? "hi" : lang === "hi" ? "en" : "mr";
  store.set("fs_lang", lang);
  applyLang();
});

/* ---- A. Location and crop ---- */
function loadSaved() {
  $("place").value = store.get("fs_place", "");
  $("wPlace").value = $("place").value;
  const st = store.get("fs_state", "Maharashtra");
  if (STATES.some(s => s[0] === st)) { $("state").value = st; $("fState").value = st; }
  $("crop").value = activeCrop; $("fCrop").value = activeCrop;
  if ($("seasonState")) $("seasonState").value = st;
}
function renderSummary() {
  const place = store.get("fs_place", ""), crop = store.get("fs_crop", "");
  if (!place && !crop) { $("summary").textContent = t("sum_none"); return; }
  const st = STATES.find(s => s[0] === store.get("fs_state", ""));
  const cn = CROP_NAMES[crop] ? CROP_NAMES[crop][L()] : "";
  $("summary").textContent = `${t("sum_has")}: ${cn} — ${[place, st ? st[L()] : ""].filter(Boolean).join(", ")}`;
}
$("saveBtn").addEventListener("click", () => {
  const place = $("place").value.trim();
  if (!place) { $("saveMsg").textContent = t("need_place"); return; }
  store.set("fs_place", place); store.set("fs_state", $("state").value); store.set("fs_crop", $("crop").value);
  activeCrop = $("crop").value;
  $("fCrop").value = activeCrop; $("fState").value = $("state").value; $("wPlace").value = place;
  priceMode = "demo"; priceNote = "";
  $("saveMsg").textContent = t("saved");
  renderSummary(); renderPrices(); renderCropTabs(); renderCropInfo(); renderSeasonAdvice();
});

/* ---- B. Mandi prices ---- */
/* Future official API: returns rows {market,min,max,modal,date}. Needs CONFIG.API_KEY. */
async function fetchLivePrices(crop, state) {
  if (!CONFIG.API_KEY) throw new Error("NO_KEY");
  const q = new URLSearchParams({ "api-key": CONFIG.API_KEY, format: "json", limit: "20",
    "filters[commodity]": API_COMMODITY[crop] });
  if (state !== "all") q.set("filters[state]", state);
  const res = await fetch(`https://api.data.gov.in/resource/${CONFIG.RESOURCE}?${q}`);
  if (!res.ok) throw new Error("HTTP " + res.status);
  const data = await res.json();
  return (data.records || []).map(r => ({ market: r.market, min: +r.min_price, max: +r.max_price,
    modal: +r.modal_price, date: r.arrival_date, state: r.state }));
}
function renderPrices() {
  const crop = $("fCrop").value, state = $("fState").value;
  const rows = priceMode === "live" ? liveRows : SAMPLE.filter(r => r.crop === crop && (state === "all" || r.state === state));
  $("priceBody").innerHTML = rows.length ? rows.map(r =>
    `<tr><td>${esc(r.market)}</td><td class="n">${r.min}</td><td class="n">${r.max}</td><td class="n">${r.modal}</td><td>${esc(r.date)}</td></tr>`
  ).join("") : `<tr><td colspan="5">${t("no_rows")}</td></tr>`;
  document.querySelector(".demo").hidden = priceMode === "live";
  $("priceSrc").textContent = priceMode === "live" ? `${t("src_live")} ${liveTime}.` : t("src_demo");
  $("priceMsg").textContent = priceNote ? t(priceNote) : "";
}
function esc(s) { return String(s).replace(/[&<>"]/g, c => ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;" }[c])); }
["fCrop", "fState"].forEach(id => $(id).addEventListener("change", () => { priceMode = "demo"; priceNote = ""; renderPrices(); }));
$("liveBtn").addEventListener("click", async () => {
  priceMode = "demo"; priceNote = "";
  try {
    if (!navigator.onLine) throw new Error("OFFLINE");
    liveRows = await fetchLivePrices($("fCrop").value, $("fState").value);
    if (!liveRows.length) { priceNote = "live_empty"; }
    else { priceMode = "live"; liveTime = new Date().toLocaleString(lang === "en" ? "en-IN" : "mr-IN"); }
  } catch (e) {
    priceNote = e.message === "NO_KEY" ? "live_nokey" : e.message === "OFFLINE" ? "live_offline" : "live_fail";
  }
  renderPrices();
});

/* ---- C. Profit / loss calculator (works fully offline) ---- */
function num(el) { return el.value.trim() === "" ? NaN : Number(el.value); }
function setErr(key) { $("calcErr").dataset.key = key || ""; $("calcErr").textContent = key ? t(key) : ""; }
$("calcForm").addEventListener("submit", e => {
  e.preventDefault();
  const qty = num($("qty")), price = num($("price")), margin = num($("margin"));
  const costs = [...document.querySelectorAll(".exp")].map(i => i.value.trim() === "" ? 0 : Number(i.value));
  $("result").hidden = true; lastCalc = null;
  if (!(qty > 0)) return setErr("e_qty");
  if (!(price >= 0)) return setErr("e_price");
  if (costs.some(c => !(c >= 0))) return setErr("e_neg");
  if (!(margin >= 0)) return setErr("e_margin");
  setErr("");
  const expenses = costs.reduce((a, b) => a + b, 0), revenue = qty * price, net = revenue - expenses;
  const be = expenses / qty;
  lastCalc = { revenue, expenses, net, be, target: be * (1 + margin / 100), price };
  showResult(lastCalc);
});
function showResult(c) {
  const kind = c.net > 0 ? "profit" : c.net < 0 ? "loss" : "even";
  const head = { profit: t("r_profit") + " ✅", loss: t("r_loss") + " ⚠️", even: t("r_even") }[kind];
  const box = $("result");
  box.className = "result " + (kind === "loss" ? "loss" : "profit");
  box.innerHTML = `<h3>${head}</h3><dl>
    <dt>${t("r_rev")}</dt><dd>${inr(c.revenue)}</dd>
    <dt>${t("r_exp")}</dt><dd>${inr(c.expenses)}</dd>
    <dt>${kind === "loss" ? t("r_net_l") : t("r_net_p")}</dt><dd>${inr(Math.abs(c.net))}</dd>
    <dt>${t("r_be")}</dt><dd>${inr(c.be)}</dd>
    <dt>${t("r_target")}</dt><dd>${inr(c.target)}</dd></dl>
    ${c.price < c.be ? `<p>${t("r_hint")}</p>` : ""}`;
  box.hidden = false;
}
$("resetBtn").addEventListener("click", () => {
  $("calcForm").reset(); $("margin").value = 20; setErr(""); $("result").hidden = true; lastCalc = null;
});

/* ---- D. Crop information ---- */
function renderCropTabs() {
  $("cropTabs").innerHTML = Object.keys(CROP_NAMES).map(k =>
    `<button type="button" role="tab" data-c="${k}" aria-selected="${k === activeCrop}">${CROP_NAMES[k][L()]}</button>`).join("");
  $("cropTabs").querySelectorAll("button").forEach(b => b.addEventListener("click", () => {
    activeCrop = b.dataset.c; renderCropTabs(); renderCropInfo();
  }));
}
function renderCropInfo() {
  const c = CROPS[activeCrop], i = L();
  $("cropInfo").innerHTML = `<h3>${CROP_NAMES[activeCrop][i]}</h3><dl>
    <dt>${t("k_soil")}</dt><dd>${c.soil[i]}</dd><dt>${t("k_water")}</dt><dd>${c.water[i]}</dd>
    <dt>${t("k_care")}</dt><dd>${c.care[i]}</dd><dt>${t("k_harvest")}</dt><dd>${c.harvest[i]}</dd></dl>`;
}

/* ---- E. Weather (Open-Meteo, no key needed) ---- */
$("wBtn").addEventListener("click", async () => {
  const place = $("wPlace").value.trim(), out = $("wOut");
  if (!place) { out.textContent = t("w_need"); return; }
  if (!navigator.onLine) { out.textContent = t("w_offline"); return; }
  out.textContent = t("w_loading");
  try {
    const g = await (await fetch("https://geocoding-api.open-meteo.com/v1/search?count=1&country_code=IN&name=" + encodeURIComponent(place))).json();
    if (!g.results || !g.results.length) { out.textContent = t("w_notfound"); return; }
    const p = g.results[0];
    const w = await (await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${p.latitude}&longitude=${p.longitude}` +
      "&current=temperature_2m,wind_speed_10m&daily=precipitation_probability_max&timezone=auto&forecast_days=1")).json();
    const rain = w.daily && w.daily.precipitation_probability_max ? w.daily.precipitation_probability_max[0] : null;
    out.innerHTML = `<strong>${esc(p.name)}${p.admin1 ? ", " + esc(p.admin1) : ""}</strong><div class="wgrid">
      <div>${w.current.temperature_2m} °C<small>${t("w_temp")}</small></div>
      <div>${rain === null ? "–" : rain + " %"}<small>${t("w_rain")}</small></div>
      <div>${w.current.wind_speed_10m} km/h<small>${t("w_wind")}</small></div></div>`;
  } catch (e) { out.textContent = t("w_fail"); }
});

/* ---- F. Offline notice + service worker ---- */
function netStatus() { $("offlineBar").hidden = navigator.onLine; }
window.addEventListener("online", netStatus);
window.addEventListener("offline", netStatus);
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => navigator.serviceWorker.register("sw.js").catch(() => {}));
}

/* ---- Season adviser events ---- */
if ($("recommendBtn")) $("recommendBtn").addEventListener("click", renderSeasonAdvice);
["seasonSelect", "soilSelect", "waterSelect"].forEach(id => {
  const el = $(id);
  if (el) el.addEventListener("change", renderSeasonAdvice);
});

/* ---- H. Header tabs act like separate pages (single-page navigation) ---- */
function showPageFromHash() {
  const target = (location.hash || "#home").slice(1);
  const sections = [...document.querySelectorAll("main > section")];
  const valid = sections.some(s => s.id === target);
  const activeId = valid ? target : "home";
  sections.forEach(s => s.classList.toggle("page-hidden", s.id !== activeId));
  document.querySelectorAll("#nav a").forEach(a => {
    const active = a.getAttribute("href") === "#" + activeId;
    a.classList.toggle("active", active);
    if (active) a.setAttribute("aria-current","page"); else a.removeAttribute("aria-current");
  });
  if (activeId === "season") renderSeasonAdvice();
  window.scrollTo({top:0,behavior:"smooth"});
}
window.addEventListener("hashchange", showPageFromHash);

/* ---- Start ---- */
applyLang(); loadSaved(); renderSummary(); renderPrices(); renderCropTabs(); renderCropInfo(); netStatus(); renderSeasonAdvice(); showPageFromHash();
