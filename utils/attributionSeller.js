
//const client = require('../client');

const AWS = require("aws-sdk");
AWS.config.update({
    region: "eu-west-1",
    endpoint: "https://dynamodb.eu-west-1.amazonaws.com",
    accessKeyId: 'AKIA27JL2BM36QFKMSGZ',
    secretAccessKey: '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'
});

let docClient = new AWS.DynamoDB.DocumentClient();

module.exports = {
    attribution : async (req, res) => {
        try {
            const gender = req.params.gender;

            async function syncQuery() {
                const params = {
                    TableName: "Ort"
                };

                const awsRequest = await docClient.scan(params);
                const result = await awsRequest.promise();
                //console.log(result.Items)
                return result.Items
            }

            const datas = await syncQuery();
            //const ecartRelatif = datas.map(elm => { return {ecart_relatif : elm.ecart_relatif, seller_id : elm.seller_id}})
            const triEcartRelatif = datas.sort((a,b) => {return a.ecart_relatif - b.ecart_relatif})

            if( gender === "Homme") {

                const clientPotentiel = [triEcartRelatif[triEcartRelatif.length - 1], triEcartRelatif[triEcartRelatif.length - 2], triEcartRelatif[triEcartRelatif.length - 3]]

                const clientFinal = clientPotentiel.sort((a,b) => {return b.ecart_relatif_homme - a.ecart_relatif_homme})

                async function syncPut() {
                    const params = {
                        TableName: "Ort",
                        Key: {
                            "seller_id":  clientFinal[0].seller_id,
                        },
                        UpdateExpression: "set ecart_homme = :ecart_homme, ecart_total = :ecart_total, leads = :leads, homme = :homme, ecart_relatif = :ecart_relatif, ecart_relatif_homme = :ecart_relatif_homme",
                        ExpressionAttributeValues: {
                            ":ecart_homme": clientFinal[0].ecart_homme - 1,
                            ":ecart_total": clientFinal[0].ecart_total - 1,
                            ":leads": clientFinal[0].leads + 1,
                            ":homme": clientFinal[0].homme + 1,
                            ":ecart_relatif": 100 - (((clientFinal[0].leads + 1) / clientFinal[0].ort) * 100),
                            ":ecart_relatif_homme": 100 - (((clientFinal[0].homme + 1) / (clientFinal[0].ort * clientFinal[0].ratio_homme)) * 100)
                        },
                        ReturnValues:"UPDATED_NEW"
                    }
                    const updaterequest = await docClient.update(params);
                    const res = await updaterequest.promise();
                    console.log("res homme" ,res)
                }
                await syncPut()
                res.send({seller_id : clientFinal[0].seller_id})
            }

            if( gender === "Femme") {

                const clientPotentiel = [triEcartRelatif[triEcartRelatif.length - 1], triEcartRelatif[triEcartRelatif.length - 2], triEcartRelatif[triEcartRelatif.length - 3]]

                const clientFinal = clientPotentiel.sort((a,b) => {return b.ecart_relatif_femme - a.ecart_relatif_femme})
                console.log('clientFinal:', clientFinal)

                async function syncPut() {
                    const params = {
                        TableName: "Ort",
                        Key: {
                            "seller_id":  clientFinal[0].seller_id,
                        },
                        UpdateExpression: "set ecart_femme = :ecart_femme, ecart_total = :ecart_total, leads = :leads, femme = :femme, ecart_relatif = :ecart_relatif, ecart_relatif_femme = :ecart_relatif_femme",
                        ExpressionAttributeValues: {
                            ":ecart_femme": clientFinal[0].ecart_femme - 1,
                            ":ecart_total": clientFinal[0].ecart_total - 1,
                            ":leads": clientFinal[0].leads + 1,
                            ":femme": clientFinal[0].femme + 1,
                            ":ecart_relatif": 100 - (((clientFinal[0].leads + 1) / clientFinal[0].ort) * 100),
                            ":ecart_relatif_femme": 100 - (((clientFinal[0].femme + 1) / (clientFinal[0].ort * clientFinal[0].ratio_femme)) * 100)
                        },
                        ReturnValues:"UPDATED_NEW"
                    }
                    const updaterequest = await docClient.update(params);
                    const res = await updaterequest.promise();
                    console.log("res femme" ,res)
                }
                await syncPut()
                res.send({seller_id : clientFinal[0].seller_id})
            }
            
        } catch (error) {
            console.log(error)
        }
    }
}
