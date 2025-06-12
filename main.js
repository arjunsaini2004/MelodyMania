const form = document.getElementById('form');
const search = document.getElementById('search');
const result = document.getElementById('result');


const apiURL = 'https://api.lyrics.ovh';


form.addEventListener('submit', e => {
    e.preventDefault();
    const searchValue = search.value.trim();

    if (!searchValue) {
        alert("There is nothing to search");
    } else {
        searchSong(searchValue);
    }
});

async function searchSong(searchValue) {
    try {
        const searchResult = await fetch(`${apiURL}/suggest/${searchValue}`);
        
        const data = await searchResult.json();
        showData(data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function showData(data) {
    result.innerHTML = `
    <div class="heading">
        <h1>Top Searches</h1>
    </div>
    <ul class="song-list">
      ${data.data.map(song => `
        <li>
          <div>
            <img src="${song.artist.picture}" alt="Artist image">
            <strong>${song.artist.name} - ${song.title}</strong>
          
          <button data-artist="${song.artist.name}" data-songtitle="${song.title}">Get lyrics</button>

          
          </div>
        </li>`).join('')}
    </ul>`;
}

result.addEventListener('click', e => {
    const clickedElement = e.target;

    if (clickedElement.tagName === 'BUTTON') {
        const artist = clickedElement.getAttribute('data-artist');
        const songTitle = clickedElement.getAttribute('data-songtitle');
        getLyrics(artist, songTitle);
    }
});

async function getLyrics(artist, songTitle) {
    try {
        
        const res = await fetch(`${apiURL}/v1/${artist}/${songTitle}`);
        const data = await res.json();
        const lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g, '<br>');
        openNewTab(artist, songTitle, lyrics);
    } catch (error) {
        console.error('Error fetching lyrics:', error);
    }
}

function openNewTab(artist, songTitle, lyrics) {
    const newWindow = window.open('', '_blank');
    newWindow.document.write(`
        <html>
        <head>
            <title>${artist} - ${songTitle}</title>
            <style>
                /* Add your styles here */
                body {
                    font-family: Arial, sans-serif;
                    padding: 20px;
                    font-size: 20px;
                    // height: 100vh;
                    background-size: cover;
                    background-color:rgb(14, 13, 13);
                    color:#a29595;
                    
                
                }
                h2 {
                    margin-bottom: 10px;
                    font-size: 20px;
                    text-align: center;
                }
                p {
                    white-space: pre-line;
                    font-weight: bold;
                    text-align: center;
                }
            </style>
        </head>
        <body>
            <h2>${artist} - ${songTitle}</h2>
            <p>${lyrics}</p>
        </body>
        </html>
    `);
    newWindow.document.close();
}
