document.addEventListener('DOMContentLoaded', () => {
    const artistCards = document.querySelectorAll('.artist-card');
    const songContainer = document.getElementById('song-container');
    const artistPhoto = document.getElementById('artist-photo');
    const artistName = document.getElementById('artist-name');
    const songList = document.getElementById('songs');
    const songName = document.getElementById('song-name');
    const backButton = document.getElementById('back-button');
    const PlayButton = document.getElementById('fa-circle-play');
    const PauseButton = document.getElementById('fa-circle-pause');
    const NextSong = document.getElementById('fa-forward');
    const PrevSong = document.getElementById('fa-backward');
    const myProgressBar = document.getElementById('ProgressBar');
    let songIndex = -1;

    let quotes = [
        'You must be the change you wish to see in the world.',
        'Spread love everywhere you go.',
        'The only thing we have to fear is fear itself.',
        'Darkness cannot drive out darkness: only light can do that.',
        'Do one thing every day that scares you.'
    ];

    const val = Math.floor(Math.random() * 5);
    document.getElementById('Heading').innerHTML = quotes[val];

    const artistSongs = {
        Arijit: [
            "Tum Hi Ho", "Channa Mereya", "Ae Dil Hai Mushkil", "Gerua", "Kabira"
        ],
        Sonu: [
            "Kal Ho Naa Ho", "Abhi Mujh Mein Kahin", "Papa Meri Jaan", "Main Agar Kahoon", "Sandese Aate Hai"
        ],
        AR: [
            "Jai Ho", "Ye Haseen Vadiyan", "Vande Mataram", "Khwaja Mere Khwaja", "Kun Faaya Kun"
        ],
        jubin: [
            "Mere Ghar Ram Aaye Hain", "Tum Hi Aana", "Humnava Mere", "Kaabil Hoon", "Dil Ka Dariya"
        ],
        KK: [
            "Tujhe Sochta Hoon", "Zara Sa", "Tu Hi Meri Shab Hai", "Aankhon Mein Teri", "Labon Ko"
        ],
        Shreya: [
            "Teri Ore", "Agar Tum Mil Jao", "Sun Raha Hai Na Tu", "Manwa Laage", "Saans"
        ],
        Sunidhi: [
            "Ishq Sufiyana", "Kamli", "Crazy Kiya Re", "Dhoom Machale", "Desi Girl"
        ],
        Lata: [
            "Lag Ja Gale", "Aayega Aanewala", "Ajeeb Dastan Hai Yeh", "Pyar Kiya To Darna Kya", "Tere Bina Jiya Jaye Na"
        ],
        Neha: [
            "Dilbar", "Yaad Piya Ki Aane Lagi", "O Saki Saki", "Mile Ho Tum", "Aankh Marey"
        ],
        Shilpa: [
            "Khuda Jaane", "Ghungroo", "Kalank", "Bulleya", "Tose Naina"
        ]
    };

    artistCards.forEach(card => {
        card.addEventListener('click', () => {
            const artist = card.dataset.artist;
            const song = artistSongs[artist];
            document.querySelector('.container').style.display = 'none';
            document.querySelector('.main-bottom').style.display = 'none';
            document.querySelector('.bottom-nav').style.display = 'block';
            songContainer.style.display = 'flex';
            artistPhoto.src = card.querySelector('img').src;
            artistName.textContent = card.querySelector('h3').textContent;
            songList.innerHTML = song.map(song => `
                <div>
                <div id="song-naam" class="song-naam">
                    <div id="naam" class="naam" style="font-weight: bolder">${song}</div>
                </div>
                <audio class="song-audio" src="audio-track/${song}.mp3" preload="auto"></audio>
                </div>`
            ).join('');
        });
    });

    let currentSong = null;

    backButton.addEventListener('click', () => {
        document.querySelector('.container').style.display = 'block';
        document.querySelector('.main-bottom').style.display = 'flex';
        document.querySelector('.bottom-nav').style.display = 'none';
        songContainer.style.display = 'none';
        const currentSongs = document.querySelectorAll('.song-audio');
        currentSongs.forEach(audio => {
            audio.pause();
            audio.currentTime = 0;
        });
        songName.textContent = "Song-name";
        currentSong = null;
        PauseButton.style.display = 'none';
        PlayButton.style.display = 'block';
    });

    songList.addEventListener('click', (event) => {
        const songbar = event.target.closest('.song-naam');

        if (!songbar) return;
        const otherbar = document.querySelectorAll('.song-naam');
        let i = 0;
        otherbar.forEach(a => {
            if (a !== songbar) {
                a.style.backgroundColor = "white";
            } else {
                songIndex = i;
            }
            i++;
        });
        songbar.style.backgroundColor = "cyan";
        let audio = songbar.nextElementSibling;
        currentSong = audio;
        const otherAudios = document.querySelectorAll('.song-audio');
        otherAudios.forEach(a => {
            if (a !== audio) {
                a.pause();
            }
        });
        if (audio.paused) {
            songName.textContent = songbar.textContent;
            audio.play().then(() => {
                PlayButton.style.display = 'none';
                PauseButton.style.display = 'block';
            }).catch(error => {
                console.error("Error playing the audio:", error);
            });
        } else {
            audio.pause();
            PlayButton.style.display = 'block';
            PauseButton.style.display = 'none';
        }
        addProgressBarListeners(currentSong);
    });

    PlayButton.addEventListener('click', () => {
        if (songName.textContent == 'Song-name' || currentSong == null) {
            alert('Select a Song');
            return;
        }
        currentSong.play().then(() => {
            PlayButton.style.display = 'none';
            PauseButton.style.display = 'block';
            addProgressBarListeners(currentSong);
        }).catch(error => {
            console.error("Error playing the audio:", error);
        });
    });

    PauseButton.addEventListener('click', () => {
        if (songName.textContent == 'Song-name' || currentSong == null) {
            alert('Play a Song first');
            return;
        }
        currentSong.pause();
        PauseButton.style.display = 'none';
        PlayButton.style.display = 'block';
    });

    NextSong.addEventListener('click', () => {
        const currentSongs = document.querySelectorAll('.song-audio');
        if (songIndex === -1) return;
        if (currentSong) {
            currentSong.pause();
        }
        songIndex = (songIndex + 1) % currentSongs.length;
        currentSong = currentSongs[songIndex];

        if (currentSong) {
            currentSong.currentTime = 0;
            currentSong.play().then(() => {
                songName.textContent = currentSong.previousElementSibling.textContent;
                PlayButton.style.display = 'none';
                PauseButton.style.display = 'block';
                const songBars = document.querySelectorAll('.song-naam');
                songBars.forEach((bar, index) => {
                    if (index === songIndex) {
                        bar.style.backgroundColor = 'cyan';
                    } else {
                        bar.style.backgroundColor = 'white';
                    }
                });
                addProgressBarListeners(currentSong);
            }).catch(error => {
                console.error("Error playing the audio:", error);
            });
        }
    });

    PrevSong.addEventListener('click', () => {
        const currentSongs = document.querySelectorAll('.song-audio');
        if (songIndex === -1) return;
        if (currentSong) {
            currentSong.pause();
        }
        songIndex = (songIndex - 1 + currentSongs.length) % currentSongs.length;
        currentSong = currentSongs[songIndex];

        if (currentSong) {
            currentSong.currentTime = 0;
            currentSong.play().then(() => {
                songName.textContent = currentSong.previousElementSibling.textContent;
                PlayButton.style.display = 'none';
                PauseButton.style.display = 'block';
                const songBars = document.querySelectorAll('.song-naam');
                songBars.forEach((bar, index) => {
                    if (index === songIndex) {
                        bar.style.backgroundColor = 'cyan';
                    } else {
                        bar.style.backgroundColor = 'white';
                    }
                });
                addProgressBarListeners(currentSong);
            }).catch(error => {
                console.error("Error playing the audio:", error);
            });
        }
    });

    function addProgressBarListeners(audio) {
        audio.addEventListener('timeupdate', () => {
            const progress = parseInt((audio.currentTime / audio.duration) * 100);
            myProgressBar.value = progress;
        });

        myProgressBar.addEventListener('change', () => {
            audio.currentTime = parseInt((myProgressBar.value) * audio.duration / 100);
        });
    }
});
