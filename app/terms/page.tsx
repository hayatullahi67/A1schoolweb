import Footer from "@/components/footer"
import Header from "@/components/header"
import type { Metadata } from "next"


export default function TermsPage() {
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
        <h1 className="text-2xl font-bold mb-2">A1school – Terms & Conditions</h1>
        <div className="text-sm text-gray-500 mb-4">
          <p>
            Effective Date: {currentDate}

          </p>
          <p>
            Last Updated: {currentDate}

          </p>
        </div>
        <p>
          Please read these Terms & Conditions ( erms ,  Agreement ) carefully before using the A1school platform
          (  Platform ,   Service ) operated by A1school ( we ,  us ,  our ).
        </p>
        <p className="mt-3">
          By accessing or using A1school, whether as a student, instructor, affiliate, or visitor, you agree to be
          legally bound by these Terms. If you do not agree, you may not access or use the platform.
        </p>
      </header>

      <hr className="my-6" />

      <section className="mb-6">
        <h2 className="text-xl font-bold mb-3" id="definitions">
          1. Definitions
        </h2>
        <ul className="list-disc pl-6">
          <li>User refers to anyone accessing or using the platform.</li>
          <li>Instructor is a user who uploads and publishes courses on A1school.</li>
          <li>Student is a user who enrolls in courses.</li>
          <li>Affiliate is a user who promotes courses using unique referral links.</li>
          <li>Platform means A1school, including its website, mobile application, and related services.</li>
        </ul>
      </section>

      <hr className="my-6" />

      <section className="mb-6">
        <h2 className="text-xl font-bold mb-3" id="eligibility">
          2. Eligibility
        </h2>
        <p className="mb-3">
          You must be at least 18 years old to use A1school. By using the platform, you represent that:
        </p>
        <ul className="list-disc pl-6">
          <li>You have full legal capacity to enter into this agreement;</li>
          <li>All information you provide is accurate and up to date.</li>
        </ul>
      </section>

      <hr className="my-6" />

      <section className="mb-6">
        <h2 className="text-xl font-bold mb-3" id="account-registration">
          3. Account Registration
        </h2>
        <p className="mb-3">To access features, you must create an account. You are responsible for:</p>
        <ul className="list-disc pl-6">
          <li>Maintaining the confidentiality of your login credentials;</li>
          <li>Any activity that occurs under your account.</li>
        </ul>
      </section>

      <hr className="my-6" />

      <section className="mb-6">
        <h2 className="text-xl font-bold mb-3" id="instructor-terms">
          4. Instructor Terms
        </h2>
        <p className="mb-3">By uploading content as an Instructor, you agree:</p>
        <ul className="list-disc pl-6 mb-4">
          <li>To provide only original, high-quality, and lawful content;</li>
          <li>That your course may be reviewed, edited, or removed if it violates our guidelines;</li>
          <li>
            That you grant A1school a worldwide, royalty-free license to market and distribute your course through its
            ecosystem.
          </li>
        </ul>

        <p className="font-bold mb-2">Revenue Sharing Structure:</p>
        <ul className="list-disc pl-6 mb-4">
          <li>Instructor-promoted sale: 70% Instructor / 30% Platform</li>
          <li>Affiliate-promoted sale: 50% Instructor / 40% Affiliate / 10% Platform</li>
          <li>Organic sale: 50% Instructor / 50% Platform</li>
        </ul>

        <p>Payments are made monthly, subject to a minimum threshold and refund clearance period.</p>
      </section>

      <hr className="my-6" />

      <section className="mb-6">
        <h2 className="text-xl font-bold mb-3" id="student-terms">
          5. Student Terms
        </h2>
        <p className="mb-3">By enrolling in courses, you agree:</p>
        <ul className="list-disc pl-6 mb-4">
          <li>To use the content for personal, non-commercial purposes only;</li>
          <li>Not to copy, reproduce, or distribute course materials;</li>
          <li>That access to courses may be removed if you violate these terms.</li>
        </ul>

        <p>
          Refunds may be available under our Refund Policy, provided the request meets specific criteria and is made
          within the allowed period.
        </p>
      </section>

      <hr className="my-6" />

      <section className="mb-6">
        <h2 className="text-xl font-bold mb-3" id="affiliate-program">
          6. Affiliate Program
        </h2>
        <p className="mb-3">Affiliates may share referral links to earn commission:</p>
        <ul className="list-disc pl-6">
          <li>You may only promote courses ethically and legally;</li>
          <li>A1school may track activity via cookies and assign commissions accordingly;</li>
          <li>Commissions are paid monthly, with thresholds and review periods applied.</li>
        </ul>
      </section>

      <hr className="my-6" />

      <section className="mb-6">
        <h2 className="text-xl font-bold mb-3" id="content-ownership">
          7. Content Ownership
        </h2>
        <ul className="list-disc pl-6">
          <li>Instructors retain ownership of their original content;</li>
          <li>A1school is granted a license to host, market, and distribute courses on the platform;</li>
          <li>You may not copy or republish platform content without permission.</li>
        </ul>
      </section>

      <hr className="my-6" />

      <section className="mb-6">
        <h2 className="text-xl font-bold mb-3" id="code-of-conduct">
          8. Code of Conduct
        </h2>
        <p className="mb-3">Users must not:</p>
        <ul className="list-disc pl-6 mb-4">
          <li>Upload or share harmful, illegal, or plagiarized content;</li>
          <li>Impersonate another person or misrepresent your identity;</li>
          <li>Interfere with platform operations or attempt unauthorized access.</li>
        </ul>

        <p>Violation may result in account suspension or termination without notice.</p>
      </section>

      <hr className="my-6" />

      <section className="mb-6">
        <h2 className="text-xl font-bold mb-3" id="platform-rights">
          9. Platform Rights
        </h2>
        <p className="mb-3">We reserve the right to:</p>
        <ul className="list-disc pl-6">
          <li>Modify or discontinue any part of the service at any time;</li>
          <li>Adjust pricing and commission structures, with notice;</li>
          <li>Deny or revoke access to the platform at our discretion.</li>
        </ul>
      </section>

      <hr className="my-6" />

      <section className="mb-6">
        <h2 className="text-xl font-bold mb-3" id="limitation-of-liability">
          10. Limitation of Liability
        </h2>
        <p className="mb-3">A1school shall not be held liable for:</p>
        <ul className="list-disc pl-6">
          <li>Any direct or indirect damages arising from the use of the platform;</li>
          <li>Content accuracy, quality, or legality provided by instructors;</li>
          <li>Delays or failures in payment processing outside our control.</li>
        </ul>
      </section>

      <hr className="my-6" />

      <section className="mb-6">
        <h2 className="text-xl font-bold mb-3" id="termination">
          11. Termination
        </h2>
        <p className="mb-3">You may delete your account at any time.</p>
        <p className="mb-3">We may suspend or terminate your account for:</p>
        <ul className="list-disc pl-6">
          <li>Breach of these Terms;</li>
          <li>Fraudulent or harmful behavior;</li>
          <li>Legal or regulatory reasons.</li>
        </ul>
      </section>

      <hr className="my-6" />

      <section className="mb-6">
        <h2 className="text-xl font-bold mb-3" id="changes-to-terms">
          12. Changes to Terms
        </h2>
        <p className="mb-3">We may update these Terms from time to time.</p>
        <p>
          You will be notified of major changes, and continued use of A1school after changes means you accept the
          revised terms.
        </p>
      </section>

      <hr className="my-6" />

      <section className="mb-6">
        <h2 className="text-xl font-bold mb-3" id="governing-law">
          13. Governing Law
        </h2>
        <p className="mb-3">These Terms are governed by and interpreted in accordance with the laws of NIGERIA.</p>
        <p>Any disputes arising shall be resolved in the courts of NIGERIA.</p>
      </section>

      <hr className="my-6" />

      <section className="mb-6">
        <h2 className="text-xl font-bold mb-3" id="contact-us">
          14. Contact Us
        </h2>
        <p className="mb-3">If you have any questions about these Terms, please contact:</p>
        <p>
          Email:{" "}
          <a href="mailto:support@a1school.com" className="text-blue-600 hover:underline">
            support@a1school.com
          </a>
        </p>
        <p>Address: Alex Ekwueme way jabi Abuja, FCT</p>
      </section>

      <hr className="my-6" />

      <footer className="mt-8 pt-4 border-t">
        <p className="font-bold">
          By using A1school, you confirm that you have read, understood, and agreed to these Terms and Conditions.
        </p>
      </footer>
    </div>
    </div>

    <Footer />
    </>
  )
}
