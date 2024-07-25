RegisterCommand('testMenu', function()
    local menuArray = {
        id = 'menu_test_1',
        titleConfig = {
            menuTitle = "Test Menu",
            menuTitleType = 'animated',
            menuTitleIcon = "vczwnict",
        },
        menuItems = {
            {
                title = "Item 12",
                blocked = true,
                description = 'Hola',
                icon = "font-awesome icons",
                params = {
                    handler = function()
                        print("Hello World")
                    end
                }
            },
            {
                title = "Item 3",
                description = "This is item 3",
                iconAnimated = "vczwnict",
                params = {
                    handler = function()
                        local newArray = {
                            titleConfig = {
                                menuTitle = "Sub Menu",
                                menuTitleType = 'animated',
                                menuTitleIcon = "vczwnict",
                            },
                            menuItems = {
                                {
                                    title = "Sub Item 1",
                                    description = "This is sub item 1",
                                    imageByItemName = "phone",
                                    params = {
                                        handler = function()
                                            print("Sub Item 1 was clicked")
                                        end
                                    }
                                }
                            }
                        }
                        exports['cT-Menu']:createContextMenu(newArray)
                    end
                }
            }
        }
    }


    for i = 1, 10 do 
        menuArray.menuItems[#menuArray.menuItems + 1] = {
            title = "Item " .. i,
            description = "This is item " .. i,
            imageByItemName = "weapon_pistol",
            params = {
                handler = function()
                    print("Item " .. i .. " was clicked")
                end
            }
        }
    end


    exports['cT-Menu']:createContextMenu(menuArray)
end)