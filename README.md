# User Management Panel

A deliberately bad React 16 app for studying agent-team refactoring workflows.
See [BAD_PRACTICES.md](./BAD_PRACTICES.md) for a full catalogue of anti-patterns.

## Stack

| Layer | Tech |
|-------|------|
| Frontend | React 16, TypeScript, styled-components, Redux (old-style), react-redux |
| Backend | Node.js, Express (mock data, no DB) |

## Quick Start

### BFF (port 4000)
```bash
cd bff
npm install
npm start
```

### Frontend (port 3000)
```bash
cd frontend
npm install
npm start
```

Open http://localhost:3000

## Project Structure

```
├── frontend/
│   └── src/
│       ├── components/
│       │   ├── UserManagementPage/   # God component
│       │   ├── UserForm/             # Callback hell
│       │   ├── UserStats/            # Hooks inside component
│       │   ├── UserList/             # Dead code + double source of truth
│       │   ├── UserDetails/          # Class component
│       │   ├── Header/               # Functional component
│       │   ├── UserCard/             # Dead component (never rendered)
│       │   ├── LegacyUserTable/      # Dead component (never imported)
│       │   └── Notification/         # Functional component
│       ├── redux/
│       │   ├── actions/              # String constants, any types, dead actions
│       │   └── reducers/             # any state, dead cases
│       ├── types/                    # Pervasive any
│       ├── api/                      # Dead functions
│       └── utils/                    # Dead helpers
└── bff/
    └── src/
        ├── routes/users.js
        └── data/mockData.js          # 12 hardcoded users
```