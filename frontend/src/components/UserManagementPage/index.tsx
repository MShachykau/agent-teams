// GOD COMPONENT — handles everything:
// state management, API calls, business logic, layout, subcomponent rendering,
// error handling, filtering, sorting, modal control, and notification display.
// This should be split into at least 5 separate concerns.

import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import {
  fetchUsersRequest,
  fetchUsersSuccess,
  fetchUsersFailure,
  createUserSuccess,
  updateUserSuccess,
  deleteUserSuccess,
  selectUser,
  clearSelectedUser,
  setFilter,
  clearError,
} from '../../redux/actions/userActions';
import {
  fetchAllUsers,
  createUser,
  updateUser,
  deleteUser,
} from '../../api/userApi';
import { formatFullName, getRoleBadgeColor, getStatusBadgeColor, formatDate } from '../../utils/helpers';
import UserForm from '../UserForm';
import UserDetails from '../UserDetails';
import Notification from '../Notification';

// BAD: Styled components defined inline inside the same file as the logic
const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: #f0f2f5;
`;

const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
  background: #fff;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  margin-bottom: 24px;
`;

const Title = styled.h1`
  font-size: 24px;
  color: #1a1a2e;
  font-weight: 700;
`;

const Content = styled.div`
  display: flex;
  gap: 24px;
  padding: 0 24px 24px;
  flex: 1;
`;

const MainPanel = styled.div`
  flex: 1;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
  overflow: hidden;
`;

const SidePanel = styled.div`
  width: 360px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
  padding: 20px;
`;

const ToolBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  border-bottom: 1px solid #f0f0f0;
  gap: 12px;
  flex-wrap: wrap;
`;

const SearchInput = styled.input`
  flex: 1;
  min-width: 200px;
  padding: 8px 12px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  font-size: 14px;
  &:focus { outline: none; border-color: #1890ff; }
`;

const Select = styled.select`
  padding: 8px 12px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  font-size: 14px;
  background: #fff;
  cursor: pointer;
`;

const Button = styled.button<{ variant?: string }>`
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  font-weight: 500;
  background: ${({ variant }: any) =>
    variant === 'danger' ? '#ff4d4f' :
    variant === 'secondary' ? '#f5f5f5' :
    '#1890ff'};
  color: ${({ variant }: any) => variant === 'secondary' ? '#333' : '#fff'};
  &:hover { opacity: 0.85; }
  &:disabled { opacity: 0.5; cursor: not-allowed; }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const Th = styled.th`
  padding: 12px 16px;
  text-align: left;
  font-size: 12px;
  font-weight: 600;
  color: #8c8c8c;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  border-bottom: 1px solid #f0f0f0;
  cursor: pointer;
  user-select: none;
  &:hover { color: #1890ff; }
`;

const Td = styled.td`
  padding: 12px 16px;
  font-size: 14px;
  color: #333;
  border-bottom: 1px solid #f8f8f8;
`;

const Tr = styled.tr<{ selected?: boolean }>`
  cursor: pointer;
  background: ${({ selected }: any) => selected ? '#e6f7ff' : 'transparent'};
  &:hover { background: ${({ selected }: any) => selected ? '#e6f7ff' : '#fafafa'}; }
`;

const Badge = styled.span<{ color?: string }>`
  display: inline-block;
  padding: 2px 8px;
  border-radius: 10px;
  font-size: 12px;
  font-weight: 500;
  background: ${({ color }: any) => color || '#e6f7ff'};
  color: #fff;
  text-transform: capitalize;
`;

const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.45);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalBox = styled.div`
  background: #fff;
  border-radius: 8px;
  padding: 28px;
  width: 520px;
  max-width: 90vw;
  box-shadow: 0 20px 60px rgba(0,0,0,0.3);
`;

const ModalTitle = styled.h2`
  font-size: 18px;
  margin-bottom: 20px;
  color: #1a1a2e;
`;

