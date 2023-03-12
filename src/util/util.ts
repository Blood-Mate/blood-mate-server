export const getDistance = (
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number,
) => {
  const R = 6371; // Radius of the earth in km
  const dLat = (Math.PI / 180) * (lat2 - lat1); // deg2rad below
  const dLon = (Math.PI / 180) * (lng2 - lng1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((Math.PI / 180) * lat1) *
      Math.cos((Math.PI / 180) * lat2) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c; // Distance in km
  return d;
};
