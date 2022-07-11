const request = require('supertest');
const app = require('../app');

let elementId;
let token;

describe('Volunteer routes test', () => {
  it('POST /admin/login', (done) => {
    request(app)
      .post('/admin/login')
      .expect('Content-Type', /json/)
      .send({
        email: 'brunaccelestino100@gmail.com',
        password: 'Kd@b89999',
      })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
      token = res.body.token
        return done();
      });
  });

  it('POST /volunteer/new', (done) => {
    request(app)
    .post('/volunteer/new')
    .set('Authorization', `Baerer ${token}`)
      .send({
        email:"luis901@gmail.com",
        fullName: "Luis Fortes",
        birthdate: "09/10/1995",
        cellphoneNumberWithDDD: "12988924146",
        occupation: "ESTUDANTE",
        university: "UNIVESP",
        semester: "8",
        specialty: "pedagogia",
        listFreeDaysOfWeek: "DOMINGO",
        timeOfExperience: "1 ano",
        howMuchParticipate: "NOT",
        howDidKnowOfSDR: "OUTRO"
      })
      .expect(201)
      .end((err, res) => {
        if (err) return done(err);
        elementId = res.body.newVolunteer._id;
        return done();
      });
  });

  it('GET /volunteer/find-all-volunteers', (done) => {
    request(app)
      .get('/volunteer/find-all-volunteers')
      .set('Authorization', `Baerer ${token}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.length).not.toBe(0);
      })
      .end((err, res) => {
        if (err) return done(err);
        return done();
      });
  });

  it('GET /volunteer/find-volunteer/:id', (done) => {
    request(app)
      .get(`/volunteer/find-volunteer/${elementId}`)
      .set('Authorization', `Baerer ${token}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.length).not.toBe(0);
      })
      .end((err, res) => {
        if (err) return done(err);
        return done();
      });
  });

  it('GET /volunteer/find-volunteer-by-email', (done) => {
    request(app)
      .get(`/volunteer/find-volunteer-by-email?email=luis901@gmail.com`)
      .set('Authorization', `Baerer ${token}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.length).not.toBe(0);
      })
      .end((err, res) => {
        if (err) return done(err);
        return done();
      });
  });

  it('PUT /volunteer/update/:id', (done) => {
    request(app)
      .put(`/volunteer/update/${elementId}`)
      .set('Authorization', `Baerer ${token}`)
      .send({
        fullName: 'Bruna Kathellyn',
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.savedVolunteer._id).toBe(elementId);
        expect(res.body.savedVolunteer.fullName).toBe('Bruna Kathellyn');
        expect(res.body.savedVolunteer.email).toBe('luis901@gmail.com');
      })
      .end((err, res) => {
        if (err) return done(err);
        return done();
      });
  });

  it('DELETE /volunteer/delete/:id', (done) => {
    request(app)
      .delete(`/volunteer/delete/${elementId}`)
      .set('Authorization', `Baerer ${token}`)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        return done();
      });
  });
});
