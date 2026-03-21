import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Shield } from "lucide-react";
import Navbar from "@/components/Navbar";

const Privacy = () => {
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
            <Shield className="h-6 w-6 text-primary-foreground" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Privacy Policy
          </h1>
        </div>

        <div className="space-y-8 text-foreground/90">
          <p className="text-muted-foreground">Last updated: March 21, 2026</p>

          <section className="space-y-3">
            <h2 className="text-2xl font-semibold text-foreground">1. Information We Collect</h2>
            <p>When you create an account, we collect your email address and display name. As you use EduVoice, we collect data about your quiz scores, study progress, exam results, and chat interactions to personalize your learning experience.</p>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-semibold text-foreground">2. How We Use Your Information</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>To provide and improve our AI-powered learning features</li>
              <li>To personalize study plans and recommendations</li>
              <li>To display leaderboards and community features</li>
              <li>To generate analytics on your learning progress</li>
              <li>To communicate important updates about the platform</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-semibold text-foreground">3. Data Security</h2>
            <p>We use industry-standard encryption and security measures to protect your personal data. Your passwords are hashed and never stored in plain text. All data transmission is encrypted via HTTPS.</p>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-semibold text-foreground">4. Data Sharing</h2>
            <p>We do not sell your personal information to third parties. Your study data and progress are visible only to you unless you choose to participate in public leaderboards or community features.</p>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-semibold text-foreground">5. Your Rights</h2>
            <p>You can request access to, correction of, or deletion of your personal data at any time by contacting us. You may also export your learning data.</p>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-semibold text-foreground">6. Cookies</h2>
            <p>We use essential cookies for authentication and session management. No third-party tracking cookies are used on our platform.</p>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-semibold text-foreground">7. Contact Us</h2>
            <p>If you have questions about this Privacy Policy, please reach out through the platform's contact feature.</p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
