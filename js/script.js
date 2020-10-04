window.onload = iniciar;
function iniciar(){
    let boton = document.getElementById('cargar');
    let botonComparativa = document.getElementById('cargarComparativa');
    boton.addEventListener('click', clickBoton);
    botonComparativa.addEventListener('click', clickComparativa);
    let maxFecha = document.getElementById('inputFecha');
    var miCanvas = document.getElementById("migrafica").getContext("2d");
    var miCanvasDos = document.getElementById("migrafica").getContext("2d");
    console.log(Chart.defaults.global);
    Chart.defaults.global.mainteanceAspectRadio="false";
    Chart.defaults.global.defaultFontColor = "white";
    Chart.defaults.scale.ticks.beginAtZero="true";
    let fecha= new Date;
    console.log(fecha.toISOString().split("T")[0]);  
    maxFecha.setAttribute('max', fecha.toISOString().split("T")[0]);
    
    var grafica = new Chart(miCanvas, {
        type:"bar",
        data:{
            labels:["Muertes del día", "Contagios del día" ],
            datasets:[
                {
                    barPercentage: 0.5,
                    barThickness: 6,
                    maxBarThickness: 8,
                    minBarLength: 2,
                    borderColor: "#fff",
                    label: "",
                    backgroundColor:["red", "blue"],
                    data:[0, 0]
            }
            ]}
            
    });

    var graficaPie = new Chart(miCanvasDos, {
        type:"bar",
        data:{
            
            datasets:[
                {
                    barPercentage: 0.5,
                    barThickness: 6,
                    maxBarThickness: 8,
                    minBarLength: 2,
                    borderColor: "#fff",
                    label: "",
                    backgroundColor:["red", "blue"],
                    data:[0, 0]
            }
            ]}
            
    });
};


function redond(numero){
    let valor = numero;
    switch(true){
        case valor<0:
            redondeo = 0;
            break;
        case (valor>=0 && valor <=100):
            redondeo = (valor / 5);
            break;
        case (valor > 100 && valor<=1000):
            redondeo = (valor / 50) + 20;
            break;
        
        case (valor > 1000 && valor <= 10000): 
            redondeo = (valor / 500) + 40;
            break;
        case (valor > 10000 && valor <= 100000): 
            redondeo = (valor / 5000) + 60;
            break;
        case (valor > 100000 && valor <= 1000000): 
            redondeo = (valor / 50000) + 80;
            break;
        case (valor > 1000000): 
            redondeo = 100;
            break;
        default:{
            redondeo = 0;
            break;
        }
    };
    return Math.floor(redondeo);
};

async function cargarUrl(url){
    let respuesta = await fetch(url);
    return respuesta.json();
};

