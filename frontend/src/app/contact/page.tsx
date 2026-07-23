"use client";

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
      <div className="relative mb-16 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: "url('/images/official/elite-castle-story.webp')" }}
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/85 to-background" aria-hidden="true" />
        <div className="container relative max-w-5xl py-12 text-center">
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
        {/* Contact cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-14">
          {contactMethods.map((item, i) => (
            <motion.a
              key={item.title}
              href={item.href}
              target={item.title === "WhatsApp" ? "_blank" : undefined}
              rel={item.title === "WhatsApp" ? "noopener noreferrer" : undefined}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card p-7 text-center hover:shadow-luxury-lg transition-all duration-500 group"
            >
              <div className={`inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-desert-50 mb-4 group-hover:scale-110 transition-transform ${item.color}`}>
                <item.icon className="h-6 w-6" />
              </div>
              <h3 className="font-serif text-lg font-semibold mb-1">{item.title}</h3>
              <p className="text-desert-600 text-sm group-hover:underline">{item.value}</p>
            </motion.a>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Form */}
          <ScrollReveal>
            <div className="glass-card p-7 md:p-9">
              <h2 className="font-serif text-2xl font-semibold mb-2">Send us a Message</h2>
              <p className="text-sm text-muted-foreground mb-7">We typically respond within 24 hours</p>
              <form className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">Name *</label>
                    <Input placeholder="Your name" required className="rounded-xl border-desert-100 focus:border-desert-400" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">Email *</label>
                    <Input type="email" placeholder="your@email.com" required className="rounded-xl border-desert-100 focus:border-desert-400" />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Subject</label>
                  <Input placeholder="How can we help?" className="rounded-xl border-desert-100 focus:border-desert-400" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Message *</label>
                  <Textarea rows={5} placeholder="Tell us about your travel plans..." required className="rounded-xl border-desert-100 focus:border-desert-400 resize-none" />
                </div>
                <Button type="submit" variant="gold" size="lg" className="w-full group">
                  Send Message
                  <Send className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
                </Button>
              </form>
            </div>
          </ScrollReveal>

          {/* Map & location */}
          <ScrollReveal delay={0.15}>
            <div className="space-y-5">
              <div className="glass-card p-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-desert-50">
                    <MapPin className="h-5 w-5 text-desert-600" />
                  </div>
                  <div>
                    <h3 className="font-serif text-lg font-semibold mb-1">Visit Us</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Near Sam Sand Dunes, Jaisalmer,<br />
                      Rajasthan 345001, India
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl overflow-hidden h-72 md:h-80 shadow-luxury border border-desert-100">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3594.123!2d70.9123!3d26.9123!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjbCsDU0JzQ0LjMiTiA3MMKwNTQnNDQuMyJF!5e0!3m2!1sen!2sin!4v1"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Mr. Desert Jaisalmer location"
                />
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </div>
  );
}
