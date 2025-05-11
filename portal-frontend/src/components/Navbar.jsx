import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, Layout, Button, Drawer } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import { useAuth } from '../context/AuthContext';

const { Header } = Layout;

const Navbar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login'); // Redirect to login page after logout
  };

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };
  return (
    <>
      <div className='desktop-menu '>
        <Header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']} style={{ flex: 1 }}>
            <Menu.Item key="1">
              <Link to="/">Dashboard</Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link to="/manage-students">Manage Students</Link>
            </Menu.Item>
            <Menu.Item key="3">
              <Link to="/manage-drives">Manage Drives</Link>
            </Menu.Item>
            <Menu.Item key="4">
              <Link to="/generate-reports">Generate Reports</Link>
            </Menu.Item>
          </Menu>
          <Button type="primary" onClick={handleLogout}>
            Logout
          </Button>
        </Header>
      </div>
      <div className='mobile-menu-button'>
        <Header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 20px' }}>
          <div className="mobile-menu-button logo" style={{ color: '#fff', fontSize: '20px' }}>School Portal</div>
          <Button className="mobile-menu-button" type="primary" icon={<MenuOutlined />} onClick={showDrawer} />
          <Drawer
            title="Menu"
            placement="right"
            onClose={onClose}
            visible={visible}
            bodyStyle={{ padding: 0 }}
          >
            <Menu mode="vertical" defaultSelectedKeys={['1']}>
              <Menu.Item key="1" onClick={onClose}>
                <Link to="/">Dashboard</Link>
              </Menu.Item>
              <Menu.Item key="2" onClick={onClose}>
                <Link to="/manage-students">Manage Students</Link>
              </Menu.Item>
              <Menu.Item key="3" onClick={onClose}>
                <Link to="/manage-drives">Manage Drives</Link>
              </Menu.Item>
              <Menu.Item key="4" onClick={onClose}>
                <Link to="/generate-reports">Generate Reports</Link>
              </Menu.Item>
              <Menu.Item key="5" onClick={() => { handleLogout(); onClose(); }}>
                Logout
              </Menu.Item>
            </Menu>
          </Drawer>
        </Header>
      </div>
    </>
  );
};

export default Navbar;
