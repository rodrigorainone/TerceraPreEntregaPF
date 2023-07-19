import {productService} from "../services/index.js";

const getProducts = async (req,res) =>{
    try{
        let {page=1} = req.query;
        let {limit=10} = req.query
        let {sort} = req.query
        let {category} = req.query;
        let {status} = req.query;
        let sortAux;
        if (sort!==undefined){
          if (sort =="asc"){
            sortAux = 1;
         }
         else{
           if (sort=="desc"){
             sortAux = -1;
           }    
         }
        }  
        const {docs,hasPrevPage,hasNextPage,prevPage,nextPage, ...rest} =  await productService.getProductsPaginate(page,limit,sortAux,category,status); 
        console.log(rest)
        const product = docs;  
        let prevLink;
        let nextLink;
        if (limit==undefined){
            limit="";
        }
        if (sort==undefined){
            sort="";
        }
        if (category==undefined){
            category="";
        }
        if (status==undefined){
            status="";
        }
        if (hasPrevPage==false){
            prevLink =null;
        }
        else {
           
            prevLink =`/?page=${prevPage}&&limit=${limit}&&sort=${sort}&&category=${category}&&status=${status}`;
        }
        if (hasNextPage==false){
            nextLink=null;
        }
        else {
            nextLink= `/?page=${nextPage}&&limit=${limit}&&sort=${sort}&&category=${category}&&status=${status}`;
        }
    
        res.send({status:"success",payload:product,totalpage:rest.totalPages,prevPage,nextPage,page:rest.page,hasPrevPage,hasNextPage,prevLink,nextLink})
        }
        catch{
            return { status: 'error', message: "Error en getAll MongoDB: " + error, value: null}
        }
}

const getProductsByID = async (req,res) =>{
    const aux = await productService.getProductsByID(req.params.pid);
   if (!aux){
    return res.send("no existe el producto")
   }

    return res.send(aux)
}

const createProduct = async (req,res)=>{    
    const datos = req.body;
    const { title, description, price, thumbnail=[], code, stock,category, status } = datos
    if (title && description && price && status && code && stock && category ){
        await productService.createProduct(datos) 
        return res.send({status:"success"}) 
    }
    else {
        return res.send({status:"alguno de los campos no fue completado"}) 
    }
}

const updateProduct =  async (req,res)=>{    
    const idAux = req.params.pid;
    const datos = req.body; 
    const aux = await productService.updateProduct(idAux,datos)     
    if (!aux){
        return res.send("no existe el producto a modificar")
    }   
    res.send({status:"success"})   

}

const deleteProduct =  async (req,res)=>{
    const idAux = req.params.pid;
    const borrado = await productService.deleteProduct(idAux)    
    console.log()
    if (!borrado)  {
        return res.send({status:" no success"})
    }
    return res.send({status:"si success"})

}

export default {
    getProducts,
    getProductsByID,
    createProduct,
    updateProduct,
    deleteProduct
}