async function clickBoton(){
    
    let pais = document.getElementById('selectPais').value;
    let fecha = document.getElementById('inputFecha').value;
    let titulo = document.getElementById('titulo');
    let fuente = document.getElementById('fuente');
    
    
    let url = `https://api.covid19tracking.narrativa.com/api/${fecha}/country/${pais}`;
    let json = await cargarUrl(url);
    console.log(json);
    console.log(url);
    if (pais === "total"){
        
        var estadisticas = json.total;
        
    } else {

    var estadisticas = json.dates[fecha].countries[pais];
    
};
    
    titulo.innerHTML = " " + estadisticas.name_es;
    fuente.textContent=" " + estadisticas.source; 
    console.log(estadisticas.today_confirmed);
    document.getElementById('today_confirmed').innerHTML = estadisticas.today_confirmed;
    document.querySelector('.today_confirmed').setAttribute('style', 'width: ' + redond(estadisticas.today_confirmed)+'%');

    document.getElementById('today_deaths').innerHTML = estadisticas.today_deaths;
    document.querySelector('.today_deaths').setAttribute('style', 'width: ' + redond(estadisticas.today_deaths)+'%');

   /* document.getElementById('today_hospitalised_patients_with_symptoms').innerHTML = estadisticas.today_hospitalised_patients_with_symptoms;
    document.querySelector('.today_hospitalised_patients_with_symptoms').setAttribute('style', 'width: ' + redond(estadisticas.today_hospitalised_patients_with_symptoms)+'%');

    document.getElementById('today_intensive_care').innerHTML = estadisticas.today_intensive_care;
    document.querySelector('.today_intensive_care').setAttribute('style', 'width: ' + redond(estadisticas.today_intensive_care)+'%');*/

    document.getElementById('today_new_confirmed').innerHTML = estadisticas.today_new_confirmed;
    document.querySelector('.today_new_confirmed').setAttribute('style', 'width: ' + redond(estadisticas.today_new_confirmed)+'%');

    document.getElementById('today_new_deaths').innerHTML = estadisticas.today_new_deaths;
    document.querySelector('.today_new_deaths').setAttribute('style', 'width: ' + redond(estadisticas.today_new_deaths)+'%');

    /*document.getElementById('today_new_hospitalised_patients_with_symptoms').innerHTML = estadisticas.today_new_hospitalised_patients_with_symptoms;
    document.querySelector('.today_new_hospitalised_patients_with_symptoms').setAttribute('style', 'width: ' + redond(estadisticas.today_new_hospitalised_patients_with_symptoms)+'%');

    document.getElementById('today_new_intensive_care').innerHTML = estadisticas.today_new_intensive_care;
    document.querySelector('.today_new_intensive_care').setAttribute('style', 'width: ' + redond(estadisticas.today_new_intensive_care)+'%');

    document.getElementById('today_new_open_cases').innerHTML = estadisticas.today_new_open_cases;
    document.querySelector('.today_new_open_cases').setAttribute('style', 'width: ' + redond(estadisticas.today_new_open_cases)+'%');*/

    document.getElementById('today_new_recovered').innerHTML = estadisticas.today_new_recovered;
    document.querySelector('.today_new_recovered').setAttribute('style', 'width: ' + redond(estadisticas.today_new_recovered)+'%');

    /*document.getElementById('today_new_total_hospitalised_patients').innerHTML = estadisticas.today_new_total_hospitalised_patients;
    document.querySelector('.today_new_total_hospitalised_patients').setAttribute('style', 'width: ' + redond(estadisticas.today_new_total_hospitalised_patients)+'%');*/
    
    graf(estadisticas.today_new_deaths, estadisticas.today_new_confirmed);
    
};
function graf(today_new_deaths, today_new_confirmed){
    console.log(Chart);
    if (window.grafica){
        window.grafica.clear();
        window.grafica.destroy();
    }
    let miCanvas = document.getElementById("migrafica").getContext("2d");

    grafica = new Chart(miCanvas, {
    type:"bar",
    data:{
        labels:["Muertes del dia", "Contagios del dia" ],
        datasets:[
            {
                barPercentage: 0.5,
                barThickness: 6,
                maxBarThickness: 8,
                minBarLength: 2,
                borderColor: "#fff",
                label: "",
                backgroundColor:["red", "blue"],
                data:[today_new_deaths, today_new_confirmed]
        }
        ]}
        
});
};

function pie(obj, objDos, objTres){
    console.log(Chart);
    if (window.graficaPie){
        window.graficaPie.clear();
        window.graficaPie.destroy();
    }
    let miCanvasDos = document.getElementById("migraficapie").getContext("2d");

    graficaPie = new Chart(miCanvasDos, {
    type:"pie",
    data:{
        labels:[obj.name_es, objDos.name_es, objTres.name_es ],
        datasets:[
            {
                barPercentage: 0.5,
                barThickness: 6,
                maxBarThickness: 8,
                minBarLength: 2,
                borderColor: "#fff",
                label: "",
                backgroundColor:["red", "cyan", "yellow"],
                data:[obj.today_deaths, objDos.today_deaths, objTres.today_deaths]
        }
        ]}
        
});
};

async function clickComparativa(){
    let pais = document.getElementById('selectPais1').value;
    let paisDos = document.getElementById('selectPais2').value;
    let paisTres = document.getElementById('selectPais3').value;
    let fecha = new Date;
    fecha.setDate(fecha.getDate()-1);
    fecha = fecha.toISOString().split("T")[0];
    
    
    let url = `https://api.covid19tracking.narrativa.com/api/${fecha}/country/${pais}`;
    let json = await cargarUrl(url);
    console.log(json);
    console.log(url);

    let urlDos = `https://api.covid19tracking.narrativa.com/api/${fecha}/country/${paisDos}`;
    let jsonDos = await cargarUrl(urlDos);
    console.log(jsonDos);
    console.log(urlDos);

    let urlTres = `https://api.covid19tracking.narrativa.com/api/${fecha}/country/${paisTres}`;
    let jsonTres = await cargarUrl(urlTres);
    console.log(jsonTres);
    console.log(urlTres);

    var estadisticas = json.dates[fecha].countries[pais];
    var estadisticasDos = jsonDos.dates[fecha].countries[paisDos];
    var estadisticasTres = jsonTres.dates[fecha].countries[paisTres];

    console.log(estadisticas.today_deaths);
    console.log(estadisticasDos.today_deaths);
    console.log(estadisticasTres.today_deaths);

    document.getElementById('fechaComparativa').textContent = fecha;
    document.getElementById('paisUno').textContent = estadisticas.name_es + ": " + estadisticas.today_deaths;
    document.getElementById('paisDos').textContent = estadisticasDos.name_es + ": " + estadisticasDos.today_deaths;
    
    document.getElementById('paisTres').textContent = estadisticasTres.name_es + ": " + estadisticasTres.today_deaths;

    pie(estadisticas, estadisticasDos, estadisticasTres)
}

