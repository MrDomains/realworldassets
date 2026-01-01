import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, Brain, Shield, LayoutGrid, Search, BarChart3, Linkedin, User, Mail, MessageSquare, Send, ChevronDown, Heart, Menu, X } from 'lucide-react';
import SpiderLogo from './components/SpiderLogo';
import XIcon from './components/XIcon';

const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 1500); // 1.5 δευτερόλεπτα

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="loading-screen"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="loading-content">
        <motion.div
          className="loading-logo"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <SpiderLogo className="w-24 h-24 spinning-logo" />
        </motion.div>
        
        <motion.div
          className="loading-text"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h1 className="loading-title">
            <span className="spider-loading">Spider</span>
            <span className="ai-loading">.ai</span>
          </h1>
        </motion.div>
      </div>
    </motion.div>
  );
};

const MobileMenu = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      onClose(); // Κλείσιμο του menu μετά το scroll
      
      // Track navigation events
      if (window.gtag) {
        window.gtag('event', 'mobile_navigation', {
          event_category: 'engagement',
          event_label: sectionId
        });
      }
    }
  };

  const menuItems = [
    { id: 'home', label: 'Home' },
    { id: 'value', label: 'Value' },
    { id: 'contact', label: 'Contact' }
  ];

  const socialLinks = [
    { icon: XIcon, url: 'https://x.com/MrDomains_', label: 'X (Twitter)' },
    { icon: Linkedin, url: 'https://www.linkedin.com/in/mrdomains/', label: 'LinkedIn' },
    { 
      icon: Mail, 
      url: 'mailto:hello@mr.domains?subject=Spider.ai Domain Inquiry', 
      label: 'Email' 
    }
  ];

  const handleSocialClick = (label: string, url: string) => {
    // Track social media clicks
    if (window.gtag) {
      window.gtag('event', 'mobile_nav_social_click', {
        event_category: 'engagement',
        event_label: label,
        value: url
      });
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="mobile-menu-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
          />
          
          {/* Menu Panel */}
          <motion.div
            className="mobile-menu-panel"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ 
              type: 'spring', 
              damping: 25, 
              stiffness: 200,
              duration: 0.4 
            }}
          >
            {/* Menu Header */}
            <div className="mobile-menu-header">
              <div className="flex items-center gap-3">
                <SpiderLogo className="w-5 h-5" />
                <span className="text-white text-xl font-semibold">Spider.ai</span>
              </div>
              <button
                onClick={onClose}
                className="mobile-menu-close"
                aria-label="Close menu"
              >
                <X size={24} />
              </button>
            </div>

            {/* Menu Items - ΑΦΑΙΡΕΣΗ ΟΛΩΝ ΤΩΝ FRAMER MOTION ANIMATIONS */}
            <nav className="mobile-menu-nav">
              {menuItems.map((item, index) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="mobile-menu-item"
                >
                  <span className="mobile-menu-item-text">{item.label}</span>
                  <div className="mobile-menu-item-arrow">→</div>
                </button>
              ))}
            </nav>

            {/* Menu Footer - ΧΡΗΣΗ ΤΟΥ ΙΔΙΟΥ CLASS ΜΕ ΤΟ FOOTER */}
            <div className="mobile-menu-footer">
              <div className="mobile-menu-social">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.url}
                    target={social.url.startsWith('mailto:') ? '_self' : '_blank'}
                    rel="noopener noreferrer"
                    className="social-link"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={social.label}
                    onClick={() => handleSocialClick(social.label, social.url)}
                  >
                    <social.icon size={20} />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      
      // Track navigation events
      if (window.gtag) {
        window.gtag('event', 'navigation', {
          event_category: 'engagement',
          event_label: sectionId
        });
      }
    }
  };

  const socialLinks = [
    { icon: XIcon, url: 'https://x.com/MrDomains_', label: 'X (Twitter)' },
    { icon: Linkedin, url: 'https://www.linkedin.com/in/mrdomains/', label: 'LinkedIn' },
    { 
      icon: Mail, 
      url: 'mailto:hello@mr.domains?subject=Spider.ai Domain Inquiry', 
      label: 'Email' 
    }
  ];

  const handleSocialClick = (label: string, url: string) => {
    // Track social media clicks
    if (window.gtag) {
      window.gtag('event', 'social_click', {
        event_category: 'engagement',
        event_label: label,
        value: url
      });
    }
  };

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    
    // Track mobile menu usage
    if (window.gtag) {
      window.gtag('event', 'mobile_menu_toggle', {
        event_category: 'engagement',
        event_label: isMobileMenuOpen ? 'close' : 'open'
      });
    }
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-transparent backdrop-blur-md border-b border-[#223566]/30">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          {/* Logo - Left */}
          <div className="flex items-center gap-3">
            <SpiderLogo className="w-5 h-5" />
            <span className="text-white text-2xl font-semibold">Spider.ai</span>
          </div>
          
          {/* Navigation - Center - Desktop Only */}
          <nav className="desktop-nav-center">
            <button
              onClick={() => scrollToSection('home')}
              className="text-white hover:text-[#7B68EE] transition-colors duration-300"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection('value')}
              className="text-white hover:text-[#7B68EE] transition-colors duration-300"
            >
              Value
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="text-white hover:text-[#7B68EE] transition-colors duration-300"
            >
              Contact
            </button>
          </nav>

          {/* Social Media - Right - Desktop Only */}
          <div className="desktop-social-links">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.url}
                target={social.url.startsWith('mailto:') ? '_self' : '_blank'}
                rel="noopener noreferrer"
                className="header-social-link"
                aria-label={social.label}
                onClick={() => handleSocialClick(social.label, social.url)}
              >
                <social.icon size={18} />
              </a>
            ))}
          </div>

          {/* Mobile Menu Button - Mobile Only */}
          <button
            onClick={handleMobileMenuToggle}
            className="mobile-menu-button md:hidden"
            aria-label="Open menu"
          >
            <Menu size={24} />
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <MobileMenu 
        isOpen={isMobileMenuOpen} 
        onClose={() => setIsMobileMenuOpen(false)} 
      />
    </>
  );
};

