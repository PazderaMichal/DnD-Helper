function weatherGen() {
    //* zjistíme, jaká je vybraná roční doba a podle toho vybereme seznam, ze kterého budeme generovat počasí
    let pastWeather = [];
    //pastWeather = JSON.stringify(localStorage.getItem('pastWeather'))
    const seasonType = document.getElementById('season-type');
    console.log(localStorage.getItem('pastWeather'))
    if (localStorage.getItem('pastWeather') !== 'undefined') {

        pastWeather = JSON.parse(localStorage.getItem('pastWeather'));
    } else {
        pastWeather = []
    }
    console.log('pastWeatherParts', pastWeather);

    const weatherList = document.getElementById('weather-list'); // toto je lu element

    for (i = 0; i < pastWeather.length; i++) {
        const weatherListElement = document.createElement('li');
        weatherListElement.append(pastWeather[i]);
        weatherList.append(weatherListElement);
    }

    
    pastWeather.length = 0

    function findSeason() {
        if (document.getElementById('summer').checked) {
            //console.log('Summer')
            const weatherTypes = [
                'sunny',
                'windy',
                'rainy',
                'breeze',
                'cloudy',
                'storm',
                'heat',
            ];
            return weatherTypes;
        }
        if (document.getElementById('spring-fall').checked) {
            //console.log('Spring/Fall')
            const weatherTypes = [
                'sunny',
                'windy',
                'rainy',
                'breeze',
                'cloudy',
                'storm',
                'fog',
                //'heavy rain',
                'drizzle',
            ];
            return weatherTypes;
        }
        if (document.getElementById('winter').checked) {
            //console.log('Winter')
            const weatherTypes = [
                'sunny',
                'windy',
                'rainy',
                'snowy',
                'fog',
                'breeze',
                'cloudy',
                'blizzard',
                'ice storm',
                'sleet',
            ];
            return weatherTypes;
        }
    }

    let weatherType = findSeason();
    seasonType.addEventListener('click', () => {
        weatherType = findSeason();
    });

    const weatherButton = document.getElementById('weather-button');
    const weatherIcon = document.getElementById('weather-icon');
    weatherIcon.setAttribute('src', 'weather-icons/sunny.png');

    function wGeneration() {
        //* tato funkce generuje počasí za pomocí stiskuntí tlačítka
        //* vybírá typ počasí z vybraného seznamu weatherTypes
        //const weatherTitle = 'weather'
        const newWeather = Math.floor(Math.random() * weatherType.length);

        const theNewWeather = weatherType[newWeather];
        //console.log('vygenerované počasí:',theNewWeather);

        //* změna obrázku počasí
        let theNewWeatherPicture = `weather-icons/${theNewWeather}.png`;
        weatherIcon.setAttribute('src', theNewWeatherPicture);

        //* vypíšeme nově vygenerovaný typ počasí do seznamu
        const newWeatherListElement = document.createElement('li');
        newWeatherListElement.append(theNewWeather);
        weatherList.append(newWeatherListElement);

        pastWeather.push(theNewWeather);
        console.log(pastWeather);
        localStorage.setItem('pastWeather', JSON.stringify(pastWeather));
        return theNewWeather;
    }

    let lastWeatherIndex = pastWeather.length - 1;
    console.log(lastWeatherIndex);
    const clearButton = document.getElementById('clearButton');
    clearButton.addEventListener('click', () => {
        pastWeather = []
        localStorage.setItem('pastWeather', pastWeather[lastWeatherIndex]);
        location.reload();
    });

    const listOutput = document.getElementById('weather-list');

    weatherButton.addEventListener('click', wGeneration);
}

