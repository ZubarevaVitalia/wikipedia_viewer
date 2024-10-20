import { makeAutoObservable } from 'mobx';
import axios from 'axios';

class SearchStore {
  query = '';
  results = [];
  error = '';

  constructor() {
    makeAutoObservable(this);
  }

  setQuery(query) {
    this.query = query;
  }

  async wikipediaSearch() {
    const WIKIPEDIA_URL = 'https://en.wikipedia.org/w/api.php';
    const params = {
      action: 'opensearch',
      format: 'json',
      search: this.query,
      limit: 10,
      origin: '*',
    };

    try {
      const response = await axios.get(WIKIPEDIA_URL, { params });
      const [_, headings, descriptions, links] = response.data;
      this.results = headings.map((heading, index) => ({
        heading,
        description: descriptions[index],
        link: links[index],
      }));
      this.error = '';
    } catch (error) {
      this.error = 'Cannot fetch data from Wikipedia server, Please try again later...';
    }
  }
}

const searchStore = new SearchStore();
export default searchStore;
