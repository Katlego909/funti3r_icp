import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../use-auth-client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faStar } from '@fortawesome/free-solid-svg-icons';
import Logo from '../assets/logo.svg'; 

const Login = () => {
  const navigate = useNavigate();
  const { isAuthenticated, login, fetchProfileType, profileType } = useAuth();

  const handleLogin = async () => {
    try {
      await login();
      const profileType = await fetchProfileType();
      console.log(profileType);

      if (profileType === 'user') {
        navigate('/dashboard/user', { replace: true });
      } else if (profileType === 'business') {
        navigate('/dashboard/business', { replace: true });
      } else {
        navigate('/onboard/create-profile', { replace: true });
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div>
      {/* Navigation Bar */}
      <div style={styles.navbar}>
      <div style={styles.sidebarBrand}>
         
          <img src={Logo} alt="Logo" style={styles.logo} /> {/* Add SVG logo here */}
        </div>
        <div>
          <button onClick={handleLogin} style={styles.loginButton}>
            {isAuthenticated ? "Get Started" : "Login with Wallet"}
          </button>
        </div>
      </div>

      <div style={styles.main}>
        {/* Hero Section */}
        <div style={styles.hero}>
          <h5 style={styles.heroSubtitle}>Explore Micro-tasking</h5>
          <h1 style={styles.heroSectionTitle}>Maximize Efficiency, Empower Teams.</h1>
          <p style={styles.heroText}>
            Our innovative micro-tasking application is designed to unlock unprecedented efficiency.
          </p>

          {/* Search Bar */}
          <div style={styles.searchBar}>
            <form method="get" action="/home" style={styles.searchForm}>
              <input type="text" name="search" id="search" placeholder="Search for tasks..." style={styles.searchInput} />
              <button type="submit" value="Filter" style={styles.searchButton}>
                <FontAwesomeIcon icon={faSearch} style={styles.searchIcon} />
              </button>
            </form>
          </div>

          {/* Categories */}
          <div style={styles.heroCategories}>
            <p style={styles.categoryTitle}>Popular categories:</p>
            <div style={styles.categories}>
              <button style={styles.btnCategory}>
                <FontAwesomeIcon icon={faStar} style={styles.categoryIcon} /> Top Rated
              </button>
              {/* Add more categories as needed */}
            </div>
          </div>
        </div>

        {/* Top Tasks Section */}
        <div style={styles.topTasks}>
          <h2 style={styles.topTasksTitle}>Top Tasks</h2>
          <div style={styles.taskList}>
            {/* Example task card */}
            <div style={styles.taskCard}>
              <h3 style={styles.taskTitle}>Task Name</h3>
              <p style={styles.taskDescription}>Brief description of the task.</p>
              <button style={styles.taskButton}>Apply Now</button>
            </div>
            {/* Repeat task cards as needed */}
          </div>
        </div>

        {/* Testimonials Section */}
        <div style={styles.testimonials}>
          <h2 style={styles.testimonialsTitle}>What Our Users Say</h2>
          <div style={styles.testimonialCard}>
            <p style={styles.testimonialText}>“Funti3r has revolutionized the way I manage tasks. It's efficient and user-friendly!”</p>
            <p style={styles.testimonialAuthor}>- Anonymous</p>
          </div>
          {/* Add more testimonials as needed */}
        </div>

        {/* Footer */}
        <footer style={styles.footer}>
          <div style={styles.footerContent}>
            <div style={styles.footerSection}>
              <h3 style={styles.footerTitle}>About Funti3r</h3>
              <p style={styles.footerText}>Information about Funti3r and its mission.</p>
            </div>
            <div style={styles.footerSection}>
              <h3 style={styles.footerTitle}>Contact Us</h3>
              <p style={styles.footerText}>Email: contact@funti3r.com</p>
              <p style={styles.footerText}>Phone: +1-234-567-890</p>
            </div>
            <div style={styles.footerSection}>
              <h3 style={styles.footerTitle}>Follow Us</h3>
              <p style={styles.footerText}>
                <a href="#" style={styles.footerLink}>Facebook</a> | <a href="#" style={styles.footerLink}>Twitter</a> | <a href="#" style={styles.footerLink}>Instagram</a>
              </p>
            </div>
          </div>
          <div style={styles.footerBottom}>
            <p style={styles.footerBottomText}>&copy; 2024 Funti3r. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </div>
  );
};

const styles = {
  navbar: {
    backgroundColor: '#4a004e',
    padding: '15px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  navbarTitle: {
    color: 'white',
    margin: 0,
  },
  logo: {
    width: '80px', // Adjust the width to make the logo smaller
    height: 'auto',
  },
  loginButton: {
    padding: '10px 20px',
    fontSize: '16px',
    color: '#fff',
    backgroundColor: '#ffa500',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  main: {
    padding: '20px',
  },
  hero: {
    background: 'linear-gradient(to right, #4a004e, #3c2b63)',
    color: 'white',
    padding: '40px 20px',
    borderRadius: '10px',
    textAlign: 'center',
  },
  heroSubtitle: {
    fontSize: '18px',
    marginBottom: '10px',
  },
  heroSectionTitle: {
    fontSize: '36px',
    margin: '10px 0',
  },
  heroText: {
    fontSize: '16px',
    margin: '10px 0',
  },
  searchBar: {
    marginTop: '20px',
  },
  searchForm: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchInput: {
    padding: '10px',
    border: 'none',
    borderRadius: '5px',
    width: '70%',
  },
  searchButton: {
    padding: '10px',
    backgroundColor: '#ffa500',
    border: 'none',
    color: 'white',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  searchIcon: {
    fontSize: '18px',
  },
  heroCategories: {
    margin: '20px 0',
  },
  categoryTitle: {
    fontSize: '18px',
    marginBottom: '10px',
  },
  categories: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  btnCategory: {
    backgroundColor: '#4a004e',
    color: 'white',
    border: 'none',
    padding: '10px',
    borderRadius: '5px',
    margin: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  categoryIcon: {
    fontSize: '18px',
    marginRight: '5px',
  },
  topTasks: {
    marginTop: '40px',
    padding: '20px',
    backgroundColor: '#f8f8f8',
    borderRadius: '10px',
  },
  topTasksTitle: {
    fontSize: '28px',
    marginBottom: '20px',
  },
  taskList: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '20px',
  },
  taskCard: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '10px',
    width: '100%',
    maxWidth: '1000px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  taskTitle: {
    fontSize: '20px',
    marginBottom: '10px',
  },
  taskDescription: {
    fontSize: '16px',
    marginBottom: '20px',
  },
  taskButton: {
    padding: '10px',
    backgroundColor: '#ffa500',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  testimonials: {
    marginTop: '40px',
    padding: '20px',
    backgroundColor: '#f8f8f8',
    borderRadius: '10px',
  },
  testimonialsTitle: {
    fontSize: '28px',
    marginBottom: '20px',
  },
  testimonialCard: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  testimonialText: {
    fontSize: '16px',
    fontStyle: 'italic',
    marginBottom: '10px',
  },
  testimonialAuthor: {
    fontSize: '14px',
    color: '#666',
  },
  footer: {
    backgroundColor: '#4a004e',
    color: '#fff',
    padding: '20px',
    marginTop: '40px',
    borderRadius: '10px',
  },
  footerContent: {
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  footerSection: {
    flex: '1 1 300px',
    marginBottom: '20px',
  },
  footerTitle: {
    fontSize: '18px',
    marginBottom: '10px',
  },
  footerText: {
    fontSize: '14px',
  },
  footerLink: {
    color: '#ffa500',
    textDecoration: 'none',
    marginLeft: '10px',
  },
  footerBottom: {
    borderTop: '1px solid #fff',
    paddingTop: '10px',
    textAlign: 'center',
  },
  footerBottomText: {
    fontSize: '14px',
  },
};

export default Login;
