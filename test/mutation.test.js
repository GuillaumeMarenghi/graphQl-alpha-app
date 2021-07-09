const chai = require('chai');
let expect = chai.expect;
let should = chai.should();

//const url = `https://awstest.alphabody.fr`;
const url = `http://localhost:3001`;
const request = require('supertest')(url);

describe('GraphQL mutation\'s', () => {
    it('insert Prospect', (done) => {
        request.post('/graphQl')
        .send({ query: `mutation insertProspect ($firstname: String!, $lastname: String!, $age: Int!, $email: String!, $phonenumber: String!, $date: String!, $objectif: String!, $experience: String!, $invest: String!, $sexe:String){
            insertProspect(firstname: $firstname, lastname: $lastname, age: $age, email: $email, phonenumber: $phonenumber, date: $date, objectif: $objectif, experience: $experience, invest: $invest, sexe: $sexe){
              id
            }
          } 

        `,
        variables: {
            "firstname": "test",
            "lastname": "unitaire",
            "age": 30 ,
            "email": "test@unitaire.fr" ,
            "phonenumber": "0606060606",
            "date": new Date() ,
            "objectif": "perdre du poids",
            "experience": "aucune",
            "invest": "déterminé",
            "sexe": "Femme"
          }
     })
        .expect(200)
        .end((err, res) => {
            // res will contain array of all users
            if (err) return done(err);
            // verifie que le resultat et bien un array
            res.body.data.insertProspect.should.have.property('id')
            res.body.data.insertProspect.should.be.an('object');
            done();
        })  
    })

    it('insert Traking', (done) => {
        request.post('/graphQl')
        .send({ query: `mutation insertTraking ($ab_origine: String, $ab_traffic: String, $ab_campagne: String, $ab_contenu: String, $ab_variation: String, $ct_origine: String, $ct_traffic: String, $ct_campagne: String, $ct_contenu: String, $ct_variation: String, $clic: String, $form: String, $split: String, $test: String, $split_test: String, $prospect_id: Int!){
            insertTraking(ab_origine: $ab_origine, ab_traffic: $ab_traffic, ab_campagne: $ab_campagne, ab_contenu: $ab_contenu, ab_variation: $ab_variation, ct_origine: $ct_origine, ct_traffic: $ct_traffic, ct_campagne: $ct_campagne, ct_contenu: $ct_contenu, ct_variation: $ct_variation, clic: $clic, form: $form, split: $split, test: $test, split_test: $split_test, prospect_id: $prospect_id){
                id
            }
        }
        `,
        variables: {
            "ab_origine": "test",
            "ab_traffic": "test",
            "ab_campagne": "test",
            "ab_contenu": "test",
            "ab_variation": "test",
            "ct_origine": "test",
            "ct_traffic": "test",
            "ct_campagne": "test",
            "ct_contenu": "test",
            "ct_variation": "test",
            "clic": "test",
            "form": "test",
            "split": "test",
            "test": "test",
            "split_test": "test",
            "prospect_id": 1
          }
     })
        .expect(200)
        .end((err, res) => {
            // res will contain array of all users
            if (err) return done(err);
            // verifie que le resultat et bien un array
            res.body.data.insertTraking.should.have.property('id')
            res.body.data.insertTraking.should.be.an('object');
            done();
        })  
    })

    it('insert Customer', (done) => {
        request.post('/graphQl')
        .send({ query: `mutation insertCustomer($firstname: String!, $lastname: String!, $email: String!, $tel: String, $password: String, $dateofbirth: String, $activ: Boolean, $annulation: Boolean, $created_at: String, $updated_at: String, $coach_id: Int, $seller_id: Int, $product_id: Int!){
            insertCustomer(firstname: $firstname, lastname: $lastname, email: $email, tel: $tel, password: $password, dateofbirth: $dateofbirth, activ: $activ, annulation:$annulation, created_at: $created_at, updated_at: $updated_at, coach_id: $coach_id, seller_id: $seller_id, product_id: $product_id ){
                id
            }
        }

        `,
        variables: {
            "firstname": "test",
            "lastname": "unitaire",
            "email": "test@unitaire.com",
            "tel": "0606060606",
            "password": "password",
            "dateofbirth": "1980-01-01",
            "activ": true,
            "annulation": false,
            "created_at": new Date(),
            "updated_at": new Date(),
            "coach_id": 1,
            "seller_id": 1,
            "product_id": 3

          }
     })
        .expect(200)
        .end((err, res) => {
            // res will contain array of all users
            if (err) return done(err);
            // verifie que le resultat et bien un array
            res.body.data.insertCustomer.should.have.property('id')
            res.body.data.insertCustomer.should.be.an('object');
            done();
        })  
    })

/*     it('create payment intent', (done) => {
        request.post('/graphQl')
        .send({ query: `mutation createPaymentIntent($items: String!, $email: String, $name: String, $pm: String, $address: String, $city: String, $country: String, $zip: String){
            createPaymentIntent(items:$items, email:$email, name:$name, pm: $pm, address: $address, city: $city, country: $country, zip: $zip){
                id
                customer
                latest_invoice
                price
                status
                client_secret
            }
        }
        `,
        variables: {
            "items": "mensuel",
            "email": "test@unitaire.com",
            "name": `test unitaire`,
            "pm": "",
            "address": "1 rue",
            "city": "ville",
            "country": "pays",
            "zip": "13005"

          }
     })
        .expect(200)
        .end((err, res) => {
            // res will contain array of all users
            if (err) return done(err);
            // verifie que le resultat et bien un array
            res.body.data.createPaymentIntent.should.have.property('id')
            res.body.data.createPaymentIntent.should.have.property('customer')
            res.body.data.createPaymentIntent.should.have.property('latest_invoice')
            res.body.data.createPaymentIntent.should.have.property('price')
            res.body.data.createPaymentIntent.should.have.property('status')
            res.body.data.createPaymentIntent.should.have.property('client_secret')
            res.body.data.createPaymentIntent.should.be.an('object');
            done();
        })  
    }) */

    it('insert sale', (done) => {
        request.post('/graphQl')
        .send({ query: `mutation insertSale($type: String!, $processor: String, $processor_cus_id: String, $amount_up_front: Int!, $amount_total: Int, $next_term: String, $number_of_payments: Int, $detail: JSON, $customer_id: Int!){
            insertSale(type: $type, processor: $processor, processor_cus_id: $processor_cus_id, amount_up_front: $amount_up_front, amount_total: $amount_total, next_term: $next_term, number_of_payments: $number_of_payments, detail: $detail, customer_id: $customer_id){
                id
            }
        }

        `,
        variables: {
            "type": "mensuel",
            "processor": "stripe",
            "processor_cus_id": "cus_fr15488455cvf8",
            "amount_up_front": 177,
            "amount_total": 177,
            "next_term": new Date(),
            "number_of_payments": 0,
            "detail": `{"subscription_id": "adesddee154"}`,
            "customer_id": 1
          }
     })
        .expect(200)
        .end((err, res) => {
            // res will contain array of all users
            if (err) return done(err);
            // verifie que le resultat et bien un array
            res.body.data.insertSale.should.have.property('id')
            res.body.data.insertSale.should.be.an('object');
            done();
        })  
    })

    it('insert insertCustomerWithTraking', (done) => {
        request.post('/graphQl')
        .send({ query: `mutation insertCustomerWithTraking ($firstname: String!, $lastname: String!, $email: String!, $tel: String, $password: String, $dateofbirth: String, $activ: Boolean, $annulation: Boolean, $created_at: String, $coach_id: Int, $seller_id: Int, $product_id: Int!, $ab_origine: String, $ab_traffic: String, $ab_campagne:String, $ab_contenu: String, $ct_origine: String ,$ct_traffic: String, $ct_campagne: String, $ct_contenu: String, $ct_variation: String, $clic: String, $form: String, $split: String, $test:String, $split_test: String, $ab_variation: String){   
            insertCustomerWithTraking(firstname: $firstname, lastname: $lastname, email: $email, tel: $tel, password: $password, dateofbirth: $dateofbirth, activ: $activ, annulation: $annulation, created_at: $created_at, coach_id: $coach_id, seller_id: $seller_id, product_id: $product_id, ab_origine: $ab_origine, ab_traffic: $ab_traffic, ab_campagne: $ab_campagne, ab_contenu: $ab_contenu, ct_origine: $ct_origine, ct_traffic: $ct_traffic, ct_campagne: $ct_campagne, ct_contenu: $ct_contenu, ct_variation: $ct_variation, clic: $clic, form: $form, split: $split, test: $test, split_test: $split_test, ab_variation: $ab_variation){     
                id   
            }}
        `,
        variables: {
            "firstname": "test",
            "lastname": "unitaire",
            "email": "test@unitaire.com",
            "tel": "0606060606",
            "password": "password",
            "dateofbirth": "1980-01-01",
            "activ": true,
            "annulation": false,
            "created_at": new Date(),
            "updated_at": new Date(),
            "coach_id": 1,
            "seller_id": 1,
            "product_id": 3,
            "ab_origine": "test",
            "ab_traffic": "test",
            "ab_campagne": "test",
            "ab_contenu": "test",
            "ab_variation": "test",
            "ct_origine": "test",
            "ct_traffic": "test",
            "ct_campagne": "test",
            "ct_contenu": "test",
            "ct_variation": "test",
            "clic": "test",
            "form": "test",
            "split": "test",
            "test": "test",
            "split_test": "test",
          }
     })
        .expect(200)
        .end((err, res) => {
            // res will contain array of all users
            if (err) return done(err);
            // verifie que le resultat et bien un array
            res.body.data.insertCustomerWithTraking.should.have.property('id')
            res.body.data.insertCustomerWithTraking.should.be.an('object');
            done();
        })  
    })

    it('insert updateCoachPassword', (done) => {
        request.post('/graphQl')
        .send({ query: `mutation updateCoachPassword($password: String!, $email: String!, $code:String!){
            updateCoachPassword(password: $password, email:$email, code:$code){id}
          }
        `,
        variables: {
            "password": "1234",
            "email": "georgy.roks@alphabody.fr",
            "code": "avril2021"
          }
     })
        .expect(200)
        .end((err, res) => {
            // res will contain array of all users
            if (err) return done(err);
            // verifie que le resultat et bien un array
            res.body.data.updateCoachPassword.should.have.property('id')
            res.body.data.updateCoachPassword.should.be.an('object');
            done();
        })  
    })
    
    it('insert insertThursday', (done) => {
        request.post('/graphQl')
        .send({ query: `mutation insertThursday($weight: Float, $waist: Float, $kcal: Int, $phase: String, $week: Int, $customer_id: Int){
            insertThursday(weight: $weight, waist: $waist, kcal: $kcal, phase: $phase, week:$week, customer_id: $customer_id){
              id
            }
          }
        `,
        variables: {
            "weight": 83.9,
            "waist": 76.2,
            "kcal": 1800,
            "phase": "reverse",
            "week": 11,
            "customer_id": 6
          }
     })
        .expect(200)
        .end((err, res) => {
            // res will contain array of all users
            if (err) return done(err);
            // verifie que le resultat et bien un array
            res.body.data.insertThursday.should.have.property('id')
            res.body.data.insertThursday.should.be.an('object');
            done();
        })  
    })

    it('insert insertNote', (done) => {
        request.post('/graphQl')
        .send({ query: `mutation insertNote($content: String, $coach_id: Int, $customer_id: Int){
            insertNote(content: $content, coach_id: $coach_id, customer_id: $customer_id){
              id
            }
          }
        `,
        variables: {
            "content": "ceci est une note client 1 coach 1",
            "coach_id": 1,
            "customer_id": 1
          }
     })
        .expect(200)
        .end((err, res) => {
            // res will contain array of all users
            if (err) return done(err);
            // verifie que le resultat et bien un array
            res.body.data.insertNote.should.have.property('id')
            res.body.data.insertNote.should.be.an('object');
            done();
        })  
    })

    it('insert thursday with training', (done) => {
        request.post('/graphQl')
        .send({ query: `mutation insertThursdayWithTraining($weight: Float, $waist: Float, $kcal: Int, $phase: String, $week: Int, $phase_week: Int , $tall: Int, $menstruation: Boolean, $customer_id: Int, $pompes_level: Int, $pompes_rep_1: Int, $pompes_rep_2: Int, $pompes_rep_3: Int, $jambes_level: Int, $jambes_rep_1: Int, $jambes_rep_2: Int, $jambes_rep_3: Int, $tractions_level: Int, $tractions_rep_1: Int, $tractions_rep_2: Int, $tractions_rep_3: Int, $abdo_level: Int, $abdo_rep_1: Int, $abdo_rep_2: Int, $abdo_rep_3: Int, $fesses_level: Int, $fesses_rep_1: Int, $fesses_rep_2: Int, $fesses_rep_3: Int, $squat_level: Float, $squat_rep_1: Int, $squat_rep_2: Int, $squat_rep_3: Int){
            insertThursdayWithTraining(weight: $weight, waist: $waist, kcal: $kcal, phase: $phase, week:$week, phase_week: $phase_week, tall: $tall, menstruation: $menstruation, customer_id: $customer_id, pompes_level: $pompes_level, pompes_rep_1: $pompes_rep_1, pompes_rep_2: $pompes_rep_2, pompes_rep_3: $pompes_rep_3, jambes_level: $jambes_level, jambes_rep_1: $jambes_rep_1, jambes_rep_2: $jambes_rep_2, jambes_rep_3: $jambes_rep_3, tractions_level: $tractions_level, tractions_rep_1: $tractions_rep_1, tractions_rep_2: $tractions_rep_2, tractions_rep_3: $tractions_rep_3, abdo_level: $abdo_level, abdo_rep_1: $abdo_rep_1, abdo_rep_2: $abdo_rep_2, abdo_rep_3: $abdo_rep_3, fesses_level: $fesses_level, fesses_rep_1: $fesses_rep_1, fesses_rep_2: $fesses_rep_2, fesses_rep_3: $fesses_rep_3, squat_level: $squat_level, squat_rep_1: $squat_rep_1, squat_rep_2: $squat_rep_2, squat_rep_3: $squat_rep_3 ){
              id
            }
          }
        `,
        variables: {
            "weight": 83.9,
            "waist": 76.2,
            "kcal": 1800,
            "phase": "reverse",
            "week": 14,
            "tall": 180,
            "phase_week": 2,
            "customer_id": 5,
            "pompes_level": 4,
            "pompes_rep_1": 3,
            "pompes_rep_2": 5,
            "pompes_rep_3": 1,
            "squat_level": null,
            "squat_rep_1": null,
            "squat_rep_2": null,
            "squat_rep_3": null
          }
     })
        .expect(200)
        .end((err, res) => {
            // res will contain array of all users
            if (err) return done(err);
            // verifie que le resultat et bien un array
            res.body.data.insertThursdayWithTraining.should.have.property('id')
            res.body.data.insertThursdayWithTraining.should.be.an('object');
            done();
        })  
    })

})