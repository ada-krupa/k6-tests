import { check, group } from 'k6'
import { MovieModel } from 'modules/movies/index.ts'
import { executeAndParseRequest, test, validate } from '../../utils/index.ts'
import { HttpMethods } from '../../types.ts'

export const getMovies = (requestUrl: string) => {
    const requestOptions = {
        tags: {
            name: getMovies.name,
        },
    }

    group(getMovies.name, () => {
        test(`should return data`, testName => {
            const url = `${requestUrl}/movies`

            const response = executeAndParseRequest<Array<MovieModel>>({
                method: HttpMethods.GET,
                url,
                requestOptions,
                testName,
            })

            check(response, {
                [testName]: (response: Array<MovieModel>) => {
                    const conditions = [validate(response).toNotHaveLength(0)]

                    return conditions.every(Boolean)
                },
            })
        })
    })
}
