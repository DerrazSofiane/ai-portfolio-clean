import { useState, useRef } from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  Icon,
  Link,
  SimpleGrid,
  useToast,
} from '@chakra-ui/react';
import { FaEnvelope, FaLinkedin, FaGithub, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import { BiSend } from 'react-icons/bi';
import emailjs from '@emailjs/browser';
import useScrollAnimation from '../../hooks/useScrollAnimation';
import { EMAILJS_CONFIG, isEmailJSConfigured } from '../../config/emailjs';

const ContactInfo = ({ icon, title, value, href }) => {
  const [ref, isInView] = useScrollAnimation();
  
  const content = (
    <Box
      ref={ref}
      className={`glass hover-lift ${isInView ? 'scroll-animate-left in-view' : 'scroll-animate-left'}`}
      p={6}
      borderRadius="xl"
      textAlign="center"
      cursor={href ? 'pointer' : 'default'}
      transition="all 0.3s"
      _hover={href ? {
        transform: 'translateY(-4px)',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
        borderColor: 'var(--color-primary)',
        borderWidth: '1px',
      } : {}}
    >
      <Icon as={icon} w={8} h={8} color="var(--color-primary)" mb={3} />
      <Text fontWeight="bold" color="var(--color-accent)" mb={1}>
        {title}
      </Text>
      <Text color="var(--color-secondary)">{value}</Text>
    </Box>
  );

  if (href) {
    return (
      <Link href={href} isExternal style={{ textDecoration: 'none' }}>
        {content}
      </Link>
    );
  }

  return content;
};

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const toast = useToast();
  const [formRef, isFormInView] = useScrollAnimation();
  const form = useRef();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // If EmailJS is not configured, fall back to mailto
      if (!isEmailJSConfigured()) {
        // Create mailto link with form data
        const mailtoLink = `mailto:derraz.sofiane@gmail.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(`From: ${formData.name} (${formData.email})\n\n${formData.message}`)}`;
        window.location.href = mailtoLink;
        
        toast({
          title: 'Opening email client...',
          description: 'Please send the email from your email client.',
          status: 'info',
          duration: 5000,
          isClosable: true,
        });
        
        // Reset form after a delay
        setTimeout(() => {
          setFormData({
            name: '',
            email: '',
            subject: '',
            message: '',
          });
        }, 1000);
      } else {
        // Send email using EmailJS
        const templateParams = {
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject,
          message: formData.message,
          to_name: 'Sofiane',
        };

        const result = await emailjs.send(
          EMAILJS_CONFIG.SERVICE_ID,
          EMAILJS_CONFIG.TEMPLATE_ID,
          templateParams,
          EMAILJS_CONFIG.PUBLIC_KEY
        );

        if (result.text === 'OK') {
          toast({
            title: 'Message sent successfully!',
            description: "Thank you for your message. I'll get back to you as soon as possible.",
            status: 'success',
            duration: 5000,
            isClosable: true,
          });
          setFormData({
            name: '',
            email: '',
            subject: '',
            message: '',
          });
        }
      }
    } catch (error) {
      console.error('Error sending email:', error);
      toast({
        title: 'Error sending message',
        description: 'Please try again or contact me directly via email.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactMethods = [
    {
      icon: FaEnvelope,
      title: 'Email',
      value: 'derraz.sofiane@gmail.com',
      href: 'mailto:derraz.sofiane@gmail.com',
    },
    {
      icon: FaLinkedin,
      title: 'LinkedIn',
      value: 'Sofiane Derraz',
      href: 'https://www.linkedin.com/in/derraz-sofiane/',
    },
    {
      icon: FaGithub,
      title: 'GitHub',
      value: 'DerrazSofiane',
      href: 'https://github.com/DerrazSofiane',
    },
    {
      icon: FaMapMarkerAlt,
      title: 'Location',
      value: 'France',
    },
  ];

  return (
    <Box id="contact" py={20} bg="var(--color-background)">
      <Container maxW="container.xl">
        <VStack spacing={12} align="stretch">
          {/* Section Header */}
          <VStack spacing={4} textAlign="center">
            <Heading size="2xl" color="var(--color-accent)" className="animate-fadeIn">
              Contact
            </Heading>
            <Text color="var(--color-secondary)" fontSize="lg" maxW="2xl" mx="auto" className="animate-fadeIn animate-delay-200">
              Have an AI project in mind? Let's discuss how I can help you 
              transform your data into innovative solutions.
            </Text>
          </VStack>

          <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={10}>
            {/* Contact Information */}
            <VStack spacing={6} align="stretch">
              <Heading size="lg" color="var(--color-primary)">
                Let's Connect
              </Heading>
              <Text color="var(--color-secondary)">
                I'm always open to new opportunities and collaborations 
                in AI, data engineering, analytics, and innovative tech solutions.
              </Text>
              
              <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={4}>
                {contactMethods.map((method, index) => (
                  <ContactInfo
                    key={index}
                    icon={method.icon}
                    title={method.title}
                    value={method.value}
                    href={method.href}
                  />
                ))}
              </SimpleGrid>

              {/* Availability Status */}
              <Box
                className="glass"
                p={6}
                borderRadius="xl"
                bg="rgba(34, 211, 238, 0.05)"
                borderColor="var(--color-primary)"
                borderWidth={1}
              >
                <HStack spacing={3} mb={2}>
                  <Box w={3} h={3} borderRadius="full" bg="green.400" className="pulse-animation" />
                  <Text fontWeight="bold" color="var(--color-accent)">
                    Available for Projects
                  </Text>
                </HStack>
                <Text color="var(--color-secondary)" fontSize="sm">
                  Currently available for freelance projects and long-term 
                  AI/ML collaborations.
                </Text>
              </Box>
            </VStack>

            {/* Contact Form */}
            <Box
              ref={formRef}
              className={`glass ${isFormInView ? 'scroll-animate-right in-view' : 'scroll-animate-right'}`}
              p={8}
              borderRadius="xl"
            >
              <form ref={form} onSubmit={handleSubmit}>
                <VStack spacing={6}>
                  <FormControl isRequired>
                    <FormLabel color="var(--color-accent)">Name</FormLabel>
                    <Input
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      bg="var(--color-background-light)"
                      border="1px solid"
                      borderColor="whiteAlpha.200"
                      _hover={{ borderColor: 'var(--color-primary)' }}
                      _focus={{ borderColor: 'var(--color-primary)', boxShadow: '0 0 0 1px var(--color-primary)' }}
                    />
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel color="var(--color-accent)">Email</FormLabel>
                    <Input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your.email@example.com"
                      bg="var(--color-background-light)"
                      border="1px solid"
                      borderColor="whiteAlpha.200"
                      _hover={{ borderColor: 'var(--color-primary)' }}
                      _focus={{ borderColor: 'var(--color-primary)', boxShadow: '0 0 0 1px var(--color-primary)' }}
                    />
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel color="var(--color-accent)">Subject</FormLabel>
                    <Input
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="Message subject"
                      bg="var(--color-background-light)"
                      border="1px solid"
                      borderColor="whiteAlpha.200"
                      _hover={{ borderColor: 'var(--color-primary)' }}
                      _focus={{ borderColor: 'var(--color-primary)', boxShadow: '0 0 0 1px var(--color-primary)' }}
                    />
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel color="var(--color-accent)">Message</FormLabel>
                    <Textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Describe your project or request..."
                      rows={6}
                      bg="var(--color-background-light)"
                      border="1px solid"
                      borderColor="whiteAlpha.200"
                      _hover={{ borderColor: 'var(--color-primary)' }}
                      _focus={{ borderColor: 'var(--color-primary)', boxShadow: '0 0 0 1px var(--color-primary)' }}
                    />
                  </FormControl>

                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    w="full"
                    rightIcon={<BiSend />}
                    isLoading={isSubmitting}
                    loadingText="Sending..."
                    className="button-hover hover-lift"
                  >
                    Send Message
                  </Button>
                </VStack>
              </form>
            </Box>
          </SimpleGrid>
        </VStack>
      </Container>
    </Box>
  );
};

export default Contact;