// FUNCTIONAL COMPONENT — toast notification banner

import React from 'react';
import styled, { keyframes } from 'styled-components';

const slideIn = keyframes`
  from { transform: translateY(-20px); opacity: 0; }
  to   { transform: translateY(0);     opacity: 1; }
`;

const Banner = styled.div<{ type?: string }>`
  margin: 0 24px 12px;
  padding: 12px 16px;
  border-radius: 4px;
  font-size: 14px;
  animation: ${slideIn} 0.2s ease;
  background: ${({ type }: any) =>
    type === 'success' ? '#f6ffed' :
    type === 'error'   ? '#fff2f0' :
    '#e6f7ff'};
  border: 1px solid ${({ type }: any) =>
    type === 'success' ? '#b7eb8f' :
    type === 'error'   ? '#ffccc7' :
    '#91d5ff'};
  color: ${({ type }: any) =>
    type === 'success' ? '#389e0d' :
    type === 'error'   ? '#cf1322' :
    '#096dd9'};
`;

// BAD: Props typed with 'any'
interface Props {
  message: any;
  type?: any;
}

const Notification: React.FC<Props> = ({ message, type = 'info' }) => {
  if (!message) return null;
  return <Banner type={type}>{message}</Banner>;
};

export default Notification;
