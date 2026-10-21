// =========================================================
// 1. MENU HAMBÚRGUER (celular)
// =========================================================
const botaoMenu = document.getElementById('menu-toggle');
const menu = document.getElementById('menu');

function abrirFecharMenu() {
  // classList.toggle liga a classe se não existe, e desliga se existe.
  // Devolve true quando a classe ficou ligada.
  const aberto = menu.classList.toggle('menu--aberto');

  botaoMenu.classList.toggle('menu-toggle--aberto', aberto);

  // atualiza os atributos de acessibilidade para leitores de tela
  botaoMenu.setAttribute('aria-expanded', aberto);
  botaoMenu.setAttribute('aria-label', aberto ? 'Fechar menu' : 'Abrir menu');
}

botaoMenu.addEventListener('click', abrirFecharMenu);

// fecha o menu ao clicar em um link (senão ele fica cobrindo a página)
menu.querySelectorAll('a').forEach(function (link) {
  link.addEventListener('click', function () {
    if (menu.classList.contains('menu--aberto')) {
      abrirFecharMenu();
    }
  });
});

// =========================================================
// 2. LINK ATIVO NO MENU (destaca a seção que está na tela)
// =========================================================
const secoes = document.querySelectorAll('section[id]');
const linksMenu = document.querySelectorAll('.menu a');

function marcarLinkAtivo(idDaSecao) {
  linksMenu.forEach(function (link) {
    // o href é "#sobre", então comparamos com "#" + id
    link.classList.toggle('ativo', link.getAttribute('href') === '#' + idDaSecao);
  });
}

// IntersectionObserver avisa quando um elemento entra ou sai da tela,
// sem precisar ficar escutando o scroll o tempo todo.
const observadorDeSecoes = new IntersectionObserver(
  function (entradas) {
    entradas.forEach(function (entrada) {
      if (entrada.isIntersecting) {
        marcarLinkAtivo(entrada.target.id);
      }
    });
  },
  {
    // a "linha de detecção" fica no meio da tela
    rootMargin: '-40% 0px -55% 0px',
  }
);

secoes.forEach(function (secao) {
  observadorDeSecoes.observe(secao);
});

// =========================================================
// 3. ANIMAÇÃO DE ENTRADA (elementos aparecem ao rolar)
// =========================================================
// Em vez de editar o HTML, o JS escolhe quem vai animar.
const elementosParaRevelar = document.querySelectorAll(
  '.hero > *, .secao__rotulo, .sobre__texto, .card, .skills, .footer > *'
);

elementosParaRevelar.forEach(function (elemento) {
  elemento.classList.add('revelar');
});

const observadorDeRevelar = new IntersectionObserver(
  function (entradas, observador) {
    entradas.forEach(function (entrada) {
      if (entrada.isIntersecting) {
        entrada.target.classList.add('visivel');
        // já apareceu, não precisa mais observar
        observador.unobserve(entrada.target);
      }
    });
  },
  { threshold: 0.15 }
);

elementosParaRevelar.forEach(function (elemento) {
  observadorDeRevelar.observe(elemento);
});
