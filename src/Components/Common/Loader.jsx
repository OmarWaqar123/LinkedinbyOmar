import React from 'react'
import { Space, Spin } from 'antd';


export default function Loader() {
  
  const Styles = {
    position:"absolute",
    left: "50%",
    top: "50%",
    transform:"translateX(-50%)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  }

  const p_styles = {
      marginBottom: "15px"
  }

  return (
    <div style={Styles}>
        <p style={p_styles}>Loading... please Wait.</p>
        <Space size="middle">

          <Spin size="large" />
        </Space>
    </div>
  )
}
