export default function testInitialState() {
    return {
        "warehouse":
            {"id":1,"name":"warehouse_01","rows":4,"columns":4},
        "tempWarehouse":null,
        "products":[
            {"product_id":8,"coordinates":"00_00","pallet_id":6,"lot_code":"AUSN121001","seed_type":"ryegrass","seed_variety":"wimmera","bag_size":"25.00","number_of_bags":"40.00"},
            {"product_id":3,"coordinates":"01_00","pallet_id":3,"lot_code":"AUSN121006","seed_type":"barley","seed_variety":"dictator 2","bag_size":"25.00","number_of_bags":"40.00"},
            {"product_id":38,"coordinates":"00_00","pallet_id":31,"lot_code":"AUSN121013","seed_type":"ryegrass","seed_variety":"wimmera","bag_size":"10.00","number_of_bags":"10.00"},
            {"product_id":9,"coordinates":"02_00","pallet_id":7,"lot_code":"AUSN121013","seed_type":"ryegrass","seed_variety":"wimmera","bag_size":"20.00","number_of_bags":"9.00"},
            {"product_id":7,"coordinates":"03_00","pallet_id":5,"lot_code":"AUSN121020","seed_type":"clover","seed_variety":"blackhawk","bag_size":"25.00","number_of_bags":"4.00"},
            {"product_id":108,"coordinates":"03_00","pallet_id":74,"lot_code":"AUSN121020","seed_type":"clover","seed_variety":"blackhawk","bag_size":"1.00","number_of_bags":"1.00"},
            {"product_id":109,"coordinates":"03_00","pallet_id":74,"lot_code":"AUSN121020","seed_type":"clover","seed_variety":"blackhawk","bag_size":"11.00","number_of_bags":"1.00"},
            {"product_id":112,"coordinates":"03_01","pallet_id":75,"lot_code":"AUSN121020","seed_type":"clover","seed_variety":"blackhawk","bag_size":"1.00","number_of_bags":"1.00"},
            {"product_id":116,"coordinates":"03_01","pallet_id":77,"lot_code":"AUSN121020","seed_type":"clover","seed_variety":"blackhawk","bag_size":"1.00","number_of_bags":"1.00"},
            {"product_id":13,"coordinates":"01_02","pallet_id":10,"lot_code":"AUSN121004","seed_type":"oats","seed_variety":"saia","bag_size":"25.00","number_of_bags":"40.00"},
            {"product_id":12,"coordinates":"03_02","pallet_id":9,"lot_code":"AUSN121018","seed_type":"clover","seed_variety":"arrowleaf","bag_size":"20.00","number_of_bags":"50.00"},
            {"product_id":80,"coordinates":"03_03","pallet_id":59,"lot_code":"AUSN121006","seed_type":"barley","seed_variety":"dictator 2","bag_size":"11.00","number_of_bags":"2.00"}],
        "locations":[
            [
            {"coordinates":"00_00","category":"allocated_storage","pallets_on_location":[31,6]},
            {"coordinates":"01_00","category":"allocated_storage","pallets_on_location":[3]},
            {"coordinates":"02_00","category":"allocated_storage","pallets_on_location":[7]},
            {"coordinates":"03_00","category":"allocated_storage","pallets_on_location":[74]}
        ],[
            {"coordinates":"00_01","category":"allocated_storage","pallets_on_location":[63]},
            {"coordinates":"01_01","category":"allocated_storage","pallets_on_location":[null]},
            {"coordinates":"02_01","category":"allocated_storage","pallets_on_location":[null]},
            {"coordinates":"03_01","category":"allocated_storage","pallets_on_location":[75,77]}
        ],[
            {"coordinates":"00_02","category":"inaccessible","pallets_on_location":[null]},
            {"coordinates":"01_02","category":"allocated_storage","pallets_on_location":[10]},
            {"coordinates":"02_02","category":"inaccessible","pallets_on_location":[null]},
            {"coordinates":"03_02","category":"allocated_storage","pallets_on_location":[9,1]}
        ],[
            {"coordinates":"00_03","category":"inaccessible","pallets_on_location":[null]},
            {"coordinates":"01_03","category":"spare_floor","pallets_on_location":[null]},
            {"coordinates":"02_03","category":"spare_floor","pallets_on_location":[11]},
            {"coordinates":"03_03","category":"spare_floor","pallets_on_location":[59]}
        ]
        ],
        "seeds":[
        {"type":"oats","variety":"variety not stated"},
        {"type":"oats","variety":"wintaroo"},
        {"type":"oats","variety":"saia"},
        {"type":"oats","variety":"yarran"},
        {"type":"oats","variety":"bronco"},
        {"type":"barley","variety":"variety not stated"},
        {"type":"barley","variety":"dictator 2"},
        {"type":"barley","variety":"kraken"},
        {"type":"barley","variety":"moby"},
        {"type":"wheat","variety":"variety not stated"},
        {"type":"wheat","variety":"illabo"},
        {"type":"ryegrass","variety":"variety not stated"},
        {"type":"ryegrass","variety":"wimmera"},
        {"type":"ryegrass","variety":"tetila"},
        {"type":"millet","variety":"variety not stated"},
        {"type":"millet","variety":"rebound"},
        {"type":"canola","variety":"variety not stated"},
        {"type":"canola","variety":"pioneer"},
        {"type":"canola","variety":"phoenix"},
        {"type":"clover","variety":"variety not stated"},
        {"type":"clover","variety":"arrowleaf"},
        {"type":"clover","variety":"blackhawk"}
        ],
        "lots":[
        {"lot_code":"AUSN121002","seed_type":"oats","seed_variety":"wintaroo"},
        {"lot_code":"AUSN121005","seed_type":"oats","seed_variety":"saia"},
        {"lot_code":"AUSN121004","seed_type":"oats","seed_variety":"saia"},
        {"lot_code":"AUSN121003","seed_type":"oats","seed_variety":"saia"},
        {"lot_code":"AUSN121007","seed_type":"barley","seed_variety":"dictator 2"},
        {"lot_code":"AUSN121006","seed_type":"barley","seed_variety":"dictator 2"},
        {"lot_code":"AUSN121008","seed_type":"wheat","seed_variety":"variety not stated"},
        {"lot_code":"AUSN121012","seed_type":"ryegrass","seed_variety":"variety not stated"},
        {"lot_code":"AUSN121011","seed_type":"ryegrass","seed_variety":"variety not stated"},
        {"lot_code":"AUSN121010","seed_type":"ryegrass","seed_variety":"variety not stated"},
        {"lot_code":"AUSN121009","seed_type":"ryegrass","seed_variety":"variety not stated"},
        {"lot_code":"AUSN121001","seed_type":"ryegrass","seed_variety":"wimmera"},
        {"lot_code":"AUSN121013","seed_type":"ryegrass","seed_variety":"wimmera"},
        {"lot_code":"AUSN121014","seed_type":"ryegrass","seed_variety":"tetila"},
        {"lot_code":"AUSN121015","seed_type":"millet","seed_variety":"variety not stated"},
        {"lot_code":"AUSN121016","seed_type":"canola","seed_variety":"variety not stated"},
        {"lot_code":"AUSN121017","seed_type":"canola","seed_variety":"pioneer"},
        {"lot_code":"AUSN121019","seed_type":"clover","seed_variety":"arrowleaf"},
        {"lot_code":"AUSN121018","seed_type":"clover","seed_variety":"arrowleaf"},
        {"lot_code":"AUSN121020","seed_type":"clover","seed_variety":"blackhawk"}
        ],
        "clickedLocation":null,
        "moveFromLocation":null,
        "moveToLocation":null,
        "movingPalletId":null,
        "selectedPallet":{},
        "foundPallets":[],
        "metaMode":"main",
        "microModes":{
        "SearchWindow":false,
        "LotManager":false,
        "LocationDetails":false,
        "Edit":false,"Move":false,
        "Dispatch":false,
        "AddPallet":false},
        "warehouseList":{"id":1,"name":"warehouse_01","rows":4,"columns":4}}

}