local MENUS = {}

local function MatchFunctionReference(reference)
    for _, menu in ipairs(MENUS) do
        for _, item in ipairs(menu.menuItems) do
            if item.params and item.params.handler then
                if item.params.handler.__cfx_functionReference == reference then
                    return item.params.handler
                end
            end
        end
    end
    return nil
end

function createContextMenu(data, callback) 
    SetNuiFocus(true, true)
    sendNui('createMenu', data, function(cb)
        callback(cb)
    end)
    MENUS[#MENUS+1] = data
end

function sendNui(action, data, callback)
    SendNUIMessage({
        action = action,
        menuData = data
    })
    RegisterNUICallback('menuClose', function(data, cb)
        SetNuiFocus(false, false)
        callback('close')
    end)
end

RegisterNUICallback('notify', function(data, cb)
    Notify(data.menuData.text, data.menuData.type)
    cb('ok')
end)

function Notify(text, type)
    local types = {
        success = {color = "success", icon = "CHAR_SOCIAL_CLUB"},
        error = {color = "error", icon = "CHAR_BLOCKED"},
        info = {color = "info", icon = "CHAR_DEFAULT"}
    }
    local notifyType = types[type] or types["info"]
    SetNotificationTextEntry("STRING")
    AddTextComponentString(text)
    SetNotificationMessage(notifyType.icon, notifyType.icon, false, 4, "Notify", "cT-Menu")
    DrawNotification(false, true)
end


RegisterNUICallback('menuAction', function(data, cb)
    local menuData = data.menuData.params
    if menuData.handler then
        local func = MatchFunctionReference(menuData.handler.__cfx_functionReference)
        if func then
            Wait(100)
            func()    
        end
    end
    cb('ok')
end)


exports('createContextMenu', createContextMenu)