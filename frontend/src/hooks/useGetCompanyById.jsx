import { setSingleCompany } from '@/redux/companySlice';
import { COMPANY_API_END_POINT } from '@/utils/constant';
import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

const useGetCompanyById = () => {
    const { id } = useParams(); // Extract the 'id' parameter from the URL
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchSingleCompany = async () => {
            try {
                const res = await axios.get(`${COMPANY_API_END_POINT}/get/${id}`, { withCredentials: true });
                if (res.data.success) {
                    dispatch(setSingleCompany(res.data.company));
                }
            } catch (error) {
                console.error('Error fetching company:', error);
            }
        };

        if (id) { // Ensure the id is defined before making the request
            fetchSingleCompany();
        }
    }, [id, dispatch]); // Dependency array updated to include 'id' and 'dispatch'
};

export default useGetCompanyById;
