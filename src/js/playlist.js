/*

  Follow the instructions for "Calling the Spotify playlist API" and
  "Rendering a playlist visualisation" in the README 

*/
function getAccessToken() {
  const hash = window.location.hash;
  const hashwithouthash = hash.substring(1);
  const params = hashwithouthash.split('&');
  const keyValues = params.map((param) => param.split('='));
  const accessToken = keyValues[0][1];
  return accessToken;

  console.log(keyValues);
}

function getPlaylist(playlist_id) {
  const url = `https://api.spotify.com/v1/playlists/${playlist_id}`;
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'applitcations.json',
    Authorization: `Bearer ${getAccessToken()}`,
  }

  return fetch(url, { headers }).then((response) => response.json());

}
getPlaylist('4fnGbuyTNDy1EekNV3hhfH').then((response) => console.log(response));
