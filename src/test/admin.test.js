const request = require('supertest');
const app = require('../app');

let elementId;

describe('Admin routes test', () => {
  it('POST /admin/new', (done) => {
    request(app)
      .post('/admin/new')
      .expect('Content-Type', /json/)
      .send({
        email: 'brunaccelestino120@gmail.com',
        name: 'Bruna',
        password: 'Fortes12@',
      })
      .expect(201)
      .end((err, res) => {
        if (err) return done(err);
        elementId = res.body.newAdmin._id;
        return done();
      });
  });

  it('POST /admin/login', (done) => {
    request(app)
      .post('/admin/login')
      .expect('Content-Type', /json/)
      .send({
        email: 'brunaccelestino120@gmail.com',
        password: 'Fortes12@',
      })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        return done();
      });
  });

  it('GET /admin/find-all-admins', (done) => {
    request(app)
      .get('/admin/find-all-admins')
      .expect(200)
      .expect((res) => {
        expect(res.body.length).not.toBe(0);
      })
      .end((err, res) => {
        if (err) return done(err);
        return done();
      });
  });

  it('GET /admin/find-admin/:id', (done) => {
    request(app)
      .get(`/admin/find-admin/${elementId}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.length).not.toBe(0);
      })
      .end((err, res) => {
        if (err) return done(err);
        return done();
      });
  });

  it('GET /admin/find-admin-by-email/', (done) => {
    request(app)
      .get(`/admin/find-admin-by-email?email=brunaccelestino120@gmail.com`)
      .expect(200)
      .expect((res) => {
        expect(res.body.length).not.toBe(0);
      })
      .end((err, res) => {
        if (err) return done(err);
        return done();
      });
  });

  it('PUT /admin/update/:id', (done) => {
    request(app)
      .put(`/admin/update/${elementId}`)
      .expect('Content-Type', /json/)
      .send({
        name: 'Bruna Kathellyn',
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.savedAdmin._id).toBe(elementId);
        expect(res.body.savedAdmin.name).toBe('Bruna Kathellyn');
        expect(res.body.savedAdmin.email).toBe('brunaccelestino120@gmail.com');
      })
      .end((err, res) => {
        if (err) return done(err);
        return done();
      });
  });

  it('DELETE /admin/delete/:id', (done) => {
    request(app)
      .delete(`/admin/delete/${elementId}`)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        return done();
      });
  });
});
