#!/bin/bash

echo '' > data.txt
node random.js
for ((i = 0; i < 100; i++))
do
   node $1;
done

