"use strict";
/* ========== EDIT HERE: business details ========== */
const BUSINESS_CONFIG = {
  name: "BB Interiors",
  phone: "+919648477743",          // from Google listing screenshot (096484 77743)
  phoneDisplay: "096484 77743",
  phoneFooter: "+91 9648477743",   // shown in the footer
  whatsappNumber: "919648477743",  // digits only, no "+". Inferred from the listing's number; CONFIRM before launch
  email: "",                       // not supplied: email button stays hidden
  address: "Infront of Shiva hospital, Bargaon, police chowki, Gonda, Uttar Pradesh 271002",
  googleMapsUrl: "",               // paste the exact Google Maps share link here when you have it
  socialLinks: { instagram: "", facebook: "", pinterest: "" }
  // Ratings/reviews: none supplied for BB Interiors, so none are shown.
};
const IMAGES = [
  { id: "living-blue", src: "./living-room-blue.png", cat: "Living Rooms", alt: "Living room with a cream sectional sofa, marble TV wall and blue cove lighting", cap: "Contemporary living room" },
  { id: "living-tall", src: "./living-room-double-height.png", cat: "Living Rooms", alt: "Double-height living room with a glass-railed staircase, brass pendant rings and indoor water feature", cap: "Double-height living space" },
  { id: "bedroom", src: "./bedroom.png", cat: "Bedrooms", alt: "Bedroom with upholstered headboard, wood-slat panelling, round mirror and dressing desk", cap: "Layered-lighting bedroom" },
  { id: "kitchen", src: "./kitchen.png", cat: "Kitchens", alt: "Kitchen with a marble waterfall island, grey cabinetry and glowing open shelves", cap: "Island kitchen" },
  { id: "dining", src: "./dining.png", cat: "Dining Areas", alt: "Dining area with a marble-top table, velvet chairs, glass pendants and a framed abstract artwork", cap: "Dining area" }
];
const byId = id => IMAGES.find(i => i.id === id);
const SERVICES = [
  { t: "Complete Home Interiors", img: "living-tall", d: "Planning and styling of every room as one cohesive, comfortable home." },
  { t: "Living Room Design", img: "living-blue", d: "Seating layouts, feature walls, lighting and storage for a space you actually use." },
  { t: "Bedroom Interiors", img: "bedroom", d: "Restful layouts with wardrobes, headboards, bedside lighting and soft finishes." },
  { t: "Kitchen Interiors", img: "kitchen", d: "Practical work triangles, storage and surfaces that look good and clean easily." },
  { t: "Dining Areas", img: "dining", d: "Furniture, lighting and styling that make shared meals feel special." },
  { t: "Space Planning and Layout", img: "living-tall", d: "Furniture arrangement and movement planning to get more from every room." }
];
const PRINCIPLES = [["Space planning", "Layouts that make everyday movement easy."], ["Material harmony", "Colours and textures that work together."], ["Lighting balance", "Layered light for mood and function."], ["Practical storage", "Beauty that stays tidy."], ["Personal design", "Interiors shaped around how you live."]];

