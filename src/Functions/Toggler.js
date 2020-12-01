const Toggler = () => {
  if (window.model.musicMode) {
    window.model.backgroundMusic.stop();
    window.model.musicMode = false;
  } else {
    window.model.backgroundMusic.play();
    window.model.musicMode = true;
  }
};

export default Toggler;