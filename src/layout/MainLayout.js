import React from 'react'
import { Affix, Layout } from 'antd'
import { Content, Footer, Header } from 'antd/es/layout/layout'
import { Link } from 'react-router-dom'
import logo from '../asset/img/logo.png'

const MainLayout = ({children}) => {
    return (
        <Layout style={{minHeight: '100vh'}}>
            <Affix>
                <Header
                    style={{
                        display: 'flex',
                        // justifyContent: 'space-between',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '80px',
                        padding: '0 20px 0 20px'
                    }}
                >
                    <Link to="/">
                        <img height={55} alt="logo" src={logo}/>
                    </Link>
                </Header>
            </Affix>
            <Content>
                <div>
                    {children}
                </div>
            </Content>
            <Affix>
                <Footer style={{background: 'rgba(66,56,115,0.43)'}}>
                    Project Cassava Disease Detect of Machine Learning 2/2564 KMUTNB
                </Footer>
            </Affix>
        </Layout>
    )
}
export default MainLayout