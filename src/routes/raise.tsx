import { createFileRoute } from "@tanstack/react-router";
import { RaiseScreen } from "@/components/raise-screen";

export const Route = createFileRoute("/raise")({ component: RaiseScreen });
