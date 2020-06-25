#!/bin/bash

git clone https://github.com/bramp/js-sequence-diagrams.git
bower install js-sequence-diagrams

mkdir public

cp index.html public/
cp style.css public/

cp bower_components/bower-webfontloader/webfont.js public/
cp bower_components/snap.svg/dist/snap.svg-min.js public/
cp bower_components/underscore/underscore-min.js public/
cp bower_components/js-sequence-diagrams/dist/sequence-diagram-min.js public/
cp bower_components/js-sequence-diagrams/dist/sequence-diagram-min.css public/

cp js-sequence-diagrams/fonts/daniel/danielbd.woff public/
cp js-sequence-diagrams/fonts/daniel/danielbd.woff2 public/