const ConfirmBox = styled.div`
  background: #fff3f3;
  border: 1px solid #ffccc7;
  border-radius: 4px;
  padding: 16px;
  margin-bottom: 16px;
`;

const LoadingOverlay = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 60px;
  font-size: 16px;
  color: #8c8c8c;
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px;
  color: #8c8c8c;
`;

const StatsRow = styled.div`
  display: flex;
  gap: 16px;
  padding: 16px 24px;
  background: #fafafa;
  border-bottom: 1px solid #f0f0f0;
`;

const StatCard = styled.div`
  flex: 1;
  background: #fff;
  border: 1px solid #f0f0f0;
  border-radius: 6px;
  padding: 12px 16px;
`;

const StatNumber = styled.div`
  font-size: 24px;
  font-weight: 700;
  color: #1890ff;
`;

const StatLabel = styled.div`
  font-size: 12px;
  color: #8c8c8c;
  margin-top: 2px;
`;

// BAD: prop types use 'any' with connect()
interface Props {
  dispatch: any;
  users: any[];
  selectedUser: any;
  loading: boolean;
  error: any;
  filter: any;
  notification: any;
}

// BAD: All state fields mixed in one giant state object
interface State {
  modalType: any;
  editingUser: any;
  deletingUser: any;
  localLoading: boolean;
  localError: any;
  searchTerm: string;
  roleFilter: string;
  statusFilter: string;
  sortBy: string;
  sortDirection: string;
  // Dead state fields — leftover from a cancelled feature
  bulkMode: boolean;
  bulkSelected: any[];
  sidebarCollapsed: boolean;
}

class UserManagementPage extends Component<Props, State> {
  // BAD: instance variable instead of state for a ref
  tableRef: any = null;
  // Dead instance variable — was used for a polling interval that was removed
  pollingInterval: any = null;
  notificationTimeout: any = null;

  state: State = {
    modalType: null,
    editingUser: null,
    deletingUser: null,
    localLoading: false,
    localError: null,
    searchTerm: '',
    roleFilter: 'all',
    statusFilter: 'all',
    sortBy: 'lastName',
    sortDirection: 'asc',
    // Dead state
    bulkMode: false,
    bulkSelected: [],
    sidebarCollapsed: false,
  };

  componentDidMount() {
    this.loadUsers();
    // Dead code — polling was removed but setup code remains
    // this.pollingInterval = setInterval(this.loadUsers, 30000);
  }

  componentWillUnmount() {
    // BAD: manual timeout cleanup that could be avoided with a proper abstraction
    if (this.notificationTimeout) {
      clearTimeout(this.notificationTimeout);
    }
    // Dead — interval was never started but cleanup code was kept
    if (this.pollingInterval) {
      clearInterval(this.pollingInterval);
    }
  }

  // BAD: componentDidUpdate used for a side effect that should be in the action/middleware
  componentDidUpdate(prevProps: Props) {
    if (prevProps.error !== this.props.error && this.props.error) {
      this.setState({ localError: this.props.error });
      this.notificationTimeout = setTimeout(() => {
        this.props.dispatch(clearError());
        this.setState({ localError: null });
      }, 5000);
    }
  }

  loadUsers = () => {
    const { dispatch } = this.props;
    dispatch(fetchUsersRequest());
    fetchAllUsers()
      .then((data: any) => {
        dispatch(fetchUsersSuccess(data));
      })
      .catch((err: any) => {
        dispatch(fetchUsersFailure(err.message || 'Failed to load users'));
      });
  };

  openCreateModal = () => {
    this.setState({ modalType: 'create', editingUser: null });
  };

  openEditModal = (user: any) => {
    this.setState({ modalType: 'edit', editingUser: user });
    this.props.dispatch(selectUser(user));
  };

  openDeleteModal = (user: any) => {
    this.setState({ modalType: 'delete', deletingUser: user });
  };

  closeModal = () => {
    this.setState({ modalType: null, editingUser: null, deletingUser: null });
  };

  handleCreateUser = (userData: any) => {
    const { dispatch } = this.props;
    this.setState({ localLoading: true });
    createUser(userData)
      .then((newUser: any) => {
        dispatch(createUserSuccess(newUser));
        this.closeModal();
        this.setState({ localLoading: false });
        this.showNotification('User created successfully', 'success');
      })
      .catch((err: any) => {
        this.setState({ localLoading: false, localError: err.message });
      });
  };

  handleUpdateUser = (userData: any) => {
    const { dispatch } = this.props;
    this.setState({ localLoading: true });
    updateUser(userData.id, userData)
      .then((updatedUser: any) => {
        dispatch(updateUserSuccess(updatedUser));
        this.closeModal();
        this.setState({ localLoading: false });
        this.showNotification('User updated successfully', 'success');
      })
      .catch((err: any) => {
        this.setState({ localLoading: false, localError: err.message });
      });
  };

  handleDeleteUser = () => {
    const { dispatch } = this.props;
    const { deletingUser } = this.state;
    if (!deletingUser) return;
    this.setState({ localLoading: true });
    deleteUser(deletingUser.id)
      .then(() => {
        dispatch(deleteUserSuccess(deletingUser.id));
        this.closeModal();
        this.setState({ localLoading: false });
        this.showNotification('User deleted successfully', 'success');
        if (this.props.selectedUser && this.props.selectedUser.id === deletingUser.id) {
          dispatch(clearSelectedUser());
        }
      })
      .catch((err: any) => {
        this.setState({ localLoading: false, localError: err.message });
      });
  };

  showNotification = (message: any, type: any) => {
    this.props.dispatch({ type: 'SET_NOTIFICATION', payload: { message, type } });
    this.notificationTimeout = setTimeout(() => {
      this.props.dispatch({ type: 'CLEAR_NOTIFICATION' });
    }, 3500);
  };

  handleRowClick = (user: any) => {
    const { dispatch, selectedUser } = this.props;
    if (selectedUser && selectedUser.id === user.id) {
      dispatch(clearSelectedUser());
    } else {
      dispatch(selectUser(user));
    }
  };

  handleSort = (column: string) => {
    this.setState((prev: State) => ({
      sortBy: column,
      sortDirection:
        prev.sortBy === column && prev.sortDirection === 'asc' ? 'desc' : 'asc',
    }));
  };

  // BAD: Filtering and sorting logic crammed into the render method
  // This should be a selector (e.g. reselect) or at least a separate method
  getFilteredAndSortedUsers = (): any[] => {
    const { users } = this.props;
    const { searchTerm, roleFilter, statusFilter, sortBy, sortDirection } = this.state;

    let filtered = users.filter((u: any) => {
      const fullName = formatFullName(u.firstName, u.lastName).toLowerCase();
      const matchesSearch =
        !searchTerm ||
        fullName.includes(searchTerm.toLowerCase()) ||
        u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (u.department && u.department.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesRole = roleFilter === 'all' || u.role === roleFilter;
      const matchesStatus = statusFilter === 'all' || u.status === statusFilter;
      return matchesSearch && matchesRole && matchesStatus;
    });

    filtered.sort((a: any, b: any) => {
      let valA: any = a[sortBy];
      let valB: any = b[sortBy];
      if (sortBy === 'name') {
        valA = formatFullName(a.firstName, a.lastName);
        valB = formatFullName(b.firstName, b.lastName);
      }
      if (valA < valB) return sortDirection === 'asc' ? -1 : 1;
      if (valA > valB) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });

    return filtered;
  };

  // Dead method — bulk operations were removed from the UI
  handleBulkDelete = () => {
    const { bulkSelected } = this.state;
    console.warn('Bulk delete called with', bulkSelected);
    // TODO: implement bulk delete endpoint
  };

  // Dead method — CSV export button was removed
  handleExportCSV = () => {
    console.log('Export CSV — not yet implemented');
  };

  renderStats() {
    const { users } = this.props;
    const active = users.filter((u: any) => u.status === 'active').length;
    const inactive = users.filter((u: any) => u.status === 'inactive').length;
    const suspended = users.filter((u: any) => u.status === 'suspended').length;
    const admins = users.filter((u: any) => u.role === 'admin').length;

    return (
      <StatsRow>
        <StatCard>
          <StatNumber>{users.length}</StatNumber>
          <StatLabel>Total Users</StatLabel>
        </StatCard>
        <StatCard>
          <StatNumber style={{ color: '#52c41a' }}>{active}</StatNumber>
          <StatLabel>Active</StatLabel>
        </StatCard>
        <StatCard>
          <StatNumber style={{ color: '#8c8c8c' }}>{inactive}</StatNumber>
          <StatLabel>Inactive</StatLabel>
        </StatCard>
        <StatCard>
          <StatNumber style={{ color: '#ff4d4f' }}>{suspended}</StatNumber>
          <StatLabel>Suspended</StatLabel>
        </StatCard>
        <StatCard>
          <StatNumber style={{ color: '#722ed1' }}>{admins}</StatNumber>
          <StatLabel>Admins</StatLabel>
        </StatCard>
      </StatsRow>
    );
  }

  renderTable() {
    const { loading, selectedUser } = this.props;
    const { sortBy, sortDirection } = this.state;
    const users = this.getFilteredAndSortedUsers();

    if (loading) return <LoadingOverlay>Loading users...</LoadingOverlay>;
    if (!users.length) return <EmptyState><p>No users found</p></EmptyState>;

    const sortArrow = (col: string) =>
      sortBy === col ? (sortDirection === 'asc' ? ' ↑' : ' ↓') : '';

    return (
      <Table ref={(ref: any) => { this.tableRef = ref; }}>
        <thead>
          <tr>
            <Th onClick={() => this.handleSort('name')}>Name{sortArrow('name')}</Th>
            <Th onClick={() => this.handleSort('email')}>Email{sortArrow('email')}</Th>
            <Th onClick={() => this.handleSort('role')}>Role{sortArrow('role')}</Th>
            <Th onClick={() => this.handleSort('status')}>Status{sortArrow('status')}</Th>
            <Th onClick={() => this.handleSort('department')}>Department{sortArrow('department')}</Th>
            <Th onClick={() => this.handleSort('lastLogin')}>Last Login{sortArrow('lastLogin')}</Th>
            <Th>Actions</Th>
          </tr>
        </thead>
        <tbody>
          {users.map((user: any) => (
            <Tr
              key={user.id}
              selected={selectedUser && selectedUser.id === user.id}
              onClick={() => this.handleRowClick(user)}
            >
              <Td>{formatFullName(user.firstName, user.lastName)}</Td>
              <Td>{user.email}</Td>
              <Td>
                <Badge color={getRoleBadgeColor(user.role)}>{user.role}</Badge>
              </Td>
              <Td>
                <Badge color={getStatusBadgeColor(user.status)}>{user.status}</Badge>
              </Td>
              <Td>{user.department || '—'}</Td>
              <Td>{formatDate(user.lastLogin)}</Td>
              <Td onClick={(e: any) => e.stopPropagation()}>
                <div style={{ display: 'flex', gap: 8 }}>
                  <Button
                    variant="secondary"
                    onClick={() => this.openEditModal(user)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => this.openDeleteModal(user)}
                  >
                    Delete
                  </Button>
                </div>
              </Td>
            </Tr>
          ))}
        </tbody>
      </Table>
    );
  }

  renderModal() {
    const { modalType, editingUser, deletingUser, localLoading } = this.state;
    if (!modalType) return null;

    return (
      <ModalOverlay onClick={this.closeModal}>
        <ModalBox onClick={(e: any) => e.stopPropagation()}>
          {modalType === 'create' && (
            <>
              <ModalTitle>Create New User</ModalTitle>
              <UserForm
                onSubmit={this.handleCreateUser}
                onCancel={this.closeModal}
                loading={localLoading}
              />
            </>
          )}
          {modalType === 'edit' && editingUser && (
            <>
              <ModalTitle>Edit User</ModalTitle>
              <UserForm
                user={editingUser}
                onSubmit={this.handleUpdateUser}
                onCancel={this.closeModal}
                loading={localLoading}
              />
            </>
          )}
          {modalType === 'delete' && deletingUser && (
            <>
              <ModalTitle>Delete User</ModalTitle>
              <ConfirmBox>
                <p>
                  Are you sure you want to delete{' '}
                  <strong>{formatFullName(deletingUser.firstName, deletingUser.lastName)}</strong>?
                  This action cannot be undone.
                </p>
              </ConfirmBox>
              <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
                <Button variant="secondary" onClick={this.closeModal}>
                  Cancel
                </Button>
                <Button
                  variant="danger"
                  onClick={this.handleDeleteUser}
                  disabled={localLoading}
                >
                  {localLoading ? 'Deleting...' : 'Delete'}
                </Button>
              </div>
            </>
          )}
        </ModalBox>
      </ModalOverlay>
    );
  }

  render() {
    const { selectedUser, notification, error } = this.props;
    const { searchTerm, roleFilter, statusFilter, localError } = this.state;
    const displayError = localError || error;

    return (
      <PageWrapper>
        <TopBar>
          <Title>User Management</Title>
          <Button onClick={this.openCreateModal}>+ New User</Button>
        </TopBar>

        {notification && (
          <Notification message={notification.message} type={notification.type} />
        )}

        {displayError && (
          <div style={{ margin: '0 24px 16px', padding: '12px 16px', background: '#fff2f0', border: '1px solid #ffccc7', borderRadius: 4, color: '#cf1322' }}>
            {String(displayError)}
          </div>
        )}

        <Content>
          <MainPanel>
            {this.renderStats()}
            <ToolBar>
              <SearchInput
                placeholder="Search by name, email, or department..."
                value={searchTerm}
                onChange={(e: any) => this.setState({ searchTerm: e.target.value })}
              />
              <Select
                value={roleFilter}
                onChange={(e: any) => this.setState({ roleFilter: e.target.value })}
              >
                <option value="all">All Roles</option>
                <option value="admin">Admin</option>
                <option value="manager">Manager</option>
                <option value="user">User</option>
                <option value="guest">Guest</option>
              </Select>
              <Select
                value={statusFilter}
                onChange={(e: any) => this.setState({ statusFilter: e.target.value })}
              >
                <option value="all">All Statuses</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="suspended">Suspended</option>
              </Select>
              <Button variant="secondary" onClick={this.loadUsers}>
                Refresh
              </Button>
            </ToolBar>
            {this.renderTable()}
          </MainPanel>

          {selectedUser && (
            <SidePanel>
              <UserDetails
                user={selectedUser}
                onEdit={() => this.openEditModal(selectedUser)}
                onDelete={() => this.openDeleteModal(selectedUser)}
                onClose={() => this.props.dispatch(clearSelectedUser())}
              />
            </SidePanel>
          )}
        </Content>

        {this.renderModal()}
      </PageWrapper>
    );
  }
}

// BAD: mapStateToProps accesses deeply nested state without null-safety
const mapStateToProps = (state: any) => ({
  users: state.users.users,
  selectedUser: state.users.selectedUser,
  loading: state.users.loading,
  error: state.users.error,
  filter: state.users.filter,
  notification: state.ui.notification,
});

// BAD: No mapDispatchToProps — just passing raw dispatch
export default connect(mapStateToProps)(UserManagementPage);
