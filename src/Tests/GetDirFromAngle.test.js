import GetDirFromAngle from '../Functions/GetDirFromAngle';

test('It gives the right x and y coordinates', () => {
  const coordinates = GetDirFromAngle(30);
  const answertx = parseFloat(coordinates.tx.toFixed(1));
  const answerty = parseFloat(coordinates.ty.toFixed(1));
  expect(answerty).toBe(0.5);
  expect(answertx).toBe(parseFloat((Math.sqrt(3) / 2).toFixed(1)));
});