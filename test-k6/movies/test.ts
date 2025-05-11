import { group } from 'k6'
import { getMovies } from './tests/index.ts'

export const movies = (requestUrl: string) => {
    group(movies.name, () => {
        getMovies(requestUrl)
    })
}
