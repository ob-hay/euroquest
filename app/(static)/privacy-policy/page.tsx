import { Metadata } from "next";
import HeroBanner from "@/components/shared/hero-banner";
import { BreadcrumbItem } from "@/components/ui/breadcrumb";
import { Home } from "lucide-react";
import { getSeoData } from "@/services/services";
import Container from "@/components/shared/container";
import Schema from "@/components/shared/schema";


// Generate metadata dynamically
export async function generateMetadata(): Promise<Metadata> {
  try {
    const seoData = await getSeoData('privacy');
    const seo = seoData.seo;

    return {
      title: seo.meta_title,
      description: seo.meta_description,
      keywords: seo.meta_keywords,
      openGraph: {
        title: seo.meta_title,
        description: seo.meta_description,
        images: [
          {
            url: seo.meta_image,
            width: 1200,
            height: 630,
            alt: seo.meta_title,
          },
        ],
        type: 'website',
        url: seo.canonical,
      },
      twitter: {
        card: 'summary_large_image',
        title: seo.meta_title,
        description: seo.meta_description,
        images: [seo.meta_image],
      },
      alternates: {
        canonical: seo.canonical,
      },
    };
  } catch (error) {
    console.error('Error generating metadata for privacy policy page:', error);
    
    // Fallback metadata
    return {
      title: "Privacy Policy | EuroQuest International Data Protection & GDPR Compliance",
      description: "EuroQuest International Privacy Policy explains how we collect, use, and protect your personal information in compliance with GDPR and international data protection standards.",
      keywords: "privacy policy, data protection, GDPR compliance, personal information, EuroQuest International, data privacy, user rights",
    };
  }
}

