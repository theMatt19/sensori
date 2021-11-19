/**
 * 
 * @param {url} url
 */
function aggiorna() {
  fetch("https://hf3xzw.deta.dev")
    .then(r => r.json())
    .then(body => {
      sensori.length = 0
      document.getElementById("json-container").innerHTML = ""
      body['sensors'].forEach(sensore => {
        sensori.push(Sensore.jsontosensor(sensore))
      })
      //html & history
      let risultato = '';
      sensori.forEach(sensore => {
        risultato += (sensore.print())
        if (sensore.readonly) {
          if (cronologia.has(sensore.id)) {
            const temp = cronologia.get(sensore.id)
            if (temp.length >= 10) temp.shift();
            temp.push(sensore.valore)
            cronologia.set(sensore.id, temp)
          }  else {
            cronologia.set(sensore.id, [sensore.valore])
          }
        }
      })
      document.getElementById("json-container").innerHTML = risultato;
      //chart
      let indice = 0;
      cronologia.forEach((element, key) => {
        chart.data.datasets[indice].data = element;
        indice++;
      })
      chart.update();
    })
}
