/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Menu } from 'antd';
import { withRouter } from 'react-router-dom';


function RightMenu(props) {


  
    return (
      <Menu mode={props.mode}>
        <Menu.Item key="logout">
          <a href='/'>-</a>
        </Menu.Item>
      </Menu>
    )
  
}

export default withRouter(RightMenu);

