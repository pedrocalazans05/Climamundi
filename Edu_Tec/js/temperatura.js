let clima = {
    key: `9c80ca3b336609156aa76e82cee1d9d6`,
    lang: `pt_br`,
    units: `metric`,
    link: `https://api.openweathermap.org/data/2.5/weather?`,
    fetchClima: function (city) {
        fetch(`${this.link}q=${city}&units=${this.units}&lang=${this.lang}&appid=${this.key}`)
            .then((response) => {
                if (!response.ok) {
                    alert("Não encontrado");
                    throw new Error("Não encontrado")
                }
                return response.json();
            })
            .then((data) => this.mostrarclima(data))
    },
    mostrarclima: function (data) {
        console.log(data)
        const { name } = data
        const { country } = data.sys
        const { icon, description } = data.weather[0]
        const { temp, humidity ,  } = data.main
        const { temp_max } = data.main
        const { temp_min } = data.main
        const { speed } = data.wind
        const calendario = new Date();
        document.querySelector('.date').innerHTML = `${dateBuilder(calendario)}`
        document.querySelector('.cidade').innerHTML = `${name}, ${country}`
        document.querySelector('.numero').innerHTML = `${temp.toFixed(0)} °C`
        document.querySelector('.img_clima').innerHTML = `<img src="../assets/icons/${icon}.png">`
        document.querySelector('.min', '.max').innerHTML = `<img src="../assets/acima.png"> ${temp_max.toFixed(0)}°C <img src="../assets/baixa.png">${temp_min.toFixed(0)}°C`
        document.querySelector('.vento').innerHTML = `<img src="../assets/wind.png"> ${speed.toFixed(0)} km/h`
        document.querySelector('.umidade').innerHTML = `<img src="../assets/humidity.png"> ${humidity.toFixed(0)} %`
        document.querySelector('.descricao').innerHTML = `${description}`
        
        /*
        document.querySelector('.chuva')
        document.querySelector('.unidade')
        document.querySelector('.poluicao')
        */
    },
    busca: function () {
        this.fetchClima(document.querySelector(".input_pesquisa").value)
    }
}

document.querySelector(".botao_pesquisa").addEventListener("click", function () {
    clima.busca()
})

document.querySelector(".input_pesquisa").addEventListener("keypress", function enter (event) 
{
    key = event.keyCode
    if (key === 13) {
        clima.busca()
    }
})

function dateBuilder(d) {
    let dias = ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"]
    let meses = ["janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"]

    let nomeDia = dias[d.getDay()]
    let numero = d.getDate()
    let mes = meses[d.getMonth()]
    let ano = d.getFullYear()

    return `${nomeDia}, ${numero} de ${mes} de ${ano}`
}

clima.fetchClima("São Paulo")

/*
document.querySelector(".input_pesquisa").addEventListener('keyup', function (event) {
    if (event.key === 13) {
        clima.busca()
    }
})



const api_geo = {
    key: `9c80ca3b336609156aa76e82cee1d9d6`,
    link: `http://api.openweathermap.org/geo/1.0/direct?`,
    limit: 5
}

const api = {
    key: "9c80ca3b336609156aa76e82cee1d9d6",
    base: "https://api.openweathermap.org/data/2.5/",
    lang: "pt_br",
    units: "metric"
}

const cidade = document.querySelector('.cidade');
const data = document.querySelector('.data');
const numero = document.querySelector('.numero');
const unidade = document.querySelector('.unidade');
const img_clima = document.querySelector('.img_clima');
const min_max = document.querySelector('.min_max');
const vento = document.querySelector('.vento');
const chuva = document.querySelector('.chuva');
const umidade = document.querySelector('.umidade');
const poluicao = document.querySelector('.poluicao');
const descricao = document.querySelector('.descricao');
const input_pesquisa = document.querySelector('.input_pesquisa');
const botao_pesquisa = document.querySelector('.botao_pesquisa');

window.addEventListener('load', () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(setPosition, showError);
    }
    else {
        alert('Navegador não suporta geolozalicação');
    }
    function setPosition(position) {
        console.log(position)
        let lat = position.coords.latitude;
        let long = position.coords.longitude;
        coordResults(lat, long);
    }
    function showError(error) {
        alert(`erro: ${error.message}`);
    }
})

function coordResults(lat, long) {
    fetch(`${api.base}weather?lat=${lat}&lon=${long}&lang=${api.lang}&units=${api.units}&APPID=${api.key}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`http error: status ${response.status}`)
            }
            return response.json();
        })
        .catch(error => {
            alert(error.message)
        })
        .then(response => {
            displayResults(response)
        });
}

botao_pesquisa.addEventListener('click', function() {
    searchResults(input_pesquisa.value)
})

input_pesquisa.addEventListener('keypress', enter)
function enter(event) {
    key = event.keyCode
    if (key === 13) {
        searchResults(input_pesquisa.value)
    }
}

function searchResults(cidade) {
    fetch(`${api.base}weather?q=${cidade}&lang=${api.lang}&units=${api.units}&APPID=${api.key}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`http error: status ${response.status}`)
            }
            return response.json();
        })
        .catch(error => {
            alert(error.message)
        })
        .then(response => {
            displayResults(response)
        });
}

function displayResults(weather) {
    console.log(weather)

    cidade.innerText = `${weather.name}, ${weather.sys.country}`;
    umidade.innerText = `${weather.main.humidity}%`;
    vento.innerText = `${Math.round(weather.wind.speed)} Km/h`;

    let date = new Date();
    data.innerText = dateBuilder(date);

    let iconName = weather.weather[0].icon;
    img_clima.innerHTML = `<img src="../assets/icons/${iconName}.png">`;

    let temperature = `${Math.round(weather.main.temp)}`
    numero.innerHTML = temperature;
    unidade.innerHTML = `°C`;

    weather_tempo = weather.weather[0].description;
    descricao.innerText = capitalizeFirstLetter(weather_tempo)

    min_max.innerText = `${Math.round(weather.main.temp_min)}°C / ${Math.round(weather.main.temp_max)}°C`; 
}



function dateBuilder(d) {
    let days = ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"];
    let months = ["janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"];

    let day = days[d.getDay()]; 
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day}, ${date} de ${month} de ${year}`;
}

unidade.addEventListener('click', changeTemp)
function changeTemp() {
    temp_number_now = numero.innerHTML;

    if (unidade.innerHTML === "°C") {
        let f = (temp_number_now * 1.8) + 32
        unidade.innerHTML = "°F"
        numero.innerHTML = Math.round(f)
    }
    else {
        let c = (temp_number_now - 32) / 1.8
        unidade.innerHTML = "°C"
        numero.innerHTML = Math.round(c)
    }
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
*/