// import { Component, ElementRef, OnInit, Renderer2, ViewChild, AfterViewInit, OnDestroy, Input } from '@angular/core';
// import * as THREE from 'three';

// @Component({
//   selector: 'app-three-js-animation',
//   standalone: true,
//   template: `
//     <div #canvasContainer class="canvas-container"></div>
//   `,
//   styles: [`
//     :host {
//       display: block;
//       width: 100%;
//       height: 100%;
//       overflow: hidden;
//     }
//     .canvas-container {
//       width: 100%;
//       height: 100%;
//       position: relative;
//       overflow: hidden;
//     }
//     canvas {
//       width: 100% !important;
//       height: 100% !important;
//       display: block;
//     }
//   `]
// })
// export class ThreeJsAnimationComponent implements OnInit, AfterViewInit, OnDestroy {
//   @ViewChild('canvasContainer', { static: true }) canvasContainerRef!: ElementRef;
//   @Input() texturePath!: string;
//   private renderer!: THREE.WebGLRenderer;
//   private scene!: THREE.Scene;
//   private camera!: THREE.PerspectiveCamera;
//   private imageMesh!: THREE.Mesh;
//   private resizeListener: (() => void) | null = null;

//   private targetRotationX: number = 0;
//   private targetRotationY: number = 0;
//   private currentRotationX: number = 0;
//   private currentRotationY: number = 0;

//   constructor(private renderer2: Renderer2) { }

//   ngOnInit(): void {
//     this.initThreeJS();
//   }

//   ngAfterViewInit(): void {
//     if (this.canvasContainerRef.nativeElement) {
//       this.renderer2.appendChild(this.canvasContainerRef.nativeElement, this.renderer.domElement);
//       this.onWindowResize(); // Initiale Anpassung an die Containergröße
//       this.animate();
//     } else {
//       console.error('Canvas element not found!');
//     }
//   }

//   ngOnDestroy(): void {
//     if (this.resizeListener) {
//       this.resizeListener();
//     }
//   }

//   private initThreeJS(): void {
//     this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
//     this.renderer.setPixelRatio(window.devicePixelRatio);
//     this.renderer.setSize(window.innerWidth, window.innerHeight);

//     this.renderer.setClearColor(new THREE.Color('rgb(18, 18, 18)'), 1);

//     this.scene = new THREE.Scene();
//     this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

//     const textureLoader = new THREE.TextureLoader();
//     textureLoader.load(this.texturePath, (texture) => {
//       texture.anisotropy = this.renderer.capabilities.getMaxAnisotropy();

//       const material = new THREE.MeshBasicMaterial({ map: texture, transparent: true });
//       this.imageMesh = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), material);
//       this.scene.add(this.imageMesh);

//       this.resizeListener = this.renderer2.listen('window', 'resize', this.onWindowResize.bind(this));
//       this.onWindowResize(); // Initiale Anpassung an die Bildgröße
//     }, undefined, (err) => {
//       console.error('An error happened:', err);
//     });

//     this.renderer2.listen(this.canvasContainerRef.nativeElement, 'mousemove', (event: MouseEvent) => this.onMouseMove(event));
//     this.renderer2.listen(this.canvasContainerRef.nativeElement, 'mouseleave', () => this.onMouseLeave());
//   }

//   private onWindowResize(): void {
//     const container = this.canvasContainerRef.nativeElement;
//     const width = container.clientWidth;
//     const height = container.clientHeight;

//     const aspectRatio = width / height;

//     // Aktualisieren der Kameraproportionen
//     this.camera.aspect = aspectRatio;
//     this.camera.updateProjectionMatrix();

//     // Berechnung der Größe des Bildes basierend auf dem Container
//     if (this.imageMesh) {
//       const material = this.imageMesh.material as THREE.MeshBasicMaterial;
//       const imageAspectRatio = material.map?.image.width / material.map?.image.height;

//       let planeWidth, planeHeight;

