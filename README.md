<p align="center">
  <img src="./client/public/mclx500.png" alt="Project Icon" height="400">
</p>

<p align="center">
  <strong>MCLX (Muradian Community for Logic Exchange)</strong>
</p>

# Notes Application

This project is a simple "Notes" application built with React, TypeScript, and Vite. It allows users to register, log in, and create/view notes. The application showcases authentication and basic CRUD (Create, Read, Update, Delete) operations.

## Features

- User authentication (register and log in)
- Create, view, update, and delete notes
- Built with React and TypeScript for a modern development experience
- Powered by Vite for fast development and HMR (Hot Module Replacement)

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ["./tsconfig.node.json", "./tsconfig.app.json"],
      tsconfigRootDir: import.meta.dirname,
    },
  },
});
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from "eslint-plugin-react-x";
import reactDom from "eslint-plugin-react-dom";

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    "react-x": reactX,
    "react-dom": reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs["recommended-typescript"].rules,
    ...reactDom.configs.recommended.rules,
  },
});
```

## Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/mozaddedalfeshani/mclxboard.git
   cd mclxboard
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open the application in your browser at `http://localhost:5173`.

## License

This project is licensed under the MIT License.

## Open Source

This project is fully open source, and contributions are welcome. Feel free to fork the repository and submit pull requests!
