module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    watch: {
      options: {
        livereload: true
      },
      web: {
        files: ["**/*.jade", "**/*.md", "**/*.js"]
      }
    },
    web: {
      options: {
        port: 8001,
				livereload: true
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.registerTask('default', ['web']);
  // grunt.registerTask('default', ['jade:debug', 'web']);
  // grunt.registerTask('publish', ['jade:publish']);

  grunt.registerTask('web', 'Start web server...', function() {
    
		var opts = this.options()
		
		var saz = require('./saz/app.js')
		
		let app = saz.setup(opts)
		saz.serve(opts.port, app)
		
    grunt.task.run(["watch:web"])
  });

};