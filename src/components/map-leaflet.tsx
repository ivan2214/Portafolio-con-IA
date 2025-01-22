"use client";

import L from "leaflet";
import { useEffect } from "react";
import "leaflet/dist/leaflet.css";

interface MapProps {
	center: [number, number];
	zoom: number;
}

export default function MapLeaflet({ center, zoom }: MapProps) {
	useEffect(() => {
		const map = L.map("map").setView(center, zoom);

		L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {}).addTo(
			map,
		);

		// Usar un icono desde una URL web
		const customIcon = L.icon({
			iconUrl: "https://unpkg.com/leaflet/dist/images/marker-icon.png", // URL del icono
			iconSize: [24, 24], // Tamaño del icono
			iconAnchor: [16, 32], // Anclaje para la posición del marcador
			popupAnchor: [0, -32], // Anclaje del popup
		});

		L.marker(center, {
			icon: customIcon,
		}).addTo(map);

		return () => {
			map.remove();
		};
	}, [center, zoom]);

	return <div id="map" className="h-full w-full" />;
}
