document.addEventListener('DOMContentLoaded', () => {
    const cartas = document.querySelectorAll('.carta');
    const botaoReiniciar = document.querySelector('.reiniciar');
    const botaoVisualizar = document.querySelector('.visualizar');

    let cartasViradas = [];

    cartas.forEach(carta => {
        carta.addEventListener('click', () => {
            if (cartasViradas.length < 2 && !carta.classList.contains('virada')) {
                carta.classList.add('virada');
                carta.textContent = carta.dataset.carta;
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
            cartasViradas = [];
            if (document.querySelectorAll('.carta.virada').length === cartas.length) {
                setTimeout(() => alert('Você ganhou!'), 500);
            }
        } else {
            setTimeout(() => {
                carta1.classList.remove('virada');
                carta1.textContent = '';
                carta2.classList.remove('virada');
                carta2.textContent = '';
                cartasViradas = [];
            }, 1000);
        }
    }

    function reiniciarJogo() {
        cartasViradas = [];
        cartas.forEach(carta => {
            carta.classList.remove('virada');
            carta.textContent = '';
        });
    }

    function revelarCartas() {
        cartas.forEach(carta => {
            carta.classList.add('virada');
            carta.textContent = carta.dataset.carta;
        });
        setTimeout(() => {
            cartas.forEach(carta => {
                carta.classList.remove('virada');
                carta.textContent = '';
            });
        }, 6000);
    }
    
    botaoVisualizar.addEventListener('click', revelarCartas);
    botaoReiniciar.addEventListener('click', reiniciarJogo);
    
});
