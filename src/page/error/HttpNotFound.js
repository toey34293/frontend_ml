import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Result } from 'antd'

const HttpNotFound = () => {
    return (
        <Result
            status="404"
            title="404 Page not found"
            subTitle="หน้าที่คุณกำลังมองหาอาจถูกลบ เปลี่ยนชื่อ หรือไม่สามารถเข้าถึงได้ชั่วคราว"
            extra={
                <Link to="/">
                    <Button type="primary">กลับสู่หน้าหลัก</Button>
                </Link>
            }
        />
    )
}

export default HttpNotFound
