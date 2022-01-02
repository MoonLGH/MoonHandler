import {Command} from "../../../src";

const command = new Command({name: "test2", alias: ["test2"], description: "test", execute: (msg:string) => console.log(msg)});
export default command;
