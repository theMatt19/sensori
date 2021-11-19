class Sensore {
  constructor(descrizione,id,lat,lng,posizione,readonly,stato,valore) {
      this.descrizione=descrizione
      this.id=id
      this.lat=lat
      this.lng=lng
      this.posizione=posizione
      this.readonly=readonly
      this.stato=stato
      this.valore=valore
  }
  toggle() { //funzione che ci permette di modificare i dati richiedendo una fetch di tipo "PUT"
    fetch('https://hf3xzw.deta.dev/'+this.id+'/toggle', {
      method: 'PUT', 
    }).then(response => response.json())
    .then(result => {})
  }
  print() { 
    return this.id+": "+this.valore+"<br>";
  }
  static jsontosensor(json) {
    return new Sensore(
      json.description, json.id, json.lat, json.lng,
      json.place, json.readonly, json.state_code, json.value);
  }
}