Invoke-WebRequest -Uri "http://www.oev-live.ch/zabbix/api_jsonrpc.php" 
-Method "POST" 
-ContentType "application/json-rpc"
-Body '{"jsonrpc":"2.0","method":"apiinfo.version","id":1,"auth":null,"params":{}}'