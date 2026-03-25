// ===== ANIMAÇÃO DAS BARRAS DE HABILIDADE =====
// Seleciona todas as barras de progresso
const barras = document.querySelectorAll('.barra-progresso');

// ===== INTERSECTION OBSERVER =====
// Essa API do navegador monitora quando um elemento
// entra ou sai da área visível da tela (viewport).
// É muito mais eficiente do que ficar checando a
// posição do scroll a cada frame.
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {

    // entry.isIntersecting = true quando o elemento ficou visível
    if (entry.isIntersecting) {
      const el = entry.target;

      // Se for uma barra de progresso, anima até o nível correto
      if (el.classList.contains('barra-progresso')) {
        const nivel = el.getAttribute('data-nivel');
        el.style.width = nivel + '%';
      }

      // Adiciona a classe .visivel para disparar a animação CSS
      el.classList.add('visivel');

      // Para de observar após animar — não precisa mais monitorar
      observer.unobserve(el);
    }

  });
}, { threshold: 0.2 }); 
// threshold: 0.2 significa que o elemento precisa estar
// 20% visível na tela para disparar a animação


// ===== APLICA O OBSERVER =====
// Adiciona a classe .animar e começa a observar
// todos os cards, parágrafos e barras da página
document.querySelectorAll(
  '.projeto-card, .contato-card, .habilidade, #sobre p'
).forEach(el => {
  el.classList.add('animar');
  observer.observe(el);
});

// Também observa as barras separadamente
barras.forEach(barra => observer.observe(barra));


// ===== BOTÃO VOLTAR AO TOPO =====
const btnTopo = document.getElementById('btn-topo');

// Monitora o scroll da página
window.addEventListener('scroll', () => {

  // Se o usuário rolou mais de 300px, mostra o botão
  if (window.scrollY > 300) {
    btnTopo.classList.add('mostrar');
  } else {
    btnTopo.classList.remove('mostrar');
  }

});

// Ao clicar, rola suavemente de volta ao topo
btnTopo.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});