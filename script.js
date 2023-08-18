const menu = document.getElementById('menu');
const menu_container = document.getElementById('menu-container');
const toggle = document.getElementById('toggle');
const body = document.querySelector('body');
const trending = document.getElementById('trending-genre');
const comedy = document.getElementById('comedy-genre');
const kid = document.getElementById('kid-genre');
const drama = document.getElementById('drama-genre');
const action = document.getElementById('action-genre');
const war = document.getElementById('war-genre');
const movies = document.querySelectorAll('.movie-genre');

const left_arrows = document.querySelectorAll('.left-arrow')
const right_arrows = document.querySelectorAll('.right-arrow');


let screenWidth = window.innerWidth;
// let clickCounter = JSON.parse(localStorage.getItem('clickCounter'))||[0,0,0,0,0,0];

let clickCounter= [
    [0,screenWidth],
    [0,screenWidth],
    [0,screenWidth],
    [0,screenWidth],
    [0,screenWidth],
    [0,screenWidth]
]

function calculateScreenMoves() {

    let imagesPerScreen = Math.floor(window.innerWidth/(200 + 5));
    let diff = 20 - imagesPerScreen;

    return Math.round(diff/imagesPerScreen);
    


}

//! for localStorage of pics, title, description

const pic = localStorage.getItem('movie-pic') || 'Movie Pic'
const title = localStorage.getItem('movie-title') || 'Movie Title'
const description = localStorage.getItem('movie-description') || 'Movie Description'


menu.addEventListener('click', () => {

    menu_container.classList.toggle('hidden');
})

toggle.addEventListener('click', () => {
    toggle.classList.toggle('bi-toggle-on');
    body.classList.toggle('alternate-background-color')

})

async function fetchJokes(discover, dom) {
    try {
        const base_url = 'https://api.themoviedb.org/3';
        const api_key = 'api_key=b5483405824c21b14bba6ad7aa1d0513';
        const api_url = base_url + discover + api_key;
        const response = await fetch(api_url)
        const data = await response.json()
        const movies = data.results;

        // console.log(data)

        dom.innerHTML = movies.map(x => {

            return `
                    
                    <a href="movie-details.html" >

                        <img src= 'https://image.tmdb.org/t/p/original/${x.poster_path}' alt="" width=200px height=200px id=${x.id} class=${discover}>
                        
                        
                        <h6 class="poster-title">${x.title}</h6>
                    
                        

                    </a>
                    
                
            
            `
        }).join("")


    }

    catch (err) {
        console.log('fetched failed', err)
    }
}

fetchJokes('/discover/movie?sort_by=popularity.desc&', trending)
fetchJokes('/discover/movie?with_genres=35&', comedy)
fetchJokes('/discover/movie?with_genres=16&', kid)
fetchJokes('/discover/movie?with_genres=18&', drama)
fetchJokes('/discover/movie?with_genres=28&', action)
fetchJokes('/discover/movie?with_genres=10752&', war)


movies.forEach(img => {
    img.addEventListener('mouseover', (e) => {

        let movie_id = parseInt(e.target.tagName === 'IMG' ? e.target.id : e.target.lastElementChild.firstElementChild.id);
        let movie_discover_path = e.target.tagName === 'IMG' ? e.target.className : e.target.lastElementChild.firstElementChild.className;






        fetch('https://api.themoviedb.org/3' + movie_discover_path + 'api_key=b5483405824c21b14bba6ad7aa1d0513')
            .then(response => response.json())
            .then((data) => {
                let movies = data.results
                let findIndex = movies.findIndex(x => x.id === movie_id)



                localStorage.setItem('movie-pic', `https://image.tmdb.org/t/p/original/${movies[findIndex].poster_path}`)
                localStorage.setItem('movie-title', `${movies[findIndex].title}`)
                localStorage.setItem('movie-description', `${movies[findIndex].overview}`)
                console.log(movies)

            })
            .catch((err) => console.log(err))



    })

})



right_arrows.forEach((a, i) => {

    // let clickCounter = 0;
        
        

    a.addEventListener('click', () => {

        //  clickCounter++;

            clickCounter[i][0]++
        // localStorage.setItem('clickCounter', JSON.stringify(clickCounter));
        

        // if (clickCounter <= 13) {

        //     movies[i].style.transform = `translateX(${movies[i].computedStyleMap().get("transform")[0].x.value - 205}px)`


        // } else {

        //     a[i].disabled = false;

        // }
        // console.log(clickCounter)

      
        
        if(clickCounter[i][0] <= calculateScreenMoves()) {

        movies[i].style.transform = `translateX(-${clickCounter[i][1]}px)`;

        clickCounter[i][1]+=screenWidth


        } else {
            // clickCounter[i][0] = 0;
            a[i].disabled = false;
        }
    
        
        

    })
})


left_arrows.forEach((a, i) => {
    a.addEventListener('click', () => {

            let x = movies[i].style.transform;
            let regex = /[0-9]/g
            let getCurrentX = x.match(regex).join("");


            if(getCurrentX != 0) {
                // movies[i].style.transform = `translateX(${movies[i].computedStyleMap().get("transform")[0].x.value + 205}px)`
                movies[i].style.transform = `translateX(${movies[i].computedStyleMap().get("transform")[0].x.value + screenWidth}px)`
            } else {    
                a[i].disabled = false;
            }
          
            console.log(window.innerWidth)
    })

})
