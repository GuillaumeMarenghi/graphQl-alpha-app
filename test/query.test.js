const chai = require('chai');
let expect = chai.expect;
let should = chai.should();

const url = `https://awstest.alphabody.fr`;
//const url = `http://localhost:3001`;
const request = require('supertest')(url);

describe('GraphQL query\'s', () => {
it('Returns all prospects', (done) => {
    request.post('/graphQl')
    .send({ query: `query getProspects{
        getProspects {id firstname lastname email age phonenumber date}
      }` })
    .expect(200)
    .end((err, res) => {
        // res will contain array of all users
        if (err) return done(err);
        // verifie que le resultat et bien un array
        res.body.data.getProspects.should.be.an('array');
        res.body.data.getProspects[1355].should.be.an('object');
        done();
    })  
})

it('Returns prospect with id = 10', (done) => {
        request.post('/graphql')
        .send({ query: `query getProspect($id: ID!){
            getProspect(id: $id){
                id
                firstname
                lastname
                email
                age
                phonenumber
                date
                objectif
                experience
                invest
                sexe
            }
        }`,
        variables:{
            id: 1548
        }})
        .expect(200)
        .end((err,res) => {
            
            if (err) return done(err);

            res.body.data.getProspect.should.have.property('id')
            res.body.data.getProspect.should.have.property('firstname')
            res.body.data.getProspect.should.have.property('lastname')
            res.body.data.getProspect.should.have.property('age')
            res.body.data.getProspect.should.have.property('phonenumber')
            res.body.data.getProspect.should.have.property('objectif')
            res.body.data.getProspect.should.have.property('experience')
            res.body.data.getProspect.should.have.property('invest')
            res.body.data.getProspect.should.have.property('sexe')

            res.body.data.getProspect.should.be.an('object');
            done();
        })
}) 

it('Returns prospect by mail', (done) => {
        request.post('/graphql')
        .send({ query: `query getProspectByMail($email: String!){
            getProspectByMail(email: $email){
                id
                firstname
                lastname
                email
                age
                phonenumber
                date
                objectif
                experience
                invest
                sexe
            }
        }`,
        variables:{
            email: "bellardimatteo8@gmail.com"    
        }})
        .expect(200)
        .end((err,res) => {
            
            if (err) return done(err);

            res.body.data.getProspectByMail.should.have.property('id')
            res.body.data.getProspectByMail.should.have.property('firstname')
            res.body.data.getProspectByMail.should.have.property('lastname')
            res.body.data.getProspectByMail.should.have.property('age')
            res.body.data.getProspectByMail.should.have.property('phonenumber')
            res.body.data.getProspectByMail.should.have.property('objectif')
            res.body.data.getProspectByMail.should.have.property('experience')
            res.body.data.getProspectByMail.should.have.property('invest')
            res.body.data.getProspectByMail.should.have.property('sexe')

            res.body.data.getProspectByMail.should.be.an('object');
            done();
        })
})

// pas faites encore cette route
/* it('Returns all traking', (done) => {
    request.post('/graphQl')
    .send({ query: `query getAllTraking{
        getAllTraking {ab_origine ab_traffic ab_campagne ab_contenu ab_variation ct_origine ct_traffic ct_campagne ct_contenu ct_variation clic form split test split_test prospect_id customer_id}
        }` })
    .expect(200)
    .end((err, res) => {
        // res will contain array of all users
        if (err) return done(err);
        // verifie que le resultat et bien un array
        res.body.data.getAllTraking.should.be.an('array');
        res.body.data.getAllTraking[1355].should.be.an('object');
        done();
    })  
}) */

it('Returns all customer', (done) => {
    request.post('/graphQl')
    .send({ query: `query getCustomers{
        getCustomers {
            id
            firstname
            lastname
            email
            tel
            password
            dateofbirth
            activ
            annulation
            created_at
            updated_at
            telegram
        }
        }` })
    .expect(200)
    .end((err, res) => {
        // res will contain array of all users
        if (err) return done(err);
        // verifie que le resultat et bien un array
        res.body.data.getCustomers.should.be.an('array');
        res.body.data.getCustomers[500].should.be.an('object');
        done();
    })  
})

it('Returns customer with id = 1743', (done) => {
    request.post('/graphql')
    .send({ query: `query getCustomerById($id: ID!){
        getCustomerById(id: $id){
            id
            firstname
            lastname
            email
            tel
            password
            dateofbirth
            activ
            annulation
            created_at
            updated_at
            telegram
            coach_id {id}
            seller_id {id}
        }
    }`,
    variables:{
        id: 1743
    }})
    .expect(200)
    .end((err,res) => {
        
        if (err) return done(err);

        res.body.data.getCustomerById.should.have.property('id')
        res.body.data.getCustomerById.should.have.property('firstname')
        res.body.data.getCustomerById.should.have.property('lastname')
        res.body.data.getCustomerById.should.have.property('coach_id')
        res.body.data.getCustomerById.should.have.property('tel')
        res.body.data.getCustomerById.should.have.property('seller_id')
        res.body.data.getCustomerById.should.have.property('password')
        res.body.data.getCustomerById.should.have.property('dateofbirth')
        res.body.data.getCustomerById.should.have.property('activ')
        res.body.data.getCustomerById.should.have.property('annulation')
        res.body.data.getCustomerById.should.have.property('created_at')
        res.body.data.getCustomerById.should.have.property('updated_at')
        res.body.data.getCustomerById.should.have.property('telegram')
        res.body.data.getCustomerById.should.have.property('coach_id')
        res.body.data.getCustomerById.should.have.property('seller_id')

        res.body.data.getCustomerById.should.be.an('object');
        done();
    })
})

it('Returns customer by mail', (done) => {
    request.post('/graphql')
    .send({ query: `query getCustomerByMail($email: String!){
        getCustomerByMail(email: $email){
            id
            firstname
            lastname
            email
            tel
            password
            dateofbirth
            activ
            annulation
            created_at
            updated_at
            telegram
            coach_id {id}
            seller_id {id}
        }
    }`,
    variables:{
        email: "fred.eymond@hotmail.fr"
    }})
    .expect(200)
    .end((err,res) => {
        
        if (err) return done(err);

        res.body.data.getCustomerByMail.should.have.property('id')
        res.body.data.getCustomerByMail.should.have.property('firstname')
        res.body.data.getCustomerByMail.should.have.property('lastname')
        res.body.data.getCustomerByMail.should.have.property('coach_id')
        res.body.data.getCustomerByMail.should.have.property('tel')
        res.body.data.getCustomerByMail.should.have.property('seller_id')
        res.body.data.getCustomerByMail.should.have.property('password')
        res.body.data.getCustomerByMail.should.have.property('dateofbirth')
        res.body.data.getCustomerByMail.should.have.property('activ')
        res.body.data.getCustomerByMail.should.have.property('annulation')
        res.body.data.getCustomerByMail.should.have.property('created_at')
        res.body.data.getCustomerByMail.should.have.property('updated_at')
        res.body.data.getCustomerByMail.should.have.property('telegram')
        res.body.data.getCustomerByMail.should.have.property('coach_id')
        res.body.data.getCustomerByMail.should.have.property('seller_id')

        res.body.data.getCustomerByMail.should.be.an('object');
        done();
    })
})


it('Returns sale by customer id', (done) => {
    request.post('/graphql')
    .send({ query: `query getSaleByCustomerId($customer_id: Int!){
        getSaleByCustomerId(customer_id: $customer_id){
            id
            type
            processor
            processor_cus_id
            amount_up_front
            amount_total
            next_term
            number_of_payments
            detail
            customer_id {id} 
        }
    }`,
    variables:{
        customer_id: 1509
    }})
    .expect(200)
    .end((err,res) => {
        
        if (err) return done(err);
        
        res.body.data.getSaleByCustomerId.should.have.property('id')
        res.body.data.getSaleByCustomerId.should.have.property('type')
        res.body.data.getSaleByCustomerId.should.have.property('processor')
        res.body.data.getSaleByCustomerId.should.have.property('processor_cus_id')
        res.body.data.getSaleByCustomerId.should.have.property('amount_up_front')
        res.body.data.getSaleByCustomerId.should.have.property('amount_total')
        res.body.data.getSaleByCustomerId.should.have.property('next_term')
        res.body.data.getSaleByCustomerId.should.have.property('number_of_payments')
        res.body.data.getSaleByCustomerId.should.have.property('detail')
        res.body.data.getSaleByCustomerId.should.have.property('customer_id')

        res.body.data.getSaleByCustomerId.should.be.an('object');
        done();
    })
})


it('Returns sale by processor cus id', (done) => {
    request.post('/graphql')
    .send({ query: `query getSaleByProcessorCusId($processor_cus_id: String!){
        getSaleByProcessorCusId(processor_cus_id: $processor_cus_id){
            id
            type
            processor
            processor_cus_id
            amount_up_front
            amount_total
            next_term
            number_of_payments
            detail
            customer_id {id}
        }
    }`,
    variables:{
        processor_cus_id: "cus_JQBO4tA7xVIhSh"

    }})
    .expect(200)
    .end((err,res) => {
        
        if (err) return done(err);

        res.body.data.getSaleByProcessorCusId.should.have.property('id')
        res.body.data.getSaleByProcessorCusId.should.have.property('type')
        res.body.data.getSaleByProcessorCusId.should.have.property('processor')
        res.body.data.getSaleByProcessorCusId.should.have.property('processor_cus_id')
        res.body.data.getSaleByProcessorCusId.should.have.property('amount_up_front')
        res.body.data.getSaleByProcessorCusId.should.have.property('amount_total')
        res.body.data.getSaleByProcessorCusId.should.have.property('next_term')
        res.body.data.getSaleByProcessorCusId.should.have.property('number_of_payments')
        res.body.data.getSaleByProcessorCusId.should.have.property('detail')
        res.body.data.getSaleByProcessorCusId.should.have.property('customer_id')

        res.body.data.getSaleByProcessorCusId.should.be.an('object');
        done();
    })
})

it('Returns get coach by id', (done) => {
    request.post('/graphql')
    .send({ query: `query getCoachById($id: ID!){
        getCoachById(id: $id){
              id
          firstname
          lastname
          customers {
            id
            firstname,
            lastname,
            email,
            tel,
            activ,
            product_id {
              id
              name
            }
            sale {
              id
              amount_up_front
            }
            thursdays {
              weight
            }
          }
        }
      }`,
    variables:{
        id: 1
    }})
    .expect(200)
    .end((err,res) => {
        
        if (err) return done(err);

        res.body.data.getCoachById.should.have.property('id')
        res.body.data.getCoachById.should.have.property('firstname')
        res.body.data.getCoachById.should.have.property('lastname')

        res.body.data.getCoachById.should.be.an('object');
        done();
    })
})

it('Returns get product by id 1', (done) => {
    request.post('/graphql')
    .send({ query: `query getProductById($product_id: ID!){
        getProductById(product_id: $product_id){
            id
            name
        }
    }`,
    variables:{
        product_id: 1
    }})
    .expect(200)
    .end((err,res) => {
        
        if (err) return done(err);

        res.body.data.getProductById.should.have.property('id')
        res.body.data.getProductById.should.have.property('name')

        res.body.data.getProductById.should.be.an('object');
        done();
    })
})


})