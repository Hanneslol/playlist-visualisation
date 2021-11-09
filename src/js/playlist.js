const { doc } = require("prettier");

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

function renderPlaylist(playlist_id) {
  /*
  <div class="playlist-item">
    <img class="playlist-item-img" src="IMG_URL" />
    <div class="playlist-item-title">SONG_TITLE</div>
  </div>
 
  */

  const container = document.getElementById('tracks');
  const audioPlayer = document.getElementById('player')
  getPlaylist(playlist_id).then((playlist) => {
    const tracks = playlist.tracks.items;
    for (let i = 0; i < tracks.length; i++) {
      const track = tracks[i].track;

      const playlistItem = document.createElement('div');
      playlistItem.classList.add('playlist-item')

      const playlistItemImg = document.createElement('img');
      playlistItemImg.classList.add('playlist-item-img')
      playlistItemImg.setAttribute('src', track.album.images[0].url);

      const playlistItemTitle = document.createElement('div')
      playlistItemTitle.classList.add('playlist-item-title');
      playlistItemTitle.innerHTML = track.name;

      playlistItem.addEventListener('click', () => {
        if (currentlyActive === track.id) {
          audioPlayer.pause();
          currentlyActive = null;
          playlistItem.classList.remove('active')
        } else {
          if (currentlyActive) {
            document.querySelector('.active').classList.remove('active');
          }
          currentlyActive = track.id;
          playlistItem.classList.add('active');


          //Play preview if available

          if (track.preview_url) {
            audioPlayer.setAttribute('src', track.preview_url);
            audioPlayer.play();
          }
          else {
            audioPlayer.pause()
          }
        }
      })

      playlistItem.appendChild(playlistItemImg)
      playlistItem.appendChild(playlistItemTitle)
      container.appendChild(playlistItem)
    }


  })
}

let currentlyActive;
renderPlaylist('4fnGbuyTNDy1EekNV3hhfH');
