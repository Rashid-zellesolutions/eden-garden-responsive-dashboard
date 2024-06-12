import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import InputField from '../../../InputField'
import Packages from './Packages'
import { Button } from 'antd'
import './module.FoodType.css'
import { Link } from 'react-router-dom'

const SingleFoodType = () => {
    const {id} = useParams()
    const navigate = useNavigate()
    const [singleData, setSingleData] = useState([]);
    console.log(id)
    useEffect(() => {
        const fetchSingleFoodType = async() => {
            const response = await axios.get(`http://localhost:8080/api/v1/FoodType/get-single-food/${id}`)
            setSingleData([response.data.foodTypeObj])
            console.log([response.data.foodTypeObj])
            // console.log(singleData[0].packages[0].name)
        }
        fetchSingleFoodType()
    }, [])
    const deleteFoodType = async() => {
        try {
            const response = await axios.delete(`http://localhost:8080/api/v1/FoodType/delete-food-type/${id}`)
            alert("Data Deleted")
            navigate('/BanquetManagment/show-food-data');
        } catch (error) {
            console.log("Error Deleting Data", error);
        }
    }
  return (
   <div style={{width: '100%', padding: '10px 25px'}}>
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
                {singleData.map(food => {
                    return <div style={{width: '100%', display: 'flex', gap: '15px'}}>
                        <InputField
                            label={'Food Type'} 
                            width={'30%'}
                            name={food.foodType}
                            value={food.foodType}
                            readOnly={'readOnly'}
                        />
                        {food.packages.map((items, i) => {
                            return <InputField
                                label={'Package Name'} 
                                width={'30%'}
                                name={items.name}
                                value={items.name}
                                readOnly={'readOnly'}
                            />
                        })}
                    </div>
                })}
            </div>
        </div>
        {/* Appetizers */}
        <div>
            {singleData.map(food => {
                return <div>
                    {food.packages.map((items, i) => {
                        return <Packages 
                                    Namevalue={items.appetizers.name}  
                                    Costvalue={items.appetizers.cost}
                                    pacForvalue={items.appetizers.pacFor}
                                    constantValue={items.appetizers.constant}
                                    heading={'Appetizers'}
                                />
                    })}
                </div>
            })}
        </div>

        {/* Main Entries */}
        <div>
            {singleData.map(food => {
                return <div>
                    {food.packages.map((items, i) => {
                        return <Packages 
                                    Namevalue={items.mainEntries.name}  
                                    Costvalue={items.mainEntries.cost}
                                    pacForvalue={items.mainEntries.pacFor}
                                    constantValue={items.mainEntries.constant}
                                    heading={'Main Entries'}
                                />
                    })}
                </div>
            })}
        </div>

        {/* Desserts */}
        <div>
            {singleData.map(food => {
                return <div>
                    {food.packages.map((items, i) => {
                        return <Packages 
                                    Namevalue={items.desserts.name}  
                                    Costvalue={items.desserts.cost}
                                    pacForvalue={items.desserts.pacFor}
                                    constantValue={items.desserts.constant}
                                    heading={'Desserts'}
                                />
                    })}
                </div>
            })}
        </div>

        {/* Tea Coffe */}
        <div>
            {singleData.map(food => {
                return <div>
                    {food.packages.map((items, i) => {
                        return <Packages 
                                    Namevalue={items.teaCoffe.name}  
                                    Costvalue={items.teaCoffe.cost}
                                    pacForvalue={items.teaCoffe.pacFor}
                                    constantValue={items.teaCoffe.constant}
                                    heading={'Tea Coffe'}
                                />
                    })}
                </div>
            })}
        </div>

        {/* Juices Drinks */}
        <div>
            {singleData.map(food => {
                return <div>
                    {food.packages.map((items, i) => {
                        return <Packages 
                                    Namevalue={items.juicesDrinks.name}  
                                    Costvalue={items.juicesDrinks.cost}
                                    pacForvalue={items.juicesDrinks.pacFor}
                                    constantValue={items.juicesDrinks.constant}
                                    heading={'Juices Drinks'}
                                />
                    })}
                </div>
            })}
        </div>
        <div style={{display: 'flex', gap: '15px', justifyContent: 'end', width: '100%'}}>
            <Button type="primary" htmlType="submit" 
                style={{ display: 'inline-block', height: "35px", marginTop: '15px', width: "15%", background: "black", right: '25px', bottom: '15px' }} 
                className="custom-hover-btn">
                    <Link to={`/update-food-data/${id}`}>Edit</Link></Button>
            <Button type="primary" htmlType="submit" onClick={deleteFoodType}
                style={{ display: 'inline-block', height: "35px", marginTop: '15px', width: "15%", background: "black", right: '25px', bottom: '15px' }} 
                className="custom-hover-btn">Delete</Button>
        </div>
   </div>   
  )
}

export default SingleFoodType
