import React, { useEffect, useState } from 'react'
import MainLayout from '../../layout/MainLayout'
import { InboxOutlined } from '@ant-design/icons'
import { Button, Image, notification, Upload } from 'antd'
import { axios } from '../../config/AxiosConfig'

const {Dragger} = Upload

const imageType = ['image/jpeg']

const HomePage = (props) => {
    const [loading, setLoading] = useState(false)
    const [predict, setPredict] = useState(null)
    const [uploadImage, setUploadImage] = useState(null)

    const handleUpload = async ({file}) => {
        setLoading(true)
        if (file) {
            notification.info({
                message: 'กำลังอัปโหลดภาพ',
                description: 'การอัปโหลดไฟล์จะใช้เวลาประมาณ 5-10 นาที กรุณาอย่าปิดหรือรีโหลดหน้าเว็บ',
                placement: 'topRight',
                duration: 5,
            })
            try {
                getBase64(file)
                let blob = await fetch(file).then(r => r.blob())
                let formData = new FormData()
                formData.append('file', blob)
                const {data} = await axios.post('/predict', formData)
                setPredict(data.message)
            } catch (e) {
                //handle in interceptor
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
    }

    const beforeUpload = (file) => {
        const fileType = (imageType.includes(file.type))
        if (!fileType) {
            notification.warning({
                message: 'ประเภทไฟล์ไม่ถูกต้อง',
                description: 'ไฟล์ต้องเป็นประเภท JPEG เท่านั้น'
            })
        }
        return fileType
    }

    return (
        <MainLayout>
            {!uploadImage ?
                <div className="px-5">
                    <Dragger
                        name="file"
                        action={'./asset/image/upload'}
                        beforeUpload={beforeUpload}
                        customRequest={handleUpload}
                        showUploadList={false}
                        disabled={loading}
                        className="my-3"
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
                <div className="text-center">
                    <div style={{fontSize:'50px'}}>Predict : {predict}</div>
                    <div className="text-center mb-3">
                        <Image src={uploadImage}/>
                    </div>
                    <Button
                        size="large"
                        type="danger"
                        className="mb-3"
                        onClick={() => {
                            setUploadImage(null)
                            setPredict(null)
                        }}
                    >
                        CLEAR
                    </Button>
                </div>
            }
        </MainLayout>
    )
}
export default HomePage