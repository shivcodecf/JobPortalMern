import { createSlice } from "@reduxjs/toolkit";

const companySlice = createSlice({
  name: "company",
  initialState: {
    singleCompany: null, // This is the initial state
    companies:[],
    searchCompanyByText:"",

  },
  reducers: {
    setSingleCompany: (state, action) => {
      state.singleCompany = action.payload; // Update singleCompany here
    },
    setCompanies:(state,action)=>{
     state.companies = action.payload;
    },
    setSearchCompanyByText:(state,action)=>{
      state.searchCompanyByText = action.payload;
     }
  },
});

export const { setSingleCompany,setCompanies,setSearchCompanyByText} = companySlice.actions;

export default companySlice.reducer;
