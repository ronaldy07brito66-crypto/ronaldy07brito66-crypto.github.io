/* ==========================================================
   CONFIGURAÇÃO — edite apenas este bloco
   ========================================================== */
const CONFIG = {
  // Número com código do país + DDD, só dígitos
  whatsapp: "5575982906676",

  // Mensagem pré-preenchida dos botões de WhatsApp
  mensagem: "Olá, Ronaldy! Vim pelo site e gostaria de mais informações sobre um atendimento.",

  // E-mail que recebe as mensagens do formulário (via FormSubmit.co)
  email: "ronaldy07brito66@gmail.com",
};

/* ========================================================== */

document.documentElement.classList.remove("no-js");

const waLink = (texto) =>
  `https://wa.me/${CONFIG.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(texto)}`;

/* ---------- Links de WhatsApp ---------- */
document.querySelectorAll(".js-whatsapp").forEach((el) => {
  el.href = waLink(CONFIG.mensagem);
  el.target = "_blank";
  el.rel = "noopener";
});

/* ---------- Ano no rodapé ---------- */
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

/* ---------- Cabeçalho ao rolar + botão flutuante ---------- */
const header = document.getElementById("header");
const waFloat = document.querySelector(".wa-float");
const hero = document.getElementById("inicio");

const onScroll = () => {
  const y = window.scrollY;
  header.classList.toggle("is-scrolled", y > 20);
  if (waFloat && hero) waFloat.classList.toggle("is-visible", y > hero.offsetHeight * 0.6);
};
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

/* ---------- Menu mobile ---------- */
const nav = document.getElementById("nav");
const toggle = document.getElementById("navToggle");

const setMenu = (open) => {
  nav.classList.toggle("is-open", open);
  document.body.classList.toggle("menu-open", open);
  toggle.setAttribute("aria-expanded", String(open));
  toggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
};

toggle.addEventListener("click", () => setMenu(!nav.classList.contains("is-open")));
nav.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => setMenu(false)));
document.addEventListener("keydown", (e) => { if (e.key === "Escape") setMenu(false); });
document.addEventListener("click", (e) => {
  if (nav.classList.contains("is-open") && !nav.contains(e.target) && !toggle.contains(e.target)) setMenu(false);
});
window.matchMedia("(min-width: 900px)").addEventListener("change", (e) => { if (e.matches) setMenu(false); });

/* ---------- Transição suave entre seções ---------- */
const veil = document.querySelector(".veil");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
let transitioning = false;

document.addEventListener("click", (e) => {
  const link = e.target.closest('a[href^="#"]');
  if (!link || link.classList.contains("js-whatsapp")) return;
  const hash = link.getAttribute("href");
  const target = hash.length > 1 && document.querySelector(hash);
  if (!target) return;

  e.preventDefault();
  if (reduceMotion.matches || !veil) {
    target.scrollIntoView();
    history.pushState(null, "", hash);
    return;
  }
  if (transitioning) return;
  transitioning = true;

  veil.classList.add("is-active");
  setTimeout(() => {
    target.scrollIntoView({ behavior: "instant", block: "start" });
    history.pushState(null, "", hash);
    // revela de imediato os elementos da seção de destino
    target.querySelectorAll(".reveal").forEach((el) => el.classList.add("is-visible"));
    requestAnimationFrame(() => {
      veil.classList.remove("is-active");
      transitioning = false;
    });
  }, 420);
});

/* ---------- Link ativo no menu ---------- */
const links = [...document.querySelectorAll(".nav__link")];
const sections = links.map((l) => document.querySelector(l.getAttribute("href"))).filter(Boolean);

if ("IntersectionObserver" in window) {
  const spy = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        links.forEach((l) => l.classList.toggle("is-active", l.getAttribute("href") === `#${entry.target.id}`));
      });
    },
    { rootMargin: "-45% 0px -50% 0px" }
  );
  sections.forEach((s) => spy.observe(s));

  /* ---------- Animações de entrada ---------- */
  const reveal = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );
  document.querySelectorAll(".reveal").forEach((el, i) => {
    // Pequeno escalonamento entre cartões vizinhos
    el.style.transitionDelay = `${(i % 3) * 70}ms`;
    reveal.observe(el);
  });
} else {
  document.querySelectorAll(".reveal").forEach((el) => el.classList.add("is-visible"));
}

