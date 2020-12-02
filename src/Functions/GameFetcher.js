const GameFetcher = () => {
  const PostVar = {
    name: 'EypSrcnShooterGame',
  };
  fetch(
    'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(PostVar),
    },
  );
};

export default GameFetcher;