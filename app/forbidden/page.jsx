import ErrorShell from "@/components/ErrorShell";
import GateIllustration from "@/components/GateIllustration";


export const metadata = {
    title: "403 — Forbidden",
};

// Renders whenever the forbidden() function is called from a Server
// Component, Server Action, or Route Handler. Requires authInterrupts
// enabled in next.config.js — see the note below this file.
export default function Forbidden() {
    return (
        <ErrorShell
            code="403"
            plate="Views of the Floating World · No. 403"
            title="The Gate Is Sealed"
            description="A sacred rope marks this threshold as closed to you. Whatever lies beyond it belongs to those with proper standing — turn back to grounds you're free to walk."
            illustration={<GateIllustration />}
            primary={{ label: "Return to Shore", href: "/" }}
        />
    );
}