//Перечисление
var HotelPrice = {
  MIN: 1000,
  MAX: 4000,
};
var RoomsCount = {
  MIN: 1,
  MAX: 4,
};
var GuestsCount = {
  MIN: 1,
  MAX: 4,
};

var Coordinate = {
  MIN_X: 100,
  MAX_X: 900,
  MIN_Y: 130,
  MAX_Y: 630,
  OFFSET_X: 25,
  OFFSET_Y: 70,
}

//Константы
var MAP = document.querySelector('.map__pins');
MAP.classList.remove('map--faded');
var MAP_PIN_TEMPLATE = document.querySelector('#pin')
  .content
  .querySelector('.map__pin');
var POPUP_TEMPLATE = document.querySelector('#card')
  .content
  .querySelector('.popup');
var AD_FILTER = document.querySelector('map__filters-container');
var HOTELS_TYPES_DICTIONARY = { flat: 'Квартира', bungalo: 'Бунгало', house: 'Дом', palace: 'Дворец' };
var TYPES_HOTEL = ['palace', 'flat', 'house', 'bungalo'];
var TIME_CHECKIN = ['12:00', '13:00', '14:00'];
var TIME_CHECKOUT = ['12:00', '13:00', '14:00'];
var TYPES_FEATURES = ["wifi", "dishwasher", "parking", "washer", "elevator", "conditioner"];
var ADDRESS_IMAGES = ["http://o0.github.io/assets/images/tokyo/hotel1.jpg", "http://o0.github.io/assets/images/tokyo/hotel2.jpg", "http://o0.github.io/assets/images/tokyo/hotel3.jpg"];
var ADS_COUNT = 8;
var SAME_HOTELS = mockAds();


//Функции
function getRandomNumb(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};

function getRandomItem(array) {
  return array[getRandomNumb(0, array.length)];
};

function getSameHotel(idx) {
  var pinCoordinateX = getRandomNumb(Coordinate.MIN_X, Coordinate.MAX_X);
  var pinCoordinateY = getRandomNumb(Coordinate.MIN_Y, Coordinate.MAX_Y);

  return {
    author: {
      avatar: "img/avatars/user0" + idx + ".png",
    },

    offer: {
      title: "best room",
      address: pinCoordinateX + "," + pinCoordinateY,
      price: getRandomNumb(HotelPrice.MIN, HotelPrice.MAX),
      type: getRandomItem(TYPES_HOTEL),
      rooms: getRandomNumb(RoomsCount.MIN, RoomsCount.MAX),
      guests: getRandomNumb(GuestsCount.MIN, GuestsCount.MAX),
      checkin: getRandomItem(TIME_CHECKIN),
      checkout: getRandomItem(TIME_CHECKOUT),
      features: getRandomItem(TYPES_FEATURES),
      description: "description room",
      photos: getRandomItem(ADDRESS_IMAGES),
    },

    location: {
      x: pinCoordinateX,
      y: pinCoordinateY,
    }
  }
};

function mockAds() {
  var array = [];
  for (var i = 1; i <= ADS_COUNT; i++) {
    array.push(getSameHotel(i));
  }
  return array;
};

function createPins() {

  var fragment = document.createDocumentFragment();

  SAME_HOTELS.forEach(function (item) {
    var hotelElement = MAP_PIN_TEMPLATE.cloneNode(true);
    var avatarImage = hotelElement.getElementsByTagName("img");
    hotelElement.style.left = (item.location.x - Coordinate.OFFSET_X) + 'px';
    hotelElement.style.top = (item.location.y - Coordinate.OFFSET_Y) + 'px';
    avatarImage[0].src = item.author.avatar;
    avatarImage[0].alt = item.offer.title;
    fragment.appendChild(hotelElement);
  });

  MAP.appendChild(fragment);
};

function selectionOfHotelTypes(type) {
  return HOTELS_TYPES_DICTIONARY[type];
}

function setElementContents(element, object) {
  var arrayOfObjectProperties = Object.entries(object);

  arrayOfObjectProperties.forEach(function ([key, value]) {
    element.querySelector('.popup__' + key).textContent = value;
  });

};



function createPopup(ad) {
  var popupElement = POPUP_TEMPLATE.cloneNode(true);
  var adsType = ad.offer.type;
  var popupElementImages = popupElement.getElementsByTagName("img");

  var popupDescription = {
    title: ad.offer.title,
    'text--address': ad.offer.address,
    'text--price': ad.offer.price + '₽/ночь',
    type: selectionOfHotelTypes(adsType),
    'text--capacity': ad.offer.rooms + ' комнаты для ' + ad.offer.guests + ' гостей',
    'text--time': 'Заезд после' + ad.offer.checkin + ', выезд до' + ad.offer.checkout,
    description: ad.offer.description,
  };

  setElementContents(popupElement, popupDescription);

  popupElementImages[0].src = ad.author.avatar;
  popupElementImages[1].src = ad.offer.photos;
  MAP.insertBefore(popupElement, AD_FILTER);
};


// Запуск функций
createPins();
createPopup(SAME_HOTELS[0]);
