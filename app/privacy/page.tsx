import Footer from "@/components/footer"
import Header from "@/components/header"


export default function PrivacyPolicyPage() {
  const currentDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
   <>
   <Header />

   <div className="bg-[#f9fafb]">

   <div className="max-w-[90%] mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-2xl font-bold mb-2">A1school – Privacy Policy</h1>
        <div className="text-sm  mb-4">
          <p>Effective Date: {currentDate}</p>
          <p>Last Updated: {currentDate}</p>
        </div>
        <p>
          This Privacy Policy explains how A1school ( we ,  our ,  us ) collects, uses, discloses, and protects the
          personal information of users who interact with our platform, including instructors, students, affiliates, and
          visitors. By using A1school, you consent to the practices outlined in this policy.
        </p>
      </header>

      <hr className="my-6" />

      <section className="mb-6">
        <h2 className="text-xl font-bold mb-3" id="information-we-collect">
          1. Information We Collect
        </h2>
        <p className="mb-3">
          We collect personal and usage information when you interact with our platform. This includes:
        </p>

        <h3 className="font-bold mt-4 mb-2">a. Information You Provide:</h3>
        <ul className="list-disc pl-6 mb-4">
          <li>Full name and email address</li>
          <li>Profile photo, biography, and other public details</li>
          <li>Payment or payout information (e.g., bank account, wallet addresses)</li>
          <li>Course content (for instructors)</li>
          <li>Communication logs (support messages, feedback)</li>
        </ul>

        <h3 className="font-bold mt-4 mb-2">b. Information We Automatically Collect:</h3>
        <ul className="list-disc pl-6">
          <li>IP address and device data</li>
          <li>Browser type and operating system</li>
          <li>Access times and referring URLs</li>
          <li>Usage data (pages visited, time spent, course progress)</li>
        </ul>
      </section>

      <hr className="my-6" />

      <section className="mb-6">
        <h2 className="text-xl font-bold mb-3" id="how-we-use">
          2. How We Use Your Information
        </h2>
        <p className="mb-3">We use your data to:</p>
        <ul className="list-disc pl-6">
          <li>Verify identity and manage user accounts</li>
          <li>Approve, publish, and host instructor content</li>
          <li>Deliver courses to students</li>
          <li>Track affiliate sales and commission</li>
          <li>Process payments and payouts securely</li>
          <li>Improve platform functionality and user experience</li>
          <li>Send service-related updates and important notifications</li>
          <li>Enforce terms and comply with legal obligations</li>
        </ul>
      </section>

      <hr className="my-6" />

      <section className="mb-6">
        <h2 className="text-xl font-bold mb-3" id="sharing">
          3. Sharing Your Information
        </h2>
        <p className="font-bold mb-3">We do not sell your personal data.</p>
        <p className="mb-3">We may share your data only with:</p>
        <ul className="list-disc pl-6 mb-3">
          <li>Payment processors for secure transactions</li>
          <li>Service providers (hosting, analytics, email services)</li>
          <li>Legal authorities when required by law</li>
          <li>Affiliates only for tracking referral sales and commissions</li>
        </ul>
        <p>All third parties are bound to confidentiality agreements and data protection standards.</p>
      </section>

      <hr className="my-6" />

      <section className="mb-6">
        <h2 className="text-xl font-bold mb-3" id="cookies">
          4. Cookies and Tracking Technologies
        </h2>
        <p className="mb-3">We use cookies and similar technologies to:</p>
        <ul className="list-disc pl-6 mb-3">
          <li>Maintain login sessions</li>
          <li>Remember user preferences</li>
          <li>Track course engagement</li>
          <li>Measure marketing performance (e.g., affiliate links)</li>
        </ul>
        <p>You can control cookies through your browser settings, but disabling them may impact your experience.</p>
      </section>

      <hr className="my-6" />

      <section className="mb-6">
        <h2 className="text-xl font-bold mb-3" id="security">
          5. Data Security
        </h2>
        <p className="mb-3">We implement industry-standard safeguards:</p>
        <ul className="list-disc pl-6 mb-3">
          <li>SSL encryption for data transmission</li>
          <li>Encrypted storage of sensitive information</li>
          <li>Role-based access control for administrative functions</li>
        </ul>
        <p>Despite our efforts, no method of transmission is 100% secure. You use the platform at your own risk.</p>
      </section>

      <hr className="my-6" />

      <section className="mb-6">
        <h2 className="text-xl font-bold mb-3" id="your-rights">
          6. Your Rights
        </h2>
        <p className="mb-3">Depending on your jurisdiction, you may have the right to:</p>
        <ul className="list-disc pl-6 mb-3">
          <li>Access and review your personal data</li>
          <li>Correct or update inaccurate data</li>
          <li>Request deletion of your account and data</li>
          <li>Withdraw consent (where applicable)</li>
        </ul>
        <p>
          Requests can be made by contacting{" "}
          <a href="mailto:privacy@a1school.com" className="text-blue-600 hover:underline">
            privacy@a1school.com
          </a>
          .
        </p>
      </section>

      <hr className="my-6" />

      <section className="mb-6">
        <h2 className="text-xl font-bold mb-3" id="data-retention">
          7. Data Retention
        </h2>
        <p className="mb-3">We retain your information:</p>
        <ul className="list-disc pl-6 mb-3">
          <li>As long as your account is active</li>
          <li>For legal and tax obligations</li>
          <li>To resolve disputes or enforce agreements</li>
        </ul>
        <p>You can request full deletion of your account at any time.</p>
      </section>

      <hr className="my-6" />

      <section className="mb-6">
        <h2 className="text-xl font-bold mb-3" id="childrens-privacy">
          8. Children  Privacy
        </h2>
        <p>
          A1school is not intended for children under 13 (or under 16 in the EU). We do not knowingly collect personal
          information from minors. If we discover such data, it will be deleted immediately.
        </p>
      </section>

      <hr className="my-6" />

      <section className="mb-6">
        <h2 className="text-xl font-bold mb-3" id="third-party-links">
          9. Third-Party Links
        </h2>
        <p>
          Our platform may contain links to third-party websites. We are not responsible for the privacy practices or
          content of these external sites.
        </p>
      </section>

      <hr className="my-6" />

      <section className="mb-6">
        <h2 className="text-xl font-bold mb-3" id="changes">
          10. Changes to This Policy
        </h2>
        <p>
          We may update this Privacy Policy periodically. You will be notified of significant changes via email or
          platform alerts. Continued use of the platform after updates means you accept the revised policy.
        </p>
      </section>

      <hr className="my-6" />

      <section className="mb-6">
        <h2 className="text-xl font-bold mb-3" id="contact">
          11. Contact Us
        </h2>
        <p className="mb-3">For questions, concerns, or data requests, please contact:</p>
        <p>
          Email:{" "}
          <a href="mailto:privacy@a1school.com" className="text-blue-600 hover:underline">
            privacy@a1school.com
          </a>
        </p>
        <p>Address: Alex Ekwueme way,  Jabi abuja, fct</p>
      </section>

      <hr className="my-6" />

      <footer className="mt-8 pt-4 border-t">
        <p className="font-bold">
          By using A1school, you agree to this Privacy Policy and consent to the collection and use of your information
          as described.
        </p>
      </footer>
    </div>
   </div>
   <Footer />
   </>
  )
}
