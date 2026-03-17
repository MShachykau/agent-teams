// DEAD COMPONENT — this entire file is unreferenced anywhere in the app.
// It was the original table before UserManagementPage absorbed all rendering logic.
// Should have been deleted when the God component was built.

import React, { Component } from 'react';
// Dead import — was used for a deleted popover feature
// import Popover from 'some-removed-library';

interface Props {
  users: any[];
  onEdit: any;
  onDelete: any;
  // Dead props
  onSort?: any;
  sortConfig?: any;
  pagination?: any;
}

interface State {
  expandedRow: any;
  // Dead state
  tooltipVisible: any;
  tooltipContent: any;
  tooltipPosition: any;
}

class LegacyUserTable extends Component<Props, State> {
  state: State = {
    expandedRow: null,
    tooltipVisible: false,
    tooltipContent: '',
    tooltipPosition: { x: 0, y: 0 },
  };

  // Dead method — tooltips were removed when this component was abandoned
  showTooltip = (content: any, event: any) => {
    this.setState({
      tooltipVisible: true,
      tooltipContent: content,
      tooltipPosition: { x: event.clientX, y: event.clientY },
    });
  };

  hideTooltip = () => {
    this.setState({ tooltipVisible: false });
  };

  toggleRowExpansion = (id: any) => {
    this.setState((prev: State) => ({
      expandedRow: prev.expandedRow === id ? null : id,
    }));
  };

  // Dead method — was used for the old inline sort that the God component now owns
  handleHeaderClick = (column: any) => {
    const { onSort } = this.props;
    if (onSort) onSort(column);
  };

  render() {
    const { users, onEdit, onDelete } = this.props;
    const { expandedRow } = this.state;

    return (
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#fafafa' }}>
              <th style={thStyle} onClick={() => this.handleHeaderClick('id')}>ID</th>
              <th style={thStyle} onClick={() => this.handleHeaderClick('lastName')}>Name</th>
              <th style={thStyle} onClick={() => this.handleHeaderClick('email')}>Email</th>
              <th style={thStyle} onClick={() => this.handleHeaderClick('role')}>Role</th>
              <th style={thStyle} onClick={() => this.handleHeaderClick('status')}>Status</th>
              <th style={thStyle}>Department</th>
              <th style={thStyle}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user: any) => (
              <React.Fragment key={user.id}>
                <tr
                  style={{ cursor: 'pointer', borderBottom: '1px solid #f0f0f0' }}
                  onClick={() => this.toggleRowExpansion(user.id)}
                >
                  <td style={tdStyle}>{user.id}</td>
                  <td style={tdStyle}>{user.firstName} {user.lastName}</td>
                  <td style={tdStyle}>{user.email}</td>
                  <td style={tdStyle}>{user.role}</td>
                  <td style={tdStyle}>{user.status}</td>
                  <td style={tdStyle}>{user.department}</td>
                  <td style={tdStyle}>
                    <button onClick={(e: any) => { e.stopPropagation(); onEdit(user); }}>
                      Edit
                    </button>
                    {' '}
                    <button onClick={(e: any) => { e.stopPropagation(); onDelete(user); }}
                      style={{ color: 'red' }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
                {expandedRow === user.id && (
                  <tr>
                    <td colSpan={7} style={{ padding: '12px 16px', background: '#fafafa' }}>
                      <strong>Phone:</strong> {user.phone || '—'} &nbsp;
                      <strong>Last Login:</strong> {user.lastLogin || '—'}
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

// Dead inline style objects (also: not using styled-components, inconsistent with rest of app)
const thStyle: any = {
  padding: '10px 14px',
  textAlign: 'left',
  fontWeight: 600,
  fontSize: 13,
  color: '#555',
  borderBottom: '2px solid #e8e8e8',
  cursor: 'pointer',
};

const tdStyle: any = {
  padding: '10px 14px',
  fontSize: 13,
  color: '#333',
};

export default LegacyUserTable;
