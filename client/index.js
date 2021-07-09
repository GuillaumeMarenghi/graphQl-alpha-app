const { Pool } = require('pg');

// Plutôt que créer et connecté un Client
// On va plutôt créer un "pool" de client et laisser notre module manager les connexions
// de plusieurs client en fonction des besoins

// Le package pg étant bien fait, pas besoin de changer aurtre chose.
// l'objet de pool à aussi une méthode query donc le reste de notre code
// continuera de fonctionner

// Comme pour Client les informations de connexion sont lu soit directement à partir de l'env soit donnée en paramêtre

//mode production
//module.exports = new Pool({ connectionString: process.env.RDS_URL });

//mode test stripe webhook
//module.exports = new Pool({ connectionString: process.env.DEV_RDS });

//mode dev
const pool = new Pool({ connectionString: process.env.PG_URL });

module.exports = {
     async query(...params) {
         console.log('SQL:', ...params);
         console.count('req sql :');
         return await pool.query(...params);
     }
 };
