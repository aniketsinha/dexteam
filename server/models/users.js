var db = require('../db')
var itemsObj = require('../models/items')

const FETCH_ALL = "SELECT * from users";
const FETCH_ORDERS_OF_DAY = "SELECT * from order_data where customer_id='$customer_id' and delivered_time>= 'yyyymmdd 00:00:00' and delivered_time<= 'yyyymmdd 23:59:59'";
const FETCH_ALL_FOR_USER = "SELECT * from order_data where customer_id='$customer_id'";

exports.fetchAll = function(done) {
    db.get().query(FETCH_ALL, function (err, rows) {
        if(err) {
            return done(err);
        }
        done(rows);
    });
};

exports.fetchOrderOfDay = function(customerId, dayStr, done) {
    sql_query = FETCH_ORDERS_OF_DAY.replace('$customer_id', customerId).replace(/yyyymmdd/g, dayStr);
    db.get().query(sql_query, function (err, rows) {
        if(err) {
            return done(err);
        }
        that_obj = {
            allRows : []
        };
        rows.forEach(function (order) {
            // order.test1 ='test2';
            // order.bbb = 'ccc';
            self = order;
            itemsObj.fetchTheseItems(JSON.parse(order.items), order, function (data, baap) {
                order.aaaaa = "ppppp";
                baap.abc = data;
                console.log("args 0" + arguments[0])
                console.log("args 1" + arguments[1])
                arguments[1]["kuchbhi"] = "kuchbhi";
                self["aaa"] = "aaa";
                console.log("self = " + JSON.stringify(self));
                console.log("order= " + JSON.stringify(order));
                order.new_items = JSON.stringify(data);
                self.new_items1 = JSON.stringify(data);
                // var a = 1;
                that_obj.allRows.push(self);
            })
        });
        // done(that_obj).then();
        done(rows);
    });
};

exports.userSummary = function (customerId, done) {
    sql_query = FETCH_ALL_FOR_USER.replace('$customer_id', customerId);
    db.get().query(sql_query, function (err, rows) {
        if(err) {
            return done(err);
        }
        insights = {
            "total_order": rows.length,
        };
        // for(int i=0)
        done(rows);
    });

};


