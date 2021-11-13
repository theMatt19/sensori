const { Chart } = require("./chart");

btnAggiorna.onclick = () => { //funzione aggiorna
  aggiorna();
}
btnintervallo.onclick = () => { //quando intervallo viene premuto si istanziano 500 millesimi ovvero ogni quanto aggiornare il grafico
  if (intervallo == null) {
    document.getElementById("btnintervallo").innerHTML = "Ferma";
    intervallo = setInterval(update, 500);
  } else {
    clearInterval(intervallo);
    intervallo = null;
    document.getElementById("btnintervallo").innerHTML = "Inizia";
  }
}
btnElimina.onclick = () => {
  clearInterval(intervallo);
  intervallo=null;
  document.getElementById("json-container").innerHTML="";
  cronologia.clear();
  console.clear();
}
btnMostraCronologia.onclick = () => {
  console.info(cronologia);
}
btnModifica.onclick = () => {
  sensori.forEach(sensori => sensori.toggle())
}
btnMostraDati.onclick = () => {
  console.info(sensori);
}
let sensori = [];
let cronologia = new Map();
var intervallo;
/**
 * https://www.chartjs.org
 * GRAFICO
 */
const chart = new Chart(document.getElementById('chart').getContext('2d'), {
  type: "line",
  data: {
    labels: [1,2,3,4,5,6,7,8,9,10], //xValues
    datasets: [{
      label: 'temperature-01',
      backgroundColor: "rgba(255,0,0,1.0)",
      borderColor: "rgba(0,0,0,0.1)",
      data: history.get('temperature-01')
    }, {
      label: 'umidita-01',
      backgroundColor: "rgba(0,255,0,1.0)",
      borderColor: "rgba(0,0,0,0.1)",
      data: history.get('umidita-01')
    }, {
      label: 'cleancode-01',
      backgroundColor: "rgba(0,0,255,1.0)",
      borderColor: "rgba(0,0,0,0.1)",
      data: history.get('cleancode-01')
    }, {
      label: 'luce',
      backgroundColor: "rgba(128,0,128,1.0)",
      borderColor: "rgba(0,0,0,0.1)",
      data: history.get('luce-01')
    }]
  }
});
