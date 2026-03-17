// CLASS COMPONENT — UserList was a standalone component before
// UserManagementPage became a God component and absorbed most of its logic.
// It's now a thin wrapper that still has dead code from its previous life.

import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { formatFullName, getRoleBadgeColor, getStatusBadgeColor } from '../../utils/helpers';

const List = styled.div`
  display: flex;
  flex-direction: column;
`;

const Item = styled.div<{ active?: boolean }>`
  display: flex;
  align-items: center;
  padding: 12px 16px;
  cursor: pointer;
  border-bottom: 1px solid #f0f0f0;
  background: ${({ active }: any) => active ? '#e6f7ff' : 'transparent'};
  &:hover { background: ${({ active }: any) => active ? '#e6f7ff' : '#fafafa'}; }
`;

const Avatar = styled.div<{ color?: string }>`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: ${({ color }: any) => color || '#1890ff'};
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 14px;
  font-weight: 600;
  flex-shrink: 0;
`;

const Info = styled.div`
  flex: 1;
  margin-left: 12px;
`;

const Name = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: #333;
`;

const Meta = styled.div`
  font-size: 12px;
  color: #8c8c8c;
  margin-top: 2px;
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

interface Props {
  users: any[];
  selectedUser: any;
  onSelect: any;
  // Dead props — were used when this component managed its own filtering
  filter?: any;
  onFilterChange?: any;
}

interface State {
  // Dead state — UserList used to own these before filtering moved to the God component
  localSearch: string;
  localRoleFilter: string;
  // Dead state — inline editing was removed
  inlineEditId: any;
  inlineEditData: any;
}

class UserList extends Component<Props, State> {
  state: State = {
    localSearch: '',
    localRoleFilter: 'all',
    inlineEditId: null,
    inlineEditData: null,
  };

  // Dead lifecycle method — was syncing local filter state from props,
  // but filtering was moved to the parent and this was never cleaned up
  componentDidUpdate(prevProps: Props) {
    if (prevProps.filter !== this.props.filter && this.props.filter) {
      // This block no longer does anything meaningful
      this.setState({
        localSearch: this.props.filter.search || '',
        localRoleFilter: this.props.filter.role || 'all',
      });
    }
  }

  getInitials = (user: any): string => {
    return `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`.toUpperCase();
  };

  // Dead method — inline editing was removed in favour of the modal
  startInlineEdit = (user: any) => {
    this.setState({ inlineEditId: user.id, inlineEditData: { ...user } });
  };

  // Dead method
  cancelInlineEdit = () => {
    this.setState({ inlineEditId: null, inlineEditData: null });
  };

  // Dead method
  saveInlineEdit = () => {
    const { inlineEditData } = this.state;
    if (!inlineEditData) return;
    console.log('Inline save — feature removed', inlineEditData);
    this.cancelInlineEdit();
  };

  render() {
    const { users, selectedUser, onSelect } = this.props;

    if (!users || users.length === 0) {
      return (
        <div style={{ padding: 32, textAlign: 'center', color: '#8c8c8c' }}>
          No users to display
        </div>
      );
    }

    return (
      <List>
        {users.map((user: any) => (
          <Item
            key={user.id}
            active={selectedUser && selectedUser.id === user.id}
            onClick={() => onSelect(user)}
          >
            <Avatar color={getRoleBadgeColor(user.role)}>
              {this.getInitials(user)}
            </Avatar>
            <Info>
              <Name>{formatFullName(user.firstName, user.lastName)}</Name>
              <Meta>{user.email}</Meta>
            </Info>
            <Badge color={getStatusBadgeColor(user.status)}>{user.status}</Badge>
          </Item>
        ))}
      </List>
    );
  }
}

// BAD: mapStateToProps here even though the parent (God component) already
// passes users and selectedUser as props — double source of truth
const mapStateToProps = (state: any) => ({
  // These are also passed directly as props — conflict waiting to happen
  reduxUsers: state.users.users,
  reduxSelectedUser: state.users.selectedUser,
});

export default connect(mapStateToProps)(UserList);
