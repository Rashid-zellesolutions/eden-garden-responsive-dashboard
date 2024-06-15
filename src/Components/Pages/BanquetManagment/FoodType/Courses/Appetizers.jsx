import React, { useEffect, useState } from 'react'
import axios from 'axios';
import InputField from '../../../../InputField';
import { Table, Select, Button, Dropdown, Menu } from 'antd';
import { EllipsisOutlined, EditOutlined } from '@ant-design/icons';
import { MdDeleteOutline } from "react-icons/md"
import DeletePopup from '../../../../DeletePopup';
import { useNavigate } from 'react-router-dom';
import SuccessPopup from '../../../../SuccessPopup';

const Appetizers = () => {
    const [appetizerData, setAppetizerData] = useState([]);
    const [packageVisible, setPackageVisible] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [currentRecord, setCurrentRecord] = useState(null);
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [deleteData, setDeleteData] = useState(null);
    const [successPopupOpen, setSuccessPopupOpen] = useState(false)
    const [successPopupMessage, setSuccessPopupMessage] = useState(false)
    // const [appetizerType, setAppetizerType] = useState([])
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        pacFor: '',
        cost: '',
        appetizerImage: null,
    });

    // Modal 
    const handleOpenDeletePopup = (record) => {
        setDeleteData(record);
        setDeleteModal(true);
    };

    const handleCloseDeletePopup = () => {
        setDeleteModal(false);
        setDeleteData(null);
    };
    const handleCloseSuccessPopup = () => {
        setSuccessPopupOpen(false)
    }

    const navigate = useNavigate();
    useEffect(() => {
        const fetchAppetizers = async () => {
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

    useEffect(() => {
        const fetchAppetizers = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/v1/Appetizers/get-appetizer')
                console.log(response.data.appetizerObj)
                setAppetizerData(response.data.appetizerObj);
            } catch (error) {
                console.error("Error Fetching Data", error);
            }
        }
        if (formSubmitted) {
            fetchAppetizers(); // Fetch data if formSubmitted is true
            setFormSubmitted(false); // Reset formSubmitted to false
        }
    }, [formSubmitted])

    useEffect(() => {
        if (isEditing && currentRecord) {
            setFormData({
                name: currentRecord.name,
                pacFor: currentRecord.pacfor,
                cost: currentRecord.cost,
                appetizerImage: null,
            });
        }
    }, [isEditing, currentRecord]);

    const shouldShowPagination = appetizerData.length > 1;

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

    const handleMenuClick = (record, key) => {
        if (key === 'edit') {
            setIsEditing(true);
            setCurrentRecord(record);
            setPackageVisible(true);
        } else if (key === 'delete') {
            handleOpenDeletePopup(record);
        }
    };

    const handleDeleteService = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/api/v1/Appetizers/delete-appetizer/${id}`);
            console.log('Food Type deleted successfully');
            // fetchTableData(); // Refresh the table data
            // setAppetizerType(prevFoodType => prevFoodType.filter(item => item._id !== id));
            setAppetizerData(appetizerData.filter(item => item._id !== id));
        } catch (error) {
            console.error("Error deleting food type", error);
            console.error('Failed to delete food type');
        }
    };

    const handleDeleteConfirm = () => {
        if (deleteData) {
            handleDeleteService(deleteData._id);
            handleCloseDeletePopup();
        }
    };

    const menu = (record) => (
        <Menu onClick={({ key }) => handleMenuClick(record, key)} style={{ width: "100%", display: "flex", justifyContent: "center", flexDirection: "column", padding: "10px" }}>
            <Menu.Item key="edit" icon={<EditOutlined style={{ fontSize: "18px" }} />}>
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

    const addPackages = () => {
        setPackageVisible(!packageVisible);
    };

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'appetizerImage') {
            setFormData({ ...formData, [name]: files[0] });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formDataToSend = new FormData();
            Object.keys(formData).forEach(key => {
                formDataToSend.append(key, formData[key]);
            });

            if (isEditing && currentRecord) {
                const response = await axios.put(`http://localhost:8080/api/v1/Appetizers/update-appetizer/${currentRecord._id}`, formDataToSend, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                // alert("Appetizer Updated");
                setSuccessPopupOpen(true)
                setSuccessPopupMessage("Data Added")
                setAppetizerData([...appetizerData, response.data]);
            } else {
                const response = await axios.post('http://localhost:8080/api/v1/Appetizers/add-appetizer', formDataToSend, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                // alert("Appetizer Added");
                setSuccessPopupOpen(true)
                setSuccessPopupMessage("Data Added")
                console.log("Appetizer", response);
            }

            setFormSubmitted(true);
            setPackageVisible(false);
            setIsEditing(false);
            setCurrentRecord(null);
            clearForm();
        } catch (error) {
            console.error("Error Adding Appetizer", error);
        }
    };

    const clearForm = () => {
        setFormData({
            name: '',
            pacFor: '',
            cost: '',
            appetizerImage: null,
        });
    };

    useEffect(() => {
        console.log(formData)
    }, [formData])

    return (
        <>
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
                <div style={{ width: '100%' }}>
                    <Table columns={columns} dataSource={data} pagination={shouldShowPagination ? { pageSize: 5 } : false} />
                </div>
                <div style={{ width: '100%', display: 'flex', padding: '0px 10px', justifyContent: 'start', marginTop: '10px', marginBottom: '10px' }}>
                    {packageVisible ? <h3>Add Appetizer</h3> : <Button type="primary" htmlType="submit"
                        style={{
                            display: 'inline-block',
                            height: '35px',
                            width: '20%',
                            background: 'black',
                            marginTop: '20px',
                            right: '0',
                        }}
                        className="custom-hover-btn"
                        onClick={addPackages}
                    >
                        Add Package
                    </Button>}
                    
                </div>
                {packageVisible && (
                    <div style={{ width: '100%', padding: '10px' }}>
                        <form style={{ width: '100%' }} onSubmit={handleSubmit}>
                            <div style={{ width: '100%', display: 'flex', gap: '15px', marginTop: '20px' }}>
                                <InputField
                                    width={'33%'}
                                    label={'Name'}
                                    name="name"
                                    placeholder={'Appetizers Name'}
                                    value={formData.name}
                                    onChange={handleChange}
                                />
                                <InputField
                                    width={'33%'}
                                    label={'PacFor'}
                                    name="pacFor"
                                    placeholder={'Package For'}
                                    value={formData.pacFor}
                                    onChange={handleChange}
                                />
                                <InputField
                                    width={'33%'}
                                    label={'Cost'}
                                    name="cost"
                                    placeholder={'Cost'}
                                    value={formData.cost}
                                    onChange={handleChange}
                                />
                                <InputField
                                    width={'33%'}
                                    label={'Image'}
                                    name="appetizerImage"
                                    type={'file'}
                                    onChange={handleChange}
                                />
                            </div>
                            <div style={{ width: '100%', display: 'flex', justifyContent: 'end', marginTop: '10px', marginBottom: '10px' }}>
                                <Button type="primary" htmlType="submit"
                                    style={{
                                        display: 'inline-block',
                                        height: '35px',
                                        width: '20%',
                                        background: 'black',
                                        right: '0',
                                    }}
                                    className="custom-hover-btn"
                                >
                                    {isEditing ? 'Update' : 'Add Package'}
                                </Button>
                            </div>
                        </form>
                    </div>
                )}
            </div>
            <SuccessPopup isModalOpen={successPopupOpen} handleCancel={handleCloseSuccessPopup} label={successPopupMessage} />
            <DeletePopup 
             isModalOpen={deleteModal}
             handleCancel={handleCloseDeletePopup}
             Delete={handleDeleteConfirm}
             name={deleteData?.foodType}
             setLoading={setLoading}
        />
        </>
    );
}

export default Appetizers;
