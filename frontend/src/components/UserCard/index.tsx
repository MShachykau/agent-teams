// FUNCTIONAL COMPONENT — card view for a single user
// (the grid/card layout was removed in favour of a table,
// but this component was never deleted)

import React from 'react';
import styled from 'styled-components';
import { formatFullName, getRoleBadgeColor, getStatusBadgeColor } from '../../utils/helpers';

// BAD: Inline style object recreated on every render instead of using styled-components
const cardBaseStyle = {
  background: '#fff',
  borderRadius: '8px',
  border: '1px solid #f0f0f0',
  padding: '20px',
  cursor: 'pointer',
  transition: 'box-shadow 0.2s',
};

const Card = styled.div<{ selected?: boolean }>`
  background: #fff;
  border-radius: 8px;
  border: 1px solid ${({ selected }: any) => selected ? '#1890ff' : '#f0f0f0'};
  padding: 20px;
  cursor: pointer;
  transition: box-shadow 0.2s, border-color 0.2s;
  &:hover { box-shadow: 0 4px 16px rgba(0,0,0,0.08); }
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 14px;
`;

const Avatar = styled.div<{ bg?: string }>`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: ${({ bg }: any) => bg || '#1890ff'};
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 18px;
  font-weight: 700;
  flex-shrink: 0;
`;

const NameBlock = styled.div``;

const Name = styled.div`
  font-size: 15px;
  font-weight: 600;
  color: #1a1a2e;
`;

const Email = styled.div`
  font-size: 12px;
  color: #8c8c8c;
  margin-top: 2px;
`;

const Badges = styled.div`
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
  margin-bottom: 12px;
`;

const Badge = styled.span<{ color?: string }>`
  padding: 2px 8px;
  border-radius: 10px;
  font-size: 11px;
  font-weight: 500;
  background: ${({ color }: any) => color};
  color: #fff;
  text-transform: capitalize;
`;

const Footer = styled.div`
  display: flex;
  gap: 8px;
  border-top: 1px solid #f8f8f8;
  padding-top: 12px;
`;

const ActionBtn = styled.button`
  flex: 1;
  padding: 6px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  background: #fff;
  font-size: 12px;
  cursor: pointer;
  &:hover { background: #f5f5f5; }
`;

// BAD: Props typed with 'any'
interface Props {
  user: any;
  selected?: any;
  onClick?: any;
  onEdit?: any;
  onDelete?: any;
}

// BAD: Non-memoized functional component — re-renders whenever parent does
const UserCard: React.FC<Props> = ({ user, selected, onClick, onEdit, onDelete }) => {
  const initials = `${(user.firstName || '?')[0]}${(user.lastName || '?')[0]}`.toUpperCase();

  // BAD: Creating a new object reference on every render
  const dynamicStyle = { ...cardBaseStyle, borderColor: selected ? '#1890ff' : '#f0f0f0' };

  return (
    <Card selected={selected} onClick={onClick} style={dynamicStyle}>
      <CardHeader>
        <Avatar bg={getRoleBadgeColor(user.role)}>{initials}</Avatar>
        <NameBlock>
          <Name>{formatFullName(user.firstName, user.lastName)}</Name>
          <Email>{user.email}</Email>
        </NameBlock>
      </CardHeader>

      <Badges>
        <Badge color={getRoleBadgeColor(user.role)}>{user.role}</Badge>
        <Badge color={getStatusBadgeColor(user.status)}>{user.status}</Badge>
        {user.department && (
          <Badge color="#8c8c8c">{user.department}</Badge>
        )}
      </Badges>

      <Footer>
        <ActionBtn onClick={(e: any) => { e.stopPropagation(); onEdit && onEdit(user); }}>
          Edit
        </ActionBtn>
        <ActionBtn onClick={(e: any) => { e.stopPropagation(); onDelete && onDelete(user); }}
          style={{ color: '#ff4d4f', borderColor: '#ffccc7' }}
        >
          Delete
        </ActionBtn>
      </Footer>
    </Card>
  );
};

export default UserCard;
