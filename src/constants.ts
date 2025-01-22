import type { Experience, Networks, Page, Site, Study } from "@/types";

export const loaderAnimation = [
	".loader",
	{ opacity: [1, 0], pointerEvents: "none" },
	{ easing: "ease-out" },
];

// Networks
export const NETWORKS: Networks = [
	{
		network: "github",
		link: "https://github.com/ivan2214",
	},
	{
		network: "linkedin",
		link: "https://www.linkedin.com/in/bongiovanni-ivan45/",
	},
	{
		network: "gmail",
		link: "mailto:bongiovanniivan12@gmail.com",
	},
	{
		network: "x",
		link: "https://x.com/bongiovanniDev",
	},
	{
		network: "discord",
		link: "https://discordapp.com/users/601604373822308375",
	},
];

// Global
export const SITE: Site = {
	TITLE: "Portafolio de Iván Bongiovanni",
	DESCRIPTION:
		"Iván Bongiovanni - Full Stack Developer - Portfolio, Repositories, CV, About Me, Contact, Timezone, Now, Experience, X, Study, Twitter, Github, Linkedin, Email, Discord",
	AUTHOR: "Iván Bongiovanni",
};

// Work Page
export const WORK: Page = {
	TITLE: "Trabajos",
	DESCRIPTION: "Lugares donde he trabajado.",
};

// Blog Page
export const BLOG: Page = {
	TITLE: "Blog",
	DESCRIPTION: "Escribir sobre temas que me apasionan.",
};

// Study
export const STUDIES: Study[] = [
	{
		title: "Programador Universitario",
		institution:
			"Facultad de Ciencias Exactas y Tecnología de la Universidad Nacional de Tucumán ",
		link: "https://www.facet.unt.edu.ar",
		date: "2022 - Presente",
	},
	{
		title: "Autodidacta",
		institution: "Autodidacta online",
		link: "https://www.youtube.com/@midulive",
		date: "Presente",
	},
	{
		title: "Perito Mercantil",
		institution: "Instituto Padre Manuel Ballesteros",
		link: "https://www.facebook.com/Colegio.IPMB/",
		date: "2024 - 2025",
	},
];

// Experience
export const EXPERIENCES: Experience[] = [
	{
		company: "Tensolite",
		location: "Los Pocitos,Tucumán, Argentina",
		position: "Full Stack Developer",
		start: "Junio 2023",
		link: "https://tensolite.com/",
		end: "Diciembre 2023",
		tasks: [
			"Mantenimiento y desarrollo de funcionalidades tanto nuevas como existentes",
			"Componentes y interfaces de usuario para software interno de la empresa y sus clientes externos",
			"Creacion de hooks",
			"Manejo de estado con redux",
			"Desarrollo interno con el uso de React, Redux y Material UI",
			"Uso de la metodología SCRUM",
			"Manejo de APIs",
			"Manejo de bases de datos",
		],
	},
	{
		company: "Qali",
		location: "Peru, Remoto",
		position: "Desarrollador Frontend",
		isPractices: true,
		start: "Abril 2032",
		end: "Junio 2023",
		tasks: [
			"Development of the Spot2 platform with the use of React, Redux, and Material UI",
			"Development map with the use of Google Maps API",
			"Development internal with the use of React, Redux, and Material UI",
			"Testing and debugging",
		],
	},
];
