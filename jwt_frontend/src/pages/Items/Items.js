import { useEffect, useState } from "react";
import { Button, Container, Form, Table, Modal, FloatingLabel } from "react-bootstrap";
import { deleteRequest, getRequest, postRequest, putRequest } from "../../services/ApiService";


const Items =()=>{
    const [items,setItems] = useState([]);

    const [itemName,setItemName] = useState(null);
    const [itemPrice,setItemPrice] = useState(0);
    const [itemQty,setItemQty] = useState(0);

    const [editItem,setEditItem] = useState(null);
    const [editItemId,setEditItemId] = useState(null);
    const [editItemName,setEditItemName] = useState(null);
    const [editItemPrice,setEditItemPrice] = useState(0);
    const [editItemQty,setEditItemQty] = useState(0);

    const [show, setShow] = useState(false);

    const [showEdit, setShowEdit] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    const handleCloseEdit = () => setShowEdit(false);   
    const handleShowEdit = () => setShowEdit(true);
   
    const getAllItems = async () =>{
        const response = await getRequest("/items");
        setItems(response.data);
    }

    useEffect(()=>{        
        getAllItems();
    },[]);

    const addItems =async (event)=>{
        event.preventDefault();

        const data = {
            "name":itemName,
            "price":itemPrice,
            "quantity":itemQty
        }

        try {
            const response = await postRequest("/items",data);

            if(response && response.status===201){
                setItems([...items,response.data])
                handleClose();
                setItemName("");
                setItemPrice(0);
                setItemQty(0);
            }
        } catch (error) {
            console.log(error);
            
        }

    }

    const handleEdit =async (id)=>{
        handleShowEdit();       
        const response =await getRequest(`/items/${id}`); 
        setEditItem(response.data);
        setEditItemId(response.data.id);
        setEditItemName(response.data.name);
        setEditItemPrice(response.data.price);
        setEditItemQty(response.data.quantity);
        console.log(response);
    }

    const handleItemEdit =async (event)=>{
        event.preventDefault();

        const data ={
            "name":editItemName,
            "price":editItemPrice,
            "quantity":editItemQty
        }

        const response = await  putRequest(`/items/${editItemId}`,data);
        if(response){
            console.log(response);
            handleCloseEdit();
            const allItems = getAllItems();
            setItems(allItems.data);
            console.log("Item successfully updated");           
        }

    }

    const handleDelete= async (id)=>{
        const response = await deleteRequest(`/items/${id}`);

        if(response){
            console.log("Item successfully deleted");
            const allItems = getAllItems();
            setItems(allItems.data);
        }
    

    }


    return(
        <>
        <h1 className="text-center my-4">Items</h1>
        <Container>
            <Table responsive>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Available quantity</th>
                        <th></th>
                    </tr>

                </thead>
                <tbody>
                    {items && items.map(item =>{
                        return(
                            <tr>
                                <td>{item.id}</td>
                                <td>{item.name}</td>
                                <td>{item.price}</td>
                                <td>{item.quantity}</td>
                                <td>
                                    <Button className="mx-3" variant="secondary"onClick={()=>{
                                        handleEdit(item.id)
                                    }}>Edit</Button>
                                    <Button variant="danger" onClick={()=>
                                        handleDelete(item.id)
                                    }>Delete</Button>
                                </td>
                            </tr>
                        )
                    })
                    }

                </tbody>

            </Table>
            <div >
                <Button variant="primary" onClick={handleShow} >Add Items</Button>
            </div>
        </Container>

        <Container>
        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add new items</Modal.Title>
        </Modal.Header>
        <Modal.Body>
                <Form onSubmit={addItems}>
                
                    <FloatingLabel id="itemName" label="Item name" className="mb-3">
                        <Form.Control placeholder="Item name" value={itemName} onChange={(event)=>{
                            setItemName(event.target.value)
                        }}></Form.Control>
                    </FloatingLabel>
                    <FloatingLabel id="itemPrice" label="Item price" className="mb-3">
                        <Form.Control placeholder="Item price" value={itemPrice} onChange={(event)=>{
                            setItemPrice(event.target.value)
                        }}></Form.Control>
                    </FloatingLabel>
                    <FloatingLabel id="itemQty" label="Item qty" className="mb-3">
                        <Form.Control type="number" placeholder="Available quantity" value={itemQty} onChange={(event) =>{
                            setItemQty(event.target.value)
                        }}></Form.Control>
                    </FloatingLabel>
                    <Button variant="primary" type="submit">Save</Button>
                </Form>
        </Modal.Body>   
      </Modal>

        </Container>

        

      {editItem &&
            <Modal show={showEdit} onHide={handleCloseEdit}>
            <Modal.Header closeButton>
              <Modal.Title>Edit Items</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                    <Form onSubmit={handleItemEdit}>
                        <FloatingLabel id="itemId" label="Item ID" className="mb-3">
                        <Form.Control placeholder="Item ID" value={editItem.id} readOnly></Form.Control>
                    </FloatingLabel>
                        <FloatingLabel id="editItemName" label="Item name" className="mb-3">
                            <Form.Control placeholder="Item name" value={editItemName} onChange={(event)=>
                            setEditItemName(event.target.value)
                        }></Form.Control>
                        </FloatingLabel>
                        <FloatingLabel id="editItemPrice" label="Item price" className="mb-3">
                            <Form.Control placeholder="Item price" value={editItemPrice} onChange={(event)=>{
                                setEditItemPrice(event.target.value)
                            }}></Form.Control>
                        </FloatingLabel>
                        <FloatingLabel id="editItemQty" label="Available quantity" className="mb-3">
                            <Form.Control type="number" placeholder="Available quantity" value={editItemQty} onChange={(event)=>{
                                setEditItemQty(event.target.value)
                            }}></Form.Control>
                        </FloatingLabel>
                        <Button variant="primary" type="submit">Save</Button>
                    </Form>
            </Modal.Body>
            </Modal>
        }

        
        </>
    )
}

export default Items;