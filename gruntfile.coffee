
module.exports = (grunt) ->

  grunt.initConfig
    pkg: grunt.file.readJSON 'package.json'

    less:
      'css/style.css' : [ 'src/styles/index.less' ]

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
      css:
        files: [ 'src/styles/**/*.less' ]
        tasks: 'less'

  grunt.loadNpmTasks 'grunt-contrib-watch'
  grunt.loadNpmTasks 'grunt-contrib-less'
  grunt.loadNpmTasks 'grunt-contrib-uglify'
  grunt.loadNpmTasks 'grunt-browserify'

  grunt.registerTask 'default', [ 'less', 'browserify' ]
  grunt.registerTask 'compile', [ 'less', 'browserify', 'uglify' ]

