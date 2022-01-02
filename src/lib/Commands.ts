/* eslint-disable @typescript-eslint/ban-types */
export class Command {
  name: string | undefined;
  description: string | undefined;
  alias!: string[];
  executeFunction: Function | undefined;

  constructor(options?:CommandOptions) {
    this.alias = [];
    if (options) {
      if ("name" in options) {
        if (typeof options.name !== "string") throw new Error("Name must be a string");
        this.setName(options.name);
      }
      if ("description" in options) {
        if (typeof options.description !== "string") throw new Error("Description must be a string");
        this.setDescription(options.description);
      }
      if ("alias" in options) {
        if (!Array.isArray(options.alias)) throw new Error("Alias must be an array");
        if (!options.alias.every((i) => (typeof i === "string"))) throw new Error("Alias must be an array of strings");
        this.setAlias(options.alias);
      }
      if ("execute" in options) {
        if (typeof options.execute !== "function") throw new Error("Execute must be a function");
        this.setExecute(options.execute);
      }
    }
  }

  setName(name:string) {
    if (typeof name !== "string") throw new Error("Name must be a string");
    this.name = name;
    return this;
  }

  setDescription(description:string) {
    if (typeof description !== "string") throw new Error("Description must be a string");
    this.description = description;
    return this;
  }

  setAlias(alias:string[]) {
    if (!Array.isArray(alias)) throw new Error("Alias must be an array");
    if (!alias.every((i) => (typeof i === "string"))) throw new Error("Alias must be an array of strings");
    this.alias = alias;
    return this;
  }

  setExecute(execute:Function) {
    if (typeof execute !== "function") throw new Error("Execute must be a function");
    this.executeFunction = execute;
    return this;
  }

  execute(...args:unknown[]) {
    if (this.executeFunction) this.executeFunction(...args);
  }
}

interface CommandOptions {
  name:string;
  alias?:string[];
  description?:string;
  customOption?:object;
  execute?:Function;
}

