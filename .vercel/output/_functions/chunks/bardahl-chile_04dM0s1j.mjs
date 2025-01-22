const bardahlChile = new Proxy({"src":"/_astro/bardahl-chile.CwCvcio9.webp","width":1888,"height":912,"format":"webp"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "C:/Users/juanb/OneDrive/Desktop/Ivan/Dev/portafolio-con-ia/src/assets/repositories/bardahl-chile.webp";
							}
							
							return target[name];
						}
					});

export { bardahlChile as default };
