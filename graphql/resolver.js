
const { ApolloError } = require('apollo-server-express');
const { GraphQLJSON } = require('graphql-type-json');

//bcrypt
const bcrypt = require('bcrypt');
//xss
const xss = require('xss');
//init stripe
const stripe = require("stripe")(process.env.STRIPE_SK);

//Schemas Joi
const checkProspectEntry = require('./Joi/prospectValidation');
const checkCustomerEntry = require('./Joi/customerValidation');
const { graphql } = require('graphql');

const convertStripeCode = require('../utils/stripeCodes')

const resolverMap = {

    JSON: GraphQLJSON,

    Customer: {
        //Récupertion d'un sale par l'id du client
        async sale(parent, _, { dataSources }) {
            try {
                return await dataSources.sale.getSaleByCustomerIdLoader(parent.id)
            } catch (error) {
                console.log(error)
            }
        },
        async product_id(parent, _, { dataSources }) {
            try {
                return await dataSources.product.getProductByIdLoader(parent.product_id)
            } catch (error) {
                console.log(error)
            }
        },
        async thursdays(parent, _, { dataSources }) {
            try {
                return await dataSources.thursday.getThursdaysByCustomerIdLoader(parent.id)
            } catch (error) {
                console.log(error)
            }
        },
        async traking(parent, _, { dataSources }) {
            try {
                return await dataSources.traking.getCustomerTraking(parent.id)
            } catch (error) {
                console.log(error)
            }
        },
        async notes(parent, _, { dataSources }) {
            try {
                return await dataSources.note.getNotes(parent.id);
            } catch (error) {
                console.log(error)
            }
        },
        async background(parent, _, { dataSources }) {
            try {
                return await dataSources.customer.getBackgroundByCustomer(parent.id);
            } catch (error) {
                console.log(error)
            }
        },
        async coach_id(parent, _, { dataSources }) {
            try {
                return await dataSources.coach.getCoachById(parent.coach_id);
            } catch (error) {
                console.log(error)
            }
        }
    },

    Prospect: {
        async traking(parent, _, { dataSources }) {
            try {
                return await dataSources.traking.findTrakingByProspectLoader(parent.id)
            } catch (error) {
                console.log(error)
            }
        }
    },

    Coach: {
        async customers(parent, _, { dataSources }) {
            try {
                return await dataSources.customer.getCustomersByCoachId(parent.id)
            } catch (error) {
                console.log(error)
            }
        }
    },

    Sale: {
        async customer_id(parent, _, { dataSources }) {
            try {
                return await dataSources.customer.getCustomerById(parent.customer_id)
            } catch (error) {
                console.log(error)
            }
        }
    },

    Thursday: {
        async pdc(parent, _, { dataSources }) {
            try {
                return await dataSources.thursday.getPdcByThursdayId(parent.id)
            } catch (error) {
                console.log(error)
            }
        },
        async salle(parent, _, { dataSources }) {
            try {
                return await dataSources.thursday.getSalleByThursdayId(parent.id)
            } catch (error) {
                console.log(error)
            }
        },
        async detail(parent, _, { dataSources }) {
            try {
                return await dataSources.thursday.getThursdayDynamo(parent.id)

            } catch (error) {
                console.log(error)
            }
        }
    },

    Query: {

        // récupération des traking
        async getTraking(_,args, {dataSources}) {
            try {
                return await dataSources.traking.getTrakingById(args.id)
            }
            catch (error) {
                console.log(error)
            }
        },


        //recupération prospect par l'id
        async getProspect(_, args, { dataSources }) {
            try {
                return await dataSources.prospect.getProspectById(args.id)
            } catch (error) {
                console.log(error)
            }
        },

        //recupération tout les prospects
        async getProspects(_, __, { dataSources }) {
            try {
                return await dataSources.prospect.getProspects();
            } catch (error) {
                console.log(error)
            }
        },

        //récupération prospect par mail
        async getProspectByMail(_, args, { dataSources }) {
            try {
                return await dataSources.prospect.getProspectByMail(args.email)
            } catch (error) {
                console.log(error)
            }
        },

        //récuperation customer par l'id
        async getCustomerById(_, args, { dataSources }) {
            try {
                return await dataSources.customer.getCustomerById(args.id)
            } catch (error) {
                console.log(error)
            }
        },

        //récupération customer par l'email
        async getCustomerByMail(_, args, { dataSources }) {
            try {
                return await dataSources.customer.getCustomerByMail(args.email)
            } catch (error) {
                console.log(error)
            }
        },

        //récupération de tout les customers
        async getCustomers(_, __, { dataSources }) {
            try {
                return await dataSources.customer.getCustomers();
            } catch (error) {
                console.log(error)
            }
        },

        //récupérations de sale par l'id du customer
        async getSaleByCustomerId(_, args, { dataSources }) {
            try {
                return await dataSources.sale.getSaleByCustomerId(args.customer_id)
            } catch (error) {
                console.log(error)
            }
        },

        //récuperation de sale par l'id stripe
        async getSaleByProcessorCusId(_, args, { dataSources }) {
            try {
                return await dataSources.sale.getSaleByProcessorCusId(args.processor_cus_id)
            } catch (error) {
                console.log(error)
            }
        },

        //récupération d'un product
        async getProductById(_, args, { dataSources }) {
            try {
                return await dataSources.product.getProductById(args.product_id)
            } catch (error) {
                console.log(error)
            }
        },

        // connection d'un coach
        async connectCoach(_, args, { dataSources, session }) {
            try {

                const coach = await dataSources.coach.getCoachByMail(args.email);
                //console.log('coach:', coach)

                if (!coach) {
                    return new ApolloError('Email et / ou mot de passe incorrect(s)', 'INVALID_DATA_INPUT');
                } else {
                    const validPassword = await bcrypt.compare(args.password, coach.password);

                    if (!validPassword) {
                        return new ApolloError('Email et / ou mot de passe incorrect(s)', 'INVALID_DATA_INPUT');
                    } else {
                        session.coach = {
                            id: coach.id,
                            firstname: coach.firstname,
                            lastname: coach.lastname,
                            email: coach.email
                        }

                        return coach
                    }
                }

            } catch (error) {
                console.log(error)
            }
        },

        //récuperation data coach
        async getCoachById(_, args, { dataSources }) {
            try {
                return await dataSources.coach.getCoachById(args.id)
            } catch (error) {
                console.log(error)
            }
        },

        //check si coach connecté
        async checkCoachSession(_, args, { dataSources, session }) {
            try {
                console.log("checkCoach", session)
                if (session.coach) {
                    return await dataSources.coach.getCoachById(session.coach.id)
                } else {
                    return new ApolloError('Pas de session active', 'NO_ACTIVE_SESSION');
                }
            } catch (error) {
                console.log(error)
            }
        },

        //recupération des Thursday
        async getThursdayByCustomerId(_, args, { dataSources }) {
            try {
                return await dataSources.thursday.getThursdaysByCustomerId(args.customer_id)
            } catch (error) {
                console.log(error)
            }
        },

        //recupérations de tout les coachs
        async getCoachs(_, args, { dataSources }) {
            try {
                return dataSources.coach.getCoachs()
            } catch (error) {
                console.log(error)
            }
        },

        //recupérations de tout les sellers
        async getSellers(_, args, { dataSources }) {
            try {
                return dataSources.seller.getSellers()
            } catch (error) {
                console.log(error)
            }
        }
    },

    Mutation: {

        // mettre à jour un traking
        async updateTraking(_, args, {dataSources}) {
            try {
                return await dataSources.traking.updateTraking({
                    id: args.id,
                    date: args.date,
                    prospect_id: args.prospect_id
                })
            }
            catch(error){
                console.log(error)
            }
        },


        //insertion d'un Client 

        async insertCustomer(_, args, { dataSources }) {
            try {
                /*                 const validation = checkCustomerEntry.validate(args);
                                if(validation.error) {
                                    console.log("erreur dans joi validation",validation.error)
                                    return validation.error
                                } */

                const cus = await dataSources.customer.getCustomerByMail(args.email)
                if (cus.id) {
                    return { id: cus.id }
                }

                return await dataSources.customer.insertCustomer({
                    firstname: xss(args.firstname),
                    lastname: xss(args.lastname),
                    email: xss(args.email),
                    tel: xss(args.tel),
                    password: xss(args.password),
                    dateofbirth: xss(args.dateofbirth),
                    activ: args.activ,
                    annulation: args.annulation,
                    created_at: xss(args.created_at),
                    seller_id: args.seller_id,
                    product_id: args.product_id
                })

            } catch (error) {
                console.trace(error)
            }
        },

        //insertion d'un prospect
        async insertProspect(_, args, { dataSources }) {
            try {
                const validation = checkProspectEntry.validate(args);
                //console.log(validation);

                if (validation.error) {
                    return validation.error
                }

                return await dataSources.prospect.insertProspect({
                    email: xss(args.email),
                    firstname: xss(args.firstname),
                    lastname: xss(args.lastname),
                    age: args.age,
                    phonenumber: xss(args.phonenumber),
                    date: xss(args.date),
                    objectif: xss(args.objectif),
                    experience: xss(args.experience),
                    invest: xss(args.invest),
                    sexe: xss(args.sexe),
                    seller_id: args.seller_id
                })

            } catch (error) {
                console.trace(error)
            }
        },
        //insertion d'un traking
        async insertTraking(_, args, { dataSources }) {
            try {
                return await dataSources.traking.insertTraking({
                    ab_origine: xss(args.ab_origine),
                    ab_traffic: xss(args.ab_traffic),
                    ab_campagne: xss(args.ab_campagne),
                    ab_contenu: xss(args.ab_contenu),
                    ab_variation: xss(args.ab_variation),
                    ct_origine: xss(args.ct_origine),
                    ct_traffic: xss(args.ct_traffic),
                    ct_campagne: xss(args.ct_campagne),
                    ct_contenu: xss(args.ct_contenu),
                    ct_variation: xss(args.ct_variation),
                    clic: xss(args.clic),
                    form: xss(args.form),
                    split: xss(args.split),
                    test: xss(args.test),
                    split_test: xss(args.split_test),
                    prospect_id: args.prospect_id
                })
            } catch (error) {
                console.trace("resolver error", error)
            }
        },

        //insertion d'un payment
        async insertSale(_, args, { dataSources }) {
            try {
                console.log("insertsale entry")
                return await dataSources.sale.insertSale({
                    type: args.type,
                    processor: args.processor,
                    processor_cus_id: args.processor_cus_id,
                    amount_up_front: args.amount_up_front,
                    amount_total: args.amount_total,
                    next_term: args.next_term,
                    number_of_payments: args.number_of_payments,
                    detail: args.detail,
                    current_product_start_date: args.current_product_start_date,
                    customer_id: args.customer_id
                })
            } catch (error) {
                console.trace("resolver error", error)
            }
        },

        //insertion customer + tracking
        async insertCustomerWithTraking(_, args, { dataSources }) {
            try {
                const customer = await dataSources.customer.insertCustomer({
                    firstname: xss(args.firstname),
                    lastname: xss(args.lastname),
                    email: xss(args.email),
                    tel: xss(args.tel),
                    password: xss(args.password),
                    created_at: xss(args.created_at),
                    product_id: args.product_id
                })

                await dataSources.traking.insertTraking({
                    ab_origine: xss(args.ab_origine),
                    ab_traffic: xss(args.ab_traffic),
                    ab_campagne: xss(args.ab_campagne),
                    ab_contenu: xss(args.ab_contenu),
                    ab_variation: xss(args.ab_variation),
                    ct_origine: xss(args.ct_origine),
                    ct_traffic: xss(args.ct_traffic),
                    ct_campagne: xss(args.ct_campagne),
                    ct_contenu: xss(args.ct_contenu),
                    ct_variation: xss(args.ct_variation),
                    clic: xss(args.clic),
                    form: xss(args.form),
                    split: xss(args.split),
                    test: xss(args.test),
                    split_test: xss(args.split_test),
                    customer_id: parseInt(customer.id, 10)
                })

                return customer;
            } catch (error) {
                console.trace("resolver error", error)
            }
        },

        //Update password d'un coach
        async updateCoachPassword(_, args, { dataSources }) {
            try {
                if (args.code !== process.env.PASSWORD_UUID) {
                    return new ApolloError('code de validation incorect', 'INCORECT_VALIDATION_CODE')
                }
                const saltRounds = 10;
                const encryptedPassword = await bcrypt.hash(args.password, saltRounds);

                return await dataSources.coach.updateCoachPassword({
                    password: encryptedPassword,
                    email: args.email
                })
            } catch (error) {
                console.trace("resolver error", error)
            }
        },

        //insertion thursday
        async insertThursday(_, args, { dataSources }) {
            try {
                return await dataSources.thursday.insertThursday({
                    weight: args.weight,
                    waist: args.waist,
                    kcal: args.kcal,
                    phase: args.phase,
                    week: args.week,
                    phase_week: args.phase_week,
                    tall: args.tall,
                    menstruation: args.menstruation,
                    women_chest: args.women_chest,
                    women_hip: args.women_hip,
                    women_arm: args.women_arm,
                    women_thigh: args.women_thigh,
                    customer_id: args.customer_id
                })
            } catch (error) {
                console.trace("resolver error", error)
            }
        },

        async insertThursdayWithTraining(_, args, { dataSources }) {
            try {
                const thursday = await dataSources.thursday.insertThursday({
                    weight: args.weight,
                    waist: args.waist,
                    kcal: args.kcal,
                    phase: args.phase,
                    week: args.week,
                    phase_week: args.phase_week,
                    tall: args.tall,
                    menstruation: args.menstruation,
                    women_chest: args.women_chest,
                    women_hip: args.women_hip,
                    women_arm: args.women_arm,
                    women_thigh: args.women_thigh,
                    customer_id: args.customer_id
                })

                dataSources.thursday.insertThursdayDynamo({
                    thursdayId: parseInt(thursday.id, 10),
                    data: args.detail
                })

                return thursday
            } catch (error) {
                console.trace("resolver error", error)
            }
        },

        //insertion note
        async insertNote(_, args, { dataSources }) {
            try {
                return await dataSources.note.insertNote({
                    content: args.content,
                    coach_id: args.coach_id,
                    customer_id: args.customer_id
                })
            } catch (error) {
                console.trace("resolver error", error)
            }
        },

        //insertion du coach_id
        async insertCoachId(_, args, { dataSources }) {
            try {
                return await dataSources.customer.insertCoachId({
                    coach_id: args.coach_id,
                    email: args.email
                })
            } catch (error) {
                console.trace("resolver error", error)
            }
        },

        //update Customer
        async updateCustomer(_, args, { dataSources }) {
            try {

                const keys = Object.keys(args);
                let data = {};

                for (key of keys) {
                    data[key] = args[key];
                }

                data["updated_at"] = new Date()

                console.log("=>", data)

                return await dataSources.customer.updateCustomer(data)
            } catch (error) {
                console.trace("resolver error", error)
            }
        },

        //updateSales
        async updateSale(_, args, { dataSources }) {
            try {
                return await dataSources.sale.updateSale(args)
            } catch (error) {
                console.trace("resolver error", error)
            }
        },

        async updateLastConnection(_, args, { dataSources }) {
            try {
                const customer = await dataSources.customer.getCustomerByMail(args.email)

                if (!customer) {
                    return new ApolloError('Client non enregistré dans la base', 'CLIENT_NOT_EXIST');
                }

                return await dataSources.customer.updateCustomer({
                    id: customer.id,
                    last_connection: args.date
                });

            } catch (error) {
                console.trace("resolver error", error)
            }
        },

        async insertThursdayDynamo(_, args, { dataSources }) {
            try {

                return await dataSources.thursday.insertThursdayDynamo(args);

            } catch (error) {
                console.trace("resolver error", error)
            }
        },

        async insertCoach(_, args, { dataSources }) {
            try {
                return await dataSources.coach.insertCoach(args)
            } catch (error) {
                console.trace("resolver error", error)
            }
        },

        async insertBackground(_, args, { dataSources }) {
            try {
                return await dataSources.customer.insertBackground(args)
            } catch (error) {
                console.trace("resolver error", error)
            }
        },

        async insertSeller(_, args, { dataSources }) {
            try {
                return await dataSources.seller.insertSeller(args)
            } catch (error) {
                console.trace("resolver error", error)
            }
        },

        async changeSellerStatus(_, args, { dataSources }) {
            try {
                return dataSources.seller.changeSellerStatus({
                    id: args.id,
                    activ: args.activ
                })
            } catch (error) {
                console.trace("resolver error", error)
            }
        },

        async updateProspect(_, args, { dataSources }) {
            try {
                return dataSources.prospect.updateProspect(args)
            } catch (error) {
                console.trace("resolver error", error)
            }
        },

        async deleteProspect(_, args, { dataSources }) {
            try {
                return dataSources.prospect.deleteProspect({
                    id: parseInt(args.id, 10)
                })
            } catch (error) {
                console.trace("resolver error", error)
            }
        },

        //stripe
        async createPaymentIntent(_, args, { dataSources }) {
            try {
                let customerId;

                const customerExist = await stripe.customers.list({
                    email: args.email,
                })

                if (customerExist.data[0]) {
                    //console.log("dans le if customerExist", customerExist.data[0])

                    await stripe.paymentMethods.attach(args.pm, {
                        customer: customerExist.data[0].id,
                    });

                    await stripe.customers.update(
                        customerExist.data[0].id,
                        {
                            invoice_settings: {
                                default_payment_method: args.pm,
                            },
                            name: args.name,
                            shipping: {
                                address: {
                                    line1: args.address,
                                    city: args.city,
                                    country: args.country,
                                    postal_code: args.zip
                                },
                                name: args.name
                            },
                        }
                    );

                    customerId = customerExist.data[0].id

                } else {
                    //console.log("dans le else customer n'existe pas")
                    const customer = await stripe.customers.create({
                        email: args.email,
                        name: args.name,
                        shipping: {
                            address: {
                                line1: args.address,
                                city: args.city,
                                country: args.country,
                                postal_code: args.zip
                            },
                            name: args.name
                        },
                        payment_method: args.pm,
                        invoice_settings: {
                            default_payment_method: args.pm
                        }
                    });
                    customerId = customer.id
                }


                let sub = "";
                //price de prod
                const formHTrimestriel = 'price_1HzlKEBLsf1gq6zz2N4VuHaM';
                const formHMensuel = 'price_1HzlJhBLsf1gq6zzRlVJopPo';

                const vipHAnnuel = 'price_1HzlJ8BLsf1gq6zzVN4ZAJtE';
                const vipHTrimestriel = 'price_1HzlIJBLsf1gq6zzrGFLnASp';
                const vipHMensuel = 'price_1HzlHtBLsf1gq6zzez7S9yvr';

                const formFTrimestriel = 'price_1HzlH6BLsf1gq6zz6VgVzNyf';
                const formFMensuel = 'price_1HzlGHBLsf1gq6zzjiBkUrgS';

                const vipFAnnuel = 'price_1HzlFjBLsf1gq6zzfdhy3UOn';
                const vipFTrimestriel = 'price_1HzlFEBLsf1gq6zzyhoWNUwJ';
                const vipFMensuel = 'price_1HzlEmBLsf1gq6zzIgIY9uVx';

                const oldAnnuel = 'price_1J2uYvBLsf1gq6zztnz3HWIe';
                const oldTrimestriel = 'price_1J2uanBLsf1gq6zzkEJpe9rJ';
                const oldMensuel = 'price_1J2ucMBLsf1gq6zz5lTOPpKb';

                // //price de dev
                // const formHTrimestriel = 'price_1Ig88UBLsf1gq6zzos1lbyHB';
                // const formHMensuel = 'price_1Ig86GBLsf1gq6zzXJJ3hAtk';

                // const vipHAnnuel = 'price_1Hzl2EBLsf1gq6zz1MqmXreB';
                // const vipHTrimestriel = 'price_1HzkcIBLsf1gq6zzKg0dgYSM';
                // const vipHMensuel = 'price_1HzkZWBLsf1gq6zzS70QFPJg';

                // const formFTrimestriel = 'price_1HzlBIBLsf1gq6zzZHMYXhr5';
                // const formFMensuel = 'price_1Hzl6TBLsf1gq6zzkO7G0IuD';

                // const vipFAnnuel = 'price_1Hzl2EBLsf1gq6zz1MqmXreB';
                // const vipFTrimestriel = 'price_1HzkcIBLsf1gq6zzKg0dgYSM';
                // const vipFMensuel = 'price_1HzkZWBLsf1gq6zzS70QFPJg'; 

                // const oldAnnuel = 'price_1J2ugnBLsf1gq6zziLyDAivN';
                // const oldTrimestriel = 'price_1J2uhoBLsf1gq6zzucbF9a6k';
                // const oldMensuel = 'price_1J2uicBLsf1gq6zzTH4l1riM';

                switch (args.items) {
                    case 'FFM':
                        sub = formFMensuel
                        break;
                    case 'FFT':
                        sub = formFTrimestriel
                        break;
                    case 'VFM':
                        sub = vipFMensuel
                        break;
                    case 'VFT':
                        sub = vipFTrimestriel
                        break;
                    case 'VFA':
                        sub = vipFAnnuel
                        break;
                    case 'FHM':
                        sub = formHMensuel
                        break;
                    case 'FHT':
                        sub = formHTrimestriel
                        break;
                    case 'VHM':
                        sub = vipHMensuel
                        break;
                    case 'VHT':
                        sub = vipHTrimestriel
                        break;
                    case 'VHT':
                        sub = vipHAnnuel
                        break;
                    case 'OHM':
                        sub = oldMensuel
                        break;
                    case 'OHT':
                        sub = oldTrimestriel
                        break;
                    case 'OHA':
                        sub = oldAnnuel
                        break;
                }

                const subscription = await stripe.subscriptions.create({
                    customer: customerId,
                    items: [
                        {
                            price: sub,
                            quantity: 1
                        }
                    ],
                    expand: ['latest_invoice.payment_intent'],
                })

                return {
                    id: subscription.id,
                    customer: subscription.customer,
                    latest_invoice: subscription.latest_invoice.id,
                    price: subscription.plan.amount,
                    status: subscription.latest_invoice.payment_intent.status,
                    client_secret: subscription.latest_invoice.payment_intent.client_secret
                }

            } catch (error) {
                console.log("erreur stripe", error);
                console.log("erreur code: ", error.raw.code, " // message si decline : ", error.raw.decline_code)

                //convert message error in french
                const erreur = convertStripeCode(error.raw.code, error.raw.decline_code)
                console.log("error FR :: ", erreur)

                return {
                    //error: error.raw.message,
                    error: erreur,
                    status: "error"
                }
            }
        }
    }
}

module.exports = resolverMap;