module.exports = function(grunt){
	// Set up the configuraton object.
	var config = {};

	// All tasks that must be loaded.
	var tasks = [
			"grunt-contrib-jshint"
		, "grunt-contrib-watch"
		, "grunt-contrib-concat"
		, "grunt-contrib-uglify"
		, "grunt-contrib-sass"
	];

	// Concat ===========================================================
	var concat;
	config.concat = concat = {};

	concat.dev = {
		files: {
			"assets/javascripts/myapp.dev.js": [
					"assets/javascripts/jquery.js"
				,	"assets/javascripts/tipuesearch.js"
				, "assets/javascripts/tipuesearch_set.js"
				, "assets/javascripts/scripts.js"
			]
		}
	};


	// JShint ===========================================================
	var jshint;
	config.jshint = jshint = {};

	jshint.dist = {
		options: {
				strict: true
			, laxcomma: true
			, sub: true
		},
		files: {all: ["assets/javascripts/scripts.js"]}
	};

	jshint.dev = {
		options: {
				strict: true
			, laxcomma: true
			, sub: true
			, debug: true
		},
		files: {all: ["assets/javascripts/scripts.js"]}
	};

	// Uglify ===========================================================
	config.uglify = {dist: {
		options: {
			sourceMap: true,
      sourceMapName: "assets/javascripts/myapp.map"
		},
		files: {
			"assets/javascripts/myapp.dist.js": ["assets/javascripts/myapp.dev.js"]
		}
	}}

	// Sass =============================================================
	var sass;
	config.sass = sass = {};

	sass.dist = {
			options: {style: "compressed"}
		, files: {
			"assets/stylesheets/style.dist.css": "scss/style.scss"
		}
	};

	sass.dev = {
			options: {style: "expanded", lineNumber: true}
		, files: {
			"assets/stylesheets/style.dev.css": "scss/style.scss"
		}
	};


	// Watch ============================================================
	config.watch = {
		scripts: {
				files: ["assets/javascripts/scripts.js", "scss/**/*.scss"]
			, tasks: ["dev"]
		}
	};

	// Register custom tasks ============================================
	grunt.registerTask("default", ["dev"]);
	grunt.registerTask("dev", ["jshint:dev", "concat:dev", "sass:dev"]);
	grunt.registerTask("dist", ["jshint:dist", "concat:dev", "uglify", "sass"]);

	// General setup ====================================================
	grunt.initConfig(config);
	tasks.forEach(grunt.loadNpmTasks);
};