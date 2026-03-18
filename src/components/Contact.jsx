import { motion } from 'framer-motion';
import { Mail, Send, Github, Linkedin, Twitter, AlertCircle, CheckCircle } from 'lucide-react';
import { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Validation
      if (!formData.name || !formData.email || !formData.message) {
        setStatus({ type: 'error', message: 'Veuillez remplir tous les champs requis' });
        setIsLoading(false);
        return;
      }

      // Email regex validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        setStatus({ type: 'error', message: 'Email invalide' });
        setIsLoading(false);
        return;
      }

      // Envoyer avec FormSpree
      const response = await fetch('https://formspree.io/f/xyzaabcd', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
        }),
      });

      if (!response.ok) throw new Error('Erreur lors de l\'envoi');

      setStatus({
        type: 'success',
        message: 'Message envoyé avec succès! Je vous répondrai bientôt.',
      });
      setFormData({ name: '', email: '', subject: '', message: '' });

      setTimeout(() => setStatus(null), 5000);
    } catch (error) {
      setStatus({
        type: 'error',
        message: 'Erreur lors de l\'envoi. Veuillez réessayer ou m\'envoyer un email directement.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold mb-16 text-center"
        >
          Me <span className="bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">Contacter</span>
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-12"
        >
          {/* Contact Form */}
          <div className="card">
            <h3 className="text-2xl font-bold mb-6">Envoyer un message</h3>

            {/* Status Message */}
            {status && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`mb-6 p-4 rounded-lg flex items-center gap-3 ${
                  status.type === 'success'
                    ? 'bg-green-500/20 border border-green-500/50 text-green-300'
                    : 'bg-red-500/20 border border-red-500/50 text-red-300'
                }`}
              >
                {status.type === 'success' ? (
                  <CheckCircle size={20} />
                ) : (
                  <AlertCircle size={20} />
                )}
                {status.message}
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-semibold mb-2 text-gray-300">
                  Nom *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:border-emerald-500 focus:outline-none transition-colors"
                  placeholder="Votre nom"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-semibold mb-2 text-gray-300">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:border-emerald-500 focus:outline-none transition-colors"
                  placeholder="votre@email.com"
                  required
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-semibold mb-2 text-gray-300">
                  Sujet
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:border-emerald-500 focus:outline-none transition-colors"
                  placeholder="Sujet du message"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-semibold mb-2 text-gray-300">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="5"
                  className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:border-emerald-500 focus:outline-none resize-none"
                  placeholder="Votre message..."
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Envoi en cours...
                  </>
                ) : (
                  <>
                    <Send size={20} />
                    Envoyer
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Email */}
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-emerald-500/20 border border-emerald-500/30">
                  <Mail className="text-emerald-400" size={24} />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-1">Email</h3>
                <a href="mailto:josue.dev@gmail.com" className="text-gray-400 hover:text-emerald-400 transition-colors break-all">
                  josue.dev@gmail.com
                </a>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText('josue.dev@gmail.com');
                    alert('Email copié!');
                  }}
                  className="block text-sm text-gray-500 hover:text-gray-300 mt-2 transition-colors"
                >
                  Copier l'email
                </button>
              </div>
            </div>

            {/* Réseaux sociaux */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Suivez-moi</h3>
              <div className="flex gap-4">
                <a
                  href="https://github.com/josue-dev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-12 h-12 rounded-lg bg-gray-800 border border-gray-700 hover:border-violet-500 hover:bg-violet-500/10 transition-all glow-effect"
                  aria-label="GitHub"
                >
                  <Github size={20} />
                </a>
                <a
                  href="https://www.linkedin.com/in/josue-web"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-12 h-12 rounded-lg bg-gray-800 border border-gray-700 hover:border-violet-500 hover:bg-violet-500/10 transition-all glow-effect"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={20} />
                </a>
              </div>
            </div>

            {/* Temps de réponse */}
            <div className="p-4 bg-violet-500/10 border border-violet-500/30 rounded-lg">
              <p className="text-sm text-gray-300">
                💬 <strong>Temps de réponse:</strong> Je réponds généralement aux messages dans les 24 heures. N'hésitez pas à me contacter!
              </p>
            </div>

            {/* Disponibilité */}
            <div className="p-4 bg-cyan-500/10 border border-cyan-500/30 rounded-lg">
              <p className="text-sm text-gray-300">
                ✨ <strong>Disponibilité:</strong> Actuellement ouvert aux nouvelles opportunités de collaboration et de projets freelance.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
