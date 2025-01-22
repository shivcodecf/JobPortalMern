import { createSlice } from "@reduxjs/toolkit";

const jobSlice = createSlice({
    name: "job",
    initialState: { // Corrected the typo: initialstate -> initialState
       allJobs:[],
       allAdminJobs:[],
       singleJob:null,
       searchJobByText:"",
       allAppliedJobs:[],
       searchedQuery:"",
    },
    reducers: {
        setAllJobs:(state,action) => {
            state.allJobs = action.payload;
        },
        setSingleJob:(state,action)=>{
            console.log("Payload:", action.payload); // Check what is being passed
            state.singleJob = action.payload;
        },
        setAllAdminJobs:(state,action)=>{
            state.allAdminJobs = action.payload
        },
        setSearchJobByText:(state,action)=>{
            state.searchJobByText = action.payload
        },
        setAllAppliedJobs:(state,action)=>{
            state.allAppliedJobs = action.payload
        },
        setSearchedQuery:(state,action)=>{
            state.searchedQuery = action.payload;
        }
    }
});

export const { setAllJobs,setSingleJob,setAllAdminJobs,setSearchJobByText,setAllAppliedJobs,setSearchedQuery} = jobSlice.actions;
export default jobSlice.reducer;
