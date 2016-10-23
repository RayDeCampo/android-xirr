module.exports = function (grunt) {
    'use strict';

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json')
    });
    require('jit-grunt')(grunt);

    /////////////////////////// JSHINT ///////////////////////////////////////
    grunt.config('jshint', {
        options: {
            browser: true,
            browserify: true,
            eqeqeq: true,
            node: true,
            strict: true,
            undef: true,
            unused: 'vars'
        },
        all: ['src/**/*.js', 'Gruntfile.js']
    });

    /////////////////////////// BROSWERIFY ///////////////////////////////////
    grunt.config('browserify', {
        browserify: {
            files: [{
                src: ['src/js/index.js'],
                dest: 'app/www/js/index.js'
            }]
        },
    });

    /////////////////////////// EXEC ////////////////////////////////////////
    grunt.config('exec', {
        'cordova-prepare': {
            cwd: 'app',
            command: 'cordova prepare'
        },
        'cordova-release': {
            cwd: 'app',
            command: 'cordova build android --release'
        }
    });


    grunt.config('watch', {
        js: {
            files: ['src/**/*.js'],
            tasks: ['jshint', 'browserify', 'exec:cordova-prepare']
        },
        www: {
            files: ['app/www/**'],
            tasks: ['exec:cordova-prepare']
        }
    });

    grunt.registerTask('default', ['jshint', 'browserify', 'exec:cordova-prepare', 'watch']);
    grunt.registerTask('release', ['jshint', 'browserify', 'exec:cordova-release']);
};
