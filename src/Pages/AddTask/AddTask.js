import React from 'react';
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const AddTask = () => {
    const { register, formState: { errors }, handleSubmit } = useForm();
    const imageHostKey = process.env.REACT_APP_imgbb_key;
    const navigate = useNavigate();

    const handleAddTask = data => {
        const image = data.image[0];
        const formData = new FormData();
        formData.append('image', image);
        const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`;
        fetch(url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(imageData => {
                if (imageData.success) {
                    const task = {
                        task: data.taskName,
                        img: imageData.data.url,
                        date: data.date,
                        time: data.time
                    };
                    fetch('http://localhost:8000/addedTask', {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json',
                        },
                        body: JSON.stringify(task)
                    })
                        .then(res => res.json())
                        .then(data => {
                            console.log(data);
                            if (data.acknowledged) {
                                toast.success('Task Added Successfully');
                                navigate('/myTask');
                            }

                        })
                }
            })
    }
    return (
        <div className='my-5'>
            <h4 className='ms-5 text-center'>Add Task</h4>
            <div className='w-50 mx-auto'>
                <form onSubmit={handleSubmit(handleAddTask)}>
                    <div class="mb-3">
                        <label for="exampleFormControlTextarea1" class="form-label">Task Name & Description</label>
                        <textarea class="form-control"  {...register("taskName")} id="exampleFormControlTextarea1" rows="3"></textarea>
                    </div>
                    <div class="mb-3">
                        <label for="exampleFormControlInput1" class="form-label">Task Image</label>
                        <input type="file" {...register("image")} class="form-control" id="exampleFormControlInput1" />
                    </div>
                    <div class="mb-3">
                        <label for="exampleFormControlInput2" class="form-label">Date</label>
                        <input type="date" {...register("date")} class="form-control" id="exampleFormControlInput2" />
                    </div>
                    <div class="mb-3">
                        <label for="exampleFormControlInput3" class="form-label">Time</label>
                        <input type="time" {...register("time")} class="form-control" id="exampleFormControlInput3" />
                    </div>
                    <input class="btn btn-success" type="submit" value="Add Task" />
                </form>
            </div>
        </div>
    );
};

export default AddTask;