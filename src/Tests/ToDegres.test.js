import ToDegres from '../Functions/ToDegres';

test('It returns radians from degrees', () => {
  const degres = Math.floor(ToDegres(30));
  expect(degres).toBe(1718);
});