import { Application } from 'pixi.js';
import { MenuScene } from './scenes/MenuScene';
import { SceneManager } from './scenes/SceneManager';

// Initialize PIXI Application
async function startGame() {
    // Get container dimensions
    const gameWidth = Math.min(window.innerWidth, 956);
    const gameHeight = Math.min(window.innerHeight, 440);

    const app = new Application();
    
    await app.init({
        width: gameWidth,
        height: gameHeight,
        backgroundColor: 0x000000,
        resolution: window.devicePixelRatio || 1,
    });

    // Add canvas to document
    document.body.appendChild(app.canvas);
    
    // Style canvas container
    app.canvas.style.position = 'absolute';
    app.canvas.style.left = '50%';
    app.canvas.style.top = '50%';
    app.canvas.style.transform = 'translate(-50%, -50%)';

    // Initialize SceneManager
    const sceneManager = new SceneManager(app);

    // Create and show menu scene
    const menuScene = new MenuScene(app);
    await sceneManager.showScene(menuScene);

    // Handle window resize
    window.addEventListener('resize', () => {
        const newWidth = Math.min(window.innerWidth, 956);
        const newHeight = Math.min(window.innerHeight, 440);
        
        app.renderer.resize(newWidth, newHeight);
    });
}

startGame().catch(console.error);
