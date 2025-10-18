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
    const seoData = await getSeoData('terms');
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
    console.error('Error generating metadata for terms page:', error);
    
    // Fallback metadata
    return {
      title: "Terms & Conditions | EuroQuest International Legal Terms & Service Agreement",
      description: "EuroQuest International Terms & Conditions outline the rules, obligations, and legal agreements governing the use of our website and training services.",
      keywords: "terms and conditions, legal terms, service agreement, EuroQuest International, user agreement, website terms, training terms",
    };
  }
}

export default function TermsPage() {
  const breadcrumbs: BreadcrumbItem[] = [
    {
      href: "/",
      label: "",
      icon: <Home width={16} height={16}/>
    },
    {
      href: "/terms",
      label: "terms and conditions"
    }
  ];

  return (
    <>     
      <Schema 
        pageType="terms"
        pageTitle="Terms & Conditions | EuroQuest International Legal Terms & Service Agreement"
        pageDescription="EuroQuest International Terms & Conditions outline the rules, obligations, and legal agreements governing the use of our website and training services."
        pageUrl="https://euroqst.com/terms"
      />
      {/* Hero Banner */}
      <HeroBanner
        backgroundImage="/assets/images/hero-terms.png"
        title="General Terms & Conditions"
        description="These General Terms & Conditions outline the rules, obligations, and legal agreements governing the use of EuroQuest International's website and services."
        breadcrumbs={breadcrumbs}
        enableTypewriter={true}
        typewriterSpeed={100}
        typewriterDelay={500}
      />

      {/* Terms Content */}
      <section className="md:py-12 py-10 bg-white">
        <Container>
          {/* Introduction */}
          <div>
            <p className="md:text-lg text-sm font-medium text-gray-600 leading-relaxed mb-6">
              These terms and conditions ("Agreement") set forth the general terms
              and conditions of your use of the Euroquest International website
              ("Website" or "Service") and any of its related products and services
              (collectively, "Services"). This Agreement is legally binding between
              you ("User", "you" or "your") and EUROQUEST INTERNATIONAL s.r.o.
              ("EUROQUEST INTERNATIONAL s.r.o.", "we", "us" or "our"). If you are
              entering into this agreement on behalf of a business or other legal
              entity, you represent that you have the authority to bind such entity
              to this agreement, in which case the terms "User", "you" or "your"
              shall refer to such entity. If you do not have such authority, or if
              you do not agree with the terms of this agreement, you must not accept
              this agreement and may not access and use the Website and Services. By
              accessing and using the Website and Services, you acknowledge that you
              have read,understood, and agree to be bound by the terms of this
              Agreement. You acknowledge that this Agreement is a contract between
              you and EUROQUEST INTERNATIONAL s.r.o., even though it is electronic
              and is not physically signed by you, and it governs your use of the
              Website and Services.
            </p>

            {/* Billing and Payments */}
            <div className="mb-8">
              <h3 className="md:text-2xl text-xl font-semibold text-[#3E5EC0] mb-2">
                Billing and Payments
              </h3>
              <div className="space-y-6">
                <p className="md:text-lg text-sm font-medium text-gray-600 leading-relaxed">
                  You shall pay all fees or charges to your account in accordance with
                  the fees, charges, and billing terms in effect at the time a fee or
                  charge is due and payable. Sensitive and private data exchange
                  happens over a SSL secured communication channel and is encrypted
                  and protected with digital signatures, and the Website and Services
                  are also in compliance with PCI vulnerability standards in order to
                  create as secure of an environment as possible for Users. Scans for
                  malware are performed on a regular basis for additional security and
                  protection. If, in our judgment, your purchase constitutes a
                  high-risk transaction, we will require you to provide us with a copy
                  of your valid government-issued photo identification, and possibly a
                  copy of a recent bank statement for the credit or debit card used
                  for the purchase. We reserve the right to change products and
                  product pricing at any time.
                </p>
              </div>
            </div>

            {/* Accuracy of Information */}
            <div className="mb-8">
              <h3 className="md:text-2xl text-xl font-semibold text-[#3E5EC0] mb-2">
                Accuracy of Information
              </h3>
              <div className="space-y-6">
                <p className="md:text-lg text-sm font-medium text-gray-600 leading-relaxed">
                  Occasionally there may be information on the Website that contains
                  typographical errors, inaccuracies or omissions that may relate to
                  product descriptions, availability, promotions and offers. We
                  reserve the right to correct any errors, inaccuracies or omissions,
                  and to change or update information or cancel orders if any
                  information on the Website or Services is inaccurate at any time
                  without prior notice (including after you have submitted your
                  order). We undertake no obligation to update, amend or clarify
                  information on the Website including, without limitation, pricing
                  information, except as required by law. No specified update or
                  refresh date applied on the Website should be taken to indicate that
                  all information on the Website or Services has been modified or
                  updated.
                </p>
              </div>
            </div>

            {/* Links to Other Resources */}
            <div className="mb-8">
              <h3 className="md:text-2xl text-xl font-semibold text-[#3E5EC0] mb-2">
                Links to Other Resources
              </h3>
              <div className="space-y-6">
                <p className="md:text-lg text-sm font-medium text-gray-600 leading-relaxed">
                  Although the Website and Services may link to other resources (such
                  as websites, mobile applications, etc.), we are not, directly or
                  indirectly, implying any approval, association, sponsorship,
                  endorsement, or affiliation with any linked resource, unless
                  specifically stated herein. We are not responsible for examining or
                  evaluating, and we do not warrant the offerings of, any businesses
                  or individuals or the content of their resources. We do not assume
                  any responsibility or liability for the actions, products, services,
                  and content of any other third parties. You should carefully review
                  the legal statements and other conditions of use of any resource
                  which you access through a link on the Website. Your linking to any
                  other off-site resources is at your own risk.
                </p>
              </div>
            </div>

            {/* Prohibited Uses */}
            <div className="mb-8">
              <h3 className="md:text-2xl text-xl font-semibold text-[#3E5EC0] mb-2">
                Prohibited Uses
              </h3>
              <div className="space-y-6">
                <p className="md:text-lg text-sm font-medium text-gray-600 leading-relaxed">
                  In addition to other terms as set forth in the Agreement, you are
                  prohibited from using the Website and Services or Content: (a) for
                  any unlawful purpose; (b) to solicit others to perform or
                  participate in any unlawful acts; (c) to violate any international,
                  federal, provincial or state regulations, rules, laws, or local
                  ordinances; (d) to infringe upon or violate our intellectual
                  property rights or the intellectual property rights of others; (e)
                  to harass, abuse, insult, harm, defame, slander, disparage,
                  intimidate, or discriminate based on gender, sexual orientation,
                  religion, ethnicity, race, age, national origin, or disability; (f)
                  to submit false or misleading information; (g) to upload or transmit
                  viruses or any other type of malicious code that will or may be used
                  in any way that will affect the functionality or operation of the
                  Website and Services, third party products and services, or the
                  Internet; (h) to spam, phish, pharm, pretext, spider, crawl, or
                  scrape; (i) for any obscene or immoral purpose; or (j) to interfere
                  with or circumvent the security features of the Website and
                  Services, third party products and services, or the Internet. We
                  reserve the right to terminate your use of the Website and Services
                  for violating any of the prohibited uses.
                </p>
              </div>
            </div>

            {/* Intellectual Property Rights */}
            <div className="mb-8">
              <h3 className="md:text-2xl text-xl font-semibold text-[#3E5EC0] mb-2">
                Intellectual Property Rights
              </h3>
              <div className="space-y-6">
                <p className="md:text-lg text-sm font-medium text-gray-600 leading-relaxed">
                  "Intellectual Property Rights" means all present and future rights
                  conferred by statute, common law or equity in or in relation to any
                  copyright and related rights, trademarks, designs, patents,
                  inventions, goodwill and the right to sue for passing off, rights to
                  inventions, rights to use, and all other intellectual property
                  rights, in each case whether registered or unregistered and
                  including all applications and rights to apply for and be granted,
                  rights to claim priority from, such rights and all similar or
                  equivalent rights or forms of protection and any other results of
                  intellectual activity which subsist or will subsist now or in the
                  future in any part of the world. This Agreement does not transfer to
                  you any intellectual property owned by EUROQUEST INTERNATIONAL
                  s.r.o. or third parties, and all rights, titles, and interests in
                  and to such property will remain (as between the parties) solely
                  with EUROQUEST INTERNATIONAL s.r.o. All trademarks, service marks,
                  graphics and logos used in connection with the Website and Services,
                  are trademarks or registered trademarks of EUROQUEST INTERNATIONAL
                  s.r.o. or its licensors. Other trademarks, service marks, graphics
                  and logos used in connection with the Website and Services may be
                  the trademarks of other third parties. Your use of the Website and
                  Services grants you no right or license to reproduce or otherwise
                  use any of EUROQUEST INTERNATIONAL s.r.o. or third party trademarks.
                </p>
              </div>
            </div>

            {/* Disclaimer of Warranty */}
            <div className="mb-8">
              <h3 className="md:text-2xl text-xl font-semibold text-[#3E5EC0] mb-2">
                Disclaimer of Warranty
              </h3>
              <div className="space-y-6">
                <p className="md:text-lg text-sm font-medium text-gray-600 leading-relaxed">
                  You agree that such Service is provided on an "as is" and "as
                  available" basis and that your use of the Website and Services is
                  solely at your own risk. We expressly disclaim all warranties of any
                  kind, whether express or implied, including but not limited to the
                  implied warranties of merchantability, fitness for a particular
                  purpose and non-infringement. We make no warranty that the Services
                  will meet your requirements, or that the Service will be
                  uninterrupted, timely, secure, or error-free; nor do we make any
                  warranty as to the results that may be obtained from the use of the
                  Service or as to the accuracy or reliability of any information
                  obtained through the Service or that defects in the Service will be
                  corrected. You understand and agree that any material and/or data
                  downloaded or otherwise obtained through the use of Service is done
                  at your own discretion and risk and that you will be solely
                  responsible for any damage or loss of data that results from the
                  download of such material and/or data. We make no warranty regarding
                  any goods or services purchased or obtained through the Service or
                  any transactions entered into through the Service unless stated
                  otherwise. No advice or information, whether oral or written,
                  obtained by you from us or through the Service shall create any
                  warranty not expressly made herein.
                </p>
              </div>
            </div>

            {/* Limitation of Liability */}
            <div className="mb-8">
              <h3 className="md:text-2xl text-xl font-semibold text-[#3E5EC0] mb-2">
                Limitation of Liability
              </h3>
              <div className="space-y-6">
                <p className="md:text-lg text-sm font-medium text-gray-600 leading-relaxed">
                  To the fullest extent permitted by applicable law, in no event will
                  EUROQUEST INTERNATIONAL s.r.o., its affiliates, directors, officers,
                  employees, agents, suppliers or licensors be liable to any person
                  for any indirect, incidental, special, punitive, cover or
                  consequential damages (including, without limitation, damages for
                  lost profits, revenue, sales, goodwill, use of content, impact on
                  business, business interruption, loss of anticipated savings, loss
                  of business opportunity) however caused, under any theory of
                  liability, including, without limitation, contract, tort, warranty,
                  breach of statutory duty, negligence or otherwise, even if the
                  liable party has been advised as to the possibility of such damages
                  or could have foreseen such damages. To the maximum extent permitted
                  by applicable law, the aggregate liability of EUROQUEST
                  INTERNATIONAL s.r.o. and its affiliates, officers, employees,
                  agents, suppliers and licensors relating to the services will be
                  limited to an amount no greater than one dollar or any amounts
                  actually paid in cash by you to EUROQUEST INTERNATIONAL s.r.o. for
                  the prior one month period prior to the first event or occurrence
                  giving rise to such liability. The limitations and exclusions also
                  apply if this remedy does not fully compensate you for any losses or
                  fails of its essential purpose.
                </p>
              </div>
            </div>

            {/* Indemnification */}
            <div className="mb-8">
              <h3 className="md:text-2xl text-xl font-semibold text-[#3E5EC0] mb-2">
                Indemnification
              </h3>
              <div className="space-y-6">
                <p className="md:text-lg text-sm font-medium text-gray-600 leading-relaxed">
                  You agree to indemnify and hold EUROQUEST INTERNATIONAL s.r.o. and
                  its affiliates, directors, officers, employees, agents, suppliers
                  and licensors harmless from and against any liabilities, losses,
                  damages or costs, including reasonable attorneys' fees, incurred in
                  connection with or arising from any third party allegations, claims,
                  actions, disputes, or demands asserted against any of them as a
                  result of or relating to your Content, your use of the Website and
                  Services or any willful misconduct on your part.
                </p>
              </div>
            </div>

            {/* Customer Service */}
            <div className="mb-8">
              <h3 className="md:text-2xl text-xl font-semibold text-[#3E5EC0] mb-2">
                Customer Service
              </h3>
              <div className="space-y-6">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <span className="text-xl font-bold text-gray-600 block mb-4">
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
