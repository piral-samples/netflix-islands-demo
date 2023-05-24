#!/bin/bash

cd netflix-browse-pilet
npm run deploy
rm *.tgz
cd ..

cd netflix-favorites-pilet
npm run deploy
rm *.tgz
cd ..

cd netflix-profile-pilet
npm run deploy
rm *.tgz
cd ..

cd netflix-search-pilet
npm run deploy
rm *.tgz
cd ..

cd netflix-watch-pilet
npm run deploy
rm *.tgz
cd ..
