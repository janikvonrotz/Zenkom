# chmod +x build.sh
rm -rf .build
forever stopall
meteor build .build
tar -zxf .build/Zenkom.tar.gz -C .build
cd .build/bundle/programs/server
npm install --production
cd ../..
MONGO_URL='mongodb://zenkom:dp8e36APuASgSWum7uLz@ds121190.mlab.com:21190/zenkom' ROOT_URL='https://zenkom.bitsherpa.com' METEOR_SETTINGS=$(cat ../../settings-dev.json) PORT=3000 forever start main.js

# npm --prefix .build/bundle/programs/server/ install --production .build/bundle/programs/server/
# npm install -g json
# json -I -f package.json -e "this.main='../../main.js'"
# json -I -f package.json -e "this.scripts={ start: 'node ../../main' }"
# export MONGO_URL='mongodb://zenkom:dp8e36APuASgSWum7uLz@ds121190.mlab.com:21190/zenkom'
# export ROOT_URL='https://zenkom.bitsherpa.com'
# export METEOR_SETTINGS=$(cat ../../settings-dev.json)
# export PORT=3000
# node .build/bundle/server/main.js
# node main.js
# sudo npm install forever -g
# forever start main.js
# forever stopall
