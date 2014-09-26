'use strict';
module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-express-server');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-mocha');
  grunt.loadNpmTasks('grunt-simple-mocha');
  grunt.loadNpmTasks('grunt-karma');

  var allJavaScriptFilePaths = ['app/js/**/*.js','models/**/*.js','routes/**/*.js', 'server.js'];

  grunt.initConfig({
    clean: {
      dev: {
        src: 'build/'
      },
      frontend: {
        expand: true,
        cwd: 'build/',
        src: ['**/*.html', 'css/**/*.*']
      },
      dist: {
        src: 'dist/'
      }
    },

    copy: {
      dev: {
        expand: true,
        cwd: 'app/',
        src: ['*.html', 'css/**/*.*', 'views/**/*.html'],
        dest: 'build/',
        filter: 'isFile'
      },
      distfonts: {
        expand: true,
        cwd: 'app/css/fonts/',
        src: '**/*',
        dest: 'dist/css/fonts/',
        filter: 'isFile'
      }
    },

    jshint: {
      all: allJavaScriptFilePaths,
      options: {
        jshintrc: true
      }
    },

    browserify: {
      dev: {
        options: {
          transform: ['debowerify', 'browserify-ngannotate'],
          debug: true
        },
        src: ['app/js/**/*.js'],
        dest: 'build/bundle.js'
      },
      angulartest: {
        options: {
          transform: ['debowerify'],
          debug: true
        },
        src: ['test/angular/**/*test.js'],
        dest: 'test/angular-testbundle.js'
      }
    },

    karma: {
      unit: {
        configFile: 'karma.conf.js',
      },
      continuous: {
        configFile: 'karma.conf.js',
        singleRun: true,
        browsers: [ 'PhantomJS' ]
      }
    },

    simplemocha: {
      all: {
        src: ['test/mocha/api/**/*.js']
      }
    },

    uglify: {
      options: {
        mangle: false
      },
      dist: {
        files: {
          'dist/bundle.js': ['build/bundle.js']
        }
      }
    },

    htmlmin: {
      dist: {
        options: {
          removeComments: true,
          collapseWhitespace: true
        },
        files: [{
          expand: true,
          cwd: 'app/',
          src: ['*.html', 'views/**/*.html'],
          dest: 'dist'
        }]
      }
    },
    cssmin: {
      dist: {
        files: [{
          expand: true,
          cwd: 'app/css/',
          src: ['**/*.css'],
          dest: 'dist/css/'
        }]
      }
    },

    express: {
      options: {
        port: 3000
      },
      dev: {
        options: {
          script: 'server.js'
        }
      }
    },

    watch: {
      dev: {
        files: ['server.js', 'routes/**/*.js', 'app/js/**/*', 'app/**/*.html', 'app/css/**/*'],
        tasks: ['build']
      },
      frontend: {
        files: ['server.js', 'routes/**/*.js', 'app/js/**/*', 'app/**/*.html', 'app/css/**/*'],
        tasks: ['build:frontend']
      }

    }
  });
  grunt.registerTask('build', ['clean:dev', 'browserify:dev', 'copy:dev']);
  grunt.registerTask('build:frontend', ['clean:frontend', 'copy:dev']);
  grunt.registerTask('default', ['build', 'express:dev', 'watch:dev']);
  grunt.registerTask('serve', ['default']);
  grunt.registerTask('frontend', ['build:frontend', 'express:dev', 'watch:frontend']);
  grunt.registerTask('test', ['jshint', 'browserify:angulartest', 'simplemocha', 'karma:unit']);
  grunt.registerTask('shrink', ['browserify:dev', 'uglify', 'htmlmin:dist', 'cssmin:dist']);
  grunt.registerTask('production', ['clean:dist', 'shrink', 'copy:distfonts']);
};
