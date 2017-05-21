#!/usr/bin/python

#slide animation generator

print ".animate {"
print "    animation: slideA 4s infinite alternate;"
print "}"
print "@keyframes slideA {"

for i in range(0,101):
	print '    '+str(i)+'% { background-image: -webkit-linear-gradient(left, #6ead00, #6ead00 '+str(i-15)+'%, #cddc39 '+str(i)+'%, #63ad00 '+str(i+15)+'%);}'

print "}"
