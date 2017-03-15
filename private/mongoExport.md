# vehicles

Export CSV

    mongoexport -h ds121190.mlab.com:21190 -d zenkom -c vehicles -u zenkom -p dp8e36APuASgSWum7uLz -o ./backup/VehiclesExport.csv --type=csv -f '_id,number,status,modification_until,created_at,created_by,updated_at,updated_by'

Import CSV

    mongoimport -h ds121190.mlab.com:21190 -d zenkom -c vehicles -u zenkom -p dp8e36APuASgSWum7uLz --file ./backup/VehiclesImport.csv --type=csv --headerline

Export JSON

    mongoexport -h ds121190.mlab.com:21190 -d zenkom -c vehicles -u zenkom -p dp8e36APuASgSWum7uLz -o ./backup/VehiclesExport.json

Convert JSON

    Get-Content ./backup/VehiclesImport.csv -First 38 | ConvertFrom-Csv | %{
        $_.created_at = @{'$date' = $_.created_at}
        return $_
    } | %{
        $_ | ConvertTo-Json
    } | Out-File ./backup/VehiclesImport.json -Encoding UTF8

Import JSON

    mongoimport -h ds121190.mlab.com:21190 -d zenkom -c vehicles -u zenkom -p dp8e36APuASgSWum7uLz --file ./backup/VehiclesImport.json

# routers

Export CSV

    mongoexport -h ds121190.mlab.com:21190 -d zenkom -c routers -u zenkom -p dp8e36APuASgSWum7uLz -o ./backup/RoutersExport.csv --type=csv -f '_id,vehicle_id,dfi_name,router_version,type,serial_number,spos_id,status,ip_router,ip_cashbox,sim1,sim2,sim_itt,phone1,phone2,phone_itt,profile,notes,transport_company,installed_at,created_at,created_by,updated_at,updated_by,archived'

Import CSV

    mongoimport -h ds121190.mlab.com:21190 -d zenkom -c routers -u zenkom -p dp8e36APuASgSWum7uLz --file ./backup/RoutersImport.csv --type=csv --headerline

Export JSON

    mongoexport -h ds121190.mlab.com:21190 -d zenkom -c vehicles -u zenkom -p dp8e36APuASgSWum7uLz -o ./backup/VehiclesExport.json

Convert JSON

    Get-Content ./backup/RoutersImport.csv -First 38 | ConvertFrom-Csv | %{
        $_.created_at = @{'$date' = $_.created_at}
        $_.installed_at = @{'$date' = $_.installed_at}
        return $_
    } | %{
        $_ | ConvertTo-Json
    } | Out-File ./backup/RoutersImport.json -Encoding UTF8

Import JSON

    mongoimport -h ds121190.mlab.com:21190 -d zenkom -c routers -u zenkom -p dp8e36APuASgSWum7uLz --file ./backup/RoutersImport.json
