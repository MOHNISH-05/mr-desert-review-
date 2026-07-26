"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ScrollReveal } from "@/components/effects/scroll-reveal";
import { Phone, Mail, MapPin, MessageCircle, Send } from "lucide-react";

const contactMethods = [
  { icon: Phone, title: "Phone", value: "+91-8854808196", href: "tel:+918854808196", color: "text-desert-500" },
  { icon: Mail, title: "Email", value: "mrdesertjaisalmer@gmail.com", href: "mailto:mrdesertjaisalmer@gmail.com", color: "text-desert-500" },
  { icon: MessageCircle, title: "WhatsApp", value: "Chat with us instantly", href: "https://wa.me/918854808196", color: "text-emerald-500" },
];

export default function ContactPage() {
  return (
    <div className="pt-28 pb-24 min-h-screen bg-background">
      {/* Header */}
      <div className="relative mb-16 overflow-hidden bg-[#1A1A1A]">
        <div className="absolute inset-0 z-0">
          <Image
            src="/businesses/elite-castle/WhatsApp Image 2026-07-26 at 18.50.40.jpeg"
            alt="Elite Castle Jaisalmer Contact Background"
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-25"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/85 to-background z-[1]" aria-hidden="true" />
        <div className="container relative max-w-5xl py-12 text-center z-10">
          <ScrollReveal>
            <p className="eyebrow justify-center flex">We&apos;d love to hear from you</p>
            <h1 className="section-heading mb-5">
              Get In <span className="text-gradient-gold italic">Touch</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
              Have questions about your Jaisalmer journey? Our team is here to help.
            </p>
          </ScrollReveal>
        </div>
      </div>

      <div className="container max-w-5xl">
        <div className="grid lg:grid-cols-12 gap-12">
          {/* Contact form */}
          <div className="lg:col-span-7">
            <ScrollReveal>
              <div className="glass-card p-8 md:p-10">
                <h2 className="font-serif text-2xl font-semibold mb-6">Send us a message</h2>
                <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-medium uppercase tracking-wider text-muted-foreground mb-2">
                        Your Name
                      </label>
                      <Input placeholder="John Doe" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium uppercase tracking-wider text-muted-foreground mb-2">
                        Email Address
                      </label>
                      <Input type="email" placeholder="john@example.com" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium uppercase tracking-wider text-muted-foreground mb-2">
                      Subject
                    </label>
                    <Input placeholder="Inquiry about desert camping or hotel stays" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium uppercase tracking-wider text-muted-foreground mb-2">
                      Message
                    </label>
                    <Textarea placeholder="Tell us about your upcoming travel plans or questions..." rows={5} />
                  </div>
                  <Button variant="gold" size="lg" className="w-full">
                    <Send className="h-4 w-4 mr-2" />
                    Send Message
                  </Button>
                </form>
              </div>
            </ScrollReveal>
          </div>

          {/* Contact info side */}
          <div className="lg:col-span-5 space-y-6">
            <ScrollReveal delay={0.1}>
              <div className="glass-card p-8 space-y-6">
                <h3 className="font-serif text-xl font-semibold border-b border-desert-100 pb-4">Direct Contact</h3>
                {contactMethods.map((method) => (
                  <a
                    key={method.title}
                    href={method.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-3 rounded-xl hover:bg-desert-50 transition-colors group"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-desert-50 group-hover:bg-desert-100 transition-colors">
                      <method.icon className={`h-5 w-5 ${method.color}`} />
                    </div>
                    <div>
                      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{method.title}</p>
                      <p className="text-sm font-semibold text-foreground group-hover:text-desert-700 transition-colors">{method.value}</p>
                    </div>
                  </a>
                ))}
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div className="glass-card p-8">
                <h3 className="font-serif text-xl font-semibold mb-4">Location & Hours</h3>
                <div className="flex items-start gap-3 text-sm text-muted-foreground mb-4">
                  <MapPin className="h-5 w-5 text-desert-500 shrink-0 mt-0.5" />
                  <p>Sam Sand Dunes & Near Jaisalmer Fort, Jaisalmer, Rajasthan 345001</p>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Support hours: 24/7 for booking inquiries and ongoing guest assistance.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </div>
  );
}