function time() {
    //* tato funkce se stará o ukazování a změnu času

    const dayTimes = [
        'Dawn',
        'Morning',
        'Noon',
        'Afternoon',
        'Dusk',
        'Evening',
        'Midnight',
        'Late night',
    ];
    let i = 0;
    const nextButton = document.getElementById('new-time');
    const previousButton = document.getElementById('last-time');
    const timePointer = document.getElementById('time-pointer');

    let timePicture = document.getElementById('time-picture');
    timePicture.setAttribute('src', 'pictures/0.jpg');
    let timePhaze = document.getElementById('time-phaze-text');
    const timeParagraph = document.createElement('p');
    timeParagraph.append(dayTimes[i]);
    timePhaze.append(timeParagraph);

    //* podle stisknutí tlačítka se čas posunuje dopředu nebo dozadu a obrázek se mění
    //* posunování dopředu
    function nextTime() {
        timeParagraph.innerHTML = '';

        i = i + 1;
        if (i === 8) {
            i = 0;
        }
        timeParagraph.append(dayTimes[i]);
        timePhaze.append(timeParagraph);

        //* změna obrázku času
        let imageSource = `pictures/${i}.jpg`;
        timePicture.setAttribute('src', imageSource);
    }
    //* posunování dozadu
    function previousTime() {
        timeParagraph.innerHTML = '';

        i = i - 1;
        if (i === -1) {
            i = 7;
        }
        timeParagraph.append(dayTimes[i]);
        timePhaze.append(timeParagraph);

        //* změna obrázku
        let imageSource = `pictures/${i}.jpg`;
        timePicture.setAttribute('src', imageSource);
    }
    previousButton.addEventListener('click', previousTime);
    nextButton.addEventListener('click', nextTime);
}

function lootGenerator() {
    //* zde je genrátor, vybírající itemy ze seznamů

    const campCheckbox = document.getElementById('camp');
    const dungeonCheckbox = document.getElementById('dungeon');
    const houseCheckbox = document.getElementById('house');
    const seaCheckbox = document.getElementById('sea');

    const lootButton = document.getElementById('loot-button');
    //*seznamy itemů v kategoriích
    function findLootPlace() {
        let rawLootList = [];
        if (campCheckbox.checked) {
            const campLoot = [
                'knife',
                'roasted boar',
                'map of surrounding landscape',
                'bottle of alcohol',
            ];
            rawLootList.push(...campLoot);
        }
        if (dungeonCheckbox.checked) {
            const dungeonLoot = [
                'chest full of coins',
                'magic book',
                'sword',
                'armor',
                'torch',
            ];
            rawLootList.push(...dungeonLoot);
        }
        if (houseCheckbox.checked) {
            const houseLoot = ['old book', 'leather purse', 'potion', 'food'];
            rawLootList.push(...houseLoot);
        }
        if (seaCheckbox.checked) {
            const seaLoot = [
                'chest full of coins',
                'fishing pole',
                'treasure map',
                'wooden dingy',
            ];
            rawLootList.push(...seaLoot);
        }
        return rawLootList;
    }
    //* ty které jsou 'checknuté' se přidají do seznamu lootList
    let lootList = findLootPlace();

    lootButton.addEventListener('click', () => {
        const theLootList = document.getElementById('loot-list');
        if (
            seaCheckbox.checked ||
            houseCheckbox.checked ||
            dungeonCheckbox.checked ||
            campCheckbox.checked
        ) {
            theLootList.innerHTML = '';

            let counter = document.getElementById('loot-counter').value * 1;
            lootList = findLootPlace();
            //console.log(lootList);
            //console.log(counter);
            let i = 0;

            for (i = 0; i < counter; i++) {
                const specificLootList = Math.floor(
                    Math.random() * lootList.length
                );

                const theLoot = lootList[specificLootList];

                const lootListElement = document.createElement('li');
                lootListElement.append(theLoot);
                theLootList.append(lootListElement);

                console.log(theLoot);
            }
        } else {
            theLootList.innerHTML = 'Choose place!';
        }
    });

    lootList = '';
}

function main() {
    weatherGen();
    time();
    lootGenerator();
}

main();