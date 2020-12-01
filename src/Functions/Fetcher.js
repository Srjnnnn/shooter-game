const Fetcher = () => {
  // const PostVar = {
  //   name: 'EypSrcnShooterGame',
  // };

  const PostVar2 = {
    user: window.model.user,
    score: (window.model.point - window.model.clock),
  };

  // const fetchVar = fetch(
  //   'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json;charset=utf-8',
  //     },
  //     body: JSON.stringify(PostVar),
  //   },
  // );

  const fetched = fetch(
    'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/XthYmtC7N6WMKqS4zn5P/scores/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(PostVar2),
    },
  )
    .then(response => fetch(
      `${response.url}`, {
        method: 'GET',
      },
    ))
    .then(result => result.json())
    .then(result => result.result);

  return fetched;
};

export default Fetcher;