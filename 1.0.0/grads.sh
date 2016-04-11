#!/bin/bash



source $HOME/wrf/ext/sourceme
ctlFile=$1
datFile=$2
pngOutput=$3


THISDIR=`pwd`
#THISDIR="$HOME/work"
cd $THISDIR
mkdir outputs
cp $ctlFile . 
cp $datFile .

mv $ctlFile output_ARW.ctl

mv $datFile output_ARW.dat


cat >tmp.gs << EOF
function main(args)

'open output_ARW.ctl'

'set t 1'
'set gxout shaded'

'display T2'
'cbarn'
'printim $PWD/output.png white x1024 y768'
'quit'

return
EOF
sed "s/__sq__/'/g;s/__cn__/\n/g;s/__cr__/\n/g" tmp.gs > script.gs

#cat script.gs
#echo $PWD
                                
#grads -lbc 'run /home/0124000066/galaxy-python/galaxy-dist/tools/wrf/wrfoutput.gs'
#ll $THISDIR/output.png
grads -lbc 'run script.gs'
#echo "*****************$pngOutput*****************"
cp $PWD/output.png $pngOutput
 

