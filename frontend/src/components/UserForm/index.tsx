// CLASS COMPONENT with CALLBACK HELL
// Form submission goes 6 levels deep in nested callbacks.
// Each step (validate → sanitize → format → API call → handle response → update state)
// is a separate callback instead of a promise chain or async/await.

import React, { Component } from 'react';
import styled from 'styled-components';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Row = styled.div`
  display: flex;
  gap: 16px;
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 4px;
`;

const Label = styled.label`
  font-size: 13px;
  font-weight: 500;
  color: #555;
`;

const Input = styled.input`
  padding: 8px 12px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  font-size: 14px;
  &:focus { outline: none; border-color: #1890ff; }
  &.error { border-color: #ff4d4f; }
`;

const StyledSelect = styled.select`
  padding: 8px 12px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  font-size: 14px;
  background: #fff;
  &:focus { outline: none; border-color: #1890ff; }
`;

const ErrorText = styled.span`
  font-size: 12px;
  color: #ff4d4f;
`;

const FormActions = styled.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  margin-top: 8px;
`;

const Btn = styled.button<{ primary?: boolean }>`
  padding: 8px 20px;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  font-weight: 500;
  background: ${({ primary }: any) => primary ? '#1890ff' : '#f5f5f5'};
  color: ${({ primary }: any) => primary ? '#fff' : '#333'};
  &:disabled { opacity: 0.5; cursor: not-allowed; }