export default function PrivacyPolicyPage() {
  const breadcrumbs: BreadcrumbItem[] = [
    {
      href: "/",
      label: "",
      icon: <Home width={16} height={16}/>
    },
    {
      href: "/privacy-policy",
      label: "Privacy Policy"
    }
  ];

  return (
    <>     
      <Schema 
        pageType="privacy"
        pageTitle="Privacy Policy | EuroQuest International Data Protection & GDPR Compliance"
        pageDescription="EuroQuest International Privacy Policy explains how we collect, use, and protect your personal information in compliance with GDPR and international data protection standards."
        pageUrl="https://euroqst.com/privacy-policy"
      />
      {/* Hero Banner */}
      <HeroBanner
        backgroundImage="/assets/images/hero-privacy.png"
        title="Privacy Policy"
        description="This Privacy Policy explains how EuroQuest International collects, uses, and protects your personal information when you access our website and services, in compliance with GDPR and international data protection standards."
        breadcrumbs={breadcrumbs}
        enableTypewriter={true}
        typewriterSpeed={100}
        typewriterDelay={500}
      />

      {/* Privacy Content */}
      <section className="md:py-12 py-10 bg-white">
        <Container>
          {/* Introduction */}
          <div>
            <p className="md:md:text-lg text-sm font-medium text-sm text-gray-600 leading-relaxed mb-6">
              We respect your privacy and are committed to protecting it through our
              compliance with this privacy policy ("Policy"). This Policy describes
              the types of information we may collect from you or that you may
              provide ("Personal Information") on the euroqst.com website ("Website"
              or "Service") and any of its related products and services
              (collectively, "Services"), and our practices for collecting, using,
              maintaining, protecting, and disclosing that Personal Information. It
              also describes the choices available to you regarding our use of your
              Personal Information and how you can access and update it. This Policy
              is a legally binding agreement between you ("User", "you" or "your")
              and EUROQUEST INTERNATIONAL s.r.o. ("EUROQUEST INTERNATIONAL s.r.o.",
              "we", "us" or "our"). If you are entering into this agreement on
              behalf of a business or other legal entity, you represent that you
              have the authority to bind such entity to this agreement, in which
              case the terms "User", "you" or "your" shall refer to such entity. If
              you do not have such authority, or if you do not agree with the terms
              of this agreement, you must not accept this agreement and may not
              access and use the Website and Services. By accessing and using the
              Website and Services, you acknowledge that you have read, understood,
              and agree to be bound by the terms of this Policy. This Policy does
              not apply to the practices of companies that we do not own or control,
              or to individuals that we do not employ or manage.
            </p>

            {/* Collection of Personal Information */}
            <div className="mb-8">
              <h3 className="md:text-2xl text-xl font-semibold text-[#3E5EC0] mb-2">
                Collection of Personal Information
              </h3>
              <div className="space-y-6">
                <p className="md:text-lg text-sm font-medium text-gray-600 leading-relaxed">
                  You can access and use the Website and Services without telling us
                  who you are or revealing any information by which someone could
                  identify you as a specific, identifiable individual. If, however,
                  you wish to use some of the features offered on the Website, you may
                  be asked to provide certain Personal Information (for example, your
                  name and e-mail address).
                </p>
                <p className="md:text-lg text-sm font-medium text-gray-600 leading-relaxed">
                  We receive and store any information you knowingly provide to us
                  when you make a purchase, or fill any forms on the Website. When
                  required, this information may include the following: Contact
                  information such as email address, phone number, etc Basic personal
                  information (such as name, country of residence, etc)
                </p>
              </div>
            </div>

            {/* Privacy of Children */}
            <div className="mb-8">
              <h3 className="md:text-2xl text-xl font-semibold text-[#3E5EC0] mb-2">
                Privacy of Children
              </h3>
              <div className="space-y-6">
                <p className="md:text-lg text-sm font-medium text-gray-600 leading-relaxed">
                  We do not knowingly collect any Personal Information from children
                  under the age of 18. If you are under the age of 18, please do not
                  submit any Personal Information through the Website and Services. If
                  you have reason to believe that a child under the age of 18 has
                  provided Personal Information to us through the Website and
                  Services, please contact us to request that we delete that child's
                  Personal Information from our Services.
                </p>
                <p className="md:text-lg text-sm font-medium text-gray-600 leading-relaxed">
                  We encourage parents and legal guardians to monitor their children's
                  Internet usage and to help enforce this Policy by instructing their
                  children never to provide Personal Information through the Website
                  and Services without their permission. We also ask that all parents
                  and legal guardians overseeing the care of children take the
                  necessary precautions to ensure that their children are instructed
                  to never give out Personal Information when online without their
                  permission.
                </p>
              </div>
            </div>

            {/* Use and Processing of Collected Information */}
            <div className="mb-8">
              <h3 className="md:text-2xl text-xl font-semibold text-[#3E5EC0] mb-2">
                Use and Processing of Collected Information
              </h3>
              <div className="space-y-6">
                <p className="md:text-lg text-sm font-medium text-gray-600 leading-relaxed">
                  We act as a data controller and a data processor in terms of the
                  GDPR when handling Personal Information, unless we have entered into
                  a data processing agreement with you in which case you would be the
                  data controller and we would be the data processor.
                </p>
                <p className="md:text-lg text-sm font-medium text-gray-600 leading-relaxed">
                  Our role may also differ depending on the specific situation
                  involving Personal Information. We act in the capacity of a data
                  controller when we ask you to submit your Personal Information that
                  is necessary to ensure your access and use of the Website and
                  Services. In such instances, we are a data controller because we
                  determine the purposes and means of the processing of Personal
                  Information and we comply with data controllers' obligations set
                  forth in the GDPR. We act in the capacity of a data processor in
                  situations when you submit Personal Information through the Website
                  and Services. We do not own, control, or make decisions about the
                  submitted Personal Information, and such Personal Information is
                  processed only in accordance with your instructions. In such
                  instances, the User providing Personal Information acts as a data
                  controller in terms of the GDPR.
                </p>
                <p className="md:text-lg text-sm font-medium text-gray-600 leading-relaxed">
                  In order to make the Website and Services available to you, or to
                  meet a legal obligation, we may need to collect and use certain
                  Personal Information. If you do not provide the information that we
                  request, we may not be able to provide you with the requested
                  products or services. Any of the information we collect from you may
                  be used for the following purposes:
                </p>
                <ul className="list-disc pl-5 space-y-3 md:text-lg text-sm font-medium text-gray-600">
                  <li>Fulfill and manage orders</li>
                  <li>Deliver products or services</li>
                  <li>Send administrative information</li>
                  <li>Send marketing and promotional communications</li>
                  <li>Send product and service updates</li>
                  <li>Respond to inquiries and offer support</li>
                  <li>Request user feedback</li>
                  <li>Improve user experience</li>
                  <li>Post customer testimonials</li>
                  <li>Enforce terms and conditions and policies</li>
                  <li>Protect from abuse and malicious users</li>
                  <li>Respond to legal requests and prevent harm</li>
                  <li>Run and operate the Website and Services</li>
                </ul>
                <p className="md:text-lg text-sm font-medium text-gray-600 leading-relaxed">
                  <span className="font-bold">Note:</span> that under some legislations we may
                  be allowed to process information until you object to such
                  processing by opting out, without having to rely on consent or any
                  other of the legal bases above. In any case, we will be happy to
                  clarify the specific legal basis that applies to the processing, and
                  in particular whether the provision of Personal Information is a
                  statutory or contractual requirement, or a requirement necessary to
                  enter into a contract.
                </p>
              </div>
            </div>

            {/* Payment Processing */}
            <div className="mb-8">
              <h3 className="md:text-2xl text-xl font-semibold text-[#3E5EC0] mb-2">
                Payment Processing
              </h3>
              <div className="space-y-6">
                <p className="md:text-lg text-sm font-medium text-gray-600 leading-relaxed">
                  In case of Services requiring payment, you may need to provide your
                  credit card details or other payment account information, which will
                  be used solely for processing payments. We use third-party payment
                  processors ("Payment Processors") to assist us in processing your
                  payment information securely.
                </p>
                <p className="md:text-lg text-sm font-medium text-gray-600 leading-relaxed">
                  Payment Processors adhere to the latest security standards as
                  managed by the PCI Security Standards Council, which is a joint
                  effort of brands like Visa, MasterCard, American Express and
                  Discover. Sensitive and private data exchange happens over a SSL
                  secured communication channel and is encrypted and protected with
                  digital signatures, and the Website and Services are also in
                  compliance with strict vulnerability standards in order to create as
                  secure of an environment as possible for Users. We will share
                  payment data with the Payment Processors only to the extent
                  necessary for the purposes of processing your payments, refunding
                  such payments, and dealing with complaints and queries related to
                  such payments and refunds.
                </p>
                <p className="md:text-lg text-sm font-medium text-gray-600 leading-relaxed">
                  Please note that the Payment Processors may collect some Personal
                  Information from you, which allows them to process your payments
                  (e.g., your email address, address, credit card details, and bank
                  account number) and handle all the steps in the payment process
                  through their systems, including data collection and data
                  processing. The Payment Processors' use of your Personal Information
                  is governed by their respective privacy policies which may or may
                  not contain privacy protections as protective as this Policy. We
                  suggest that you review their respective privacy policies.
                </p>
              </div>
            </div>

            {/* Data Retention */}
            <div className="mb-8">
              <h3 className="md:text-2xl text-xl font-semibold text-[#3E5EC0] mb-2">
                Data Retention
              </h3>
              <div className="space-y-6">
                <p className="md:text-lg text-sm font-medium text-gray-600 leading-relaxed">
                  We will retain and use your Personal Information for the period
                  necessary to comply with our legal obligations, resolve disputes,
                  and enforce our agreements unless a longer retention period is
                  required or permitted by law. We may use any aggregated data derived
                  from or incorporating your Personal Information after you update or
                  delete it, but not in a manner that would identify you personally.
                  Once the retention period expires, Personal Information shall be
                  deleted. Therefore, the right to access, the right to erasure, the
                  right to rectification, and the right to data portability cannot be
                  enforced after the expiration of the retention period.
                </p>
              </div>
            </div>

            {/* Your Rights */}
            <div className="mb-8">
              <h3 className="md:text-2xl text-xl font-semibold text-[#3E5EC0] mb-2">
                Your Rights
              </h3>
              <div className="space-y-6">
                <p className="md:text-lg text-sm font-medium text-gray-600 leading-relaxed">
                  You have the following rights in relation to your Personal
                  Information: the right to be informed about our collection and use
                  of Personal Information; the right of access to the Personal
                  Information we hold about you; the right to rectification if any
                  Personal Information we hold about you is inaccurate or incomplete;
                  the right to erasure – you can ask us to delete or remove Personal
                  Information if there is no compelling reason for us to continue
                  processing it; the right to restrict processing of your Personal
                  Information; the right to object to processing; the right to data
                  portability; and rights in relation to automated decision making
                  and profiling.
                </p>
              </div>
            </div>

            {/* Security */}
            <div className="mb-8">
              <h3 className="md:text-2xl text-xl font-semibold text-[#3E5EC0] mb-2">
                Security of Information
              </h3>
              <div className="space-y-6">
                <p className="md:text-lg text-sm font-medium text-gray-600 leading-relaxed">
                  We secure information you provide on computer servers in a
                  controlled, secure environment, protected from unauthorized access,
                  use, or disclosure. We maintain reasonable administrative,
                  technical, and physical safeguards in an effort to protect against
                  unauthorized access, use, modification, and disclosure of Personal
                  Information in our control and custody. However, no data
                  transmission over the Internet or wireless network can be
                  guaranteed.
                </p>
              </div>
            </div>

            {/* Changes to Policy */}
            <div className="mb-8">
              <h3 className="md:text-2xl text-xl font-semibold text-[#3E5EC0] mb-2">
                Changes to This Policy
              </h3>
              <div className="space-y-6">
                <p className="md:text-lg text-sm font-medium text-gray-600 leading-relaxed">
                  We reserve the right to modify this Policy at any time. Changes and
                  clarifications will take effect immediately upon their posting on
                  the Website. If we make material changes to this Policy, we will
                  notify you that it has been updated, so that you are aware of what
                  information we collect, how we use it, and under what circumstances,
                  if any, we use and/or disclose it.
                </p>
              </div>
            </div>

            {/* Contact Information */}
            <div className="mb-8">
              <h3 className="md:text-2xl text-xl font-semibold text-[#3E5EC0] mb-2">
                Customer Service
              </h3>
              <div className="space-y-6">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <span className="md:text-lg text-sm font-medium font-bold text-gray-600 block mb-4">
                    info@euroqst.com
                  </span>
                  <p className="md:text-lg text-sm font-medium text-gray-600 leading-relaxed">
                    We will attempt to resolve complaints and disputes and make every
                    reasonable effort to honor your wish to exercise your rights as
                    quickly as possible and in any event, within the timescales provided
                    by applicable data protection laws.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
