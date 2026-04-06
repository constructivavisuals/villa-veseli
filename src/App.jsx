import { useState, useEffect, useRef, createContext, useContext } from "react";

// Fonts
const fontLink = document.createElement("link");
fontLink.href = "https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500&display=swap";
fontLink.rel = "stylesheet";
document.head.appendChild(fontLink);

const SERIF = "'Montserrat', sans-serif";
const SANS = "'Montserrat', sans-serif";
const GOLD = "#c8a96e";
const DARK = "#151312";
const PILL = { borderRadius: 100, padding: "14px 32px", fontFamily: "'Raleway', sans-serif", fontSize: 11, fontWeight: 500, letterSpacing: 2.5, textTransform: "uppercase", cursor: "pointer", transition: "all 0.6s cubic-bezier(.16,1,.3,1)", border: "none" };
const EASE = "cubic-bezier(.16,1,.3,1)";

// Images
const IMGS = [
  "/images/hero-1.jpg",
  "/images/hero-2.jpg",
  "/images/hero-3.jpg",
  "/images/aerial-top.jpg",
  "/images/chatky-bazen.jpg",
  "/images/loznice-1.jpg",
  "/images/kuchyn.jpg",
  "/images/loznice-2.jpg",
  "/images/pokoj.jpg",
];

