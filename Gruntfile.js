module.exports = function(grunt) {

    var globalConfig = {
        src_images : 'FitnessTime/static_dist/images',
        src_styles : 'FitnessTime/static_dist/less',
        src_fonts : 'FitnessTime/static_dist/fonts',
        src_scripts : 'FitnessTime/static_dist/js',
        images : 'FitnessTime/static/images',
        scripts : 'FitnessTime/static/js',
        styles : 'FitnessTime/static/css',
        bower_path : 'bower_components'
    };

    grunt.initConfig({
        globalConfig : globalConfig,
        pkg : grunt.file.readJSON('package.json'),

        //copy : {
        //    main : {
        //        files : [{
        //            expand : true,
        //            flatten : true,
        //            src : '<%= globalConfig.bower_path %>/jquery/dist/jquery.min.js',
        //            dest : '<%= globalConfig.scripts %>/',
        //            filter : 'isFile'
        //        }, {
        //            expand : true,
        //            flatten : true,
        //            src : '<%= globalConfig.bower_path %>/html5shiv/dist/html5shiv.min.js',
        //            dest : '<%= globalConfig.scripts %>/',
        //            filter : 'isFile'
        //        }, {
        //            expand : true,
        //            flatten : true,
        //            src : '<%= globalConfig.bower_path %>/bootstrap/fonts/*',
        //            dest : '<%= globalConfig.fonts %>/',
        //            filter : 'isFile'
        //        }, {
        //            expand : true,
        //            flatten : true,
        //            src : '<%= globalConfig.bower_path %>/respond/dest/respond.min.js',
        //            dest : '<%= globalConfig.scripts %>/',
        //            filter : 'isFile'
        //        }]
        //    }
        //},
        bower_concat: {
            all: {
                dest: {
                    'js': '<%= globalConfig.scripts %>/_bower.js',
                },
                bowerOptions: {
                    relative: false
                }
            }
        },
        less: {
            development: {
                options: {
                    compress: true,  //minifying the result
                },
                files: {
                    "<%= globalConfig.styles %>/base.css":"<%= globalConfig.src_styles %>/base.less"
                }
            }
        },
        watch: {
            gruntfile: {
                files: 'Gruntfile.js',
                //tasks: ['jshint:gruntfile'],
            },
            src: {
                files: ['<%= globalConfig.src_scripts %>/**/*.js', '<%= globalConfig.src_styles %>/**/*.less' ],
                tasks: ['default'],
            }
        }
        //concat: {
        //    //bootstrap: {
        //    //    src: [
        //    //        '<%= globalConfig.bower_path %>/bootstrap/js/transition.js',
        //    //        '<%= globalConfig.bower_path %>/bootstrap/js/alert.js',
        //    //        '<%= globalConfig.bower_path %>/bootstrap/js/button.js',
        //    //        '<%= globalConfig.bower_path %>/bootstrap/js/carousel.js',
        //    //        '<%= globalConfig.bower_path %>/bootstrap/js/collapse.js',
        //    //        '<%= globalConfig.bower_path %>/bootstrap/js/dropdown.js',
        //    //        '<%= globalConfig.bower_path %>/bootstrap/js/modal.js',
        //    //        '<%= globalConfig.bower_path %>/bootstrap/js/tooltip.js',
        //    //        '<%= globalConfig.bower_path %>/bootstrap/js/popover.js',
        //    //        '<%= globalConfig.bower_path %>/bootstrap/js/scrollspy.js',
        //    //        '<%= globalConfig.bower_path %>/bootstrap/js/tab.js',
        //    //        '<%= globalConfig.bower_path %>/bootstrap/js/affix.js'
        //    //    ],
        //    //    dest: '<%= globalConfig.src %>/<%= pkg.name %>.js'
        //    //}
        //},
        //clean : {
        //    js : [
        //        '<%= globalConfig.src %>/<%= pkg.name %>.js',
        //        '<%= globalConfig.scripts %>/<%= pkg.name %>.min.js',
        //        '<%= globalConfig.scripts %>/app.min.js'
        //    ],
        //    css : [
        //        '<%= globalConfig.styles %>/<%= pkg.name %>.min.css',
        //        '<%= globalConfig.styles %>/<%= pkg.name %>-theme.min.css'
        //    ]
        //},
        //less: {
        //    compileCore: {
        //        options : {
        //            paths : ["styles"],
        //            compress : true,
        //            yuicompress : true,
        //            optimization : 2,
        //            cleancss : true
        //        },
        //        src: '<%= globalConfig.bower_path %>/bootstrap/less/bootstrap.less',
        //        dest: '<%= globalConfig.styles %>/<%= pkg.name %>.min.css'
        //    },
        //    compileTheme: {
        //        options : {
        //            paths : ["styles"],
        //            compress : true,
        //            yuicompress : true,
        //            optimization : 2,
        //            cleancss : true
        //        },
        //        src: '<%= globalConfig.src %>/style.less',
        //        dest: '<%= globalConfig.styles %>/<%= pkg.name %>-theme.min.css'
        //    }
        //},
        //uglify: {
        //    options: {
        //        preserveComments: 'some'
        //    },
        //    core: {
        //        src: '<%= concat.bootstrap.dest %>',
        //        dest: '<%= globalConfig.scripts %>/<%= pkg.name %>.min.js'
        //    },
        //    customize: {
        //        src: '<%= globalConfig.src %>/app.js',
        //        dest: '<%= globalConfig.scripts %>/app.min.js'
        //    }
        //}
    });
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-bower-concat');

    // Default task(s).
    grunt.registerTask('default', ['bower_concat', 'less']);
};