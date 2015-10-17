# grunt-antrol-staticversion

> add static version for static files

## Getting Started
This plugin requires Grunt `~0.4.0`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-antrol-staticversion --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-antrol-staticversion');
```

## The "staticversion" task

### Overview
In your project's Gruntfile, add a section named `staticversion` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  staticversion: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
})
```

### Options

#### options.staticDir

Type: `String`
Default value: `"public"`

staticDir is the directory to find file extension of static files.These extension files will add static version in template.



#### options.pathPre

Type: `String`
Default value: `"/resources/"`

pathPre is the path of the file in template.For example , the script path is /resources/scripts/page/search.js , the pathPre would be /resources/.

#### options.scriptDir

Type: `String`

The directory of the script files , use the directory to find maximum number of the splited files.


#### options.staticVersion
Default value: new Date().getTime()

Type: `String|Number`

you can specify the version to add in template.



### Usage Examples

```js
grunt.initConfig({
    staticversion : {
      dest : {
          options:{
              staticDir:path.resolve(__dirname , "public"),
              pathPre:"/resources/",
              staticVersion: grunt.option("staticversion") || new Date().getTime()
          },
          files : [{
              cwd : '<%= yeoman.dist %>/views',
              src : ['**/*.dot'],
              expand : true,
              dest : '<%= yeoman.dist %>/views'
          },{
              cwd : '<%= yeoman.dist %>/scripts',
              src : ['**/*.js'],
              expand : true,
              dest : '<%= yeoman.dist %>/scripts'
          },{
              cwd : '<%= yeoman.dist %>/styles',
              src : ['**/*.css'],
              expand : true,
              dest : '<%= yeoman.dist %>/styles'
          }]
      }
    }
})
```



**October 17st, 2015** `0.1.0`

First Release Version.
