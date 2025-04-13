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