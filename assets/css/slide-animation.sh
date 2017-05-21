#!/bin/sh

#slide animation generator

file="assets/css/slide-animation.css"

i=0

cat /dev/null > $file

echo ".animate {" >> $file
echo "    animation: slideA 4s infinite;" >> $file
echo "}" >> $file
echo "@keyframes slideA {" >> $file

for i in `seq 0 100`
do
	j=`expr $i - 15`
	k=`expr $i + 15`
	echo "    $i% { background-image: -webkit-linear-gradient(left, #6ead00, #6ead00 $j%, #cddc39 $i%, #63ad00 $k%); }" >> $file
done

echo "}" >> $file