//       if (imageAspectRatio > aspectRatio) {
//         planeWidth = width;
//         planeHeight = planeWidth / imageAspectRatio;
//       } else {
//         planeHeight = height;
//         planeWidth = planeHeight * imageAspectRatio;
//       }

//       // Aktualisieren der Plane-Geometrie
//       this.imageMesh.geometry.dispose(); // Alte Geometrie freigeben
//       this.imageMesh.geometry = new THREE.PlaneGeometry(planeWidth, planeHeight);

//       // Kamera basierend auf der neuen Planegröße positionieren
//       this.camera.position.z = Math.max(planeWidth, planeHeight) * 0.75;
//     }

//     this.renderer.setSize(width, height);
//   }

//   private animate = (): void => {
//     requestAnimationFrame(this.animate);

//     this.currentRotationX += (this.targetRotationX - this.currentRotationX) * 0.05;
//     this.currentRotationY += (this.targetRotationY - this.currentRotationY) * 0.05;

//     if (this.imageMesh) {
//       this.imageMesh.rotation.x = this.currentRotationX;
//       this.imageMesh.rotation.y = this.currentRotationY;
//     }

//     this.renderer.render(this.scene, this.camera);
//   };

//   private onMouseMove(event: MouseEvent): void {
//     const rect = this.canvasContainerRef.nativeElement.getBoundingClientRect();
//     const mouseX = ((event.clientX - rect.left) / rect.width) * 2 - 1;
//     const mouseY = -((event.clientY - rect.top) / rect.height) * 2 + 1;

//     this.targetRotationY = mouseX * Math.PI * 0.2;
//     this.targetRotationX = mouseY * Math.PI * 0.2;
//   }

//   private onMouseLeave(): void {
//     this.targetRotationX = 0;
//     this.targetRotationY = 0;
//   }
// }

// import { Component, ElementRef, OnInit, Renderer2, ViewChild, AfterViewInit, OnDestroy, Input } from '@angular/core';
// import * as THREE from 'three';

// @Component({
//   selector: 'app-three-js-animation',
//   template: `
//     <div #canvasContainer class="canvas-container">
//       <canvas #canvasElement></canvas>
//     </div>
//   `,
//    standalone: true, 
//   styles: [`
//     :host {
//       display: block;
//       width: 100%;
//       height: 100%;
//       overflow: hidden;
//     }
//     .canvas-container {
//       display: grid;
//       width: 100%;
//       height: 100%;
//       place-items: center; /* Zentriert den Canvas innerhalb des Containers */
//     }
//     canvas {
//       display: block;
//       max-width: 100%;
//       max-height: 100%;
//       width: auto;
//       height: auto;
//     }
//   `]
// })
// export class ThreeJsAnimationComponent implements OnInit, AfterViewInit, OnDestroy {
//   @ViewChild('canvasContainer', { static: true }) canvasContainerRef!: ElementRef;
//   @ViewChild('canvasElement', { static: true }) canvasElementRef!: ElementRef;
//   @Input() texturePath!: string;
//   private renderer!: THREE.WebGLRenderer;
//   private scene!: THREE.Scene;
//   private camera!: THREE.PerspectiveCamera;
//   private imageMesh!: THREE.Mesh;
//   private resizeListener: (() => void) | null = null;

//   // Diese Eigenschaften fehlen im ursprünglichen Code
//   private targetRotationX: number = 0;
//   private targetRotationY: number = 0;
//   private currentRotationX: number = 0;
//   private currentRotationY: number = 0;

//   constructor(private renderer2: Renderer2) { }

//   ngOnInit(): void {
//     this.initThreeJS();
//   }

//   ngAfterViewInit(): void {
//     if (this.canvasContainerRef.nativeElement && this.canvasElementRef.nativeElement) {
//       this.renderer.setSize(this.canvasContainerRef.nativeElement.clientWidth, this.canvasContainerRef.nativeElement.clientHeight);
//       this.onWindowResize(); // Initiale Anpassung an die Containergröße
//       this.animate();
//     } else {
//       console.error('Canvas element not found!');
//     }
//   }

