import React from 'react';
import { Menu } from 'antd';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

function LeftMenu(props) {
  return (
    <Menu mode={props.mode}>
    <Menu.Item key="Chat">
      <a href="/" style={{ color: "#61DAFB"}}>Chat</a>
    </Menu.Item>
    <Menu.Item key="news">
      <a href="/news" style={{ color: "#61DAFB"}}>Korean news</a>
    </Menu.Item>

  </Menu>
  )
}

export default LeftMenu
