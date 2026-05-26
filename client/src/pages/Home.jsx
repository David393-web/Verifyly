import { useNavigate } from "react-router-dom";

import { motion } from "framer-motion";

import {
  ShieldCheck,
  ArrowRight,
  PlayCircle,
  Globe,
  Bell,
  Radar,
  Building2,
} from "lucide-react";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="overflow-hidden text-white bg-[#050816]">
      {/* NAVBAR */}
      <header className="sticky top-0 z-50 border-b border-white/10 backdrop-blur-xl bg-black/30">
        <div className="flex items-center justify-between px-6 py-5 mx-auto max-w-7xl">
          
          {/* LOGO */}
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center bg-indigo-500 w-11 h-11 rounded-2xl">
              <ShieldCheck className="w-6 h-6 text-white" />
            </div>

            <div>
              <h1 className="text-2xl font-black">
                Verilyfy
              </h1>

              <p className="text-xs text-gray-400">
                Scam Protection
              </p>
            </div>
          </div>

          {/* BUTTONS */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/login")}
              className="hidden font-semibold text-gray-300 transition-all sm:block hover:text-white"
            >
              Login
            </button>

            <button
              onClick={() => navigate("/register")}
              className="px-6 py-3 font-semibold text-white transition-all bg-indigo-600 hover:bg-indigo-700 rounded-2xl"
            >
              Get Started
            </button>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="relative px-6 py-28">
        {/* GLOW */}
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-indigo-600 opacity-20 blur-[180px] rounded-full"></div>

        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-600 opacity-20 blur-[180px] rounded-full"></div>

        <div className="relative z-10 grid items-center gap-20 mx-auto max-w-7xl lg:grid-cols-2">

          {/* LEFT */}
          <motion.div
            initial={{
              opacity: 0,
              y: 40,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.8,
            }}
          >
            {/* BADGE */}
            <div className="inline-flex items-center gap-3 px-5 py-3 mb-8 border rounded-full bg-white/10 border-white/10 backdrop-blur-lg">
              
              <Radar className="w-5 h-5 text-indigo-400" />

              <span className="font-semibold text-indigo-200">
                AI Powered Scam Monitoring
              </span>
            </div>

            {/* TITLE */}
            <h1 className="text-6xl font-black leading-[1.1] md:text-7xl">
              Advanced Digital Fraud Protection For Modern Users.
            </h1>

            {/* TEXT */}
            <p className="max-w-2xl mt-8 text-xl leading-relaxed text-gray-400">
              Verilyfy helps individuals and organizations detect, report, and monitor scam activities with intelligent cybercrime protection systems.
            </p>

            {/* BUTTONS */}
            <div className="flex flex-wrap gap-5 mt-12">

              <button
                onClick={() => navigate("/register")}
                className="flex items-center gap-3 px-8 py-4 font-bold transition-all bg-indigo-600 rounded-2xl hover:bg-indigo-700"
              >
                Start Protection

                <ArrowRight className="w-5 h-5" />
              </button>

              <button className="flex items-center gap-3 px-8 py-4 font-semibold transition-all border rounded-2xl border-white/10 bg-white/5 hover:bg-white/10">
                
                <PlayCircle className="w-5 h-5 text-indigo-400" />

                Watch Demo
              </button>
            </div>

            {/* STATS */}
            <div className="grid grid-cols-3 gap-6 mt-16">

              <div>
                <h2 className="text-4xl font-black text-indigo-400">
                  10K+
                </h2>

                <p className="mt-2 text-gray-400">
                  Scam Reports
                </p>
              </div>

              <div>
                <h2 className="text-4xl font-black text-blue-400">
                  98%
                </h2>

                <p className="mt-2 text-gray-400">
                  Detection Accuracy
                </p>
              </div>

              <div>
                <h2 className="text-4xl font-black text-green-400">
                  24/7
                </h2>

                <p className="mt-2 text-gray-400">
                  Threat Monitoring
                </p>
              </div>

            </div>
          </motion.div>

          {/* VIDEO */}
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.9,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            transition={{
              duration: 1,
            }}
            className="relative"
          >
            <div className="absolute inset-0 bg-indigo-500 opacity-20 blur-[120px] rounded-full"></div>

            <div className="relative overflow-hidden border bg-white/10 border-white/10 rounded-[40px] backdrop-blur-2xl shadow-2xl">

              <video
                autoPlay
                muted
                loop
                playsInline
                className="object-cover w-full h-full"
              >
                <source
                  src="https://videos.pexels.com/video-files/6963744/6963744-hd_1920_1080_25fps.mp4"
                  type="video/mp4"
                />
              </video>

            </div>
          </motion.div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-7xl">

          <div className="mb-20 text-center">
            <h2 className="text-5xl font-black">
              Powerful Scam Protection Features
            </h2>

            <p className="max-w-3xl mx-auto mt-6 text-xl text-gray-400">
              Everything you need to stay protected against modern scam threats and cyber fraud.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">

            {/* CARD */}
            <div className="p-10 transition-all border bg-white/5 border-white/10 rounded-[35px] hover:bg-white/10">
              
              <div className="flex items-center justify-center w-16 h-16 mb-8 bg-indigo-500 rounded-3xl">
                <ShieldCheck className="w-8 h-8 text-white" />
              </div>

              <h3 className="text-3xl font-black">
                Scam Reporting
              </h3>

              <p className="mt-5 leading-relaxed text-gray-400">
                Submit detailed scam evidence and reports for fast investigation and monitoring.
              </p>
            </div>

            {/* CARD */}
            <div className="p-10 transition-all border bg-white/5 border-white/10 rounded-[35px] hover:bg-white/10">
              
              <div className="flex items-center justify-center w-16 h-16 mb-8 bg-blue-500 rounded-3xl">
                <Bell className="w-8 h-8 text-white" />
              </div>

              <h3 className="text-3xl font-black">
                Smart Alerts
              </h3>

              <p className="mt-5 leading-relaxed text-gray-400">
                Get instant notifications about suspicious activities and report status updates.
              </p>
            </div>

            {/* CARD */}
            <div className="p-10 transition-all border bg-white/5 border-white/10 rounded-[35px] hover:bg-white/10">
              
              <div className="flex items-center justify-center w-16 h-16 mb-8 bg-green-500 rounded-3xl">
                <Globe className="w-8 h-8 text-white" />
              </div>

              <h3 className="text-3xl font-black">
                Global Protection
              </h3>

              <p className="mt-5 leading-relaxed text-gray-400">
                Track scam patterns and stay informed about global cybercrime threats.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* WHY CHOOSE */}
      <section className="px-6 py-24">
        <div className="grid items-center gap-20 mx-auto max-w-7xl lg:grid-cols-2">

          <div>
            <h2 className="text-5xl font-black leading-tight">
              Why Thousands Trust Verilyfy
            </h2>

            <p className="mt-8 text-xl leading-relaxed text-gray-400">
              Our intelligent scam protection platform combines real-time monitoring, secure reporting systems, and advanced fraud detection technologies.
            </p>

            <div className="mt-12 space-y-6">

              <div className="flex gap-4">
                <div className="w-3 h-3 mt-3 bg-indigo-500 rounded-full"></div>

                <p className="text-lg text-gray-300">
                  Real-time scam intelligence system
                </p>
              </div>

              <div className="flex gap-4">
                <div className="w-3 h-3 mt-3 bg-blue-500 rounded-full"></div>

                <p className="text-lg text-gray-300">
                  Fast evidence collection and tracking
                </p>
              </div>

              <div className="flex gap-4">
                <div className="w-3 h-3 mt-3 bg-green-500 rounded-full"></div>

                <p className="text-lg text-gray-300">
                  Secure and encrypted data protection
                </p>
              </div>

            </div>
          </div>

          <div className="p-10 border bg-white/5 border-white/10 rounded-[40px]">
            <img
              src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1200&auto=format&fit=crop"
              alt="Cyber Security"
              className="object-cover w-full rounded-3xl"
            />
          </div>

        </div>
      </section>

      {/* FBI */}
      <section className="px-6 py-24">
        <div className="max-w-7xl mx-auto rounded-[40px] border border-white/10 bg-white/5 backdrop-blur-2xl p-16 text-center">

          <div className="inline-flex items-center gap-3 px-5 py-3 mb-8 border rounded-full bg-indigo-500/10 border-indigo-500/20">

            <Building2 className="w-5 h-5 text-indigo-400" />

            <span className="font-semibold text-indigo-300">
              Strategic Cybersecurity Partnership
            </span>
          </div>

          <h2 className="text-5xl font-black leading-tight">
            In Partnership With
            <br />
            Federal Bureau of Investigation
          </h2>

          <p className="max-w-3xl mx-auto mt-8 text-xl leading-relaxed text-gray-400">
            Verilyfy collaborates with cybersecurity agencies and investigative organizations to combat digital fraud and cybercrime.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-24">
        <div className="max-w-6xl mx-auto bg-indigo-600 rounded-[40px] p-16 text-center relative overflow-hidden">

          <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-white opacity-10 rounded-full blur-[120px]"></div>

          <div className="relative z-10">

            <h2 className="text-5xl font-black text-white">
              Stay Protected Today
            </h2>

            <p className="max-w-3xl mx-auto mt-6 text-xl text-indigo-100">
              Join thousands of users using Verilyfy to report scams and stay secure online.
            </p>

            <button
              onClick={() => navigate("/register")}
              className="px-8 py-4 mt-10 font-bold text-indigo-600 transition-all bg-white hover:bg-gray-100 rounded-2xl"
            >
              Create Free Account
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="px-6 py-10 border-t border-white/10">
        <div className="flex flex-col items-center justify-between gap-5 mx-auto max-w-7xl md:flex-row">

          <div>
            <h1 className="text-2xl font-black text-indigo-400">
              Verilyfy
            </h1>

            <p className="mt-2 text-gray-500">
              Advanced Scam Protection System
            </p>
          </div>

          <p className="text-sm text-gray-500">
            © 2026 Verilyfy. All rights reserved.
          </p>

        </div>
      </footer>
    </div>
  );
}