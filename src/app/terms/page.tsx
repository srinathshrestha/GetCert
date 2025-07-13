import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20 py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <Card className="border-border bg-card/80 backdrop-blur-sm shadow-xl">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-3xl font-bold text-foreground">
              Terms and Conditions
            </CardTitle>
            <p className="text-muted-foreground mt-2">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </CardHeader>

          <CardContent className="prose prose-neutral dark:prose-invert max-w-none">
            <div className="space-y-8">
              <section>
                <h2 className="text-xl font-semibold text-foreground mb-4">
                  1. Agreement to Terms
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  By using our internship certificate generation service, you
                  agree to be bound by these Terms and Conditions. If you do not
                  agree to these terms, please do not use our service.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mb-4">
                  2. Service Description
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Our service allows eligible students to generate and download
                  their internship completion certificates. The service verifies
                  student details against our secure database and generates
                  official PDF certificates.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mb-4">
                  3. Eligibility and Verification
                </h2>
                <div className="text-muted-foreground leading-relaxed space-y-2">
                  <p>To use this service, you must:</p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>
                      Have completed an internship program with our organization
                    </li>
                    <li>Be registered in our internship database</li>
                    <li>Provide accurate and truthful information</li>
                    <li>
                      Use the email address associated with your internship
                      registration
                    </li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mb-4">
                  4. Data Privacy and Security
                </h2>
                <div className="text-muted-foreground leading-relaxed space-y-2">
                  <p>We are committed to protecting your privacy:</p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>
                      All data transmission is encrypted using SSL technology
                    </li>
                    <li>
                      Personal information is used solely for certificate
                      generation
                    </li>
                    <li>
                      Certificates are stored securely in encrypted cloud
                      storage
                    </li>
                    <li>Download links are time-limited for security</li>
                    <li>We do not share your information with third parties</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mb-4">
                  5. Certificate Authenticity
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  All generated certificates are official documents. Any attempt
                  to falsify information or generate certificates fraudulently
                  is strictly prohibited and may result in legal action.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mb-4">
                  6. Service Availability
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  While we strive to maintain 24/7 service availability, we do
                  not guarantee uninterrupted access. The service may be
                  temporarily unavailable due to maintenance, updates, or
                  technical issues.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mb-4">
                  7. Limitation of Liability
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Our liability is limited to providing the certificate
                  generation service. We are not responsible for any indirect,
                  incidental, or consequential damages arising from the use of
                  our service.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mb-4">
                  8. User Responsibilities
                </h2>
                <div className="text-muted-foreground leading-relaxed space-y-2">
                  <p>As a user, you agree to:</p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Provide accurate and complete information</li>
                    <li>
                      Not attempt to access certificates for other individuals
                    </li>
                    <li>Not misuse or abuse the service</li>
                    <li>Keep your download links secure and confidential</li>
                    <li>Report any issues or discrepancies promptly</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mb-4">
                  9. Intellectual Property
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  The certificate templates, designs, and service technology are
                  our intellectual property. You may not reproduce, modify, or
                  distribute these materials without explicit permission.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mb-4">
                  10. Changes to Terms
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  We reserve the right to update these terms at any time.
                  Changes will be effective immediately upon posting. Continued
                  use of the service constitutes acceptance of any
                  modifications.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mb-4">
                  11. Contact Information
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  If you have questions about these terms or need support,
                  please contact us at{" "}
                  <a
                    href="mailto:hr@linkverselabs.com"
                    className="text-primary hover:underline"
                  >
                    hr@linkverselabs.com
                  </a>
                  .
                </p>
              </section>

              <section className="bg-primary/5 border border-primary/20 rounded-lg p-6">
                <p className="text-sm text-muted-foreground">
                  <strong className="text-foreground">Important:</strong> By
                  clicking &quot;I accept the terms and conditions&quot; in our
                  certificate generation form, you acknowledge that you have
                  read, understood, and agree to be bound by these terms.
                </p>
              </section>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 