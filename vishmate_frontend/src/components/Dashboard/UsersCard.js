import React from 'react'
import curve_png from '../../assets/Vector1.png';
import { Col } from 'react-bootstrap'

const UsersCard = (props) => {
    return (
        <Col className='d-flex bg-white justify-content-between align-items-center text-white mx-3 p-0' style={{ overflow: 'hidden', borderRadius: '10px', boxShadow: "5px 5px 6px #ccc, -2px 0 6px #ccc" }}>
            <div className="p-4" style={{ flex: '1' }}>
                <img src={props.png} alt="" />
            </div>
            <div style={{ flex: '1', width: '100%', height: '100%' }} className='d-flex'>
                <div className='position-relative d-inline-block'>
                    <img src={curve_png} />
                    <div className='position-absolute' style={{ top: '0', left: `${props.left}%` }}>
                        <p className='mt-2 mb-0'>{props.title}</p>
                        <p className='text-center p-0' style={{ fontSize: '48px', fontWeight: '600' }}>{props.value}</p>
                    </div>
                </div>
            </div>
        </Col>
    )
}

export default UsersCard
