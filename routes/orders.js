var express = require('express');
var router = express.Router();

router.get('/orders', function(req, res) {
  var sql = 'SELECT * FROM orders WHERE user_id = ?';
  req.db.query(sql, req.session.user.id,  function(err, rows) {
    if (err) {
      return res.send(500);
    }

    res.render('orders/orders', {
      app: req.config.app.title,
      title: 'My Orders',
      user: req.session.user,
      orders: rows
    });
  });
});

module.exports = router;
