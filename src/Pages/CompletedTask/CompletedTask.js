import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { Row } from 'react-bootstrap';
import CompleteTaskCard from './CompleteTaskCard';

const CompletedTask = () => {
    const { data: completedTasks = [], isLoading, refetch } = useQuery({
        queryKey: ['completedTasks'],
        queryFn: async () => {
            try {
                const res = await fetch('https://task-manager-server-lime.vercel.app/addedTask/completed');
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
            <h4 className='mb-4 text-center'>Completed Task</h4>
            <Row xs={1} md={2} className="g-4">
                {
                    completedTasks?.map(completedTask => <CompleteTaskCard
                        key={completedTask._id}
                        completedTask={completedTask}
                        refetch={refetch}>
                    </CompleteTaskCard>)
                }
            </Row>
        </div>
    );
};

export default CompletedTask;