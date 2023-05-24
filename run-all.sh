#!/bin/bash

cd netflix-browse-pilet
npm run debug-all &

cd ..

sleep 5

cd netflix-piral
npm start &

cd ..

wait
