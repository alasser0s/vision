import { type FC } from 'react';
import { motion } from 'framer-motion';
import { FiUsers, FiTarget, FiAward, FiHeart } from 'react-icons/fi';

const AboutUs: FC = () => {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const stats = [
    { icon: FiUsers, value: '1000+', label: 'Happy Customers' },
    { icon: FiTarget, value: '50+', label: 'Projects Completed' },
    { icon: FiAward, value: '15+', label: 'Awards Won' },
    { icon: FiHeart, value: '24/7', label: 'Support' }
  ];

  const teamMembers = [
    {
      name: 'John Doe',
      role: 'CEO & Founder',
      image: '/team1.jpg'
    },
    {
      name: 'Jane Smith',
      role: 'Creative Director',
      image: '/team2.jpg'
    },
    {
      name: 'Mike Johnson',
      role: 'Lead Developer',
      image: '/team3.jpg'
    }
  ];

  return (
    <div className="min-h-screen p-4 md:p-8 text-white">
      {/* Hero Section */}
      <motion.div 
        className="text-center mb-16"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4">About Us</h1>
        <p className="text-white/80 max-w-2xl mx-auto">
          We're passionate about creating innovative solutions and delivering exceptional experiences to our customers.
        </p>
      </motion.div>

      {/* Stats Section */}
      <motion.div 
        className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
        variants={{
          hidden: { opacity: 0 },
          show: {
            opacity: 1,
            transition: { staggerChildren: 0.2 }
          }
        }}
        initial="hidden"
        animate="show"
      >
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            variants={{
              hidden: { opacity: 0, y: 20 },
              show: { opacity: 1, y: 0 }
            }}
            className="p-6 rounded-xl border border-white/20 backdrop-blur-sm bg-white/10 text-center"
          >
            <stat.icon className="w-8 h-8 mx-auto mb-4 text-blue-400" />
            <h3 className="text-2xl font-bold mb-2">{stat.value}</h3>
            <p className="text-white/80">{stat.label}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Mission Section */}
      <motion.div 
        className="mb-16"
        {...fadeIn}
      >
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
          <p className="text-white/80 mb-8">
            Our mission is to empower businesses and individuals through innovative technology solutions. 
            We strive to create meaningful impact and drive positive change in everything we do.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 rounded-xl border border-white/20 backdrop-blur-sm bg-white/10">
              <h3 className="text-xl font-semibold mb-3">Vision</h3>
              <p className="text-white/80">
                To be the leading force in digital transformation and technological innovation.
              </p>
            </div>
            <div className="p-6 rounded-xl border border-white/20 backdrop-blur-sm bg-white/10">
              <h3 className="text-xl font-semibold mb-3">Values</h3>
              <p className="text-white/80">
                Innovation, integrity, excellence, and customer satisfaction drive everything we do.
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Team Section */}
      <motion.div 
        className="text-center"
        {...fadeIn}
      >
        <h2 className="text-3xl font-bold mb-12">Our Team</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              className="group relative"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.2 }}
            >
              <div className="rounded-xl overflow-hidden border border-white/20 backdrop-blur-sm bg-white/10">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                  <p className="text-white/80">{member.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default AboutUs;
