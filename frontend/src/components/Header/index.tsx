// FUNCTIONAL COMPONENT — app header

import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

const HeaderBar = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 56px;
  padding: 0 24px;
  background: #1a1a2e;
  color: #fff;
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: 0 2px 8px rgba(0,0,0,0.2);
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const LogoIcon = styled.div`
  width: 32px;
  height: 32px;
  background: #1890ff;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 16px;
`;

const AppName = styled.span`
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 0.3px;
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const UserCount = styled.div`
  font-size: 13px;
  color: #8c8c8c;
  background: rgba(255,255,255,0.08);
  padding: 4px 12px;
  border-radius: 20px;
`;

// Dead styled component — dark mode toggle was removed
const ThemeToggle = styled.button`
  background: none;
  border: 1px solid rgba(255,255,255,0.2);
  border-radius: 4px;
  padding: 4px 10px;
  color: #fff;
  cursor: pointer;
  font-size: 12px;
`;

// BAD: Props typed with 'any'
interface Props {
  totalUsers: any;
  // Dead prop — notifications bell was removed from header
  unreadNotifications?: any;
}

// BAD: React.FC without proper prop typing
const Header: React.FC<Props> = ({ totalUsers }) => {
  // Dead variable — was bound to a toggle that no longer exists
  const isDarkMode = false;

  return (
    <HeaderBar>
      <Logo>
        <LogoIcon>U</LogoIcon>
        <AppName>UserPanel</AppName>
      </Logo>
      <RightSection>
        {totalUsers > 0 && (
          <UserCount>{totalUsers} user{totalUsers !== 1 ? 's' : ''}</UserCount>
        )}
        {/* Dead UI — dark mode toggle removed but styled component kept above */}
        {/* <ThemeToggle onClick={() => console.log('toggle theme')}>
          {isDarkMode ? '☀️' : '🌙'}
        </ThemeToggle> */}
      </RightSection>
    </HeaderBar>
  );
};

const mapStateToProps = (state: any) => ({
  totalUsers: state.users.users.length,
  unreadNotifications: 0, // dead — always 0
});

export default connect(mapStateToProps)(Header);
