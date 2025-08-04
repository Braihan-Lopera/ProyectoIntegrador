// Carga un componente HTML (como el navbar) en un elemento específico.
function loadComponent(path, elementId) {
    const targetElement = document.getElementById(elementId);
    if (targetElement) {
        fetch(path)
            .then(response => response.ok ? response.text() : Promise.reject('Error'))
            .then(html => {
                targetElement.innerHTML = html;
            })
            .catch(error => console.error(`Error al cargar ${elementId}:`, error));
    }
}

//inicio del carrusel-----------------------------------
function setupCarousel() {
    const btnAdelante = document.getElementById("adelante");
    const carasContainer = document.querySelector(".caras");

    // Si el carrusel no existe en la página, la función se detiene aquí.
    if (!btnAdelante || !carasContainer) return;
    
    const btnAtras = document.getElementById("atras");
    const caras = document.querySelectorAll(".cara");
    let index = 0;

    const videoPrincipal = caras[0]?.querySelector("video");
    if (videoPrincipal) {
        videoPrincipal.loop = true;
        videoPrincipal.play();
    }

    function mostrarCara(i) {
        carasContainer.style.transform = `translateX(-${i * 100}%)`;
        document.querySelectorAll(".cara video").forEach(video => video.pause());
        const videoActivo = caras[i]?.querySelector("video");
        if (videoActivo) {
            videoActivo.currentTime = 0;
            videoActivo.play();
        }
    }

    btnAtras.addEventListener("click", () => {
        index = (index === 0) ? caras.length - 1 : index - 1;
        mostrarCara(index);
    });

    btnAdelante.addEventListener("click", () => {
        index = (index === caras.length - 1) ? 0 : index + 1;
        mostrarCara(index);
    });
}
//fin del carrusel------------------------------------------

// creacion de paneles -------------------------------------
function crearPanel(imagenes, links, contenedorId, nombre) {
    const contenedor = document.getElementById(contenedorId);
    if (!contenedor) return;

    const classMap = ["", "panel1x1", "panel2x1", "panel3x1", "panel4x1"];
    contenedor.className = classMap[imagenes.length] || "";

    for (let i = 0; i < imagenes.length; i++) {
        const link = document.createElement("a");
        link.href = links[i];
        const imagen = document.createElement("img");
        imagen.src = imagenes[i];
        imagen.alt = nombre ? `Imagen de ${nombre[i]}` : `Panel ${i + 1}`;
        link.appendChild(imagen);

        if (imagenes.length === 4 && nombre) {
            const texto = document.createElement("h3");
            texto.textContent = nombre[i];
            link.appendChild(texto);
            const textoFuerte = document.createElement("p");
            textoFuerte.textContent = `Ver ${nombre[i].split(" ")[0]}`;
            link.appendChild(textoFuerte);
        }
        contenedor.appendChild(link);
    }
}
// fin de la creacion de paneles ---------------------------

//creacion de paneles de la seccion de hombres-----------------------
function mostrarProductos(containerId, jsonPath) {
    const contenedor = document.getElementById(containerId);
    if (!contenedor) return;

    fetch(jsonPath)
        .then(response => response.json())
        .then(data => {
            let productHTML = '';
            for (const producto of data) {
                productHTML += `
                    <div class="divProducto">
                        <a href="about:blank">
                            <img src="${producto.fotoPortada}" alt="Foto de ${producto.nombre}">
                            <p>${producto.nombre}</p>
                            <h4>$${producto.precio}</h4>
                        </a>
                    </div>
                `;
            }
            contenedor.innerHTML = productHTML;
        })
        .catch(error => console.error('Error al cargar productos:', error));
}

// --- FUNCIÓN AÑADIDA ---
// Se encarga de añadir o quitar la clase '.scrolled' del navbar.
function setupNavbarScroll() {
    const navbar = document.getElementById('main-navbar');
    if (!navbar) return;

    const triggerHeight = 50;

    window.addEventListener('scroll', () => {
        if (window.scrollY > triggerHeight) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// Punto de entrada: Se ejecuta cuando el HTML está listo.
document.addEventListener('DOMContentLoaded', () => {
    
    // Carga los componentes globales usando rutas absolutas
    loadComponent('/html/navbar.html', 'main-navbar');
    loadComponent('/html/footer.html', 'main-footer');

    // Ejecuta las funciones que crean contenido en la página
    setupCarousel();
    setupNavbarScroll(); // --- LLAMADA AÑADIDA ---
    crearPanel(['/imagenes/indexMujer1.webp', '/imagenes/indexHombre1.webp'], ["about:blank", "about:blank"], "hombreMujer");
    crearPanel(["/imagenes/foto4x1_1.webp", "/imagenes/foto4x1_2.webp", "/imagenes/foto4x1_3.webp", "/imagenes/foto4x1_4.webp"], ["about:blank", "about:blank", "about:blank", "about:blank"], "panel4x1", ["JEANS PARA MUJER", "CAMISAS PARA HOMBRE", "CAMISAS PARA MUJER", "BERMUDAS PARA HOMBRE"]);
    crearPanel(["/imagenes/imagenNewDrop.webp"], ["about:blank"], "newDropLink");
    
    // Carga los productos solo en las páginas que lo necesiten
    mostrarProductos('contenedorProductos', '/data/muestraProductos.json');
});