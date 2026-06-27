import ErrorShell from "@/components/ErrorShell";
import WaveIllustration from "@/components/WaveIllustration";
export const metadata = {
    title: "404 — Page Not Found",
};

// Next.js renders this automatically whenever a route doesn't match,
// or whenever notFound() is called from a Server Component.
export default function NotFound() {
    return (
        <ErrorShell
            code="404"
            plate="Views of the Floating World · No. 404"
            title="This Print Was Never Carved"
            description="The current carried this page out past the shoreline. What you're looking for has either drifted off with the tide, moved somewhere new, or was never block-printed to begin with."
            illustration={<WaveIllustration />}
            primary={{ label: "Return to Shore", href: "/" }}
        />
    );
}