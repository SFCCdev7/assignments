'use strict';

const server = require('server');

var URLUtils = require('dw/web/URLUtils');
var ArrayList = require('dw/util/ArrayList');
var ProductMgr = require('dw/catalog/ProductMgr');

function checkUserIsAuthent(req, res, next) {
    if (!customer.authenticated) res.redirect(URLUtils.url('Login-Show'));
    next();
}

server.get('Start', function(req, res, next) {
    var productList = new ArrayList();
    productList.add(ProductMgr.getProduct('P2604'));
    productList.add(ProductMgr.getProduct('008884303989M'));
    productList.add(ProductMgr.getProduct('008884303996M'));
    productList.add(ProductMgr.getProduct('008884304009M'));
    res.render('product/productList', { productList: productList });
    next();
});

server.get('ContentAsset', function(req, res, next) {
    res.render('training/renderingTemplate');
    next();
});

server.get('SitePreferenceProductList', function(req, res, next) {
    var productModel = require('../models/product');
    var productList = productModel();
    res.render('product/productList', { productList: productList })
    next();
});

server.get('Redirect', function(req, res, next) {
    var redirectURL = request.httpCookies['redirectURL'] && request.httpCookies['redirectURL'].value;
    res.render('product/productSlotTemplate', { redirectURL: redirectURL })
    next();
});

server.get('Show', checkUserIsAuthent, function(req, res, next) {
    res.json();
    next();
});

server.get('RemoteInclude', function(req, res, next) {
    res.render('product/remoteIncludeTemplate');
    next();
});

server.get('CustomerOrders', checkUserIsAuthent, function(req, res, next) {
    var orderListModel = require('../models/orderList');
    var orderList = orderListModel();
    res.render('order/orderList', { orderList: orderList });
    next();
});

server.get('CustomObj', function(req, res, next) {
    require('../models/customObj')(req, res);
    res.json();
    next();
});

//server.get('QuotaOverride', function(req, res, next){
//	var al = new ArrayList();
//	for(let i = 0; i == 20000; i++){
//		al.add(i);
//	}
//	
//	session.custom.qwerasdftyuighjkoplmnbvzxcdsfielsdfjkjjsdfjsldjffsdfjsdfjbytcdd = 7;
//	
//	res.json();
//	next();
//});

server.get('Mail', function(req, res, next) {
    var emailHelpers = require('*/cartridge/scripts/helpers/emailHelpers');
    var ContentMgr = require('dw/content/ContentMgr');
    var contentForMail = ContentMgr.getContent('test2_assignment');

    var mailId = req.querystring.mail;
    if (!mailId) {
        res.json({ Error: 'Please provide mail id' });
        next();
        return;
    }

    var emailObj = {
        from: mailId,
        subject: 'Ignore, it is test mail',
        to: 'sasikumar.siddarajappa@merklecxm.com'
    };
    var template = 'mail/contentAsset2';
    var context = { name: 'sasikumar', contentAssetBody: contentForMail };

    emailHelpers.send(emailObj, template, context);
    res.render('mail/contentAsset2', context);
    res.json();
    next();
});

module.exports = server.exports();