// ─── TRANSLATIONS ───
const T = {
  cs: {
    // Nav
    navLinks: [
      { id: "about", label: "O vile" },
      { id: "gallery", label: "Galerie" },
      { id: "explore", label: "Areál" },
      { id: "params", label: "Parametry" },
      { id: "potential", label: "Potenciál" },
      { id: "location", label: "Lokalita" },
      { id: "contact", label: "Kontakt" },
    ],
    navCta: "Prohlídka",
    // Hero
    heroBadge: "Právě v prodeji",
    heroTitle1: "Vila ve",
    heroTitle2: "Vysokém Veselí",
    heroSub: "400 m² · Pozemek 6 748 m²",
    heroScroll: "Scrollujte dolů",
    // About
    aboutTag: "Exkluzivní nabídka · Ihned k nastěhování",
    aboutTitle1: "Cihlová vila s ",
    aboutTitle2: "výjimečným potenciálem",
    aboutP1: "Unikátní cihlová vila v osobním vlastnictví ve Vysokém Veselí. Nemovitost o zastavěné ploše 400 m² se nachází na výjimečně prostorném pozemku o rozloze 6 748 m² a je ve velmi dobrém stavu, připravená k okamžitému nastěhování.",
    aboutP2: "Na pozemku se nachází 6 samostatných chatek — ideální pro pořádání dětských táborů, skupinových pobytů či jiných volnočasových aktivit. Nemovitost nabízí garáž, sklep 20 m², balkón a terasu s výhledem do okolní přírody.",
    aboutCta: "Domluvit prohlídku",
    aboutPrice: "13 950 000 Kč",
    aboutPriceSub: "Akční cena · Přímý prodej",
    // Gallery
    galleryTag: "Fotogalerie",
    galleryTitle1: "Prohlédněte si ",
    galleryTitle2: "vilu",
    galleryTabs: [
      { id: "all", label: "Vše" },
      { id: "ext", label: "Exteriér" },
      { id: "int", label: "Interiér" },
    ],
    galleryPhotos: [
      "Vila — letecký pohled", "Pohled z boku", "Čelní pohled", "Pohled shora",
      "Chatky a bazén", "Ložnice", "Kuchyň", "Ložnice II", "Pokoj",
    ],
    galleryClose: "ZAVŘÍT ✕",
    // Params
    paramsTag: "Specifikace",
    paramsTitle1: "Parametry ",
    paramsTitle2: "nemovitosti",
    paramsStats: [
      { value: "400", unit: "m²", label: "Zastavěná plocha" },
      { value: "6 748", unit: "m²", label: "Pozemek" },
      { value: "6", unit: "", label: "Chatek na pozemku" },
      { value: "20", unit: "m²", label: "Sklep" },
    ],
    paramsFeatures: [
      "Cihlová stavba", "Osobní vlastnictví", "Garáž + venkovní parkování",
      "Balkón 10 m²", "Terasa 10 m²", "Sklep 20 m²",
      "Solární panely", "Bazén se zastřešením", "6 samostatných chatek",
    ],
    paramsActionBadge: "Akční cena",
    paramsPriceTag: "Cena nemovitosti",
    paramsPrice: "13 950 000",
    paramsPriceCurrency: "Kč",
    paramsPriceSub: "Přímý prodej · Bez provize RK · Osobní vlastnictví",
    paramsMortgage: "Hypotéka již od 57 144 Kč / měsíc",
    paramsCta: "Mám zájem o prohlídku",
    // Potential
    potentialTag: "Možnosti využití",
    potentialTitle1: "Výjimečný ",
    potentialTitle2: "potenciál",
    potentialItems: [
      { title: "Rodinné sídlo", desc: "Prostorná vila ideální pro velkou rodinu s dostatkem soukromí a vlastní zahradou." },
      { title: "Dětské tábory", desc: "6 chatek na pozemku vytváří zázemí pro organizaci letních táborů a pobytů." },
      { title: "Wellness retreat", desc: "Klidné prostředí a rozlehlý pozemek nabízí potenciál pro rekreační či wellness provoz." },
      { title: "Investice", desc: "Atraktivní poměr ceny a rozlohy pozemku s možností dalšího rozvoje." },
    ],
    // Location
    locationTag: "Kde nás najdete",
    locationTitle1: "Vysoké Veselí, ",
    locationTitle2: "okres Jičín",
    locationDesc: "Vysoké Veselí se nachází v malebném Královéhradeckém kraji, v blízkosti Českého ráje. Klidná lokalita s výbornou dostupností do Jičína i Hradce Králové.",
    locationItems: [
      { label: "Adresa", value: "1. máje, Vysoké Veselí" },
      { label: "Praha", value: "cca 80 km" },
      { label: "Hradec Králové", value: "cca 45 km" },
      { label: "Český ráj", value: "15 min" },
      { label: "Jičín — služby, školy", value: "10 min" },
      { label: "MHD zastávka", value: "3 min pěšky" },
    ],
    // Contact
    contactTag: "Nečekejte, zavolejte ještě dnes",
    contactTitle1: "Domluvte si ",
    contactTitle2: "prohlídku",
    contactSub: "Nemovitost s tímto potenciálem a za tuto cenu se na trhu dlouho neudrží.",
    contactInfo: [
      { label: "Telefon", value: "+420 737 373 430" },
      { label: "Email", value: "info@vilavysokeveseli.cz" },
      { label: "Lokalita", value: "1. máje, Vysoké Veselí" },
    ],
    contactName: "Jméno a příjmení",
    contactPhone: "Telefon",
    contactEmail: "Email",
    contactMessage: "Vaše zpráva — rád/a bych si domluvil/a prohlídku...",
    contactSend: "Odeslat zprávu",
    contactThanks: "Děkujeme za váš zájem",
    contactThanksDesc: "Ozveme se vám co nejdříve.",
    // Footer
    footerRights: "© 2026 · Všechna práva vyhrazena",
    // Sticky bar
    stickyPrice: "13 950 000 Kč",
    stickyBadge: "AKČNÍ CENA",
    stickyReady: "Ihned k nastěhování",
    stickyCta: "Domluvit prohlídku",
    // Marquee
    marquee: "  ✦  Ihned k nastěhování  ✦  Přímý prodej bez realitky  ✦  Akční cena  ✦  Pozemek 6 748 m²  ✦  6 chatek v ceně  ✦  Solární panely  ✦  Bazén  ✦  Ihned k nastěhování  ✦  Přímý prodej bez realitky  ✦  Akční cena  ✦  Pozemek 6 748 m²  ✦  6 chatek v ceně  ✦  Solární panely  ✦  Bazén  ",
    // Explore
    exploreTag: "Interaktivní mapa",
    exploreTitle1: "Prozkoumejte ",
    exploreTitle2: "areál",
    exploreHint: "Kliknutím na část areálu zobrazíte podrobnosti",
    exploreZones: {
      basement: {
        name: "Přízemí / Sklep",
        title: "Přízemí — sklep 20 m²",
        desc: "Přízemí s kamenným zdivem, sklep 20 m², technické zázemí budovy.",
      },
      floor1: {
        name: "1. nadzemní podlaží",
        title: "1. nadzemní podlaží",
        desc: "Prostorná kuchyň s jídelnou, obývací pokoj, pracovna, koupelna, vstupní hala se schodištěm.",
      },
      floor2: {
        name: "2. NP / Podkroví",
        title: "2. nadzemní podlaží / Podkroví",
        desc: "3 ložnice, kulečníkový sál, 2 koupelny, balkón s výhledem do zahrady.",
      },
      cabins: {
        name: "Chatky",
        title: "6 samostatných chatek",
        desc: "Každá chatka nabízí vlastní pokoj se dvěma lůžky a základním vybavením. Ideální pro pořádání dětských táborů, skupinových pobytů nebo pronájem.",
        extra: "Součástí areálu je bazén se zastřešením",
      },
    },
    exploreCta: "Domluvit prohlídku",
    exploreClose: "Zavřít",
    // Splash
    splashTitle: "Vila Vysoké Veselí",
  },
  en: {
    navLinks: [
      { id: "about", label: "About" },
      { id: "gallery", label: "Gallery" },
      { id: "explore", label: "Explore" },
      { id: "params", label: "Details" },
      { id: "potential", label: "Potential" },
      { id: "location", label: "Location" },
      { id: "contact", label: "Contact" },
    ],
    navCta: "Book a Tour",
    heroBadge: "Now on sale",
    heroTitle1: "Villa in",
    heroTitle2: "Vysoké Veselí",
    heroSub: "400 m² · Land 6,748 m²",
    heroScroll: "Scroll down",
    aboutTag: "Exclusive offer · Move-in ready",
    aboutTitle1: "Brick villa with ",
    aboutTitle2: "exceptional potential",
    aboutP1: "A unique brick villa in private ownership in Vysoké Veselí. The property with a built-up area of 400 m² is situated on an exceptionally spacious plot of 6,748 m² and is in very good condition, ready for immediate move-in.",
    aboutP2: "The grounds include 6 separate cabins — ideal for organizing children's camps, group stays, or other recreational activities. The property offers a garage, 20 m² cellar, balcony, and terrace with views of the surrounding nature.",
    aboutCta: "Book a viewing",
    aboutPrice: "€569,000",
    aboutPriceSub: "Special price · Direct sale",
    galleryTag: "Photo gallery",
    galleryTitle1: "Explore the ",
    galleryTitle2: "villa",
    galleryTabs: [
      { id: "all", label: "All" },
      { id: "ext", label: "Exterior" },
      { id: "int", label: "Interior" },
    ],
    galleryPhotos: [
      "Villa — aerial view", "Side view", "Front view", "Top view",
      "Cabins & pool", "Bedroom", "Kitchen", "Bedroom II", "Room",
    ],
    galleryClose: "CLOSE ✕",
    paramsTag: "Specifications",
    paramsTitle1: "Property ",
    paramsTitle2: "details",
    paramsStats: [
      { value: "400", unit: "m²", label: "Built-up area" },
      { value: "6,748", unit: "m²", label: "Land" },
      { value: "6", unit: "", label: "Cabins on premises" },
      { value: "20", unit: "m²", label: "Cellar" },
    ],
    paramsFeatures: [
      "Brick construction", "Private ownership", "Garage + outdoor parking",
      "Balcony 10 m²", "Terrace 10 m²", "Cellar 20 m²",
      "Solar panels", "Covered swimming pool", "6 separate cabins",
    ],
    paramsActionBadge: "Special price",
    paramsPriceTag: "Property price",
    paramsPrice: "569,000",
    paramsPriceCurrency: "€",
    paramsPriceSub: "Direct sale · No agency fee · Private ownership",
    paramsMortgage: "Mortgage from €2,330 / month",
    paramsCta: "I'm interested in a viewing",
    potentialTag: "Possible uses",
    potentialTitle1: "Exceptional ",
    potentialTitle2: "potential",
    potentialItems: [
      { title: "Family estate", desc: "Spacious villa ideal for a large family with plenty of privacy and a private garden." },
      { title: "Children's camps", desc: "6 cabins on the grounds provide the perfect base for organizing summer camps and group stays." },
      { title: "Wellness retreat", desc: "Peaceful setting and expansive grounds offer potential for recreational or wellness operations." },
      { title: "Investment", desc: "Attractive price-to-area ratio with opportunities for further development." },
    ],
    locationTag: "Find us",
    locationTitle1: "Vysoké Veselí, ",
    locationTitle2: "Jičín district",
    locationDesc: "Vysoké Veselí is located in the picturesque Hradec Králové Region, near the Bohemian Paradise. A quiet locality with excellent access to Jičín and Hradec Králové.",
    locationItems: [
      { label: "Address", value: "1. máje, Vysoké Veselí" },
      { label: "Prague", value: "approx. 80 km" },
      { label: "Hradec Králové", value: "approx. 45 km" },
      { label: "Bohemian Paradise", value: "15 min" },
      { label: "Jičín — services, schools", value: "10 min" },
      { label: "Bus stop", value: "3 min walk" },
    ],
    contactTag: "Don't wait, call today",
    contactTitle1: "Schedule a ",
    contactTitle2: "viewing",
    contactSub: "A property with this potential and at this price won't stay on the market for long.",
    contactInfo: [
      { label: "Phone", value: "+420 737 373 430" },
      { label: "Email", value: "info@vilavysokeveseli.cz" },
      { label: "Location", value: "1. máje, Vysoké Veselí" },
    ],
    contactName: "Full name",
    contactPhone: "Phone",
    contactEmail: "Email",
    contactMessage: "Your message — I would like to schedule a viewing...",
    contactSend: "Send message",
    contactThanks: "Thank you for your interest",
    contactThanksDesc: "We will get back to you as soon as possible.",
    footerRights: "© 2026 · All rights reserved",
    stickyPrice: "€569,000",
    stickyBadge: "SPECIAL PRICE",
    stickyReady: "Move-in ready",
    stickyCta: "Book a viewing",
    marquee: "  ✦  Move-in ready  ✦  Direct sale — no agency  ✦  Special price  ✦  Land 6,748 m²  ✦  6 cabins included  ✦  Solar panels  ✦  Pool  ✦  Move-in ready  ✦  Direct sale — no agency  ✦  Special price  ✦  Land 6,748 m²  ✦  6 cabins included  ✦  Solar panels  ✦  Pool  ",
    exploreTag: "Interactive map",
    exploreTitle1: "Explore the ",
    exploreTitle2: "grounds",
    exploreHint: "Click on a part of the property to see details",
    exploreZones: {
      basement: {
        name: "Ground floor / Cellar",
        title: "Ground floor — cellar 20 m²",
        desc: "Ground floor with stone masonry, 20 m² cellar, technical facilities.",
      },
      floor1: {
        name: "1st floor",
        title: "1st floor",
        desc: "Spacious kitchen with dining area, living room, study, bathroom, entrance hall with staircase.",
      },
      floor2: {
        name: "2nd floor / Attic",
        title: "2nd floor / Attic",
        desc: "3 bedrooms, billiard room, 2 bathrooms, balcony with garden views.",
      },
      cabins: {
        name: "Cabins",
        title: "6 separate cabins",
        desc: "Each cabin offers its own room with two beds and basic amenities. Ideal for organizing children's camps, group stays, or rental.",
        extra: "The grounds include a covered swimming pool",
      },
    },
    exploreCta: "Book a viewing",
    exploreClose: "Close",
    splashTitle: "Vila Vysoké Veselí",
  },
  de: {
    navLinks: [
      { id: "about", label: "Über die Villa" },
      { id: "gallery", label: "Galerie" },
      { id: "explore", label: "Gelände" },
      { id: "params", label: "Details" },
      { id: "potential", label: "Potenzial" },
      { id: "location", label: "Lage" },
      { id: "contact", label: "Kontakt" },
    ],
    navCta: "Besichtigung",
    heroBadge: "Jetzt im Verkauf",
    heroTitle1: "Villa in",
    heroTitle2: "Vysoké Veselí",
    heroSub: "400 m² · Grundstück 6.748 m²",
    heroScroll: "Nach unten scrollen",
    aboutTag: "Exklusives Angebot · Sofort bezugsfertig",
    aboutTitle1: "Ziegelvilla mit ",
    aboutTitle2: "außergewöhnlichem Potenzial",
    aboutP1: "Einzigartige Ziegelvilla in Privatbesitz in Vysoké Veselí. Das Gebäude mit einer bebauten Fläche von 400 m² befindet sich auf einem außergewöhnlich großzügigen Grundstück von 6.748 m² und ist in sehr gutem Zustand, sofort bezugsfertig.",
    aboutP2: "Auf dem Grundstück befinden sich 6 separate Hütten — ideal für die Organisation von Kindercamps, Gruppenaufenthalten oder anderen Freizeitaktivitäten. Die Immobilie bietet eine Garage, einen 20 m² Keller, einen Balkon und eine Terrasse mit Blick auf die umliegende Natur.",
    aboutCta: "Besichtigung vereinbaren",
    aboutPrice: "569.000 €",
    aboutPriceSub: "Aktionspreis · Direktverkauf",
    galleryTag: "Fotogalerie",
    galleryTitle1: "Besichtigen Sie die ",
    galleryTitle2: "Villa",
    galleryTabs: [
      { id: "all", label: "Alle" },
      { id: "ext", label: "Außen" },
      { id: "int", label: "Innen" },
    ],
    galleryPhotos: [
      "Villa — Luftaufnahme", "Seitenansicht", "Frontansicht", "Draufsicht",
      "Hütten & Pool", "Schlafzimmer", "Küche", "Schlafzimmer II", "Zimmer",
    ],
    galleryClose: "SCHLIEßEN ✕",
    paramsTag: "Spezifikationen",
    paramsTitle1: "Immobilien",
    paramsTitle2: "details",
    paramsStats: [
      { value: "400", unit: "m²", label: "Bebaute Fläche" },
      { value: "6.748", unit: "m²", label: "Grundstück" },
      { value: "6", unit: "", label: "Hütten auf dem Gelände" },
      { value: "20", unit: "m²", label: "Keller" },
    ],
    paramsFeatures: [
      "Ziegelbau", "Privatbesitz", "Garage + Außenparkplatz",
      "Balkon 10 m²", "Terrasse 10 m²", "Keller 20 m²",
      "Solarpanele", "Pool mit Überdachung", "6 separate Hütten",
    ],
    paramsActionBadge: "Aktionspreis",
    paramsPriceTag: "Immobilienpreis",
    paramsPrice: "569.000",
    paramsPriceCurrency: "€",
    paramsPriceSub: "Direktverkauf · Ohne Maklerprovision · Privatbesitz",
    paramsMortgage: "Hypothek ab 2.330 € / Monat",
    paramsCta: "Ich möchte eine Besichtigung",
    potentialTag: "Nutzungsmöglichkeiten",
    potentialTitle1: "Außergewöhnliches ",
    potentialTitle2: "Potenzial",
    potentialItems: [
      { title: "Familiensitz", desc: "Geräumige Villa, ideal für eine große Familie mit viel Privatsphäre und eigenem Garten." },
      { title: "Kindercamps", desc: "6 Hütten auf dem Gelände bieten die Basis für die Organisation von Sommercamps und Gruppenaufenthalten." },
      { title: "Wellness-Retreat", desc: "Ruhige Umgebung und weitläufiges Grundstück bieten Potenzial für Erholungs- oder Wellnessbetrieb." },
      { title: "Investition", desc: "Attraktives Preis-Flächen-Verhältnis mit Möglichkeiten zur Weiterentwicklung." },
    ],
    locationTag: "So finden Sie uns",
    locationTitle1: "Vysoké Veselí, ",
    locationTitle2: "Bezirk Jičín",
    locationDesc: "Vysoké Veselí liegt in der malerischen Region Hradec Králové, in der Nähe des Böhmischen Paradieses. Ruhige Lage mit hervorragender Erreichbarkeit von Jičín und Hradec Králové.",
    locationItems: [
      { label: "Adresse", value: "1. máje, Vysoké Veselí" },
      { label: "Prag", value: "ca. 80 km" },
      { label: "Hradec Králové", value: "ca. 45 km" },
      { label: "Böhmisches Paradies", value: "15 Min." },
      { label: "Jičín — Dienste, Schulen", value: "10 Min." },
      { label: "Bushaltestelle", value: "3 Min. zu Fuß" },
    ],
    contactTag: "Warten Sie nicht, rufen Sie noch heute an",
    contactTitle1: "Vereinbaren Sie eine ",
    contactTitle2: "Besichtigung",
    contactSub: "Eine Immobilie mit diesem Potenzial und zu diesem Preis bleibt nicht lange auf dem Markt.",
    contactInfo: [
      { label: "Telefon", value: "+420 737 373 430" },
      { label: "E-Mail", value: "info@vilavysokeveseli.cz" },
      { label: "Standort", value: "1. máje, Vysoké Veselí" },
    ],
    contactName: "Vor- und Nachname",
    contactPhone: "Telefon",
    contactEmail: "E-Mail",
    contactMessage: "Ihre Nachricht — Ich möchte eine Besichtigung vereinbaren...",
    contactSend: "Nachricht senden",
    contactThanks: "Vielen Dank für Ihr Interesse",
    contactThanksDesc: "Wir melden uns so schnell wie möglich.",
    footerRights: "© 2026 · Alle Rechte vorbehalten",
    stickyPrice: "569.000 €",
    stickyBadge: "AKTIONSPREIS",
    stickyReady: "Sofort bezugsfertig",
    stickyCta: "Besichtigung vereinbaren",
    marquee: "  ✦  Sofort bezugsfertig  ✦  Direktverkauf ohne Makler  ✦  Aktionspreis  ✦  Grundstück 6.748 m²  ✦  6 Hütten inklusive  ✦  Solarpanele  ✦  Pool  ✦  Sofort bezugsfertig  ✦  Direktverkauf ohne Makler  ✦  Aktionspreis  ✦  Grundstück 6.748 m²  ✦  6 Hütten inklusive  ✦  Solarpanele  ✦  Pool  ",
    exploreTag: "Interaktive Karte",
    exploreTitle1: "Erkunden Sie das ",
    exploreTitle2: "Gelände",
    exploreHint: "Klicken Sie auf einen Teil des Areals, um Details anzuzeigen",
    exploreZones: {
      basement: {
        name: "Erdgeschoss / Keller",
        title: "Erdgeschoss — Keller 20 m²",
        desc: "Erdgeschoss mit Steinmauerwerk, 20 m² Keller, technische Einrichtungen.",
      },
      floor1: {
        name: "1. Obergeschoss",
        title: "1. Obergeschoss",
        desc: "Geräumige Küche mit Essbereich, Wohnzimmer, Arbeitszimmer, Badezimmer, Eingangshalle mit Treppe.",
      },
      floor2: {
        name: "2. OG / Dachgeschoss",
        title: "2. Obergeschoss / Dachgeschoss",
        desc: "3 Schlafzimmer, Billardsaal, 2 Badezimmer, Balkon mit Gartenblick.",
      },
      cabins: {
        name: "Hütten",
        title: "6 separate Hütten",
        desc: "Jede Hütte bietet ein eigenes Zimmer mit zwei Betten und Grundausstattung. Ideal für Kindercamps, Gruppenaufenthalte oder Vermietung.",
        extra: "Zum Gelände gehört ein überdachter Swimmingpool",
      },
    },
    exploreCta: "Besichtigung vereinbaren",
    exploreClose: "Schließen",
    splashTitle: "Vila Vysoké Veselí",
  },
};

