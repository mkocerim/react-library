import React,{useEffect,useState} from "react";
import axios from "axios";
import Loading from "./Loading";
import { useNavigate } from "react-router-dom";

const AddBookForm = (props)=>{
const navigate = useNavigate()
const [categories,setCategories]=useState(null);
const [bookname,setBookname] = useState("");
const [author,setAuthor]= useState("");
const [isbn,setIsbn] = useState("");
const [category,setCategory]=useState("");
 
    useEffect(()=>{
        axios.get("http://localhost:3004/categories")
        .then(res=>{
         
            console.log(res);
            setCategories(res.data);

        })
        .catch(err=>console.log(err))

    },[])
    
    const handleSubmit = (event)=>{
        event.preventDefault();
        // console.log("name",bookname);
        // console.log("author", author);
        // console.log("isbn",isbn);
        // console.log("category",category);
    if(bookname === "" || author === "" || category === ""){
        alert("Kitap adı, Kitap Yazarı ve Kategory boş bırakılamaz");
        return;
    }
    const newBook={
        id: new Date().getTime(),
        name:bookname,
        author:author,
        isbn:isbn,
        categoryId:category
        };
    axios.post("http://localhost:3004/books",newBook)
    .then(res=>{
        console.log(res);
        setBookname("");
        setAuthor("");
        setIsbn("");
        setCategory("");        
        navigate("/");
    })
    .catch(err=>console.log(err))
    };

    if(categories===null){
        return <Loading/>;
    }

    return(

<div className="container my-5" >
   <form onSubmit={handleSubmit}>
    <div className="row">
        <div className="col">
         <input 
            type="text" 
            className="form-control" 
            placeholder="Kitap Adı" 
            value={bookname}
            onChange={(event)=>setBookname(event.target.value)}
         />
        </div>
        <div className="col">
        <input 
            type="text" 
            className="form-control" 
            placeholder="Kitap Yazarı" 
            value={author}
            onChange={(event)=>setAuthor(event.target.value)}
           
         />
        </div>
     </div>

      <div className="row my-5">

         <div className="col">
             <input 
               type="text" 
               className="form-control" 
               placeholder="ISBN"
               value={isbn}
               onChange={(event)=>setIsbn(event.target.value)}   
            />

     </div>
     <div className="col">
     <select 
     className="form-select"
     onChange={(event)=>setCategory(event.target.value)}
     >
        <option value={""} selected>
        Kategory Seçin
        </option>
    {categories.map(cat=>{
        return(
        <option key={cat.id} value={cat.id}>{cat.name}</option>             
    )
    })
         }
     </select>
                    </div>
                </div>
                <div className= "d-flex justify-content-center">
                    <button type="submit" className="btn btn-primary w-50">Kaydet</button>
                </div>
             </form>
        </div>
    );
};

export default AddBookForm