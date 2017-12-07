var ObjectID = require('mongodb').ObjectID;
module.exports = function(app, db) {
        app.post('/items/add', (req, res) => {
            var body = JSON.parse(Object.keys(req.body)[0]);
            const details = { name: body.name, price: body.price, tax: body.tax, category: body.category };
            db.collection('items').insert(details, (err, result) => {
                if (err) {
                    res.status(500).json({ error: "ERR_ADD" });
                } else {
                    res.status(200).json({ success: "SCSS_ADD" });
                }
            });
        });
        app.put('/items/edit/:itemId', (req, res) => {
            var body = JSON.parse(Object.keys(req.body)[0]);
            const details = { itemID: req.params.itemId };
            const newData = { name: body.name, price: body.price, tax: body.tax, category: body.category };
            db.collection('items').updateOne(details, newData, (err, scc) => {
                if (err) res.status(500).json({ error: 'ERR_EDT' })
                else res.status(200).json({ success: 'SCSS_EDT' });
            })
        });
        app.post('/bills/add', (req, res) => {
            var body = JSON.parse(Object.keys(req.body)[0]);
            const details = { num: body.num, items: json.parse(body.items), tax: body.tax, discount: body.discount, total: body.total, date: body.date, to: body.to };
            db.collection('bills').insert(details, (err, result) => {
                if (err) {
                    res.status(500).json({ error: "ERR_ADD" });
                } else {
                    res.status(200).json({ success: "SCSS_ADD" });
                }
            });
        });
        app.get('/items/:name', (req, res) => {
            const details = { name: new RegExp('^' + req.params.name + "*") };
            db.collection('items').find(details).toArray((err, scc) => {
                if (err) {
                    res.status(500).json({ error: "ERR_RTRV" });
                } else {
                    res.status(200).json({ success: "SCSS_RTRV", data: scc });
                }
            })
        });

        /*
    => Currently disabled. Because an api hit for searching for an item and then selecting an item is not feasible. While searching, store the retrieved data and on select, apply the price from the result as of now. Will be updated in future
    // app.get('/item/:itemId', (req, res) => {
    //     const details = { itemID: req.params.itemId };
    //     db.collection('items').find(details).toArray((err, scc) => {
    //         if (err) res.status(500).json({ error: 'ERR_RTRV' });
    //         else res.status(200).json({ success: 'SCSS_RTRV', price: scc[0].price });
    //     })
    // });
    app.get('/', (req, res) => {
        res.status(403).json({ error: "FRBDN" });
    });
};