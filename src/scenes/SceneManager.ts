import { Application, Container } from 'pixi.js';
import { Scene } from './Scene';

export class SceneManager {
    private currentScene: Scene | null = null;
    private app: Application;

    constructor(app: Application) {
        this.app = app;
    }

    async showScene(scene: Scene) {
        if (this.currentScene) {
            this.app.stage.removeChild(this.currentScene.container);
            this.currentScene.destroy();
        }

        this.currentScene = scene;
        this.app.stage.addChild(scene.container);
        await scene.create();
    }
} 