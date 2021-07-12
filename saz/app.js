



let setup = (opts) => {
	
	var options = opts
	var express = require('express');
	var cookieParser = require('cookie-parser');

	var path = require('path') ;

	const jade = require('jade');
	const md = require('marked');

	const app = express() ;
	
	(app => {

		// FIRST SETTINGS

		// internationalization before view engine
		// app.use(i18.enable());

		// view engine setup to jade
		app.set('views', path.join(__dirname, '../public', 'jade'));
		app.set('view engine', 'jade');
		// app.set('view cache', true);

		// basic setup
		app.use(express.json());
		app.use(express.urlencoded({ extended: false }));
		app.use(cookieParser());

		app.use(express.static(path.join(__dirname, '../public')));
		
		let merge = (p) => {
			return p;
		}
		let params = {
			md:md
		} ;
		let root = async(req, res) => {
			// topsections = topsections || await fetchdata(req, res, 'navdatas').catch( err => {console.log(err)}) ;
			// topsections = await fetchdata(req, res, 'navdatas').catch(err => { console.log(err) });
			// let loadedLangs = await Object.keys(i18next.services.resourceStore.data);
			// console.log(res)
			
			res.render(path.join(__dirname, '../public/jade/index'), merge(params, {
					// langs: loadedLangs,
					// lang: req.i18n.language,
					// t: req.t,
					// topsections: topsections
					md:md
			}));
			
		}
		
		
		app.use('/', async(req, res) => {
			// console.log('requesting home') ;
			await root(req, res).catch(err => { console.log(err) });
	
		});
	
		
	})(app);
	
	return app
}

let serve = (port, app) => {
	
	var http = require('http') ;
	let server = http.createServer(app) ;

	server.on('listening', () => {
		console.log('Listening on ' + port, server.address()) ;
		
	}) ;

	server.listen(port) ;
	
	return server
}


module.exports = {
	setup:setup,
	serve:serve
}

