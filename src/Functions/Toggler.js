const Toggler = () => {
  if (window.model.musicMode === true) {
    window.model.backgroundMusic.stop();
    window.model.musicMode = false;
  } else if (window.model.musicMode === false) {
    window.model.backgroundMusic.play();
    window.model.musicMode = true;
  }
};

export default Toggler;