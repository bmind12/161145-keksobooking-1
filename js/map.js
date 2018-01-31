'use strict';

generateRandomData(8);

var map = document.querySelector('.map');

map.classList.remove('map--faded');

function generateRandomData(num) {
  var data = [];
  var photoNumbers = [];
  var titles = [
    'Большая уютная квартира',
    'Маленькая неуютная квартира',
    'Огромный прекрасный дворец',
    'Маленький ужасный дворец',
    'Красивый гостевой домик',
    'Некрасивый негостеприимный домик',
    'Уютное бунгало далеко от моря',
    'Неуютное бунгало по колено в воде'
  ];
  var types = ['flat', 'house', 'bungalo'];
  var checkInTimes = ['12:00', '13:00', '14:00'];
  var checkOutTimes = ['12:00', '13:00', '14:00'];
  var photos = [
    'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel1.jpg'
  ];
  var features = [
    'wifi',
    'dishwasher',
    'parking',
    'washer',
    'elevator',
    'conditioner'
  ];

  for(var i = 0; i < num; i++) {
    data.push(new Ad(
      checkInTimes,
      checkOutTimes,
      features,
      photoNumbers,
      photos,
      titles,
      types
    ));
  }
}

function Ad(
  checkInTimes,
  checkOutTimes,
  features,
  photoNumbers,
  photos,
  titles,
  types
) {
  var photoAddress = 'img/avatars/user0' +
    getRandomNumInRangeExcept(1, 8, photoNumbers) + '.png';
  var title = getRandomTitle(titles);
  var price = getRandomNumInRange(1000, 1000000);
  var type = getRandomElement(types);
  var x = getRandomNumInRange(300, 900);
  var y = getRandomNumInRange(150, 500);
  var rooms = getRandomNumInRange(1, 5);
  var guests = getRandomNumInRange(0, 20);
  var checkIn = getRandomElement(checkInTimes);
  var checkOut = getRandomElement(checkOutTimes);
  var photosRandom = shuffleArray(photos);
  var randomFeatures = shuffleArray(features)
    .slice(getRandomNumInRange(0, features.length - 1));

  this.author = photoAddress;

  this.location = {
    x: x,
    y: y
  };

  this.offer = {
    title: title,
    address: this.location.x + ', ' + this.location.y,
    price: price,
    type: type,
    rooms: rooms,
    checkIn: checkIn,
    checkOut: checkOut,
    features: randomFeatures,
    description: '',
    photos: photosRandom
  };
}

function getRandomNumInRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomNumInRangeExcept(min, max, exceptions) {
  var randNum;

  do {
    randNum = Math.floor(Math.random() * (max - min + 1)) + min;
  } while (exceptions.includes(randNum));

  exceptions.push(randNum);

  return randNum;
}

function getRandomTitle(titles) {
  var titleNum = Math.floor(Math.random() * titles.length);

  return titles.splice(titleNum, 1).toString();
}

function getRandomElement(array) {
  return array[getRandomNumInRange(0, array.length - 1)];
}

function shuffleArray(array) {
  var shuffledArray = array.slice();

  for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
  }

  return shuffledArray;
}
