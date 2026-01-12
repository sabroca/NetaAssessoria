// ============================
// CONFIGURAÇÕES
// ============================
const WHATSAPP_NUMBER = "5538998393701"; // DDI+DDD+Número (somente números)
const DEFAULT_MESSAGE = "Olá! Vim pelo site da Neta Assessoria e gostaria de informações.";

// Serviços
const services = [
  { title: "Pensão", desc: "Orientação e acompanhamento para solicitação e revisão.", icon: "P" },
  { title: "Aposentadoria", desc: "Planejamento e entrada do pedido com análise documental.", icon: "A" },
  { title: "Auxílio-maternidade", desc: "Assessoria para requerimento e organização de documentos.", icon: "M" },
  { title: "Auxílio-doença", desc: "Apoio no pedido, orientações e acompanhamento do andamento.", icon: "D" },
  { title: "Senha GOV", desc: "Suporte para criação/recuperação e orientações de acesso.", icon: "G" },
  { title: "CNIS", desc: "Emissão, conferência e orientação para correções necessárias.", icon: "C" },
  { title: "CCIR e ITR", desc: "Auxílio com documentação rural, emissão e regularização.", icon: "R" },
  { title: "2ª via do CAR", desc: "Emissão da segunda via do CAR (Cadastro Ambiental Rural).", icon: "2" },
];

function waLink(message){
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}


function setServiceLinks(){
  const map = {
    waPension: "Pensão",
    waApos: "Aposentadoria",
    waMat: "Auxílio-maternidade",
    waDoenca: "Auxílio-doença",
    waGov: "Senha GOV",
    waCnis: "CNIS",
    waRural: "CCIR e ITR",
    waCar: "2ª via do CAR"
  };
  Object.entries(map).forEach(([id, title])=>{
    const el = document.getElementById(id);
    if(el){
      el.href = waLink(`${DEFAULT_MESSAGE}\n\nServiço: ${title}`);
    }
  });
}

function setWhatsLinks(){
  const base = waLink(DEFAULT_MESSAGE);
  ["whatsHero","whatsServices","whatsLocation","whatsContact","whatsAbout","whatsFooter","whatsFloat"].forEach(id=>{
    const el = document.getElementById(id);
    if(el) el.href = base;
  });
}

function initForm(){
  const form = document.getElementById("leadForm");
  if(!form) return;

  form.addEventListener("submit", (e)=>{
    e.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const telefone = document.getElementById("telefone").value.trim();
    const servico = document.getElementById("servico").value;
    const mensagem = document.getElementById("mensagem").value.trim();

    const final = [
      DEFAULT_MESSAGE,
      `Nome: ${nome}`,
      `Telefone: ${telefone}`,
      `Serviço: ${servico}`,
      mensagem ? `Mensagem: ${mensagem}` : ""
    ].filter(Boolean).join("\n");

    window.open(waLink(final), "_blank");
    form.reset();
  });
}

function initMenu(){
  const btn = document.getElementById("menuBtn");
  const nav = document.getElementById("nav");
  if(!btn || !nav) return;

  btn.addEventListener("click", ()=>{
    const open = nav.classList.toggle("open");
    btn.setAttribute("aria-expanded", open ? "true" : "false");
  });

  nav.querySelectorAll("a").forEach(a=>{
    a.addEventListener("click", ()=>{
      nav.classList.remove("open");
      btn.setAttribute("aria-expanded", "false");
    });
  });
}

document.addEventListener("DOMContentLoaded", ()=>{
  const yearEl = document.getElementById("year");
  if(yearEl) yearEl.textContent = new Date().getFullYear();
  setWhatsLinks();
  setServiceLinks();
  initForm();
  initMenu();
});
