const { gql } = require('apollo-server-express');

const schema = gql`
    #entité

    scalar JSON

    type Prospect {
        id: ID!
        email: String!
        firstname: String!
        lastname: String!
        age: Int!
        phonenumber: String!
        date: String!
        objectif: String!
        experience: String!
        invest: String!
        sexe: String
        traking: [Traking]
        seller_id: Int
    }

    type Traking {
        id: ID!
        ab_origine: String
        ab_traffic: String
        ab_campagne: String
        ab_contenu: String
        ab_variation: String
        ct_origine: String
        ct_traffic: String
        ct_campagne: String
        ct_contenu: String
        ct_variation: String
        clic: String
        form: String
        split: String
        test: String
        split_test: String
        date: String
        prospect_id: Prospect
        customer_id: Customer
    }

    type Product {
        id: ID!
        name: String!
        activ: Boolean
        start_date: String
        end_date: String
        amount_up_front: Int
        first_degressive_amount: Int
        second_degressive_amount: Int
        gender: String
        payment_periodicity: String
    }

    type Coach {
        id: ID!
        firstname: String!
        lastname: String!
        email: String
        tel: String
        password: String
        activ: Boolean
        start_date: String
        end_date: String
        telegram: String
        integromat_id: Int
        customers: [Customer]
    }

    type Seller {
        id: ID!
        firstname: String!
        lastname: String!
        email: String
        tel: String
        activ: Boolean
        start_date: String
        end_date: String
    }

    type Customer {
        id: ID!
        firstname: String!
        lastname: String!
        email: String!
        tel: String
        password: String
        dateofbirth: String
        activ: Boolean
        annulation: Boolean
        created_at: String
        updated_at: String
        telegram: String
        last_connection: String
        coach_id: Coach
        seller_id: Seller
        product_id: Product!
        sale: Sale
        thursdays: [Thursday]
        traking: Traking
        notes : [Note]
        background : [Background]
        prospect: Prospect
    }

    type Sale {
        id:ID!
        type: String!
        processor: String
        processor_cus_id: String
        amount_up_front: Int!
        amount_total: Int
        next_term: String
        number_of_payments: Int
        detail: JSON
        current_product_start_date: String
        customer_id: Customer!
    }

    type Background {
        id: ID!
        date: String!
        customer_id: Customer!
        product_id: Product!
    }

    type Thursday {
        id: ID!
        weight: Float
        waist: Float
        kcal: Int
        phase: String
        week: Int
        phase_week: Int
        tall: Int
        menstruation: Boolean
        women_chest: Float
        women_hip: Float
        women_arm: Float
        women_thigh: Float
        pdc: ThursdayPdc
        salle: ThursdaySalle
        detail: JSON
    }

    type ThursdayPdc {
        id: ID!
        pompes_level: Int
        pompes_details: JSON
        pompes_rep_1: Int
        pompes_rep_2: Int
        pompes_rep_3: Int
        jambes_level: Int
        jambes_details: JSON
        jambes_rep_1: Int
        jambes_rep_2: Int
        jambes_rep_3: Int
        tractions_level: Int
        tractions_details: JSON
        tractions_rep_1: Int
        tractions_rep_2: Int
        tractions_rep_3: Int
        abdo_level: Int
        abdo_details: JSON
        abdo_rep_1: Int
        abdo_rep_2: Int
        abdo_rep_3: Int
        fesses_level: Int
        fesses_details: JSON
        fesses_rep_1: Int
        fesses_rep_2: Int
        fesses_rep_3: Int
    }

    type ThursdaySalle {
        id: ID!
        squat_level: Float
        squat_details: JSON
        squat_rep_1: Int
        squat_rep_2: Int
        squat_rep_3: Int
        dev_inc_level: Float
        dev_inc_details: JSON
        dev_inc_rep_1: Int
        dev_inc_rep_2: Int
        dev_inc_rep_3: Int
        dev_mili_level: Float
        dev_mili_details: JSON
        dev_mili_rep_1: Int
        dev_mili_rep_2: Int
        dev_mili_rep_3: Int
        sdt_level: Float
        sdt_details: JSON
        sdt_rep_1: Int
        sdt_rep_2: Int
        sdt_rep_3: Int
        row_pend_level: Float
        row_pend_details: JSON
        row_pend_rep_1: Int
        row_pend_rep_2: Int
        row_pend_rep_3: Int
        tractions_level: Float
        tractions_details: JSON
        tractions_rep_1: Int
        tractions_rep_2: Int
        tractions_rep_3: Int
        abdo_level: Float
        abdo_details: JSON
        abdo_rep_1: Int
        abdo_rep_2: Int
        abdo_rep_3: Int
        hip_trust_level: Float
        hip_trust_details: JSON
        hip_trust_rep_1: Int
        hip_trust_rep_2: Int
        hip_trust_rep_3: Int
        fentes_level: Float
        fentes_details: JSON
        fentes_rep_1: Int
        fentes_rep_2: Int
        fentes_rep_3: Int
        tir_h_level: Float
        tir_h_details: JSON
        tir_h_rep_1: Int
        tir_h_rep_2: Int
        tir_h_rep_3: Int
    }

    type Note {
        id: ID!
        content: String
    }

    type Subscription {
        id: String
        customer: String
        latest_invoice: String
        price: Int
        status: String
        client_secret: String
        error: String
    }

    type Query {
        getProspects: [Prospect]
        getProspect(id: ID!): Prospect
        getProspectByMail(email: String!): Prospect
        getAllTraking: [Traking]
        getProspectTraking(id: ID!): Traking
        getCustomers: [Customer]
        getCustomerById(id: ID!): Customer
        getCustomerByMail(email: String!): Customer
        getCustomersByCoach(coachId: Int!): [Customer]
        getSaleByCustomerId(customer_id: Int!): Sale
        getSaleByProcessorCusId(processor_cus_id: String!): Sale
        connectCoach(email: String!, password: String!): Coach
        getCoachById(id: ID!): Coach
        getProductById(product_id: ID!): Product
        checkCoachSession: Coach
        getThursdayByCustomerId(customer_id: Int!): [Thursday]
        getCoachs: [Coach]
        getSellers: [Seller]
        getTraking(id: ID!): Traking
    }

    type Mutation {
        insertProspect(email: String!, firstname: String!, lastname: String!, age: Int!, phonenumber: String!, date: String!, objectif: String!, experience: String!, invest: String!, sexe: String, seller_id: Int): Prospect
        insertTraking(ab_origine: String, ab_traffic: String, ab_campagne: String, ab_contenu: String, ab_variation: String, ct_origine: String, ct_traffic: String, ct_campagne: String, ct_contenu: String, ct_variation: String, clic: String, form: String, split: String, test: String, split_test: String, date: String, prospect_id: Int, customer_id: Int):Traking
        insertCustomer(firstname: String!, lastname: String!, email: String!, tel: String, password: String, dateofbirth: String, activ: Boolean, annulation: Boolean, created_at: String, updated_at: String, coach_id: Int, seller_id: Int, product_id: Int!):Customer
        createPaymentIntent(items: String, email: String, name: String, pm: String, address: String, city: String, country: String, zip: String):Subscription
        insertSale(type: String!, processor: String, processor_cus_id: String, amount_up_front: Int!, amount_total: Int, next_term: String, number_of_payments: Int, detail: JSON, customer_id: Int!, current_product_start_date: String):Sale
        insertCustomerWithTraking(firstname: String!, lastname: String!, email: String!, tel: String, password: String, dateofbirth: String, activ: Boolean, annulation: Boolean, created_at: String, updated_at: String, coach_id: Int, seller_id: Int, product_id: Int!, ab_origine: String, ab_traffic: String, ab_campagne: String, ab_contenu: String, ab_variation: String, ct_origine: String, ct_traffic: String, ct_campagne: String, ct_contenu: String, ct_variation: String, clic: String, form: String, split: String, test: String, split_test: String):Customer
        updateCoachPassword(password: String!, email: String!, code: String!):Coach
        insertThursday(weight: Float, waist: Float, kcal: Int, phase: String, week: Int, phase_week: Int, tall: Int, menstruation: Boolean, women_chest: Float, women_hip: Float, women_arm: Float, women_thigh: Float, customer_id: Int): Thursday
        insertThursdayWithTraining(weight: Float, waist: Float, kcal: Int, phase: String, week: Int, phase_week: Int, tall: Int, menstruation: Boolean, women_chest: Float, women_hip: Float, women_arm: Float, women_thigh: Float, customer_id: Int, detail: JSON): Thursday
        insertNote(content: String, customer_id: Int, coach_id: Int): Note
        insertCoachId(coach_id: Int, email: String):Customer
        updateCustomer(id: Int!, firstname: String, lastname: String, email: String, tel: String, password: String, dateofbirth: String, activ: Boolean, annulation: Boolean, coach_id: Int, seller_id: Int, product_id: Int, prospect_id: Int): Customer
        updateSale(type: String, processor: String, processor_cus_id: String, amount_up_front: Int, amount_total: Int, next_term: String, number_of_payments: Int, detail: JSON, customer_id: Int!, current_product_start_date: String): Sale
        updateLastConnection(email: String, date: String): Customer
        insertThursdayDynamo(thursdayId: Int!, data: JSON): Thursday
        insertCoach(firstname: String!, lastname: String!, email: String!, tel: String, activ: Boolean, start_date: String, end_date: String): Coach
        insertBackground(date: String!, customer_id: Int!, product_id: Int!): Background
        insertSeller(firstname: String!, lastname: String!, email: String, tel: String): Seller
        changeSellerStatus(id: Int!, activ: Boolean!): Seller
        updateProspect(id: ID!, email: String ,firstname: String, lastname: String, age: Int, phonenumber: String): Prospect
        deleteProspect(id: ID!): Prospect
        updateTraking(id: ID!, date: String, prospect_id: Int):Traking
    }
`;

module.exports = schema;