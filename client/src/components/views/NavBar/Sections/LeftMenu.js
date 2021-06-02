import React from 'react';
import { Menu } from 'antd';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

function LeftMenu(props) {
  return (
    <Menu mode={props.mode}>
    <Menu.Item key="video call">
      <a href="/" style={{ color: "#61DAFB"}}>video call</a>
    </Menu.Item>
    <Menu.Item key="-">
      <a href="/" style={{ color: "#61DAFB"}}>-</a>
    </Menu.Item>

  </Menu>
  )
}

export default LeftMenu
