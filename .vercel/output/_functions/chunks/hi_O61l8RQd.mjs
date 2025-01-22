const bitMojiHi = new Proxy({"src":"/_astro/hi.CTn2Su7Z.webp","width":1592,"height":1592,"format":"webp"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "C:/Users/juanb/OneDrive/Desktop/Ivan/Dev/portafolio-con-ia/src/assets/bitmoji/hi.webp";
							}
							
							return target[name];
						}
					});

export { bitMojiHi as default };
