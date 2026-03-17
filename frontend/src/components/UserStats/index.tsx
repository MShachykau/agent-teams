// FUNCTIONAL COMPONENT with CUSTOM HOOK DEFINED INSIDE THE COMPONENT BODY
// This is an anti-pattern: the hook `useUserStats` is recreated on every render,
// cannot be reused, and violates the spirit of the Rules of Hooks.

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  padding: 20px;
`;

const Card = styled.div`
  background: #fff;
  border-radius: 8px;
  border: 1px solid #f0f0f0;
  padding: 16px;
  text-align: center;
`;

const Number = styled.div<{ color?: string }>`
  font-size: 32px;
  font-weight: 700;
  color: ${({ color }: any) => color || '#1890ff'};
`;

const Label = styled.div`
  font-size: 12px;
  color: #8c8c8c;
  margin-top: 4px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const BarChart = styled.div`
  height: 8px;
  background: #f0f0f0;
  border-radius: 4px;
  margin-top: 8px;
  overflow: hidden;
`;

const Bar = styled.div<{ width?: number; color?: string }>`
  height: 100%;
  width: ${({ width }: any) => width || 0}%;
  background: ${({ color }: any) => color || '#1890ff'};
  border-radius: 4px;
  transition: width 0.3s ease;
`;

// BAD: UserStats component props typed with 'any'
interface Props {
  users: any[];
}

const UserStats: React.FC<Props> = ({ users }) => {

  // BAD: Custom hook defined INSIDE the component body.
  // Issues:
  // 1. The function is recreated on every render — no stable reference
  // 2. It cannot be reused in other components
  // 3. It makes the component harder to test in isolation
  // 4. React relies on call order for hooks; nesting like this is fragile
  function useUserStats(userList: any[]) {
    const [stats, setStats] = useState<any>(null);
    const [trend, setTrend] = useState<any>(null);

    useEffect(() => {
      // BAD: heavy computation inside useEffect with no memoization
      const active = userList.filter((u: any) => u.status === 'active').length;
      const inactive = userList.filter((u: any) => u.status === 'inactive').length;
      const suspended = userList.filter((u: any) => u.status === 'suspended').length;
      const admins = userList.filter((u: any) => u.role === 'admin').length;
      const managers = userList.filter((u: any) => u.role === 'manager').length;
      const regularUsers = userList.filter((u: any) => u.role === 'user').length;
      const guests = userList.filter((u: any) => u.role === 'guest').length;
      const total = userList.length;

      setStats({ active, inactive, suspended, admins, managers, regularUsers, guests, total });

      // BAD: second setState call in the same effect — two render cycles
      setTrend({
        activePercent: total ? Math.round((active / total) * 100) : 0,
        adminPercent: total ? Math.round((admins / total) * 100) : 0,
      });
    }, [userList]);

    return { stats, trend };
  }

  // BAD: calling the locally-defined hook — this works but is an anti-pattern
  const { stats, trend } = useUserStats(users);

  // BAD: another hook defined inside component
  function useRoleBreakdown(userList: any[]) {
    const [breakdown, setBreakdown] = useState<any[]>([]);

    useEffect(() => {
      const roles = ['admin', 'manager', 'user', 'guest'];
      const data = roles.map((role: any) => ({
        role,
        count: userList.filter((u: any) => u.role === role).length,
        percent: userList.length
          ? Math.round((userList.filter((u: any) => u.role === role).length / userList.length) * 100)
          : 0,
      }));
      setBreakdown(data);
    }, [userList]);

    return breakdown;
  }

  const roleBreakdown = useRoleBreakdown(users);

  if (!stats) return null;

  const roleColors: any = {
    admin: '#e74c3c',
    manager: '#f39c12',
    user: '#3498db',
    guest: '#95a5a6',
  };

  return (
    <StatsGrid>
      <Card>
        <Number>{stats.total}</Number>
        <Label>Total Users</Label>
        {trend && (
          <>
            <BarChart><Bar width={100} color="#1890ff" /></BarChart>
          </>
        )}
      </Card>

      <Card>
        <Number color="#52c41a">{stats.active}</Number>
        <Label>Active</Label>
        {trend && (
          <BarChart><Bar width={trend.activePercent} color="#52c41a" /></BarChart>
        )}
      </Card>

      <Card>
        <Number color="#ff4d4f">{stats.suspended}</Number>
        <Label>Suspended</Label>
      </Card>

      {roleBreakdown.map((item: any) => (
        <Card key={item.role}>
          <Number color={roleColors[item.role]}>{item.count}</Number>
          <Label>{item.role}s</Label>
          <BarChart><Bar width={item.percent} color={roleColors[item.role]} /></BarChart>
        </Card>
      ))}
    </StatsGrid>
  );
};

export default UserStats;
