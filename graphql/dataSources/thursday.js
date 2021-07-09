const { DataSource } = require('apollo-datasource');
const DataLoader = require('dataloader');
const { ApolloError } = require('apollo-server-express');

//DynamoDb config
const AWS = require("aws-sdk");
AWS.config.update({
    region: "eu-west-1",
    endpoint: "https://dynamodb.eu-west-1.amazonaws.com",
    accessKeyId: 'AKIA27JL2BM36QFKMSGZ',
    secretAccessKey: '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'
});

module.exports = class ThursdayDataSource extends DataSource {
    constructor() {
        super();
    }

    initialize(config) {
        this.context = config.context;
        this.client = config.context.sqlClient;
    }
    //Dynamo part

    async insertThursdayDynamo(data){
        try {
            
            let docClient = new AWS.DynamoDB.DocumentClient();

            //return console.log(data);

            const params = {
                TableName: "Thursday",
                Item: {
                    "thursdayId":  data.thursdayId,
                    ...data.data
                }
            }
            
            docClient.put(params, function(err, data) {
                if (err) {
                    console.error("Unable to add data", ". Error JSON:", JSON.stringify(err, null, 2));
                } else {
                    console.log("PutItem succeeded:", data);
                }
             });

        } catch (error) {
            console.trace("resolver error", error)
        }
    }

    async getThursdayDynamo(thursdayId) {
        try {
            
            const docClient = new AWS.DynamoDB.DocumentClient();

            async function syncQuery() {
                const params = {
                    TableName: "Thursday",
                    KeyConditionExpression: "#tId = :tId",
                    ExpressionAttributeNames:{
                        "#tId": "thursdayId"
                    },
                    ExpressionAttributeValues: {
                        ":tId": thursdayId
                    }
                };

                const awsRequest = await docClient.query(params);
                const result = await awsRequest.promise();
                return result.Items[0]
            }

            return await syncQuery()

        } catch (error) {
            console.trace("resolver error", error)
        }
    }


    //Postgres part
   ThursdayByCustomerLoader = new DataLoader(async (ids) => {
        const thursdays = await this.getThursdayByBulkCustomerId(ids);
        return ids.map((id) => {
            if (thursdays instanceof ApolloError) {
                return undefined
            } else {
                return thursdays.filter( thursday => thursday.customer_id === id)
            }
        })
    })

// poids de corps loader
    pdcLoader = new DataLoader(async(ids) => {
        const pdcs = await this.getPdcBulk(ids);
        return ids.map((id) => {
            if (pdcs instanceof ApolloError) {
                return undefined
            } else {
                return pdcs.find(pdc => pdc.thursday_id === id)
            }
        })
    })

    async getPdcBulk(ids) {
        const result = await this.client.query('SELECT * FROM main.thursday_pdc WHERE thursday_id = ANY($1)',[ids])
        return result.rows
    }

    async getPdcByThursdayId(id) {
        return await this.pdcLoader.load(id)
    }

    
    // salle loader
    salleLoader = new DataLoader(async(ids) => {
        const salles = await this.getSalleBulk(ids);
        return ids.map((id) => {
            if (salles instanceof ApolloError) {
                return undefined
            } else {
                return salles.find(salle => salle.thursday_id === id)
            }
        })
    })

    async getSalleBulk(ids) {
        const result = await this.client.query('SELECT * FROM main.thursday_salle WHERE thursday_id = ANY($1)',[ids])
        return result.rows
    }

    async getSalleByThursdayId(id) {
        return await this.salleLoader.load(id)
    }

    // thursday base
    async getThursdayByBulkCustomerId(ids) {
        const result = await this.client.query('SELECT * FROM main.thursday WHERE customer_id = ANY($1)',[ids])
        return result.rows
    }

    async getThursdaysByCustomerIdLoader(id) {
        return await this.ThursdayByCustomerLoader.load(id)
    } 

    async getThursdaysByCustomerId(id) {
        try {
            const thursday = await this.client.query('SELECT * FROM main.thursday WHERE customer_id=$1',[id]);
            return thursday.rows
        } catch (error) {
            console.log(error)
        }

    }

    //Simple request

    async insertThursday(thursdayValues) {
        try {
            const thursdayKeys = Object.keys(thursdayValues);
            let index = 1;
            let values = [];
            let placeholder = [];

            for (let key of thursdayKeys) {

                values.push(thursdayValues[key]);

                placeholder.push('$'+index);
                index++
            }

            const thursday = await this.client.query(`INSERT INTO main.thursday (${thursdayKeys.join(',')}) VALUES (${placeholder.join(',')}) RETURNING id`,values);

            //console.log("*",prospect.rows[0]);
            this.ThursdayByCustomerLoader.clear(thursdayValues.customer_id)
            return thursday.rows[0];
/*             const thursday = await this.client.query('INSERT INTO main.thursday (weight, waist, kcal, phase, week, phase_week, tall, menstruation, women_chest, women_hip, women_arm, women_thigh, customer_id) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,) RETURNING id',[inseredThursday.weight, inseredThursday.waist, inseredThursday.kcal, inseredThursday.phase, inseredThursday.week, inseredThursday.women_chest, inseredThursday.women_hip, inseredThursday.women_arm, inseredThursday.women_thigh, inseredThursday.customer_id]);
            return thursday.rows[0]; */
        
        } catch (error) {
            console.trace(error)
        }
    }

    async insertThursdayPdc(pdc) {
        try {
            const pdcKeys = Object.keys(pdc);
            let index = 1;
            let values = [];
            let placeholder = [];

            for (let key of pdcKeys) {

                values.push(pdc[key]);

                placeholder.push('$'+index);
                index++
            }

            const thursdayPdc = await this.client.query(`INSERT INTO main.thursday_pdc (${pdcKeys.join(',')}) VALUES (${placeholder.join(',')}) RETURNING id`,values);

            //console.log("*",prospect.rows[0]);
            return thursdayPdc.rows[0];
        } catch (error) {
            console.trace(error)
        }
    }

    async insertThursdaySalle(salle) {
        try {
            const salleKeys = Object.keys(salle);
            let index = 1;
            let values = [];
            let placeholder = [];

            for (let key of salleKeys) {

                values.push(salle[key]);

                placeholder.push('$'+index);
                index++
            }

            const thursdaySalle = await this.client.query(`INSERT INTO main.thursday_salle (${salleKeys.join(',')}) VALUES (${placeholder.join(',')}) RETURNING id`,values);

            //console.log("*",prospect.rows[0]);
            return thursdaySalle.rows[0];
        } catch (error) {
            console.trace(error)
        }
    }

    async insertRep(repData){
        try {
            const repKeys = Object.keys(repData);
            let index = 1;
            let values = [];
            let placeholder = [];

            for (let key of repKeys) {

                values.push(repData[key]);

                placeholder.push('$'+index);
                index++
            }

            const thursdayRep = await this.client.query(`INSERT INTO main.rep (${salleKeys.join(',')}) VALUES (${placeholder.join(',')}) RETURNING id`,values);

            //console.log("*",prospect.rows[0]);
            return thursdayRep.rows[0];
        } catch (error) {
            console.trace(error)
        }
    }

    async getPdc(id) {
        try {
            const pdc = await this.client.query('SELECT * FROM main.thursday_pdc WHERE thursday_id=$1',[id]);
            return pdc.rows[0]
        } catch (error) {
            console.trace(error)
        }
    }

    async getSalle(id) {
        try {
            const salle = await this.client.query('SELECT * FROM main.thursday_salle WHERE thursday_id=$1',[id]);
            return salle.rows[0]
        } catch (error) {
            console.trace(error)
        }
    }

}