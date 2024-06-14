import React, { useEffect, useState } from 'react'
import axios from 'axios';
import InputField from '../../../../InputField';
import { Table, Select, Button, Dropdown, Menu } from 'antd';
import { EllipsisOutlined, EditOutlined } from '@ant-design/icons';
import { MdDeleteOutline } from "react-icons/md"

const Lunch = () => {
    const [packageVisible, setPackageVisible] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [currentRecord, setCurrentRecord] = useState(null);
    const [foodType, setFoodType] = useState([])
    const [appetizers, setAppetizers] = useState([]);
    const [mainEntries, setMainEntries] = useState([]);
    const [desserts, setDesserts] = useState([]);
    const [teaCoffe, setTeaCoffe] = useState([]);
    const [juicesDrinks, setJuicesDrinks] = useState([]);

    const [formData, setFormData] = useState({
        foodType: 'Lunch',
        packages: [
        {
            name: '',
            // breakFastImage: null,
            descriptions: '',
            appetizers: [],
            mainEntries: [],
            desserts: [],
            teaCoffe: [],
            juicesDrinks: [],
        },
        ],
    });

    // const handleArrayChange = (e, arrayName, index) => {
    //     const { value } = e.target;
    //     setFormData((prevFormData) => {
    //       const newArray = [...prevFormData.packages[0][arrayName]];
    //       newArray[index] = value;
    //       return {
    //         ...prevFormData,
    //         packages: [
    //           {
    //             ...prevFormData.packages[0],
    //             [arrayName]: newArray,
    //           },
    //         ],
    //       };
    //     });
    //   };

    useEffect(() => {
        const fetchPackagesData = async () => {
        try {
            const appetizerResponse = await axios.get('http://localhost:8080/api/v1/Appetizers/get-appetizer');
            setAppetizers(appetizerResponse.data.appetizerObj);

            const mainEntriesResponse = await axios.get('http://localhost:8080/api/v1/MainEntries/get-main-entries');
            setMainEntries(mainEntriesResponse.data.mainEntriesObj);

            const dessertResponse = await axios.get('http://localhost:8080/api/v1/Dessert/get-dessert');
            setDesserts(dessertResponse.data.dessertObj);

            const teaCoffeResponse = await axios.get('http://localhost:8080/api/v1/TeaCoffee/get-tea-coffee');
            setTeaCoffe(teaCoffeResponse.data.teaCoffeObj);

            const juicesDrinksResponse = await axios.get('http://localhost:8080/api/v1/JuicesDrinks/get-juices-drinks');
            setJuicesDrinks(juicesDrinksResponse.data.juiceDrinkObj);

            const foodTypeResponse = await axios.get('http://localhost:8080/api/v1/FoodType/get-food-type')
            console.log(foodTypeResponse.data.foodTypeObj)
            setFoodType(foodTypeResponse.data.foodTypeObj)

        } catch (error) {
            console.error('Error fetching data:', error);
        }
        };

        fetchPackagesData();
    }, []);

    const deleteLunch = async (id) => {
        try {
        const response = await axios.delete(`http://localhost:8080/api/v1/FoodType/delete-food-type/${id}`);
        console.log(response.status);
        if (response.status === 200) {
        alert("Lunch Package Deleted");
        setFoodType(prevFoodType => prevFoodType.filter(item => item._id !== id));
        }
        } catch (error) {
        console.error("Error Deleting Data", error);
        }
    };


    const handleMenuClick = (record, key) => {
        if (key === 'edit') {
        setIsEditing(true);
        setCurrentRecord(record);
        setPackageVisible(true)
    
        // Pre-fill the form with the current record's data
        setFormData({
            foodType: record.foodType,
            packages: [{
            name: record.name,
            descriptions: record.descriptions || '',
            appetizers: record.appetizers || [],
            mainEntries: record.mainEntries || [],
            desserts: record.desserts || [],
            teaCoffe: record.teaCoffe || [],
            juicesDrinks: record.juicesDrinks || [],
            }],
        });
        } else if (key === 'delete') {
        deleteLunch(record._id);
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

    const handlePackageName = (e) => {
        const { value } = e.target;
        setFormData((prevFormData) => ({
        ...prevFormData,
        packages: [{
            ...prevFormData.packages[0],
            name: value,
        }],
        }));
    };

    // const handleImageChange = (e) => {
    //     const file = e.target.files[0];
    //     setFormData((prevFormData) => ({
    //       ...prevFormData,
    //       packages: [
    //         {
    //           ...prevFormData.packages[0],
    //           breakFastImage: file,
    //         },
    //       ],
    //     }));
    // };

    const handleDescriptions = (e) => {
        const {value} = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            packages: [{
                ...prevFormData.packages[0],
                descriptions: value,
            }]
        }))
    }

    const handleAppetizerPackage = (value) => {
        const selectedAppetizers = value.map(name =>
        appetizers.find(item => item.name === name)
        );
        setFormData((prevFormData) => ({
        ...prevFormData,
        packages: [{
            ...prevFormData.packages[0],
            appetizers: selectedAppetizers,
        }],
        }));
    };

    const handleMainEntriesPackage = (value) => {
        const selectedMainEntries = value.map(name =>
        mainEntries.find(item => item.name === name)
        );
        setFormData((prevFormData) => ({
        ...prevFormData,
        packages: [{
            ...prevFormData.packages[0],
            mainEntries: selectedMainEntries,
        }],
        }));
    };

    const handleDessertPackage = (value) => {
        const selectedDesserts = value.map(name =>
        desserts.find(item => item.name === name)
        );
        setFormData((prevFormData) => ({
        ...prevFormData,
        packages: [{
            ...prevFormData.packages[0],
            desserts: selectedDesserts,
        }],
        }));
    };

    const handleTeaCoffePackage = (value) => {
        const selectedTeaCoffe = value.map(name =>
        teaCoffe.find(item => item.name === name)
        );
        setFormData((prevFormData) => ({
        ...prevFormData,
        packages: [{
            ...prevFormData.packages[0],
            teaCoffe: selectedTeaCoffe,
        }],
        }));
    };

    const handleJuicesDrinksPackage = (value) => {
        const selectedJuicesDrinks = value.map(name =>
        juicesDrinks.find(item => item.name === name)
        );
        setFormData((prevFormData) => ({
        ...prevFormData,
        packages: [{
            ...prevFormData.packages[0],
            juicesDrinks: selectedJuicesDrinks,
        }],
        }));
    };

    useEffect(() => {
        console.log(formData)
    }, [formData])

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Form Data:', formData);
        try {
        if (isEditing && currentRecord) {
            const response = await axios.put(`http://localhost:8080/api/v1/FoodType/update-food-type/${currentRecord._id}`, formData);
            alert("Food Type Updated");
            console.log("Food Type", response);
        } else {
            const response = await axios.post('http://localhost:8080/api/v1/FoodType/add-food-type', formData);
            alert("Food Type Added");
            console.log("Food Type", response);
        }
    
        // Refresh the page after successful submission
        window.location.reload();
        } catch (error) {
        console.error("error Adding/Updating Food Type", error);
        }
    };

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    
    //     const formDataToSubmit = new FormData();
    //     formDataToSubmit.append('foodType', formData.foodType);
    //     formDataToSubmit.append('name', formData.packages[0].name);
    //     formDataToSubmit.append('descriptions', formData.packages[0].descriptions);
    
    //     if (formData.packages[0].breakFastImage) {
    //       formDataToSubmit.append('breakFastImage', formData.packages[0].breakFastImage);
    //     }
    
    //     const arraysToAppend = ['appetizers', 'mainEntries', 'desserts', 'teaCoffe', 'juicesDrinks'];
    //     arraysToAppend.forEach((arrayName) => {
    //       formData.packages[0][arrayName].forEach((item, index) => {
    //         formDataToSubmit.append(`${arrayName}[${index}]`, item);
    //       });
    //     });
    
    //     try {
    //       const response = await axios.post('http://localhost:8080/api/v1/FoodType/add-food-type', formDataToSubmit, {
    //         headers: {
    //           'Content-Type': 'multipart/form-data',
    //         },
    //       });
    //       alert('Food Type Added');
    //       console.log('Food Type', response);
    //       window.location.reload();
    //     } catch (error) {
    //       console.error('Error Adding Food Type', error);
    //     }
    // };

    const columns = [
        {
            title: 'Image',
            dataIndex: 'image',
            key: 'image',
            render: (img) => <img src={foodType.packages ? foodType.packages : img } height={25} width={25} alt='img' />
          },
        {
        title: 'Package',
        dataIndex: 'name',
        key: 'name',
        render: (text) => <span>{text}</span>,
        },
        {
        title: 'Package Cost',
        dataIndex: 'cost',
        key: 'cost',
        render: (text) => <span>{text}</span>,
        },
        {
        title: 'Description',
        dataIndex: 'description',
        key: 'description',
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

// Function to sum costs in an array of items
    function sumCosts(items) {
        return items.reduce((acc, item) => {
        // Check if item and item.cost are not null and if item.cost is a valid number
        if (item && item.cost !== null && !isNaN(parseFloat(item.cost))) {
            return acc + parseFloat(item.cost);
        }
        return acc;
        }, 0);
    }
  
    function calculateTotalCost(pkg) {
        let totalCost = 0;
    
        // Sum costs from appetizers
        if (pkg.appetizers && pkg.appetizers.length > 0) {
        totalCost += sumCosts(pkg.appetizers);
        }
    
        // Sum costs from mainEntries
        if (pkg.mainEntries && pkg.mainEntries.length > 0) {
        totalCost += sumCosts(pkg.mainEntries);
        }
    
        // Sum costs from desserts
        if (pkg.desserts && pkg.desserts.length > 0) {
        totalCost += sumCosts(pkg.desserts);
        }
    
        // Sum costs from teaCoffe
        if (pkg.teaCoffe && pkg.teaCoffe.length > 0) {
        totalCost += sumCosts(pkg.teaCoffe);
        }
    
        // Sum costs from juicesDrinks
        if (pkg.juicesDrinks && pkg.juicesDrinks.length > 0) {
        totalCost += sumCosts(pkg.juicesDrinks);
        }
    
        // Check if totalCost is a valid number
        if (isNaN(totalCost)) {
        totalCost = 0;
        }
    
        return totalCost;
    }

    const data = foodType.flatMap((item, index) => {
        if (item.foodType === "Lunch" || item.foodType === 'lunch' || item.foodType === 'LUNCH') {
        return item.packages.map((pkg, pkgIndex) => {
            const totalCost = calculateTotalCost(pkg);
    
            return {
            key: `${index}-${pkgIndex}`,
            _id: item._id,
            name: pkg.name,
            cost: totalCost.toFixed(2), 
            description: pkg.descriptions,
            image: pkg.breakFastImage
            };
        });
        } else {
        return []; 
        }
    });

    const customLocale = {
        emptyText: 'No Packages are Added',
    };

    const addPackages = () => {
        setPackageVisible(!packageVisible);
    };

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
                <span>Lunch</span>
            </div>
        <div style={{width: '100%'}}>
            <Table columns={columns} dataSource={data} locale={customLocale} pagination={foodType.length > 5 ? { pageSize: 5 } : false} />
        </div>
            <div style={{width: '100%', display: 'flex', justifyContent: 'end', marginTop: '10px', marginBottom: '10px'}}>
                <Button type="primary" htmlType="submit"
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
                {packageVisible ? "Hide Packages" : "Add Packages"}
                </Button>
            </div>
        {packageVisible && <div style={{width: '100%', padding: '10px 25px'}}>
            {/* <h2 className="text-2xl font-bold mb-6">{isEditing ? formData.packages.name : 'Add Food Package'}</h2> */}
            <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                <div style={{width: '100%', display: 'flex', flexDirection: 'column'}}>
                <div style={{width: '100%', display: 'flex', gap: '15px'}}>
                    <div style={{width: '33%' }}>
                        <label style={{ display: 'block', marginBottom: '5px' }}>Package Name</label>
                        <InputField
                        type="text"
                        placeholder="Enter Package Name"
                        value={formData.packages[0].name}
                        onChange={handlePackageName}
                        required
                        style={{ width: '100%' }}
                        />
                    </div>
                    <div style={{ width: '33%' }}>
                        <label style={{ display: 'block', marginBottom: '5px' }}>Descriptions</label>
                        <InputField
                        type="text"
                        placeholder="Enter Descriptions"
                        value={formData.packages[0].descriptions}
                        onChange={handleDescriptions}
                        style={{ width: '100%' }}
                        />
                    </div>
                    <div style={{ width: '33%' }}>
                        <label style={{ display: 'block', marginBottom: '5px' }}>Descriptions</label>
                        <InputField
                        type="file"
                        name="breakFastImage"
                        accept="image/*"
                        // onChange={handleImageChange}
                        style={{ width: '100%' }}
                        />
                    </div>
                    
                </div>
                <div style={{width: '100%', display: 'flex', gap: '15px'}}>
                    <div style={{ width: '33%' }}>
                        <label style={{ display: 'block', marginBottom: '5px' }}>Appetizers</label>
                        <Select
                        mode="multiple"
                        placeholder="Select Appetizers"
                        value={formData.packages[0].appetizers.map(item => item.name)}
                        onChange={handleAppetizerPackage}
                        style={{ width: '100%' }}
                        >
                        {appetizers.map((appetizer) => (
                            <Select.Option key={appetizer._id} value={appetizer.name}>
                            {appetizer.name}
                            </Select.Option>
                        ))}
                        </Select>
                    </div>
                    <div style={{ width: '33%' }}>
                        <label style={{ display: 'block', marginBottom: '5px' }}>Main Entries</label>
                        <Select
                        mode="multiple"
                        placeholder="Select Main Entries"
                        value={formData.packages[0].mainEntries.map(item => item.name)}
                        onChange={handleMainEntriesPackage}
                        style={{ width: '100%' }}
                        >
                        {mainEntries.map((entry) => (
                            <Select.Option key={entry._id} value={entry.name}>
                            {entry.name}
                            </Select.Option>
                        ))}
                        </Select>
                    </div>
                    <div style={{ width: '33%' }}>
                        <label style={{ display: 'block', marginBottom: '5px' }}>Desserts</label>
                        <Select
                        mode="multiple"
                        placeholder="Select Desserts"
                        value={formData.packages[0].desserts.map(item => item.name)}
                        onChange={handleDessertPackage}
                        style={{ width: '100%' }}
                        >
                        {desserts.map((dessert) => (
                            <Select.Option key={dessert._id} value={dessert.name}>
                            {dessert.name}
                            </Select.Option>
                        ))}
                        </Select>
                    </div>
                    
                </div>
                <div style={{width: '100%', display: 'flex', gap: '15px'}}>
                    <div style={{ width: '33%' }}>
                        <label style={{ display: 'block', marginBottom: '5px' }}>Tea/Coffee</label>
                        <Select
                        mode="multiple"
                        placeholder="Select Tea/Coffee"
                        value={formData.packages[0].teaCoffe.map(item => item.name)}
                        onChange={handleTeaCoffePackage}
                        style={{ width: '100%' }}
                        >
                        {teaCoffe.map((tea) => (
                            <Select.Option key={tea._id} value={tea.name}>
                            {tea.name}
                            </Select.Option>
                        ))}
                        </Select>
                    </div>
                    <div style={{ width: '33%', marginTop: '10px' }}>
                        <label style={{ display: 'block', marginBottom: '5px' }}>Juices/Drinks</label>
                        <Select
                        mode="multiple"
                        placeholder="Select Juices/Drinks"
                        value={formData.packages[0].juicesDrinks.map(item => item.name)}
                        onChange={handleJuicesDrinksPackage}
                        style={{ width: '100%' }}
                        >
                        {juicesDrinks.map((juice) => (
                            <Select.Option key={juice._id} value={juice.name}>
                            {juice.name}
                            </Select.Option>
                        ))}
                        </Select>
                    </div>
                </div>
            <div style={{width: '100%', display: 'flex', justifyContent: 'end', marginTop: '10px', marginBottom: '10px'}}>
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
                {isEditing ? 'Update' : 'Proceed'}
                </Button>
            </div>
            </div>
            </form>
            </div>}
        </div>
        </>
    );
}

export default Lunch