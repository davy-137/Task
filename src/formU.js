import React, { useEffect, useState } from 'react'
import axios from "axios";
const container = {
    display: "flex",
    flexDirection: "row"
}
const mn = {
    width: "770px",
    border: "3px solid black",
    margin: "10px 10px"
}
const set = {
    marginLeft: "30px"
}
const inp = {
    width: "200px",
    height: "40px",
    border: "3px solid black"
}
const fm = {
    // padding:'50px'
}
const para = {
    width: "100px",
    fontSize: "20px",
    fontWeight: "bold",
    backgroundColor: "skyblue"
}
const ta = {
    border: "3px solid black"
}
const btn1 = {
    width: "50px",
    height: "50px",
    borderRadius: "80px",
    backgroundImage: "url('https://www.pngitem.com/pimgs/m/65-653761_add-button-png-image-free-download-searchpng-png.png')",
    backgroundSize: "60px 70px",
    backgroundPosition: "center",
    marginLeft: "30px",
    marginTop: "10px"
}
const btn2 = {
    width: "50px",
    height: "50px",
    borderRadius: "80px",
    backgroundImage: "url('https://www.pngitem.com/pimgs/m/9-93082_transparent-stop-sign-png-does-red-circle-with.png')",
    backgroundSize: "60px 70px",
    backgroundPosition: "center",
    marginLeft: "30px",
    marginTop: "10px"
}
const btn = {
    width: "100px",
    height: "30px",
    marginLeft: "650px",
    backgroundColor: "red",
    fontSize: "23px",
    color: 'white'

}
const prg = {
    marginLeft: "270px",
    width: "200px",
    height: "50px"
}
const table={
    marginTop:"30px",
    marginLeft: "130px",
    fontSize: "23px"
}
function Form() {
    const [fetchagain, setfetchagain] = useState(true);
    const [formdata, setformdata] = useState([]);
    const [products, setProduct] = useState([{ id: 1, Name: "", Category: "", Price: "", Desc: "" }]);
    const [count1, setCount1] = useState(0);
    const [count2, setCount2] = useState(0);
    
    const Numbees = async () => {
        try {
            const result = await axios.get('http://localhost:4000/');
            setCount2(result.data.length)
        }
        catch (err) {
            console.log(err);
        }
    }
    useEffect(() => {
        Numbees();
    }, [fetchagain]);
    function handleChangeI() {
        const l = products.length + 1;
        setProduct([...products, { id: l, Name: "", Category: "", Price: "", Desc: "" }]);
    }
    function handleChangeD() {
        const temp = [...products];
        temp.pop();
        setProduct(temp);
    }

    function handleChange(e) {
        const name = e.target.name;
        const value = e.target.value;
        const idx = e.target.id;
        const temp = [...products];
        temp[idx][name] = value;
        setProduct(temp);
    }
    async function onSub() {
        await fetch('http://localhost:4000/', {
            method: 'POST',
            headers: { 'content-type': "application/json" },
            body: JSON.stringify(products)
        });
        setfetchagain(!fetchagain);
        const l = products.length;
        setCount1(count1+l);
        setformdata(products);
        setProduct([{ id: 1, Name: "", Category: "", Price: "", Desc: "" }]);
    }
    return (
        <div style={container}>
            <div>
                <p style={{marginLeft:"150px",fontWeight:"bold",color:"blue"}}>No. of records inserted within last 7 days &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{count2}</p>
                <div style={mn}>
                    {products.map((value, idx) => {
                        return (
                            <div style={set}>
                                <p style={para}>Product{value.id}</p>
                                <form style={fm}>
                                    <input style={inp} id={idx} type="text" placeholder="Name" name="Name" value={value.Name} onChange={(e) => handleChange(e)} ></input>&nbsp;&nbsp;&nbsp;
                                    <select style={inp} id={idx} name="Category" value={value.Category} onChange={(e) => handleChange(e)}>
                                        <option>Choose Category</option>
                                        <option>Grocery & Gourmet Food</option>
                                        <option>Health, Household & Baby Care</option>
                                        <option>Electronics</option>
                                        <option>Clothing, Shoes and Jewelry</option>
                                        <option>Industrial & Scientific</option>
                                        <option>Collectibles & Fine Art</option>
                                        <option>Pet Supplies</option>
                                        <option>Sports & Outdoors</option>
                                        <option>Luggage & Travel Gear</option>
                                        <option>Books</option>
                                    </select>&nbsp;&nbsp;&nbsp;
                                    <input style={inp} id={idx} type="number" placeholder="price in $" name="Price" value={value.Price} onChange={(e) => handleChange(e)}></input><br /><br />
                                    <textarea style={ta} id={idx} rows="3" cols="84" placeholder='Description' name="Desc" value={value.Desc} onChange={(e) => handleChange(e)} />
                                </form>
                            </div>
                        )
                    })}
                    <button style={btn1} onClick={handleChangeI}></button>
                    <button style={btn2} onClick={handleChangeD}></button><br />
                    <button style={btn} onClick={onSub}>Submit</button>
                </div>
            </div>
            <div>
                <progress style={prg} value={count1} max="100" />
                {formdata.map((product,idx)=>{
                    return(
                    <div style={table}>
                        <span>{product.Name}&nbsp;&nbsp;&nbsp;|</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <span>{product.Category}&nbsp;&nbsp;&nbsp;|</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <span>{product.Price}</span><br/>
                        <hr/>
                   </div>
                    );
                })}
            </div>
        </div>
    )
}
export default Form