RegisterCommand('testcontext', function()
    exports['cT-Menu']:createContextMenu {
        titleConfig = {
            menuTitle = "Test Menu",
        },
        menuItems = {
            {
                title = "Item 1",
                description = 'This is item 1',
                icon = "fa-solid fa-user", -- https://fontawesome.com/
                closeClick = true,
                params = {
                    handler = function()
                        print("Item 1 was clicked")
                    end
                }
            },
            {
                title = "Item 2",
                description = "This is item 2 (is blocked)",
                imageByItemName = "phone", -- only with qb-inventory
                blocked = true,
                params = {
                    handler = function()
                        print("Item 2 was clicked")
                    end
                }
            },
            {
                title = "Item 3",
                description = "This is item 3",
                iconAnimated = "srsgifqc", -- https://lordicon.com/
                params = {
                    handler = function()
                        print("Item 2 was clicked")
                    end
                }
            }
        }
    }
end)

RegisterCommand('testcontext2', function()
    local menuArray = {
        titleConfig = {
            menuTitle = "Test Menu",
        },
        menuItems = {}
    }

    for i = 1, 5 do 
        menuArray.menuItems[#menuArray.menuItems + 1] = {
            title = "Item " .. i,
            description = "This is item " .. i,
            imageByItemName = "weapon_pistol", -- only with qb-inventory
            params = {
                handler = function()
                    print("Item " .. i .. " was clicked")
                end
            }
        }
    end

    exports['cT-Menu']:createContextMenu(menuArray)
end)