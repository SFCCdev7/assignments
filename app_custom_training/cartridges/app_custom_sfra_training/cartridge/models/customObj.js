'use strict';

function upsertProdIds(req, res) {
    var CustomObjectMgr = require('dw/object/CustomObjectMgr');
    var ArrayList = require('dw/util/ArrayList');
    var Transaction = require('dw/system/Transaction');

    var mailId = req.querystring.email || null;
    var productId = req.querystring.pid || null;
    if (!mailId || !productId) return;
    var pIds = new ArrayList();
    var record = CustomObjectMgr.getCustomObject("customObj1", mailId);
    Transaction.wrap(function() {
        if (record && record.custom.productIds) {
            record.custom.productIds.forEach(function(pid) {
                pIds.add(pid)
            });
            pIds.add(productId);
        } else {
            record = CustomObjectMgr.createCustomObject('customObj1', mailId);
            pIds.add(productId);
        }
        record.custom.productIds = pIds;
    });
    return pIds;
    
};

module.exports = upsertProdIds;