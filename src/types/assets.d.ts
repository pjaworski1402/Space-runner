declare module '*.png' {
    const content: string;
    export default content;
}

declare module '*.mp3' {
    const content: ArrayBuffer;
    export default content;
}

interface Window {
    fontLoaded: boolean;
} 