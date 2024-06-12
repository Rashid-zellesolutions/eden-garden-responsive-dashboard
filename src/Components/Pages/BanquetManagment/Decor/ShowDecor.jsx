import React from 'react'
import {Tabs } from 'antd';
import SeatingTable from './DecorTables/SeatingTable';
import TableSelection from './DecorTables/tableSelection';
import ChairTable from './DecorTables/ChairTable';
import StageTable from './DecorTables/StageTable';
import BackdropTable from './DecorTables/BackdropTable';
import CenterTable from './DecorTables/CenterPiecesTable';
import LightinigTable from './DecorTables/LightningTable';

const ShowDecor = () => {
  return (
    <div style={{width: '100%', padding: '20px 25px'}}>
        <div style={{marginBottom: '20px'}}>
            <span>Decor Data</span>
        </div>
        <div>
            <Tabs
                tabPosition={'right'}
                items={["Seating Arrangments", "Table Selection", "Chair Selection", "Stage Diemention", "Backdrop Mandap", "Center Pices", "Lightning"].fill(null).map((_, i) => {
                const id = String(i + 1);
                return {
                    label: i === 0 ? `Seating Arrangment` : i === 1 ? "Table Selection" : i === 2 ? "Chair Selection" : i === 3 ? "Stage Dimention" : i === 4 ? "Backdrop Mandap" : i === 5 ? "Center Pices" : "Lightning",
                    key: id,
                    disabled: i === 28,
                    children: i === 0 ? <SeatingTable /> : i === 1 ? <TableSelection /> : i === 2 ? <ChairTable /> : i === 3 ? <StageTable /> : i === 4 ? <BackdropTable /> : i === 5 ? <CenterTable /> : <LightinigTable />,
                };
                })}
            />
        </div>
    </div>
  )
}

export default ShowDecor