import React from "react";
import { MenuList, MenuItem, Menu } from "./styles/standardStyles";

export const MenuRight = ({ style }) => (
    <Menu style={style}>
        <nav>
            <MenuList>
                <MenuItem>
                    <a href="/">Profile</a>
                </MenuItem>
                <MenuItem>
                    <a href="/users">Find People</a>
                </MenuItem>
                <MenuItem>
                    <a href="/chat">Chat</a>
                </MenuItem>
                <MenuItem>
                    <a href="/friends">Friends</a>
                </MenuItem>
                <MenuItem>
                    <a href="/logout">Log Out</a>
                </MenuItem>
            </MenuList>
        </nav>
    </Menu>
);
