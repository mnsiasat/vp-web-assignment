export function getWatchedMovies() {
    let movies = localStorage.getItem('movies-watched')

    if(movies){
        return JSON.parse(movies)
    }

    return []
}

export function getAllMovies() {
    const movies = localStorage.getItem('movies-all')

    if(movies){
        return JSON.parse(movies)
    }

    return [
        {
            title: 'The Avengers',
            image: 'http://d21lz9b0v8r1zn.cloudfront.net/wp-content/uploads//2012/03/detail.jpg',
            comment: 'New York blows up in this!'
        },
        {
            title: 'Dark City',
            image: 'https://i.chzbgr.com/full/5569379584/hA96709E0/',
            comment: 'This looks mysterious. Cool!'
        },
        {
            title: 'Hot Tub Time Machine',
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTG7vNmphIcVhEcybvSvMgbTkV6EE2twHBNanKvgDx3ZS7Ivn6Dtg',
            comment: 'Someone said this was fun. Maybe!'
        },
    ]
}

export function add(title, comment, image) {
    const movies = getAllMovies()
    movies.push({title, comment, image})
    localStorage.setItem('movies-all', JSON.stringify(movies))
}

export function addWatchedMovie
({
     title,
     comment,
     image
 }) {
    const movie = {}
    movie.title = title
    movie.comment = comment
    movie.image = image

    const movies = getWatchedMovies()
    movies.push(movie)

    localStorage.setItem('movies-watched', JSON.stringify(movies))
}

export function removeWatchedMovie({title}) {
    const movies = getWatchedMovies()

    const newWatchedMovies = movies && movies.length > 0 ? movies.filter(item => item.title !== title) : []
    localStorage.setItem('movies-watched', JSON.stringify(newWatchedMovies))
}