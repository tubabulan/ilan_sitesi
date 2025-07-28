import React, { useState } from 'react';
import {
  Card, Form, Input, Button, Upload, Row, Col, DatePicker, Select, Divider, message, Descriptions
} from 'antd';
import { UploadOutlined, LinkedinOutlined, GithubOutlined } from '@ant-design/icons';

const { Option } = Select;

function Profile() {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [submittedData, setSubmittedData] = useState(null);

  const handleSubmit = (values) => {
    const formattedValues = {
      ...values,
      birthDate: values.birthDate ? values.birthDate.format('YYYY-MM-DD') : undefined,
      profilePhoto: fileList.length > 0 ? fileList[0].name : undefined,
    };

    console.log('Profil Bilgileri:', formattedValues);
    setSubmittedData(formattedValues);
    message.success('Profil bilgileriniz başarıyla kaydedildi!');
  };

  const handleUploadChange = ({ fileList }) => {
    setFileList(fileList.slice(-1));
  };

  return (
    <div style={{ maxWidth: 900, margin: '40px auto' }}>
      <Card title="Profil Bilgilerim" bordered={false}>
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={{ gender: 'Kadın' }}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Ad"
                name="firstName"
                rules={[{ required: true, message: 'Adınızı girin' }]}
              >
                <Input placeholder="Adınız" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Soyad"
                name="lastName"
                rules={[{ required: true, message: 'Soyadınızı girin' }]}
              >
                <Input placeholder="Soyadınız" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="E-posta"
                name="email"
                rules={[{ required: true, type: 'email', message: 'Geçerli e-posta girin' }]}
              >
                <Input placeholder="ornek@mail.com" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Telefon" name="phone">
                <Input placeholder="05xx xxx xx xx" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Doğum Tarihi" name="birthDate">
                <DatePicker style={{ width: '100%' }} format="YYYY-MM-DD" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Cinsiyet" name="gender">
                <Select>
                  <Option value="Kadın">Kadın</Option>
                  <Option value="Erkek">Erkek</Option>
                  <Option value="Belirtmek istemiyorum">Belirtmek istemiyorum</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Form.Item label="Meslek" name="job">
            <Input placeholder="Frontend Developer, Backend Developer..." />
          </Form.Item>

          <Form.Item label="Şehir" name="city">
            <Input placeholder="İstanbul, Ankara, İzmir..." />
          </Form.Item>

          <Form.Item label="Hakkımda" name="bio">
            <Input.TextArea rows={4} placeholder="Kendinizden bahsedin..." />
          </Form.Item>

          <Divider>Sosyal Medya</Divider>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label={<><LinkedinOutlined /> LinkedIn</>} name="linkedin">
                <Input placeholder="https://linkedin.com/in/kullanici" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label={<><GithubOutlined /> GitHub</>} name="github">
                <Input placeholder="https://github.com/kullanici" />
              </Form.Item>
            </Col>
          </Row>

          <Divider>Profil Fotoğrafı</Divider>

          <Form.Item label="Fotoğraf Yükle" name="profilePhoto">
            <Upload
              fileList={fileList}
              beforeUpload={() => false}
              onChange={handleUploadChange}
              accept="image/*"
              maxCount={1}
            >
              <Button icon={<UploadOutlined />}>Fotoğraf Seç</Button>
            </Upload>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Kaydet
            </Button>
          </Form.Item>
        </Form>
      </Card>

      {submittedData && (
        <Card title="Kaydedilen Profil Bilgileri" style={{ marginTop: 20 }} bordered={false}>
          <Descriptions bordered column={{ xxl: 2, xl: 2, lg: 2, md: 1, sm: 1, xs: 1 }}>
            <Descriptions.Item label="Ad">{submittedData.firstName}</Descriptions.Item>
            <Descriptions.Item label="Soyad">{submittedData.lastName}</Descriptions.Item>
            <Descriptions.Item label="E-posta">{submittedData.email}</Descriptions.Item>
            <Descriptions.Item label="Telefon">{submittedData.phone || '-'}</Descriptions.Item>
            <Descriptions.Item label="Doğum Tarihi">{submittedData.birthDate || '-'}</Descriptions.Item>
            <Descriptions.Item label="Cinsiyet">{submittedData.gender || '-'}</Descriptions.Item>
            <Descriptions.Item label="Meslek">{submittedData.job || '-'}</Descriptions.Item>
            <Descriptions.Item label="Şehir">{submittedData.city || '-'}</Descriptions.Item>
            <Descriptions.Item label="Hakkımda" span={2}>{submittedData.bio || '-'}</Descriptions.Item>
            <Descriptions.Item label="LinkedIn" span={2}>
              {submittedData.linkedin ? (
                <a href={submittedData.linkedin} target="_blank" rel="noopener noreferrer">
                  {submittedData.linkedin}
                </a>
              ) : '-'}
            </Descriptions.Item>
            <Descriptions.Item label="GitHub" span={2}>
              {submittedData.github ? (
                <a href={submittedData.github} target="_blank" rel="noopener noreferrer">
                  {submittedData.github}
                </a>
              ) : '-'}
            </Descriptions.Item>
            <Descriptions.Item label="Profil Fotoğrafı" span={2}>
              {submittedData.profilePhoto ? submittedData.profilePhoto : '-'}
            </Descriptions.Item>
          </Descriptions>
        </Card>
      )}
    </div>
  );
}

export default Profile;
