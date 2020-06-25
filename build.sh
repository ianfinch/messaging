#!/bin/bash

git clone https://github.com/bramp/js-sequence-diagrams.git
bower install js-sequence-diagrams

mkdir public
cp index.html public/
cp style.css public/