/* ========== helpers ========== */
const C = BUSINESS_CONFIG;
const $ = s => document.querySelector(s);
const h = (t, a = {}, ...k) => { const e = document.createElement(t); for (const [n, v] of Object.entries(a)) { if (v == null || v === false) continue; if (n === "class") e.className = v; else if (n.startsWith("on")) e.addEventListener(n.slice(2), v); else e.setAttribute(n, v === true ? "" : v); } e.append(...k.flat().filter(x => x != null && x !== false)); return e; };
const mapsUrl = C.googleMapsUrl || (C.address ? "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(C.address) : "");
const waUrl = txt => "https://wa.me/" + C.whatsappNumber.replace(/\D/g, "") + (txt ? "?text=" + encodeURIComponent(txt) : "");
const pic = i => h("img", { src: i.src, alt: i.alt, width: 1536, height: 1024, loading: "lazy", decoding: "async", onerror: e => e.target.classList.add("broken") });
const fig = (i, list, cls = "") => h("button", { class: "fig rv " + cls, type: "button", "aria-label": "View larger: " + i.cap, onclick: e => openLB(list, list.indexOf(i), e.currentTarget) }, pic(i), h("span", { class: "cap glass" }, i.cap));
const cta = (txt, href, cls = "") => h("a", { class: "btn " + cls, href }, txt, " →");
const waIcon = () => { const n = "http://www.w3.org/2000/svg", v = document.createElementNS(n, "svg"), p = document.createElementNS(n, "path"); v.setAttribute("viewBox", "0 0 24 24"); v.setAttribute("aria-hidden", "true"); p.setAttribute("d", "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"); v.append(p); return v; };
const state = { service: "", filter: "All" };
let obs, lbList = [], lbIdx = 0;

/* ========== pages ========== */
const PAGES = {
  "/": () => { const hero = byId("living-blue"); return h("div", {},
    h("section", { class: "hero" }, h("img", { src: hero.src, alt: hero.alt, width: 1536, height: 1024, fetchpriority: "high", onerror: e => e.target.remove() }),
      h("div", { class: "wrap" }, h("span", { class: "badge glass" }, "Interior design · Gonda, UP"), h("h1", {}, "Interiors that feel like ", h("i", {}, "you.")),
        h("p", {}, "Thoughtfully planned interiors where beauty, comfort and everyday function come together."),
        h("div", { class: "row" }, cta("Discuss Your Project", "#/contact"), cta("Explore Our Work", "#/portfolio", "alt")))),
    h("section", { class: "sec wrap" }, h("h2", { class: "rv" }, "Featured ", h("i", {}, "interiors")), h("p", { class: "lead rv" }, "Labels describe what each photograph shows, not client project names."),
      h("div", { class: "grid c3" }, IMAGES.slice(0, 3).map((i, n) => fig(i, IMAGES.slice(0, 3), n === 0 ? "big" : ""))), h("div", { class: "row" }, cta("Full portfolio", "#/portfolio", "alt"))),
    h("section", { class: "sec alt-bg" }, h("div", { class: "wrap" }, h("h2", { class: "rv" }, "What we can ", h("i", {}, "design")), h("div", { class: "grid c3" }, SERVICES.slice(0, 3).map(svcCard)), h("div", { class: "row" }, cta("All services", "#/services", "alt")))),
    h("section", { class: "sec wrap" }, h("h2", { class: "rv" }, "Design ", h("i", {}, "principles")), h("div", { class: "grid c3" }, PRINCIPLES.map(p => h("div", { class: "card rv" }, h("h3", {}, p[0]), h("p", {}, p[1]))))),
    ctaBlock()); },
  "/services": () => h("div", { class: "wrap pg sec" }, h("h1", {}, "Our ", h("i", {}, "services")), h("p", { class: "lead" }, "Example service categories. Tell us about your space and we will talk through what suits it."),
    h("div", { class: "grid" }, SERVICES.map(s => { const i = byId(s.img); return h("article", { class: "card svc rv" }, h("div", { class: "fig" }, pic(i)), h("div", {}, h("h2", {}, s.t), h("p", {}, s.d), h("a", { class: "btn", href: "#/contact", onclick: () => state.service = s.t }, "Enquire about this →"))); })), ctaBlock()),
  "/portfolio": () => { const cats = ["All", ...new Set(IMAGES.map(i => i.cat))]; const g = h("div", { class: "grid c2" });
    const draw = () => { const l = IMAGES.filter(i => state.filter === "All" || i.cat === state.filter); g.replaceChildren(...l.map(i => fig(i, l))); g.querySelectorAll(".rv").forEach(e => obs && obs.observe(e)); };
    const chips = h("div", { class: "chips", role: "group", "aria-label": "Filter by room" }, cats.map(c => h("button", { class: "chip", type: "button", "aria-pressed": String(c === state.filter), onclick: e => { state.filter = c; chips.querySelectorAll(".chip").forEach(b => b.setAttribute("aria-pressed", String(b === e.currentTarget))); draw(); } }, c)));
    const p = h("div", { class: "wrap pg sec" }, h("h1", {}, h("i", {}, "Portfolio")), h("p", { class: "lead" }, "Tap any photograph to view it larger."), chips, g); queueMicrotask(draw); return p; },
  "/about": () => h("div", { class: "wrap pg sec" }, h("h1", {}, "About ", h("i", {}, "BB Interiors")),
    h("div", { class: "two" }, h("div", {}, h("p", { class: "lead" }, "BB Interiors is an interior design and styling studio in Gonda, Uttar Pradesh, focused on beautiful, functional living spaces."),
      h("p", {}, "We believe good interiors start with how you live: how you move through a room, where light falls and what needs to be within reach. From there we shape layouts, materials, furniture and lighting into a calm, personal result."),
      h("p", {}, "Good design has practical value too: better storage, easier everyday routines and rooms that feel comfortable to come home to."), h("div", { class: "row" }, cta("Discuss your space", "#/contact"))), fig(byId("dining"), [byId("dining")])),
    h("h2", { class: "rv", style: "margin-top:2em" }, "How we ", h("i", {}, "approach"), " a space"), h("div", { class: "grid c3" }, PRINCIPLES.slice(0, 3).map(p => h("div", { class: "card rv" }, h("h3", {}, p[0]), h("p", {}, p[1]))))),
  "/contact": contactPage
};
function svcCard(s) { const i = byId(s.img); return h("article", { class: "card rv" }, h("div", { class: "fig", style: "box-shadow:none;cursor:default;margin-bottom:16px" }, pic(i)), h("h3", {}, s.t), h("p", {}, s.d), h("a", { href: "#/contact", onclick: () => state.service = s.t }, "Enquire →")); }
function ctaBlock() { return h("section", { class: "wrap sec" }, h("div", { class: "cta rv" }, h("h2", {}, "Let's design a space that feels like ", h("i", {}, "home.")), h("p", { class: "lead" }, "Share a few details about your space and we will take it from there."), h("div", { class: "row" }, cta("Start an enquiry", "#/contact", "alt")))); }

/* ========== contact ========== */
function contactPage() {
  const f = h("form", { novalidate: true }), st = h("p", { class: "stat", role: "status", "aria-live": "polite" });
  const fld = (id, lab, el, req) => h("label", { for: id }, lab + (req ? " *" : ""), el, h("span", { class: "err", id: id + "-e" }));
  const inp = (id, type = "text", extra = {}) => h("input", { id, name: id, type, autocomplete: extra.ac, ...extra });
  const sel = (id, opts) => h("select", { id, name: id }, opts.map(o => h("option", { value: o }, o || "Select…")));
  f.append(fld("name", "Full name", inp("name", "text", { ac: "name", required: true }), 1), fld("phone", "Phone", inp("phone", "tel", { ac: "tel", inputmode: "tel" })), fld("email", "Email", inp("email", "email", { ac: "email" })),
    h("p", { class: "lead", style: "font-size:.9rem" }, "Provide at least a phone number or an email."),
    fld("space", "Type of space", sel("space", ["", "Apartment", "Independent house", "Single room", "Other"])), fld("service", "Service of interest", sel("service", ["", ...SERVICES.map(s => s.t)])),
    fld("budget", "Approximate budget (optional)", inp("budget")), fld("location", "Project location (optional)", inp("location")),
    fld("pref", "Preferred contact method", sel("pref", ["Phone call", "WhatsApp", "Email"])), fld("msg", "About your project (optional)", h("textarea", { id: "msg", name: "msg", rows: 4 })));
  const act = h("div", { class: "row" });
  if (C.whatsappNumber) act.append(h("button", { class: "btn wa", type: "submit" }, "Review & send on WhatsApp"));
  if (C.email) act.append(h("button", { class: "btn alt", type: "button", onclick: () => send("mail") }, "Email instead"));
  f.append(act, st);
  if (!C.whatsappNumber && !C.email) st.textContent = "Online enquiries are not set up yet. Please call us" + (C.phoneDisplay ? " on " + C.phoneDisplay : "") + ".";
  f.elements.service.value = state.service; f.addEventListener("input", () => (state.service = ""));
  const send = mode => {
    const v = Object.fromEntries(new FormData(f)); let ok = true;
    const set = (id, m) => { f.querySelector("#" + id + "-e").textContent = m; f.elements[id].setAttribute("aria-invalid", m ? "true" : "false"); if (m) ok = false; };
    v.name = (v.name || "").trim(); set("name", v.name ? "" : "Please enter your name.");
    const em = (v.email || "").trim(), ph = (v.phone || "").replace(/[\s-]/g, "");
    set("email", em && !/^\S+@\S+\.\S+$/.test(em) ? "Enter a valid email." : ""); set("phone", ph && !/^\+?\d{7,15}$/.test(ph) ? "Enter a valid phone number." : "");
    if (ok && !em && !ph) { set("phone", "Enter a phone number or email."); }
    if (!ok) { st.textContent = "Please fix the highlighted fields."; f.querySelector("[aria-invalid=true]").focus(); return; }
    const L = ["Hello " + C.name + ", I'd like to discuss an interior project.", "", "Name: " + v.name, ph && "Phone: " + v.phone, em && "Email: " + em, v.space && "Space: " + v.space, v.service && "Service: " + v.service, v.budget && "Budget: " + v.budget, v.location && "Location: " + v.location, "Preferred contact: " + v.pref, v.msg && "Details: " + v.msg].filter(x => x !== "" && x != null && x !== false && x !== undefined).join("\n");
    if (mode === "mail") { location.href = "mailto:" + C.email + "?subject=" + encodeURIComponent("Project enquiry") + "&body=" + encodeURIComponent(L); st.textContent = "Your email app should open. Nothing is sent until you send it there; delivery depends on your email app."; }
    else { window.open(waUrl(L), "_blank", "noopener"); st.textContent = "WhatsApp is opening with your message. Your enquiry is only delivered once you press send there."; }
  };
  f.addEventListener("submit", e => { e.preventDefault(); send("wa"); });
  const det = h("div", { class: "card" }, h("h2", {}, "Contact"), h("p", {}, C.address),
    C.phone && h("p", {}, h("a", { href: "tel:" + C.phone }, "Call " + (C.phoneDisplay || C.phone))), C.whatsappNumber && h("p", {}, h("a", { href: waUrl(), target: "_blank", rel: "noopener" }, "Chat on WhatsApp")), C.email && h("p", {}, h("a", { href: "mailto:" + C.email }, C.email)),
    mapsUrl && h("p", {}, h("a", { href: mapsUrl, target: "_blank", rel: "noopener" }, "Open in Google Maps")),
    C.address && h("iframe", { class: "map", title: "Map showing " + C.address, loading: "lazy", referrerpolicy: "no-referrer-when-downgrade", src: "https://www.google.com/maps?q=" + encodeURIComponent(C.address) + "&output=embed" }));
  return h("div", { class: "wrap pg sec" }, h("h1", {}, "Discuss your ", h("i", {}, "project")), h("p", { class: "lead" }, "Fill in the form and review the message before it opens in WhatsApp. This website does not store your details."), h("div", { class: "two" }, f, det));
}

/* ========== lightbox ========== */
function openLB(list, i, from) { lbList = list; lbIdx = i; showLB(); $("#lb").returnFocusTo = from; $("#lb").showModal(); document.body.style.overflow = "hidden"; }
function showLB() { const i = lbList[lbIdx]; $("#lbi").src = i.src; $("#lbi").alt = i.alt; $("#lbc").textContent = i.cap; }
const stepLB = d => { lbIdx = (lbIdx + d + lbList.length) % lbList.length; showLB(); };

/* ========== router, theme, menu ========== */
const TITLES = { "/": "BB Interiors | Interior Design in Gonda", "/services": "Services | BB Interiors", "/portfolio": "Portfolio | BB Interiors", "/about": "About | BB Interiors", "/contact": "Contact | BB Interiors" };
function route() {
  const p = location.hash.slice(1).split("?")[0] || "/", ok = PAGES[p], m = $("#main");
  m.replaceChildren(ok ? PAGES[p]() : h("div", { class: "wrap pg sec" }, h("h1", {}, "Page not found"), cta("Back home", "#/")));
  document.title = TITLES[p] || "Not found | BB Interiors";
  document.querySelectorAll("#nav a[data-r]").forEach(a => a.dataset.r === p ? a.setAttribute("aria-current", "page") : a.removeAttribute("aria-current"));
  menu(false); scrollTo(0, 0); if (obs) obs.disconnect();
  if ("IntersectionObserver" in window) { obs = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); obs.unobserve(e.target); } }), { threshold: .12 }); m.querySelectorAll(".rv").forEach(e => obs.observe(e)); } else m.querySelectorAll(".rv").forEach(e => e.classList.add("in"));
}
function menu(open) { $("#nav").classList.toggle("open", open); $("#mb").setAttribute("aria-expanded", String(open)); $("#mb").setAttribute("aria-label", open ? "Close menu" : "Open menu"); }
function footer() {
  const l = (t, href, ext) => h("a", { href, ...(ext ? { target: "_blank", rel: "noopener" } : {}) }, t);
  $("#ft").append(h("div", { class: "wrap" }, h("div", {}, h("a", { class: "brand", href: "#/" }, "BB", h("span", {}, "Interiors")), h("p", { class: "lead" }, "Thoughtfully designed interiors in Gonda, Uttar Pradesh."), h("small", {}, "© " + new Date().getFullYear() + " " + C.name)),
    h("div", {}, h("strong", {}, "Pages"), ["Home|/", "Services|/services", "Portfolio|/portfolio", "About|/about", "Contact|/contact"].map(x => l(x.split("|")[0], "#" + x.split("|")[1]))),
    h("div", {}, h("strong", {}, "Contact"), C.phone && l(C.phoneFooter || C.phoneDisplay || C.phone, "tel:" + C.phone), C.whatsappNumber && l("WhatsApp", waUrl(), 1), C.email && l(C.email, "mailto:" + C.email), mapsUrl && l("Google Maps", mapsUrl, 1), Object.entries(C.socialLinks).filter(e => e[1]).map(e => l(e[0], e[1], 1)))));
  $("#fab").append(C.whatsappNumber && h("a", { class: "fw", href: waUrl("Hello, I'd like to discuss an interior project."), target: "_blank", rel: "noopener", "aria-label": "Chat on WhatsApp" }, waIcon()), C.phone && h("a", { class: "fp", href: "tel:" + C.phone, "aria-label": "Call " + C.name }, "✆"));
}
function init() {
  const root = document.documentElement, th = $("#th");
  const lab = () => th.setAttribute("aria-label", root.dataset.theme === "dark" ? "Switch to light theme" : "Switch to dark theme"); lab();
  th.addEventListener("click", () => { root.dataset.theme = root.dataset.theme === "dark" ? "light" : "dark"; try { localStorage.setItem("bb-theme", root.dataset.theme); } catch (e) {} lab(); });
  $("#mb").addEventListener("click", () => menu(!$("#nav").classList.contains("open")));
  addEventListener("keydown", e => { if (e.key === "Escape") menu(false); });
  document.addEventListener("click", e => { if (e.target.closest("#nav a")) menu(false); });
  const lb = $("#lb"); $("#lbx").onclick = () => lb.close(); $("#lbp").onclick = () => stepLB(-1); $("#lbn").onclick = () => stepLB(1);
  lb.addEventListener("keydown", e => { if (e.key === "ArrowLeft") stepLB(-1); if (e.key === "ArrowRight") stepLB(1); });
  lb.addEventListener("click", e => { if (e.target === lb) lb.close(); });
  lb.addEventListener("close", () => { document.body.style.overflow = ""; if (lb.returnFocusTo && lb.returnFocusTo.isConnected) lb.returnFocusTo.focus(); });
  footer(); addEventListener("hashchange", route); route();
}
init();
