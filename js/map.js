'use strict';

// consts
var APARTMENT_TYPES = {
  bungalo: 'Бунгало',
  flat: 'Квартира',
  house: 'Дом'
}

// elements
var map = document.querySelector('.map');
var mapPins = document.querySelector('.map__pins');

// data
var ads = generateRandomData(8);

// fragments
var pinsFragment = generatePins(ads);
var cardFragment = generateCard(ads[0]);

// script
mapPins.appendChild(pinsFragment);
map.appendChild(cardFragment);
map.classList.remove('map--faded');


// functions
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

  return data;
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
    guests: guests,
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

function generatePins(ads) {
  var template = document.querySelector('template')
    .content.querySelector('.map__pin');
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < ads.length; i++) {
    var pin = template.cloneNode(true);
    var image = pin.querySelector('img');

    pin.style.left = ads[i].location.x - image.width / 2 + 'px';
    pin.style.top = ads[i].location.y - image.height + 'px';
    pin.querySelector('img').src = ads[i].author;

    fragment.appendChild(pin);
  }

  return fragment;
}

function generateCard(ad) {
  var template = document.querySelector('template')
    .content.querySelector('.map__card');
  var featuresList = template.querySelector('.popup__features');
  var featuresFragment = generateFeaturesFragment(ad.offer.features);
  var photosFragment = generatePhotosFragment(ad.offer.photos);

  template.querySelector('h3').innerText = ad.offer.title;
  template.querySelector('p > small').innerText = ad.offer.address;
  template.querySelector('.popup__price').innerText =
    ad.offer.price + '&#x20bd;/ночь';
  template.querySelector('h4').innerText = APARTMENT_TYPES[ad.offer.type];
  template.querySelector('h4 ~ p').innerText =
    ad.offer.rooms + ' комнаты для ' + ad.offer.guests + ' гостей ';
  template.querySelector('h4 ~ p ~ p').innerText =
  'Заезд после ' + ad.offer.checkIn + ', выезд до ' + ad.offer.checkOut;
  featuresList.appendChild(featuresFragment);
  template.querySelector('p:nth-child(5)').innerText = ad.offer.description;
  template.querySelector('.popup__pictures').appendChild(photosFragment);
  template.querySelector('.popup__avatar').src = ad.author;

  return template;
}

function generateFeaturesFragment(features) {
  var fragment = document.createDocumentFragment();
  var blockClass = 'feature';

  for (var i = 0; i < features.length; i++) {
    var specificClass = blockClass + '--' + features[i];
    var featureItem = document.createElement('li');

    featureItem.classList.add(blockClass, specificClass);

    fragment.appendChild(featureItem);
  }

  return fragment;
}

function generatePhotosFragment(photos) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < photos.length; i++) {
    var photosItem = document.createElement('li');
    var photosImg = document.createElement('img');

    photosImg.src = photos[i];
    photosImg.style.width = '50px';
    photosImg.style.height = '75px';
    photosImg.style.paddingRight = '10px';

    photosItem.appendChild(photosImg);
    fragment.appendChild(photosItem);
  }

  return fragment;
}

// В список .popup_pictures по аналогии с шаблоном выведите все фотографии из списка фотографий offer.pictures. Каждая из строк массива pictures должна записываться как src соответствующего изображения. Для фотографий нужно явно указать размеры в атрибутах.
