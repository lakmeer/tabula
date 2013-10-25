module.exports = (grunt) ->

  bourbon = require 'node-bourbon'
  loadAll = require 'load-grunt-tasks'

  grunt.initConfig
    pkg: grunt.file.readJSON 'package.json'

    sass:
      default:
        options: loadPath: bourbon.includePaths[0]
        files:
          'css/style.css' : [ 'src/styles/index.scss' ]

    browserify:
      default:
        files:
          'bin/app.js' : [ 'src/script/index.ls' ]
        options:
          debug: on
          verbose: yes
          transform: ['liveify']
          alias: './src/script/modules/log.ls:log,./src/script/helpers/index.ls:helpers'
          aliasMappings:
            cwd: 'src/script'
            src: '**/*.ls'
            dest: ''

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
        tasks: 'browserify'
      less:
        files: [ 'src/styles/**/*.less' ]
        tasks: 'less'
      sass:
        files: [ 'src/styles/**/*.scss' ]
        tasks: 'sass'


  loadAll grunt

  grunt.registerTask 'default', [ 'sass', 'browserify' ]
  grunt.registerTask 'compile', [ 'less', 'browserify', 'uglify' ]

