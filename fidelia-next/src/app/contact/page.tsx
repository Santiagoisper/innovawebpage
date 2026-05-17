import type { Metadata } from "next";
import MotionProviders from "@/components/motion/MotionProviders";
import VideoPageShell from "@/components/layout/VideoPageShell";
import InnerPage from "@/components/layout/InnerPage";
import Button from "@/components/ui/Button";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Contact",
  description: `Contact ${SITE.name} about your next clinical trial in Latin America.`,
};

export default function ContactPage() {
  return (
    <VideoPageShell video="contact" objectPosition="center 45%">
      <MotionProviders>
        <InnerPage
          label="Contact"
          title="Discuss your next trial"
          description="Tell us about your protocol, countries of interest, and timeline. Our team will respond with a feasibility-oriented conversation — not a generic brochure."
        >
          <div className="flex flex-col sm:flex-row gap-4">
            <Button href={`mailto:${SITE.email}`}>Email {SITE.email}</Button>
            <Button href="/" variant="secondary">
              Back to home
            </Button>
          </div>
        </InnerPage>
      </MotionProviders>
    </VideoPageShell>
  );
}
