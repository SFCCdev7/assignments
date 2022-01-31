'use strict';

var Site = require('dw/system/Site');
var ArrayList = require('dw/util/ArrayList');
var ProductMgr = require('dw/catalog/ProductMgr');

 var getSitePrefProduct = function(){
	 var currentSite = Site.getCurrent();
	 var customPreferenceValue = currentSite.getCustomPreferenceValue('productIds');
	 var productList = new ArrayList();
	 
	 if(!customPreferenceValue && customPreferenceValue.length < 1) return null;
	 customPreferenceValue.forEach(function(productId){
		 var product = ProductMgr.getProduct(productId);
		 if(product !== null){
			 productList.add(product);
		 }
	 })
     return productList;
 }

module.exports = getSitePrefProduct;