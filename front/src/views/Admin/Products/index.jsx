import React, { useState, useEffect } from 'react'
import { Table, Badge, Space, message } from 'antd';
import Product from '../../../components/Product';
import { Steps, Button } from 'antd';
import axios from '../../../config/axios'
import { apis } from '../../../config/apisurls'
import './index.css'
import Input from '../../../components/Input';
import Alert from '../../../components/Alert';
import { useDispatch, useSelector } from 'react-redux'
import { setname, setqte, setdescription, setprice } from '../../../features/products/productsSlice';
const { Step } = Steps;

export default () => {

    const [display, setdisplay] = useState(false)

    const [categories, setcategories] = useState([])

    const [category, setcategory] = useState('')

    const [thumbnails, setthumbnails] = useState([])



    const [products, setproducts] = useState([])

    useEffect(() => {
        axios.get(apis.categories.getall)
            .then(res => {
                setcategories(res.data.data)
            })

        axios.get(apis.products.get)
            .then(res => {
                console.log(res);
                setproducts(res.data.data)
            })
    }, [])

    const Categories = () => {
        return (
            <>
                <div className='categories_step' >
                    {
                        categories.map(c => {
                            return (
                                <div onClick={() => setcategory(c._id)} className={`categgoryitem ${category === c._id ? 'iscategrySelcted' : ''} `}  >
                                    <i className={c.icon} ></i>
                                    <span>{c.name}</span>
                                </div>
                            )
                        })
                    }
                </div>
            </>
        )
    }

    const handleimages = e => {

        const { files } = e.target
        console.log(files);
        let imgs = []

        for (let i = 0; i < files.length; i++) {
            imgs.push({
                id: i,
                thumb: URL.createObjectURL(e.target.files[i]),
                file: files[i]
            })
        }

        setthumbnails(imgs)
    }

    const RemoveImage = id => {
        let arr = [...thumbnails]
        let dt = arr.filter(i => i.id !== id)
        setthumbnails(dt)
    }

    const Images = () => {
        return (
            <>
                <input type="file" id='imagesselector' multiple="multiple" onChange={handleimages} hidden />
                <div className="images">
                    <div className="row">
                        {
                            thumbnails.length > 0
                                ?
                                thumbnails.map(t => {
                                    return (
                                        <div className="image_container col-sm-4 col-md-2 ">
                                            <i onClick={() => RemoveImage(t.id)} class="las la-times-circle"></i>
                                            <img src={t.thumb} alt="" />
                                        </div>
                                    )
                                })
                                :
                                <div onClick={() => document.getElementById('imagesselector').click()} className="select_images">
                                    <i class="lar la-image"></i>
                                </div>
                        }
                    </div>
                </div>
            </>
        )
    }







    const Details = () => {
        const dispatch = useDispatch()
        const productinfo = useSelector(state => state.products.productDetails)
        const [details, setdetails] = useState({
            name: '',
            description: '',
            price: 0,
            qte: 0
        })

        const handledetails = e => {
            const { name, value } = e.target
            setdetails(prev => ({
                ...prev,
                [name]: value
            }))

            localStorage.setItem('details', JSON.stringify({ ...details, [name]: value }))

        }

        return (
            <>
                <div className='p-3' >

                    <Input value={details.name} onWrite={handledetails} type='text' placeholder="name" name='name' />
                    <Input value={details.description} onWrite={handledetails} type='text' placeholder="description" name='description' />
                    <Input value={details.price} onWrite={handledetails} type='number' placeholder="price" name='price' />
                    <Input value={details.qte} onWrite={handledetails} type='number' placeholder="qte" name='qte' />
                </div>
            </>
        )
    }

    const steps = [
        {
            title: 'Category',
            content: <Categories />,
        },
        {
            title: 'Images',
            content: <Images />,
        },
        {
            title: 'Details',
            content: <Details />,
        },
    ];

    const [current, setCurrent] = React.useState(0);

    const [success, setsuccess] = useState(false)

    const next = () => {
        setCurrent(current + 1);
    };

    const prev = () => {
        setCurrent(current - 1);
    };

    const createProduct = () => {

        let data = new FormData()

        let details = JSON.parse(localStorage.getItem('details'))

        data.append('name', details.name)
        data.append('description', details.description)
        data.append('price', details.price)
        data.append('qte', details.qte)
        data.append('category', category)


        for (let item of thumbnails) {
            data.append('images', item.file)
        }


        axios.post(apis.products.create, data)
            .then(res => {

                console.log(res);
                localStorage.removeItem('details')
                setcategory('')
                setthumbnails([])
                setdisplay(false)
                setsuccess(true)
                setTimeout(() => {
                    setsuccess(false)
                }, 3000);

                setproducts(prev => [res.data.data, ...prev])
            })
            .catch(err => {
                console.log(err.response);
            })
    }



    return (
        <>
            <div className="container">
                <h3>Products <Badge count={0} showZero /> </h3>
                <div className="products">
                    <div className="iconplacment">
                        {
                            display
                                ?
                                <div onClick={() => setdisplay(false)} className="closebutton">
                                    <i class="las la-times"></i>
                                </div>
                                :
                                <div onClick={() => setdisplay(true)} className="addbutton">
                                    <i class="las la-plus"></i>
                                </div>
                        }
                    </div>

                    {/* alert */}
                    <br />
                    <br />
                    {success && <Alert message='product added' color='success' />}
                    {/* steper */}

                    {display && <>
                        <Steps style={{ marginTop: '15px' }} current={current}>
                            {steps.map(item => (
                                <Step key={item.title} title={item.title} />
                            ))}
                        </Steps>
                        <div className="steps-content">{steps[current].content}</div>
                        <div className="steps-action">
                            {current < steps.length - 1 && (
                                <Button type="primary" onClick={() => next()}>
                                    Next
                                </Button>
                            )}
                            {current === steps.length - 1 && (
                                <Button type="primary" onClick={createProduct}>
                                    create
                                </Button>
                            )}
                            {current > 0 && (
                                <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
                                    Previous
                                </Button>
                            )}
                        </div>
                    </>}
                    <div className="row mt-4">
                        {
                            products.map(p => {
                                return (

                                    <Product key={p._id} product={p} />
                                )
                            })
                        }

                    </div>
                </div>
            </div>
        </>
    )
}