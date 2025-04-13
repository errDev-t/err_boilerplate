# Err Boilerplate

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![React](https://img.shields.io/badge/React-18-blue)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-38B2AC)](https://tailwindcss.com/)

A modern FiveM boilerplate with React, Tailwind CSS, and other cutting-edge technologies for building high-performance NUI interfaces.

## 📚 Documentation

For detailed documentation and guides, visit [https://docs.err.cool](https://docs.err.cool)

## ✨ Features

- 🚀 **React 18** with TypeScript for robust frontend development
- 💨 **Tailwind CSS** for utility-first styling
- 🎨 **Shadcn UI** components for beautiful, accessible interfaces
- ⚡ **Vite** for lightning-fast development and building
- 🔌 Seamless FiveM NUI integration
- 🛠️ Modern development tools and best practices

## 🚀 Installation

1. Clone the repository into your resources folder
2. Install frontend dependencies:
   ```bash
   cd web
   pnpm install
   ```
3. Start the development server:
   ```bash
   pnpm dev
   ```

## 🔧 Configuration

1. Development mode uses `http://localhost:3000` by default
2. For production:
   - Build the frontend: `cd web && pnpm build`
   - Update `fxmanifest.lua` to use the built files

## 📦 Project Structure

```
├── client/         # Client-side FiveM scripts
├── config/         # Shared configuration files
├── web/           # React frontend application
│   ├── src/       # Source code
│   ├── public/    # Static assets
│   └── ...        # Build configuration
└── fxmanifest.lua # FiveM resource manifest
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
