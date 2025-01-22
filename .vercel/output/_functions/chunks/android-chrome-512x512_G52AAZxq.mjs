const androidChrome512x512 = new Proxy({"src":"/_astro/android-chrome-512x512.3tKjl2z0.png","width":512,"height":512,"format":"png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "C:/Users/juanb/OneDrive/Desktop/Ivan/Dev/portafolio-con-ia/src/assets/android-chrome-512x512.png";
							}
							
							return target[name];
						}
					});

export { androidChrome512x512 as default };
