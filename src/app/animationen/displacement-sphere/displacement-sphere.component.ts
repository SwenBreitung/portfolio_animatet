import { Component, ElementRef, OnInit, OnDestroy, AfterViewInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AmbientLight,
  DirectionalLight,
  Mesh,
  MeshPhongMaterial,
  PerspectiveCamera,
  Scene,
  SphereGeometry,
  WebGLRenderer,
  Vector2,
  ShaderMaterial,
} from 'three';
import { throttle } from './throttle'; // Import throttle utility
import { cleanRenderer, cleanScene, removeLights } from './three-utils'; // Import Three.js utilities

@Component({
  selector: 'app-displacement-sphere',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './displacement-sphere.component.html',
  styleUrls: ['./displacement-sphere.component.scss']
})
export class DisplacementSphereComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('canvasRef') canvasRef!: ElementRef<HTMLCanvasElement>;

  private start: number = Date.now();
  private renderer!: WebGLRenderer;
  private camera!: PerspectiveCamera;
  private scene = new Scene();
  private lights: any[] = [];
  private uniforms: any;
  private material!: ShaderMaterial;
  private geometry!: SphereGeometry;
  private sphere!: Mesh;
  private animationFrame: number = 0;

  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.initializeThreeJS();
    this.setupScene();
    this.addLights();
    this.addEventListeners();
    this.animate();
  }

  ngOnDestroy(): void {
    this.cleanup();
  }

  private initializeThreeJS(): void {
    this.renderer = new WebGLRenderer({
      canvas: this.canvasRef.nativeElement,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
      failIfMajorPerformanceCaveat: true,
    });
    const { innerWidth, innerHeight } = window;

    this.renderer.setSize(innerWidth, innerHeight);
    this.renderer.setPixelRatio(window.devicePixelRatio);

    this.camera = new PerspectiveCamera(75, innerWidth / innerHeight , 0.1, 1000);
    this.camera.position.z = 50;

    this.scene = new Scene();

    this.uniforms = {
      time: { value: 0 }
    };

    this.material = new ShaderMaterial({
      uniforms: this.uniforms,
      vertexShader: `
        uniform float time;
        varying vec2 vUv;
        varying float noise;
        varying vec3 vViewPosition;

        vec3 mod289(vec3 x) {
          return x - floor(x * (1.0 / 289.0)) * 289.0;
        }

        vec4 mod289(vec4 x) {
          return x - floor(x * (1.0 / 289.0)) * 289.0;
        }

        vec4 permute(vec4 x) {
          return mod289(((x*34.0)+1.0)*x);
        }

        vec4 taylorInvSqrt(vec4 r) {
          return 1.79284291400159 - 0.85373472095314 * r;
        }

        vec3 fade(vec3 t) {
          return t*t*t*(t*(t*6.0-15.0)+10.0);
        }

        float cnoise(vec3 P) {
          vec3 Pi0 = floor(P);
          vec3 Pi1 = Pi0 + vec3(1.0);
          Pi0 = mod289(Pi0);
          Pi1 = mod289(Pi1);
          vec3 Pf0 = fract(P);
          vec3 Pf1 = Pf0 - vec3(1.0);
          vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);
          vec4 iy = vec4(Pi0.yy, Pi1.yy);
          vec4 iz0 = Pi0.zzzz;
          vec4 iz1 = Pi1.zzzz;

          vec4 ixy = permute(permute(ix) + iy);
          vec4 ixy0 = permute(ixy + iz0);
          vec4 ixy1 = permute(ixy + iz1);

          vec4 gx0 = ixy0 * (1.0 / 7.0);
          vec4 gy0 = fract(floor(gx0) * (1.0 / 7.0)) - 0.5;
          gx0 = fract(gx0);
          vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);
          vec4 sz0 = step(gz0, vec4(0.0));
          gx0 -= sz0 * (step(0.0, gx0) - 0.5);
          gy0 -= sz0 * (step(0.0, gy0) - 0.5);

          vec4 gx1 = ixy1 * (1.0 / 7.0);
          vec4 gy1 = fract(floor(gx1) * (1.0 / 7.0)) - 0.5;
          gx1 = fract(gx1);
          vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);
          vec4 sz1 = step(gz1, vec4(0.0));
          gx1 -= sz1 * (step(0.0, gx1) - 0.5);
          gy1 -= sz1 * (step(0.0, gy1) - 0.5);

          vec3 g000 = vec3(gx0.x,gy0.x,gz0.x);
          vec3 g100 = vec3(gx0.y,gy0.y,gz0.y);
          vec3 g010 = vec3(gx0.z,gy0.z,gz0.z);
          vec3 g110 = vec3(gx0.w,gy0.w,gz0.w);
          vec3 g001 = vec3(gx1.x,gy1.x,gz1.x);
          vec3 g101 = vec3(gx1.y,gy1.y,gz1.y);
          vec3 g011 = vec3(gx1.z,gy1.z,gz1.z);
          vec3 g111 = vec3(gx1.w,gy1.w,gz1.w);

          vec4 norm0 = taylorInvSqrt(vec4(dot(g000, g000), dot(g010, g010), dot(g100, g100), dot(g110, g110)));
          g000 *= norm0.x;
          g010 *= norm0.y;
          g100 *= norm0.z;
          g110 *= norm0.w;
          vec4 norm1 = taylorInvSqrt(vec4(dot(g001, g001), dot(g011, g011), dot(g101, g101), dot(g111, g111)));
          g001 *= norm1.x;
          g011 *= norm1.y;
          g101 *= norm1.z;
          g111 *= norm1.w;

          float n000 = dot(g000, Pf0);
          float n100 = dot(g100, vec3(Pf1.x, Pf0.yz));
          float n010 = dot(g010, vec3(Pf0.x, Pf1.y, Pf0.z));
          float n110 = dot(g110, vec3(Pf1.xy, Pf0.z));
          float n001 = dot(g001, vec3(Pf0.xy, Pf1.z));
          float n101 = dot(g101, vec3(Pf1.x, Pf0.y, Pf1.z));
          float n011 = dot(g011, vec3(Pf0.x, Pf1.yz));
          float n111 = dot(g111, Pf1);

          vec3 fade_xyz = fade(Pf0);
          vec4 n_z = mix(vec4(n000, n100, n010, n110), vec4(n001, n101, n011, n111), fade_xyz.z);
          vec2 n_yz = mix(n_z.xy, n_z.zw, fade_xyz.y);
          float n_xyz = mix(n_yz.x, n_yz.y, fade_xyz.x);
          return 2.2 * n_xyz;
        }

        float turbulence(vec3 p) {
          float w = 100.0;
          float t = -.5;
          for (float f = 1.0 ; f <= 10.0 ; f++) {
            float power = pow(2.0, f);
            t += abs(cnoise(vec3(power * p)) / power);
          }
          return t;
        }

        void main() {
          vUv = uv;
          noise = turbulence(0.01 * position + normal + time * 0.8);
          vec3 displacement = vec3((position.x) * noise, position.y * noise, position.z * noise);
          gl_Position = projectionMatrix * modelViewMatrix * vec4((position + normal) + displacement, 1.0);
        }
      `,
      fragmentShader: `
        varying float noise;
        vec3 colorA = vec3(0.0, 0.4, 0.4);
        vec3 colorB = vec3(1.0, 1.0, 1.0);

        void main() {
          vec3 color = mix(colorA, colorB, noise);
          gl_FragColor = vec4(color, 1.0);
        }
      `
    });

    this.geometry = new SphereGeometry(32, 128, 128);
    this.sphere = new Mesh(this.geometry, this.material);
    this.sphere.position.z = 0;
    this.scene.add(this.sphere);
  }

  private setupScene(): void {
    const { innerWidth, innerHeight } = window;
    this.renderer.setSize(innerWidth, innerHeight * 1.0);
    this.camera.aspect = innerWidth / innerHeight ;
    this.camera.updateProjectionMatrix();
  }

  private addLights(): void {
    const dirLight = new DirectionalLight(0xffffff, 1.5);
    const ambientLight = new AmbientLight(0xffffff, 0.5);
    dirLight.position.set(1, 1, 1).normalize();
    this.lights = [dirLight, ambientLight];
    this.lights.forEach(light => this.scene.add(light));
  }

  private addEventListeners(): void {
    window.addEventListener('mousemove', this.onMouseMove);
    window.addEventListener('resize', this.onResize);
  }

  private removeEventListeners(): void {
    window.removeEventListener('mousemove', this.onMouseMove);
    window.removeEventListener('resize', this.onResize);
  }

  private onMouseMove = throttle((event: MouseEvent) => {
    const position = {
      x: event.clientX / window.innerWidth,
      y: event.clientY / window.innerHeight,
    };
    this.sphere.rotation.x = position.y / 2;
    this.sphere.rotation.y = position.x / 2;
  }, 100);

  private onResize = () => {
    const width = window.innerWidth;
    const height = window.innerHeight * 1.0;
    this.renderer.setSize(width, height);
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.render(this.scene, this.camera);
  }

  private animate = () => {
    this.animationFrame = requestAnimationFrame(this.animate);
    if (this.uniforms && this.uniforms.time) {
      this.uniforms.time.value = 0.00005 * (Date.now() - this.start);
    }
    this.sphere.rotation.z += 0.001;
    this.renderer.render(this.scene, this.camera);
  }

  private cleanup(): void {
    this.removeEventListeners();
    cancelAnimationFrame(this.animationFrame);
    cleanScene(this.scene);
    cleanRenderer(this.renderer);
  }
}



