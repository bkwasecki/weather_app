window.addEventListener('load', ()=> {
	let long;
	let lat;
	let temperatureDescription = document.querySelector('.temperature-description');
	let temperatureDegree = document.querySelector('.temperature-degree');
	let locationTimezone = document.querySelector('.location-timezone');
	let icon = document.querySelector('.icon');
	let temperatureSection = document.querySelector('.degree-section');
	const temperatureSpan = document.querySelector('.degree-section span');
	if(navigator.geolocation){
		navigator.geolocation.getCurrentPosition(position => {
			long = position.coords.longitude;
			lat = position.coords.latitude;
			

			const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=a1b50be2a03fa21a5aeb52e60a191705`;

			fetch(api)
			.then(response =>{
				return response.json();
			})
			.then(data => {
				console.log(data);

			const temperature = Math.round((data.main.temp - 273.1)*2)/2;
			const summary = data.weather[0].main;
			const place = `${data.name}/${data.sys.country}`;
			const iconId = data.weather[0].icon;
			//Set dom elements from the aPi
			temperatureDegree.innerText = temperature;
			temperatureDescription.innerText = summary;
			locationTimezone.innerText = place;
			icon.innerHTML = `<img src="https://openweathermap.org/img/wn/${iconId}@2x.png">`;
			//change to fahrenheit
			let fahrenheit = (temperature * 9/5) + 32;


			// change to fahrenheit;
			temperatureSection.addEventListener('click', ()=>{
				if(temperatureSpan.textContent === "C"){
					temperatureSpan.textContent = "F";
					temperatureDegree.textContent = fahrenheit;
				}else{
					temperatureSpan.textContent = "C";
					temperatureDegree.textContent = temperature;
				}
			} )
			});
		});

		
	}
});