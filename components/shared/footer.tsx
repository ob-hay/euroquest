import Link from "next/link";
import Image from "next/image";
import { popularCategories, quickAccessLinks, socialLinks } from "@/constants";
import { Mail, MapPin, Phone } from "lucide-react";

export default function Footer() {
  return (
    <>
      <footer className="bg-[#2A3453] text-white/50 py-10">
        <div className="container flex flex-col gap-8">
          <div className="flex justify-between flex-wrap gap-4 md:gap-8">
            {/* Logo and Contact Info */}
            <div className="max-w-[300px] w-full md:w-auto">
              <Link href="/" className="text-white/50">
                <Image
                  src="/assets/images/logo.svg"
                  alt="EuroQuest"
                  width={150}
                  height={50}
                  className="w-[200px] h-auto mb-8 mt-2"
                />
              </Link>
              <ul className="flex flex-col gap-4">
                <li className="list-none flex items-start gap-2">
                  <MapPin className="w-5 h-5"/>
                  <span className="text-base">
                    Šancová 3568/61 <br />
                    Mestská časť Nové Mesto
                    <br />
                    Bratislava 831 04
                    <br />
                    Slovakia
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Mail className="w-5 h-5"/>
                  <span className="text-base">info@euroqst.com</span>
                </li>
                <li className="flex items-start gap-2">
                  <Phone className="w-5 h-5" />
                  <span className="text-base">+421 911 803 183</span>
                </li>
              </ul>
            </div>

            {/* Popular Categories */}
            <div className="max-w-[300px] w-full md:w-auto">
              <p className="text-white text-lg font-bold mb-4">
                Popular Categories
              </p>
              <ul className="flex flex-col gap-1.5">
                {popularCategories.map((category) => (
                  <li key={category.slug}>
                    <Link
                      className="text-white/50 hover:text-white transition-colors duration-300"
                      href={`/training-courses/${category.slug}`}
                    >
                      {category.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick Access */}
            <div className="w-full md:w-auto">
              <p className="text-white text-lg font-bold mb-4">Quick Access</p>
              <ul className="flex flex-col gap-1.5">
                {quickAccessLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      className="text-white/50 hover:text-white transition-colors duration-300"
                      href={link.href}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Language and Social */}
            <div className="max-w-[200px] w-full md:w-auto">
              <p className="text-white text-lg font-bold mb-4">
                About EuroQuest
              </p>
              <div className="flex flex-col gap-1.5 mb-4">
                <p className="text-base mb-3 justify-center">
                  EuroQuest International is a leading training partner,
                  empowering organizations and professionals to build skills,
                  drive innovation, and achieve sustainable success.
                </p>
              </div>

              <div className="mb-4">
                <div className="flex gap-2">
                  {socialLinks.map((social, index) => (
                    <Link
                      key={index}
                      href={social.href}
                      className="w-10 h-10 bg-white rounded-lg flex items-center justify-center transition-transform duration-300 hover:-translate-y-0.5"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <social.Icon className="text-[#2A3453] text-xl" />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <p className="text-center text-sm">
            All rights reserved. EUROQUEST INTERNATIONAL © 2026
          </p>
        </div>
      </footer>
    </>
  );
}
