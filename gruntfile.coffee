
module.exports = (grunt) ->

  grunt.initConfig
    pkg: grunt.file.readJSON 'package.json'

    less:
      'css/style.css' : [ 'src/styles/index.less' ]

    browserify:
      files:
        'bin/app.js' : [ 'src/index.js' ]

    ###
    coexist:
      options: verbose: yes
      'bin/app.js' : [

        # Prelude, and then setup goes first
        'src/lib/prelude.min.js'
        'src/init/setup.ls'
        'src/classes/pubsub.ls'

        # Then external libs
        'src/lib/*'
        '!src/lib/modernizr.js'

        # Then all source files (in this order)
        'src/init/*'
        'src/classes/*'
        'src/templates/*'
        'src/widgets/*'
        'src/pages/*'
      ]

      'bin/modernizr.js' : [ 'src/lib/modernizr.js' ]
    ###

    uglify:
      options:
        verbose: yes
        banner: '/*! <%= pkg.description %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
        preserveComments: 'some'
      'bin/app.min.js': [ 'bin/app.js' ]
      'bin/modernizr.min.js': [ 'bin/modernizr.js' ]

    watch:
      coexist:
        files: [ 'src/**/*.ls', 'src/**/*.js', 'src/**/*.coffee' ]
        tasks: 'coexist'
      css:
        files: [ 'src/styles/**/*.less' ]
        tasks: 'less'


  grunt.loadNpmTasks 'grunt-contrib-watch'
  grunt.loadNpmTasks 'grunt-contrib-less'
  grunt.loadNpmTasks 'grunt-contrib-uglify'
  grunt.loadNpmTasks 'grunt-browserify'
  grunt.loadNpmTasks 'grunt-coexist'

  grunt.registerTask 'develop', [ 'less', 'browserify' ]
  grunt.registerTask 'compile', [ 'less', 'browserify', 'uglify' ]

