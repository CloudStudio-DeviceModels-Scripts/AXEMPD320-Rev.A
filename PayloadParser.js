function parseUplink(device, payload) {
  var data = payload.asBytes();
  for (let i = 0; i < data.length; i++) {
    data[i] = data[i].toString(2);
  }

  var errorRaw = parseInt(data[0], 2);

  if (errorRaw == 0) {
    var error = 0;
  }
  var e = device.endpoints.byAddress("1");
  if (e != null) {
    e.updateGenericSensorStatus(error);
  }

  var laps = parseInt(data[1], 2);

  var e = device.endpoints.byAddress("2");
  if (e != null) {
    e.updateGenericSensorStatus(laps);
  }

  if (laps == 0) {
    var water =
      (parseInt(data[2], 2) << 24) +
      (parseInt(data[3], 2) << 16) +
      (parseInt(data[4], 2) << 8) +
      parseInt(data[5], 2);
  } else {
    var water =
      (parseInt(data[2], 2) << 24) +
      (parseInt(data[3], 2) << 16) +
      (parseInt(data[4], 2) << 8) +
      parseInt(data[5], 2);
    water *= laps;
  }

  var e = device.endpoints.byAddress("3");
  if (e != null) {
    e.updateGenericSensorStatus(water);
  }
}
