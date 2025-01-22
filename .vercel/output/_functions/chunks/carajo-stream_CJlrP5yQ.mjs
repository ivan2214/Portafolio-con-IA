const carajoStream = new Proxy({"src":"/_astro/carajo-stream.x2UH2Hxc.webp","width":1260,"height":662,"format":"webp"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "C:/Users/juanb/OneDrive/Desktop/Ivan/Dev/portafolio-con-ia/src/assets/repositories/carajo-stream.webp";
							}
							
							return target[name];
						}
					});

export { carajoStream as default };
