import { useEffect, useState } from "react";
import { Button, Descriptions, Image, Modal, Table } from "antd";
import api from "../../config/axios";
import { toast } from "react-toastify";

const ManageTemplate = ({ columns, DescriptionsForm, path, idKey }) => {
  const [datas, setDatas] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const tableColumns = [
    ...columns,
    {
      title: "Detail",
      dataIndex: idKey,
      key: idKey,
      render: (idKey, record) => (
        <Button type="primary" onClick={() => showDetailRecord(record)}>
          Detail
        </Button>
      ),
    },
    {
      title: "Action",
      dataIndex: idKey,
      key: idKey,
      render: (idKey) => (
        <Button type="danger" onClick={() => handleDelete(idKey)}>
          Delete
        </Button>
      ),
    },
  ];

  const fetchData = async () => {
    try {
      const response = await api.get(path);
      setDatas(response.data);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const showDetailRecord = (record) => {
    setSelectedRecord(record);
    setShowModal(true);
  };

  const handleDelete = async (idKey) => {
    try {
      const response = await api.delete(`/${path}/${idKey}`);
      toast.success("Delete Successfully");
      fetchData();
    } catch (error) {
      toast.error("Failed to delete");
      console.log(error);
    }
  };

  return (
    <div>
      <Modal
        title="Detail"
        open={showModal}
        onCancel={() => setShowModal(false)}
        onOk={() => setShowModal(false)}
      >
        {selectedRecord && (
          <DescriptionsForm record={selectedRecord}></DescriptionsForm>
        )}
      </Modal>
      <Table dataSource={datas} columns={tableColumns}></Table>
    </div>
  );
};

export default ManageTemplate;
