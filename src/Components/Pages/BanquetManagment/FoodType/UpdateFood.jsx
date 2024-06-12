import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import InputField from '../../../InputField'
import Packages from './Packages'
import { Button } from 'antd'
import { Select, Space } from 'antd';
import './module.FoodType.css'
import { Link } from 'react-router-dom'

const UpdateFood = () => {
    const {id} = useParams()
    const [appetizers, setAppetizers] = useState([]);
    const [mainEntries, setMainEntries] = useState([]);
    const [desserts, setDesserts] = useState([]);;
    const [teaCoffe, setTeaCoffe] = useState([]);
    const [juicesDrinks, setJuicesDrinks] = useState([])
    const [formData, setFormData] = useState({
        foodType: '',
        value: '', 
        packages: [
            {
                name: '', 
                appetizers: null,
                mainEntries: null,
                desserts: null,
                teaCoffe: null,
                juicesDrinks: null
            }
        ]
    });
    useEffect(() => {
        const fetchSingleFoodType = async() => {
            const response = await axios.get(`http://localhost:8080/api/v1/FoodType/get-single-food/${id}`)
            // console.log(response.data.foodTypeObj)
            setFormData(response.data.foodTypeObj)
        }
        fetchSingleFoodType()
        const fetchPackagesData = async() => {
            // Appetizer
            const Appetizer_Response = await axios.get('http://localhost:8080/api/v1/Appetizers/get-appetizer');
            setAppetizers(Appetizer_Response.data.appetizerObj)
      
            // Main Entries
            const Main_Entries_Response = await axios.get('http://localhost:8080/api/v1/MainEntries/get-main-entries');
            setMainEntries(Main_Entries_Response.data.mainEntriesObj)
      
            // Desserts
            const Dessert_Response = await axios.get('http://localhost:8080/api/v1/Dessert/get-dessert');
            setDesserts(Dessert_Response.data.dessertObj)
      
            // Tea Coffe Request
            const teaCoffe_Response = await axios.get('http://localhost:8080/api/v1/TeaCoffee/get-tea-coffee');
            setTeaCoffe(teaCoffe_Response.data.teaCoffeObj)
      
            // Juices Drinks
            const juices_Drinks_Response = await axios.get('http://localhost:8080/api/v1/JuicesDrinks/get-juices-drinks');
            setJuicesDrinks(juices_Drinks_Response.data.juiceDrinkObj)
            
      
          }
          fetchPackagesData()
    }, [])
    const handleFoodType = (e) => {
        const { value } = e.target;
    
        setFormData(prevFormData => ({
          ...prevFormData,
          foodType: value,
        //   value: value.toLowerCase()
        }));
      };
      const handlePackageName = (e) => {
        const { value } = e.target;
    
        setFormData(prevFormData => ({
          ...prevFormData,
          packages: prevFormData.packages.map((pkg, index) =>
            index === 0 ? { ...pkg, name: value } : pkg
          )
        }));
      };

      const handleAppetizerPackage = (value, option) => {
        // Find the selected appetizer object based on the selected value
        const selectedAppetizer = appetizers.find(item => item.name === value);
    
        if(selectedAppetizer){
    
        const updatedAppetizer = {...selectedAppetizer, constant: 'true'}
        // Update the form data with the selected appetizer object
        setFormData(prevFormData => ({
          ...prevFormData,
          packages: prevFormData.packages.map(pkg =>
            pkg.id === updatedAppetizer.packageId ? { ...pkg, appetizers: updatedAppetizer } : pkg
          )
        }));
      }
      };
    
      const handleMainEntriesPackage = (value, option) => {
        // Find the selected appetizer object based on the selected value
        const selectedMainEntries = mainEntries.find(item => item.name === value);
    
        if(selectedMainEntries){
          const updatedMainEntries = {...selectedMainEntries, constant: 'true'};
        
    
        // Update the form data with the selected appetizer object
        setFormData(prevFormData => ({
          ...prevFormData,
          packages: prevFormData.packages.map(pkg =>
            pkg.id === updatedMainEntries.packageId ? { ...pkg, mainEntries: updatedMainEntries } : pkg
          )
        }));
        // console.log(updatedMainEntries)
      }
      };
    
      const handledessertPackage = (value, option) => {
        // Find the selected appetizer object based on the selected value
        const selectedDessert = desserts.find(item => item.name === value);
    
        if(selectedDessert){
          const updatedDessert = {...selectedDessert, constant: 'true'};
        
    
        // Update the form data with the selected appetizer object
        setFormData(prevFormData => ({
          ...prevFormData,
          packages: prevFormData.packages.map(pkg =>
            pkg.id === updatedDessert.packageId ? { ...pkg, desserts: updatedDessert } : pkg
          )
        }));
        // console.log(updatedMainEntries)
      }
      };
    
      const handleTeaCoffePackage = (value, option) => {
        // Find the selected appetizer object based on the selected value
        const selectedTeaCoffe = teaCoffe.find(item => item.name === value);
    
        if(selectedTeaCoffe){
          const updatedTeaCoffe = {...selectedTeaCoffe, constant: 'true'};
        
    
        // Update the form data with the selected appetizer object
        setFormData(prevFormData => ({
          ...prevFormData,
          packages: prevFormData.packages.map(pkg =>
            pkg.id === updatedTeaCoffe.packageId ? { ...pkg, teaCoffe: updatedTeaCoffe } : pkg
          )
        }));
        // console.log(updatedMainEntries)
      }
      };
    
      const handleJuicesDrinksPackage = (value, option) => {
        // Find the selected appetizer object based on the selected value
        const selectedJuicesDrinks = juicesDrinks.find(item => item.name === value);
    
        if(selectedJuicesDrinks){
          const updatedJuicesDrinks = {...selectedJuicesDrinks, constant: 'true'};
        
    
        // Update the form data with the selected appetizer object
        setFormData(prevFormData => ({
          ...prevFormData,
          packages: prevFormData.packages.map(pkg =>
            pkg.id === updatedJuicesDrinks.packageId ? { ...pkg, juicesDrinks: updatedJuicesDrinks } : pkg
          )
        }));
        // console.log(updatedMainEntries)
      }
      };
      const updateFoodType = async(e) => {
        e.preventDefault()
        try {
            const response = await axios.put(`http://localhost:8080/api/v1/FoodType/update-food-type/${id}`, formData)
            alert("Data Updated")
        } catch (error) {
            console.error("Error Updating Food", error)
        }
      }

    useEffect(() => {
        console.log("formObj: ",formData);
      }, [formData]);

  return (
   <div style={{width: '100%', padding: '10px 25px'}}>
    <form onSubmit={updateFoodType} style={{width: '100%'}}>
        <div style={{
            width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'start', justifyContent: 'center',
            flexWrap: 'wrap', backgroundColor: '#fff', boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px', 
            padding: '10px 25px', borderRadius: '4px', marginBottom: '23px'
        }}>
            <div style={{
                marginBottom: '20px', marginTop: '10px', fontFamily: 'poppins', color: '#73787c',
                fontWeight: '600'
            }}>
                <span>Food Type</span>
            </div>
            <div style={{width: '100%'}}>
                    <div style={{width: '100%', display: 'flex', gap: '15px'}}>
                        <InputField
                            label={'Food Type'} 
                            width={'30%'}
                            name={'foodType'}
                            value={formData.foodType}
                            onChange={handleFoodType}
                        />
                        <InputField
                                label={'Package Name'} 
                                width={'30%'}
                                name={'package'}
                                value={formData.packages[0].name}
                                onChange={handlePackageName}
                        />
                    </div>
            </div>
        </div>
        {/* Packages */}
        <div style={{
            width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'start', justifyContent: 'center',
            flexWrap: 'wrap', backgroundColor: '#fff', boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px', 
            padding: '10px 25px', borderRadius: '4px', marginBottom: '23px'
        }}>
            <div style={{
                marginBottom: '20px', marginTop: '10px', fontFamily: 'poppins', color: '#73787c',
                fontWeight: '600'
            }}>
                <span>Packages</span>
            </div>
            <div style={{width: '100%', display: 'flex', flexDirection: 'column', gap: '15px'}}>
                <div style={{width: '100%', display: 'flex', gap: '15px'}}>
                    <div style={{width: '33%'}}>
                    <label
                      style={{
                        marginBottom: 15,
                        fontFamily: 'poppins !important',
                        color: '#73787c',
                        fontWeight: '500',
                      }}
                      className="input-labels"
                    >
                      Appetizers
                    </label>
                    <Space wrap>
                      <Select
                       defaultValue={'appetizers'}
                       onChange={handleAppetizerPackage}
                       options={appetizers.map(item => ({
                        value: item.name,
                        label: item.name
                      }))}
                        style={{marginTop: '5px'}}
                      />
                    </Space>
                    </div>
                    <div style={{width: '33%'}}>
                    <label
                      style={{
                        marginBottom: 15,
                        fontFamily: 'poppins !important',
                        color: '#73787c',
                        fontWeight: '500',
                      }}
                      className="input-labels"
                    >
                      Main Entries
                    </label>
                    <Space wrap>
                      <Select
                        defaultValue="mainEntries"
                        onChange={handleMainEntriesPackage}
                        options={mainEntries.map(item => ({
                          value: item.name,
                          label: item.name
                        }))}
                        style={{marginTop: '5px'}}
                      />
                    </Space>
                    </div>
                    <div style={{width: '33%'}}>
                    <label
                      style={{
                        marginBottom: 15,
                        fontFamily: 'poppins !important',
                        color: '#73787c',
                        fontWeight: '500',
                      }}
                      className="input-labels"
                    >
                      Desserts
                    </label>
                    <Space wrap>
                      <Select
                        defaultValue="Desserts"
                        onChange={handledessertPackage}
                        options={desserts.map(item => ({
                          value: item.name,
                          label: item.name
                        }))}
                        style={{marginTop: '5px'}}
                      />
                    </Space>
                    </div>
                </div>
                <div style={{width: '100%', display: 'flex', gap: '15px'}}>
                    <div style={{width: '33%'}}>
                    <label
                      style={{
                        marginBottom: 15,
                        fontFamily: 'poppins !important',
                        color: '#73787c',
                        fontWeight: '500',
                      }}
                      className="input-labels"
                    >
                      Tea Coffe
                    </label>
                    <Space wrap>
                      <Select
                        defaultValue="teaCoffe"
                        onChange={handleTeaCoffePackage}
                        options={teaCoffe.map(item => ({
                          value: item.name,
                          label: item.name
                        }))}
                        style={{marginTop: '5px'}}
                      />
                    </Space>
                    </div>
                    <div style={{width: '33%'}}>
                    <label
                      style={{
                        marginBottom: 15,
                        fontFamily: 'poppins !important',
                        color: '#73787c',
                        fontWeight: '500',
                      }}
                      className="input-labels"
                    >
                      Juices Drinks
                    </label>
                    <Space wrap>
                      <Select
                        defaultValue="juicesDrinks"
                        onChange={handleJuicesDrinksPackage}
                        options={juicesDrinks.map(item => ({
                          value: item.name,
                          label: item.name
                        }))}
                        style={{marginTop: '5px'}}
                      />
                    </Space>
                    </div>
                </div>
            </div>
        </div>
        
        <div style={{display: 'flex', gap: '15px', justifyContent: 'end', width: '100%'}}>
            <Button type="primary" htmlType="submit" 
                style={{ display: 'inline-block', height: "35px", marginTop: '15px', width: "15%", background: "black", right: '25px', bottom: '15px' }} 
                className="custom-hover-btn">Update</Button>
        </div>
        </form>
   </div>   
  )
}

export default UpdateFood
