/* Global Variables */
const baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = '9d4d235ee2ee443f175a5a6ba6b0aaed';
const validZipCode = /^\d{5}$/;
const zipError = document.getElementById('ziperror');
const entryHolder = document.getElementById('entry');
const itIsHolder = document.getElementById('itis');
const tempFeelingHolder = document.getElementById('tempfeeling');

// Create a new date instance dynamically with JS.
let d = new Date();
let newDate = d.getMonth()+1+'.'+ d.getDate()+'.'+ d.getFullYear();

// Add event listener and perform actions when clicked.
document.getElementById('generate').addEventListener('click', performAction)
function performAction(){
  zipCode = document.getElementById('zip').value;
  apiURL = `${baseURL}${zipCode}&appid=${apiKey}&units=metric`;
  userFeeling = document.getElementById('feelings').value;
  zipError.innerText = ``;
  if(zipCode.match(validZipCode)) {
    clickChain(apiURL, userFeeling);
  } else if(zipCode === '') {
    zipError.innerText = `— You must provide a zip code.`;
  } else {
    zipError.innerText = `— ${zipCode} is not a valid zip code.`;
  };
}

// Functions chain to call once generate button is clicked.
function clickChain(url, userFeeling) {
  getTemperature(url)
  .then((owmResponse) => {
    userInputs = {
      temperature: owmResponse.main.temp,
      date: newDate,
      userFeeling: userFeeling
    };
    postUserInput('/userInput', userInputs);
    updateUI();
  })
  .catch((err) => {
    zipError.innerText = `— ${zipCode} is not a valid zip code.`;
  })
}

// Fetch API to get today temperature.
const getTemperature = async(url) => {
  const req = await fetch(url);
  try {
    const res = await req.json();
    return res;
  }
  catch(err) {
    console.error('Error:', err);
  }
};

// POST user data to server side.
const postUserInput = async(url, data) => {
  const res = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers : {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data),
  });
  try {
    return;
  }
  catch (err) {
    console.error('Error:', err);
  }
};

// GET data and update UI
const updateUI = async() => {
  const req = await fetch('/getUserData');
  try {
    const userData = await req.json();
    classifyTemp(userData.temperature);
    const dateHolder = document.getElementById('date');
    dateHolder.innerHTML = userData.date;
    const tempHolder = document.getElementById('temp');
    tempHolder.innerHTML = userData.temperature + '&deg;C';
    const feelingHolder = document.getElementById('content');
    if(userData.userFeeling !== '') {
      feelingHolder.innerHTML = '&mdash; You\'re feeling ' + userData.userFeeling;
    } else {
      feelingHolder.innerHTML = '';
    }
  }
  catch(err) {
    console.error('Error:', err);
  }
};

// Classify the temperature
// Hot: 84-99 F (29-37.5 C) Warm:70-84 F (21-29 C) Cool:55-69 F (13-21 C) Cold: Below 55 F (Below 13 C)
const classifyTemp = async(temperature) => {
  entryHolder.className = 'holder entry';
  itIsHolder.style.display = 'block';
  tempFeelingHolder.classList.remove('animate-in');
  if(temperature <= 13) {
    entryHolder.classList.add('cold');
    setTimeout(() => {
      tempFeelingHolder.innerText = 'Cold';
      tempFeelingHolder.classList.add('animate-in');
    } ,600);
  } else if(13 < temperature <= 21) {
    entryHolder.classList.add('cool');
    setTimeout(() => {
      tempFeelingHolder.innerText = 'Cool';
      tempFeelingHolder.classList.add('animate-in');
    } ,600);
  } else if(21 < temperature <= 29) {
    entryHolder.classList.add('warm');
    setTimeout(() => {
      tempFeelingHolder.innerText = 'Warm';
      tempFeelingHolder.classList.add('animate-in');
    } ,600);
  } else if(temperature > 29) {
    entryHolder.classList.add('hot');
    setTimeout(() => {
      tempFeelingHolder.innerText = 'Hot';
      tempFeelingHolder.classList.add('animate-in');
    } ,600);
  }
};
