#!/bin/sh

#slide animation generator

file="assets/css/ring-animation.css"

i=0

cat /dev/null > $file

echo ".animate {" >> $file
echo "    animation: slideA 2s infinite alternate;" >> $file
echo "}" >> $file
echo "@keyframes slideA {" >> $file

for i in `seq 0 100`
do
	j=`expr $i - 15`
	k=`expr $i + 15`
	echo "    $i% { background-image: -webkit-radial-gradient(center, circle, #6ead00, #6ead00 $j%, #cddc39 $i%, #63ad00 $k%); }" >> $file
done

echo "}" >> $file
