webpack
ipdo=192.241.240.169
dest=bearzx@$ipdo:/var/www/bearzx.com/ds.js
scp -r out/ $dest
scp -r samples/ $dest
# scp -r data/ bearzx@$ipdo:/var/www/bearzx.com/ds.js
scp libs/selector-gadget/selectorgadget_combined.css $dest/out
scp libs/selector-gadget/selectorgadget_combined.js $dest/out
scp libs/jshint.js $dest/out
scp tmp/vega/vega.js $dest/out
