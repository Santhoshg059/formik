import React,{useState,useEffect} from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate,useParams } from 'react-router-dom';
import AxiosService from '../utils/ApiService';
import { useFormik } from 'formik';
import * as Yup from 'yup'
function EditUser() {

  let params = useParams()//this will return a object
  let [initialValues,setValues] = useState({
    name:'',
    email:'',
    mobile:'',
    batch:''
  })
 

  let navigate = useNavigate()// this will return a function

  const getUserData = async()=>{
    let {id} = params
    try {
      let res = await AxiosService.get(`/user/${id}`)
      if(res.status===200)
      {
        setValues({
          title:res.data.title,
          name:res.data.name,
          bday:res.data.bday,
          publishdate:res.data.publishdate,
          shortbio:res.data.shortbio,
          isbnnum:res.data.isbnnum
        })
      }
  } catch (error) {
      console.log(error)
  }
  }

  let formik = useFormik({
    initialValues:initialValues,
    validationSchema:Yup.object({
      title:Yup.string().required('Title is required').max(30,'Title can not exceed 20 characters').min(3,'Title can not be shorter than 3 leters'),
      name:Yup.string().required('Name is required').max(20,'Name can not exceed 20 characters').min(3,'Name can not be shorter than 3 leters'),
      bday:Yup.string().required('Birth Date is required'),
      publishdate:Yup.string().required('publishdate is required'),
      shortbio:Yup.string().required('shortbio is required'),
      isbnnum:Yup.string().required('isbnnum is required').matches(/^\d{10}$/,'Enter a valid  number')
      
    }),
    enableReinitialize:true,
    onSubmit:async (values)=>{
      let {id} = params
      values.id = id
    try {
        let res = await AxiosService.put(`/user/${id}`,values)
        if(res.status===200)
          navigate('/dashboard')
    } catch (error) {
      console.log(error)
    }
  }})



  useEffect(()=>{
    getUserData()
  },[])

  return <div id="content-wrapper" className="d-flex flex-column">
    <div id="content">
        <div className="container-fluid">
        <div className="d-sm-flex align-items-center justify-content-between mb-4">
                    <h1 className="h3 mb-0 text-gray-800">Edit User</h1>
                </div>
        <Form onSubmit={formik.handleSubmit}>
        <Form.Group className="mb-3" >
          <Form.Label>Title</Form.Label>
            <Form.Control type="text" placeholder="Title" id="title" name="title" onChange={formik.handleChange} value={formik.values.title} onBlur={formik.handleBlur}/>
            {formik.touched.title && formik.errors.title ? (<div style={{color:"red"}}>{formik.errors.title}</div>) : null}
          </Form.Group>
          <Form.Group className="mb-3" >
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" placeholder="Name" id="name" name="name" onChange={formik.handleChange} value={formik.values.name} onBlur={formik.handleBlur}/>
            {formik.touched.name && formik.errors.name ? (<div style={{color:"red"}}>{formik.errors.name}</div>) : null}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Birthdate</Form.Label>
            <Form.Control type='date' placeholder="Enter date" id="bday" name="bday" onChange={formik.handleChange} value={formik.values.bday} onBlur={formik.handleBlur}/>
            {formik.touched.bday && formik.errors.bday ? (<div style={{color:"red"}}>{formik.errors.bday}</div>) : null}
          </Form.Group>

          <Form.Group className="mb-3" >
            <Form.Label>Publish date</Form.Label>
            <Form.Control type="date" placeholder="publishdate" id="publishdate" name="publishdate" onChange={formik.handleChange} value={formik.values.publishdate} onBlur={formik.handleBlur}/>
            {formik.touched.publishdate && formik.errors.publishdate ? (<div style={{color:"red"}}>{formik.errors.publishdate}</div>) : null}
          </Form.Group>

          
          <Form.Group className="mb-3" >
            <Form.Label>Shortbio</Form.Label>
            <Form.Control type="text" placeholder="shortbio" id="shortbio" name="shortbio" onChange={formik.handleChange} value={formik.values.shortbio} onBlur={formik.handleBlur}/>
            {formik.touched.shortbio && formik.errors.shortbio ? (<div style={{color:"red"}}>{formik.errors.shortbio}</div>) : null}
          </Form.Group>

          <Form.Group className="mb-3" >
            <Form.Label>ISBN Number</Form.Label>
            <Form.Control type="number" placeholder="isbnnum" id="isbnnum" name="isbnnum" onChange={formik.handleChange} value={formik.values.isbnnum} onBlur={formik.handleBlur}/>
            {formik.touched.isbnnum && formik.errors.isbnnum ? (<div style={{color:"red"}}>{formik.errors.isbnnum}</div>) : null}
          </Form.Group>
          
          
          <Button variant="primary" type='submit'>
            Submit
          </Button>
      </Form>
        </div>
    </div>
  </div>
}

export default EditUser