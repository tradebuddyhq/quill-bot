# quill-bot

The helper bot for the [Quill](https://quill.tradebuddy.dev) programming language community (Trade Buddy server)

## What is this?

This bot is*written in Quill (`bot.quill`) and compiled to JavaScript (`bot.js`)

```
quill build bot.quill    # compiles to bot.js
node bot.js              # runs the compiled output
```

## Commands

| Command | Description |
|---------|-------------|
| `/ping` | Check if the bot is alive |
| `/help` | Learn about Quill with links to docs, playground, and GitHub |
| `/example <topic>` | See Quill code examples (hello, variables, functions, loops, conditions, testing, discord) |
| `/syntax <keyword>` | Look up Quill syntax (say, is, to, if, for, test, use, give back) |

## Setup

```bash
# Install dependencies
npm install

# Create .env with your bot token and client ID
cp .env.example .env
# Edit .env with your values

# Register slash commands
node deploy-commands.js

# Run the bot
node bot.js
```

## How it works

Quill compiles to JavaScript. The source code is in `bot.quill` which is the only file you edit. The `bot.js` file is the compiled output

```
bot.quill  →  quill build  →  bot.js  →  node bot.js
 (you write)                  (auto-generated)    (runs it)
```

## Links

- [Quill Website](https://quill.tradebuddy.dev)
- [Quill Playground](https://quill.tradebuddy.dev/playground)
- [Quill Docs](https://quill.tradebuddy.dev/docs)
- [Discord Bot Guide](https://quill.tradebuddy.dev/docs/discord)
- [Discord Server](https://discord.gg/9rRyGRrh8E)
