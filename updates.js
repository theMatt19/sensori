/**
 * 
 * @param {url} url
 */
 function aggiorna() {
  fetch("https://hf3xzw.deta.dev")
  .then(r => r.json())
  .then(body => {
    sensori = []
    body['sensori'].forEach(
      sensori => sensori.push(Sensori.jsontosensor(sensori))
    )
    aggiornaGrafico();
    aggiornaHtml();
    aggiornaCronologia();
  })
}
function aggiornaCronologia() { //controlli il vettore dei sensori e aggiunge alla cronologia il valore togliende il valore in fondo al vettore
  sensori.forEach(sensori => {
    if (typeof sensore.value =='number'){
      if (cronologia.has(sensori.id))
        let temp = cronologia.get(sensori.id)
        if(sensori.length >= 10)
          temp.shift();
        temp.push(sensori.id,temp)  
        cronologia.set(sensori.id) 
    }
      else
         cronologia.set(sensore.id,[sensori.value]) 
  })
}
function aggiornaHtml() { //funzione che per ogni sendore stampa nella variabile "risultato il sensore e poi lo passa al json-container"
  let risultato = '';
  sensori.forEach(element => risultato+= (element.print()))
  document.getElementById("json-container").innerHTML = risultato;
}
function aggiornaGrafico() { //aggiorna il grafico per ogni indice 
  let indice = 0;
  cronologia.forEach((element, key) => {
    chart.data.datasets[indice].data = element;
    indice++;
  })
  chart.update();
}