const LangContext = createContext("cs");

function useLang() {
  const lang = useContext(LangContext);
  return T[lang];
}

// Images loaded inline

const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

function useInView(threshold = 0.12) {
  const ref = useRef(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setV(true); }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, v];
}

// ─── LANG SWITCHER ───
function LangSwitcher({ lang, setLang }) {
  const langs = ["cs", "en", "de"];
  return (
    <div style={{ display: "flex", gap: 2, marginLeft: 16 }}>
      {langs.map(l => (
        <span key={l} onClick={() => setLang(l)} style={{
          fontFamily: SANS, fontSize: 10, fontWeight: lang === l ? 600 : 400,
          color: lang === l ? "#fff" : "rgba(255,255,255,0.4)",
          cursor: "pointer", padding: "4px 7px", letterSpacing: 1,
          textTransform: "uppercase", transition: "all 0.3s",
          borderBottom: lang === l ? `1px solid ${GOLD}` : "1px solid transparent",
        }}>{l}</span>
      ))}
    </div>
  );
}

// ─── NAV ───
function Nav({ lang, setLang }) {
  const t = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <>
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
        padding: "0 clamp(20px, 4vw, 64px)", height: 72,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        background: scrolled ? "rgba(11,11,11,0.94)" : "transparent",
        backdropFilter: scrolled ? "blur(24px)" : "none",
        borderBottom: scrolled ? `1px solid rgba(255,255,255,0.05)` : "none",
        transition: "all 0.5s ease",
      }}>
        <div onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} style={{
          fontFamily: SERIF, fontSize: 20, fontWeight: 400, color: "#fff",
          letterSpacing: 3, cursor: "pointer", textTransform: "uppercase",
        }}>Vila Veselí</div>

        <div style={{ display: "flex", gap: 28, alignItems: "center" }} className="nd">
          {t.navLinks.map(l => (
            <span key={l.id} onClick={() => scrollTo(l.id)} style={{
              fontFamily: SANS, fontSize: 11, fontWeight: 400, color: "rgba(255,255,255,0.6)",
              letterSpacing: 2.5, textTransform: "uppercase", cursor: "pointer", transition: "color 0.3s",
            }} onMouseEnter={e => e.target.style.color = "#fff"} onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.6)"}>
              {l.label}
            </span>
          ))}
          <span onClick={() => scrollTo("contact")} style={{
            ...PILL, color: DARK, background: "#fff", padding: "10px 24px",
          }} onMouseEnter={e => { e.target.style.background = GOLD; e.target.style.color = "#fff"; }}
            onMouseLeave={e => { e.target.style.background = "#fff"; e.target.style.color = DARK; }}>
            {t.navCta}
          </span>
          <LangSwitcher lang={lang} setLang={setLang} />
        </div>

        <div style={{ alignItems: "center", gap: 12 }} className="nb-wrap">
          <LangSwitcher lang={lang} setLang={setLang} />
          <div onClick={() => setOpen(!open)} style={{ display: "none", flexDirection: "column", gap: 5, cursor: "pointer", zIndex: 1001 }} className="nb">
            <span style={{ width: 26, height: 1.5, background: "#fff", transition: "all 0.3s", transform: open ? "rotate(45deg) translate(4.5px,4.5px)" : "none" }} />
            <span style={{ width: 26, height: 1.5, background: "#fff", transition: "all 0.3s", opacity: open ? 0 : 1 }} />
            <span style={{ width: 26, height: 1.5, background: "#fff", transition: "all 0.3s", transform: open ? "rotate(-45deg) translate(4.5px,-4.5px)" : "none" }} />
          </div>
        </div>
      </nav>

      {open && <div style={{
        position: "fixed", inset: 0, zIndex: 999, background: "rgba(11,11,11,0.97)",
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 28,
      }}>
        {t.navLinks.map(l => (
          <span key={l.id} onClick={() => { scrollTo(l.id); setOpen(false); }} style={{
            fontFamily: SERIF, fontSize: 26, color: "#fff", cursor: "pointer", letterSpacing: 3,
          }}>{l.label}</span>
        ))}
      </div>}

      <style>{`
        .nb-wrap{display:none}
        @media(max-width:768px){.nd{display:none!important}.nb-wrap{display:flex!important}.nb{display:flex!important}}
      `}</style>
    </>
  );
}

