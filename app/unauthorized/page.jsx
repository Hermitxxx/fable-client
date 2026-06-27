import ErrorShell from "@/components/ErrorShell";
import SealIllustration from "@/components/SealIllustration";


export const metadata = {
    title: "401 — Unauthorized",
};

// Renders whenever the unauthorized() function is called from a Server
// Component, Server Action, or Route Handler. Requires authInterrupts
// enabled in next.config.js — see the note below this file.
export default function Unauthorized() {
    return (
        <ErrorShell
            code="401"
            plate="Views of the Floating World · No. 401"
            title="No Seal, No Passage"
            description="Every traveler through these halls carries a personal mark. Press yours below to continue on — or step back to ground where no seal is required."
            illustration={<SealIllustration />}
            primary={{ label: "Return Home", href: "/" }}
        />
    );
}