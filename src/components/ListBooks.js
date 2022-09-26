import React, {useEffect,useState} from "react";
import axios from "axios";
import Loading from "./Loading";
import { Link } from "react-router-dom";
import Modal from "./Modal";


const ListBooks=(props)=>{
    
    const [books, setBooks] = useState(null);
    const [categories, setCategories] = useState(null);
    const [didUpdate,setDidUpdate] = useState(false);
    const [showModal, setShowModal]=useState(false);
    const [willDeleteBook, setWillDeleteBook]=useState(null);
    useEffect( ()=>{
        axios
        .get("http://localhost:3004/books")
        .then((resBook) => {
            console.log(resBook);
            setBooks(resBook.data);
        axios
         .get("http://localhost:3004/categories")
         .then((resCategories) => {
        
          setTimeout(() => {

            setCategories(resCategories.data);
            
          },1);  
          })
          .catch((err) => console.log("categories err",err))
        })
        .catch((err)=> console.log("books err",err));
    } ,[didUpdate]);

    const deleteBook=(id)=>{
      console.log(`http://localhost:3004/books/${id}`);
      axios.delete(`http://localhost:3004/books/${id}`)
      .then(res=>{
        console.log("delete res", res)
        setDidUpdate(!didUpdate);
        setShowModal(false);
      })
      .catch(err=>console.log(err));
    }
    if(books === null || categories===null){
        return <Loading/> ;
    }
    return(
 <div className="container my-5">
    <div className="my-3 d-flex justify-content-end">
       <Link to = "/add-book" className="btn btn-primary">Kitap Ekle </Link>
    </div>
   <table className="table">
  <thead>
    <tr>
      <th scope="col">Kitap Adı</th>
      <th scope="col">Yazar</th>
      <th scope="col">Kategori</th>
      <th scope="col" className="text-center">ISBN</th>
      <th scope="col">İşlem</th>

    </tr>
  </thead>
  <tbody>
    {
        books.map(book =>{
         const category = categories.find(
          (cat) => cat.id ===book.categoryId
          );
          
            return(
                <tr key={book.id}>
                <td>{book.name}</td>
                <td>{book.author}</td>
                <td> {category.name} </td>
                <td className="text-center">
                  {book.isbn===""? "-" :book.isbn}</td>
                <td>
                <div className="btn-group" role="group" aria-label="Basic example">
                 <button 
                 type="button" 
                 className="btn btn-sm btn-outline-danger"
                 onClick={()=>
                  {
                    setShowModal(true)
                    // deleteBook(book.id)
                    setWillDeleteBook(book.id)
                  
                  }}
                 >
                  Delete
                  </button>
                  <Link 
                    to={`edit-book/${book.id}`}
                    className="btn btn-sm btn-outline-secondary"
                 >
                  Edit
                  </Link>
                </div>
                </td>
              </tr>
            )
        })
    }

   
   
  </tbody>
  </table>
  {
    showModal=== true &&(
      <Modal
      aciklama={"Silmek istediğinizden eminimisiniz ?"}
      title={"Silme İşlemi"} 
      setShowModal={setShowModal}
              mussDoDuty={()=>deleteBook(willDeleteBook)}
      />
    )
  }
</div>
    )
}
export default ListBooks