//---------------Blueprint der geht aber nicht schön aussieht------------

// import { Component, ElementRef, OnInit, OnDestroy, AfterViewInit, ViewChild } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import {
//   AmbientLight,
//   DirectionalLight,
//   Mesh,
//   MeshPhongMaterial,
//   PerspectiveCamera,
//   Scene,
//   SphereGeometry,
//   WebGLRenderer,
//   Vector2,
//   ShaderMaterial,
// } from 'three';
// import { throttle } from './throttle'; // Import throttle utility
// import { cleanRenderer, cleanScene, removeLights } from './three-utils'; // Import Three.js utilities

// @Component({
//   selector: 'app-displacement-sphere',
//   standalone: true,
//   imports: [CommonModule],
//   templateUrl: './displacement-sphere.component.html',
//   styleUrls: ['./displacement-sphere.component.scss']
// })
// export class DisplacementSphereComponent implements OnInit, OnDestroy, AfterViewInit {
//   @ViewChild('canvasRef') canvasRef!: ElementRef<HTMLCanvasElement>;

//   private start: number = Date.now();
//   private mouse = new Vector2(0.8, 0.5);
//   private renderer!: WebGLRenderer;
//   private camera!: PerspectiveCamera;
//   private scene = new Scene();
//   private lights: any[] = [];
//   private uniforms: any;
//   private material!: ShaderMaterial;
//   private geometry!: SphereGeometry;
//   private sphere!: Mesh;
//   private animationFrame: number = 0;

