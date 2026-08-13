/* =====================================================
                    MOVIE DATA
===================================================== */


/*
    IMPORTANT:

    image = movie poster

    video = YOUR VIDEO URL

    For now video is empty.

    Later paste your authorized direct video URL
    into the "video" field.
*/


const movies = [

    {

        id: 1,

        title: "Rangasthalam",

        image:
        "https://sund-images.sunnxt.com/110392/500x750_Rangasthala_110392_5048a73d-49d7-4ee8-911a-b4ccaaa12f9c.jpg",

        video: "",

        description:
        "Rangasthalam is a Telugu period drama set in a rural village."

    },


    {

        id: 2,

        title: "Baahubali",

        image:
        "https://upload.wikimedia.org/wikipedia/en/thumb/b/b6/Baahubali_%E2%80%93_The_Epic.jpg/250px-Baahubali_%E2%80%93_The_Epic.jpg?utm_source=en.wikipedia.org&utm_campaign=parser&utm_content=thumbnail",

        video: "",

        description:
        "Baahubali is an epic Indian action drama."

    },


    {

        id: 3,

        title: "Sita Ramam",

        image:
        "https://m.media-amazon.com/images/M/MV5BYWE0NDNiNzEtNThmMi00NjZlLTk3NDAtYzIzOWNmNWQyYTI3XkEyXkFqcGc@._V1_.jpg",

        video: "",

        description:
        "Sita Ramam is a romantic drama."

    }

];



/* =====================================================
                    VARIABLES
===================================================== */

let myList =
    JSON.parse(
        localStorage.getItem(
            "myNetflixList"
        )
    ) || [];


let selectedMovie = null;



/* =====================================================
                    HTML ELEMENTS
===================================================== */

const movieContainer =
    document.getElementById(
        "movieContainer"
    );


const myListContainer =
    document.getElementById(
        "myListContainer"
    );


const emptyList =
    document.getElementById(
        "emptyList"
    );


const videoModal =
    document.getElementById(
        "videoModal"
    );


const videoPlayer =
    document.getElementById(
        "videoPlayer"
    );


const videoTitle =
    document.getElementById(
        "videoTitle"
    );


const videoError =
    document.getElementById(
        "videoError"
    );


const infoModal =
    document.getElementById(
        "infoModal"
    );


const infoTitle =
    document.getElementById(
        "infoTitle"
    );


const infoDescription =
    document.getElementById(
        "infoDescription"
    );



/* =====================================================
                DISPLAY MOVIES
===================================================== */

function displayMovies() {

    movieContainer.innerHTML = "";


    movies.forEach(
        function(movie) {

            const card =
                createMovieCard(movie);


            movieContainer.appendChild(
                card
            );

        }
    );

}



/* =====================================================
                CREATE MOVIE CARD
===================================================== */

function createMovieCard(movie) {

    const card =
        document.createElement(
            "div"
        );


    card.className =
        "movie-card";


    card.dataset.title =
        movie.title.toLowerCase();


    card.innerHTML = `

        <img
            src="${movie.image}"
            alt="${movie.title}"
            onerror="
                this.src =
                'https://via.placeholder.com/300x450?text=No+Poster'
            "
        >


        <div class="movie-overlay">

            <h3>
                ${movie.title}
            </h3>


            <div class="card-buttons">


                <button
                    onclick="
                        playMovieById(
                            ${movie.id}
                        )
                    "
                    title="Play"
                >
                    ▶
                </button>


                <button
                    onclick="
                        addToMyList(
                            ${movie.id}
                        )
                    "
                    title="Add to My List"
                >
                    +
                </button>


                <button
                    onclick="
                        showInfo(
                            ${movie.id}
                        )
                    "
                    title="More Information"
                >
                    ⓘ
                </button>


            </div>

        </div>

    `;


    return card;

}



/* =====================================================
                PLAY MOVIE BY ID
===================================================== */

function playMovieById(id) {

    const movie =
        movies.find(
            function(item) {

                return item.id === id;

            }
        );


    if (!movie) {

        return;

    }


    if (
        !movie.video ||
        movie.video.trim() === ""
    ) {

        alert(
            "Video URL has not been added yet for " +
            movie.title +
            ".\n\n" +
            "Open script.js and paste the video URL in the video's field."
        );

        return;

    }


    playMovie(
        movie.video,
        movie.title
    );

}



/* =====================================================
                    PLAY VIDEO
===================================================== */

function playMovie(
    videoURL,
    title
) {

    if (!videoURL) {

        alert(
            "Please add a video URL first."
        );

        return;

    }


    videoTitle.textContent =
        title;


    videoError.style.display =
        "none";


    videoModal.classList.add(
        "active"
    );


    videoPlayer.pause();


    videoPlayer.src =
        videoURL;


    videoPlayer.load();


    const playPromise =
        videoPlayer.play();


    if (
        playPromise !== undefined
    ) {

        playPromise.catch(
            function(error) {

                console.log(
                    "Autoplay blocked:",
                    error
                );

            }
        );

    }

}



/* =====================================================
                    VIDEO ERROR
===================================================== */

