import React from "react"
import ContentLoader from "react-content-loader"

const MyLoader = (props) => (
  <ContentLoader 
    speed={2}
    width={600}
    height={480}
    viewBox="0 0 600 480"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="429" y="30" rx="2" ry="2" width="147" height="14" /> 
    <rect x="14" y="429" rx="2" ry="2" width="394" height="12" /> 
    <rect x="13" y="17" rx="2" ry="2" width="400" height="400" /> 
    <rect x="431" y="55" rx="2" ry="2" width="121" height="11" /> 
    <rect x="432" y="79" rx="2" ry="2" width="121" height="11" /> 
    <rect x="433" y="102" rx="2" ry="2" width="121" height="11" /> 
    <rect x="15" y="450" rx="2" ry="2" width="394" height="12" />
  </ContentLoader>
)

export default MyLoader
