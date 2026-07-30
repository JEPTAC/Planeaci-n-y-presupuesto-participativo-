const stages = {
  definitivo: {
    eyebrow: "ETAPA 1 DE 5",
    title: "Presupuesto definitivo",
    value: 30127937,
    percent: 100,
    remaining: 0,
    description: "Es la apropiación vigente disponible para el rubro después de las modificaciones presupuestales registradas al corte.",
    reading: "El rubro cuenta con una apropiación definitiva de $30.127.937."
  },
  certificados: {
    eyebrow: "ETAPA 2 DE 5",
    title: "Certificados",
    value: 30127937,
    percent: 100,
    remaining: 0,
    description: "Representa la disponibilidad presupuestal registrada para garantizar que existe apropiación suficiente antes de asumir compromisos.",
    reading: "La totalidad de la apropiación definitiva aparece respaldada mediante certificados."
  },
  comprometido: {
    eyebrow: "ETAPA 3 DE 5",
    title: "Recursos comprometidos",
    value: 27679937,
    percent: 91.87465109210763,
    remaining: 2448000,
    description: "Corresponde a recursos afectados presupuestalmente mediante compromisos registrados con cargo al rubro.",
    reading: "Se encuentra comprometido el 91,87 % y queda un saldo de $2.448.000 sin compromiso."
  },
  obligaciones: {
    eyebrow: "ETAPA 4 DE 5",
    title: "Obligaciones",
    value: 0,
    percent: 0,
    remaining: 30127937,
    description: "Corresponde al valor reconocido como exigible después del cumplimiento de la condición, recepción de bienes o prestación de servicios.",
    reading: "El reporte del primer trimestre no registra obligaciones para este rubro."
  },
  pagos: {
    eyebrow: "ETAPA 5 DE 5",
    title: "Pagos",
    value: 0,
    percent: 0,
    remaining: 30127937,
    description: "Corresponde a los desembolsos registrados para atender obligaciones presupuestales.",
    reading: "El reporte del primer trimestre no registra pagos para este rubro."
  }
};

const currency = new Intl.NumberFormat("es-CO", {
  style: "currency",
  currency: "COP",
  maximumFractionDigits: 0
});

const number = new Intl.NumberFormat("es-CO", {
  maximumFractionDigits: 0
});

const percent2 = new Intl.NumberFormat("es-CO", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
});

document.querySelectorAll("img[data-fallback]").forEach((image) => {
  image.addEventListener("error", () => {
    const fallback = image.dataset.fallback;
    if (!fallback) return;
    const fallbackUrl = new URL(fallback, window.location.href).href;
    if (image.src !== fallbackUrl) image.src = fallbackUrl;
  });
});

document.querySelectorAll("[data-print]").forEach((button) => {
  button.addEventListener("click", () => window.print());
});

document.querySelectorAll(".stage-button").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".stage-button").forEach((item) => {
      item.classList.remove("is-active");
      item.setAttribute("aria-selected", "false");
    });

    button.classList.add("is-active");
    button.setAttribute("aria-selected", "true");
    renderStage(button.dataset.stage);
  });
});

function renderStage(stageKey) {
  const stage = stages[stageKey];
  if (!stage) return;

  document.getElementById("stageEyebrow").textContent = stage.eyebrow;
  document.getElementById("stageTitle").textContent = stage.title;
  document.getElementById("stageValue").textContent = currency.format(stage.value);
  document.getElementById("stagePercent").textContent = `${percent2.format(stage.percent)} %`;
  document.getElementById("stageBar").style.width = `${Math.min(stage.percent, 100)}%`;
  document.getElementById("stageDescription").textContent = stage.description;
  document.getElementById("stageRemaining").textContent = currency.format(stage.remaining);
  document.getElementById("stageReading").textContent = stage.reading;
}

const navigationLinks = [...document.querySelectorAll(".section-nav a")];
const observedSections = navigationLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

const observer = new IntersectionObserver((entries) => {
  const visible = entries
    .filter((entry) => entry.isIntersecting)
    .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

  if (!visible) return;

  navigationLinks.forEach((link) => {
    const active = link.getAttribute("href") === `#${visible.target.id}`;
    link.classList.toggle("is-active", active);
    if (active) link.setAttribute("aria-current", "location");
    else link.removeAttribute("aria-current");
  });
}, {
  rootMargin: "-30% 0px -55% 0px",
  threshold: [0.01, 0.25, 0.5]
});

observedSections.forEach((section) => observer.observe(section));

const counters = document.querySelectorAll("[data-counter]");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (reduceMotion) {
  counters.forEach((element) => setCounterFinal(element));
} else {
  const counterObserver = new IntersectionObserver((entries, observerInstance) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      animateCounter(entry.target);
      observerInstance.unobserve(entry.target);
    });
  }, { threshold: 0.5 });

  counters.forEach((element) => counterObserver.observe(element));
}

function animateCounter(element) {
  const target = Number(element.dataset.counter);
  const duration = 900;
  const start = performance.now();

  function frame(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    renderCounter(element, target * eased);
    if (progress < 1) requestAnimationFrame(frame);
    else setCounterFinal(element);
  }

  requestAnimationFrame(frame);
}

function setCounterFinal(element) {
  renderCounter(element, Number(element.dataset.counter), true);
}

function renderCounter(element, value, final = false) {
  const format = element.dataset.format;

  if (format === "currency") {
    element.textContent = currency.format(final ? Math.round(value) : Math.round(value));
    return;
  }

  if (format === "percent4") {
    element.textContent = `${new Intl.NumberFormat("es-CO", {
      minimumFractionDigits: 4,
      maximumFractionDigits: 4
    }).format(value)} %`;
    return;
  }

  element.textContent = number.format(value);
}