videoPlayer.addEventListener(
    "error",
    function() {

        videoError.style.display =
            "block";

    }
);



/* =====================================================
                    CLOSE VIDEO
===================================================== */

function closeVideo() {

    videoPlayer.pause();


    videoPlayer.removeAttribute(
        "src"
    );


    videoPlayer.load();


    videoModal.classList.remove(
        "active"
    );

}



/* =====================================================
                    MOVIE INFORMATION
===================================================== */

function showInfo(id) {

    selectedMovie =
        movies.find(
            function(movie) {

                return movie.id === id;

            }
        );


    if (!selectedMovie) {

        return;

    }


    infoTitle.textContent =
        selectedMovie.title;


    infoDescription.textContent =
        selectedMovie.description;


    infoModal.classList.add(
        "active"
    );

}



/* =====================================================
                PLAY FROM INFO
===================================================== */

function playSelectedMovie() {

    if (!selectedMovie) {

        return;

    }


    closeInfo();


    playMovieById(
        selectedMovie.id
    );

}



/* =====================================================
                    CLOSE INFO
===================================================== */

function closeInfo() {

    infoModal.classList.remove(
        "active"
    );

}



/* =====================================================
                    MY LIST
===================================================== */

function addToMyList(id) {

    const movie =
        movies.find(
            function(item) {

                return item.id === id;

            }
        );


    if (!movie) {

        return;

    }


    const exists =
        myList.some(
            function(item) {

                return item.id === id;

            }
        );


    if (exists) {

        alert(
            movie.title +
            " is already in My List."
        );

        return;

    }


    myList.push(movie);


    saveMyList();


    displayMyList();


    alert(
        movie.title +
        " added to My List."
    );

}



/* =====================================================
                    DISPLAY MY LIST
===================================================== */

function displayMyList() {

    myListContainer.innerHTML = "";


    if (
        myList.length === 0
    ) {

        emptyList.style.display =
            "block";

        return;

    }


    emptyList.style.display =
        "none";


    myList.forEach(
        function(movie) {

            myListContainer.appendChild(
                createMovieCard(movie)
            );

        }
    );

}



/* =====================================================
                    SAVE MY LIST
===================================================== */

function saveMyList() {

    localStorage.setItem(
        "myNetflixList",
        JSON.stringify(
            myList
        )
    );

}



/* =====================================================
                    SEARCH
===================================================== */

const searchInput =
    document.getElementById(
        "searchInput"
    );


searchInput.addEventListener(
    "input",
    function() {

        const search =
            searchInput.value
                .toLowerCase()
                .trim();


        const cards =
            document.querySelectorAll(
                ".movie-card"
            );


        cards.forEach(
            function(card) {

                const title =
                    card.dataset.title;


                if (
                    title.includes(search)
                ) {

                    card.style.display =
                        "";

                } else {

                    card.style.display =
                        "none";

                }

            }
        );

    }
);



/* =====================================================
                    PROFILE
===================================================== */

function toggleProfile() {

    const menu =
        document.getElementById(
            "profileMenu"
        );


    menu.classList.toggle(
        "active"
    );

}



function logout() {

    alert(
        "You have been signed out."
    );

}



/* =====================================================
                ADD CUSTOM MOVIE
===================================================== */

function addMovie() {

    const title =
        document.getElementById(
            "customTitle"
        ).value.trim();


    const video =
        document.getElementById(
            "customVideo"
        ).value.trim();


    const image =
        document.getElementById(
            "customImage"
        ).value.trim();


    if (!title) {

        alert(
            "Enter the movie title."
        );

        return;

    }


    if (!video) {

        alert(
            "Paste the video URL."
        );

        return;

    }


    const newMovie = {

        id:
            Date.now(),

        title:
            title,

        image:
            image ||
            "https://via.placeholder.com/300x450?text=Movie",

        video:
            video,

        description:
            "Custom movie added by you."

    };


    movies.push(
        newMovie
    );


    displayMovies();


    document.getElementById(
        "customTitle"
    ).value = "";


    document.getElementById(
        "customVideo"
    ).value = "";


    document.getElementById(
        "customImage"
    ).value = "";


    alert(
        title +
        " added successfully."
    );

}



/* =====================================================
                CLICK OUTSIDE VIDEO
===================================================== */

videoModal.addEventListener(
    "click",
    function(event) {

        if (
            event.target ===
            videoModal
        ) {

            closeVideo();

        }

    }
);



/* =====================================================
                CLICK OUTSIDE INFO
===================================================== */

infoModal.addEventListener(
    "click",
    function(event) {

        if (
            event.target ===
            infoModal
        ) {

            closeInfo();

        }

    }
);



/* =====================================================
                    ESCAPE KEY
===================================================== */

document.addEventListener(
    "keydown",
    function(event) {

        if (
            event.key === "Escape"
        ) {

            closeVideo();

            closeInfo();

            document
                .getElementById(
                    "profileMenu"
                )
                .classList.remove(
                    "active"
                );

        }

    }
);



/* =====================================================
                    INITIALIZE
===================================================== */

displayMovies();

displayMyList();