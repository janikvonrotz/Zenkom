# Zenkom

Zentrale Kommunikationsplattform der vernetzten Fahrzeugsysteme.

issues: https://gitlab.com/janikvonrotz/Zenkom/issues

# MongoDB Export and Import

## users

Export JSON

    mongoexport -h ds121190.mlab.com:21190 -d zenkom -c users -u zenkom -p dp8e36APuASgSWum7uLz -o ./backup/UsersExport.json

## feedbacks

Export JSON

    mongoexport -h ds121190.mlab.com:21190 -d zenkom -c feedbacks -u zenkom -p dp8e36APuASgSWum7uLz -o ./backup/FeedbacksExport.json

## vehicles

Export CSV

    mongoexport -h ds121190.mlab.com:21190 -d zenkom -c vehicles -u zenkom -p dp8e36APuASgSWum7uLz -o ./backup/VehiclesExport.csv --type=csv -f '_id,number,status,modification_until,created_at,created_by,updated_at,updated_by'

Import CSV

    mongoimport -h ds121190.mlab.com:21190 -d zenkom -c vehicles -u zenkom -p dp8e36APuASgSWum7uLz --file ./backup/VehiclesImport.csv --type=csv --headerline

Export JSON

    mongoexport -h ds121190.mlab.com:21190 -d zenkom -c vehicles -u zenkom -p dp8e36APuASgSWum7uLz -o ./backup/VehiclesExport.json

Convert JSON

    Get-Content ./backup/VehiclesImport.csv -First 38 | ConvertFrom-Csv | %{
        $_.created_at = @{'$date' = $_.created_at}
        $_.archived = $false
        $_.number = [int]$_.number
        return $_
    } | %{
        $_ | ConvertTo-Json
    } | Out-File ./backup/VehiclesImport.json -Encoding UTF8

Import JSON

    mongoimport -h ds121190.mlab.com:21190 -d zenkom -c vehicles -u zenkom -p dp8e36APuASgSWum7uLz --file ./backup/VehiclesImport.json

## dfis

Export CSV

    mongoexport -h ds121190.mlab.com:21190 -d zenkom -c dfis -u zenkom -p dp8e36APuASgSWum7uLz -o ./backup/DfisExport.csv --type=csv -f '_id,description,type,row_type,location,notes,created_at,created_by,updated_at,updated_by,archived'

Import CSV

    mongoimport -h ds121190.mlab.com:21190 -d zenkom -c dfis -u zenkom -p dp8e36APuASgSWum7uLz --file ./backup/DfisImport.csv --type=csv --headerline

Export JSON

    mongoexport -h ds121190.mlab.com:21190 -d zenkom -c dfis -u zenkom -p dp8e36APuASgSWum7uLz -o ./backup/DfisExport.json

Convert JSON

    Get-Content ./backup/DfisImport.csv -First 69 | ConvertFrom-Csv | %{
        Write-Host $_.description
        $_.created_at = @{'$date' = $_.created_at}
        $_.archived = $false
        return $_
    } | %{
        $_ | ConvertTo-Json
    } | Out-File ./backup/DfisImport.json -Encoding UTF8

Import JSON

    mongoimport -h ds121190.mlab.com:21190 -d zenkom -c dfis -u zenkom -p dp8e36APuASgSWum7uLz --file ./backup/DfisImport.json

## routers

Export CSV

    mongoexport -h ds121190.mlab.com:21190 -d zenkom -c routers -u zenkom -p dp8e36APuASgSWum7uLz -o ./backup/RoutersExport.csv --type=csv -f '_id,vehicle_id,dfi_id,version,type,serial_number,spos_id,status,ip_router,ip_cashbox,sim1,sim2,sim_itt,phone1,phone2,phone_itt,profile,notes,transport_company,installed_at,created_at,created_by,updated_at,updated_by,archived'

Import CSV

    mongoimport -h ds121190.mlab.com:21190 -d zenkom -c routers -u zenkom -p dp8e36APuASgSWum7uLz --file ./backup/RoutersImport.csv --type=csv --headerline

Export JSON

    mongoexport -h ds121190.mlab.com:21190 -d zenkom -c vehicles -u zenkom -p dp8e36APuASgSWum7uLz -o ./backup/VehiclesExport.json

Convert JSON

    Get-Content ./backup/RoutersImport.csv -First 106 | ConvertFrom-Csv | %{
        Write-Host $_.hostname
        $_.created_at = @{'$date' = $_.created_at}
        $_.installed_at = @{'$date' = $_.installed_at}
        $_ | Add-Member -MemberType NoteProperty -Name 'history' -Value @()   
        $_.archived = $false
        $object = $_
        $_.psobject.properties | where{ ($_.value -eq 0) -and ($_.name -ne "archived") } | %{ $object.($_.name) = "" }
        return $object
    } | %{
        $_ | ConvertTo-Json
    } | Out-File ./backup/RoutersImport.json -Encoding UTF8

Import JSON

    mongoimport -h ds121190.mlab.com:21190 -d zenkom -c routers -u zenkom -p dp8e36APuASgSWum7uLz --file ./backup/RoutersImport.json

# Resources

http://codepen.io/zavoloklom/pen/IGkDz