//   constructor() {}

//   ngOnInit(): void {}

//   ngAfterViewInit(): void {
//     this.initializeThreeJS();
//     this.setupScene();
//     this.addLights();
//     this.addEventListeners();
//     this.animate();
//   }

//   ngOnDestroy(): void {
//     this.cleanup();
//   }

//   private initializeThreeJS(): void {
//     this.renderer = new WebGLRenderer({
//       canvas: this.canvasRef.nativeElement,
//       antialias: true,
//       alpha: true,
//       powerPreference: 'high-performance',
//       failIfMajorPerformanceCaveat: true,
//     });
//     const { innerWidth, innerHeight } = window;
//     this.renderer.setSize(innerWidth, innerHeight);
//     this.renderer.setPixelRatio(window.devicePixelRatio);

//     this.camera = new PerspectiveCamera(75, innerWidth / innerHeight, 0.1, 1000);
//     this.camera.position.z = 50;

//     this.scene = new Scene();

//     this.uniforms = {
//       time: { value: 0 }
//     };

//     this.material = new ShaderMaterial({
//       uniforms: this.uniforms,
//       vertexShader: `
//         uniform float time;
//         varying vec2 vUv;
//         varying float noise;
//         varying vec3 vViewPosition;

//         vec3 mod289(vec3 x) {
//           return x - floor(x * (1.0 / 289.0)) * 289.0;
//         }

