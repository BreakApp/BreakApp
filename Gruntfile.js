'use strict';
module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-env');
  grunt.loadNpmTasks('grunt-express-server');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-mocha');
  grunt.loadNpmTasks('grunt-simple-mocha');

  var allJavaScriptFilePaths = ['app/js/**/*.js','models/**/*.js','routes/**/*.js', 'server.js'];

  grunt.initConfig({
    env: {
      dev: {
        MONGO_URL: 'mongodb://localhost/breaks',
        STATIC_DIR: '/build'
      },
      dist: {
        MONGO_URL: 'mongodb://localhost/breaks',
        STATIC_DIR: '/dist'
      }
    },

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
        src: ['*.html', '*.ico', 'css/**/*.*', 'views/**/*.html', 'js/clock-notification.js'],
        dest: 'build/',
        filter: 'isFile'
      },
      dist: {
        expand: true,
        cwd: 'app/',
        src: ['css/fonts/**/*', 'css/**/*.jpg', '*.ico'],
        dest: 'dist/',
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
          'dist/bundle.js': ['build/bundle.js'],
          'dist/js/clock-notification.js': ['app/js/clock-notification.js']
        }
      }
    },

    htmlmin: {
      dist: {
        options: {
          removeComments: true,
          minifyJS: true
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
      dev: {
        files: {
          'build/css/cssbundle.min.css': ['app/css/**/*.css']
        }
      },
      dist: {
        files: {
          'dist/css/cssbundle.min.css': ['app/css/**/*.css']
        }
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
      },
      dist: {
        files: ['server.js', 'routes/**/*.js', 'app/js/**/*', 'app/**/*.html', 'app/css/**/*'],
        tasks: ['shrink']
      }
    }
  });

  grunt.registerTask('build', ['clean:dev', 'browserify:dev', 'copy:dev', 'cssmin:dev']);
  grunt.registerTask('build:frontend', ['clean:frontend', 'copy:dev', 'cssmin:dev']);
  grunt.registerTask('default', ['env:dev', 'build', 'express:dev', 'watch:dev']);
  grunt.registerTask('serve', ['default']);
  grunt.registerTask('frontend', ['env:dev', 'build:frontend', 'express:dev', 'watch:frontend']);
  grunt.registerTask('test', ['jshint', 'browserify:angulartest', 'simplemocha', 'karma:unit']);
  grunt.registerTask('shrink', ['clean:dist', 'browserify:dev', 'uglify', 'htmlmin:dist', 'cssmin:dist', 'copy:dist']);
  grunt.registerTask('production', ['env:dist', 'shrink', 'express:dev', 'watch:dist']);
};
