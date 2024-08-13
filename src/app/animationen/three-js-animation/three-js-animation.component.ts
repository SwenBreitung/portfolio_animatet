import { Component, ElementRef, OnInit, Renderer2, ViewChild, AfterViewInit, OnDestroy, Input } from '@angular/core';
import * as THREE from 'three';

@Component({
  selector: 'app-three-js-animation',
  standalone: true,
  template: `
    <div #canvasContainer class="canvas-container"></div>
  `,
  styles: [`
    :host {
      display: block;
      width: 100%;
      height: 100%;
      overflow: hidden;
    }
    .canvas-container {
      width: 100%;
      height: 100%;
      position: relative;
      overflow: hidden;
    }
    canvas {
      width: 100% !important;
      height: auto !important; /* Ensure height adjusts according to aspect ratio */
      display: block;
    }
  `]
})
export class ThreeJsAnimationComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('canvasContainer', { static: true }) canvasContainerRef!: ElementRef;
  @Input() texturePath!: string; // Add an input property for the texture path
  private renderer!: THREE.WebGLRenderer;
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private imageMesh!: THREE.Mesh;
  private resizeListener: (() => void) | null = null;

  private targetRotationX: number = 0;
  private targetRotationY: number = 0;
  private currentRotationX: number = 0;
  private currentRotationY: number = 0;

  constructor(private renderer2: Renderer2) { }

  ngOnInit(): void {
    this.initThreeJS();
  }

  ngAfterViewInit(): void {
    if (this.canvasContainerRef.nativeElement) {
      this.renderer2.appendChild(this.canvasContainerRef.nativeElement, this.renderer.domElement);
      this.onWindowResize(); // Ensure the canvas is resized to fit the container initially
      this.animate();
    } else {
      console.error('Canvas element not found!');
    }
  }

  ngOnDestroy(): void {
    if (this.resizeListener) {
      this.resizeListener();
    }
  }

  private initThreeJS(): void {
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    
    // Set the pixel ratio to the maximum possible value
    this.renderer.setPixelRatio(Math.max(window.devicePixelRatio, 2));

    this.renderer.setClearColor(new THREE.Color('rgb(18, 18, 18)'), 1); // Set background color with alpha channel

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.camera.position.z = 2; // Set the camera position to adjust the view

    const scale = 1.3; // Adjust the scale to make the plane smaller
    const geometry = new THREE.PlaneGeometry(scale * 2, scale * 2); // Adjust the size of the plane
    const material = new THREE.MeshBasicMaterial({ transparent: true }); // Make the material transparent

    const textureLoader = new THREE.TextureLoader();
    textureLoader.load(this.texturePath, (texture) => {
      texture.anisotropy = this.renderer.capabilities.getMaxAnisotropy(); // Set anisotropy to maximum
      material.map = texture;
      material.needsUpdate = true;
      this.imageMesh = new THREE.Mesh(geometry, material);
      this.scene.add(this.imageMesh);
    }, undefined, (err) => {
      console.error('An error happened:', err);
    });

    this.resizeListener = this.renderer2.listen('window', 'resize', this.onWindowResize.bind(this));

    this.renderer2.listen(this.canvasContainerRef.nativeElement, 'mousemove', (event: MouseEvent) => this.onMouseMove(event));
    this.renderer2.listen(this.canvasContainerRef.nativeElement, 'mouseleave', () => this.onMouseLeave());
  }

  private animate = (): void => {
    requestAnimationFrame(this.animate);

    this.currentRotationX += (this.targetRotationX - this.currentRotationX) * 0.05;
    this.currentRotationY += (this.targetRotationY - this.currentRotationY) * 0.05;

    if (this.imageMesh) {
      this.imageMesh.rotation.x = this.currentRotationX;
      this.imageMesh.rotation.y = this.currentRotationY;
    }

    this.renderer.render(this.scene, this.camera);
  };

  private onWindowResize(): void {
    const container = this.canvasContainerRef.nativeElement;
    const width = container.clientWidth;
    const height = container.clientHeight;

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(width, height);
    this.renderer.domElement.style.width = '100%';
    this.renderer.domElement.style.height = 'auto';
  }

  private onMouseMove(event: MouseEvent): void {
    const rect = this.canvasContainerRef.nativeElement.getBoundingClientRect();
    const mouseX = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    const mouseY = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    this.targetRotationY = mouseX * Math.PI * 0.2;
    this.targetRotationX = mouseY * Math.PI * 0.2;
  }

  private onMouseLeave(): void {
    this.targetRotationX = 0;
    this.targetRotationY = 0;
  }
}

