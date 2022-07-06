const getBookInfo = async (bookTitle) => {
  const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;

  const fullUrl = `https://www.googleapis.com/books/v1/volumes?q=${bookTitle}&key=${apiKey}&maxResults=40&orderBy=relevance&projection=full&printType=books`;
  let list = [];

  await fetch(fullUrl)
    .then(async (response) => {
      const data = await response.json();
      await data.items.map((info) => {
        list.push(info);
      });

      if (!response.ok) {
        const error = (data && data.message) || response.statusText;
        return Promise.reject(error);
      }
    })
    .catch((error) => {
      console.error("There was an error!", error);
    });
  return list;
};

export default getBookInfo;
