// Compiled from bot.quill — Quill Discord Bot
"use strict";

const Discord = require("discord.js");
const fs = require("fs");

// Load environment variables from .env
try {
  const envFile = fs.readFileSync(".env", "utf-8");
  envFile.split("\n").forEach(line => {
    const [key, ...rest] = line.split("=");
    if (key && rest.length) process.env[key.trim()] = rest.join("=").trim();
  });
} catch (e) {}

const token = process.env.DISCORD_TOKEN;

const client = new Discord.Client({
  intents: [
    Discord.GatewayIntentBits.Guilds,
    Discord.GatewayIntentBits.GuildMessages,
    Discord.GatewayIntentBits.MessageContent
  ]
});

// Bot is ready
client.on("ready", () => {
  console.log(`Quill Bot is online as ${client.user.tag}!`);
});

// Handle slash commands
client.on("interactionCreate", (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const command = interaction.commandName;

  if (command === "ping") {
    interaction.reply("Pong! 🏓");
  }

  if (command === "help") {
    const embed = new Discord.EmbedBuilder()
      .setTitle("Quill — Code that reads like English")
      .setColor(0x1EB969)
      .setDescription("Quill is a beginner-friendly programming language that compiles to JavaScript.")
      .addFields(
        { name: "📖 Getting Started", value: "`npm install -g @tradebuddyhq/quill`\nThen create a `.quill` file and run `quill run file.quill`", inline: false },
        { name: "🌐 Playground", value: "[Try Quill in your browser](https://quill.tradebuddy.dev/playground)", inline: true },
        { name: "📚 Docs", value: "[Read the docs](https://quill.tradebuddy.dev/docs)", inline: true },
        { name: "💻 GitHub", value: "[View source](https://github.com/tradebuddyhq/quill)", inline: true }
      )
      .setFooter({ text: "Quill by Trade Buddy" });
    interaction.reply({ embeds: [embed] });
  }

  if (command === "example") {
    const topic = interaction.options.getString("topic");

    const examples = {
      "hello": '```\n-- Hello World in Quill\nsay "Hello, World!"\n```',
      "variables": '```\n-- Variables in Quill\nname is "Arhan"\nage is 16\nsay "My name is {name} and I\'m {age}"\n```',
      "functions": '```\n-- Functions in Quill\nto greet name:\n  say "Hello, {name}!"\n\ngreet("World")\n```',
      "loops": '```\n-- Loops in Quill\ncolors are ["red", "green", "blue"]\nfor each color in colors:\n  say "I like {color}"\n```',
      "conditions": '```\n-- Conditions in Quill\nage is 18\nif age is greater than 16:\n  say "You can drive"\notherwise:\n  say "Too young to drive"\n```',
      "testing": '```\n-- Testing in Quill\nto add a b:\n  give back a + b\n\ntest "addition":\n  expect add(2, 3) is 5\n  expect add(-1, 1) is 0\n```',
      "discord": '```\n-- Discord bot in Quill\nuse "discord.js" as Discord\n\nbot is createBot(process.env.TOKEN)\n\nbot on "ready" with:\n  say "Bot is online!"\n\nbot on "messageCreate" with msg:\n  if msg.content is "!hello":\n    msg.reply("Hello from Quill!")\n\nbot.login(process.env.TOKEN)\n```'
    };

    if (examples[topic]) {
      interaction.reply(examples[topic]);
    } else {
      interaction.reply("Unknown topic. Try: hello, variables, functions, loops, conditions, testing, discord");
    }
  }

  if (command === "syntax") {
    const keyword = interaction.options.getString("keyword");

    const syntaxHelp = {
      "say": '**`say`** — Print to the console\n```\nsay "Hello, World!"\nsay "2 + 2 = {2 + 2}"\n```',
      "is": '**`is`** — Assign a variable or check equality\n```\nname is "Quill"    -- assignment\nif name is "Quill":  -- comparison\n  say "correct!"\n```',
      "to": '**`to`** — Define a function\n```\nto greet name:\n  say "Hello, {name}!"\n\nto add a b:\n  give back a + b\n```',
      "if": '**`if` / `otherwise`** — Conditionals\n```\nif age is greater than 18:\n  say "adult"\notherwise if age is greater than 12:\n  say "teen"\notherwise:\n  say "child"\n```',
      "for": '**`for each`** — Loop over a list\n```\nfor each item in items:\n  say item\n```',
      "test": '**`test` / `expect`** — Built-in testing\n```\ntest "my feature":\n  expect 2 + 2 is 4\n  expect length("hello") is 5\n```',
      "use": '**`use`** — Import a module\n```\nuse "discord.js" as Discord\nuse "fs" as fs\n```',
      "give back": '**`give back`** — Return a value from a function\n```\nto double n:\n  give back n * 2\n```'
    };

    if (syntaxHelp[keyword]) {
      interaction.reply(syntaxHelp[keyword]);
    } else {
      interaction.reply("Unknown keyword. Try: say, is, to, if, for, test, use, give back");
    }
  }
});

client.login(token);
