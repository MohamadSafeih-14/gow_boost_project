"use client";
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import {getReports } from 'src/lib/actions/admin.dashboard.actions';
import Report from './report/Report';
interface Props {}

interface reports {
    _id: any,
    author_name: string,
    author_id: string,
    role: string,
    report: string,
    createdAt: any,
  }
  

const Reports = () => {
    const [reports, setReports] = useState<any[]>([]);
    useEffect(() => {
        const fetchReports = async () => {
          try {
            const res = await getReports();
            if (res !== undefined && res.reports) {
                console.log(res)
                let reportsArr: any[] = [];
                res.reports.map((report) => {
                reportsArr.push(JSON.stringify(report))
                setReports(reportsArr);
            })
        } else {
            console.log()
            toast.error('Failed to fetch reports');
        }
          } catch (error) {
            console.error('Error fetching reports:', error);
            toast.error('Failed to fetch reports');
          }
        };
    
        fetchReports();
      }, []);
  return <div className='w-full h-fit text-center pb-[100px]'>
      {reports.map((report: any) => {
        return (
        <Report key={JSON.parse(report)._id} report={report} />
      )})}
    </div>
}

export default Reports