//         vec4 mod289(vec4 x) {
//           return x - floor(x * (1.0 / 289.0)) * 289.0;
//         }

//         vec4 permute(vec4 x) {
//           return mod289(((x*34.0)+1.0)*x);
//         }

//         vec4 taylorInvSqrt(vec4 r) {
//           return 1.79284291400159 - 0.85373472095314 * r;
//         }

//         vec3 fade(vec3 t) {
//           return t*t*t*(t*(t*6.0-15.0)+10.0);
//         }

//         float cnoise(vec3 P) {
//           vec3 Pi0 = floor(P);
//           vec3 Pi1 = Pi0 + vec3(1.0);
//           Pi0 = mod289(Pi0);
//           Pi1 = mod289(Pi1);
//           vec3 Pf0 = fract(P);
//           vec3 Pf1 = Pf0 - vec3(1.0);
//           vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);
//           vec4 iy = vec4(Pi0.yy, Pi1.yy);
//           vec4 iz0 = Pi0.zzzz;
//           vec4 iz1 = Pi1.zzzz;

//           vec4 ixy = permute(permute(ix) + iy);
//           vec4 ixy0 = permute(ixy + iz0);
//           vec4 ixy1 = permute(ixy + iz1);

//           vec4 gx0 = ixy0 * (1.0 / 7.0);
//           vec4 gy0 = fract(floor(gx0) * (1.0 / 7.0)) - 0.5;
//           gx0 = fract(gx0);
//           vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);
//           vec4 sz0 = step(gz0, vec4(0.0));
//           gx0 -= sz0 * (step(0.0, gx0) - 0.5);
//           gy0 -= sz0 * (step(0.0, gy0) - 0.5);

//           vec4 gx1 = ixy1 * (1.0 / 7.0);
//           vec4 gy1 = fract(floor(gx1) * (1.0 / 7.0)) - 0.5;
//           gx1 = fract(gx1);
//           vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);
//           vec4 sz1 = step(gz1, vec4(0.0));
//           gx1 -= sz1 * (step(0.0, gx1) - 0.5);
//           gy1 -= sz1 * (step(0.0, gy1) - 0.5);

//           vec3 g000 = vec3(gx0.x,gy0.x,gz0.x);
//           vec3 g100 = vec3(gx0.y,gy0.y,gz0.y);
//           vec3 g010 = vec3(gx0.z,gy0.z,gz0.z);
//           vec3 g110 = vec3(gx0.w,gy0.w,gz0.w);
//           vec3 g001 = vec3(gx1.x,gy1.x,gz1.x);
//           vec3 g101 = vec3(gx1.y,gy1.y,gz1.y);
//           vec3 g011 = vec3(gx1.z,gy1.z,gz1.z);
//           vec3 g111 = vec3(gx1.w,gy1.w,gz1.w);

//           vec4 norm0 = taylorInvSqrt(vec4(dot(g000, g000), dot(g010, g010), dot(g100, g100), dot(g110, g110)));
//           g000 *= norm0.x;
//           g010 *= norm0.y;
//           g100 *= norm0.z;
//           g110 *= norm0.w;
//           vec4 norm1 = taylorInvSqrt(vec4(dot(g001, g001), dot(g011, g011), dot(g101, g101), dot(g111, g111)));
//           g001 *= norm1.x;
//           g011 *= norm1.y;
//           g101 *= norm1.z;
//           g111 *= norm1.w;

//           float n000 = dot(g000, Pf0);
//           float n100 = dot(g100, vec3(Pf1.x, Pf0.yz));
//           float n010 = dot(g010, vec3(Pf0.x, Pf1.y, Pf0.z));
//           float n110 = dot(g110, vec3(Pf1.xy, Pf0.z));
//           float n001 = dot(g001, vec3(Pf0.xy, Pf1.z));
//           float n101 = dot(g101, vec3(Pf1.x, Pf0.y, Pf1.z));
//           float n011 = dot(g011, vec3(Pf0.x, Pf1.yz));
//           float n111 = dot(g111, Pf1);

