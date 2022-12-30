import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { Row } from 'react-bootstrap';
import TaskCard from './TaskCard';

const MyTask = () => {
    const { data: myTasks = [], isLoading, refetch } = useQuery({
        queryKey: ['myTasks'],
        queryFn: async () => {
            try {
                const res = await fetch('https://task-manager-server-lime.vercel.app/addedTask');
                const data = await res.json();
                return data;
            }
            catch (error) {
                console.log(error);
            }
        }
    })
    return (
        <div className='my-5 px-5'>
            <h4 className='mb-4 text-center'>My Task</h4>
            <Row xs={1} md={2} className="g-4">
                {
                    myTasks?.map(myTask => <TaskCard
                        key={myTask._id}
                        myTask={myTask}
                        refetch={refetch}>
                    </TaskCard>)
                }
            </Row>
        </div>
    );
};

export default MyTask;