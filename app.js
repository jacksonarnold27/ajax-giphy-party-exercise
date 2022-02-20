// GIPHY has a few parameters: api_key, q, limit



console.log("Let's get this party started!");
const GIPHY_URL = 'http://api.giphy.com/v1/gifs/search';
const GIPHY_API_KEY = 'j6phnrHBNH4V9ouzNwviN18WKXdR98pd'
const $GIPHY_AREA = $('#giphy-container');


// giphySearch captures the text in the search box and uses the GIPHY API to search for a GIF using the input as a query. It also returns a response.data object
async function giphySearch() {
  try {
    let query = $('input').val();
    let response = await axios.get(GIPHY_URL, {
      params: { api_key: GIPHY_API_KEY, q: query }
    });
    console.log(response);
    return response.data;
  } catch (error) {
    console.log('error in giphySearch(): ' + error);
  }
}

// appendGIF takes a 'response' param from giphySearch() and takes the URL of the gif and adds it to the page.
async function appendGIF(response) {
  let gif_url = await response.data.images.original.url;
  $GIPHY_AREA.append(`<img src="${gif_url}">`);
}


$(function () {
  $(document).on('submit', '#search-form', (e) => {
    e.preventDefault();
    appendGIF(giphySearch());
    $('#search-input').val('');
  })
})