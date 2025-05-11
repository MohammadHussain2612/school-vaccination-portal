/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Table, Button, Input, Form, Modal, message, DatePicker, InputNumber } from 'antd';
import axios from 'axios';
import moment from 'moment';

const ManageDrives = () => {
  const [drives, setDrives] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingDrive, setEditingDrive] = useState(null);

  useEffect(() => {
    fetchDrives();
  }, []);

  const fetchDrives = async () => {
    setLoading(true);
    const token = localStorage.getItem('authToken');
    if (!token) {
      message.error('No authentication token found');
      setLoading(false);
      return;
    }
    try {
      const response = await axios.get('http://localhost:5000/api/vaccination-drives', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      setDrives(response.data);
    } catch (error) {
      message.error('Failed to fetch drives');
    } finally {
      setLoading(false);
    }
  };

  const handleAddEditDrive = async (values) => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      message.error('No authentication token found');
      return;
    }
    const formattedValues = {
      ...values,
      applicableClasses: values.applicableClasses.split(',').map(cls => cls.trim()),
    };
    try {
      if (editingDrive) {
        await axios.put(`http://localhost:5000/api/vaccination-drives/${editingDrive._id}`, formattedValues, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        message.success('Drive updated successfully');
      } else {
        await axios.post('http://localhost:5000/api/vaccination-drives', formattedValues, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        message.success('Drive added successfully');
      }
      fetchDrives();
      setIsModalVisible(false);
    } catch (error) {
      message.error('Failed to save drive');
    }
  };

  const handleDeleteDrive = async (id) => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      message.error('No authentication token found');
      return;
    }
    try {
      await axios.delete(`http://localhost:5000/api/vaccination-drives/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      message.success('Drive deleted successfully');
      fetchDrives();
    } catch (error) {
      message.error('Failed to delete drive');
    }
  };

  const disabledDate = (current) => {
    return current && current < moment().add(15, 'days').endOf('day');
  };

  const columns = [
    {
      title: 'Vaccine Name',
      dataIndex: 'vaccineName',
      key: 'vaccineName',
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      render: (date) => moment(date).format('YYYY-MM-DD'),
    },
    {
      title: 'Available Doses',
      dataIndex: 'availableDoses',
      key: 'availableDoses',
    },
    {
      title: 'Applicable Classes',
      dataIndex: 'applicableClasses',
      key: 'applicableClasses',
      render: (classes) => classes.join(', '),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <>
          <Button
            onClick={() => {
              setEditingDrive(record);
              setIsModalVisible(true);
            }}
            disabled={new Date(record.date) < new Date()}
            style={{ marginRight: 10 }}
          >
            Edit
          </Button>
          <Button danger onClick={() => handleDeleteDrive(record._id)}>Delete</Button>
        </>
      ),
    },
  ];

  return (
    <div style={{ margin: 30, padding: 30 }}>
      <h2>Manage Vaccination Drives</h2>
      <Button type="primary" onClick={() => { setEditingDrive(null); setIsModalVisible(true); }} style={{ marginBottom: 20 }}>
        Add Drive
      </Button>
      <Table
        columns={columns}
        dataSource={drives}
        loading={loading}
        rowKey="_id"
        style={{ marginTop: 20 }}
      />
      <Modal
        title={editingDrive ? 'Edit Vaccination Drive' : 'Add Vaccination Drive'}
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <Form
          initialValues={{
            vaccineName: editingDrive ? editingDrive.vaccineName : '',
            date: editingDrive ? moment(editingDrive.date) : null,
            availableDoses: editingDrive ? editingDrive.availableDoses : 0,
            applicableClasses: editingDrive ? editingDrive.applicableClasses.join(', ') : '',
          }}
          onFinish={handleAddEditDrive}
          layout="vertical"
        >
          <Form.Item name="vaccineName" label="Vaccine Name" rules={[{ required: true, message: 'Please input the vaccine name!' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="date" label="Date" rules={[{ required: true, message: 'Please select the date!' }]}>
            <DatePicker format="YYYY-MM-DD" disabledDate={disabledDate} />
          </Form.Item>
          <Form.Item name="availableDoses" label="Available Doses" rules={[{ required: true, message: 'Please input the number of doses!' }]}>
            <InputNumber min={0} />
          </Form.Item>
          <Form.Item name="applicableClasses" label="Applicable Classes" rules={[{ required: true, message: 'Please input the applicable classes!' }]}>
            <Input placeholder="e.g., 10th Grade, 11th Grade" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              {editingDrive ? 'Update' : 'Add'}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ManageDrives;