//   ngOnDestroy(): void {
//     if (this.resizeListener) {
//       this.resizeListener();
//     }
//   }

//   private initThreeJS(): void {
//     const canvas = this.canvasElementRef.nativeElement;
//     this.renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true });
//     this.renderer.setPixelRatio(window.devicePixelRatio);

//     this.scene = new THREE.Scene();
//     this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

//     const textureLoader = new THREE.TextureLoader();
//     textureLoader.load(this.texturePath, (texture) => {
//       texture.anisotropy = this.renderer.capabilities.getMaxAnisotropy();

//       const material = new THREE.MeshBasicMaterial({ map: texture, transparent: true });
//       this.imageMesh = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), material);
//       this.scene.add(this.imageMesh);

//       this.resizeListener = this.renderer2.listen('window', 'resize', this.onWindowResize.bind(this));
//       this.onWindowResize(); // Initiale Anpassung an die Bildgröße
//     }, undefined, (err) => {
//       console.error('An error happened:', err);
//     });

//     this.renderer2.listen(this.canvasContainerRef.nativeElement, 'mousemove', (event: MouseEvent) => this.onMouseMove(event));
//     this.renderer2.listen(this.canvasContainerRef.nativeElement, 'mouseleave', () => this.onMouseLeave());
//   }

//   private onWindowResize(): void {
//     const container = this.canvasContainerRef.nativeElement;
//     const width = container.clientWidth;
//     const height = container.clientHeight;

//     const aspectRatio = width / height;

//     this.camera.aspect = aspectRatio;
//     this.camera.updateProjectionMatrix();

//     if (this.imageMesh) {
//       const material = this.imageMesh.material as THREE.MeshBasicMaterial;
//       const imageAspectRatio = material.map?.image.width / material.map?.image.height;

//       let planeWidth, planeHeight;

//       if (imageAspectRatio > aspectRatio) {
//         planeWidth = width;
//         planeHeight = planeWidth / imageAspectRatio;
//       } else {
//         planeHeight = height;
//         planeWidth = planeHeight * imageAspectRatio;
//       }

//       this.imageMesh.geometry.dispose();
//       this.imageMesh.geometry = new THREE.PlaneGeometry(planeWidth, planeHeight);

//       this.camera.position.z = Math.max(planeWidth, planeHeight) * 0.75;
//     }

//     this.renderer.setSize(width, height);
//   }

//   private animate = (): void => {
//     requestAnimationFrame(this.animate);

//     // Rotation basierend auf der Mausbewegung anwenden
//     this.currentRotationX += (this.targetRotationX - this.currentRotationX) * 0.05;
//     this.currentRotationY += (this.targetRotationY - this.currentRotationY) * 0.05;

//     if (this.imageMesh) {
//       this.imageMesh.rotation.x = this.currentRotationX;
//       this.imageMesh.rotation.y = this.currentRotationY;
//     }

//     this.renderer.render(this.scene, this.camera);
//   };

//   private onMouseMove(event: MouseEvent): void {
//     const rect = this.canvasContainerRef.nativeElement.getBoundingClientRect();
//     const mouseX = ((event.clientX - rect.left) / rect.width) * 2 - 1;
//     const mouseY = -((event.clientY - rect.top) / rect.height) * 2 + 1;

//     this.targetRotationY = mouseX * Math.PI * 0.2;
//     this.targetRotationX = mouseY * Math.PI * 0.2;
//   }

//   private onMouseLeave(): void {
//     this.targetRotationX = 0;
//     this.targetRotationY = 0;
//   }
// }
import { Component, ElementRef, AfterViewInit, OnDestroy, ViewChild, HostListener } from '@angular/core';
import * as THREE from 'three';

