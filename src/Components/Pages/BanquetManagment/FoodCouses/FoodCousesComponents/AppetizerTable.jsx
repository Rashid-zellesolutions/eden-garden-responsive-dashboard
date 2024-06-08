import React, { useEffect, useState } from 'react'
import { Space, Table, Menu, Dropdown } from 'antd';
import { EllipsisOutlined, EditOutlined } from '@ant-design/icons';
import { MdDeleteOutline } from "react-icons/md"
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const AppetizerTable = () => {

    const [appetizerData, setAppetizerData] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchAppetizers = async() => {
            try {
                const response = await axios.get('http://localhost:8080/api/v1/Appetizers/get-appetizer')
                console.log(response.data.appetizerObj)
                setAppetizerData(response.data.appetizerObj);
            } catch (error) {
                console.error("Error Fetching Data", error);
            }
        }
        fetchAppetizers()
    }, [])
    const deleteAppetizer = async (id) => {
      try {
        const response = await axios.delete(`http://localhost:8080/api/v1/Appetizers/delete-appetizer/${id}`);
        console.log(response.status);
        if (response.status === 200) {
         alert("Appetizer Deleted");
          // Update the state to remove the deleted item
          setAppetizerData(appetizerData.filter(item => item._id !== id));
        }
      } catch (error) {
        console.error("Error Deleting Data", error);
      }
    };
    // console.log(appetizerData[0]._id)
    const handleMenuClick = (record, key) => {
      if (key === 'edit') {
        navigate(`/update-appetizer/${record._id}`, { state: { record } });
        console.log(record)
      } else if (key === 'delete') {
        deleteAppetizer(record._id);
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
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      render: (img) => <img src={appetizerData.appetizersImagePath} height={25} width={25} alt='img' />
    },
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
      title: 'PacFor',
      key: 'pacfor',
      dataIndex: 'pacfor',
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
  
  const data = appetizerData.map((item, index) => ({
    key: index,
    _id: item._id,
    name: item.name,
    cost: item.cost,
    pacfor: item.pacFor,
    img: item.img
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
            <span>Appetizers</span>
        </div>
        <div style={{width: '100%'}}>
            <Table columns={columns} dataSource={data} />
        </div>
    </div>
  )
}

export default AppetizerTable