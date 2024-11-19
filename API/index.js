const express = require('express');
const app = express();
const port = 9000;

const Odoo = require('odoo-await');

const odoo = new Odoo({
	baseUrl: 'localhost',
	port: 8069,
	db: 'Testodoo14',
	username: 'admin',
	password: 'admin'
})

async function readProducts() {
await odoo.connect();

const records = await odoo.searchRead(`product.template`, {}, ['id','name','list_price'], {limit:10});
// return records
// setTimeout(() => {}, 3000);
// console.log(records);
return records
}

// var rec = readProducts();
// console.log(rec);

// .then(client => {
// 	console.log('read = > ', client);
// 	return client.searchRead('product.product', [['list_price', '>', '0']], {limit: 1});
// })
// .then(products => {
// 	console.log(products);
// })
// .catch((error) => {
// 	// assert.isNotOk(error, 'promise error');
// 	// done();
// 	console.error(error);
// })

app.use(function (req, res, next){
	res.setHeader('Access-Control-Allow-Origin', 'http://192.168.43.175:3000');
	next();
});

app.get('/readProducts', async (req,res) => {
	var products = await readProducts();
	console.log(products);
	res.send(JSON.stringify(products));
	// res.send(products);
})

app.listen(port, () => {
	console.log('odoo node api app listening on 9000');
})