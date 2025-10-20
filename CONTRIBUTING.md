# Contributing to ChittChat 💬

First off, thank you for considering contributing to ChittChat! We're thrilled you're here. This project thrives on community contributions, and we believe that every line of code, documentation update, or bug report helps make ChittChat better for everyone.

This guide is designed to be a comprehensive resource, walking you through the entire contribution process from finding an issue to getting your pull request merged.

## 📜 Table of Contents

* [Our Contribution Philosophy](#our-contribution-philosophy)
* [Your Contribution Journey](#your-contribution-journey)
    * [1. Finding an Issue to Work On](#1-finding-an-issue-to-work-on)
    * [2. Forking & Cloning the Repository](#2-forking--cloning-the-repository)
    * [3. Keeping Your Fork Synced](#3-keeping-your-fork-synced)
    * [4. Creating a Branch](#4-creating-a-branch)
* [🚀 Setting Up Your Local Environment](#-setting-up-your-local-environment)
    * [Prerequisites](#prerequisites)
    * [Installation](#installation)
    * [Environment Variables (`.env`)](#environment-variables-env)
    * [Running the Application](#running-the-application)
    * [Common Setup Errors & Fixes](#common-setup-errors--fixes)
* [💻 The Art of Making Changes](#-the-art-of-making-changes)
    * [Our Coding Style](#our-coding-style)
    * [Writing Excellent Commit Messages](#writing-excellent-commit-messages)
* [✅ Submitting Your Pull Request](#-submitting-your-pull-request)
    * [The Process](#the-process)
    * [Using the Pull Request Template](#using-the-pull-request-template)
    * [What to Expect During a Review](#what-to-expect-during-a-review)
* [❓ Where to Get Help](#-where-to-get-help)

## Our Contribution Philosophy

We believe in a welcoming and inclusive community. Our goal is to create a space where people of all skill levels can learn, grow, and contribute. We expect all contributors to be respectful, open-minded, and collaborative. Please be kind in all your interactions.

## Your Contribution Journey

Ready to get started? Here's the path you'll take from an idea to a merged contribution.

### 1. Finding an Issue to Work On

The best place to start is our **[Issues Tab](https://github.com/shambhaveesrivastava12/ChittChat/issues)**.
* Look for issues labeled `good first issue` or `help wanted`. These are specifically prepared for new contributors.
* If you have your own idea, please **open a new issue** to propose your change. This allows us to discuss the feature and make sure it aligns with the project's goals before you spend time on it.
* Once you've chosen an issue, comment on it to let us know you'd like to work on it. We'll assign it to you.

### 2. Forking & Cloning the Repository

First, you'll need your own copy of the project.
1.  **Fork** the main [ChittChat repository](https://github.com/shambhaveesrivastava12/ChittChat) to your GitHub account.
2.  **Clone** your fork to your local machine, replacing `<YOUR_USERNAME>`:
    ```bash
    git clone [https://github.com/](https://github.com/)<YOUR_USERNAME>/ChittChat.git
    cd ChittChat
    ```

### 3. Keeping Your Fork Synced

To avoid conflicts, it's important to keep your fork's `main` branch updated with the original repository.

1.  **Add the original repository as an "upstream" remote:**
    ```bash
    git remote add upstream [https://github.com/shambhaveesrivastava12/ChittChat.git](https://github.com/shambhaveesrivastava12/ChittChat.git)
    ```
2.  **Before creating a new branch, always pull the latest changes from the upstream main branch:**
    ```bash
    git checkout main
    git pull upstream main
    ```

### 4. Creating a Branch

Create a new branch for every issue you work on. This isolates your changes and makes the review process much cleaner.

> 💡 **Branch Naming Convention:** We use the format `<type>/<short-description>`.
>
> * **Features:** `feat/add-dark-mode`
> * **Bug Fixes:** `fix/login-button-bug`
> * **Documentation:** `docs/update-contributing-guide`

```bash
git checkout -b feat/your-cool-new-feature
```

## 🚀 Setting Up Your Local Environment

This section contains the detailed, step-by-step instructions to get ChittChat running on your machine.

### Prerequisites

-   **Node.js**: v12 or higher.
-   **MongoDB**: Make sure the database service is actively running.
-   **npm** / **yarn**: Comes with Node.js.

### Installation

1.  **Install Backend Dependencies** (from the project's root directory):
    ```bash
    npm install
    ```
2.  **Install Frontend Dependencies**:
    ```bash
    npm install --prefix frontend
    ```

### Environment Variables (`.env`)

> ⚠️ **Important:** The `.env` file must be created in the **ROOT** directory of the project, not inside the `backend` folder.

1.  Create a file named `.env` in the project's root.
2.  Copy the following configuration into it:

    ```bash
    PORT=5000
    MONGO_DB_URI=mongodb://localhost:27017/
    JWT_SECRET=your_jwt_secret
    NODE_ENV=development
    BREVO_API_KEY=your_api_key
    ```

### Running the Application

You'll need **two separate terminals**.

* **Terminal 1 (Backend Server):** In the **root** `ChittChat` directory, run:
    ```bash
    npm start
    ```
* **Terminal 2 (Frontend Client):** In the `frontend` directory, run:
    ```bash
    cd frontend
    npm run dev
    ```

Your browser should open to the Vite development server (e.g., `http://localhost:5173`).

### Common Setup Errors & Fixes

* **Error:** `mongosh: command not found`
    * **Fix:** This means MongoDB's command-line tools are not in your system's PATH. You need to find your MongoDB `bin` directory and add it to your system's environment variables.
* **Error:** `The 'uri' parameter... must be a string, got "undefined"`
    * **Fix:** This is almost always an issue with your `.env` file. Double-check that:
        1.  The file is named exactly `.env` (not `.env.txt`).
        2.  It is located in the **ROOT** project folder.
        3.  The variable is spelled exactly `MONGO_DB_URI`.
* **Problem:** The frontend shows a blank white page.
    * **Fix:** Open your browser's developer console (Right-click > Inspect > Console). This will show you the exact JavaScript error that is preventing React from rendering.

## 💻 The Art of Making Changes

### Our Coding Style

-   **Consistency is Key:** Please try to match the style and patterns you see in the existing codebase.
-   **React:** We use functional components with Hooks.
-   **JavaScript:** Prefer modern ES6+ syntax (e.g., `const`/`let`, arrow functions, destructuring).
-   **Tailwind CSS:** Use theme values where possible and add new styles in a way that is consistent with the existing UI.

### Writing Excellent Commit Messages

We use the **[Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/)** standard. This helps us maintain a clear and searchable git history.

**Format:** `<type>(<scope>): <subject>`
* `<scope>` is optional.

**Examples:**
* `feat: Add emoji picker to chat input`
* `fix(auth): Correct password validation error`
* `docs: Update local setup instructions in CONTRIBUTING.md`
* `style(sidebar): Reformat component with Prettier`
* `refactor: Simplify message sending logic`
* `chore: Upgrade emoji-picker-react to latest version`

## ✅ Submitting Your Pull Request

### The Process

1.  Commit your changes with clear, conventional messages.
2.  Push your branch to your fork on GitHub: `git push origin feat/your-cool-new-feature`
3.  Go to the main ChittChat repository and you will see a prompt to open a Pull Request from your new branch.

### Using the Pull Request Template

Please fill out the Pull Request template provided. It helps us understand your changes at a glance.

> 💡 **Pro-Tip:** A great PR description includes a "before" and "after" screenshot or a short screen recording (Loom is great for this).

### What to Expect During a Review

A project maintainer will review your PR.
* We may ask questions or request changes. This is a normal and healthy part of the contribution process!
* Once your PR is approved and all checks have passed, a maintainer will merge it into the main branch.
* 🎉 Congratulations, and thank you for your contribution!

## ❓ Where to Get Help

If you get stuck at any point, don't hesitate to ask for help! The best place is by commenting on your issue or pull request on GitHub.

Thank you again for being a part of the ChittChat community. We look forward to your contributions! ❤️