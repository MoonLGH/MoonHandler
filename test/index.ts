import {Handler} from "../src";
import {test} from "uvu";
import * as assert from "uvu/assert";

test("hasCategory", async ()=>{
  const handlerClient = new Handler({
    path: "./test/commands/$category/$commands",
  });
  await handlerClient.HandleCommand();
  if (!Array.isArray(handlerClient.files)) throw new Error("files is not an array");
  if (!Array.isArray(handlerClient.categories)) throw new Error("files is not an array");
  assert.type(handlerClient.path, "string");
  assert.ok(handlerClient.Commands.size > 0);
  assert.ok(handlerClient.findCommand("test"));
});

test("noCategory", async ()=>{
  const handlerClient = new Handler({
    path: "./test/commands//$commands",
  });
  await handlerClient.HandleCommand();
  if (!Array.isArray(handlerClient.files)) throw new Error("files is not an array");
  assert.type(handlerClient.path, "string");
  assert.ok(handlerClient.Commands.size > 0);
  assert.ok(handlerClient.findCommand("test"));
});


test.run();
