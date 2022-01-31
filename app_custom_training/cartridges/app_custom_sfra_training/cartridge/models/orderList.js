'use strict';

var ArrayList = require('dw/util/ArrayList');

function getOrderListOfCustomer() {
    var orders = new ArrayList();
    var orderList = customer.orderHistory.getOrders();
    while (orderList && orderList.hasNext()) {
        let order = orderList.next();
        let orderDetails = {
            orderId: order.orderNo,
            shippingAddrFName: order.shipments[0].shippingAddress.firstName,
            shippingAddrLName: order.shipments[0].shippingAddress.lastName,
            mail: order.customerEmail,
        };
        orders.add(orderDetails);
    }
    return orders;
}

module.exports = getOrderListOfCustomer;