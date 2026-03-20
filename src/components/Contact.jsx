import { motion } from 'framer-motion';
import { Mail, Send, Github, MessageCircle, AlertCircle, CheckCircle } from 'lucide-react';
import { useState } from 'react';
import { useSiteData } from '../context/SiteDataContext';

export default function Contact() {
  const { contact } = useSiteData();

  const email = contact?.email || 'jojohkdev@gmail.com';
  const whatsapp = contact?.whatsapp || 'https://wa.me/2290160293043';
  const github = contact?.github || 'https://github.com/JOJODEVS-GIT';
  const responseTime = contact?.responseTime || 'Je réponds sous 24h. N\'hésitez pas !';
  const availabilityMessage = contact?.availabilityMessage || 'Disponible pour de nouvelles collaborations et projets freelance.';

  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (!formData.name || !formData.email || !formData.message) {
        setStatus({ type: 'error', message: 'Veuillez remplir tous les champs requis' });
        setIsLoading(false);
        return;
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        setStatus({ type: 'error', message: 'Email invalide' });
        setIsLoading(false);
        return;
      }
      const subject = encodeURIComponent(`Portfolio Contact: ${formData.name}`);
      const body = encodeURIComponent(`Nom: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`);
      window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
      setStatus({ type: 'success', message: 'Votre client email va s\'ouvrir. Merci !' });
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setStatus(null), 5000);
    } catch {
      setStatus({ type: 'error', message: `Erreur. Envoyez un email directement à ${email}` });
    } finally {
      setIsLoading(false);
    }
  };

  const inputClass = "w-full px-4 py-3 border border-[#16C79A]/20 rounded-lg focus:border-[#16C79A] focus:outline-none transition-colors";

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: 'var(--bg-accent)' }}>
      <div className="max-w-4xl mx-auto">
        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold mb-4 text-center">
          Me <span className="accent-gradient">Contacter</span>
        </motion.h2>

        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          className="text-center mb-16" style={{ color: 'var(--text-secondary)' }}>
          Discutons de votre projet !
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-12">
          <div className="card">
            <h3 className="text-2xl font-bold mb-6">Envoyer un message</h3>

            {status && (
              <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
                className={`mb-6 p-4 rounded-lg flex items-center gap-3 ${
                  status.type === 'success' ? 'bg-[#16C79A]/20 border border-[#16C79A]/50 text-[#16C79A]' : 'bg-red-500/20 border border-red-500/50 text-red-300'
                }`}>
                {status.type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
                {status.message}
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-semibold mb-2" style={{ color: 'var(--text-secondary)' }}>Nom *</label>
                <input type="text" id="name" name="name" value={formData.name} onChange={handleChange}
                  className={inputClass} style={{ backgroundColor: 'var(--bg-input)', color: 'var(--text-primary)' }} placeholder="Votre nom" required />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-semibold mb-2" style={{ color: 'var(--text-secondary)' }}>Email *</label>
                <input type="email" id="email" name="email" value={formData.email} onChange={handleChange}
                  className={inputClass} style={{ backgroundColor: 'var(--bg-input)', color: 'var(--text-primary)' }} placeholder="votre@email.com" required />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-semibold mb-2" style={{ color: 'var(--text-secondary)' }}>Message *</label>
                <textarea id="message" name="message" value={formData.message} onChange={handleChange} rows="5"
                  className={`${inputClass} resize-none`} style={{ backgroundColor: 'var(--bg-input)', color: 'var(--text-primary)' }} placeholder="Décrivez votre projet..." required />
              </div>
              <button type="submit" disabled={isLoading} className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed">
                {isLoading ? (
                  <><div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> Envoi...</>
                ) : (
                  <><Send size={20} /> Envoyer</>
                )}
              </button>
            </form>
          </div>

          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }} viewport={{ once: true }}
            className="space-y-8">
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-[#16C79A]/10 border border-[#16C79A]/20">
                  <Mail className="text-[#16C79A]" size={24} />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-1">Email</h3>
                <a href={`mailto:${email}`} className="hover:text-[#16C79A] transition-colors" style={{ color: 'var(--text-secondary)' }}>{email}</a>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Retrouvez-moi</h3>
              <div className="flex gap-4">
                <a href={github} target="_blank" rel="noopener noreferrer"
                  className="flex items-center justify-center w-12 h-12 rounded-lg border border-[#16C79A]/20 hover:border-[#16C79A] hover:bg-[#16C79A]/10 transition-all"
                  style={{ background: 'var(--bg-card)' }} aria-label="GitHub">
                  <Github size={20} />
                </a>
                <a href={whatsapp} target="_blank" rel="noopener noreferrer"
                  className="flex items-center justify-center w-12 h-12 rounded-lg border border-[#16C79A]/20 hover:border-[#16C79A] hover:bg-[#16C79A]/10 transition-all"
                  style={{ background: 'var(--bg-card)' }} aria-label="WhatsApp">
                  <MessageCircle size={20} />
                </a>
              </div>
            </div>

            <div className="p-4 bg-[#16C79A]/10 border border-[#16C79A]/20 rounded-lg">
              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                <strong>Temps de réponse :</strong> {responseTime}
              </p>
            </div>

            <div className="p-4 rounded-lg border" style={{ background: 'var(--bg-card)', borderColor: 'var(--border-card)' }}>
              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                <strong>{availabilityMessage}</strong>
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