//           vec3 fade_xyz = fade(Pf0);
//           vec4 n_z = mix(vec4(n000, n100, n010, n110), vec4(n001, n101, n011, n111), fade_xyz.z);
//           vec2 n_yz = mix(n_z.xy, n_z.zw, fade_xyz.y);
//           float n_xyz = mix(n_yz.x, n_yz.y, fade_xyz.x);
//           return 2.2 * n_xyz;
//         }

//         float turbulence(vec3 p) {
//           float w = 100.0;
//           float t = -.5;
//           for (float f = 1.0 ; f <= 10.0 ; f++) {
//             float power = pow(2.0, f);
//             t += abs(cnoise(vec3(power * p)) / power);
//           }
//           return t;
//         }

//         void main() {
//           vUv = uv;

//           noise = turbulence(0.01 * position + normal + time * 0.8);
//           vec3 displacement = vec3((position.x) * noise, position.y * noise, position.z * noise);
//           gl_Position = projectionMatrix * modelViewMatrix * vec4((position + normal) + displacement, 1.0);
//         }
//       `,
//       fragmentShader: `

// varying vec2 vUv;
// varying float noise;

// vec3 colorA = vec3(0.0, 0.5, 1.0); // Startfarbe
// vec3 colorB = vec3(1.0, 0.0, 0.0); // Endfarbe

// void main() {
//   vec3 color = mix(colorA, colorB, noise);
//   gl_FragColor = vec4(color, 1.0);
// }
//     });

//     this.geometry = new SphereGeometry(32, 128, 128);
//     this.sphere = new Mesh(this.geometry, this.material);
//     this.sphere.position.z = 0;
//     this.scene.add(this.sphere);
//   }

//   private setupScene(): void {
//     const { innerWidth, innerHeight } = window;
//     this.renderer.setSize(innerWidth, innerHeight);
//     this.camera.aspect = innerWidth / innerHeight;
//     this.camera.updateProjectionMatrix();
//   }

//   private addLights(): void {
//     const dirLight = new DirectionalLight(0xffffff, 1.5);
//     const ambientLight = new AmbientLight(0xffffff, 0.5);
//     dirLight.position.set(1, 1, 1).normalize();
//     this.lights = [dirLight, ambientLight];
//     this.lights.forEach(light => this.scene.add(light));
//   }

//   private addEventListeners(): void {
//     window.addEventListener('mousemove', this.onMouseMove);
//     window.addEventListener('resize', this.onResize);
//   }

//   private removeEventListeners(): void {
//     window.removeEventListener('mousemove', this.onMouseMove);
//     window.removeEventListener('resize', this.onResize);
//   }

//   private onMouseMove = throttle((event: MouseEvent) => {
//     const position = {
//       x: event.clientX / window.innerWidth,
//       y: event.clientY / window.innerHeight,
//     };
//     this.sphere.rotation.x = position.y / 2;
//     this.sphere.rotation.y = position.x / 2;
//   }, 100);

//   private onResize = () => {
//     const width = window.innerWidth;
//     const height = window.innerHeight;
//     this.renderer.setSize(width, height);
//     this.camera.aspect = width / height;
//     this.camera.updateProjectionMatrix();
//     this.renderer.render(this.scene, this.camera);
//   }

//   private animate = () => {
//     this.animationFrame = requestAnimationFrame(this.animate);
//     if (this.uniforms && this.uniforms.time) {
//       this.uniforms.time.value = 0.00005 * (Date.now() - this.start);
//     }
//     this.sphere.rotation.z += 0.001;
//     this.renderer.render(this.scene, this.camera);
//   }

//   private cleanup(): void {
//     this.removeEventListeners();
//     cancelAnimationFrame(this.animationFrame);
//     cleanScene(this.scene);
//     cleanRenderer(this.renderer);
//   }
// }