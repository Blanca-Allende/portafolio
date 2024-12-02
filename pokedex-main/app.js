
const botonTipos = document.querySelector(".btn_por_tipo");
const botonBuscar = document.querySelector(".btn_buscar");
const tipos_buscar = document.querySelector("#tipos_buscar");
const listapokemones = document.querySelector("#listapokemones");

const URL = "https://pokeapi.co/api/v2/pokemon/";

//-----------------------------------------------------------------------//

// Evento para el botón de tipos
botonTipos.addEventListener('click', () => {
    // Crear contenedor para los tipos de Pokémon
    const div = document.createElement("div");
    div.classList.add("botones_tipo");

    // Limpiar el contenido previo
    tipos_buscar.innerHTML = "";
   
    listapokemones.innerHTML = "";

    // Añadir los botones de tipos
    div.innerHTML = `
        <div class="botones_tipo">
            <ul class="lista">
                <li><button class="btn btn_tipo slide_down normal" id="normal">Normal</button></li>
                <li><button class="btn btn_tipo slide_down acero" id="steel">Acero</button></li>
                <li><button class="btn btn_tipo slide_down agua" id="water">Agua</button></li>
                <li><button class="btn btn_tipo slide_down bichos" id="bug">Bicho</button></li>
                <li><button class="btn btn_tipo slide_down dragon" id="dragon">Dragón</button></li>
                <li><button class="btn btn_tipo slide_down electrico" id="electric">Eléctrico</button></li>
                <li><button class="btn btn_tipo slide_down fantasma" id="ghost">Fantasma</button></li>
                <li><button class="btn btn_tipo slide_down fuego" id="fire">Fuego</button></li>
                <li><button class="btn btn_tipo slide_down hada" id="fairy">Hada</button></li>
                <li><button class="btn btn_tipo slide_down hielo" id="ice">Hielo</button></li>
                <li><button class="btn btn_tipo slide_down lucha" id="fighting">Lucha</button></li>
                <li><button class="btn btn_tipo slide_down planta" id="grass">Planta</button></li>
                <li><button class="btn btn_tipo slide_down psiquico" id="psychic">Psíquico</button></li>
                <li><button class="btn btn_tipo slide_down roca" id="rock">Roca</button></li>
                <li><button class="btn btn_tipo slide_down siniestro" id="dark">Siniestro</button></li>
                <li><button class="btn btn_tipo slide_down tierra" id="ground">Tierra</button></li>
                <li><button class="btn btn_tipo slide_down volador" id="flying">Volador</button></li>
            </ul>
        </div>
    `;

    // Añadir el contenedor al DOM
    tipos_buscar.appendChild(div);

    // Seleccionar todos los botones de tipo y asignarles eventos
    const botonesTipo = document.querySelectorAll(".btn_tipo");
    botonesTipo.forEach(boton => {
        boton.addEventListener('click', (event) => {
            const botonId = event.currentTarget.id;

            listapokemones.innerHTML = "";

            for (let i = 1; i <= 1010; i++) {
                fetch(URL+i)
                    .then(response => response.json())
                    .then(data => {
                        const tipos = data.types.map(type => type.type.name);
                        if (tipos.some(tipo => tipo.includes(botonId))) {
                            mostrarpokemones(data);
                        }
                    })
                    .catch(error => console.error('Error:', error)); // Captura y muestra cualquier error de fetch
            }
        });
    });
});

function mostrarpokemones(poke) {
    const div = document.createElement("div");
    div.classList.add("pokemon");
    const abilities = poke.abilities.map(abilityInfo => abilityInfo.ability.name).join(', ');
    div.innerHTML = `  
        <div class="img-pokemon">
            <img src="${poke.sprites.other['official-artwork'].front_default}" alt="${poke.name}">
        </div>
        <div class="info-pokemon">
            <p class="id_inf">#${poke.id}</p>
            <h2 class="nombre">${poke.name}</h2>
            <div class="habilidades">
                <p class="habilidad_titulo">habilidades</p>
                <h3 class="habilidad">${abilities}</h3>
            </div>
        </div>
    `;

    listapokemones.append(div);
}





//---------------------------------------------------------------------------------//



// Evento para el botón de búsqueda
botonBuscar.addEventListener('click', () => {
    const div = document.createElement("div");
    div.classList.add("busqueda");

    // Limpiar el contenido previo
   tipos_buscar.innerHTML = "";
    listapokemones.innerHTML = "";

    // Añadir el formulario de búsqueda
    div.innerHTML = `
        <form id="formBuscar">
            <input type="text" id="noBuscado" placeholder="Busqueda..." autocomplete="off">
            <button type="submit"><i class="fa-solid fa-magnifying-glass slide_down"></i></button>
        </form>
        <div id="busquedapokemon"></div>
    `;

    // Añadir el contenedor al DOM
    tipos_buscar.appendChild(div);

    // Agregar evento submit al formulario
    document.querySelector('#formBuscar').addEventListener('submit', buscar);
   
    
});




   
       

function obtenerValorInput() {
    return document.getElementById('noBuscado').value;

    
      
}

// Función para buscar el Pokémon
async function buscar(event) {

 
    // Prevenir el comportamiento por defecto del formulario
    event.preventDefault();

    // Obtener el valor del input usando la función
    let valorInput = obtenerValorInput();

    // Construir la URL de la API concatenando el valor del input
    let resp = `${valorInput.toLowerCase()}`;

    try {
        // Hacer la solicitud fetch
        let response = await fetch(URL+resp);

            setTimeout(() => {
            document.getElementById('noBuscado').value = '';
        }, 2000);

        // Verificar si la respuesta es correcta
        if (!response.ok) {
            throw new Error('No se encontró el Pokémon ,porfavor busque otro');
          
        }

        // Convertir la respuesta a JSON
        let poke = await response.json();

        // URL del audio 
        let audioUrl = `https://play.pokemonshowdown.com/audio/cries/${poke.name.toLowerCase()}.mp3`

        // Mostrar la información del Pokémon

   
        document.getElementById('listapokemones').innerHTML = `
         <div class="buscarpokemon">
            <div class="pokemonb" id="busquedapokemon">
        <div class="img-pokemon-b">
            <img src="${poke.sprites.other['official-artwork'].front_default}" alt="${poke.name}">
            <div class="info-pokemon-b">
                <p class="id_inf id">#${poke.id}</p>
                <h2 class="nombre">${poke.name}</h2>
                <div class="altura">
                    <h4 class="altura1">Altura: ${poke.height / 10} m</h4>
                </div>
                <div class="peso">
                    <h3 class="peso1">Peso: ${poke.weight / 10} kg</h3>
                </div>
                <div class="tipos">
                    <h3 class="tipo1">Tipos: ${poke.types.map(typeInfo => typeInfo.type.name).join(', ')}</h3>
                </div>
                <div class="sonido">
                    <button id="playSound"><i class="fa-solid fa-volume-high slide_down"></i></button>
                </div>
            </div>
        </div>
             </div>
        </div>

    `;

        // Crear el elemento de audio y agregarlo al documento
        let audioElement = document.createElement('audio');
        audioElement.id = 'pokemonSound';
        audioElement.src = audioUrl;
        document.body.appendChild(audioElement);

        // Agregar el evento de clic al botón para reproducir el sonido
        document.getElementById('playSound').addEventListener('click', () => {
            audioElement.play();
        });
    

       setTimeout(() => {
            document.getElementById('noBuscado').value = '';
        }, 2000);
   

    } catch (error) {
        // Manejar errores 
        alert(error.message);
    }

   
    
}