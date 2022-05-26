import React from "react";
import { Breadcrumb, Layout, Menu } from "antd";
import { Content, Footer, Header } from "antd/es/layout/layout";
import { Link } from "react-router-dom";
import logo from "../asset/img/logo.png";

const MainLayout = ({ children }) => (
  <Layout>
    <Header
      style={{
        position: "fixed",
        zIndex: 1,
        width: "100%",
      }}
    >
      <div className="logo" />
      <Link to="/">
        <img height={55} alt="logo" src={logo} />{" "}
      </Link>
    </Header>
    <Content
      className="site-layout"
      style={{
        padding: "0 50px",
        marginTop: 64,
      }}
    >
      <Breadcrumb
        style={{
          margin: "16px 0",
        }}
      >
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>List</Breadcrumb.Item>
        <Breadcrumb.Item>App</Breadcrumb.Item>
        <Breadcrumb.Item>ML</Breadcrumb.Item>
        <Breadcrumb.Item>Dice</Breadcrumb.Item>
      </Breadcrumb>
      <div
        className="site-layout-background"
        style={{
          padding: 24,
          minHeight: 565,
        }}
      >
        {children}
      </div>
    </Content>
    <Footer
      style={{
        textAlign: "center",
      }}
    >
      Project IFood (Machine Learning) 2/2022
    </Footer>
  </Layout>
);

export default MainLayout;
