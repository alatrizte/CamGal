
// Carga el mapa de openstreetmap.
const mapa = L.map('mapid').setView([43, -7.7], 8);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', 
    {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
        maxZoom: 18,
    }).addTo(mapa);

const camIcon = L.icon({
    iconUrl: 'images/cam.png',
    iconSize: [40,40],
})
// Consulta al archivo del servidor 'camaras.php'
const consulta = async () => {
    const peticion = await fetch('src/camaras.php');
    const respuesta = await peticion.json(); // La respuesta del servidor es JSON

    //Extrae los datos de cada cámara.
    for ( const camara in respuesta ){
        //console.log(respuesta[camara]);

        let concello = respuesta[camara].concello;
        let imaxe = respuesta[camara].imaxe;
        let lat = respuesta[camara].lat;
        let lon = respuesta[camara].lon;

        // Crea una marca por cada cámara en el mapa.
        let marker = L.marker([lat, lon], {icon: camIcon}).addTo(mapa);

        // Crea el Tooltip de cada marca.
        marker.bindTooltip(`Cámara de: ${camara} (${concello})`);

        // Crea el formato para mostrar el PopUp.
        let popupContent = `<h4>${camara} (${concello})</h4>
                            <img width=300px src='${imaxe}'>`;

        // Crea el PopUp.
        marker.bindPopup(popupContent);

    }
}

consulta();




