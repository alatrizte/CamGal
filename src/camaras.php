<?php 
$url = 'https://servizos.meteogalicia.gal/mgrss/observacion/jsonCamaras.action';

$fichero = file_get_contents($url);
$data = json_decode($fichero);

$camaras = array();
foreach ($data->listaCamaras as $camara){
    $camaras[$camara->nomeCamara] = array();
    $camaras[$camara->nomeCamara]['concello'] = $camara->concello;
    $camaras[$camara->nomeCamara]['imaxe'] = $camara->imaxeCamara;
    $camaras[$camara->nomeCamara]['lat'] = $camara->lat;
    $camaras[$camara->nomeCamara]['lon'] = $camara->lon;
} 

echo json_encode($camaras);