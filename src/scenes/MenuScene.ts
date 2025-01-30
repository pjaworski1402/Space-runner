import { Application, Container, Text, TextStyle, Sprite, Texture, Assets, TilingSprite } from 'pixi.js';
import { Scene } from './Scene';
import button from '../assets/image/button_play.png';
import ground from '../assets/image/0.png';
import water from '../assets/image/1.png';
import mountains from '../assets/image/3.png';
import clouds from '../assets/image/4.png';
import sky from '../assets/image/5.png';
import music from '../assets/music/music.mp3';

export class MenuScene extends Scene {
    private skyTiling: TilingSprite | null = null;
    private cloudsTiling: TilingSprite | null = null;
    private mountainsTiling: TilingSprite | null = null;
    private waterTiling: TilingSprite | null = null;
    private groundTiling: TilingSprite | null = null;
    private skyAnimation: () => void;
    private backgroundMusic: HTMLAudioElement | null = null;
    private musicLoaded: boolean = false;
    
    constructor(app: Application) {
        super(app);
        this.skyAnimation = () => {
            if (this.skyTiling) {
                this.skyTiling.tilePosition.x -= 0.1;
            }
            if (this.cloudsTiling) {
                this.cloudsTiling.tilePosition.x -= 0.15;
            }
            if (this.mountainsTiling) {
                this.mountainsTiling.tilePosition.x -= 0.2;
            }
            if (this.waterTiling) {
                this.waterTiling.tilePosition.x -= 0.3;
            }
            if (this.groundTiling) {
                this.groundTiling.tilePosition.x -= 0.4;
            }
        };
    }

    async create() {
        try {
            this.backgroundMusic = new Audio();
            this.backgroundMusic.src = music;
            this.backgroundMusic.loop = true;
            this.backgroundMusic.volume = 0.5;
            this.musicLoaded = true;
        } catch (error) {
            console.error('Błąd ładowania muzyki:', error);
        }

        // Czekamy na załadowanie czcionki
        if (!window.fontLoaded) {
            await new Promise<void>((resolve) => {
                const checkFont = () => {
                    if (window.fontLoaded) {
                        resolve();
                    } else {
                        setTimeout(checkFont, 100);
                    }
                };
                checkFont();
            });
        }

        const skyTexture = await Assets.load(sky);
        this.skyTiling = new TilingSprite({
            texture: skyTexture,
            width: this.app.screen.width,
            height: this.app.screen.height
        });
        
        const scaleY = this.app.screen.height / skyTexture.height;
        this.skyTiling.tileScale.set(scaleY);
        this.container.addChild(this.skyTiling);

        const cloudsTexture = await Assets.load(clouds);
        this.cloudsTiling = new TilingSprite({
            texture: cloudsTexture,
            width: this.app.screen.width,
            height: this.app.screen.height / 2
        });
        
        const cloudsScaleY = (this.app.screen.height / 1.5) / cloudsTexture.height;
        this.cloudsTiling.tileScale.set(cloudsScaleY);
        this.container.addChild(this.cloudsTiling);

        const mountainsTexture = await Assets.load(mountains);
        this.mountainsTiling = new TilingSprite({
            texture: mountainsTexture,
            width: this.app.screen.width,
            height: this.app.screen.height / 2
        });
        
        const mountainsScaleY = (this.app.screen.height / 1.8) / mountainsTexture.height;
        this.mountainsTiling.tileScale.set(mountainsScaleY);
        this.mountainsTiling.position.y = this.app.screen.height / 2.75;
        this.container.addChild(this.mountainsTiling);

        const waterTexture = await Assets.load(water);
        this.waterTiling = new TilingSprite({
            texture: waterTexture,
            width: this.app.screen.width,
            height: this.app.screen.height / 2
        });
        
        const waterScaleY = (this.app.screen.height / 2) / waterTexture.height;
        this.waterTiling.tileScale.set(waterScaleY);
        this.waterTiling.position.y = this.app.screen.height / 2.1;
        this.container.addChild(this.waterTiling);

        const groundTexture = await Assets.load(ground);
        this.groundTiling = new TilingSprite({
            texture: groundTexture,
            width: this.app.screen.width,
            height: this.app.screen.height / 2
        });
        
        const groundScaleY = (this.app.screen.height / 2.2) / groundTexture.height;
        this.groundTiling.tileScale.set(groundScaleY);
        this.groundTiling.position.y = this.app.screen.height / 1.83;
        this.container.addChild(this.groundTiling);

        this.app.ticker.add(this.skyAnimation);

        const titleStyle = new TextStyle({
            fontFamily: 'Pixelify Sans',
            fontSize: 64,
            fill: '#FFFDD9',
            fontWeight: '400'
        });

        const title = new Text('Space\nRunner', titleStyle);
        title.anchor.set(0.5);
        title.position.set(this.app.screen.width / 2, 150);
        title.style.align = 'center';
        this.container.addChild(title);

        const buttonTexture = await Assets.load(button);
        const playButton = Sprite.from(buttonTexture);
        
        playButton.anchor.set(0.5);
        playButton.position.set(this.app.screen.width / 2, 300);
        playButton.eventMode = 'static';
        playButton.cursor = 'pointer';
        
        playButton.on('pointerdown', () => {
            // TODO: Handle play button click
            console.log('Play clicked');
        });

        this.container.addChild(playButton);

        // Dodaj przycisk do włączania/wyłączania muzyki (po przycisku play)
        const musicButtonStyle = new TextStyle({
            fontFamily: 'Pixelify Sans',
            fontSize: 24,
            fill: '#FFFDD9',
        });

        const musicButton = new Text('Play Music', musicButtonStyle);
        musicButton.anchor.set(0.5);
        musicButton.position.set(this.app.screen.width / 2, 400);
        musicButton.eventMode = 'static';
        musicButton.cursor = 'pointer';
        
        musicButton.on('pointerdown', () => {
            if (this.musicLoaded && this.backgroundMusic) {
                if (this.backgroundMusic.paused) {
                    this.backgroundMusic.play();
                    musicButton.text = 'Stop Music';
                } else {
                    this.backgroundMusic.pause();
                    musicButton.text = 'Play Music';
                }
            }
        });

        this.container.addChild(musicButton);
    }

    destroy() {
        if (this.backgroundMusic) {
            this.backgroundMusic.pause();
            URL.revokeObjectURL(this.backgroundMusic.src);
            this.backgroundMusic = null;
        }
        this.app.ticker.remove(this.skyAnimation);
        this.container.destroy(true);
    }
} 