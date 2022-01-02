import {Command} from "../../../src";

const command = new Command().setAlias(["test"]).setName("test").setDescription("test").setExecute((msg:string) => console.log(msg));
export default command;
