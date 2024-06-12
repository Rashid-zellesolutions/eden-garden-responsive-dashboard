import React from 'react'
import {Tabs } from 'antd';
import DiningTable from './OtherTables/DiningTable';
import Cutlery from './OtherTables/Cutlery';
import Sound from './OtherTables/Sound';

const OthersData = () => {
  return (
    <div style={{width: '100%', padding: '20px 25px'}}>
        <div style={{marginBottom: '20px'}}>
            <span>Others Data</span>
        </div>
        <div>
            <Tabs
                tabPosition={'right'}
                items={["Dining Option", "Cutlery", "Sound"].fill(null).map((_, i) => {
                const id = String(i + 1);
                return {
                    label: i === 0 ? `Dining Option` : i === 1 ? "Cutlery" : "Sound" ,
                    key: id,
                    disabled: i === 28,
                    children: i === 0 ? <DiningTable /> : i === 1 ? <Cutlery /> : <Sound /> ,
                };
                })}
            />
        </div>
    </div>
  )
}

export default OthersData