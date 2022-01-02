import {Command} from "../../src/";

const cmd = new Command().setName("test").setAlias(["t"]).setDescription("test command").setExecute(() => {
  console.log("test");
});
export default cmd;
