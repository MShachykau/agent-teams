// CLASS COMPONENT — user details sidebar panel

import React, { Component } from 'react';
import styled from 'styled-components';
import { formatFullName, getRoleBadgeColor, getStatusBadgeColor, formatDate } from '../../utils/helpers';

const Panel = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 16px;
  border-bottom: 1px solid #f0f0f0;
  gap: 10px;
`;

const Avatar = styled.div<{ color?: string }>`
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: ${({ color }: any) => color || '#1890ff'};
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 28px;
  font-weight: 700;
`;

const FullName = styled.div`
  font-size: 18px;
  font-weight: 600;
  color: #1a1a2e;
  text-align: center;
`;

const EmailText = styled.div`
  font-size: 13px;
  color: #8c8c8c;
`;

const BadgeRow = styled.div`
  display: flex;
  gap: 8px;
`;

const Badge = styled.span<{ color?: string }>`
  padding: 3px 10px;
  border-radius: 10px;
  font-size: 12px;
  font-weight: 500;
  background: ${({ color }: any) => color};
  color: #fff;
  text-transform: capitalize;
`;

const Section = styled.div``;

const SectionTitle = styled.div`
  font-size: 11px;
  font-weight: 600;
  color: #8c8c8c;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 10px;
`;

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 6px 0;
  border-bottom: 1px solid #fafafa;
  font-size: 13px;
`;

const InfoKey = styled.span`
  color: #8c8c8c;
`;

const InfoValue = styled.span`
  color: #333;
  font-weight: 500;
  text-align: right;
  max-width: 55%;
  word-break: break-word;
`;

const Actions = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 8px;
`;

const Btn = styled.button<{ danger?: boolean }>`
  flex: 1;
  padding: 8px;
  border: none;
  border-radius: 4px;
  font-size: 13px;
  cursor: pointer;
  font-weight: 500;
  background: ${({ danger }: any) => danger ? '#fff2f0' : '#f0f7ff'};
  color: ${({ danger }: any) => danger ? '#cf1322' : '#1890ff'};
  border: 1px solid ${({ danger }: any) => danger ? '#ffccc7' : '#91caff'};
  &:hover { opacity: 0.8; }
`;

const CloseBtn = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: #8c8c8c;
  line-height: 1;
  &:hover { color: #333; }
`;

// BAD: Props typed with 'any'
interface Props {
  user: any;
  onEdit: any;
  onDelete: any;
  onClose: any;
}

interface State {
  // Dead state — a "notes" section was planned but never built
  notesExpanded: boolean;
  // Dead state — permissions tab was removed
  activeTab: string;
}

class UserDetails extends Component<Props, State> {
  state: State = {
    notesExpanded: false,
    activeTab: 'info', // dead — only one tab ever existed
  };

  getInitials = (user: any): string => {
    return `${(user.firstName || '?').charAt(0)}${(user.lastName || '?').charAt(0)}`.toUpperCase();
  };

  // Dead method — tab switching was removed when second tab was cancelled
  handleTabSwitch = (tab: any) => {
    this.setState({ activeTab: tab });
    console.log('Tab switch — feature removed:', tab);
  };

  // Dead method — notes expansion was planned but never wired to UI
  toggleNotes = () => {
    this.setState((prev: State) => ({ notesExpanded: !prev.notesExpanded }));
  };

  render() {
    const { user, onEdit, onDelete, onClose } = this.props;

    return (
      <Panel>
        <div style={{ position: 'relative' }}>
          <CloseBtn onClick={onClose} title="Close">×</CloseBtn>
        </div>

        <Header>
          <Avatar color={getRoleBadgeColor(user.role)}>
            {this.getInitials(user)}
          </Avatar>
          <FullName>{formatFullName(user.firstName, user.lastName)}</FullName>
          <EmailText>{user.email}</EmailText>
          <BadgeRow>
            <Badge color={getRoleBadgeColor(user.role)}>{user.role}</Badge>
            <Badge color={getStatusBadgeColor(user.status)}>{user.status}</Badge>
          </BadgeRow>
        </Header>

        <Section>
          <SectionTitle>Details</SectionTitle>
          <InfoRow>
            <InfoKey>Department</InfoKey>
            <InfoValue>{user.department || '—'}</InfoValue>
          </InfoRow>
          <InfoRow>
            <InfoKey>Phone</InfoKey>
            <InfoValue>{user.phone || '—'}</InfoValue>
          </InfoRow>
          <InfoRow>
            <InfoKey>Member Since</InfoKey>
            <InfoValue>{formatDate(user.createdAt)}</InfoValue>
          </InfoRow>
          <InfoRow>
            <InfoKey>Last Login</InfoKey>
            <InfoValue>{formatDate(user.lastLogin)}</InfoValue>
          </InfoRow>
          <InfoRow>
            <InfoKey>User ID</InfoKey>
            <InfoValue>#{user.id}</InfoValue>
          </InfoRow>
        </Section>

        {/* Dead UI — permissions section was planned, never built */}
        {/* <Section>
          <SectionTitle>Permissions</SectionTitle>
          {user.permissions && user.permissions.map((p: any) => (
            <PermissionBadge key={p}>{p}</PermissionBadge>
          ))}
        </Section> */}

        <Actions>
          <Btn onClick={onEdit}>Edit</Btn>
          <Btn danger onClick={onDelete}>Delete</Btn>
        </Actions>
      </Panel>
    );
  }
}

export default UserDetails;
