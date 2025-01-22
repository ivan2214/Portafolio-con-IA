const bitMojiSurprised = new Proxy({"src":"/_astro/surprised-phone.CAEil7uh.webp","width":1592,"height":1592,"format":"webp"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "C:/Users/juanb/OneDrive/Desktop/Ivan/Dev/portafolio-con-ia/src/assets/bitmoji/surprised-phone.webp";
							}
							
							return target[name];
						}
					});

export { bitMojiSurprised as default };
