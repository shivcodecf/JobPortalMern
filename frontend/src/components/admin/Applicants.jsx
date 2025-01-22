import React, { useEffect } from 'react';
import ApplicantsTable from './ApplicantsTable';
import Navbar from '../shared/Navbar';
import { useParams } from 'react-router-dom';
import { APPLICATION_API_END_POINT } from '@/utils/constant';
import { useDispatch, useSelector } from 'react-redux';
import { setAllApplicants } from '@/redux/applicationSlice';
import axios from 'axios';

const Applicants = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const { applicants } = useSelector(store => store.application);

  useEffect(() => {
    const fetchAllApplicants = async () => {
      try {
        const res = await axios.get(`${APPLICATION_API_END_POINT}/${params.id}/applicants`, {
          withCredentials: true,
        });

        dispatch(setAllApplicants(res.data.job));
      } catch (error) {
        console.error(error);
      }
    };
    fetchAllApplicants();
  }, [params.id, dispatch]);

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-bold text-2xl my-5 text-center sm:text-left">
          Applicants ({applicants?.applications?.length || 0})
        </h1>
        <div className="overflow-x-auto">
          <ApplicantsTable />
        </div>
      </div>
    </div>
  );
};

export default Applicants;
