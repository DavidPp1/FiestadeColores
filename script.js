const contadorVotos = {
    red: 0,
    yellow: 0,
    green: 0,
    blue: 0,
    purple: 0
};


const mensajePopularidad = document.createElement('h3');
mensajePopularidad.className = 'popularidad';
mensajePopularidad.style.marginTop = '20px';
mensajePopularidad.style.color = 'white';
mensajePopularidad.innerText = '¡Selecciona un color para iniciar la votación!';
document.body.appendChild(mensajePopularidad);


const maxColoresSorpresa = 5;
let coloresSorpresaGenerados = 0;

const nombresColoresSorpresa = ['Cian', 'Magenta', 'Turquesa', 'Lima', 'Coral'];


document.querySelectorAll('.color-pulsador').forEach(button => {
    button.addEventListener('click', function () {
        const selectedColor = this.getAttribute('data-color');
        document.querySelector('.titulo').style.color = selectedColor;

        
        if (contadorVotos[selectedColor] !== undefined) {
            contadorVotos[selectedColor]++;
        } else {
            contadorVotos[selectedColor] = 1; 
        }

        actualizarMensajePopularidad();
        reiniciarCuentaRegresiva(); 
    });
});


const contenedorColores = document.querySelector('.colores');


const coloresBase = [
    { color: 'red', backgroundColor: 'red' },
    { color: 'yellow', backgroundColor: 'yellow' },
    { color: 'green', backgroundColor: 'rgb(61, 235, 61)' },
    { color: 'blue', backgroundColor: 'rgb(35, 35, 219)' },
    { color: 'purple', backgroundColor: 'rgb(205, 44, 205)' }
];


function crearBotonColor(color, backgroundColor) {
    const boton = document.createElement('button');
    boton.className = 'color-pulsador';
    boton.style.backgroundColor = backgroundColor;
    boton.setAttribute('data-color', color);

    
    boton.addEventListener('click', function () {
        document.querySelector('.titulo').style.color = color;

    
        if (contadorVotos[color] !== undefined) {
            contadorVotos[color]++;
        } else {
            contadorVotos[color] = 1; 
        }

        actualizarMensajePopularidad();
        reiniciarCuentaRegresiva(); 
    });

    return boton;
}


function inicializarColoresBase() {
    contenedorColores.innerHTML = ''; 
    coloresBase.forEach(c => {
        const boton = crearBotonColor(c.color, c.backgroundColor);
        contenedorColores.appendChild(boton);
    });

    
    for (let color in contadorVotos) {
        contadorVotos[color] = 0;
    }

    
    coloresSorpresaGenerados = 0;
    mensajePopularidad.innerText = '¡Selecciona un color para iniciar la votación!';
}


document.querySelectorAll('.info-pulsador')[0].addEventListener('click', function () {
    if (coloresSorpresaGenerados < maxColoresSorpresa) {
        const colorNombre = nombresColoresSorpresa[coloresSorpresaGenerados % nombresColoresSorpresa.length];
        const colorAleatorio = generarColorAleatorio();

        const nuevoBoton = crearBotonColor(colorNombre, colorAleatorio);
        contenedorColores.appendChild(nuevoBoton); 
        coloresSorpresaGenerados++;
    } else {
        alert('¡Lo lamento,no puedes generar más de 5 colores sorpresa!');
    }

    reiniciarCuentaRegresiva(); 
});


document.querySelectorAll('.info-pulsador')[1].addEventListener('click', function () {
    inicializarColoresBase(); 
    reiniciarCuentaRegresiva(); 
});

function generarColorAleatorio() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}


function actualizarMensajePopularidad() {
    const coloresOrdenados = Object.entries(contadorVotos).sort((a, b) => b[1] - a[1]);
    const colorMasPopular = coloresOrdenados[0];

    if (colorMasPopular[1] > 0) {
        mensajePopularidad.innerText = `El color más palpado por el click es: ${colorMasPopular[0]} con ${colorMasPopular[1]} votos.`;
    } else {
        mensajePopularidad.innerText = '¡Selecciona un color para iniciar la votación!';
    }
}


let temporizadorInactividad;

function reiniciarCuentaRegresiva() {
    clearTimeout(temporizadorInactividad); 
    temporizadorInactividad = setTimeout(() => {
        inicializarColoresBase(); 
        alert('Uppsss te has quedado inactivo los colores decidieron irse...');
    }, 10000); 
}

document.addEventListener('mousemove', reiniciarCuentaRegresiva);

inicializarColoresBase();
