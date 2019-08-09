const fs = require("fs");
const { default: { red, redBright, bold, greenBright, yellow } } = require("chalk");
const formatBadParam = value => typeof value === "string" ? `'${value}'` : typeof value;

const INCREMENT_ACTIONS = (value = "") => {
    value = value.split(".");
    return {
        "--patch": `${value[0]}.${value[1]}.${++value[2]}`,
        "--minor": `${value[0]}.${++value[1]}.0`,
        "--major": `${++value[0]}.0.0`
    };
};

// Determine increment type
const INCREMENT_TYPE = process.argv[2];
const INCREMENT_PRESETS = Object.keys(INCREMENT_ACTIONS());
if (!INCREMENT_PRESETS.includes(INCREMENT_TYPE)) {
    console.log(`${red("Expected argv[2] to be one of")}${bold(redBright("'" + INCREMENT_PRESETS.join("', '") + "'"))}${red(" but got ")}${bold(redBright(formatBadParam(INCREMENT_TYPE)))}${red(".")}`);
    process.exit();
}
console.log(`\nReceived command to increase version number: ${INCREMENT_TYPE}\n`);

// Determine current version number
console.log("Determining current version number...");
const { version: oldVersion } = JSON.parse(fs.readFileSync("package.json", "utf-8"));

// Increment of version number
console.log("Performing increment...");
let newVersion = INCREMENT_ACTIONS(oldVersion)[INCREMENT_TYPE];

// Append new version number
console.log("\nAppending new version number to the following files:");
const APPENDABLES = [
    {
        path: "package.json",
        target: `"version": "${oldVersion}"`,
        replace: `"version": "${newVersion}"`,
    },
    {
        path: "index.d.ts",
        target: `* @version ${oldVersion}`,
        replace: `* @version ${newVersion}`
    },
    {
        path: "lib/langutil.dev.js",
        target: `* @version ${oldVersion}`,
        replace: `* @version ${newVersion}`
    },
    {
        path: "lib/langutil.min.js",
        target: `* @version ${oldVersion}`,
        replace: `* @version ${newVersion}`
    },
];
for (let i = 0; i < APPENDABLES.length; i++) {
    const { path, target, replace } = APPENDABLES[i];
    try {
        let currentlyProcessing = fs.readFileSync(path, { encoding: "utf-8" });
        currentlyProcessing = currentlyProcessing.replace(target, replace);
        // console.log('\n\n\n' + currentlyProcessing) + '\n\n\n';
        // TODO: (RISKY) Append changes to actual file
        console.log(`${greenBright("✓")} ${path}`);
    } catch (error) {
        console.log(`${redBright("×")} ${path}`);
    }
}

// Final report
const formatType = value => value.replace(/\-/g, "").toUpperCase();
console.log("\nVersion number increase successful!");
console.log(`${yellow(oldVersion)} --${bold("(" + formatType(INCREMENT_TYPE) + ")")}-> ${greenBright(newVersion)}\n`);
