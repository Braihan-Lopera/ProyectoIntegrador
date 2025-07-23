//inicio del carrusel-----------------------------------

const btnAdelante = document.getElementById("adelante")
const btnAtras = document.getElementById("atras")
const caras = document.querySelectorAll(".cara")

let index = 0
let videoPrincipal = null

window.addEventListener("load", () => {
    videoPrincipal = caras[0].querySelector("video")
    if (videoPrincipal) {
        videoPrincipal.loop = true
        videoPrincipal.play()
    }
})

function mostrarCara(i) {
    caras.forEach(cara => cara.classList.remove("activa"))
    caras[i].classList.add("activa")
    document.querySelector(".caras").style.transform = `translateX(-${i * 100}%)`

    const videos = document.querySelectorAll(".cara video")
    videos.forEach(video => {
        video.pause()
    })

    const videoActivo = caras[i].querySelector("video")
    if (videoActivo) {
        videoActivo.currentTime = 0
        videoActivo.play()
    }
}

btnAtras.addEventListener("click", () => {
    index = (index === 0) ? caras.length - 1 : index - 1
    mostrarCara(index)
})

btnAdelante.addEventListener("click", () => {
    index = (index === caras.length - 1) ? 0 : index + 1
    mostrarCara(index)
})

//fin del carrusel------------------------------------------
// creacion de paneles -------------------------------------

const crearPanel = (imagenes,links, contenedorId, nombre) =>{
    
    const contenedor = document.getElementById(contenedorId)
    if(imagenes.length == 1){
        contenedor.className = "panel1x1"
    } else if(imagenes.length == 2){
        contenedor.className = "panel2x1"
    } else if(imagenes.length == 3){
        contenedor.className = "panel3x1"
    } else if(imagenes.length == 4){
        contenedor.className = "panel4x1"
    }

    for (let index = 0; index < imagenes.length; index++) {

        const link = document.createElement("a")
        link.href = links[index]
        
        const imagen = document.createElement("img")
        imagen.src = imagenes[index]

        contenedor.appendChild(link)
        link.appendChild(imagen)

        if (imagenes.length == 4 && nombre) {
            const texto = document.createElement("h3")
            texto.textContent = nombre[index]
            link.appendChild(texto)

            const textoFuerte = document.createElement("p")
            textoFuerte.textContent = "Ver " + nombre[index].split(" ")[0].charAt(0).toUpperCase() + nombre[index].split(" ")[0].slice(1).toLowerCase()
            link.appendChild(textoFuerte)
        }
    }
    
    
}
//         necesita ponerle el link de las paginas
crearPanel(['imagenes/imagenMujer.webp','imagenes/imagenHombre.webp'],["about:blank","about:blank"],"hombreMujer")
crearPanel(["imagenes/foto4x1_1.webp","imagenes/foto4x1_2.webp","imagenes/foto4x1_3.webp","imagenes/foto4x1_4.webp"],["about:blank","about:blank","about:blank","about:blank"],"panel4x1",["JEANS PARA MUJER","CAMISAS PARA HOMBRE","CAMISAS PARA MUJER","BERMUDAS PARA HOMBRE"])
crearPanel(["imagenes/imagenNewDrop.webp"],["about:blank"],"newDropLink")

// fin de la creacion de paneles ------------------------------------------

