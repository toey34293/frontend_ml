import React, { useEffect, useState } from 'react'
import MainLayout from '../../layout/MainLayout'
import { InboxOutlined } from '@ant-design/icons'
import { Button, Image, notification, Upload } from 'antd'
import { Axios } from '../../config/AxiosConfig'

const {Dragger} = Upload

const imageType = ['image/jpeg']

const HomePage = (props) => {
    const [loading, setLoading] = useState(false)
    const [uploadImage, setUploadImage] = useState(null)

    const handleUpload = async ({file}) => {
        setLoading(true)
        if (file) {
            try {
                notification.info({
                    message: 'กำลังอัปโหลดภาพ',
                    description: 'การอัปโหลดไฟล์จะใช้เวลาประมาณ 5-10 นาที กรุณาอย่าปิดหรือรีโหลดหน้าเว็บ',
                    placement: 'topRight',
                    duration: 0,
                })
                getBase64(file)

                // const {data} = await Axios.post('')

                notification.destroy()
            } catch (e) {
                //handle error
            }
        }
        setLoading(false)
    }

    const getBase64 = (file) => {
        let reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = function () {
            setUploadImage(reader.result)
        }
        reader.onerror = function (error) {
            console.log('Error: ', error)
        }
    }

    const beforeUpload = (file) => {
        const fileType = (imageType.includes(file.type))
        if (!fileType) {
            notification.warning({
                message: 'ประเภทไฟล์ไม่ถูกต้อง',
                description: 'ไฟล์ต้องเป็นประเภทรูปภาพเท่านั้น'
            })
        }
        return fileType
    }

    return (
        <MainLayout>
            <div className="text-center">
                This is Home Page
            </div>
            {!uploadImage ?
                <div className="px-5">
                    <Dragger
                        name="file"
                        action={'./asset/image/upload'}
                        beforeUpload={beforeUpload}
                        customRequest={handleUpload}
                        showUploadList={false}
                        disabled={loading}
                        className="mb-3"
                    >
                        <p className="ant-upload-drag-icon">
                            <InboxOutlined/>
                        </p>
                        <p className="ant-upload-text">Click or drag file to this area to upload</p>
                        <p className="ant-upload-hint">
                            Support for a single or bulk upload. Strictly prohibit from uploading company data or other
                            band files
                        </p>
                    </Dragger>

                </div>
                :
                <div className='text-center'>
                    <div className='text-center mb-3'>
                        <Image src={uploadImage}/>
                    </div>
                    <Button
                        size='large'
                        type='danger'
                        className='mb-3'
                        onClick={()=>setUploadImage(null)}
                    >
                        CLEAR
                    </Button>
                </div>
            }
        </MainLayout>
    )
}
export default HomePage