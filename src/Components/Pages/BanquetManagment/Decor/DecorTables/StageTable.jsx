import React, { useEffect, useState } from 'react'
import { Space, Table, Menu, Dropdown } from 'antd';
import { EllipsisOutlined, EditOutlined } from '@ant-design/icons';
import { MdDeleteOutline } from "react-icons/md"
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const StageTable = () => {

    const [stageData, setStageData] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchStage = async() => {
            try {
                const response = await axios.get('http://localhost:8080/api/v1/StageDimention/get-all-stage-dimentions')
                console.log(response.data.stageDimention)
                setStageData(response.data.stageDimention);
            } catch (error) {
                console.error("Error Fetching Data", error);
            }
        }
        fetchStage()
    }, [])
    const deleteStage = async (id) => {
      try {
        const response = await axios.delete(`http://localhost:8080/api/v1/StageDimention/delete-stage-dimention/${id}`);
        console.log(response.status);
        if (response.status === 200) {
         alert("Stage Deleted");
          // Update the state to remove the deleted item
          setStageData(stageData.filter(item => item._id !== id));
        }
      } catch (error) {
        console.error("Error Deleting Data", error);
      }
    };
    // console.log(appetizerData[0]._id)
    const handleMenuClick = (record, key) => {
      if (key === 'edit') {
        // navigate(`/update-appetizer/${record._id}`, { state: { record } });
        console.log(record)
      } else if (key === 'delete') {
        deleteStage(record._id);
      }
    };

    const menu = (record) => (
      <Menu  onClick={({ key }) => handleMenuClick(record, key)} style={{ width: "100%", display: "flex", justifyContent: "center", flexDirection: "column", padding: "10px" }}>

          <Menu.Item key="edit" icon={<EditOutlined style={{ fontSize: "18px" }} />}>
          {/* <Link to={`/update-appetizer/${appetizerData._id}`} >Edit</Link> */}
          edit
          </Menu.Item>
          <Menu.Item key="delete" icon={<MdDeleteOutline style={{ fontSize: "18px" }} />}>
              Delete
          </Menu.Item>
      </Menu>
  );

const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Cost',
      dataIndex: 'cost',
      key: 'cost',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Dropdown overlay={() => menu(record)} trigger={['click']} overlayClassName="menu-bg" overlayStyle={{ width: "15%", backgroundColor: "#b78953 !important" }}>
            <div style={{
                boxShadow: "0px 0px 15px -3px rgba(0,0,0,0.1)", borderRadius: "5px", cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center", height: "30px", width: "30px"
            }}>

                <EllipsisOutlined size={45} />
            </div>
        </Dropdown>
      ),
    },
  ];
  
  const data = stageData.map((item, index) => ({
    key: index,
    _id: item._id,
    name: item.name,
    cost: item.cost,
  }));



  return (
    <div style={{
        width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'start', justifyContent: 'center',
        flexWrap: 'wrap', backgroundColor: '#fff', boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px', 
        padding: '10px 25px', borderRadius: '4px', marginBottom: '23px'
    }}>
        <div style={{
                        marginBottom: '20px', marginTop: '10px', fontFamily: 'poppins', color: '#73787c',
                        fontWeight: '600'
                    }}>
            <span>Stage Dimention</span>
        </div>
        <div style={{width: '100%'}}>
            <Table columns={columns} dataSource={data} />
        </div>
    </div>
  )
}

export default StageTable