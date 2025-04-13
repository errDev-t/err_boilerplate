local config = require 'config.shared'

local function toggleNuiFrame(shouldShow)
    SetNuiFocus(shouldShow, shouldShow)
end
  
RegisterCommand('show-nui', function()
    toggleNuiFrame(true)
    SendReactMessage('showUi', true)
    debugPrint('Show NUI frame')
end)
  
RegisterNUICallback('hideFrame', function(_, cb)
    toggleNuiFrame(false)
    debugPrint('Hide NUI frame')
    cb({})
end)
  
RegisterNUICallback('getClientData', function(data, cb)
    
    local retData <const> = { x = 100, y = 100, z = 100 }
    debugPrint('Data sent by React', json.encode(data))
  
    local curCoords = GetEntityCoords(PlayerPedId())
    
    local retData <const> = { x = curCoords.x, y = curCoords.y, z = curCoords.z }
    cb(retData)
end)

local isInVehicleUiVisible = false
 
-- Check if player is in vehicle and update UI
CreateThread(function()
    while true do
        local ped = PlayerPedId()
        local isInVehicle = IsPedInAnyVehicle(ped, false)
        
        if isInVehicle ~= isInVehicleUiVisible then
            isInVehicleUiVisible = isInVehicle
            SendReactMessage('setVehicleUiVisible', isInVehicle)
        end
        
        if isInVehicle then
            local vehicle = GetVehiclePedIsIn(ped, false)
            local vehicleSpeed = math.floor(GetEntitySpeed(vehicle) * 3.6) -- km/h
            local fuel = GetVehicleFuelLevel(vehicle)
            
            SendReactMessage('updateVehicleData', {
                speed = vehicleSpeed,
                fuel = fuel
            })
        end
        
        Wait(isInVehicle and 100 or 1000) -- Update more frequently when in vehicle
    end
end)