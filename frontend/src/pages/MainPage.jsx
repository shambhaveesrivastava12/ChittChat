import {
  MessageCircle,
  Users,
  Zap,
  Shield,
  CheckCircle,
  Github,
  Mail,
  Twitter,
  Moon,
  Sun,
} from "lucide-react";
import { useState, useEffect } from "react";
import AuthModal from "./AuthModal";

function Mainpage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  // Apply theme on load
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);
  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  return (
    <div className="min-h-screen transition-colors duration-500 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 text-slate-900 dark:text-slate-100">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md z-50 border-b border-slate-200 dark:border-slate-700 transition-colors duration-500">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MessageCircle className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            <span className="text-2xl font-bold text-slate-900 dark:text-white">
              ChittChat
            </span>
          </div>

          <div className="flex items-center gap-4">
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full bg-slate-200 dark:bg-slate-700 hover:scale-110 transition-transform duration-300"
              aria-label="Toggle Dark Mode"
            >
              {isDarkMode ? (
                <Sun className="w-5 h-5 text-yellow-400" />
              ) : (
                <Moon className="w-5 h-5 text-slate-800" />
              )}
            </button>

            {/* Get Started Button */}
            <button
              onClick={handleOpenModal}
              className="px-6 py-2 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition-all duration-300 hover:scale-105 shadow-lg shadow-blue-600/30"
            >
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 transition-colors duration-500">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-block mb-4 px-4 py-2 bg-blue-50 dark:bg-blue-900/30 rounded-full border border-blue-200 dark:border-blue-700">
            <span className="text-blue-700 dark:text-blue-300 font-medium text-sm">
              Real-time Communication Made Simple
            </span>
          </div>
          <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight text-slate-900 dark:text-white">
            Connect Instantly,
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              Chat Effortlessly
            </span>
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed">
            Experience seamless real-time messaging with instant delivery,
            typing indicators, and group conversations. Built for modern
            communication.
          </p>
          <button
            onClick={handleOpenModal}
            className="group relative px-8 py-4 bg-blue-600 text-white rounded-full font-semibold text-lg hover:bg-blue-700 transition-all duration-300 hover:scale-105 shadow-2xl shadow-blue-600/40"
          >
            <span className="relative z-10">Start Chatting Now</span>
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>

          {/* Hero Visual */}
          <div className="mt-16 relative">
            <div className="absolute inset-0 bg-gradient-to-t from-slate-50 dark:from-slate-900 to-transparent z-10"></div>
            <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-2xl p-8 max-w-4xl mx-auto border border-slate-200 dark:border-slate-700 transition-colors duration-500">
              <div className="flex gap-4 mb-6">
                <div className="w-3 h-3 rounded-full bg-red-400"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                <div className="w-3 h-3 rounded-full bg-green-400"></div>
              </div>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600"></div>
                  <div className="flex-1">
                    <div className="bg-slate-100 dark:bg-slate-700 rounded-2xl rounded-tl-sm p-4 inline-block">
                      <p className="text-slate-700 dark:text-slate-200">
                        Hey! How's the project going? 👋
                      </p>
                    </div>
                    <p className="text-xs text-slate-400 mt-1">2:30 PM</p>
                  </div>
                </div>
                <div className="flex gap-3 justify-end">
                  <div className="flex-1 text-right">
                    <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl rounded-tr-sm p-4 inline-block">
                      <p className="text-white">
                        Great! Just finished the new feature ✨
                      </p>
                    </div>
                    <p className="text-xs text-slate-400 mt-1 flex items-center justify-end gap-1">
                      2:31 PM <CheckCircle className="w-3 h-3" />
                    </p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 to-cyan-600"></div>
                </div>
                <div className="flex gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600"></div>
                  <div className="bg-slate-100 dark:bg-slate-700 rounded-2xl rounded-tl-sm p-3 inline-flex items-center gap-2">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                      <div
                        className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-white dark:bg-slate-900 transition-colors duration-500">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
              Everything You Need to Stay Connected
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              Powerful features designed to make your conversations smooth,
              secure, and engaging.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Zap className="w-7 h-7 text-blue-600" />,
                title: "Instant Messaging",
                desc: "Send and receive messages in real-time with lightning-fast delivery and zero lag.",
              },
              {
                icon: <Users className="w-7 h-7 text-cyan-600" />,
                title: "Group Chats",
                desc: "Create group conversations and collaborate with teams, friends, or communities.",
              },
              {
                icon: <MessageCircle className="w-7 h-7 text-blue-600" />,
                title: "Typing Indicators",
                desc: "See when someone is typing to keep conversations flowing naturally and smoothly.",
              },
              {
                icon: <CheckCircle className="w-7 h-7 text-cyan-600" />,
                title: "Delivery Status",
                desc: "Track message delivery and read receipts to know when your messages are seen.",
              },
            ].map((f, i) => (
              <div
                key={i}
                className="group p-8 rounded-2xl bg-gradient-to-br from-slate-50 to-white dark:from-slate-800 dark:to-slate-900 border border-slate-200 dark:border-slate-700 hover:border-blue-400 hover:shadow-xl transition-all duration-300"
              >
                <div className="w-14 h-14 bg-blue-100 dark:bg-slate-700 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  {f.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                  {f.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-800 transition-colors duration-500">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
              Get Started in Three Simple Steps
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              Join thousands of users already chatting on ChittChat.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            <div className="hidden md:block absolute top-1/4 left-1/4 right-1/4 h-1 bg-gradient-to-r from-blue-200 via-cyan-200 to-blue-200 dark:from-slate-700 dark:via-slate-700 dark:to-slate-700"></div>

            {[ 
              { num: 1, title: "Create Account", desc: "Sign up with your email in seconds and set up your profile to get started." },
              { num: 2, title: "Find Contacts", desc: "Connect with friends, colleagues, or join existing groups and communities." },
              { num: 3, title: "Start Chatting", desc: "Begin conversations instantly with real-time messaging and enjoy seamless chats." }
            ].map((s, i) => (
              <div key={i} className="relative text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-blue-600/30">
                  <span className="text-3xl font-bold text-white">{s.num}</span>
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
                  {s.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button
              onClick={handleOpenModal}
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-full font-semibold text-lg hover:shadow-2xl hover:shadow-blue-600/40 transition-all duration-300 hover:scale-105"
            >
              Join ChittChat Today
            </button>
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="py-20 px-6 bg-white dark:bg-slate-900 transition-colors duration-500">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block mb-4 px-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-full border border-slate-200 dark:border-slate-700">
              <span className="text-slate-700 dark:text-slate-300 font-medium text-sm">
                Built With Modern Technology
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
              Powered by Best-in-Class Tools
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              ChatFlow leverages cutting-edge technologies to deliver a fast,
              reliable, and scalable messaging experience.
            </p>
          </div>

          <div className="bg-gradient-to-br from-slate-50 to-white dark:from-slate-800 dark:to-slate-900 rounded-3xl p-12 border border-slate-200 dark:border-slate-700">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {["React", "TypeScript", "Supabase", "Socket.io", "Tailwind CSS", "Vite"].map(
                (tech, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-blue-100 dark:bg-slate-700 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Shield className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 dark:text-white mb-1">
                        {tech}
                      </h3>
                      <p className="text-slate-600 dark:text-slate-300 text-sm">
                        {tech === "React"
                          ? "Modern UI framework for building fast, interactive user interfaces"
                          : tech === "TypeScript"
                          ? "Type-safe code for better reliability and developer experience"
                          : tech === "Supabase"
                          ? "Real-time database and authentication infrastructure"
                          : tech === "Socket.io"
                          ? "WebSocket connections for instant real-time messaging"
                          : tech === "Tailwind CSS"
                          ? "Utility-first CSS framework for beautiful, responsive designs"
                          : "Lightning-fast build tool and development server"}
                      </p>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-blue-600 to-cyan-600 dark:from-blue-700 dark:to-cyan-700 transition-colors duration-500">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Transform Your Communication?
          </h2>
          <p className="text-xl text-blue-50 mb-10 leading-relaxed">
            Join our growing community and experience the future of instant
            messaging today.
          </p>
          <button
            onClick={handleOpenModal}
            className="px-8 py-4 bg-white text-blue-600 rounded-full font-semibold text-lg hover:bg-slate-50 transition-all duration-300 hover:scale-105 shadow-2xl"
          >
            Get Started for Free
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 dark:bg-slate-950 text-slate-300 dark:text-slate-400 py-12 px-6 transition-colors duration-500">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <MessageCircle className="w-8 h-8 text-blue-400" />
                <span className="text-2xl font-bold text-white">ChittChat</span>
              </div>
              <p className="text-slate-400 leading-relaxed mb-4">
                Real-time
messaging made simple. Connect with anyone, anywhere, instantly.
              </p>
              <div className="flex gap-4">
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-slate-700 transition-colors duration-300"
                >
                  <Github className="w-5 h-5" />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-slate-700 transition-colors duration-300"
                >
                  <Twitter className="w-5 h-5" />
                </a>
                <a
                  href="mailto:contact@chatflow.com"
                  className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-slate-700 transition-colors duration-300"
                >
                  <Mail className="w-5 h-5" />
                </a>
              </div>
            </div>

            <div>
              <h3 className="font-bold text-white mb-4">Product</h3>
              <ul className="space-y-2">
                <li><a href="#features" className="hover:text-white transition-colors duration-300">Features</a></li>
                <li><a href="#how-it-works" className="hover:text-white transition-colors duration-300">How It Works</a></li>
                <li><a href="#tech" className="hover:text-white transition-colors duration-300">Technology</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-white mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors duration-300">GitHub</a></li>
                <li><a href="/docs" className="hover:text-white transition-colors duration-300">Documentation</a></li>
                <li><a href="/api" className="hover:text-white transition-colors duration-300">API Reference</a></li>
                <li><a href="/support" className="hover:text-white transition-colors duration-300">Support</a></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-800 text-center text-slate-400 text-sm">
            <p>&copy; 2025 ChittChat. All rights reserved. Built with passion for seamless communication.</p>
          </div>
        </div>
      </footer>
           <AuthModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
}

export default Mainpage;
