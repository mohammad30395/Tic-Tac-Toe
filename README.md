# Tic Tac Toe Arena

A polished browser-based Tic Tac Toe game built with Next.js, React, and Tailwind CSS. The project is frontend-only and lets players create a match profile, customize board colors, choose a playing ground, play against another person or the computer, and track results in a local leaderboard.

## Features

- Custom player profile with name, username, grid color, X color, and O color
- Four selectable playing grounds with different visual styles
- Two match modes:
  - Two players on the same device
  - Player vs computer
- Three computer difficulty levels:
  - Easy: random moves
  - Medium: tactical wins, blocks, center preference, and mixed strategy
  - Hard: minimax-based optimal play
- Animated winning line when a player wins
- Session score tracking for player wins and draws
- Local leaderboard saved in the browser with recent match records
- Responsive layout designed for desktop and mobile screens

## Tech Stack

- [Next.js](https://nextjs.org/) 16
- [React](https://react.dev/) 19
- [Tailwind CSS](https://tailwindcss.com/) 3
- Browser `localStorage` for profile, match, arena, and leaderboard data

## Getting Started

### Prerequisites

Install Node.js and npm. A recent LTS version of Node.js is recommended.

### Installation

```bash
npm install
```

### Run the Development Server

```bash
npm run dev
```

Open the local URL shown in the terminal, usually:

```text
http://localhost:3000
```

### Build for Production

```bash
npm run build
```

### Start the Production Build

```bash
npm run start
```

## App Flow

1. Profile setup: enter your name and username, then choose colors for the grid, X, and O.
2. Ground selection: choose one of the available board themes.
3. Match setup: select two-player mode or computer mode. Computer mode includes easy, medium, and hard difficulty.
4. Game screen: play rounds, view the current score, start the next round after a result, or quit to the leaderboard.
5. Leaderboard: review saved match records from the current browser and clear them when needed.

## Project Structure

```text
.
├── app/
│   ├── page.jsx              # Profile setup screen
│   ├── ground/page.jsx       # Playing ground selection
│   ├── mode/page.jsx         # Match mode and player setup
│   ├── game/page.jsx         # Main Tic Tac Toe gameplay
│   ├── leaderboard/page.jsx  # Saved match records
│   ├── layout.jsx            # Root layout and metadata
│   └── globals.css           # Global styles and board animations
├── components/
│   ├── AppHeader.jsx
│   ├── ColorInput.jsx
│   ├── PrimaryButton.jsx
│   ├── ScoreStrip.jsx
│   └── TextInput.jsx
├── lib/
│   ├── game.js               # Winner detection and computer move logic
│   └── storage.js            # localStorage helpers
├── package.json
├── tailwind.config.js
└── next.config.mjs
```

## Game Logic

The core game rules live in `lib/game.js`.

- `getWinner(board)` checks all winning lines and detects draws.
- `getComputerMove(board, difficulty)` chooses the computer move based on the selected difficulty.
- Hard mode uses minimax, so the computer always chooses the strongest available move.

## Data Persistence

This project does not use a backend database. It stores user and match data in the browser through `localStorage`.

Stored data includes:

- Player profile
- Selected arena
- Current match configuration
- Leaderboard records

Because the leaderboard is local to the browser, records will not sync across devices or browsers.

## Available Scripts

```bash
npm run dev      # Start the Next.js development server
npm run build    # Create a production build
npm run start    # Run the production build
npm run lint     # Lint script defined in package.json
```

Note: `npm run build` has been verified. The current `npm run lint` script uses `next lint`, which may require an update depending on the installed Next.js version.

## Deployment

This is a standard Next.js app and can be deployed to platforms such as Vercel, Netlify, or any Node-compatible hosting provider.

For a typical production deployment:

```bash
npm install
npm run build
npm run start
```

## License

This project is licensed under the MIT License.

Copyright (c) 2026 Mohammad Mahmudul Kabir Fahmid. See the [LICENSE](LICENSE) file for details.
