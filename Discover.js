import React, { Component } from "react";
import DiscoverBlock from "./DiscoverBlock/components/DiscoverBlock";
import "../styles/_discover.scss";

export default class Discover extends Component {
  constructor() {
    super();

    this.state = {
      newReleases: [],
      playlists: [],
      categories: [],
    };
  }

  render() {
    const { newReleases, playlists, categories } = this.state;
    const [playlists, setplaylist] = useState({
      selectedPlaylist: "",
      listOfPlaylistFromAPI: [],
    });
    const [categories, setcategories] = useState({
      selectedGenre: "",
      listOfGenresFromAPI: [],
    });
    const [ newReleases,setnewRelease]= useState({
      selectedGenre: "",
      listOfGenresFromAPI: [],
    });
    axios('https://accounts.spotify.com/api/token', {
      headers: {
        'Content-Type' : 'application/x-www-form-urlencoded',
        'Authorization' : 'Basic ' + btoa(spotify.ClientId + ':' + spotify.ClientSecret)      
      },
      data: 'grant_type=client_credentials',
      method: 'POST'
    })
    .then(tokenResponse => {      
      setToken(tokenResponse.data.access_token);

      axios('https://api.spotify.com/v1/browse/categories?locale=sv_US', {
        method: 'GET',
        headers: { 'Authorization' : 'Bearer ' + tokenResponse.data.access_token}
      })
      .then (genreResponse => {        
        setcategories({
          selectedGenre: genres.selectedGenre,
          listOfGenresFromAPI: genreResponse.data.categories.items
        })
      });
      
    });

  }, [genres.selectedGenre, spotify.ClientId, spotify.ClientSecret]); 

  const categoriesChanged = val => {
    setGenres({
      selectedGenre: val, 
      listOfGenresFromAPI: genres.listOfGenresFromAPI
    });
    return (
      <div className="discover">
        <DiscoverBlock
          text="RELEASED THIS WEEK"
          id="released"
          data={newReleases}
        />
        <DiscoverBlock
          text="FEATURED PLAYLISTS"
          id="featured"
          data={playlists}
        />
        <DiscoverBlock
          text="BROWSE"
          id="browse"
          data={categories}
          imagesKey="icons"
        />
      </div>
    );
  }
}
axios(`https://api.spotify.com/v1/browse/categories/${val}/playlists?limit=10`, {
  method: 'GET',
  headers: { 'Authorization' : 'Bearer ' + token}
})
.then(playlistResponse => {
  setPlaylist({
    selectedPlaylist: playlist.selectedPlaylist,
    listOfPlaylistFromAPI: playlistResponse.data.playlists.items
  })
});

console.log(val);
}

const playlistChanged = val => {
console.log(val);
setPlaylist({
  selectedPlaylist: val,
  listOfPlaylistFromAPI: playlist.listOfPlaylistFromAPI
});
}

const buttonClicked = e => {
e.preventDefault();

axios(`https://api.spotify.com/v1/playlists/${playlist.selectedPlaylist}/tracks?limit=10`, {
  method: 'GET',
  headers: {
    'Authorization' : 'Bearer ' + token
  }
})
.then(tracksResponse => {
  setTracks({
    selectedTrack: tracks.selectedTrack,
    listOfTracksFromAPI: tracksResponse.data.items
  })
});
}

const listboxClicked = val => {

const currentTracks = [...tracks.listOfTracksFromAPI];

const trackInfo = currentTracks.filter(t => t.track.id === val);

setTrackDetail(trackInfo[0].track);



}