@Component({
  selector: 'app-three-js-animation',
  template: `<div #rendererContainer class="renderer-container"></div>`,
  styles: [`
    .renderer-container {
      width: 100%;
      height: 100vh;
      display: block;
    }
  `],
  standalone: true,
})
export class ThreeJsAnimationComponent implements AfterViewInit, OnDestroy {
  @ViewChild('rendererContainer', { static: true }) rendererContainer!: ElementRef;

  private renderer!: THREE.WebGLRenderer;
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private laptopGroup!: THREE.Group;
  private animationFrameId!: number;
  private currentRotationX: number = 0;
  private currentRotationY: number = 0;
  private targetRotationX: number = 0;
  private targetRotationY: number = 0;

  constructor() {}

  ngAfterViewInit(): void {
    this.initThreeJs();
    this.animate();
  }

  private initThreeJs(): void {
    // Scene, Camera, Renderer setup
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    
    // Renderer with transparent background
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setClearColor(0x000000, 0); // Set background color to transparent
    this.rendererContainer.nativeElement.appendChild(this.renderer.domElement);

    // Enhanced Lighting Setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3); // Reduced intensity for ambient light
    this.scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.7);
    directionalLight.position.set(5, 5, 5).normalize();
    directionalLight.castShadow = true;
    this.scene.add(directionalLight);

    const pointLight = new THREE.PointLight(0xffffff, 0.6, 100);
    pointLight.position.set(-2, 3, 3); // Positioned to add highlights to the edges
    pointLight.castShadow = true;
    this.scene.add(pointLight);

    const spotLight = new THREE.SpotLight(0xffffff, 0.8);
    spotLight.position.set(0, 5, 5); // Spotlight directly above to highlight the laptop surface
    spotLight.angle = Math.PI / 6;
    spotLight.penumbra = 0.2;
    spotLight.castShadow = true;
    this.scene.add(spotLight);

    // Materials
    const baseMaterial = new THREE.MeshStandardMaterial({
      color: 0x333333,
      roughness: 0.8, // Matte Oberfläche
      metalness: 0.1
    });

    const touchpadMaterial = new THREE.MeshStandardMaterial({
      color: 0x555555, // Helleres Grau für bessere Sichtbarkeit
      roughness: 0.6,  // Weniger rau, um mehr Glanz zu erzeugen
      metalness: 0.5   // Erhöhte Metallizität für mehr Reflektion
    });

    const screenFrameMaterial = new THREE.MeshStandardMaterial({
      color: 0x222222,
      roughness: 0.4, // Leicht glänzend
      metalness: 0.2
    });

    const keyMaterial = new THREE.MeshStandardMaterial({
      color: 0x444444,
      roughness: 0.85, // Matte Tasten
      metalness: 0.1
    });

    // Create rounded laptop base with a recessed area for the touchpad
    const baseGeometry = this.createRoundedBox(3, 0.2, 2, 0.1, 10);
    const laptopBase = new THREE.Mesh(baseGeometry, baseMaterial);
    laptopBase.castShadow = true;

    // Create recessed area for touchpad
    const touchpadAreaGeometry = new THREE.BoxGeometry(0.6, 0.005, 0.4);
    const touchpadArea = new THREE.Mesh(touchpadAreaGeometry, baseMaterial);
    touchpadArea.position.set(0, 0.098, 0.8); // Slightly raised to make it visible
    laptopBase.add(touchpadArea);

    // Create and place touchpad into the recessed area with a darker color
    const touchpadGeometry = new THREE.BoxGeometry(0.5, 0.003, 0.3); // Slightly taller to ensure visibility
    const touchpad = new THREE.Mesh(touchpadGeometry, touchpadMaterial);
    touchpad.position.set(0, 0.1, 0.7); // Placed within the recessed area, raised slightly more
    laptopBase.add(touchpad);

