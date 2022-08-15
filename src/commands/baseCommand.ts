export class BaseCommand {
    public name: string = "";

    public constructor(name: string) {
        this.name = name;
    }

    public run(): void {}
}
