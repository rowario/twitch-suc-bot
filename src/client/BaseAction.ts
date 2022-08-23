import { RedemAction } from "../types/common";
import Client from "./Client";

export interface ActionsOptions {
    name: RedemAction;
}

export class BaseAction {
    public name: string;
    public constructor(public client: Client, public options: ActionsOptions) {
        this.name = options.name;
    }

    async run(): Promise<void> {}
}
