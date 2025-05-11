import { Controller, Get, Post, Put, Body, Param } from '@nestjs/common'
import { CreateMovieDto, UpdateMovieDto } from './dto'
import { MOVIES } from './constants'
import { MovieModel } from './models'

@Controller(MOVIES)
export class MoviesController {
    @Get()
    getAllMovies(): Array<MovieModel> {
        return [
            {
                id: '1',
                title: 'The Godfather',
                director: 'Francis Ford Coppola',
                year: 1972,
            },
            {
                id: '2',
                title: 'Pulp Fiction',
                director: 'Quentin Tarantino',
                year: 1994,
            },
        ]
    }

    @Get(':id')
    getMovieById(@Param('id') id: string): MovieModel {
        return {
            id,
            title: 'Inception',
            director: 'Christopher Nolan',
            year: 2010,
        }
    }

    @Post()
    createMovie(@Body() createMovieDto: CreateMovieDto) {
        return {
            message: 'Movie created successfully',
            movie: {
                id: '3',
                ...createMovieDto,
            },
        }
    }

    @Put(':id')
    updateMovie(@Param('id') id: string, @Body() updateMovieDto: UpdateMovieDto) {
        return {
            message: `Movie with ID ${id} updated successfully`,
            updatedMovie: {
                id,
                ...updateMovieDto,
            },
        }
    }
}
