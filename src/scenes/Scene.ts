import { Application, Container } from 'pixi.js';

export abstract class Scene {
    protected app: Application;
    public container: Container;

    constructor(app: Application) {
        this.app = app;
        this.container = new Container();
    }

    abstract create(): Promise<void>;
    abstract destroy(): void;
} 