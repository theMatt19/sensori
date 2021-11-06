class Location {
  constructor (name, state_code, lat, lng) {
    this.name = name
    this.state_code = state_code
    this.lat = lat
    this.lng = lng
  }
}
class Sensor {
  constructor(description,id,lat,lng,place,readonly,state_code,value) {
    this.description = description
    this.id = id
    this.readonly = readonly
    this.value = value //value can be false or float
    this.location = new Location (place, state_code, lat, lng)
  }
  toggle() {
    fetch('https://python-iot-sim.professorandrea.repl.co/'+this.id+'/toggle')
    .then(response=>{
      response.json()
    }).then(data=> 
      // this is the data we get after putting our data,
      console.log(data)
    );
  }
  static jsontosensor(json) {
    return new Sensor(
      json.description, json.id, json.lat, json.lng,
      json.place, json.readonly, json.state_code, json.value);
  }
}

function displayJson(url) {
  $(document).ready(function() {
    fetch(url).then(r => r.json())
    .then(body => {
      body['sensors'].forEach(
        sensor => sensors.push(Sensor.jsontosensor(sensor))
      )
      console.log(sensors)
      sensors.forEach(sensor=>{
        if (sensor.value != false) {
          if (history.has(sensor.id)) {
            let array= history.get(sensor.id)
            if (array,length >= 10){
              array.shift();
            }
            array.push(sensor.value);
            history.set(sensor.id,array)
          } else {
            history.set(sensor.id,[sensor.value])
          }
        }
    })
    })
})
} 


function update() {
  while(sensors.pop()) {}
  console.log(sensors.length)
  $("#json-container").html("");
  displayJson("https://python-iot-sim.professorandrea.repl.co/")
  console.log(sensors.length)
}
trigger.onclick = () => {
  update()
}
clear.onclick = () => {
  $("#json-container").html("");
}
let sensors = [];
let storico = 0;
let history= new Map();

/*modify() {
fetch('https://python-iot-sim.professorandrea.repl.co/',{
    method:'PUT',
    headers:{
    'Content-Type':'application/json'
    },
    body:JSON.stringify(sensors)
}).then(response=>{
    return response.json()
    }).then(data=> 
// this is the data we get after putting our data,
console.log(data)
);
}*/