/*async function cargarUrl(url){
    let respuesta = await fetch(url);
    return respuesta.json();
};

async function clickBoton(){
    
    let pais = document.getElementById('selectPais').value;
    let fecha = document.getElementById('inputFecha').value;
    
    
    let url = `https://api.covid19tracking.narrativa.com/api/${fecha}/country/${pais}`;
    let json = await cargarUrl(url);
    console.log(json);

    let estadisticas = json.dates[fecha].countries[pais];

    console.log(estadisticas.today_confirmed);
    document.getElementById('today_confirmed').innerHTML = estadisticas.today_confirmed;
    document.querySelector('.today_confirmed').setAttribute('style', 'width: ' + redond(estadisticas.today_confirmed)+'%');

    document.getElementById('today_deaths').innerHTML = estadisticas.today_deaths;
    document.querySelector('.today_deaths').setAttribute('style', 'width: ' + redond(estadisticas.today_deaths)+'%');

    document.getElementById('today_hospitalised_patients_with_symptoms').innerHTML = estadisticas.today_hospitalised_patients_with_symptoms;
    document.querySelector('.today_hospitalised_patients_with_symptoms').setAttribute('style', 'width: ' + redond(estadisticas.today_hospitalised_patients_with_symptoms)+'%');

    document.getElementById('today_intensive_care').innerHTML = estadisticas.today_intensive_care;
    document.querySelector('.today_intensive_care').setAttribute('style', 'width: ' + redond(estadisticas.today_intensive_care)+'%');

    document.getElementById('today_new_confirmed').innerHTML = estadisticas.today_new_confirmed;
    document.querySelector('.today_new_confirmed').setAttribute('style', 'width: ' + redond(estadisticas.today_new_confirmed)+'%');

    document.getElementById('today_new_deaths').innerHTML = estadisticas.today_new_deaths;
    document.querySelector('.today_new_deaths').setAttribute('style', 'width: ' + redond(estadisticas.today_new_deaths)+'%');

    document.getElementById('today_new_hospitalised_patients_with_symptoms').innerHTML = estadisticas.today_new_hospitalised_patients_with_symptoms;
    document.querySelector('.today_new_hospitalised_patients_with_symptoms').setAttribute('style', 'width: ' + redond(estadisticas.today_new_hospitalised_patients_with_symptoms)+'%');

    document.getElementById('today_new_intensive_care').innerHTML = estadisticas.today_new_intensive_care;
    document.querySelector('.today_new_intensive_care').setAttribute('style', 'width: ' + redond(estadisticas.today_new_intensive_care)+'%');

    document.getElementById('today_new_open_cases').innerHTML = estadisticas.today_new_open_cases;
    document.querySelector('.today_new_open_cases').setAttribute('style', 'width: ' + redond(estadisticas.today_new_open_cases)+'%');

    document.getElementById('today_new_recovered').innerHTML = estadisticas.today_new_recovered;
    document.querySelector('.today_new_recovered').setAttribute('style', 'width: ' + redond(estadisticas.today_new_recovered)+'%');

    document.getElementById('today_new_total_hospitalised_patients').innerHTML = estadisticas.today_new_total_hospitalised_patients;
    document.querySelector('.today_new_total_hospitalised_patients').setAttribute('style', 'width: ' + redond(estadisticas.today_new_total_hospitalised_patients)+'%');


   
    
};*/

/*
if (document.getElementsByTagName('span').innerHTML ==="undefined"){
    document.getElementsByTagName('span').innerHTML = 'Sin datos proporcionados';
}*/



/*
today_confirmed
today_deaths
today_hospitalised_patients_with_symptoms
today_intensive_care
today_new_confirmed
today_new_deaths
today_new_hospitalised_patients_with_symptoms
today_new_intensive_care
today_new_open_cases
today_new_recovered
today_new_total_hospitalised_patients

*/

/*let tagSpan = document.getElementsByTagName('span');
    for (var i=0; i<tagSpan.length; i++){
        console.log(tagSpan[i].textContent);
        if(tagSpan.textContent === "undefined"){
            tagSpan.innerHTML.replace("undefined", "Sin datos para mostrar");
        }
    
        
    };*/