`;

// BAD: Props typed with 'any'
interface Props {
  user?: any;
  onSubmit: any;
  onCancel: any;
  loading?: any;
}

interface State {
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  status: string;
  department: string;
  phone: string;
  errors: any;
  isSubmitting: boolean;
}

// BAD: Stand-alone callback-style functions defined at module level
// instead of using a validation library or async/await
function validateField(fieldName: any, value: any, callback: any) {
  setTimeout(() => {
    if (!value || String(value).trim() === '') {
      callback(`${fieldName} is required`);
    } else {
      callback(null);
    }
  }, 0);
}

function validateEmail(email: any, callback: any) {
  setTimeout(() => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(email)) {
      callback('Invalid email address');
    } else {
      callback(null);
    }
  }, 0);
}

function sanitizeInput(data: any, callback: any) {
  setTimeout(() => {
    const sanitized: any = {};
    Object.keys(data).forEach((key: any) => {
      sanitized[key] = typeof data[key] === 'string' ? data[key].trim() : data[key];
    });
    callback(null, sanitized);
  }, 0);
}

function formatPayload(data: any, isEdit: any, callback: any) {
  setTimeout(() => {
    const payload: any = { ...data };
    if (!isEdit) {
      payload.createdAt = new Date().toISOString();
      payload.permissions = [];
      payload.metadata = {};
    }
    callback(null, payload);
  }, 0);
}

function logSubmission(payload: any, callback: any) {
  setTimeout(() => {
    // BAD: console.log left in production code
    console.log('[UserForm] Submitting payload:', payload);
    callback(null, payload);
  }, 0);
}

class UserForm extends Component<Props, State> {
  state: State = {
    firstName: '',
    lastName: '',
    email: '',
    role: 'user',
    status: 'active',
    department: '',
    phone: '',
    errors: {},
    isSubmitting: false,
  };

  componentDidMount() {
    const { user } = this.props;
    if (user) {
      this.setState({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
        role: user.role || 'user',
        status: user.status || 'active',
        department: user.department || '',
        phone: user.phone || '',
      });
    }
  }

  // BAD: componentWillReceiveProps — deprecated lifecycle
  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.user && nextProps.user !== this.props.user) {
      this.setState({
        firstName: nextProps.user.firstName || '',
        lastName: nextProps.user.lastName || '',
        email: nextProps.user.email || '',
        role: nextProps.user.role || 'user',
        status: nextProps.user.status || 'active',
        department: nextProps.user.department || '',
        phone: nextProps.user.phone || '',
        errors: {},
      });
    }
  }

  handleChange = (field: string) => (e: any) => {
    this.setState({ [field]: e.target.value } as any);
    // BAD: clearing errors on change with direct mutation-style setState
    this.setState((prev: State) => ({
      errors: { ...prev.errors, [field]: null },
    }));
  };

  // CALLBACK HELL — 6 levels of nested callbacks for a simple form submit
  handleSubmit = (e: any) => {
    e.preventDefault();
    const { onSubmit, user } = this.props;
    const { firstName, lastName, email, role, status, department, phone } = this.state;
    const formData = { firstName, lastName, email, role, status, department, phone };

    this.setState({ isSubmitting: true, errors: {} });

    // Level 1 — validate firstName
    validateField('First name', firstName, (err1: any) => {
      if (err1) {
        this.setState({ errors: { firstName: err1 }, isSubmitting: false });
        return;
      }

      // Level 2 — validate lastName
      validateField('Last name', lastName, (err2: any) => {
        if (err2) {
          this.setState({ errors: { lastName: err2 }, isSubmitting: false });
          return;
        }

        // Level 3 — validate email format
        validateEmail(email, (err3: any) => {
          if (err3) {
            this.setState({ errors: { email: err3 }, isSubmitting: false });
            return;
          }

          // Level 4 — sanitize all inputs
          sanitizeInput(formData, (sanitizeErr: any, sanitizedData: any) => {
            if (sanitizeErr) {
              this.setState({ errors: { form: sanitizeErr }, isSubmitting: false });
              return;
            }

            // Level 5 — format the payload (add metadata for new users)
            formatPayload(sanitizedData, !!user, (formatErr: any, payload: any) => {
              if (formatErr) {
                this.setState({ errors: { form: formatErr }, isSubmitting: false });
                return;
              }

              // Level 6 — log and submit
              logSubmission(payload, (logErr: any, finalPayload: any) => {
                if (logErr) {
                  this.setState({ errors: { form: logErr }, isSubmitting: false });
                  return;
                }

                const submitPayload = user
                  ? { ...finalPayload, id: user.id }
                  : finalPayload;

                onSubmit(submitPayload);
                this.setState({ isSubmitting: false });
              });
            });
          });
        });
      });
    });
  };

  render() {
    const { onCancel, loading, user } = this.props;
    const { firstName, lastName, email, role, status, department, phone, errors, isSubmitting } = this.state;
    const busy = loading || isSubmitting;

    return (
      <Form onSubmit={this.handleSubmit}>
        <Row>
          <Field>
            <Label>First Name *</Label>
            <Input
              value={firstName}
              onChange={this.handleChange('firstName')}
              className={errors.firstName ? 'error' : ''}
              placeholder="John"
            />
            {errors.firstName && <ErrorText>{errors.firstName}</ErrorText>}
          </Field>
          <Field>
            <Label>Last Name *</Label>
            <Input
              value={lastName}
              onChange={this.handleChange('lastName')}
              className={errors.lastName ? 'error' : ''}
              placeholder="Doe"
            />
            {errors.lastName && <ErrorText>{errors.lastName}</ErrorText>}
          </Field>
        </Row>

        <Field>
          <Label>Email *</Label>
          <Input
            type="email"
            value={email}
            onChange={this.handleChange('email')}
            className={errors.email ? 'error' : ''}
            placeholder="john.doe@example.com"
          />
          {errors.email && <ErrorText>{errors.email}</ErrorText>}
        </Field>

        <Row>
          <Field>
            <Label>Role</Label>
            <StyledSelect value={role} onChange={this.handleChange('role')}>
              <option value="admin">Admin</option>
              <option value="manager">Manager</option>
              <option value="user">User</option>
              <option value="guest">Guest</option>
            </StyledSelect>
          </Field>
          <Field>
            <Label>Status</Label>
            <StyledSelect value={status} onChange={this.handleChange('status')}>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="suspended">Suspended</option>
            </StyledSelect>
          </Field>
        </Row>

        <Row>
          <Field>
            <Label>Department</Label>
            <Input
              value={department}
              onChange={this.handleChange('department')}
              placeholder="Engineering"
            />
          </Field>
          <Field>
            <Label>Phone</Label>
            <Input
              value={phone}
              onChange={this.handleChange('phone')}
              placeholder="+1-555-0100"
            />
          </Field>
        </Row>

        {errors.form && <ErrorText>{errors.form}</ErrorText>}

        <FormActions>
          <Btn type="button" onClick={onCancel} disabled={busy}>
            Cancel
          </Btn>
          <Btn primary type="submit" disabled={busy}>
            {busy ? 'Saving...' : user ? 'Save Changes' : 'Create User'}
          </Btn>
        </FormActions>
      </Form>
    );
  }
}

export default UserForm;
