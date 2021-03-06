export function regionFrom(lat, lon, distance = 400) {
  distance = distance / 2;
  const circumference = 40075;
  const oneDegreeOfLatitudeInMeters = 111.32 * 1000;
  const angularDistance = distance / circumference;

  const latitudeDelta = distance / oneDegreeOfLatitudeInMeters;
  const longitudeDelta = Math.abs(
    Math.atan2(
      Math.sin(angularDistance) * Math.cos(lat),
      Math.cos(angularDistance) - Math.sin(lat) * Math.sin(lat)
    )
  );

  return (result = {
    latitude: lat,
    longitude: lon,
    latitudeDelta,
    longitudeDelta
  });
}

//Placeholder for getting some kind of distance. This returns the crow fly path
export function distance(lat1, lon1, lat2, lon2) {
  var p = 0.017453292519943295; // Math.PI / 180
  var c = Math.cos;
  var a =
    0.5 -
    c((lat2 - lat1) * p) / 2 +
    (c(lat1 * p) * c(lat2 * p) * (1 - c((lon2 - lon1) * p))) / 2;
  return 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km
}

export const sortByKey = (array, key) => {
  return array.sort(function(a, b) {
    return a[key] - b[key];
  });
};

export const orderByDistance = (userCoords, data) => {
  if (userCoords.latitude && userCoords.longitude) {
    let orderedData = data;
    orderedData.forEach(spot => {
      //count the crow fly distance here
      distanceInKm = distance(
        spot.lat,
        spot.lon,
        userCoords.latitude,
        userCoords.longitude
      );
      //round to 1 decimal and add to spot properties
      spot.distance = distanceInKm.toFixed(1);
    });
    //sort array by distance with offset and limit applied
    return (orderedData = sortByKey(orderedData, "distance"));
  }
};
