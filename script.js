document.addEventListener('DOMContentLoaded', () => {
    const cartas = document.querySelectorAll('.carta');
    const botaoReiniciar = document.querySelector('.reiniciar');
    const botaoVisualizar = document.querySelector('.visualizar');
    const contadorVisualizacoes = document.getElementById('contadorVisualizacoes');

    let cartasViradas = [];
    let visualizacoesRestantes = 3; 

    function atualizarContador() {
        contadorVisualizacoes.textContent = `Visualizações restantes: ${visualizacoesRestantes}`;
    }

    function embaralharCartas() {
        cartas.forEach(carta => {
            const posicaoAleatoria = Math.floor(Math.random() * cartas.length);
            carta.style.order = posicaoAleatoria;
        });
    }

    cartas.forEach(carta => {
        carta.addEventListener('click', () => {
            if (cartasViradas.length < 2 && !carta.classList.contains('virada') && !carta.classList.contains('pareado')) {
                carta.classList.add('virada');
                carta.textContent = carta.dataset.carta;
                carta.classList.add(`pareado-${carta.dataset.carta}`); 
                cartasViradas.push(carta);

                if (cartasViradas.length === 2) {
                    verificarCombinacao();
                }
            }
        });
    });

    function verificarCombinacao() {
        const [carta1, carta2] = cartasViradas;
        if (carta1.dataset.carta === carta2.dataset.carta) {
            carta1.classList.add('pareado');
            carta2.classList.add('pareado');
            cartasViradas = [];
            if (document.querySelectorAll('.carta.virada').length === cartas.length) {
                setTimeout(() => alert('Você ganhou!'), 500);
            }
        } else {
            setTimeout(() => {
                carta1.classList.remove('virada');
                carta1.textContent = '';
                carta1.classList.remove(`pareado-${carta1.dataset.carta}`); 
                carta2.classList.remove('virada');
                carta2.textContent = '';
                carta2.classList.remove(`pareado-${carta2.dataset.carta}`); 
                cartasViradas = [];
            }, 1000);
        }
    }

    function reiniciarJogo() {
        cartasViradas = [];
        visualizacoesRestantes = 3; 
        botaoVisualizar.disabled = false; 
        atualizarContador(); 
        cartas.forEach(carta => {
            carta.classList.remove('virada');
            carta.classList.remove('pareado');
            carta.textContent = '';
            carta.classList.remove(`pareado-${carta.dataset.carta}`); 
        });
        embaralharCartas(); 
    }

    function revelarCartas() {
        if (visualizacoesRestantes > 0) {
            visualizacoesRestantes--;
            atualizarContador(); 
            if (visualizacoesRestantes === 0) {
                botaoVisualizar.disabled = true; 
            }
            cartas.forEach(carta => {
                if (!carta.classList.contains('pareado')) {
                    carta.classList.add('virada');
                    carta.textContent = carta.dataset.carta;
                    carta.classList.add(`pareado-${carta.dataset.carta}`); 
                }
            });
            setTimeout(() => {
                cartas.forEach(carta => {
                    if (!carta.classList.contains('pareado')) {
                        carta.classList.remove('virada');
                        carta.textContent = '';
                        carta.classList.remove(`pareado-${carta.dataset.carta}`); 
                    }
                });
            }, 3000);
        }
    }

    botaoVisualizar.addEventListener('click', revelarCartas);
    botaoReiniciar.addEventListener('click', reiniciarJogo);
    embaralharCartas();
    atualizarContador(); 
});
