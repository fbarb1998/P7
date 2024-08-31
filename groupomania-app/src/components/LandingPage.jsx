import React from 'react';
import styled from 'styled-components';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import LoginPage from '../pages/LoginPage'; // Adjust path if needed
import SignupPage from '../pages/SignupPage'; // Adjust path if needed
import logo from '../assets/icon-left-font-monochrome-black.png'; // Adjust path if needed

// Styled components for the page layout
const LandingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f2f5;
`;

const AuthCard = styled(Card)`
  width: 100%;
  max-width: 600px;
  padding: 20px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
`;

const LogoImage = styled(Image)`
  max-width: 150px;
  margin-bottom: 20px;
`;

const TabsStyled = styled(Tabs)`
  .nav-item {
    width: 50%;
  }

  .nav-link {
    width: 100%;
  }
`;

const LandingPage = () => {
  return (
    <LandingContainer>
      <AuthCard>
        <Row className="text-center">
          <Col>
            <LogoImage src={logo} alt="Logo" />
          </Col>
        </Row>
        <TabsStyled defaultActiveKey="login" id="auth-tabs">
          <Tab eventKey="login" title="Login">
            <div className="border border-top-0 p-4">
              <LoginPage />
            </div>
          </Tab>
          <Tab eventKey="signup" title="Sign Up">
            <div className="border border-top-0 p-4">
              <SignupPage />
            </div>
          </Tab>
        </TabsStyled>
      </AuthCard>
    </LandingContainer>
  );
};

export default LandingPage;
