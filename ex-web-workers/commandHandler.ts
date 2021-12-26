/**
 * commandHandlers.ts
 * Handles the user input to run actions on the repository.
 */

import { productRepo } from "./repo.ts";
import { _Product, _Specs } from "./shared.ts";
import { fakeDB } from "../tests/web-workers-example/mocks.ts";

class CommandHandler {
  public exit = false;
  private logger: Worker | null = null;

  initWorker(worker: Worker) {
    this.logger = worker;
    this.logger.dispatchEvent(new Event("createWorker"));
  } //.

  add(args: string) {
    productRepo.add({ specs: JSON.parse(args) });
    this.log(`add ${args}`);
  } //.

  bye() {
    this.exit = true;
    this.log("bye");
    this.logger!.dispatchEvent(new Event("closeWorker"));
  } //.

  clear() {
    productRepo.clear();
    this.log(`clear`);
  } //.

  del(args: string) {
    productRepo.remove(args);
    this.log(`del ${args}`);
  } //.

  len() {
    const dbLength: number = productRepo.len();
    console.log(`DB has ${dbLength} records`);
    this.log(`len ${dbLength}`);
  } //.

  list() {
    console.log("LIST OF ELEMENTS");
    const all: _Product[] = productRepo.findAll();

    for (const elem in all) {
      const { id, specs } = all[elem];
      console.log(`${id}:`, specs);
    }
    this.log("list");
  } //.

  filter(criteria: string[]) {
    const [filter, value] = criteria;
    const found = productRepo.findBy(filter, value);

    for (const elem in found) {
      const { id, specs } = found[elem];
      console.log(`${id}:`, specs);
    }
    this.log(`filter ${criteria}`);
  } //.

  find(key: string) {
    const item: _Specs = productRepo.find(key);

    if (item) {
      console.log(`${key}:`, item);
    } else {
      console.log(`${key} not found`);
    }
    this.log(`find ${key}`);
  } //.

  handle(command: string, args: string[]) {
    switch (command.trim().toLowerCase()) {
      case "add":
        this.add(args.join(" "));
        break;
      case "del":
      case "remove":
        this.del(args.join(""));
        break;
      case "bye":
      case "exit":
        this.bye();
        break;
      case "clear":
        this.clear();
        break;
      case "help":
        console.log(this.help());
        break;
      case "init":
        this.init();
        break;
      case "len":
        this.len();
        break;
      case "list":
        this.list();
        break;
      case "filter":
        this.filter(args);
        break;
      case "find":
        this.find(args.join(""));
        break;
      default:
        console.log(`${command} command not implemented`);
    }
  } //.

  help(): string {
    this.log("help");
    return `Commands available
--------------------------------------------------
ADD {"propA": "item"}  Add item to the DB
                   ex: ADD {"category": "tablet", "brand": "Samsung", "price": 150}
BYE | EXIT             Exits the app
CLEAR                  Clears the whole DB
DEL | REMOVE id        Delete the item by ID n
FIND id                Get the item of ID n
FILTER criteria match !case sensitive & exact match (no intervals allowed)
                   ex: FILTER brand Sony
INIT                   Init DB with sample data
HELP                   Show this help
LEN                    Number of elements in our DB
LIST                   Lists all the records in our DB
--------------------------------------------------
`;
  } //.

  init() {
    fakeDB.forEach((elem) => productRepo.add(elem));
    this.log("init");
  } //.

  /**
   * Sends some content to our Worker.
   * @param lineToWrite : string
   */
  private log(lineToWrite: string) {
    this.logger!.postMessage({ op: lineToWrite });
  } //.
} //. CommandHandler

export { CommandHandler };