    // Create laptop screen
    const screenGeometry = this.createRoundedBox(3, 2, 0.1, 0.1, 10);
    const laptopScreen = new THREE.Mesh(screenGeometry, screenFrameMaterial);
    laptopScreen.position.y = 1.1; // Move the screen above the base
    laptopScreen.position.z = -1; // Slightly move the screen backward
    laptopScreen.castShadow = true;

    // Add Screen Content (Texture)
    const loader = new THREE.TextureLoader();
    const screenTexture = loader.load('path_to_your_texture_image');
    const displayGeometry = new THREE.PlaneGeometry(2.8, 1.8);
    const displayMaterial = new THREE.MeshBasicMaterial({ map: screenTexture });
    const laptopDisplay = new THREE.Mesh(displayGeometry, displayMaterial);
    laptopDisplay.position.y = 1.1;
    laptopDisplay.position.z = -0.95; // Slightly in front of the screen geometry

    // Add Full Keyboard with deeper and more organic keys
    this.addFullKeyboard(laptopBase, keyMaterial);

    // Group to contain all laptop parts
    this.laptopGroup = new THREE.Group();
    this.laptopGroup.add(laptopBase);
    this.laptopGroup.add(laptopScreen);
    this.laptopGroup.add(laptopDisplay);
    this.scene.add(this.laptopGroup);

    // Position the camera
    this.camera.position.set(0, 2, 5); // Higher position for better top-down view
    this.camera.lookAt(0, 1, 0);

