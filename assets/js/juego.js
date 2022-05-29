
(() => {

    'use strict'

    let deck = [];
    const tipos = ['C','D','H','S'],
          especiales = ['A','J','Q','K']
    
    // let puntosJugador = 0,
    //     puntosComputadora = 0;
    let puntosJugadores = []
    // Referencias del HTML
    const btnPedir = document.querySelector('#btnPedir'),
          btnDetener = document.querySelector('#btnDetener'),
          btnNuevo = document.querySelector('#btnNuevo');
    
    //   divCartasJugador = document.querySelector('#jugador-cartas'),
    //   divCartasComputadora = document.querySelector('#computadora-cartas'),
    const divCartasJugadores = document.querySelectorAll('.divCartas'),
          puntosHTML = document.querySelectorAll('small');
    

    //Esta funcion inicializa el juego
    const inicializarJuego = ( numJugadores = 2 ) => {
        deck = crearDeck();

        puntosJugadores = [];
        for( let i = 0; i< numJugadores; i++ ){
            puntosJugadores.push(0);
        }
        // deck = []
        // deck = crearDeck();
        
        // puntosJugador     = 0;
        // puntosComputadora = 0;
        puntosHTML.forEach( elem => elem.innerText = 0 );
        // puntosHTML[0].innerText = 0;
        // puntosHTML[1].innerText = 0;
        divCartasJugadores.forEach(elem => elem.innerHTML = '' );
        // divCartasComputadora.innerHTML = ''
        // divCartasJugador.innerHTML = ''
        btnPedir.disabled = false
        btnDetener.disabled = false
    }

    // Esta funcion me permite crear decks
    const crearDeck = () => {
        
        for ( let i = 2; i <= 10; i++ ) {
            for( let tipo of tipos ) {
                deck.push(i + tipo)
            }
        }
        for( let tipo of tipos ) {
            for( let esp of especiales ) {
                deck.push(esp + tipo)
            }
        }
    
        return _.shuffle( deck );
    
    }
    
    // Esta función me permite pedir cartas
    const pedirCarta = () => {
        
        if ( deck.length === 0) {
            throw 'No hay cartas en el deck';
        }
        
        return deck.pop();
    }
    
    //Esta funcion sirve para obtener el valor de la carta
    const valorCarta = (carta) => {
        const valor = carta.substring(0, carta.length -1);
        return (isNaN(valor)) ? ( valor === 'A' ) ? 11 : 10 : valor * 1;
    }
        
        // let puntos  = 0;
        // // 2 = 2  10 = 10, 3 = 3
        // if (isNaN( valor ) ) {
            
        //     puntos = ( valor === 'A' ) ? 11 : 10;
    
        // } else {
        //     puntos = valor * 1; 
        // }{
    
    //0 sera el primer jugar y el ultimo sera la computadora
    const acumularPuntos = ( carta, turno ) => {

        puntosJugadores[turno] = puntosJugadores[turno] + valorCarta(carta);
        puntosHTML[turno].innerText = puntosJugadores[turno];
        return puntosJugadores[turno]

    }

    const crearCarta = (carta, turno) => {
        const imgCarta = document.createElement('img');
            imgCarta.src = `assets/cartas/${ carta }.png`; // 3H, JD
            imgCarta.classList.add('carta')
            divCartasJugadores[turno].append(imgCarta)
    }

    const determinarGanador = () => {
        
        const [ puntosMinimos, puntosComputadora ] = puntosJugadores;

        setTimeout(() => {
            
            if ( puntosComputadora === puntosMinimos ) {
                alert('Nadie Gana :(');
            } else if ( puntosMinimos > 21 ) {
                alert('La computadora gana!!')
            } else if ( puntosComputadora > 21 ) {
                alert('El jugador gana!!') 
            } else {
                alert('La computadora gana!!')
            }
    }, 100);
    }
    // Turno de la computadora
    const turnoComputadora = ( puntosMinimos) => {
    
        let puntosComputadora = 0;

        do {
            const carta = pedirCarta();
            puntosComputadora = acumularPuntos(carta, puntosJugadores.length - 1);
            crearCarta(carta, puntosJugadores.length - 1 );

            // puntosComputadora = puntosComputadora + valorCarta(carta);
            // puntosHTML[1].innerText = puntosComputadora;
            
            // <img class="carta" src="assets/cartas/2C.png" ></img>
            // const imgCarta = document.createElement('img');
            // imgCarta.src = `assets/cartas/${ carta }.png`; // 3H, JD
            // imgCarta.classList.add('carta')
            // divCartasComputadora.append(imgCarta)
            
            // if (puntosMinimos > 21) {
            //     break;
            // }
    
        } while((puntosComputadora < puntosMinimos) && (puntosMinimos <= 21) );
    
        determinarGanador();
    }
    
    
    
        // Eventos
    btnPedir.addEventListener('click', () => {
        // const small = document.querySelector('small');
        const carta = pedirCarta();
        const puntosJugador = acumularPuntos(carta, 0)
        
        crearCarta(carta, 0)
        
        // puntosJugador = puntosJugador + valorCarta(carta);
        // puntosHTML[0].innerText = puntosJugador;
        
        // <img class="carta" src="assets/cartas/2C.png" ></img>
        // const imgCarta = document.createElement('img');
        // imgCarta.src = `assets/cartas/${ carta }.png`; // 3H, JD
        // imgCarta.classList.add('carta')
        // divCartasJugador.append(imgCarta)
    
        if ( puntosJugador > 21 ) {
            console.warn('Lo siento, perdiste');
            btnPedir.disabled   = true
            btnDetener.disabled = true
            turnoComputadora(puntosJugador);
        } else if ( puntosJugador === 21) {
            console.warn('21, ganaste!');
            btnPedir.disabled   = true;
            btnDetener.disabled = true
            turnoComputadora( puntosJugador)
        }
           
        
        
        // document.querySelector('small').textContent = puntosJugador;
        
        // console.log("🚀 ~ file: juego.js ~ line 74 ~ btnPedir.addEventListener ~ data", data)
    })
    btnDetener.addEventListener('click', () => {
        btnPedir.disabled = true
        btnDetener.disabled = true
    
        turnoComputadora(puntosJugadores[0])
    
    }) 
    
    btnNuevo.addEventListener('click', () => {

        inicializarJuego();
    
    })



})();
