import { createFileRoute } from "@tanstack/react-router";
import { BookScreen } from "@/components/book-screen";

export const Route = createFileRoute("/")({ component: BookScreen });
