// load dependencies
var fs = require('fs');
var util = require('util');
var marked = require('marked'); // parse markdown into html
var h = require('./lib/helpers.js');

var build = {};
// include header.html file if one exists
build.writeFiles = function(callback) {
  var header = fs.readFileSync(__dirname + '/header.html', 'utf8');
  // include footer.html if it exists
  var footer = fs.readFileSync(__dirname + '/footer.html', 'utf8');
  var html = header;

  h.getPosts(function(err, posts){

    var countdown = posts.length;
    posts.map(function(post){
      console.log('Post title: '+post.title);
      var full = header + marked(post.full) + footer;
      //console.log('full------------>>>>>>>>>>>>>',full,'<<<<<<<<<<<<<<<<<<<<<');
      fs.writeFile(__dirname+'/posts/'+post.slug +'.html', full, function(err){
        console.log('dddd');
      });
      html = html + titleLink(post) + marked(post.intro);
      if(--countdown === 0){
        html = html + footer;
        // summary view:
        fs.writeFile(__dirname+'/index.html', html, function(err){
          console.log('done');
        });

      }
    });
  });

  // need to use a Template Lib for this!!
  function titleLink(post) {
    return '<h1><a href="/posts/'+post.slug+'.html">'+post.title+'</a></h1>';
  }

  // output everything into index.html
  // output each post into its respective post-name.html
};

module.exports = build;
