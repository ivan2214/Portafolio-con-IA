"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useChat } from "ai/react";

import { useEffect, useRef, useState } from "react";

interface ChatBotProps {
	repository: {
		id: number;
		name: string;
	};
}

export function ChatBot({ repository }: ChatBotProps) {
	if (!repository) {
		return null;
	}

	const [isOpen, setIsOpen] = useState(false);
	const inputRef = useRef<HTMLInputElement>(null);
	const chatContentRef = useRef<HTMLDivElement>(null);
	const { messages, input, handleInputChange, handleSubmit, isLoading } =
		useChat({
			api: "/api/chat",
			body: { repositoryId: repository?.id },
		});

	const typicalQuestions = [
		"¿Cuál es el propósito principal de este proyecto?",
		"¿Qué tecnologías se utilizaron en este proyecto?",
		"¿Cómo puedo contribuir a este proyecto?",
		"¿Cuáles son las principales características de este proyecto?",
	];

	const toggleChat = () => setIsOpen(!isOpen);

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		if (chatContentRef.current) {
			chatContentRef.current.scrollTo({
				top: chatContentRef.current.scrollHeight,
				behavior: "smooth",
			});
		}
	}, [messages]);

	if (!isOpen) {
		return (
			<Button
				className="fixed right-4 bottom-4 flex items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-all duration-300 hover:bg-primary/90"
				onClick={toggleChat}
			>
				Chat sobre {repository.name}
			</Button>
		);
	}

	const addQuestion = (question: string) => {
		if (inputRef.current) {
			const event = {
				target: { value: question } as HTMLInputElement,
				// Puedes agregar las demás propiedades necesarias de un ChangeEvent
				currentTarget: inputRef.current,
				nativeEvent: new Event("input"),
				bubbles: true,
				cancelable: true,
			};

			handleInputChange(event as React.ChangeEvent<HTMLInputElement>);
		}
	};

	const onClose = () => {
		setIsOpen(false);
	};

	return (
		<Card className="fixed right-4 bottom-4 w-[500px] rounded-lg bg-background/80 shadow-xl backdrop-blur-sm transition-all duration-300">
			<CardHeader className="rounded-t-lg bg-primary text-primary-foreground">
				<CardTitle className="flex items-center justify-between">
					<span>Chat sobre {repository.name}</span>
					<Button
						variant="ghost"
						size="sm"
						onClick={onClose}
						className="h-6 w-6 rounded-full"
					>
						
					</Button>
				</CardTitle>
			</CardHeader>
			<CardContent
				className="h-80 space-y-4 overflow-y-auto overflow-x-hidden p-4"
				ref={chatContentRef}
			>
				{messages.length === 0 && (
					<div className="mb-4">
						<p className="mb-2 font-semibold">Preguntas sugeridas:</p>
						<div className="flex flex-col gap-2">
							{typicalQuestions.map((question) => (
								<Badge
									variant="outline"
									className="cursor-pointer rounded py-2 transition-colors duration-200 hover:bg-primary/10"
									key={question}
									onClick={() => addQuestion(question)}
								>
									{question}
								</Badge>
							))}
						</div>
					</div>
				)}
				{messages.map((message) => (
					<div
						key={message.id}
						className={cn(
							"max-w-xs rounded-lg p-2",
							message.role === "user"
								? "ml-auto overflow-hidden rounded bg-primary text-primary-foreground"
								: "mr-auto overflow-hidden rounded bg-secondary text-secondary-foreground",
						)}
					>
						<strong className={cn("mb-2 block font-semibold")}>
							{message.role === "user" ? (
								<Badge variant="outline" className="text-primary-foreground">
									Tú:{" "}
								</Badge>
							) : (
								<Badge>IA: </Badge>
							)}
						</strong>
						<div>
							{message.content.split("```").map((part, index) => {
								// Si es un bloque de código (en pares de "```"), lo renderizamos como código
								if (index % 2 === 1) {
									return (
										<pre
											key={part}
											className="my-2 overflow-x-auto rounded bg-gray-800 p-2 text-white"
										>
											<code>{part.trim()}</code>
										</pre>
									);
								}

								return (
									<p className="my-2 whitespace-pre-wrap" key={part}>
										{part}
									</p>
								);
							})}
						</div>
					</div>
				))}
			</CardContent>
			<CardFooter className="p-4">
				<form onSubmit={handleSubmit} className="flex w-full">
					<Input
						ref={inputRef}
						value={input}
						onChange={handleInputChange}
						placeholder="Pregunta sobre el proyecto..."
						className="mr-2 flex-grow"
					/>
					<Button disabled={isLoading} type="submit">
						{isLoading ? "Enviando..." : "Enviar"}
					</Button>
				</form>
			</CardFooter>
		</Card>
	);
}