// ─── HERO ───
function Hero({ ready }) {
  const t = useLang();
  const [loaded, setLoaded] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => { setTimeout(() => setLoaded(true), 200); }, []);
  useEffect(() => {
    if (ready && videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
    }
  }, [ready]);

  return (
    <section style={{ position: "relative", width: "100%", height: "100vh", minHeight: 600, overflow: "hidden", background: DARK }}>
      <video ref={videoRef} muted loop playsInline preload="auto" style={{
        position: "absolute", inset: 0,
        width: "100%", height: "100%", objectFit: "cover",
        filter: "brightness(0.38) saturate(0.9)",
        transform: loaded ? "scale(1)" : "scale(1.08)",
        transition: "transform 10s ease-out",
      }}>
        <source src="/images/video.mp4" type="video/mp4" />
      </video>

      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(180deg, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.05) 40%, rgba(0,0,0,0.55) 100%)",
      }} />

      <div style={{
        position: "relative", zIndex: 2, height: "100%",
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "0 24px",
      }}>
        {/* Live badge */}
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 8,
          padding: "8px 20px", border: "1px solid rgba(255,255,255,0.15)",
          marginBottom: 28,
          opacity: loaded ? 1 : 0, transition: "opacity 1s ease 0.5s",
        }}>
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#4ade80", animation: "blink 2s ease-in-out infinite" }} />
          <span style={{ fontFamily: SANS, fontSize: 10, letterSpacing: 3, color: "rgba(255,255,255,0.7)", textTransform: "uppercase", fontWeight: 500 }}>
            {t.heroBadge}
          </span>
        </div>

        <div style={{
          display: "flex", alignItems: "center", gap: "clamp(24px,5vw,64px)",
          width: "100%", maxWidth: 1100, justifyContent: "center",
          opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(40px)",
          transition: "all 1.4s cubic-bezier(0.22,1,0.36,1) 0.3s",
        }}>
          <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.25)", maxWidth: 180 }} />
          <div style={{ textAlign: "center" }}>
            <h1 style={{
              fontFamily: SERIF, fontWeight: 300, color: "#fff",
              fontSize: "clamp(42px,8vw,110px)", lineHeight: 1, margin: 0, letterSpacing: "-0.02em",
            }}>
              {t.heroTitle1}<br />
              <span style={{ fontStyle: "italic", fontWeight: 400, color: GOLD }}>{t.heroTitle2}</span>
            </h1>
          </div>
          <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.25)", maxWidth: 180 }} />
        </div>

        <p style={{
          fontFamily: SANS, fontSize: "clamp(12px,1.3vw,15px)", color: "rgba(255,255,255,0.55)",
          marginTop: 28, letterSpacing: 5, textTransform: "uppercase", fontWeight: 300,
          opacity: loaded ? 1 : 0, transition: "opacity 1.2s ease 1s",
        }}>
          {t.heroSub}
        </p>

        <div onClick={() => scrollTo("about")} style={{
          position: "absolute", bottom: 44, left: "50%", transform: "translateX(-50%)",
          display: "flex", flexDirection: "column", alignItems: "center", gap: 10,
          cursor: "pointer", opacity: loaded ? 1 : 0, transition: "opacity 1.2s ease 1.4s",
        }}>
          <div style={{
            width: 24, height: 40, borderRadius: 12, border: "1.5px solid rgba(255,255,255,0.3)",
            display: "flex", justifyContent: "center", paddingTop: 8,
          }}>
            <div style={{
              width: 2.5, height: 7, borderRadius: 2, background: "rgba(255,255,255,0.6)",
              animation: "sp 2s ease-in-out infinite",
            }} />
          </div>
          <span style={{
            fontFamily: SANS, fontSize: 9, color: "rgba(255,255,255,0.4)",
            letterSpacing: 4, textTransform: "uppercase",
          }}>{t.heroScroll}</span>
        </div>
      </div>
      <style>{`@keyframes sp{0%,100%{opacity:1;transform:translateY(0)}50%{opacity:.2;transform:translateY(6px)}}@keyframes blink{0%,100%{opacity:1}50%{opacity:.3}}`}</style>
    </section>
  );
}

// ─── ABOUT ───
function About() {
  const t = useLang();
  const [ref, vis] = useInView();
  return (
    <section id="about" ref={ref} style={{ background: "#f5f0e8", padding: "clamp(80px,12vw,160px) clamp(24px,6vw,100px)" }}>
      <div style={{
        maxWidth: 1200, margin: "0 auto",
        display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(32px,5vw,80px)", alignItems: "center",
        opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(40px)", transition: `all 1.2s ${EASE}`,
      }} className="ag">
        <div>
          <span style={{ fontFamily: SANS, fontSize: 11, letterSpacing: 4, color: GOLD, textTransform: "uppercase", fontWeight: 500 }}>
            {t.aboutTag}
          </span>
          <h2 style={{
            fontFamily: SERIF, fontSize: "clamp(32px,4.5vw,56px)", fontWeight: 300,
            color: "#1e1c18", margin: "14px 0 24px", lineHeight: 1.2,
          }}>
            {t.aboutTitle1}<span style={{ fontStyle: "italic" }}>{t.aboutTitle2}</span>
          </h2>
          <p style={{ fontFamily: SANS, fontSize: 15, lineHeight: 1.85, color: "#7a7168", fontWeight: 300, maxWidth: 520 }}>
            {t.aboutP1}
          </p>
          <p style={{ fontFamily: SANS, fontSize: 15, lineHeight: 1.85, color: "#7a7168", fontWeight: 300, maxWidth: 520, marginTop: 16 }}>
            {t.aboutP2}
          </p>
          <div style={{
            ...PILL, display: "inline-flex", alignItems: "center", gap: 10, marginTop: 32,
            background: GOLD, color: "#fff",
          }} onClick={() => scrollTo("contact")}
            onMouseEnter={e => { e.currentTarget.style.background = "#b8935a"; }}
            onMouseLeave={e => { e.currentTarget.style.background = GOLD; }}>
            {t.aboutCta} <span style={{ fontSize: 14 }}>→</span>
          </div>
        </div>

        <div style={{ position: "relative" }}>
          <img src={IMGS[1]} style={{
            width: "100%", height: "clamp(380px,50vw,580px)", objectFit: "cover",
          }} />
          <div style={{
            position: "absolute", bottom: -16, left: -16, background: GOLD, padding: "18px 26px",
          }} className="ab">
            <span style={{ fontFamily: SERIF, fontSize: 28, fontWeight: 600, color: "#fff", display: "block" }}>{t.aboutPrice}</span>
            <span style={{ fontFamily: SANS, fontSize: 10, letterSpacing: 3, color: "rgba(255,255,255,0.75)", textTransform: "uppercase" }}>
              {t.aboutPriceSub}
            </span>
          </div>
        </div>
      </div>
      <style>{`@media(max-width:768px){.ag{grid-template-columns:1fr!important}.ab{bottom:-8px!important;left:8px!important}}`}</style>
    </section>
  );
}

