import React from 'react';
import styles from '@/style/footer.module.css';

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <p>&copy; 2024 Your Company. All rights reserved.</p>
      <nav>
        <a href="/privacy-policy">Privacy Policy</a>
        <a href="/terms-of-service">Terms of Service</a>
      </nav>
    </footer>
  );
};

export default Footer;
