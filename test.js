/* eslint-disable no-unused-expressions */
const { expect } = require('chai')
const chai = require('chai')
const chaiHttp = require('chai-http')
const { describe, beforeEach, it } = require('mocha')

chai.use(chaiHttp)

const server = require('./index')
const Movie = require('./db')

describe('Test Movie', () => {
  let testMovie

  beforeEach((done) => {
    Movie.deleteMany((err) => {
      if (!err) {
        Movie.create(
          {
            title: 'Star Wars VI',
            description: 'Return of the Jedi.',
            date_released: '06-02-1983'
          },
          (err, created) => {
            if (!err) {
              testMovie = created
              return done()
            }
          }
        )
      }
    })
  })

  it('Should create a movie', (done) => {
    chai
      .request(server)
      .post('/movie/create')
      .send({
        title: 'Star Wars III',
        description: 'Revenge of the Sith.',
        date_released: '05-19-2005'
      })
      .end((err, res) => {
        expect(err).to.be.null
        expect(res).to.have.status(201)
        expect(res).to.haveOwnProperty('text', 'Added record successfully!')
        return done()
      })
  })

  it('Should NOT create a movie', (done) => {
    chai
      .request(server)
      .post('/movie/create')
      .send()
      .end((err, res) => {
        expect(err).to.be.null
        expect(res).to.have.status(400)
        expect(res).to.haveOwnProperty(
          'text',
          'Movie validation failed: date_released: Path `date_released` is required., description: Path `description` is required., title: Path `title` is required.'
        )
        return done()
      })
  })

  it('Should delete a movie', (done) => {
    chai
      .request(server)
      .delete('/movie/delete/' + testMovie.id)
      .end((err, res) => {
        expect(err).to.be.null
        expect(res).to.have.status(204)
        done()
      })
  })

  it('Should find a movie', (done) => {
    chai
      .request(server)
      .get('/movie/get/' + testMovie.id)
      .end((err, res) => {
        expect(err).to.be.null
        expect(res).to.have.status(200)
        expect(res.body).to.haveOwnProperty('title', 'Star Wars VI')
        expect(res.body).to.haveOwnProperty(
          'description',
          'Return of the Jedi.'
        )
        expect(res.body).to.haveOwnProperty(
          'date_released',
          '1983-06-01T23:00:00.000Z'
        )
        return done()
      })
  })

  it('Should update a movie', (done) => {
    chai.request(server).put('/movie/update/' + testMovie.id).send({
      title: 'Star Wars IV',
      description: 'A New Hope.',
      date_released: '12-27-1977'
    }).end((err, res) => {
      expect(err).to.be.null
      expect(res).to.have.status(200)
      expect(res.body).to.haveOwnProperty('title', 'Star Wars VI')
      expect(res.body).to.haveOwnProperty(
        'description',
        'Return of the Jedi.'
      )
      expect(res.body).to.haveOwnProperty(
        'date_released',
        '1983-06-01T23:00:00.000Z'
      )
      return done()
    })
  })

  it('Should get all movies', (done) => {
    chai.request(server).get('/movie/getAll')
      .end((err, res) => {
        expect(err).to.be.null
        expect(res).to.have.status(200)
        expect(res.body).to.be.a('array')
        expect(res.body).length(1)
        return done()
      })
  })
})
