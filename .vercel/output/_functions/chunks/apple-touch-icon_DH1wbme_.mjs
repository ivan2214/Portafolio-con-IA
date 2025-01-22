const appleTouchIcon = new Proxy({"src":"/_astro/apple-touch-icon.CUPKmH9w.png","width":180,"height":180,"format":"png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "C:/Users/juanb/OneDrive/Desktop/Ivan/Dev/portafolio-con-ia/src/assets/apple-touch-icon.png";
							}
							
							return target[name];
						}
					});

export { appleTouchIcon as default };
