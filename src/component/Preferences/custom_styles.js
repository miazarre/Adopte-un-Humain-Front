const customStyles = {
    option: (defaultStyles) => ({
      ...defaultStyles,
      color: "#303030",
      backgroundColor: "FFFF",
      margin:"10px 0",
  
      "&:hover": {
        backgroundColor: "#e2f0e6",
        borderRadius:"10px"
      }
    }),
  
    singleValue: (defaultStyles) => ({
      ...defaultStyles,
      color: "#247BA0",
    }),
    control: (defaultStyles) => ({
      ...defaultStyles,
      backgroundColor: "#F7F7F7",
      padding: "5px",
      border: "2px solid #70C1B3",
      borderRadius: "10px",
      boxShadow: "none",
      color: "#303030",
  
      "&:hover": {
        backgroundColor: "#FFFF"
      }
    }),
  
    indicatorSeparator: (defaultStyles) => ({
      ...defaultStyles, 
      display: "none",
    }),
  
    dropdownIndicator: (defaultStyles) => ({
      ...defaultStyles, 
      color: "#70C1B3",
  
    }),
  
    menu: (defaultStyles) => ({
      ...defaultStyles,
      borderRadius: "8px",
      marginTop: "20px",
      padding: "5px",
      borderRadius:"8px",
      border: "2px solid #70C1B3",
    }),
  
    menuList: (defaultStyles) => ({
      ...defaultStyles, 
      backgroundColor: "#FFF",
      maxHeight: "20vh",
  
      "::-webkit-scrollbar": {
        width: "4px",
        borderRadius:"20px",
      },
      "::-webkit-scrollbar-track": {
        background: "#f0ecfc",
      },
      "::-webkit-scrollbar-thumb": {
        background: "#B3a5de",
      },
      "::-webkit-scrollbar-thumb:hover": {
        background: "#4334C8",
      }
    }),
  
    placeholder: (defaultStyles) => ({
      ...defaultStyles, 
      color: "#9F9F9F",
  
    }),
  
    multiValueLabel: (defaultStyles) => ({
      ...defaultStyles, 
      color: "#303030",
      backgroundColor:"#B2DBBF",
      padding: "10px"
    }),
    multiValue: (defaultStyles) => ({
        ...defaultStyles, 
        color: "#303030",
      }),
    multiValueRemove: (defaultStyles) => ({
        ...defaultStyles, 
        backgroundColor: "#fad7e0",
      }),
  };
  
  export default customStyles ;
  