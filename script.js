let key = `8ae0a96d4fee74bec8b4e9ab912dbaa5`;
let search = document.querySelector(".srch");
let lati, loni;
let temperature = document.getElementById("temp");
let humidity = document.getElementById("humid");
let windspeed = document.getElementById("wind");
let image = document.getElementById("weath");
let det = document.getElementById("detail");
let p = document.getElementById("place");
let precip = document.getElementById("prec");
let flag = 0;
async function weather() {
  precipation();
  await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lati}&lon=${loni}&appid=${key}`
  )
    .then((res) => res.json())
    .then((dat) => {
      try {
        //console.log(dat);
        console.log(dat.name);
        if (flag == 1) {
          document.getElementById("place").value = dat.name;
          flag = 0;
        }
        let climate = String(dat.weather[0].main);
        //console.log(climate);
        document.querySelector("body").style.transition = "0.5s all";
        switch (climate) {
          case "Haze": {
            image.src = "./Assets/haze.jpg";
            image.style.transition = "1s all";
            image.title = "Haze";
            image.className = "w-100 rounded-5 h-100 p-2";
            break;
          }
          case "Mist": {
            image.src = "./Assets/mist.jpg";
            image.style.transition = "1s all";
            image.className = "w-100 rounded-5 h-100 p-2";
            image.title = "Mist";
            break;
          }
          case "Clouds": {
            image.src = "./Assets/cloud.jpg";
            image.style.transition = "1s all";
            image.className = "w-100 rounded-5 h-100 p-2";
            image.title = "Clouds";
            break;
          }
          case "Drizzle": {
            image.src = "./Assets/drizzle.png";
            image.style.transition = "1s all";
            image.className = "w-100 rounded-5 h-100 p-2";
            image.title = "Drizzle";
            break;
          }
          case "Clear": {
            image.src = "./Assets/clear.jpg";
            image.style.transition = "1s all";
            image.title = "Clear";
            image.className = "w-100 rounded-5 h-100 p-2";
            break;
          }
          case "Rain": {
            image.src = "./Assets/rain.jpg";
            image.style.transition = "1s all";
            image.title = "Rain";
            image.className = "w-100 rounded-5 h-100 p-2";
            break;
          }
        }
        document.getElementById("appli").style.transition = "2s all";
        document.getElementById("detail").style.visibility = "visible";
        det.className = "visible";
        det.style.transition = "1s all";
        image.style.visibility = "visual";
        let n = Number(dat.main.temp - 273.15);
        //console.log(Math.round(n));
        temperature.innerHTML = String(Math.round(n)) + "°C";
        humidity.innerHTML = dat.main.humidity + "%";
        windspeed.innerHTML = dat.wind.speed + "m/s";
      } catch {
        console.log("Weather error");
      }
    });
}
place.addEventListener("keypress", function (trigger) {
  if (trigger.keyCode === 13) {
    search.click();
    document.getElementById("india").className = "visually-hidden";
  }
});
search.addEventListener("click", () => {
  document.getElementById("india").className = "visually-hidden";
  locate();
  image.style.transform = "scale(1.1)";
  image.style.transition = "1s all";
  image.style.transform = "scale(1)";
});
async function precipation() {
  await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${lati}&lon=${loni}&appid=8ae0a96d4fee74bec8b4e9ab912dbaa5`
  )
    .then((resp) => resp.json())
    .then((datum) => {
      try {
        console.log(datum.city.country);
        if (datum.city.country == "IN") {
          document.getElementById("india").src = "./Assets/india.png";
          document.getElementById("india").className = "visible";
          document.getElementById("india").className = "p-1";
          document.getElementById("india").style.border = "1px solid black";
        } else {
          document.getElementById("india").src = "./Assets/airplane.png";
          document.getElementById("india").className = "visible";
          document.getElementById("india").className = "p-1";
          document.getElementById("india").style.border = "1px solid black";
        }
        precip.innerHTML = Math.round(Number(datum.list[1].pop) * 100) + "%";
        console.log(datum);
      } catch {
        console.log("error");
      }
    });
}
async function locate() {
  let city = document.getElementById("place").value;
  await fetch(
    `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${key}`
  )
    .then((resp) => resp.json())
    .then((data) => {
      try {
        lati = data[0].lat;
        loni = data[0].lon;
        weather();
      } catch {
        console.log("location error");
        lati = "--";
        loni = "--";
        document.querySelector("body").style.transition = "0.5s all";
        image.src = "./Assets/err.png";
        image.style.transition = "1s all";
        image.title = "Error";
        image.className = "w-75 rounded-5 h-50 p-2";
        document.getElementById("appli").style.transition = "1s all";
        document.getElementById("detail").className = "visually-hidden";
        det.className = "visually-hidden";
        det.style.transition = "1s all";
        image.style.visibility = "visible";
      }
    });
}
// for user's current position
let pos = document.querySelector(".posit");
pos.addEventListener("click", getLocation);
function getLocation() {
  document.getElementById("india").className = "visually-hidden";
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
    flag++;
  }
}
function showPosition(position) {
  let lt = Number(position.coords.latitude);
  let ln = Number(position.coords.longitude);
  lati = lt.toFixed(2);
  loni = ln.toFixed(2);
  weather();
}