/* ---------- Formulário ---------- */
const form = document.getElementById("contactForm");
const statusEl = document.getElementById("formStatus");
const phone = document.getElementById("telefone");

// Máscara (00) 00000-0000
phone.addEventListener("input", () => {
  const d = phone.value.replace(/\D/g, "").slice(0, 11);
  let v = d;
  if (d.length > 2) v = `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length > 7) v = `(${d.slice(0, 2)}) ${d.slice(2, d.length - 4)}-${d.slice(-4)}`;
  phone.value = v;
});

const rules = {
  nome: (v) => (v.trim().length >= 3 ? "" : "Informe seu nome completo."),
  telefone: (v) => (v.replace(/\D/g, "").length >= 10 ? "" : "Informe um telefone válido com DDD."),
  email: (v) => (/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) ? "" : "Informe um e-mail válido."),
  area: (v) => (v ? "" : "Selecione uma área de interesse."),
  mensagem: (v) => (v.trim().length >= 10 ? "" : "Descreva sua situação (mínimo de 10 caracteres)."),
  lgpd: (_, el) => (el.checked ? "" : "É necessário autorizar o uso dos dados para retorno."),
};

const validateField = (el) => {
  const rule = rules[el.name];
  if (!rule || !el.closest(".field")) return true;
  const msg = rule(el.value, el);
  const field = el.closest(".field");
  field.classList.toggle("has-error", !!msg);
  field.querySelector(".field__error").textContent = msg;
  el.setAttribute("aria-invalid", msg ? "true" : "false");
  return !msg;
};

form.querySelectorAll("input, select, textarea").forEach((el) => {
  el.addEventListener("blur", () => validateField(el));
  el.addEventListener("input", () => { if (el.closest(".field")?.classList.contains("has-error")) validateField(el); });
  el.addEventListener("change", () => validateField(el));
});

// Texto do botão acompanha o modo de envio escolhido
const submitBtn = document.getElementById("submitBtn");
form.querySelectorAll('input[name="envio"]').forEach((r) =>
  r.addEventListener("change", () => {
    submitBtn.textContent = r.value === "email" ? "Enviar por e-mail" : "Enviar pelo WhatsApp";
    setStatus("");
  })
);

const setStatus = (msg, type) => {
  statusEl.textContent = msg;
  statusEl.className = `form__status ${type ? `is-${type}` : ""}`;
};

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const fields = [...form.querySelectorAll("input, select, textarea")];
  const results = fields.map(validateField);
  if (results.includes(false)) {
    fields[results.indexOf(false)].focus();
    setStatus("Verifique os campos destacados.", "error");
    return;
  }

  const data = Object.fromEntries(new FormData(form));

  if (data.envio === "email") {
    submitBtn.disabled = true;
    setStatus("Enviando…");
    try {
      const res = await fetch(`https://formsubmit.co/ajax/${CONFIG.email}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          _subject: `Novo contato pelo site — ${data.area}`,
          _template: "table",
          _replyto: data.email,
          Nome: data.nome,
          Telefone: data.telefone,
          "E-mail": data.email,
          Área: data.area,
          Mensagem: data.mensagem,
        }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok || String(json.success) === "false") throw new Error();
      form.reset();
      submitBtn.textContent = "Enviar pelo WhatsApp";
      setStatus("Mensagem enviada com sucesso! Retornarei em breve.", "success");
    } catch {
      setStatus("Não foi possível enviar agora. Tente pelo WhatsApp.", "error");
    } finally {
      submitBtn.disabled = false;
    }
    return;
  }

  // Padrão: abre o WhatsApp com a mensagem montada
  const texto =
    `Olá, Ronaldy! Vim pelo site e gostaria de um atendimento.\n\n` +
    `*Nome:* ${data.nome}\n*Telefone:* ${data.telefone}\n*E-mail:* ${data.email}\n` +
    `*Área:* ${data.area}\n\n*Mensagem:* ${data.mensagem}`;
  window.open(waLink(texto), "_blank", "noopener");
  form.reset();
  setStatus("Abrimos o WhatsApp com sua mensagem. É só enviar!", "success");
});
