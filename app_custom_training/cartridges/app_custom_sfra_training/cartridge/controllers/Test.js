/**
* Description of the Controller and the logic it provides
*
* @module  controllers/Test
*/

'use strict';


/**
* Description of the function
*
* @return {String} The string 'myFunction'
*/
var server = require('server');

server.get('EventTest', function(req, res, next){
	
	next();
},
function(req, res, next){
	res.json({name:'pradeep'});
	this.emit('route:Complete', req, res);
	res.render('test2');
	next();
});
 var myFunction = function(){
     return 'myFunction';
 }
 
 
 
 
 
 server.get('CookieValidate', function(req, res, next){
	 
	 res.render('test3', {
		 cookieValue: cookieValue
	 });
	 next();
 });
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 


module.exports = server.exports();

