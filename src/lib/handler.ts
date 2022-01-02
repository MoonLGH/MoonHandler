interface HandlerOptions {
    path:string;
}

import * as fs from "fs";
import Collection from "@discordjs/collection";
import {Command} from "./Commands";
import * as path from "path";

export class Handler {
  hasCategories?: boolean;
  path: string;
  Commands: Collection<string, Command>;
  ready = false;
  constructor(options:HandlerOptions={path: ""}) {
    this.Commands = new Collection<string, Command>();
    if (!options.path || !options.path.includes("$commands")) {
      throw new Error("Please set a valid commands path");
    }
    this.path = options.path;

    if (options.path.includes("$category")) {
      this.hasCategories = true;
    }
  }

  get categories() {
    if (!this.hasCategories) throw new Error("you dont have categories in your path");
    const categoryPath = this.path.split("$category")[0];
    return fs.readdirSync(categoryPath, {withFileTypes: true}).filter((dirent) => dirent.isDirectory()).map((dirent) => dirent.name);
  }

  get files() {
    const files = [];
    if (this.hasCategories) {
      for (const cat of this.categories) {
        for (const file of fs.readdirSync(this.path.split("$category")[0] + cat)) {
          files.push({
            path: this.path.replace("$category", cat).replace("$commands", file),
            category: cat,
            fileName: file,
          });
        }
      }
    }
    return this.hasCategories ? files : fs.readdirSync(this.path.split("$commands")[0], {withFileTypes: true}).filter((dirent) => dirent.isFile()).map((dirent) => ({fileName: dirent.name, path: this.path.replace("$commands", dirent.name)}));
  }

  async HandleCommand() {
    for (const file of this.files) {
      const command = (await import(path.resolve(file.path))).default;
      if (!(command instanceof Command)) throw new Error("Command must be an instance of Command");
      if (!command.name) throw new Error("Command must have a name");
      if (!command.executeFunction) throw new Error("Command must have a execute function");
      this.Commands.set(command.name, command);
    }
    return this.Commands;
  }

  findCommand(str:string) {
    return this.findByName(str) || this.findByAlias(str);
  }

  findByName(str:string) {
    return this.Commands.get(str) || this.Commands.find((cmd) => cmd.name === str);
  }

  findByAlias(str:string) {
    return this.Commands.find((cmd) => cmd.alias.includes(str));
  }
}
