# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh


new struncture
src/
├── components/           # Reusable UI components
│   ├── common/           # Shared components like buttons, inputs
│   ├── layout/           # Layout components
│   ├── forms/            # Form-related components
│   └── sliders/          # Slider components
├── pages/                # Page components
├── hooks/                # Custom React hooks
├── services/             # API and external service integrations
├── utils/                # Utility functions
├── styles/               # Global styles
├── constants/            # Constants and configuration
└── context/              # React context providers