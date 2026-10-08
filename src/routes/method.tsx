import { createFileRoute } from "@tanstack/react-router";
import { MethodScreen } from "@/components/method-screen";

export const Route = createFileRoute("/method")({ component: MethodScreen });
