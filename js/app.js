// Init API
const omdb=new OMDB();
// Init Ui
const ui=new UI();

// Get Movies
document.addEventListener("DOMContentLoaded",getMovies);

// serach Movies
document.getElementById('searchForm').addEventListener('submit',searchMovie);

function getMovies(){
    omdb.getMovies().then(results=>{
        console.log(results.movies);
        console.log(results.series);
        ui.showMovies(results.movies);
        ui.showSeries(results.series)
    }).catch(err=>{
        console.log(err);
    })
    
}
// search movie function
function searchMovie(e){
const inputText=document.querySelector(".search");
// Get input Text
const userText=inputText.value;
console.log(userText);
// api call
omdb.search(userText).then(results=>{
    ui.showSearch(results);
}).catch(err=>{
    console.log(err);
})

e.preventDefault();

}
// click Movie
function movieClicked(id){
    console.log(id);
    sessionStorage.setItem('movieID',id);
    location.assign('./movie.html');
    return false;
}
// Movie Info
function movie_info(){
    let id=sessionStorage.getItem('movieID');
    // Make a call to omdb API
    omdb.movieInfo(id).then(results=>{
        ui.showInfo(results);
    }).catch(err=>{
        console.log(err);
    })
}
function goBack() {
    window.location.href = './index.html'; // Adjust path if needed
}