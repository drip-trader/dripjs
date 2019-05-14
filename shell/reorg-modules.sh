for i in dist/node_modules/@dripjs/*;
 do mkdir $i/dist; mv -f $i/* "$i/dist" 2>/dev/null; true
done