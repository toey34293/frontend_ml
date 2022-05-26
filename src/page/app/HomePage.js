import React, { useEffect, useState } from "react";
import MainLayout from "../../layout/MainLayout";
import { InboxOutlined } from "@ant-design/icons";
import { Button, Image, notification, Upload, Spin } from "antd";
import { axios } from "../../config/AxiosConfig";

const { Dragger } = Upload;

const imageType = ["image/jpg", "image/jpeg", "image/png", "image/webp"];

const HomePage = (props) => {
  const [loading, setLoading] = useState(false);
  const [predict, setPredict] = useState(null);
  const [uploadImage, setUploadImage] = useState(null);

  const handleUpload = async ({ file }) => {
    setLoading(true);
    if (file) {
      notification.info({
        message: "Uploading image",
        description: [
          <>
            Upload image can take a couple minute.
            <br />
            Please don't turn off or restart browser.
          </>,
        ],
        placement: "topRight",
        duration: 0,
      });
      try {
        let formData = new FormData();
        formData.append("image", file);
        const { data } = await axios.post("/predict", formData);
        getBase64(file);
        setPredict(data);
      } catch (e) {
        setUploadImage(null);
        setPredict(null);
      }
      notification.destroy();
    }
    setLoading(false);
  };

  const getBase64 = (file) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      setUploadImage(reader.result);
    };
  };

  const beforeUpload = (file) => {
    const fileType = imageType.includes(file.type);
    if (!fileType) {
      notification.warning({
        message: "ประเภทไฟล์ไม่ถูกต้อง",
        description: "ไฟล์ต้องเป็นประเภท JPG, JPEG, PNG และ WEBP เท่านั้น",
      });
    }
    return fileType;
  };

  // const ANS = predict.map((number) => {
  //   return number;
  // });

  return (
    <MainLayout>
      {!uploadImage && !predict ? (
        <Spin spinning={loading}>
          <div className="px-5">
            <Dragger
              name="file"
              action={"./asset/image/upload"}
              beforeUpload={beforeUpload}
              customRequest={handleUpload}
              showUploadList={false}
              disabled={loading}
              className="my-3"
            >
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">
                Click or drag file to this area to upload
              </p>
              <p className="ant-upload-hint">
                Support for a single or bulk upload. Strictly prohibit from
                uploading company data or other band files
              </p>
            </Dragger>
          </div>
        </Spin>
      ) : (
        <div className="text-center">
          <div className="text-center mb-3" style={{ fontSize: "30px" }}>
            This image is likely be
            <div>
              {predict.percent[0] >= 0.8 ? (
                <div>
                  <b className="text-success ">1. {predict.short_name[0]} </b>
                  with a <b className="text-success ">
                    {predict.percent[0]}
                  </b>{" "}
                  percent confidence.
                </div>
              ) : (
                <div>
                  {predict.percent[0] >= 0.4 ? (
                    <div>
                      <b className="text-warning ">
                        1. {predict.short_name[0]}{" "}
                      </b>
                      with a{" "}
                      <b className="text-warning ">{predict.percent[0]}</b>{" "}
                      percent confidence.
                    </div>
                  ) : (
                    <div>
                      <b className="text-danger ">
                        1. {predict.short_name[0]}{" "}
                      </b>
                      with a{" "}
                      <b className="text-danger ">{predict.percent[0]}</b>{" "}
                      percent confidence.
                    </div>
                  )}
                </div>
              )}
            </div>
            <div>
              {predict.percent[1] >= 0.8 ? (
                <div>
                  <b className="text-success ">2. {predict.short_name[1]} </b>
                  with a <b className="text-success ">
                    {predict.percent[1]}
                  </b>{" "}
                  percent confidence.
                </div>
              ) : (
                <div>
                  {predict.percent[1] >= 0.4 ? (
                    <div>
                      <b className="text-warning ">
                        2. {predict.short_name[1]}{" "}
                      </b>
                      with a{" "}
                      <b className="text-warning ">{predict.percent[1]}</b>{" "}
                      percent confidence.
                    </div>
                  ) : (
                    <div>
                      <b className="text-danger ">
                        2. {predict.short_name[1]}{" "}
                      </b>
                      with a{" "}
                      <b className="text-danger ">{predict.percent[1]}</b>{" "}
                      percent confidence.
                    </div>
                  )}
                </div>
              )}
            </div>
            <div>
              {predict.percent[2] >= 0.8 ? (
                <div>
                  <b className="text-success ">3. {predict.short_name[2]} </b>
                  with a <b className="text-success ">
                    {predict.percent[2]}
                  </b>{" "}
                  percent confidence.
                </div>
              ) : (
                <div>
                  {predict.percent[2] >= 0.4 ? (
                    <div>
                      <b className="text-warning ">
                        3. {predict.short_name[2]}{" "}
                      </b>
                      with a{" "}
                      <b className="text-warning ">{predict.percent[2]}</b>{" "}
                      percent confidence.
                    </div>
                  ) : (
                    <div>
                      <b className="text-danger ">
                        3. {predict.short_name[2]}{" "}
                      </b>
                      with a{" "}
                      <b className="text-danger ">{predict.percent[2]}</b>{" "}
                      percent confidence.
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
          <div className="text-center mb-3">
            <Image src={uploadImage} />
          </div>
          <Button
            size="large"
            type="danger"
            className="mb-3"
            onClick={() => {
              setUploadImage(null);
              setPredict(null);
            }}
          >
            CLEAR
          </Button>
        </div>
      )}
    </MainLayout>
  );
};
export default HomePage;
