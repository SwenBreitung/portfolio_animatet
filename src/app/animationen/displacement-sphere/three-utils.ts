import { WebGLRenderer, Scene } from 'three';

export function cleanRenderer(renderer: WebGLRenderer): void {
  renderer.dispose();
}

export function cleanScene(scene: Scene): void {
  while (scene.children.length > 0) {
    const child = scene.children[0];
    scene.remove(child);
  }
}

export function removeLights(lights: any[]): void {
  lights.forEach(light => {
    if (light.parent) {
      light.parent.remove(light);
    }
  });
}