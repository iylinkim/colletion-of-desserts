const API_KEY = "N5DjYXwpcXhWBE_4sZjSCXuGrlc2K_fGuCUec-GPo6M";

class Dessert {
  async getRandom(query) {
    const response = await fetch(
      `https://api.unsplash.com/photos/random?query=${query}&count=30&client_id=${API_KEY}`
    );
    return response.json();
  }

  async search(query) {
    const response = await fetch(
      `https://api.unsplash.com/search/photos?query=${query}&per_page=100&client_id=${API_KEY}`
    );
    return response.json();
  }
}

export default Dessert;
