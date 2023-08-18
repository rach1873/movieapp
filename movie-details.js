const pic = localStorage.getItem('movie-pic')||'No Image'
const title = localStorage.getItem('movie-title')||'No Title'
const description = localStorage.getItem('movie-description')||'No Description'

const movie_pic = document.getElementById('movie-pic');
const movie_title = document.getElementById('movie-title');
const movie_description = document.getElementById('movie-description');

const stars = document.getElementById('stars');
const sun = document.getElementById('sun');
const tree = document.getElementById('tree');
const water = document.getElementById('water');
const snow = document.getElementById('snow');

const grid = document.getElementById('gridcontainer');
const gridbox = document.getElementById('gridbox');
const body = document.querySelector('body');



const nature = [stars, sun, tree, water, snow];





movie_pic.setAttribute('src', pic);
movie_title.textContent = title;
movie_description.textContent = description;


gridbox.addEventListener('click', ()=> {
    grid.classList.toggle('visible');
})

nature.forEach(icon=>{


    icon.addEventListener('click', ()=>{

        if(icon.id === 'stars') {
            body.style.backgroundImage = 'url(stars.jpg)';
        } else if(icon.id === 'sun') {
            body.style.backgroundImage = 'url(sun.jpg)';
        } else if(icon.id === 'tree') {
            body.style.backgroundImage = 'url(trees.jpg)';
        } else if(icon.id === 'water') {
            body.style.backgroundImage = 'url(water.jpg)';
        } else if(icon.id === 'snow') {
            body.style.backgroundImage = 'url(snow.jpg)';
            body.style.color = '#82E0AA'
        }

    })
    
})