    // Handle window resize
    window.addEventListener('resize', this.onWindowResize.bind(this), false);
  }

  // Function to create a rounded box
  private createRoundedBox(width: number, height: number, depth: number, radius: number, smoothness: number): THREE.BufferGeometry {
    const shape = new THREE.Shape();

    const eps = 0.00001;
    const radiusEps = radius - eps;

    shape.absarc(eps, eps, eps, -Math.PI / 2, -Math.PI, true);
    shape.absarc(eps, height - radius * 2, eps, Math.PI, Math.PI / 2, true);
    shape.absarc(width - radius * 2, height - radius * 2, eps, Math.PI / 2, 0, true);
    shape.absarc(width - radius * 2, eps, eps, 0, -Math.PI / 2, true);

    const geometry = new THREE.ExtrudeGeometry(shape, {
      depth: depth - radius * 2,
      bevelEnabled: true,
      bevelSegments: smoothness * 2,
      steps: 1,
      bevelSize: radiusEps,
      bevelThickness: radius,
      curveSegments: smoothness
    });

    geometry.center();

    return geometry;
  }

  private addFullKeyboard(laptopBase: THREE.Mesh, keyMaterial: THREE.MeshStandardMaterial): void {
    // Define key size and spacing
    const keyWidth = 0.16;
    const keyHeight = 0.008;
    const keyDepth = 0.12;
    const keySpacing = 0.02;

    // Define special key sizes for the row with the spacebar
    const specialKeyWidth = 0.25; // Lengthened keys next to the spacebar
    const spacebarWidth = 1.2; // Spacebar width
    const spacebarPadding = 0.1; // Padding on each side of the spacebar

    // Define the width of the keyboard area (3 units wide based on laptop dimensions)
    const keyboardWidth = 3;
    const numberOfKeysInRow = Math.floor((keyboardWidth + keySpacing) / (keyWidth + keySpacing));

    // Define keys per row for the top 4 rows (positions them above the spacebar row)
    const keysPerRow = [
        { count: numberOfKeysInRow, offset: -(keyboardWidth / 2) + 0.15 }, // Top row, full row centered, slightly shifted to the right
        { count: numberOfKeysInRow, offset: -(keyboardWidth / 2) + 0.15 }, // Second row, full row centered, slightly shifted to the right
        { count: numberOfKeysInRow, offset: -(keyboardWidth / 2) + 0.15 }, // Third row, full row centered, slightly shifted to the right
        { count: numberOfKeysInRow, offset: -(keyboardWidth / 2) + 0.15 }  // Fourth row, full row centered, slightly shifted to the right
    ];

    let startZ = -0.1; // Set startZ to position the top row

    // Create the rows of keys (all rows above the spacebar row)
    for (let row = 0; row < keysPerRow.length; row++) {
        const keyRow = keysPerRow[row];
        const offsetX = keyRow.offset;

        for (let i = 0; i < keyRow.count; i++) {
            const keyGeometry = this.createRoundedBox(keyWidth, keyHeight, keyDepth, 0.03, 5);
            const key = new THREE.Mesh(keyGeometry, keyMaterial);
            key.position.set(
                offsetX + i * (keyWidth + keySpacing),
                0.102,
                startZ
            );
            laptopBase.add(key);
        }
        startZ -= (keyDepth + keySpacing);
    }

    // Set the Z position for the spacebar row to be the lowest
    startZ = 0.1; // Moves the spacebar row below all other rows

    // Create the spacebar at the correct position
    const spacebarGeometry = this.createRoundedBox(spacebarWidth, keyHeight, keyDepth, 0.03, 5);
    const spacebar = new THREE.Mesh(spacebarGeometry, keyMaterial);
    spacebar.position.set(0, 0.102, startZ); // Positioned at the bottom
    laptopBase.add(spacebar);

    // Create the longer keys to the left of the spacebar
    for (let i = 0; i < 3; i++) {
        const leftKeyGeometry = this.createRoundedBox(specialKeyWidth, keyHeight, keyDepth, 0.03, 5);
        const leftKey = new THREE.Mesh(leftKeyGeometry, keyMaterial);
        leftKey.position.set(-spacebarWidth / 2 - spacebarPadding - keySpacing - (specialKeyWidth + keySpacing) * i, 0.102, startZ);
        laptopBase.add(leftKey);
    }

    // Create the longer keys to the right of the spacebar
    for (let i = 0; i < 3; i++) {
        const rightKeyGeometry = this.createRoundedBox(specialKeyWidth, keyHeight, keyDepth, 0.03, 5);
        const rightKey = new THREE.Mesh(rightKeyGeometry, keyMaterial);
        rightKey.position.set(spacebarWidth / 2 + spacebarPadding + keySpacing + (specialKeyWidth + keySpacing) * i, 0.102, startZ);
        laptopBase.add(rightKey);
    }
}


  private animate = (): void => {
    this.animationFrameId = requestAnimationFrame(this.animate);

    // Apply rotation based on mouse movement
    this.currentRotationX += (this.targetRotationX - this.currentRotationX) * 0.05;
    this.currentRotationY += (this.targetRotationY - this.currentRotationY) * 0.05;

    if (this.laptopGroup) {
      this.laptopGroup.rotation.x = this.currentRotationX;
      this.laptopGroup.rotation.y = this.currentRotationY;
    }

    this.renderer.render(this.scene, this.camera);
  };

  private onMouseMove(event: MouseEvent): void {
    const rect = this.rendererContainer.nativeElement.getBoundingClientRect();
    const mouseX = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    const mouseY = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    this.targetRotationY = mouseX * Math.PI * 0.2;
    this.targetRotationX = mouseY * Math.PI * 0.2;
  }

  private onMouseLeave(): void {
    this.targetRotationX = 0;
    this.targetRotationY = 0;
  }

  private onWindowResize(): void {
    const width = window.innerWidth;
    const height = window.innerHeight;
    this.renderer.setSize(width, height);
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
  }

  @HostListener('mousemove', ['$event'])
  onMouseMoveHandler(event: MouseEvent) {
    this.onMouseMove(event);
  }

  @HostListener('mouseleave')
  onMouseLeaveHandler() {
    this.onMouseLeave();
  }

  ngOnDestroy(): void {
    cancelAnimationFrame(this.animationFrameId);
    this.renderer.dispose();
    window.removeEventListener('resize', this.onWindowResize);
  }
}