// ─── GALLERY ───
function Gallery() {
  const t = useLang();
  const [ref, vis] = useInView(0.08);
  const [active, setActive] = useState(0);
  const [lightbox, setLightbox] = useState(null);
  const [tab, setTab] = useState("all");

  const cats = ["ext", "ext", "ext", "ext", "ext", "int", "int", "int", "int"];
  const photos = IMGS.map((src, i) => ({ src, label: t.galleryPhotos[i], cat: cats[i] }));

  const filtered = tab === "all" ? photos : photos.filter(p => p.cat === tab);

  const handleTab = (tb) => { setTab(tb); setActive(0); };

  return (
    <section id="gallery" ref={ref} style={{ background: DARK, padding: "40px 0" }}>
      <div style={{
        maxWidth: 1060, margin: "0 auto", padding: "0 clamp(16px,3vw,48px)",
        opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(30px)", transition: `all 1s ${EASE}`,
      }}>
        {/* Header + tabs */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 14, flexWrap: "wrap", gap: 12 }}>
          <div>
            <span style={{ fontFamily: SANS, fontSize: 11, letterSpacing: 4, color: GOLD, textTransform: "uppercase", fontWeight: 500 }}>{t.galleryTag}</span>
            <h2 style={{ fontFamily: SERIF, fontSize: "clamp(24px,3vw,38px)", fontWeight: 300, color: "#fff", margin: "6px 0 0" }}>
              {t.galleryTitle1}<span style={{ fontStyle: "italic" }}>{t.galleryTitle2}</span>
            </h2>
          </div>
          <div style={{ display: "flex", gap: 4 }}>
            {t.galleryTabs.map(tb => (
              <span key={tb.id} onClick={() => handleTab(tb.id)} style={{
                fontFamily: SANS, fontSize: 11, letterSpacing: 2, textTransform: "uppercase",
                padding: "10px 20px", cursor: "pointer", transition: "all 0.3s",
                color: tab === tb.id ? "#fff" : "rgba(255,255,255,0.35)",
                background: tab === tb.id ? "rgba(255,255,255,0.08)" : "transparent",
                border: tab === tb.id ? `1px solid rgba(255,255,255,0.1)` : "1px solid transparent",
              }}>{tb.label}</span>
            ))}
          </div>
        </div>

        {/* Main image + side thumbnails */}
        <div style={{ display: "flex", gap: 4 }} className="gg">
          {/* Featured image */}
          <div onClick={() => setLightbox(active)} style={{
            flex: 1, aspectRatio: "16/10", overflow: "hidden", cursor: "zoom-in",
            position: "relative",
          }}>
            <img src={filtered[active]?.src} alt="" style={{
              width: "100%", height: "100%", objectFit: "cover",
              transition: "opacity 0.5s ease",
            }} />
            <div style={{
              position: "absolute", bottom: 0, left: 0, right: 0,
              padding: "40px 20px 14px",
              background: "linear-gradient(transparent, rgba(0,0,0,0.5))",
              display: "flex", justifyContent: "space-between", alignItems: "flex-end",
            }}>
              <span style={{ fontFamily: SANS, fontSize: 12, color: "rgba(255,255,255,0.8)", letterSpacing: 2, textTransform: "uppercase" }}>
                {filtered[active]?.label}
              </span>
              <span style={{ fontFamily: SANS, fontSize: 11, color: "rgba(255,255,255,0.4)" }}>
                {active + 1} / {filtered.length}
              </span>
            </div>
            {filtered.length > 1 && <>
              <div onClick={e => { e.stopPropagation(); setActive((active - 1 + filtered.length) % filtered.length); }}
                style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: "15%", cursor: "w-resize",
                  display: "flex", alignItems: "center", justifyContent: "flex-start", paddingLeft: 12 }}>
                <div style={{
                  width: 38, height: 38, borderRadius: "50%", background: "rgba(0,0,0,0.3)", backdropFilter: "blur(8px)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "#fff", fontSize: 18, opacity: 0.6, transition: "opacity 0.3s",
                }} onMouseEnter={e => e.currentTarget.style.opacity = 1} onMouseLeave={e => e.currentTarget.style.opacity = 0.6}>‹</div>
              </div>
              <div onClick={e => { e.stopPropagation(); setActive((active + 1) % filtered.length); }}
                style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: "15%", cursor: "e-resize",
                  display: "flex", alignItems: "center", justifyContent: "flex-end", paddingRight: 12 }}>
                <div style={{
                  width: 38, height: 38, borderRadius: "50%", background: "rgba(0,0,0,0.3)", backdropFilter: "blur(8px)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "#fff", fontSize: 18, opacity: 0.6, transition: "opacity 0.3s",
                }} onMouseEnter={e => e.currentTarget.style.opacity = 1} onMouseLeave={e => e.currentTarget.style.opacity = 0.6}>›</div>
              </div>
            </>}
          </div>

          {/* Side thumbnail strip */}
          <div style={{
            display: "flex", flexDirection: "column", gap: 4, overflowY: "auto",
            width: 90, flexShrink: 0, scrollbarWidth: "none",
          }} className="gside">
            {filtered.map((p, i) => (
              <div key={i} onClick={() => setActive(i)} style={{
                width: 90, height: 64, overflow: "hidden", cursor: "pointer", position: "relative", flexShrink: 0,
                opacity: active === i ? 1 : 0.4,
                transition: "opacity 0.3s ease",
              }}>
                <img src={p.src} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                {active === i && <div style={{
                  position: "absolute", top: 0, bottom: 0, left: 0, width: 2, background: GOLD,
                }} />}
              </div>
            ))}
          </div>
        </div>
      </div>

      {lightbox !== null && (
        <div onClick={() => setLightbox(null)} style={{
          position: "fixed", inset: 0, zIndex: 2000, background: "rgba(0,0,0,0.94)",
          backdropFilter: "blur(12px)", display: "flex", alignItems: "center", justifyContent: "center",
          cursor: "zoom-out", padding: 20,
        }}>
          <img src={filtered[lightbox]?.src} style={{ maxWidth: "92vw", maxHeight: "88vh", objectFit: "contain" }} />
          <div style={{ position: "absolute", top: 20, right: 24, fontFamily: SANS, fontSize: 13, color: "#fff", cursor: "pointer", letterSpacing: 3 }}>
            {t.galleryClose}
          </div>
          <div onClick={e => { e.stopPropagation(); setLightbox((lightbox - 1 + filtered.length) % filtered.length); }}
            style={{ position: "absolute", left: 20, top: "50%", transform: "translateY(-50%)", color: "#fff", fontSize: 40, cursor: "pointer", padding: 20, userSelect: "none" }}>‹</div>
          <div onClick={e => { e.stopPropagation(); setLightbox((lightbox + 1) % filtered.length); }}
            style={{ position: "absolute", right: 20, top: "50%", transform: "translateY(-50%)", color: "#fff", fontSize: 40, cursor: "pointer", padding: 20, userSelect: "none" }}>›</div>
        </div>
      )}

      <style>{`
        @media(max-width:768px){.gside{display:none!important}.gg{flex-direction:column}}
        .gside::-webkit-scrollbar{display:none}
      `}</style>
    </section>
  );
}

// ─── INTERACTIVE MAP (floor-hover) ───
const ACCENT = "#c9a96e";
const HOVER_C = "rgba(201,169,110,0.35)";

