import axios from 'axios';

axios.defaults.baseURL = 'https://api.unsplash.com';

export const fetchImages = async (query, page) => {
  const response = await axios.get('/search/photos', {
    params: {
      orientation: 'landscape',
      per_page: 12,
      page: page,
      query: query,
      client_id: 'qVQBOgkZlfAD80jmxA_6ivkJhSd28ZjPXx3b8b1wNfw',
    },
  });
  return {
    total_pages: response.data.total_pages,
    results: response.data.results,
  };
};