const SectionDivider = ({ id }: { id: string }) => (
  <div id={id} className="section-divider">
    <div className="divider-line"></div>
    <div className="divider-glow"></div>
  </div>
);

const MainContent = () => {
  const handleProposalClick = () => {
    // Track proposal button clicks
    if (window.gtag) {
      window.gtag('event', 'proposal_click', {
        event_category: 'conversion',
        event_label: 'escrow_form',
        value: 1
      });
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center section-content">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center space-y-12"
      >
        <div className="flex items-center justify-center">
          <h1 className="domain-name">
            <span className="spider-static">
              Spider
            </span>
            <span className="ai-glowing">
              .ai
            </span>
          </h1>
        </div>
        
        <div className="space-y-8">
          <h2 className="tagline text-white">
            Ultra Premium Domain Name Available for Purchase
          </h2>
          
          <div className="space-y-6">
            <h3 className="serious-buyers">
              For Serious Buyers Only
            </h3>
            
            <div className="flex justify-center">
              <div className="button-container">
                <form 
                  action="https://www.escrow.com/offer" 
                  method="post" 
                  target="_blank"
                  onSubmit={handleProposalClick}
                >
                  <input type="hidden" name="type" value="domain_name" />
                  <input type="hidden" name="non_initiator_email" value="ypanagis@pm.me" />
                  <input type="hidden" name="non_initiator_id" value="3315845" />
                  <input type="hidden" name="non_initiator_role" value="seller" />
                  <input type="hidden" name="title" value="Spider.ai" />
                  <input type="hidden" name="currency" value="USD" />
                  <input type="hidden" name="domain" value="Spider.ai" />
                  <input type="hidden" name="price" value="0" />
                  <input type="hidden" name="concierge" value="true" />
                  <input type="hidden" name="with_content" value="false" />
                  <input type="hidden" name="inspection_period" value="1" />
                  <input type="hidden" name="fee_payer" value="buyer" />
                  <input type="hidden" name="return_url" value="https://spider.ai/" />
                  <input type="hidden" name="button_types" value="make_offer" />
                  <input type="hidden" name="auto_accept" value="" />
                  <input type="hidden" name="auto_reject" value="" />
                  <input type="hidden" name="item_key" value="5acf9e10-37cb-11f0-8a48-955e4bb601a5" />
                  <button 
                    type="submit"
                    className="inquiry-button animated-proposal-button"
                  >
                    Submit Your Proposal
                  </button>
                  <img 
                    src="https://t.escrow.com/1px.gif?name=bin&price=0&title=Spider.ai&user_id=3315845" 
                    style={{ display: 'none' }} 
                    alt=""
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

const ScrollingUseCases = () => {
  const useCases = [
    {
      title: "Web Crawling",
      description: "Perfect for companies developing AI driven web crawling tools, search engines, or data collection systems.",
      icon: Globe
    },
    {
      title: "Neural Networks",
      description: "Ideal for AI labs building neural network models, deep learning algorithms, or cognitive computing solutions.",
      icon: Brain
    },
    {
      title: "SEO Tools",
      description: "Perfect for businesses creating AI powered SEO platforms, keyword analysis tools, or search optimization software.",
      icon: Search
    },
    {
      title: "Data Analysis",
      description: "Excellent for companies building AI powered analytics platforms, business intelligence tools, or predictive modeling solutions.",
      icon: BarChart3
    },
    {
      title: "Web3 Applications",
      description: "Perfect for blockchain based or decentralized applications in the Web3 space, DeFi platforms, or smart contract solutions.",
      icon: LayoutGrid
    },
    {
      title: "Cybersecurity",
      description: "Ideal for AI powered cybersecurity platforms, threat detection systems, or network monitoring solutions.",
      icon: Shield
    },
    {
      title: "Healthcare",
      description: "Perfect for AI powered medical diagnosis systems, patient monitoring platforms, or healthcare analytics solutions.",
      icon: Heart
    }
  ];

  // Διπλασιάζουμε τα cards για seamless scrolling
  const duplicatedUseCases = [...useCases, ...useCases];

  return (
    <div className="scrolling-container">
      <div className="scrolling-track">
        {duplicatedUseCases.map((useCase, index) => (
          <div key={index} className="scrolling-card">
            <div className="use-case-icon">
              <useCase.icon size={24} />
            </div>
            <h3 className="use-case-title">{useCase.title}</h3>
            <p className="use-case-description">{useCase.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const ValueSection = () => {
  return (
    <>
      <SectionDivider id="value" />
      <section className="py-16 section-content">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center space-y-12"
          >
            <h2 className="why-spider-title text-white">
              Why <span className="spider-ai-simple">Spider.ai</span>?
            </h2>
            
            <p className="why-spider-description text-[#e0e0e0] max-w-4xl mx-auto">
              The word "Spider" creates powerful associations with WEB technologies, perfectly aligning with numerous high value applications. As AI continues its exponential growth trajectory across all business sectors, owning this rare, conceptually perfect domain positions your company at the forefront of this technological revolution with an instantly recognizable, memorable brand.
            </p>

            {/* Scrolling Use Cases */}
            <div className="mt-16">
              <ScrollingUseCases />
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    // Track form submission attempt
    if (window.gtag) {
      window.gtag('event', 'form_submit_attempt', {
        event_category: 'engagement',
        event_label: 'contact_form'
      });
    }

    try {
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const response = await fetch(`${supabaseUrl}/functions/v1/send-contact-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Failed to send message');
      }

      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
      
      // Track successful form submission
      if (window.gtag) {
        window.gtag('event', 'form_submit_success', {
          event_category: 'conversion',
          event_label: 'contact_form',
          value: 1
        });
      }
      
      setTimeout(() => {
        setStatus('idle');
      }, 3000);
    } catch (error) {
      console.error('Error sending message:', error);
      setStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'Failed to send message. Please try again.');
      
      // Track form submission error
      if (window.gtag) {
        window.gtag('event', 'form_submit_error', {
          event_category: 'engagement',
          event_label: 'contact_form',
          value: error instanceof Error ? error.message : 'Unknown error'
        });
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <>
      <SectionDivider id="contact" />
      <section className="py-16 section-content">
        <div className="max-w-2xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center space-y-8"
          >
            <div className="space-y-4">
              <h2 className="contact-title text-white">Contact Us</h2>
              <p className="contact-subtitle text-[#e0e0e0]">
                For more information about Spider.ai, please fill out the form and we will get back to you as soon as possible.
              </p>
            </div>
            
            <div className="contact-form-container">
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-group">
                  <div className="form-input-container">
                    <User className="form-icon" size={20} />
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Name"
                      className="form-input"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <div className="form-input-container">
                    <Mail className="form-icon" size={20} />
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="Email"
                      className="form-input"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <div className="form-input-container">
                    <MessageSquare className="form-icon" size={20} />
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={4}
                      placeholder="Message"
                      className="form-input resize-none"
                    />
                  </div>
                </div>

                {status === 'error' && (
                  <div className="error-message">
                    {errorMessage}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === 'loading' || status === 'success'}
                  className={`send-message-button ${status === 'success' ? 'success' : ''}`}
                >
                  {status === 'success' ? (
                    'Submission Successful!'
                  ) : (
                    <>
                      <Send size={16} className="mr-2" />
                      {status === 'loading' ? 'Sending...' : 'Send Message'}
                    </>
                  )}
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

const MobileSocialLinks = () => {
  const socialLinks = [
    { icon: XIcon, url: 'https://x.com/MrDomains_', label: 'X (Twitter)' },
    { icon: Linkedin, url: 'https://www.linkedin.com/in/mrdomains/', label: 'LinkedIn' },
    { 
      icon: Mail, 
      url: 'mailto:hello@mr.domains?subject=Spider.ai Domain Inquiry', 
      label: 'Email' 
    }
  ];

  const handleSocialClick = (label: string, url: string) => {
    // Track social media clicks
    if (window.gtag) {
      window.gtag('event', 'mobile_social_click', {
        event_category: 'engagement',
        event_label: label,
        value: url
      });
    }
  };

  return (
    <div className="mobile-social-links">
      {socialLinks.map((social, index) => (
        <motion.a
          key={index}
          href={social.url}
          target={social.url.startsWith('mailto:') ? '_self' : '_blank'}
          rel="noopener noreferrer"
          className="social-link"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          aria-label={social.label}
          onClick={() => handleSocialClick(social.label, social.url)}
        >
          <social.icon size={20} />
        </motion.a>
      ))}
    </div>
  );
};

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isFromGreece, setIsFromGreece] = useState(false);

  const handleLoadingComplete = () => {
    setIsLoading(false);
    
    // Track page load completion
    if (window.gtag && !isFromGreece) {
      window.gtag('event', 'page_load_complete', {
        event_category: 'engagement',
        event_label: 'loading_screen_complete'
      });
    }
  };

  // ΕΛΕΓΧΟΣ ΓΙΑ ΕΛΛΑΔΑ - ΑΠΕΝΕΡΓΟΠΟΙΗΣΗ ANALYTICS
  useEffect(() => {
    const checkCountry = async () => {
      try {
        // Δοκιμάζουμε πρώτα το ipapi.co
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        
        if (data.country_code === 'GR') {
          setIsFromGreece(true);
          console.log('🇬🇷 Greek visitor detected - Analytics disabled');
          return;
        }
        
        // Αν αποτύχει, δοκιμάζουμε το ipinfo.io
        const fallbackResponse = await fetch('https://ipinfo.io/json');
        const fallbackData = await fallbackResponse.json();
        
        if (fallbackData.country === 'GR') {
          setIsFromGreece(true);
          console.log('🇬🇷 Greek visitor detected (fallback) - Analytics disabled');
        }
      } catch (error) {
        console.log('Country detection failed, proceeding with analytics');
      }
    };

    checkCountry();
  }, []);

  // ΣΙΓΟΥΡΗ ΑΡΧΙΚΟΠΟΙΗΣΗ PARTICLES.JS - ΜΕΤΑ ΤΟ LOADING
  useEffect(() => {
    if (!isLoading) {
      // Track analytics initialization - ΜΟΝΟ ΑΝ ΔΕΝ ΕΙΝΑΙ ΑΠΟ ΕΛΛΑΔΑ
      const checkAnalytics = () => {
        if (!isFromGreece) {
          const analyticsLoaded = {
            googleAnalytics: !!(window as any).gtag && !!(window as any).dataLayer,
            clarity: !!(window as any).clarity,
            statcounter: !!(window as any).sc_project
          };
          
          if (window.gtag) {
            window.gtag('event', 'analytics_status', {
              event_category: 'technical',
              event_label: 'analytics_loaded',
              custom_parameters: analyticsLoaded
            });
          }
        } else {
          console.log('🇬🇷 Analytics tracking skipped for Greek visitor');
        }
      };

      setTimeout(checkAnalytics, 3000);

      // ΚΑΘΥΣΤΕΡΗΣΗ 1 ΔΕΥΤΕΡΟΛΕΠΤΟ ΜΕΤΑ ΤΟ LOADING ΓΙΑ ΟΜΑΛΗ ΜΕΤΑΒΑΣΗ
      const backgroundTimer = setTimeout(() => {
        console.log('🚀 Starting particles.js initialization...');
        
        const initParticles = () => {
          if (window.particlesJS) {
            console.log('✅ Particles.js found, initializing...');
            
            try {
              window.particlesJS("particles-js", {
                "particles": {
                  "number": {
                    "value": 80,
                    "density": {
                      "enable": true,
                      "value_area": 800
                    }
                  },
                  "color": {
                    "value": "#7B68EE"
                  },
                  "shape": {
                    "type": "circle"
                  },
                  "opacity": {
                    "value": 0.5,
                    "random": false,
                    "anim": {
                      "enable": false
                    }
                  },
                  "size": {
                    "value": 3,
                    "random": true,
                    "anim": {
                      "enable": false
                    }
                  },
                  "line_linked": {
                    "enable": true,
                    "distance": 150,
                    "color": "#1A2B50",
                    "opacity": 0.4,
                    "width": 1
                  },
                  "move": {
                    "enable": true,
                    "speed": 2,
                    "direction": "none",
                    "random": false,
                    "straight": false,
                    "out_mode": "out",
                    "bounce": false
                  }
                },
                "interactivity": {
                  "detect_on": "canvas",
                  "events": {
                    "onhover": {
                      "enable": true,
                      "mode": "repulse"
                    },
                    "onclick": {
                      "enable": true,
                      "mode": "push"
                    },
                    "resize": true
                  },
                  "modes": {
                    "repulse": { "distance": 200, "duration": 0.4 },
                    "push": { "particles_nb": 4 }
                  }
                },
                "retina_detect": true
              });
              
              console.log('🎉 Particles.js initialized successfully!');
              
            } catch (error) {
              console.error('❌ Error initializing particles.js:', error);
            }
          } else {
            console.warn('⚠️ Particles.js not available, retrying...');
            // ΕΠΑΝΑΛΗΨΗ ΑΡΧΙΚΟΠΟΙΗΣΗΣ ΑΝ ΔΕΝ ΕΙΝΑΙ ΕΤΟΙΜΟ
            setTimeout(initParticles, 500);
          }
        };

        // ΑΡΧΙΚΟΠΟΙΗΣΗ
        initParticles();
        
      }, 1000); // 1 ΔΕΥΤΕΡΟΛΕΠΤΟ ΚΑΘΥΣΤΕΡΗΣΗ ΜΕΤΑ ΤΟ LOADING

      return () => clearTimeout(backgroundTimer);
    }
  }, [isLoading, isFromGreece]);

  return (
    <div className="relative min-h-screen text-white">
      <AnimatePresence mode="wait">
        {isLoading ? (
          <LoadingScreen key="loading" onComplete={handleLoadingComplete} />
        ) : (
          <motion.div
            key="main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="relative min-h-screen"
          >
            <Header />
            
            <main className="relative z-10 pt-20">
              <div className="max-w-4xl mx-auto px-4">
                <MainContent />
              </div>
              
              <ValueSection />
              <ContactSection />
              
              <MobileSocialLinks />
            </main>

            <footer className="relative z-10 w-full p-4 text-center text-sm text-white/80">
              © 2025 Spider.ai. All rights reserved.
            </footer>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;