function FloorSection({ imgSrc, overlayId, zones, labels, layout, hint }) {
  const [hovered, setHovered] = useState(null);

  const gradients = {};
  if (layout === "vertical") {
    zones.forEach(z => {
      gradients[z.id] = `linear-gradient(to bottom,${z.before}${HOVER_C} ${z.top}%,${HOVER_C} ${z.bot}%,transparent ${z.bot}%)`;
    });
  } else {
    zones.forEach(z => {
      gradients[z.id] = `linear-gradient(to right,${z.before}${HOVER_C} ${z.left}%,${HOVER_C} ${z.right}%,transparent ${z.right}%)`;
    });
  }

  const maskUrl = `url('/images/${imgSrc}')`;
  const isV = layout === "vertical";

  return (
    <div>
      <div style={{ position: "relative", display: "flex", alignItems: "flex-start" }}>
        <div style={{ position: "relative", flex: 1, background: "#e8e2d8" }}>
          <img src={`/images/${imgSrc}`} alt="" style={{ width: "100%", display: "block", position: "relative", zIndex: 1 }} />
          <div id={overlayId} style={{
            position: "absolute", top: 0, left: 0, right: 0, bottom: 0, zIndex: 2, pointerEvents: "none",
            WebkitMaskImage: maskUrl, maskImage: maskUrl,
            WebkitMaskSize: "100% 100%", maskSize: "100% 100%",
            WebkitMaskRepeat: "no-repeat", maskRepeat: "no-repeat",
            background: hovered ? gradients[hovered] : "transparent",
            transition: "background 0.3s",
          }} />
          {zones.map(z => (
            <div key={z.id}>
              <div style={{
                position: "absolute", zIndex: 5, cursor: "pointer",
                ...(isV ? { top: `${z.top}%`, height: `${z.bot - z.top}%`, left: 0, right: 0 } :
                  { top: 0, height: "100%", left: `${z.left}%`, width: `${z.right - z.left}%` }),
              }}
                onMouseEnter={() => setHovered(z.id)}
                onMouseLeave={() => setHovered(null)}
              />
              <div style={{
                position: "absolute", zIndex: 10, pointerEvents: "none",
                display: "flex", justifyContent: "center", alignItems: "center",
                ...(isV ? { top: `${z.top}%`, height: `${z.bot - z.top}%`, left: 0, right: 0 } :
                  { top: 0, height: "100%", left: `${z.left}%`, width: `${z.right - z.left}%` }),
              }}>
                <div style={{
                  background: "rgba(15,14,13,0.92)", border: `1px solid ${ACCENT}`,
                  padding: "9px 20px", borderRadius: 3, whiteSpace: "nowrap",
                  fontFamily: SANS, fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: ACCENT,
                  opacity: hovered === z.id ? 1 : 0, transition: "opacity 0.3s",
                }}>{z.tooltip}</div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ width: 170, position: "relative", minHeight: 200 }}>
          {labels.map(l => (
            <div key={l.id} style={{
              position: "absolute", top: `${l.top}%`, right: 0,
              display: "flex", alignItems: "center", gap: 10, cursor: "pointer", whiteSpace: "nowrap",
            }}
              onMouseEnter={() => setHovered(l.id)}
              onMouseLeave={() => setHovered(null)}
            >
              <span style={{ fontFamily: SANS, fontSize: 11, letterSpacing: 1.5, color: hovered === l.id ? ACCENT : "#4a4540", transition: "color 0.3s" }}>{l.text}</span>
              <span style={{ width: hovered === l.id ? 50 : 32, height: 1, background: hovered === l.id ? ACCENT : "#2a2520", transition: "all 0.3s" }} />
              <span style={{ fontFamily: SERIF, fontSize: 24, fontWeight: 300, color: hovered === l.id ? ACCENT : "#2a2520", transition: "color 0.3s", minWidth: 26, textAlign: "right" }}>{l.num}</span>
            </div>
          ))}
        </div>
      </div>
      <p style={{ textAlign: "center", marginTop: 8, fontFamily: SANS, fontSize: 9, letterSpacing: 2, textTransform: "uppercase", color: "#b5aea6" }}>{hint}</p>
    </div>
  );
}

function InteractiveMap() {
  const [ref, vis] = useInView(0.08);
  const [tab, setTab] = useState("v");

  const tabs = [
    { id: "v", label: "Vila" },
    { id: "c", label: "Chatka" },
    { id: "t", label: "Tančírna" },
  ];

  const vilaZones = [
    { id: 3, top: 0, bot: 36, before: "", tooltip: "3. NP — Podkroví" },
    { id: 2, top: 36, bot: 64, before: "transparent 36%,", tooltip: "2. NP" },
    { id: 1, top: 64, bot: 100, before: "transparent 64%,", tooltip: "1. NP — Přízemí" },
  ];
  const vilaLabels = [
    { id: 3, top: 14, text: "3. nadzemní podlaží", num: "03" },
    { id: 2, top: 44, text: "2. nadzemní podlaží", num: "02" },
    { id: 1, top: 76, text: "1. nadzemní podlaží", num: "01" },
  ];

  const chatkaZones = [
    { id: 1, top: 0, bot: 100, before: "", tooltip: "Chatka — celá jednotka" },
  ];
  const chatkaLabels = [
    { id: 1, top: 42, text: "Celá chatka", num: "01" },
  ];

  const tancirnaZones = [
    { id: 1, left: 0, right: 52, before: "", tooltip: "Tančírna" },
    { id: 2, left: 52, right: 100, before: "transparent 52%,", tooltip: "Garáž" },
  ];
  const tancirnaLabels = [
    { id: 1, top: 30, text: "Tančírna", num: "01" },
    { id: 2, top: 60, text: "Garáž", num: "02" },
  ];

  return (
    <section id="explore" ref={ref} style={{ background: "#e8e2d8", padding: "56px 0 20px" }}>
      <div style={{
        maxWidth: 1300, margin: "0 auto", padding: "0 clamp(16px,3vw,48px)",
        opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(30px)", transition: `all 1s ${EASE}`,
      }}>
        <div style={{ textAlign: "center", padding: "0 20px 6px" }}>
          <h2 style={{ fontFamily: SERIF, fontWeight: 300, fontSize: "clamp(20px,2.5vw,26px)", letterSpacing: 5, textTransform: "uppercase", color: ACCENT, margin: 0 }}>
            Nabídka
          </h2>
          <p style={{ fontFamily: SANS, fontSize: 10, letterSpacing: 3, textTransform: "uppercase", color: "#9a9088", marginTop: 4 }}>
            Vyberte objekt a podlaží
          </p>
        </div>

        <div style={{ display: "flex", justifyContent: "center", marginBottom: 12, flexWrap: "wrap", gap: 0 }}>
          {tabs.map((t, i) => (
            <span key={t.id} onClick={() => setTab(t.id)} style={{
              padding: "10px 30px", fontFamily: SANS, fontSize: 11, letterSpacing: 2, textTransform: "uppercase",
              cursor: "pointer", border: `1px solid ${tab === t.id ? ACCENT : "#d5cec4"}`,
              background: tab === t.id ? ACCENT : "transparent",
              color: tab === t.id ? "#fff" : "#7a7168",
              transition: "all 0.3s",
              borderRadius: i === 0 ? "4px 0 0 4px" : i === tabs.length - 1 ? "0 4px 4px 0" : 0,
            }}>{t.label}</span>
          ))}
        </div>

        <div style={{ maxWidth: 820, margin: "0 auto" }}>
          {tab === "v" && (
            <FloorSection imgSrc="vila.png" overlayId="vo" zones={vilaZones} labels={vilaLabels} layout="vertical" hint="Najeďte myší na podlaží" />
          )}
          {tab === "c" && (
            <FloorSection imgSrc="chatka.png" overlayId="co" zones={chatkaZones} labels={chatkaLabels} layout="vertical" hint="Najeďte myší pro zvýraznění" />
          )}
          {tab === "t" && (
            <FloorSection imgSrc="tancirna.png" overlayId="to" zones={tancirnaZones} labels={tancirnaLabels} layout="horizontal" hint="Najeďte myší na zónu" />
          )}
        </div>
      </div>
    </section>
  );
}

// ─── PARAMS ───
function Params() {
  const t = useLang();
  const [ref, vis] = useInView();

  return (
    <section id="params" ref={ref} style={{ background: "#f5f0e8", padding: "clamp(80px,12vw,160px) clamp(24px,6vw,100px)" }}>
      <div style={{
        maxWidth: 1200, margin: "0 auto",
        opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(30px)", transition: `all 1s ${EASE}`,
      }}>
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <span style={{ fontFamily: SANS, fontSize: 11, letterSpacing: 4, color: GOLD, textTransform: "uppercase", fontWeight: 500 }}>{t.paramsTag}</span>
          <h2 style={{ fontFamily: SERIF, fontSize: "clamp(32px,4.5vw,56px)", fontWeight: 300, color: "#1e1c18", margin: "12px 0 0", letterSpacing: "-0.01em" }}>
            {t.paramsTitle1}<span style={{ fontStyle: "italic" }}>{t.paramsTitle2}</span>
          </h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 3, marginBottom: 56 }} className="sg">
          {t.paramsStats.map((s, i) => (
            <div key={i} style={{
              background: DARK, padding: "clamp(28px,3vw,48px) 20px", textAlign: "center",
              opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(16px)",
              transition: `all 0.6s ease ${0.2 + i * 0.1}s`,
            }}>
              <div style={{ fontFamily: SERIF, fontSize: "clamp(34px,4.5vw,60px)", fontWeight: 300, color: "#fff" }}>
                {s.value}<span style={{ fontSize: "0.45em", color: GOLD, marginLeft: 4 }}>{s.unit}</span>
              </div>
              <div style={{ fontFamily: SANS, fontSize: 10, letterSpacing: 3, color: "rgba(255,255,255,0.45)", textTransform: "uppercase", marginTop: 8 }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 1, background: "rgba(0,0,0,0.06)" }} className="fg">
          {t.paramsFeatures.map((f, i) => (
            <div key={i} style={{ background: "#f5f0e8", padding: "22px 24px", display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 7, height: 7, background: GOLD, borderRadius: "50%", flexShrink: 0 }} />
              <span style={{ fontFamily: SANS, fontSize: 13.5, fontWeight: 400, color: "#5a5450" }}>{f}</span>
            </div>
          ))}
        </div>

        <div style={{
          marginTop: 56, textAlign: "center", padding: "44px 24px",
          background: DARK, position: "relative", overflow: "hidden",
        }}>
          <div style={{
            position: "absolute", top: 12, right: 16,
            fontFamily: SANS, fontSize: 9, letterSpacing: 2, color: "#fff",
            background: "#9e4a3a", padding: "5px 14px", textTransform: "uppercase", fontWeight: 600,
          }}>{t.paramsActionBadge}</div>
          <span style={{ fontFamily: SANS, fontSize: 11, letterSpacing: 4, color: GOLD, textTransform: "uppercase", fontWeight: 500 }}>
            {t.paramsPriceTag}
          </span>
          <div style={{ fontFamily: SERIF, fontSize: "clamp(38px,5.5vw,68px)", fontWeight: 300, color: "#fff", marginTop: 10 }}>
            {t.paramsPrice} <span style={{ fontSize: "0.45em", color: "rgba(255,255,255,0.4)" }}>{t.paramsPriceCurrency}</span>
          </div>
          <p style={{ fontFamily: SANS, fontSize: 12, color: "rgba(255,255,255,0.4)", marginTop: 8, letterSpacing: 2 }}>
            {t.paramsPriceSub}
          </p>
          <p style={{ fontFamily: SANS, fontSize: 13, color: "rgba(255,255,255,0.55)", marginTop: 16 }}>
            {t.paramsMortgage}
          </p>
          <div onClick={() => scrollTo("contact")} style={{
            ...PILL, display: "inline-flex", alignItems: "center", gap: 8,
            marginTop: 28, background: GOLD, color: "#fff",
          }}
            onMouseEnter={e => e.currentTarget.style.background = "#b8935a"}
            onMouseLeave={e => e.currentTarget.style.background = GOLD}>
            {t.paramsCta} <span style={{ fontSize: 14 }}>→</span>
          </div>
        </div>
      </div>
      <style>{`@media(max-width:768px){.sg{grid-template-columns:repeat(2,1fr)!important}.fg{grid-template-columns:1fr!important}}`}</style>
    </section>
  );
}

// ─── POTENTIAL ───
function Potential() {
  const t = useLang();
  const [ref, vis] = useInView();
  const svgStyle = { width: 36, height: 36, stroke: "#fff", strokeWidth: 1.5, fill: "none", strokeLinecap: "round", strokeLinejoin: "round" };
  const icons = [
    <svg viewBox="0 0 24 24" style={svgStyle}><path d="M3 10.5L12 3l9 7.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z"/><path d="M9 21V14h6v7"/></svg>,
    <svg viewBox="0 0 24 24" style={svgStyle}><path d="M12 2L4 8v12h16V8z"/><path d="M9 22V12h6v10"/><path d="M2 22h20"/><circle cx="12" cy="7" r="1.5"/></svg>,
    <svg viewBox="0 0 24 24" style={svgStyle}><circle cx="12" cy="6" r="3"/><path d="M12 9v4"/><path d="M8 17c0-2.2 1.8-4 4-4s4 1.8 4 4"/><path d="M7 21l2-4"/><path d="M17 21l-2-4"/><path d="M12 13v8"/></svg>,
    <svg viewBox="0 0 24 24" style={svgStyle}><path d="M2 8l10-5 10 5-10 5z"/><path d="M6 10.5v5.5l6 3 6-3v-5.5"/><path d="M22 8v8"/></svg>,
  ];

  return (
    <section id="potential" ref={ref} style={{
      position: "relative", overflow: "hidden",
      background: DARK, padding: "clamp(80px,12vw,160px) clamp(24px,6vw,100px)",
    }}>
      <div style={{
        position: "absolute", inset: 0, opacity: 0.06,
        backgroundImage: `url(${IMGS[6]})`, backgroundSize: "cover", backgroundPosition: "center",
        filter: "blur(2px)",
      }} />
      <div style={{
        position: "relative", zIndex: 1, maxWidth: 1200, margin: "0 auto",
        opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(30px)", transition: `all 1s ${EASE}`,
      }}>
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <span style={{ fontFamily: SANS, fontSize: 11, letterSpacing: 4, color: GOLD, textTransform: "uppercase", fontWeight: 500 }}>{t.potentialTag}</span>
          <h2 style={{ fontFamily: SERIF, fontSize: "clamp(32px,4.5vw,56px)", fontWeight: 300, color: "#fff", margin: "12px 0 0", letterSpacing: "-0.01em" }}>
            {t.potentialTitle1}<span style={{ fontStyle: "italic" }}>{t.potentialTitle2}</span>
          </h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 2 }} className="pg">
          {t.potentialItems.map((item, i) => (
            <div key={i} style={{
              background: "rgba(255,255,255,0.03)", padding: "clamp(28px,3vw,44px) 24px",
              borderTop: `2px solid ${GOLD}`, textAlign: "center",
              transition: "background 0.3s",
            }} onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.06)"}
              onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.03)"}>
              <div style={{ marginBottom: 16, display: "flex", justifyContent: "center" }}>{icons[i]}</div>
              <h3 style={{ fontFamily: SERIF, fontSize: 22, fontWeight: 400, color: "#fff", marginBottom: 12 }}>{item.title}</h3>
              <p style={{ fontFamily: SANS, fontSize: 13, lineHeight: 1.7, color: "rgba(255,255,255,0.5)", fontWeight: 300 }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
      <style>{`@media(max-width:768px){.pg{grid-template-columns:1fr 1fr!important}}`}</style>
    </section>
  );
}

// ─── LOCATION ───
function Location() {
  const t = useLang();
  const [ref, vis] = useInView();
  const s = { width: 20, height: 20, stroke: "#9a9088", strokeWidth: 1.5, fill: "none", strokeLinecap: "round", strokeLinejoin: "round", flexShrink: 0 };
  const locIcons = [
    <svg viewBox="0 0 24 24" style={s}><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/><circle cx="12" cy="9" r="2.5"/></svg>,
    <svg viewBox="0 0 24 24" style={s}><path d="M5 17h14M5 17l-1 3h16l-1-3M7 17V9l2-4h6l2 4v8"/><circle cx="9" cy="13" r="1"/><circle cx="15" cy="13" r="1"/></svg>,
    <svg viewBox="0 0 24 24" style={s}><rect x="3" y="10" width="6" height="11"/><rect x="9" y="4" width="6" height="17"/><rect x="15" y="8" width="6" height="13"/></svg>,
    <svg viewBox="0 0 24 24" style={s}><path d="M4 20L8 10l4 6 4-8 4 12"/></svg>,
    <svg viewBox="0 0 24 24" style={s}><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>,
    <svg viewBox="0 0 24 24" style={s}><path d="M4 17V9h4l3-4h2l3 4h4v8"/><path d="M2 17h20"/><circle cx="7.5" cy="17" r="2"/><circle cx="16.5" cy="17" r="2"/></svg>,
  ];

  return (
    <section id="location" ref={ref} style={{ background: "#f5f0e8", padding: "clamp(80px,12vw,160px) clamp(24px,6vw,100px)" }}>
      <div style={{
        maxWidth: 1200, margin: "0 auto",
        opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(30px)", transition: `all 1s ${EASE}`,
      }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <span style={{ fontFamily: SANS, fontSize: 11, letterSpacing: 4, color: GOLD, textTransform: "uppercase", fontWeight: 500 }}>{t.locationTag}</span>
          <h2 style={{ fontFamily: SERIF, fontSize: "clamp(32px,4.5vw,56px)", fontWeight: 300, color: "#1e1c18", margin: "12px 0 0", letterSpacing: "-0.01em" }}>
            {t.locationTitle1}<span style={{ fontStyle: "italic" }}>{t.locationTitle2}</span>
          </h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, alignItems: "start" }} className="lg">
          <div style={{ width: "100%", aspectRatio: "4/3", background: "#e8e0d4", overflow: "hidden" }}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5100!2d15.4072!3d50.3283!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x470c2cd0a4e1a3b1%3A0x400af0f66159150!2sVysok%C3%A9+Vesel%C3%AD!5e0!3m2!1scs!2scz!4v1700000000000"
              style={{ width: "100%", height: "100%", border: 0, filter: "grayscale(0.6) contrast(1.05) brightness(0.95)" }}
              allowFullScreen="" loading="lazy" title="Mapa"
            />
          </div>
          <div>
            <p style={{ fontFamily: SANS, fontSize: 14, lineHeight: 1.8, color: "#7a7168", fontWeight: 300, marginBottom: 28 }}>
              {t.locationDesc}
            </p>
            {t.locationItems.map((item, i) => (
              <div key={i} style={{
                display: "flex", justifyContent: "space-between", alignItems: "center",
                padding: "16px 0", borderBottom: "1px solid rgba(0,0,0,0.06)",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  {locIcons[i]}
                  <span style={{ fontFamily: SANS, fontSize: 13.5, color: "#8a8078" }}>{item.label}</span>
                </div>
                <span style={{ fontFamily: SANS, fontSize: 13.5, color: "#3a3530", fontWeight: 500 }}>{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <style>{`@media(max-width:768px){.lg{grid-template-columns:1fr!important}}`}</style>
    </section>
  );
}

// ─── CONTACT ───
function Contact() {
  const t = useLang();
  const [ref, vis] = useInView();
  const [sent, setSent] = useState(false);

  const inputStyle = {
    fontFamily: SANS, fontSize: 14, padding: "15px 18px",
    border: "1px solid rgba(200,169,110,0.15)", background: "rgba(255,255,255,0.06)",
    outline: "none", transition: "border-color 0.3s", color: "#e8e0d4", width: "100%", boxSizing: "border-box",
  };

  return (
    <section id="contact" ref={ref} style={{ background: DARK, padding: "clamp(80px,12vw,160px) clamp(24px,6vw,100px)" }}>
      <div style={{
        maxWidth: 800, margin: "0 auto",
        opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(30px)", transition: `all 1s ${EASE}`,
      }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <span style={{ fontFamily: SANS, fontSize: 11, letterSpacing: 4, color: GOLD, textTransform: "uppercase", fontWeight: 500 }}>{t.contactTag}</span>
          <h2 style={{ fontFamily: SERIF, fontSize: "clamp(32px,4.5vw,56px)", fontWeight: 300, color: "#fff", margin: "12px 0 0", letterSpacing: "-0.01em" }}>
            {t.contactTitle1}<span style={{ fontStyle: "italic" }}>{t.contactTitle2}</span>
          </h2>
          <p style={{ fontFamily: SANS, fontSize: 13, color: "rgba(255,255,255,0.4)", marginTop: 12, maxWidth: 480, marginLeft: "auto", marginRight: "auto" }}>
            {t.contactSub}
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 28, marginBottom: 44, textAlign: "center" }} className="ci">
          {t.contactInfo.map((c, i) => (
            <div key={i}>
              <div style={{ fontFamily: SANS, fontSize: 10, letterSpacing: 3, color: GOLD, textTransform: "uppercase", marginBottom: 6 }}>{c.label}</div>
              <div style={{ fontFamily: SANS, fontSize: 14, color: "rgba(255,255,255,0.7)" }}>{c.value}</div>
            </div>
          ))}
        </div>

        {!sent ? (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }} className="cf">
            <input placeholder={t.contactName} style={inputStyle}
              onFocus={e => e.target.style.borderColor = GOLD} onBlur={e => e.target.style.borderColor = "rgba(0,0,0,0.08)"} />
            <input placeholder={t.contactPhone} style={inputStyle}
              onFocus={e => e.target.style.borderColor = GOLD} onBlur={e => e.target.style.borderColor = "rgba(0,0,0,0.08)"} />
            <input placeholder={t.contactEmail} style={{ ...inputStyle, gridColumn: "span 2" }} className="cfs"
              onFocus={e => e.target.style.borderColor = GOLD} onBlur={e => e.target.style.borderColor = "rgba(0,0,0,0.08)"} />
            <textarea placeholder={t.contactMessage} rows={5}
              style={{ ...inputStyle, resize: "vertical", gridColumn: "span 2" }} className="cfs"
              onFocus={e => e.target.style.borderColor = GOLD} onBlur={e => e.target.style.borderColor = "rgba(0,0,0,0.08)"} />
            <button onClick={() => setSent(true)} style={{
              ...PILL, gridColumn: "span 2", padding: "17px 40px",
              background: GOLD, color: "#fff",
            }} className="cfs"
              onMouseEnter={e => e.target.style.background = "#b8935a"}
              onMouseLeave={e => e.target.style.background = GOLD}>
              {t.contactSend}
            </button>
          </div>
        ) : (
          <div style={{ textAlign: "center", padding: 48, border: "1px solid rgba(255,255,255,0.06)" }}>
            <div style={{ fontSize: 32, marginBottom: 14, color: GOLD }}>✓</div>
            <p style={{ fontFamily: SERIF, fontSize: 24, color: "#fff", fontWeight: 300 }}>{t.contactThanks}</p>
            <p style={{ fontFamily: SANS, fontSize: 13, color: "rgba(255,255,255,0.5)", marginTop: 8 }}>{t.contactThanksDesc}</p>
          </div>
        )}
      </div>
      <style>{`@media(max-width:768px){.ci{grid-template-columns:1fr!important}.cf{grid-template-columns:1fr!important}.cfs{grid-column:span 1!important}}`}</style>
    </section>
  );
}

// ─── FOOTER ───
function Footer() {
  const t = useLang();
  return (
    <footer style={{ background: DARK, padding: "40px clamp(20px,6vw,100px) 28px", borderTop: "1px solid rgba(255,255,255,0.04)" }}>
      <div style={{
        maxWidth: 1200, margin: "0 auto",
        display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12,
      }}>
        <span style={{ fontFamily: SERIF, fontSize: 18, fontWeight: 400, color: "rgba(255,255,255,0.6)", letterSpacing: 2 }}>VILA VESELÍ</span>
        <span style={{ fontFamily: SANS, fontSize: 11, color: "rgba(255,255,255,0.2)", letterSpacing: 1 }}>{t.footerRights}</span>
      </div>
    </footer>
  );
}

// ─── STICKY CTA BAR ───
function StickyBar() {
  const t = useLang();
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const h = () => {
      const atBottom = (window.innerHeight + window.scrollY) >= document.body.scrollHeight - 80;
      setVisible(window.scrollY > 600 && !atBottom);
    };
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <div style={{
      position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 900,
      background: "rgba(11,11,11,0.95)", backdropFilter: "blur(16px)",
      borderTop: "1px solid rgba(255,255,255,0.06)",
      padding: "12px clamp(16px,4vw,48px)",
      display: "flex", alignItems: "center", justifyContent: "space-between",
      transform: visible ? "translateY(0)" : "translateY(100%)",
      transition: "transform 0.4s ease",
    }} className="sbar">
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <div>
          <span style={{ fontFamily: SERIF, fontSize: 20, fontWeight: 400, color: "#fff" }}>{t.stickyPrice}</span>
          <span style={{ fontFamily: SANS, fontSize: 10, color: "rgba(255,255,255,0.4)", marginLeft: 10, letterSpacing: 1 }}>
            {t.stickyBadge}
          </span>
        </div>
      </div>
      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
        <span style={{
          fontFamily: SANS, fontSize: 11, color: "rgba(255,255,255,0.5)", letterSpacing: 1,
          display: "none",
        }} className="sbar-txt">{t.stickyReady}</span>
        <span onClick={() => scrollTo("contact")} style={{
          ...PILL, padding: "11px 24px",
          background: GOLD, color: "#fff",
        }}
          onMouseEnter={e => e.target.style.background = "#b8935a"}
          onMouseLeave={e => e.target.style.background = GOLD}>
          {t.stickyCta}
        </span>
      </div>
      <style>{`@media(min-width:640px){.sbar-txt{display:block!important}}`}</style>
    </div>
  );
}

// ─── APP ───
export default function App() {
  const [phase, setPhase] = useState(0);
  const [lang, setLang] = useState("cs");
  // 0 = dark, 1 = text fades in, 2 = line draws, 3 = fade out splash, 4 = site visible

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 300);
    const t2 = setTimeout(() => setPhase(2), 1000);
    const t3 = setTimeout(() => setPhase(3), 2200);
    const t4 = setTimeout(() => setPhase(4), 2500);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
  }, []);

  const t = T[lang];

  return (
    <LangContext.Provider value={lang}>
      <div style={{ margin: 0, padding: 0, background: DARK, overflowX: "hidden" }}>
        {/* Splash screen */}
        {phase < 4 && (
          <div style={{
            position: "fixed", inset: 0, zIndex: 9999,
            background: "#141210",
            display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
            opacity: phase >= 3 ? 0 : 1,
            transition: "opacity 0.8s ease",
          }}>
            <svg viewBox="0 0 60 50" style={{
              width: 56, height: 46, stroke: GOLD, strokeWidth: 1.2, fill: "none",
              strokeLinecap: "round", strokeLinejoin: "round",
              opacity: phase >= 1 ? 1 : 0,
              transform: phase >= 1 ? "translateY(0)" : "translateY(12px)",
              transition: "all 1s cubic-bezier(0.22,1,0.36,1)",
              marginBottom: 24,
            }}>
              <path d="M5 25 L30 8 L55 25" />
              <path d="M10 25 L10 45 L50 45 L50 25" />
              <path d="M22 45 L22 32 L38 32 L38 45" />
              <path d="M15 20 L15 12 L22 12 L22 17" />
            </svg>

            <div style={{
              display: "inline-flex", flexDirection: "column", alignItems: "center",
              opacity: phase >= 1 ? 1 : 0,
              transform: phase >= 1 ? "translateY(0)" : "translateY(12px)",
              transition: "all 1s cubic-bezier(0.22,1,0.36,1) 0.15s",
            }}>
              <div style={{
                fontFamily: SERIF, fontSize: "clamp(18px, 3vw, 28px)", fontWeight: 300,
                color: "rgba(255,255,255,0.85)", letterSpacing: "clamp(8px, 1.5vw, 16px)",
                textTransform: "uppercase", paddingBottom: 14,
              }}>
                {t.splashTitle}
              </div>
              <div style={{
                width: phase >= 2 ? "100%" : "0%", height: 1,
                background: GOLD,
                transition: "width 1s cubic-bezier(0.22,1,0.36,1)",
              }} />
            </div>
          </div>
        )}

        {/* Main site */}
        <div style={{
          opacity: phase >= 3 ? 1 : 0,
          transition: "opacity 0.6s ease 0.2s",
        }}>
          <Nav lang={lang} setLang={setLang} />
          <Hero ready={phase >= 4} />
          <About />
          <Gallery />
          <InteractiveMap />
          <div style={{
            background: GOLD, padding: "14px 0", overflow: "hidden", whiteSpace: "nowrap",
          }}>
            <div style={{
              display: "inline-block", animation: "marquee 20s linear infinite",
              fontFamily: SANS, fontSize: 12, letterSpacing: 4, color: "#fff",
              textTransform: "uppercase", fontWeight: 500,
            }}>
              {t.marquee}
            </div>
          </div>
          <Params />
          <Potential />
          <Location />
          <Contact />
          <Footer />
        </div>

        <StickyBar />

        <style>{`@keyframes marquee{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}`}</style>
      </div>
    </LangContext.Provider>
  );
}
