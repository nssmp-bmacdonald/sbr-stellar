#!/usr/bin/env node

import fs from "fs";
import path from "path";
import url from "url";
import { execSync } from "child_process";
import inquirer from "inquirer";
import gradient from "gradient-string";
import figlet from "figlet";

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const CURR_DIR = process.cwd();

interface Answers {
  projectName: string;
  description: string;
  language: string;
  framework: string;
  storybook: string;
}

console.log(figlet.textSync("SBR Packges"));

inquirer
  .prompt([
    {
      name: "projectName",
      type: "input",
      message: "Package name: ",
      validate: function (input) {
        if (/^([A-Za-z\-\_\d])+$/.test(input)) return true;
        else return "Package name may only include letters, numbers, underscores and hashes.";
      },
    },
    {
      name: "description",
      type: "input",
      message: "Package description: ",
    },
    {
      name: "language",
      type: "list",
      message: "What langauge would you like to use?",
      choices: ["javascript", "typescript"],
      default: "typescript",
    },
    {
      name: "framework",
      type: "list",
      message: "What frontend CSS library to use?",
      choices: ["bootstrap", "tailwind"],
    },
    {
      name: "storybook",
      type: "list",
      message: "Would you like to use storybook?",
      choices: ["yes", "no"],
    },
  ])
  .then(({ projectName, description, language, storybook, framework }: Answers) => {
    if (fs.existsSync(projectName)) {
      console.log(`${projectName} already exists`);
      return;
    }

    fs.mkdirSync(projectName);

    var templateName = "";
    if (language === "typescript") {
      templateName += "ts";
    } else {
      templateName += "js";
    }

    templateName += `-${framework}`;
    templateName += "-storybook";

    if (storybook === "no") {
      console.log("Sorry you gotta use storybook");
    }

    const templatePath = path.join(__dirname, `templates/${templateName}`);
    copyTemplate(templatePath, projectName);

    const writePath = `${CURR_DIR}/${projectName}/package.json`;
    const contents = fs.readFileSync(writePath, "utf8");
    const json = JSON.parse(contents);

    //Access the users local npm configuration to set as package author
    const userName = execSync("npm config get init-author-name").toString().replace(/\n$/, "");

    json.author = userName;
    json.description = description;
    json.name = `@nssmp-bmacdonald/${projectName}`;

    fs.writeFileSync(writePath, JSON.stringify(json, null, 2), "utf8");

    console.log("Created Package: \n");

    console.log(
      gradient(
        Object.values({
          blue: "#add7ff",
          cyan: "#89ddff",
          green: "#5de4c7",
          magenta: "#fae4fc",
          red: "#d0679d",
          yellow: "#fffac2",
        })
      ).multiline(figlet.textSync(projectName))
    );
  });

function copyTemplate(template: string, projectName: string) {
  const filesToCreate = fs.readdirSync(template);

  filesToCreate.forEach((file) => {
    const templateFile = path.join(template, file);
    const stats = fs.statSync(templateFile);

    if (stats.isFile()) {
      const contents = fs.readFileSync(templateFile, "utf8");
      const writePath = `${CURR_DIR}/${projectName}/${file}`;
      fs.writeFileSync(writePath, contents, "utf8");
    } else if (stats.isDirectory()) {
      fs.mkdirSync(`${CURR_DIR}/${projectName}/${file}`);
      copyTemplate(`${template}/${file}`, `${projectName}/${file}`);
    }
  });
}
