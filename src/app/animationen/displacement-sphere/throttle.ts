export function throttle(func: Function, limit: number) {
    let lastFunc: ReturnType<typeof setTimeout>;
    let lastRan: number;
    return function(...args: any[]) {
      if (!lastRan) {
        func.apply(null, args);
        lastRan = Date.now();
      } else {
        clearTimeout(lastFunc);
        lastFunc = setTimeout(() => {
          if ((Date.now() - lastRan) >= limit) {
            func.apply(null, args);
            lastRan = Date.now();
          }
        }, limit - (Date.now() - lastRan));
      }
    };
  }