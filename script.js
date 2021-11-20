btnAggiorna.onclick = () => { //funzione aggiorna
  aggiorna();
}
//quando intervallo viene premuto si istanziano 
//750 millesimi ovvero ogni quanto aggiornare il grafico
btnTimer.onclick = () => { 
  if (timer == null) {
    document.getElementById("btnTimer").innerHTML = "Ferma";
    timer = setInterval(aggiorna, 750);
  } else {
    clearInterval(timer);
    timer = null;
    document.getElementById("btnTimer").innerHTML = "Inizia";
  }
}
//pone il timer come nullo svuota il container ed elimina la cronologia 
btnElimina.onclick = () => {
  clearInterval(timer);
  timer=null;
  document.getElementById("json-container").innerHTML="";
  cronologia.clear();
  console.clear();
}
btnMostraCronologia.onclick = () => {
  console.info(cronologia);
}
//modifica il valore dei sensori
btnModifica.onclick = () => {
  sensori.forEach(sensori => sensori.toggle())
}
btnMostraDati.onclick = () => {
  console.info(sensori);
}
let sensori = [];
let cronologia = new Map();
var timer;
/**
 * https://www.chartjs.org
 */
const chart = new Chart(document.getElementById('chart').getContext('2d'), {
  type: "radar",
  data: {
    labels: [1,2,3,4,5,6,7,8,9,10], //numero di sensori massimo 10
    datasets: [{
      label: 'temperatura',
      borderColor: "rgb(106, 90, 205)",
      data: cronologia.get('temperatura')
    }, {
      label: 'umidità',
      borderColor: "rgb(255, 165, 0)",
      data: cronologia.get('umidità')
    }, {
      label: 'cleancode',
      borderColor: "rgb(60, 179, 113)",
      data: cronologia.get('cleancode')
    }, {
      label: 'luce',
      borderColor: "rgb(255, 165, 150)",
      data: cronologia.get('luce')
    }]
  }
});