const GetDirFromAngle = (angle) => {
  const rads = angle * (Math.PI / 180);
  const tx = Math.cos(rads);
  const ty = Math.sin(rads);
  return {
    tx,
    ty,
  };
};

export default GetDirFromAngle;
