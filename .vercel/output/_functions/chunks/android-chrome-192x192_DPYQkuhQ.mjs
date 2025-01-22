const androidChrome192x192 = new Proxy({"src":"/_astro/android-chrome-192x192.CwlWFuOc.png","width":192,"height":192,"format":"png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "C:/Users/juanb/OneDrive/Desktop/Ivan/Dev/portafolio-con-ia/src/assets/android-chrome-192x192.png";
							}
							
							return target[name];
						}
					});

export { androidChrome192x192 as default };
