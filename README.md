# PassCheck - Password Strength Analyzer

## Overview

PassCheck is a Next.js application designed to help users create strong and secure passwords. It provides real-time strength analysis as you type, offering a visual strength meter, a quantitative score, and actionable suggestions to improve your password's robustness. The goal is to empower users to understand what makes a password secure and guide them in crafting passwords that are resilient against common attack vectors.

## Features

*   **Real-time Password Analysis:** Get instant feedback on your password's strength as you type.
*   **Visual Strength Meter:** A segmented bar dynamically changes color and fills based on the calculated strength, providing an intuitive visual cue. Levels include: "Too Weak", "Weak", "Medium", "Strong", and "Very Strong".
*   **Quantitative Scoring System:** Your password receives a score from 0 to 100, based on a comprehensive set of criteria.
*   **Actionable Suggestions:** Clear, concise tips highlight what your password needs for improvement. Each suggestion indicates whether the criterion is met:
    *   At least 14 characters long.
    *   At least 18 characters long (strongly recommended).
    *   Contains uppercase letters (A-Z).
    *   Contains lowercase letters (a-z).
    *   Contains numbers (0-9).
    *   Contains symbols (e.g., !@#$%).
*   **Show/Hide Password Functionality:** Easily toggle the visibility of your password for convenient input and verification.
*   **Responsive Design:** The application is built to adapt to various screen sizes, ensuring a consistent and user-friendly experience on desktops, tablets, and mobile devices.
*   **Modern Dark Theme:** Features an aesthetically pleasing dark theme that is easy on the eyes, with a professional look and feel.

## Tech Stack

*   **Framework:** [Next.js](https://nextjs.org/) (v15+ with App Router)
*   **Language:** [TypeScript](https://www.typescriptlang.org/)
*   **UI Components:** [ShadCN/UI](https://ui.shadcn.com/)
*   **Styling:** [Tailwind CSS](https://tailwindcss.com/)
*   **Icons:** [Lucide React](https://lucide.dev/)
*   **State Management:** React Hooks (`useState`, `useEffect`)
*   **Linting & Formatting:** Default Next.js setup (ESLint, Prettier implicitly via editor/tooling)
*   **(Planned) AI Enhancements:** [Genkit](https://firebase.google.com/docs/genkit) (infrastructure in place, `src/ai/genkit.ts`)

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

*   [Node.js](https://nodejs.org/) (v20.x or later recommended)
*   [npm](https://www.npmjs.com/) (v10.x or later) or [yarn](https://yarnpkg.com/) (v1.22.x or later)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/passcheck.git # Replace with actual repo URL if applicable
    cd passcheck
    ```

2.  **Install dependencies:**
    Using npm:
    ```bash
    npm install
    ```
    Or using yarn:
    ```bash
    yarn install
    ```

### Environment Variables

Currently, the core password checking functionality does not require any specific environment variables.

If Genkit features are implemented in the future that require API keys (e.g., for Google AI services), you will need to create a `.env.local` file in the root of the project:

```env
# .env.local (Example for future Genkit integration)
# GOOGLE_API_KEY=YOUR_GOOGLE_AI_API_KEY
```
Refer to the Genkit documentation for specific environment variables if AI features are activated.

### Running the Development Server

To start the Next.js development server:

```bash
npm run dev
```
Or using yarn:
```bash
yarn dev
```
The application will typically be available at `http://localhost:9002` (as configured in `package.json`).

### Running Genkit (for AI development - if applicable)

If you are developing AI flows using Genkit:

*   To start the Genkit development environment (usually runs on a different port):
    ```bash
    npm run genkit:dev
    ```
*   To start Genkit with file watching and hot-reloading for AI flows:
    ```bash
    npm run genkit:watch
    ```

## Project Structure

The project follows a standard Next.js App Router structure:

```
passcheck/
├── .vscode/              # VS Code editor settings
├── components/           # Reusable React components
│   ├── ui/               # Base UI components from ShadCN (button, card, input, etc.)
│   └── password-checker.tsx # The core component for password input and strength analysis
├── public/               # Static assets (e.g., images - currently none specific)
├── src/
│   ├── ai/               # Genkit related files for AI functionality
│   │   ├── dev.ts        # Genkit development server entry point
│   │   └── genkit.ts     # Genkit global configuration (e.g., AI model selection)
│   ├── app/              # Next.js App Router directory
│   │   ├── globals.css   # Global styles, Tailwind directives, and CSS theme variables
│   │   ├── layout.tsx    # Root layout component (HTML shell, global providers)
│   │   └── page.tsx      # Main page component for the root route (/)
│   ├── hooks/            # Custom React hooks
│   │   ├── use-mobile.tsx # Hook to detect mobile screen sizes
│   │   └── use-toast.ts  # Hook for managing toast notifications
│   └── lib/              # Utility functions
│       └── utils.ts      # General utility functions (e.g., `cn` for Tailwind class merging)
├── .eslintrc.json        # ESLint configuration (implicitly via Next.js)
├── .gitignore            # Files and directories to be ignored by Git
├── components.json       # ShadCN UI configuration
├── next.config.ts        # Next.js application configuration
├── package.json          # Project metadata, dependencies, and scripts
├── postcss.config.js     # PostCSS configuration (implicitly via Next.js/Tailwind)
├── README.md             # This file
├── tailwind.config.ts    # Tailwind CSS configuration
└── tsconfig.json         # TypeScript compiler configuration
```

## Key Components

*   **`src/components/password-checker.tsx`**: This is the central component of the application. It handles:
    *   Password input field with show/hide toggle.
    *   Real-time evaluation of password strength.
    *   Display of the strength meter (visual bar).
    *   Display of the strength score (0-100).
    *   Listing of suggestions and their met status.
*   **`src/app/page.tsx`**: The main page for the application, responsible for rendering the `PasswordChecker` component within the main content area.
*   **`src/app/layout.tsx`**: The root layout that wraps all pages. It sets up the HTML structure, applies global fonts (Geist Sans), imports global CSS, initializes the dark theme, and includes the `Toaster` component for notifications.
*   **`src/app/globals.css`**: Defines global CSS styles, Tailwind CSS base layers, and custom CSS variables for theming (colors, border radius, etc.). This file is crucial for the application's dark theme and overall look and feel.

## Styling and Theming

The application's styling is primarily managed through:

*   **Tailwind CSS:** A utility-first CSS framework used for rapid UI development. Configuration is in `tailwind.config.ts`.
*   **ShadCN/UI:** A collection of beautifully designed, accessible, and customizable React components built on top of Radix UI and Tailwind CSS. These components (e.g., `Card`, `Input`, `Button`) are located in `src/components/ui/`.
*   **CSS Variables:** Defined in `src/app/globals.css` for theming. The application uses HSL color values for background, foreground, primary, accent, and other theme-related colors, defaulting to a dark theme. These variables are consumed by Tailwind CSS and ShadCN components.

The dark theme is enforced by adding the `dark` class to the `<html>` element in `src/app/layout.tsx`.

## Password Strength Algorithm

The password strength is evaluated client-side within the `PasswordChecker` component (`src/components/password-checker.tsx`). The algorithm considers several factors:

1.  **Length:**
    *   Base points awarded for meeting a minimum length of 14 characters.
    *   Additional bonus points for exceeding 18 characters.
2.  **Character Variety:** Points are awarded for the inclusion of:
    *   Uppercase letters (A-Z)
    *   Lowercase letters (a-z)
    *   Numbers (0-9)
    *   Symbols (any non-alphanumeric characters, heavily weighted)
3.  **Score Calculation:** The individual scores from these criteria are summed up.
4.  **Score Capping:** The total score is capped at a maximum of 100.
5.  **Strength Level Mapping:** The final score is mapped to a qualitative strength level:
    *   `0-39`: "Too Weak"
    *   `40-59`: "Weak"
    *   `60-79`: "Medium"
    *   `80-94`: "Strong"
    *   `95-100`: "Very Strong"

This information is then used to update the visual strength meter, display the score, and update the checklist of suggestions.

## How It Works

1.  The user navigates to the application, and the `HomePage` (`src/app/page.tsx`) renders the `PasswordChecker` component.
2.  The `PasswordChecker` component initializes with an empty password and default strength details.
3.  As the user types into the password input field:
    *   The `onChange` event triggers an update to the `password` state variable.
    *   A `useEffect` hook, dependent on the `password` state, recalculates the password strength.
    *   The strength calculation logic (described above) determines the score, level, and suggestion statuses.
    *   The `strengthDetails` state is updated, causing the UI to re-render with the new feedback.
4.  The visual strength bar, strength level text, score, and suggestion checklist update in real-time.
5.  The user can toggle password visibility using the eye icon button.

## Future Enhancements (Potential Roadmap)

*   **Genkit-Powered Advanced Analysis:**
    *   Integrate Genkit to provide more sophisticated AI-driven feedback (e.g., "Your password resembles common patterns," "Consider using less predictable symbols," "This password might be part of a known breach dictionary").
    *   Estimate time-to-crack based on complexity using AI models.
*   **Password Generation:** Add a feature to generate strong, random passwords based on user-configurable criteria (length, character types).
*   **Copy to Clipboard:** Allow users to easily copy the entered or generated password.
*   **Pwned Passwords Check:** (Privacy-preserving) integration with services like Have I Been Pwned to check if a password has appeared in data breaches.
*   **Customizable Policies:** Allow users or administrators to define custom password policies (e.g., for organizational use).
*   **Localization:** Support for multiple languages.

## Contributing

Contributions are welcome! If you have suggestions for improvements or want to contribute code, please follow these general steps:

1.  **Fork the repository.**
2.  **Create a new feature branch:**
    ```bash
    git checkout -b feature/your-amazing-feature
    ```
3.  **Make your changes.** Ensure you follow existing code style and conventions.
4.  **Commit your changes:**
    ```bash
    git commit -m "Add: Your amazing feature"
    ```
5.  **Push to your branch:**
    ```bash
    git push origin feature/your-amazing-feature
    ```
6.  **Open a Pull Request** against the `main` branch of the original repository.

Please provide a clear description of your changes in the Pull Request.

## License

This project is licensed under the MIT License. See the [LICENSE.md](LICENSE.md) file for details.
