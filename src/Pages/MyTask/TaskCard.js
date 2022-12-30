import React from 'react';
import { Button, Card, } from 'react-bootstrap';
import { toast } from 'react-hot-toast';
import { FaRegClock } from 'react-icons/fa';

const TaskCard = ({ myTask, refetch }) => {
    const { _id, task, img, date, time } = myTask;

    const handleDelete = id => {
        const proceed = window.confirm('Are you sure you want to delete this report?');
        if (proceed) {
            fetch(`http://localhost:8000/addedTask/${id}`, {
                method: 'DELETE',
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    if (data.deletedCount > 0) {
                        toast.success('Task Deleted Successfully');
                        refetch();
                    }
                })
        }
    }

    return (
        <div>
            <Card className='mb-5 mx-auto p-2' style={{ width: '90%' }}>
                <div className='d-md-flex align-items-center'>
                    <div className='text-center'>
                        <Card.Img className='m-2' style={{ width: '200px', height: '150px' }} src={img} />
                    </div>
                    <div>
                        <Card.Body>
                            <Card.Title>{task}</Card.Title>
                            <Card.Text>
                                <div >
                                    <h6 className='mt-2'>Date: {date}</h6>
                                    <div className='d-flex align-items-center'>
                                        <FaRegClock className='text-info fs-5'></FaRegClock>
                                        <span className='ms-2 fw-semibold text-info'>{time}</span>
                                    </div>
                                </div>
                            </Card.Text>

                            <Button className='btn btn-sm me-3'>Update</Button>
                            <Button onClick={() => handleDelete(_id)} className='btn btn-sm me-3' variant='danger'>Delete</Button>
                            <Button className='btn btn-sm' variant='success'>Completed</Button>

                        </Card.Body>
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default TaskCard;