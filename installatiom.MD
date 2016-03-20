install mongoDB service
mkdir c:\data
mkdir c:\data\db
mkdir c:\data\log
"C:\Program Files\MongoDB\Server\3.2\bin\mongod.exe" --config "C:\Program Files\MongoDB\Server\3.2\bin\mongod.cfg" --install

node server