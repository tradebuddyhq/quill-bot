// Register slash commands with Discord
"use strict";

const { REST, Routes, SlashCommandBuilder } = require("discord.js");
const fs = require("fs");

// Load .env
try {
  const envFile = fs.readFileSync(".env", "utf-8");
  envFile.split("\n").forEach(line => {
    const [key, ...rest] = line.split("=");
    if (key && rest.length) process.env[key.trim()] = rest.join("=").trim();
  });
} catch (e) {}

const commands = [
  new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Check if the bot is alive"),

  new SlashCommandBuilder()
    .setName("help")
    .setDescription("Learn about Quill"),

  new SlashCommandBuilder()
    .setName("example")
    .setDescription("See a Quill code example")
    .addStringOption(option =>
      option.setName("topic")
        .setDescription("What example do you want to see?")
        .setRequired(true)
        .addChoices(
          { name: "Hello World", value: "hello" },
          { name: "Variables", value: "variables" },
          { name: "Functions", value: "functions" },
          { name: "Loops", value: "loops" },
          { name: "Conditions", value: "conditions" },
          { name: "Testing", value: "testing" },
          { name: "Discord Bot", value: "discord" }
        )
    ),

  new SlashCommandBuilder()
    .setName("syntax")
    .setDescription("Look up Quill syntax for a keyword")
    .addStringOption(option =>
      option.setName("keyword")
        .setDescription("Which keyword?")
        .setRequired(true)
        .addChoices(
          { name: "say (print)", value: "say" },
          { name: "is (assign/compare)", value: "is" },
          { name: "to (function)", value: "to" },
          { name: "if / otherwise", value: "if" },
          { name: "for each (loop)", value: "for" },
          { name: "test / expect", value: "test" },
          { name: "use (import)", value: "use" },
          { name: "give back (return)", value: "give back" }
        )
    ),
].map(cmd => cmd.toJSON());

const rest = new REST({ version: "10" }).setToken(process.env.DISCORD_TOKEN);

const GUILD_ID = "1480524541645295700";

(async () => {
  try {
    // Remove global commands first
    console.log("Clearing global commands...");
    await rest.put(
      Routes.applicationCommands(process.env.CLIENT_ID),
      { body: [] }
    );

    // Register guild-specific commands (instant)
    console.log("Registering server commands...");
    await rest.put(
      Routes.applicationGuildCommands(process.env.CLIENT_ID, GUILD_ID),
      { body: commands }
    );
    console.log("Done! Commands registered for server " + GUILD_ID + " (instant).");
  } catch (error) {
    console.error("Error registering commands:", error);
  }
})();
