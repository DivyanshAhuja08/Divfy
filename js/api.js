class OMDB {
    constructor() {
        this.key = '23cba8d9';
    }

    static shuffleArray(array) {
        return array.sort(() => Math.random() - 0.5);
    }

    static defaultImage() {
        return "https://via.placeholder.com/200x300?text=No+Image";
    }

    async getMovies() {
        const movieTitles = [
           'Sultan', 'Animal','Kabir Singh', 'Dangal', 'Baahubali: The Beginning', 'Baahubali: The Conclusion',
            'KGF: Chapter 1', 'KGF: Chapter 2', 'Uri: The Surgical Strike', '3 Idiots',
            'Chhichhore', 'Gully Boy', 'Tanu Weds Manu', 'Queen', 'Piku', 'Zindagi Na Milegi Dobara',
            'Dil Chahta Hai', 'Sholay', 'Lagaan', 'Jab We Met', 'Kabhi Khushi Kabhie Gham', 'Chakde! India', 
            'Pathaan', 'RRR', 'Drishyam', 'Pushpa: The Rise', 'Bajrangi Bhaijaan', 'PK', 'Barfi!', 'Raazi',
            'Kahaani', 'Padmaavat', 'M.S. Dhoni: The Untold Story', 'Rockstar', 'Yeh Jawaani Hai Deewani',
            'Tamasha', 'Student of the Year', 'Veer-Zaara', 'Swades', 'Black', 'Gadar: Ek Prem Katha',
            'Maine Pyar Kiya', 'Dilwale Dulhania Le Jayenge', 'Kal Ho Naa Ho', 'My Name Is Khan', 'Housefull', 
            'Bhool Bhulaiyaa', 'Golmaal', 'War', 'Kesari', 'Sooryavanshi', 'Ek Tha Tiger', 'Bhoot', 'The Lunchbox'
        ];
        

        const seriesTitles = [
            'Highway Love', 'Shark Tank India', 'Taarak Mehta Ka Ooltah Chashmah', 'Sacred Games',
            'Mirzapur', 'The Family Man', 'Kota Factory', 'Money Heist (Indian Remake)', 'Made in Heaven',
            'Breathe', 'Delhi Crime', 'Panchayat', 'Special OPS', 'The Forgotten Army', 'Aarya',
            'Flames', 'Little Things', 'Lal Kaptaan', 'Hostages', 'Criminal Justice',
             'Asur', 'Paatal Lok', 'Rocket Boys', 'Mumbai Diaries 26/11', 'Bandish Bandits', 
            'Inside Edge', 'Bard of Blood', 'Rangbaaz', 'Grahan', 'Ray', 'Aspirants', 'Gullak',
            'TVF Pitchers', 'TVF Tripling', 'Four More Shots Please!', 'Out of Love', 'Betaal',
            'Leila', 'Tandav', 'The Great Indian Murder', 'Aranyak', 'Mismatched', 'Masaba Masaba',
            'Breath: Into the Shadows', 'She', 'Selection Day', 'Bombay Begums', 'College Romance','C.I.D.'
        ];
        

        const moviePromises = movieTitles.map(title =>
            fetch(`http://www.omdbapi.com/?apikey=${this.key}&t=${title}&type=movie`).then(res => res.json())
        );

        const seriesPromises = seriesTitles.map(title =>
            fetch(`http://www.omdbapi.com/?apikey=${this.key}&t=${title}&type=series`).then(res => res.json())
        );

        const [movieResults, seriesResults] = await Promise.all([
            Promise.all(moviePromises),
            Promise.all(seriesPromises)
        ]);

        // Filter out undefined or incomplete results
        const validMovies = movieResults.filter(movie => movie.Response === 'True' && movie.Title && movie.imdbID);
        const validSeries = seriesResults.filter(series => series.Response === 'True' && series.Title && series.imdbID);

        const shuffledMovies = OMDB.shuffleArray(validMovies).slice(0, 10);
        const shuffledSeries = OMDB.shuffleArray(validSeries).slice(0, 12);

        return {
            movies: shuffledMovies,
            series: shuffledSeries
        };
    }

    async movieInfo(id) {
        const response = await fetch(`http://www.omdbapi.com/?apikey=${this.key}&i=${id}`);
        const results = await response.json();
        return results;
    }

    async search(userText) {
        const response = await fetch(`http://www.omdbapi.com/?apikey=${this.key}&s=${userText}`);
        const result = await response.json();

        // Handle cases where the search might return no results
        return result.Response === 'True' ? result.Search : [];
    }
}
