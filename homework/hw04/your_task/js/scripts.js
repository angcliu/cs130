const baseURL = 'https://www.apitutor.org/spotify/simple/v1/search';

// Note: AudioPlayer is defined in audio-player.js
const audioFile = 'https://p.scdn.co/mp3-preview/bfead324ff26bdd67bb793114f7ad3a7b328a48e?cid=9697a3a271d24deea38f8b7fbfa0e13c';
const audioPlayer = AudioPlayer('.player', audioFile);

const search = (ev) => {
    const term = document.querySelector('#search').value;
    console.log('search for:', term);
    // issue three Spotify queries at once...
    getTracks(term);
    getAlbums(term);
    getArtist(term);
    if (ev) {
        ev.preventDefault();
    }
}

const getTracks = (term) => {
        fetch('https://www.apitutor.org/spotify/simple/v1/search?type=track&q=' + term).then(response => response.json())
        .then(data => {
            if (data.length == 0){
                document.querySelector('#tracks').innerHTML = `
                <button class="track-item preview" aria-label="No tracks found that match your search criteria - please try again!">
                        <div class="label">
                            <p>
                            No tracks found that match your search criteria - please try again!
                            </p>
                        </div>
                    </button>
                `;
            }
            if (data.length < 5){
                for (var i=0; i<data.length; i++){
                    document.querySelector('#tracks').innerHTML += `
                    <button aria-label="Preview ${data[i].name}" class="track-item preview" data-preview-track="${data[i].preview_url}" onclick="handleTrackClick('${data[i].preview_url}', '${data[i].album.image_url}', '${data[i].name}', '${data[i].artist.name}')">
                            <img alt="Track art for ${data[i].name}" src="${data[i].album.image_url}">
                            <i class="fas play-track fa-play" aria-hidden="true"></i>
                            <div class="label">
                                <h2>${data[i].name}</h2>
                                <p>
                                ${data[i].artist.name}
                                </p>
                            </div>
                        </button>
                    `;
                }
            }
            else{
                for (var i=0; i<5; i++){
                    document.querySelector('#tracks').innerHTML += `
                    <button aria-label="Preview ${data[i].name}" class="track-item preview" data-preview-track="${data[i].preview_url}" onclick="handleTrackClick('${data[i].preview_url}', '${data[i]['album'].image_url}', '${data[i].name}', '${data[i].artist.name}')">
                            <img alt="Track art for ${data[i].name}" src="${data[i].album.image_url}">
                            <i class="fas play-track fa-play" aria-hidden="true"></i>
                            <div class="label">
                                <h2>${data[i].name}</h2>
                                <p>
                                ${data[i].artist.name}
                                </p>
                            </div>
                        </button>

                    `;
                }
        }
    });
};

const getAlbums = (term) => {
        fetch('https://www.apitutor.org/spotify/simple/v1/search?type=album&q=' + term).then(response => response.json())
        .then(data => {
            if (data.length == 0){
                document.querySelector('#albums').innerHTML = `
                <section class="album-card">
                <div>
                    <h2>No albums were returned by the API - please try again!</h2>
                </div>
            </section>`;
            }
            else{
            for (var i=0; i < data.length; i++){
            document.querySelector('#albums').innerHTML += `
            <section class="album-card" id="${data[i].id}">
                        <div>
                            <img alt='Album cover art for ${data[i].name}'src="${data[i].image_url}">
                            <h2>${data[i].name}</h2>
                            <div class="footer">
                                <a href="${data[i].spotify_url}" target="_blank">
                                    view on spotify
                                </a>
                            </div>
                        </div>
                    </section>
                    `
            }
        }        
    });
};

const getArtist = (term) => {
    fetch('https://www.apitutor.org/spotify/simple/v1/search?type=artist&q=' + term).then(response => response.json())
    .then(data => {
        if (data.length == 0){
            document.querySelector('#artist').innerHTML = `
        <section id="artist-section">
                    <h1>Top Result</h1>
                    <section id="artist">
                        <section class="artist-card">
                            <div>
                                <h2>No artists found - please try again!</h2>
                            </div>
                        </section>
                    </section>
                </section>`;
        }
        else{
        document.querySelector('#artist').innerHTML = `
        <section id="artist-section">
                    <h1>Top Result</h1>
                    <section id="artist">
                        <section class="artist-card" id="${data[0].id}">
                            <div>
                                <img alt='Artist art for ${data[0].name}'src="${data[0].image_url}">
                                <h2>${data[0].name}</h2>
                                <div class="footer">
                                    <a href="${data[0].spotify_url}" target="_blank">
                                        view on spotify
                                    </a>
                                </div>
                            </div>
                        </section>
                    </section>
                </section>`;
        }
        
        
        
    });

    
};

function handleTrackClick(previewUrl, imageUrl, trackName, albumName){
    document.querySelector('#current-track').setAttribute('data-preview-track', previewUrl)
    document.querySelector('#current-track').innerHTML = `
    <img alt='Image for ${trackName}' src="${imageUrl}">
                <i class="fas play-track fa-pause" aria-hidden="true"></i>
                <div class="label">
                    <h2>${trackName}</h2>
                    <p>
                        ${albumName}
                    </p>
                </div>`;
    audioPlayer.setAudioFile(preview);
    audioPlayer.play();
}

document.querySelector('#search').onkeyup = (ev) => {
    // Number 13 is the "Enter" key on the keyboard
    console.log(ev.keyCode);
    if (ev.keyCode === 13) {
        ev.preventDefault();
        search();
    }
};