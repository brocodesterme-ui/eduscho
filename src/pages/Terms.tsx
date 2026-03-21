import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, FileText } from "lucide-react";
import Navbar from "@/components/Navbar";

const Terms = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <Link to="/">
          <Button variant="ghost" className="mb-6 gap-2 rounded-full">
            <ArrowLeft className="h-4 w-4" /> Back to Home
          </Button>
        </Link>

        <div className="flex items-center gap-3 mb-8">
          <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
            <FileText className="h-6 w-6 text-primary-foreground" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Terms of Service
          </h1>
        </div>

        <div className="space-y-8 text-foreground/90">
          <p className="text-muted-foreground">Last updated: March 21, 2026</p>

          <section className="space-y-3">
            <h2 className="text-2xl font-semibold text-foreground">1. Acceptance of Terms</h2>
            <p>By accessing or using EduVoice, you agree to be bound by these Terms of Service. If you do not agree, please do not use our platform.</p>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-semibold text-foreground">2. Description of Service</h2>
            <p>EduVoice is an AI-powered educational platform that provides exam simulations, study planning, interactive quizzes, video lessons, NCERT resources, and community features for students.</p>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-semibold text-foreground">3. User Accounts</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>You must provide accurate information when creating an account</li>
              <li>You are responsible for maintaining the security of your account</li>
              <li>You must not share your account credentials with others</li>
              <li>You must be at least 13 years old to use EduVoice</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-semibold text-foreground">4. Acceptable Use</h2>
            <p>You agree not to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Use the platform for any unlawful purpose</li>
              <li>Share inappropriate or offensive content in community features</li>
              <li>Attempt to manipulate leaderboards or quiz scores</li>
              <li>Interfere with the platform's operation or security</li>
              <li>Use automated tools to access the service without permission</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-semibold text-foreground">5. AI-Generated Content</h2>
            <p>EduVoice uses AI to generate study materials, quizzes, and exam questions. While we strive for accuracy, AI-generated content may occasionally contain errors. Always cross-reference with your official textbooks and teachers.</p>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-semibold text-foreground">6. Intellectual Property</h2>
            <p>All content, design, and technology on EduVoice is owned by us. NCERT content is referenced under fair use for educational purposes. You retain ownership of any original content you create on the platform.</p>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-semibold text-foreground">7. Limitation of Liability</h2>
            <p>EduVoice is provided "as is" without warranties. We are not liable for any academic outcomes or decisions made based on the platform's content or recommendations.</p>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-semibold text-foreground">8. Changes to Terms</h2>
            <p>We may update these terms from time to time. Continued use of EduVoice after changes constitutes acceptance of the new terms.</p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Terms;
