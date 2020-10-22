import React from 'react'
import { API } from '../config'

const showImage = ({item, url}) => (
    <div>
        <img src={`${API}/${url}/photo/${item._id}`} alt={item.name}></img>
    </div>
)

export default showImage;